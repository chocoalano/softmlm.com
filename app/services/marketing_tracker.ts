import { randomUUID } from 'node:crypto'
import { DateTime } from 'luxon'
import app from '@adonisjs/core/services/app'
import logger from '@adonisjs/core/services/logger'
import limiter from '@adonisjs/limiter/services/main'
import type { HttpContext } from '@adonisjs/core/http'
import trackingConfig from '#config/marketing_tracking'
import { whatsappMessages, type WhatsappContext } from '#config/marketing'
import MarketingVisitor from '#models/marketing_visitor'
import MarketingSession from '#models/marketing_session'
import MarketingEvent, { type EventMetadata } from '#models/marketing_event'
import MarketingWhatsappIntent from '#models/marketing_whatsapp_intent'
import { THEME_COOKIE, isLocale, splitLocale } from '#shared/locales'
import { INTENTS, INTERNAL_REFERRER, type Intent, type TrackingEvent } from '#shared/tracking'
import { services } from '#shared/services'
import { features } from '#shared/features'
import { INTEGRATIONS_PATH } from '#shared/integrations'
import type DemoRequest from '#models/demo_request'
import type { Attribution } from '#middleware/capture_attribution_middleware'
import { contactPurposeOf, leadFormOf } from '#services/contact_purpose'
import type { LeadAttributionSnapshot, TouchSnapshot } from '#shared/journey'

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const
/** A marketing page path: "/en", "/id/services/branding". Nothing else is stored as a page. */
export const PAGE_PATH = /^\/(?:en|id)(?:\/[a-z0-9-]{1,60}){0,4}$/
export const SLUG = /^[a-z0-9_-]{1,40}$/

type Utm = Partial<Record<(typeof UTM_KEYS)[number], string>>

/** How a visit arrived. Paths only: query strings can carry personal data. */
export type Touch = {
  landingPage: string | null
  referrer: string | null
  referrerHost: string | null
  utm: Utm
  locale: string | null
  deviceCategory: 'desktop' | 'tablet' | 'mobile'
}

/** The visitor and visit a request belongs to, from the first-party cookies. */
export type Visit = {
  visitorUuid: string
  sessionUuid: string
  newVisitor: boolean
  newSession: boolean
  touch: Touch
}

export type EventInput = {
  name: TrackingEvent
  page?: string | null
  section?: string | null
  locale?: string | null
  theme?: string | null
  interest?: Intent | null
  metadata?: Record<string, unknown> | null
}

/** What each WhatsApp context says about the visitor's interest. */
export const WHATSAPP_INTENTS: Record<WhatsappContext, Intent | null> = {
  general: 'software',
  compensation: 'compensation',
  pricing: 'pricing',
  implementation: 'implementation',
  pricing_result: 'pricing',
  executives: 'software',
  finance: 'software',
  operations: 'software',
  it: 'software',
  distributors: 'software',
  network: 'network',
  ecommerce: 'ecommerce',
  wallet: 'wallet_payout',
  implementation_general: 'implementation',
  migration: 'migration',
  integration_discovery: 'integration',
  compensation_validation: 'compensation',
  services_overview: null,
  service_social_media: 'social_media',
  service_seo: 'seo',
  service_paid_ads: 'paid_advertising',
  service_branding: 'branding',
  service_product_maklon: 'product_maklon',
}

export function isWhatsappContext(value: unknown): value is WhatsappContext {
  return typeof value === 'string' && Object.hasOwn(whatsappMessages.en, value)
}

/**
 * Metadata keys each event may carry, with the values they accept.
 * Anything else, including every key that could hold personal data, is
 * dropped before it reaches the database.
 */
const METADATA: Partial<Record<TrackingEvent, Record<string, (value: string) => boolean>>> = {
  language_changed: {
    from: (value) => isLocale(value),
    to: (value) => isLocale(value),
  },
  pricing_started: { mode: (value) => ['quick', 'full'].includes(value) },
  pricing_completed: { mode: (value) => ['quick', 'full'].includes(value) },
  whatsapp_marketing_click: {
    context: (value) => isWhatsappContext(value),
    variant: (value) => SLUG.test(value),
  },
  demo_form_submitted: {
    form: (value) => ['demo', 'estimate'].includes(value),
    source: (value) => SLUG.test(value),
  },
  consultation_form_submitted: {
    form: (value) => value === 'consultation',
    source: (value) => SLUG.test(value),
  },
}

/**
 * First-party, anonymous marketing tracking (docs/marketing-attribution.md).
 *
 * A visitor is a random UUID in an HttpOnly, signed cookie; a visit is a
 * second cookie that expires after 30 minutes of inactivity. Nothing else
 * identifies a browser: no fingerprinting, no IP address. Writes run in
 * the background on one in-process queue, so tracking never slows a page
 * down or fails it (tests wait for the queue with `idle()`).
 */
export default class MarketingTracker {
  static #queue: Promise<void> = Promise.resolve()

  /**
   * Tracking is on, the visitor has not opted out (cookie or Global Privacy
   * Control) and the request does not come from an obvious bot.
   */
  static allowed(request: HttpContext['request']) {
    if (!trackingConfig.enabled) return false
    if (request.header('sec-gpc') === '1') return false
    const optOut = trackingConfig.cookies.optOut
    if (
      request.plainCookie(optOut, { encoded: false }) === 'off' ||
      request.plainCookie(optOut) === 'off'
    ) {
      return false
    }
    return !MarketingTracker.isBot(request.header('user-agent'))
  }

  static isBot(userAgent: string | undefined) {
    return !userAgent || trackingConfig.botPattern.test(userAgent)
  }

  /** Only the broad category; the user agent itself is never stored. */
  static deviceCategory(userAgent: string | undefined): Touch['deviceCategory'] {
    const ua = userAgent ?? ''
    if (/iPad|Tablet|Android(?!.*Mobile)/i.test(ua)) return 'tablet'
    if (/Mobi|iPhone|iPod|Android/i.test(ua)) return 'mobile'
    return 'desktop'
  }

  /** "/en/pricing?utm_source=x" → "/en/pricing"; anything else → null. */
  static pagePath(url: string | null | undefined) {
    const path = (url ?? '').split(/[?#]/)[0]
    return PAGE_PATH.test(path) ? path : null
  }

  /**
   * The visit's touch: landing page, external referrer (origin + path), UTM
   * tags. A visit that starts from another page of this site (the previous
   * visit timed out) is marked as internal, so it never reads as "Direct".
   */
  static touch(ctx: HttpContext, path: string | null): Touch {
    const { request } = ctx
    const qs = request.qs()
    const utm: Utm = {}
    for (const key of UTM_KEYS) {
      const value = typeof qs[key] === 'string' ? qs[key].trim().slice(0, 200) : ''
      if (value) utm[key] = value
    }

    let referrer: string | null = null
    let referrerHost: string | null = null
    const header = request.header('referer')
    if (header) {
      try {
        const url = new URL(header)
        if (url.host === request.host()) {
          referrerHost = INTERNAL_REFERRER
        } else if (/^https?:$/.test(url.protocol)) {
          referrer = `${url.origin}${url.pathname}`.slice(0, 255)
          referrerHost = url.hostname.replace(/^www\./, '').slice(0, 255)
        }
      } catch {
        // not a URL: ignored
      }
    }

    return {
      landingPage: path,
      referrer,
      referrerHost,
      utm,
      locale: path ? splitLocale(path).locale : null,
      deviceCategory: MarketingTracker.deviceCategory(request.header('user-agent')),
    }
  }

  static #cookieOptions(maxAge: string) {
    return { maxAge, httpOnly: true, sameSite: 'lax' as const, secure: app.inProduction, path: '/' }
  }

  /**
   * The visitor and visit of a request, refreshing both cookies. A new
   * visit starts when the visit cookie has expired (30 minutes without
   * activity) or the request arrives through a different campaign.
   *
   * `create: false` never starts a new visitor (used for background events:
   * only a page view makes someone a visitor).
   */
  static visit(ctx: HttpContext, path: string | null, { create = true } = {}): Visit | null {
    const { request, response } = ctx
    if (!MarketingTracker.allowed(request)) return null

    const cookies = trackingConfig.cookies
    const stored = request.cookie(cookies.visitor)
    const known = typeof stored === 'string' && UUID.test(stored) ? stored : null
    if (!known && !create) return null
    const visitorUuid = known ?? randomUUID()

    const touch = MarketingTracker.touch(ctx, path)
    const campaign =
      touch.utm.utm_source || touch.utm.utm_campaign
        ? [touch.utm.utm_source, touch.utm.utm_medium, touch.utm.utm_campaign]
            .map((part) => (part ?? '').replace(/~/g, ''))
            .join('|')
        : null

    const [storedSession, storedCampaign] = String(request.cookie(cookies.visit) ?? '').split('~')
    const continuing =
      known && UUID.test(storedSession) && (!campaign || campaign === (storedCampaign || null))
    const sessionUuid = continuing ? storedSession : randomUUID()
    const sessionCampaign = continuing ? storedCampaign || '' : (campaign ?? '')

    response.cookie(
      cookies.visitor,
      visitorUuid,
      MarketingTracker.#cookieOptions(`${trackingConfig.visitorDays}d`)
    )
    response.cookie(
      cookies.visit,
      `${sessionUuid}~${sessionCampaign}`,
      MarketingTracker.#cookieOptions(`${trackingConfig.sessionTimeoutMinutes}m`)
    )

    return { visitorUuid, sessionUuid, newVisitor: !known, newSession: !continuing, touch }
  }

  /**
   * Finds or creates the visitor and visit rows, and marks them active.
   * The first touch is written once, when the visitor is created, and never
   * overwritten; every visit keeps its own touch.
   */
  static async resolve(visit: Visit, now: DateTime = DateTime.now()) {
    const { touch } = visit
    let visitor = await MarketingVisitor.findBy('visitorUuid', visit.visitorUuid)
    if (!visitor) {
      try {
        visitor = await MarketingVisitor.create({
          visitorUuid: visit.visitorUuid,
          firstSeenAt: now,
          lastSeenAt: now,
          firstLocale: touch.locale,
          firstLandingPage: touch.landingPage,
          firstReferrer: touch.referrer,
          firstReferrerHost: touch.referrerHost,
          firstUtmSource: touch.utm.utm_source ?? null,
          firstUtmMedium: touch.utm.utm_medium ?? null,
          firstUtmCampaign: touch.utm.utm_campaign ?? null,
        })
      } catch {
        // created by a parallel request (another process): use that one
        visitor = await MarketingVisitor.findByOrFail('visitorUuid', visit.visitorUuid)
      }
    } else {
      visitor.lastSeenAt = now
      await visitor.save()
    }

    let session = await MarketingSession.query()
      .where('session_uuid', visit.sessionUuid)
      .where('visitor_id', visitor.id)
      .first()
    if (!session) {
      try {
        session = await MarketingSession.create({
          visitorId: visitor.id,
          sessionUuid: visit.sessionUuid,
          startedAt: now,
          lastActivityAt: now,
          landingPage: touch.landingPage,
          referrer: touch.referrer,
          referrerHost: touch.referrerHost,
          utmSource: touch.utm.utm_source ?? null,
          utmMedium: touch.utm.utm_medium ?? null,
          utmCampaign: touch.utm.utm_campaign ?? null,
          utmContent: touch.utm.utm_content ?? null,
          utmTerm: touch.utm.utm_term ?? null,
          locale: touch.locale,
          deviceCategory: touch.deviceCategory,
        })
      } catch {
        session = await MarketingSession.findByOrFail('sessionUuid', visit.sessionUuid)
      }
    } else {
      session.lastActivityAt = now
      await session.save()
    }

    return { visitor, session }
  }

  /** Keeps only the allowlisted metadata of an event (see METADATA). */
  static cleanMetadata(name: TrackingEvent, raw: Record<string, unknown> | null | undefined) {
    const rules = METADATA[name]
    if (!rules || !raw) return null
    const clean: EventMetadata = {}
    for (const [key, accepts] of Object.entries(rules)) {
      const value = raw[key]
      if (typeof value === 'string' && value.length <= 40 && accepts(value)) {
        clean[key as keyof EventMetadata] = value
      }
    }
    return Object.keys(clean).length ? clean : null
  }

  static async #write(visit: Visit, input: EventInput, now: DateTime) {
    const { visitor, session } = await MarketingTracker.resolve(visit, now)
    const event = await MarketingEvent.create({
      visitorId: visitor.id,
      sessionId: session.id,
      eventName: input.name,
      page: MarketingTracker.pagePath(input.page),
      section: input.section && SLUG.test(input.section) ? input.section : null,
      locale: input.locale && isLocale(input.locale) ? input.locale : null,
      theme: input.theme === 'light' || input.theme === 'dark' ? input.theme : null,
      interestCategory: input.interest && INTENTS.includes(input.interest) ? input.interest : null,
      metadata: MarketingTracker.cleanMetadata(input.name, input.metadata),
      occurredAt: now,
    })
    return { event, visitor, session }
  }

  /**
   * Records an event in the background. Never throws: a tracking failure is
   * logged and the visitor's page, click or form carries on.
   */
  static record(visit: Visit, input: EventInput, now: DateTime = DateTime.now()) {
    return MarketingTracker.enqueue(async () => {
      await MarketingTracker.#write(visit, input, now)
    })
  }

  /**
   * Records an event and waits for it, returning the event with its visitor
   * and visit (WhatsApp clicks). Null when the write failed.
   */
  static async recordNow(visit: Visit, input: EventInput, now: DateTime = DateTime.now()) {
    await MarketingTracker.idle()
    try {
      return await MarketingTracker.#write(visit, input, now)
    } catch (error) {
      logger.error({ err: error, event: input.name }, 'marketing event could not be recorded')
      return null
    }
  }

  static enqueue(task: () => Promise<void>) {
    const run = MarketingTracker.#queue.then(task).catch((error) => {
      logger.error({ err: error }, 'marketing tracking failed')
    })
    MarketingTracker.#queue = run
    return run
  }

  /**
   * Whether this page view may be recorded: under the per-address caps on
   * page views and on new visitors (marketing_tracking `pageViewLimits`).
   */
  static async pageViewAllowed(ctx: HttpContext, visit: Visit) {
    const ip = ctx.request.ip()
    const { views, newVisitors } = trackingConfig.pageViewLimits
    const counted = (key: string, limit: { requests: number; window: string }) =>
      limiter
        .use({ requests: limit.requests, duration: limit.window })
        .attempt(key, () => true)
        .then((ok) => ok === true)

    if (!(await counted(`track_views:${ip}`, views))) return false
    return !visit.newVisitor || counted(`track_new_visitors:${ip}`, newVisitors)
  }

  /** Resolves once every queued tracking write has finished. */
  static idle() {
    return MarketingTracker.#queue
  }

  /** The theme a visitor chose explicitly (light / dark); "system" is unknown to the server. */
  static theme(request: HttpContext['request']) {
    const value = request.plainCookie(THEME_COOKIE, { encoded: false })
    return value === 'light' || value === 'dark' ? value : null
  }

  /**
   * What a marketing page says about a visitor's interest, from its path:
   * "/id/services/product-maklon" → product_maklon.
   */
  static interestForPath(path: string | null): Intent | null {
    if (!path) return null
    const rest = splitLocale(path).path
    if (rest.startsWith('/compensation-plans')) return 'compensation'
    if (rest.startsWith('/pricing')) return 'pricing'
    if (rest.startsWith('/how-we-do-it')) return 'implementation'
    if (rest.startsWith('/who-we-serve')) return 'software'
    if (rest === INTEGRATIONS_PATH) return 'integration'
    const service = services.find((item) => rest === `/services/${item.slug}`)
    if (service) return service.key
    const feature = features.find((item) => rest === `/features/${item.slug}`)
    if (feature) return feature.key === 'wallet' ? 'wallet_payout' : feature.key
    if (rest === '/features') return 'software'
    return null
  }

  /** The visitor's first touch, as stored on the visitor. */
  static firstTouch(visitor: MarketingVisitor): TouchSnapshot {
    return {
      at: visitor.firstSeenAt.toISO(),
      source: visitor.firstUtmSource,
      medium: visitor.firstUtmMedium,
      campaign: visitor.firstUtmCampaign,
      content: null,
      term: null,
      referrerHost: visitor.firstReferrerHost,
      landingPage: visitor.firstLandingPage,
    }
  }

  /** The touch of one visit. */
  static sessionTouch(session: MarketingSession): TouchSnapshot {
    return {
      at: session.startedAt.toISO(),
      source: session.utmSource,
      medium: session.utmMedium,
      campaign: session.utmCampaign,
      content: session.utmContent,
      term: session.utmTerm,
      referrerHost: session.referrerHost,
      landingPage: session.landingPage,
    }
  }

  /**
   * The visitor and visit a lead was submitted in: the current visit, or
   * the visitor's most recent one if the visit cookie has expired while the
   * form was open. Only the current browser's own cookies are used: other
   * visitors are never matched to a lead.
   */
  static async forLead(ctx: HttpContext) {
    const { request } = ctx
    if (!MarketingTracker.allowed(request)) return null
    const stored = request.cookie(trackingConfig.cookies.visitor)
    if (typeof stored !== 'string' || !UUID.test(stored)) return null

    await MarketingTracker.idle()
    const visitor = await MarketingVisitor.findBy('visitorUuid', stored)
    if (!visitor) return null

    const [sessionUuid] = String(request.cookie(trackingConfig.cookies.visit) ?? '').split('~')
    const session =
      (UUID.test(sessionUuid)
        ? await MarketingSession.query()
            .where('session_uuid', sessionUuid)
            .where('visitor_id', visitor.id)
            .first()
        : null) ??
      (await MarketingSession.query()
        .where('visitor_id', visitor.id)
        .orderBy('last_activity_at', 'desc')
        .orderBy('id', 'desc')
        .first())

    return { visitor, session }
  }

  /**
   * Everything a lead submission needs from tracking: the visitor and visit
   * ids, the page the form was sent from and the visit's touch (the lead's
   * last touch). Null when tracking is off or the browser is not a known
   * visitor; never throws.
   */
  static async leadLink(ctx: HttpContext) {
    try {
      const tracked = await MarketingTracker.forLead(ctx)
      if (!tracked) return null
      const { visitor, session } = tracked

      let conversionPage: string | null = null
      const referer = ctx.request.header('referer')
      if (referer) {
        try {
          const url = new URL(referer)
          if (url.host === ctx.request.host())
            conversionPage = MarketingTracker.pagePath(url.pathname)
        } catch {
          // not a URL
        }
      }
      if (!conversionPage && session) {
        const lastView = await MarketingEvent.query()
          .where('session_id', session.id)
          .where('event_name', 'page_view')
          .orderBy('occurred_at', 'desc')
          .orderBy('id', 'desc')
          .first()
        conversionPage = lastView?.page ?? null
      }

      const lastTouch: Attribution | null = session
        ? {
            landingPage: session.landingPage ?? conversionPage ?? '',
            referrer: session.referrer,
            utm: Object.fromEntries(
              [
                ['utm_source', session.utmSource],
                ['utm_medium', session.utmMedium],
                ['utm_campaign', session.utmCampaign],
                ['utm_content', session.utmContent],
                ['utm_term', session.utmTerm],
              ].filter(([, value]) => Boolean(value))
            ),
          }
        : null

      /* WhatsApp intents of this same browser that are still open: linked to the lead */
      const intents = await MarketingWhatsappIntent.query()
        .where('visitor_id', visitor.id)
        .whereNull('demo_request_id')
        .where('expires_at', '>=', DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'))
        .orderBy('clicked_at', 'asc')
        .select('reference')
      const snapshot: LeadAttributionSnapshot = {
        version: 1,
        capturedAt: DateTime.now().toISO()!,
        visitor: visitor.visitorUuid.slice(0, 8),
        first: MarketingTracker.firstTouch(visitor),
        last: session ? MarketingTracker.sessionTouch(session) : null,
        conversionPage,
        whatsappReferences: intents.map((intent) => intent.reference),
      }

      return {
        visitor,
        session,
        link: {
          visitorId: visitor.id,
          sessionId: session?.id ?? null,
          conversionPage,
          lastTouch,
          snapshot,
        },
      }
    } catch (error) {
      logger.error({ err: error }, 'lead could not be linked to its visitor')
      return null
    }
  }

  /**
   * The submission itself, as the last step of the visitor's journey. The
   * lead holds the contact details; the event only says which form and
   * purpose.
   */
  static async recordLeadSubmission(
    link: NonNullable<Awaited<ReturnType<typeof MarketingTracker.leadLink>>>,
    lead: DemoRequest
  ) {
    try {
      const form = leadFormOf(lead)
      const now = DateTime.now()
      await MarketingEvent.create({
        visitorId: link.visitor.id,
        sessionId: link.session?.id ?? null,
        eventName: form === 'consultation' ? 'consultation_form_submitted' : 'demo_form_submitted',
        page: link.link.conversionPage,
        locale: lead.locale,
        interestCategory: contactPurposeOf(lead).primary,
        metadata: MarketingTracker.cleanMetadata(
          form === 'consultation' ? 'consultation_form_submitted' : 'demo_form_submitted',
          { form, source: lead.source }
        ),
        occurredAt: now,
      })
      link.visitor.lastSeenAt = now
      await link.visitor.save()
      if (link.session) {
        link.session.lastActivityAt = now
        await link.session.save()
      }
    } catch (error) {
      logger.error({ err: error, leadId: lead.id }, 'lead submission could not be recorded')
    }
  }
}
