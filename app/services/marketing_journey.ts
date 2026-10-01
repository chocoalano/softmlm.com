import type { DateTime } from 'luxon'
import MarketingVisitor from '#models/marketing_visitor'
import MarketingSession from '#models/marketing_session'
import MarketingEvent from '#models/marketing_event'
import MarketingWhatsappIntent from '#models/marketing_whatsapp_intent'
import DemoRequest from '#models/demo_request'
import {
  EXPLICIT_EVENTS,
  INTENT_LABELS,
  INTERNAL_REFERRER,
  type Intent,
  type TrackingEvent,
} from '#shared/tracking'
import { contactPurposeOf, leadFormOf } from '#services/contact_purpose'
import MarketingTracker from '#services/marketing_tracker'
import WhatsappIntents from '#services/whatsapp_intents'
import type {
  ExplicitInterest,
  JourneyStep,
  LeadAttribution,
  Milestone,
  TouchSnapshot,
  TouchView,
  VisitorJourney,
} from '#shared/journey'

const SEARCH = /(^|\.)(google|bing|yahoo|duckduckgo|yandex|baidu|ecosia)\./
const SOCIAL =
  /(^|\.)(facebook\.com|instagram\.com|t\.co|twitter\.com|x\.com|linkedin\.com|lnkd\.in|tiktok\.com|youtube\.com|pinterest\.com|threads\.net|wa\.me|whatsapp\.com)$/

/** Readable names for common `utm_source` values; anything else is shown as sent. */
const SOURCE_NAMES: Record<string, string> = {
  google: 'Google',
  bing: 'Bing',
  facebook: 'Facebook',
  fb: 'Facebook',
  instagram: 'Instagram',
  ig: 'Instagram',
  meta: 'Meta',
  tiktok: 'TikTok',
  youtube: 'YouTube',
  linkedin: 'LinkedIn',
  twitter: 'X',
  x: 'X',
  whatsapp: 'WhatsApp',
  wa: 'WhatsApp',
  newsletter: 'Newsletter',
  email: 'Email',
}
const PAID_MEDIUM =
  /^(cpc|ppc|cpm|cpv|paid|paid[-_ ]?(social|search|media)|ads?|display|sponsored)$/i

type TouchFields = {
  utmSource?: string | null
  utmMedium?: string | null
  referrerHost?: string | null
}

/**
 * A readable source for a touch, by fixed rules: UTM tags first
 * ("Instagram Ads" for a paid medium, "Newsletter · email" otherwise), then
 * the referring site as a plain host ("google.com"), "Internal" for a
 * visit that started on this site, else "Direct".
 */
export function sourceLabel(touch: TouchFields) {
  if (touch.utmSource) {
    const name = SOURCE_NAMES[touch.utmSource.toLowerCase()] ?? touch.utmSource
    if (touch.utmMedium && PAID_MEDIUM.test(touch.utmMedium)) return `${name} Ads`
    return touch.utmMedium ? `${name} · ${touch.utmMedium}` : name
  }
  if (touch.referrerHost === INTERNAL_REFERRER) return 'Internal'
  return touch.referrerHost ?? 'Direct'
}

/** The kind of source: Paid, Campaign, Organic search, Social, Referral, Internal or Direct. */
export function channelOf(touch: TouchFields) {
  if (touch.utmSource) {
    return touch.utmMedium && PAID_MEDIUM.test(touch.utmMedium) ? 'Paid' : 'Campaign'
  }
  const host = touch.referrerHost
  if (!host) return 'Direct'
  if (host === INTERNAL_REFERRER) return 'Internal'
  if (SEARCH.test(host)) return 'Organic search'
  if (SOCIAL.test(host)) return 'Social'
  return 'Referral'
}

const snapshotFields = (touch: TouchSnapshot): TouchFields => ({
  utmSource: touch.source,
  utmMedium: touch.medium,
  referrerHost: touch.referrerHost,
})

/** A stored touch, as the back office shows it. */
export function touchView(touch: TouchSnapshot | null | undefined): TouchView | null {
  if (!touch) return null
  const utm = [
    { label: 'source', value: touch.source },
    { label: 'medium', value: touch.medium },
    { label: 'campaign', value: touch.campaign },
    { label: 'content', value: touch.content },
    { label: 'term', value: touch.term },
  ].filter((item): item is { label: string; value: string } => Boolean(item.value))
  return {
    at: touch.at,
    source: sourceLabel(snapshotFields(touch)),
    channel: channelOf(snapshotFields(touch)),
    campaign: touch.campaign,
    landingPage: touch.landingPage,
    referrerHost: touch.referrerHost === INTERNAL_REFERRER ? null : touch.referrerHost,
    utm,
  }
}

export const intentLabel = (intent: Intent | null | undefined) =>
  intent ? INTENT_LABELS[intent] : null

export function purposeLabel(lead: Parameters<typeof contactPurposeOf>[0]) {
  const purpose = contactPurposeOf(lead)
  return {
    primary: INTENT_LABELS[purpose.primary],
    additional: purpose.additional.map((intent) => INTENT_LABELS[intent]),
    multiple: purpose.multiple,
    primaryKey: purpose.primary,
  }
}

const FORM_LABELS = {
  demo: 'Book a Demo form',
  estimate: 'Needs estimate',
  consultation: 'Consultation form',
} as const

/** How an explicit interest was shown. */
const VIA: Partial<Record<TrackingEvent, string>> = {
  whatsapp_marketing_click: 'WhatsApp',
  service_interest: 'chose the service',
  feature_interest: 'opened the feature',
  pricing_completed: 'completed the needs estimate',
  demo_form_submitted: 'form',
  consultation_form_submitted: 'form',
}
const explicitEvents = new Set<string>(EXPLICIT_EVENTS)

const submittedForm = (event: MarketingEvent) =>
  event.eventName === 'consultation_form_submitted'
    ? FORM_LABELS.consultation
    : event.metadata?.form === 'estimate'
      ? FORM_LABELS.estimate
      : FORM_LABELS.demo

/** One raw event in plain words (the collapsed event log). */
function describe(event: MarketingEvent, landing: boolean, reference: string | null) {
  const interest = intentLabel(event.interestCategory)
  switch (event.eventName) {
    case 'page_view':
      return landing ? `Landed on ${event.page}` : `Viewed ${event.page}`
    case 'service_interest':
    case 'feature_interest':
      return `Chose ${interest ?? 'a topic'}`
    case 'whatsapp_marketing_click':
      return `Clicked WhatsApp${interest ? ` (${interest})` : ''}${reference ? ` · Ref ${reference}` : ''}`
    case 'demo_form_started':
      return 'Started the Book a Demo form'
    case 'consultation_form_started':
      return 'Started the consultation form'
    case 'pricing_started':
      return 'Started the needs estimate'
    case 'pricing_completed':
      return 'Completed the needs estimate'
    case 'language_changed':
      return `Switched language ${event.metadata?.from ?? ''} → ${event.metadata?.to ?? ''}`
    case 'demo_form_submitted':
    case 'consultation_form_submitted':
      return `Submitted the ${submittedForm(event).toLowerCase()}`
    default:
      return event.eventName
  }
}

/**
 * Journeys for sales and marketing, as milestones rather than raw events:
 * First visit → Explored → Explicit interest → WhatsApp click → Form
 * submission → Sales contact. Explicit interest (a CTA, a choice, a form)
 * is kept apart from pages merely viewed. The raw events stay available,
 * collapsed, for debugging.
 */
export default class MarketingJourney {
  static readonly EVENT_LIMIT = 80

  static async forVisitor(
    visitorId: number,
    options: { until?: DateTime; session?: number | null } = {}
  ): Promise<VisitorJourney> {
    const visitor = await MarketingVisitor.findOrFail(visitorId)
    const sessions = await MarketingSession.query()
      .where('visitor_id', visitorId)
      .orderBy('started_at', 'asc')
      .orderBy('id', 'asc')

    const eventsQuery = MarketingEvent.query()
      .where('visitor_id', visitorId)
      .orderBy('occurred_at', 'desc')
      .orderBy('id', 'desc')
      .limit(400)
    if (options.until) {
      eventsQuery.where(
        'occurred_at',
        '<=',
        options.until.plus({ seconds: 5 }).toFormat('yyyy-MM-dd HH:mm:ss')
      )
    }
    const newestFirst = await eventsQuery
    const events = [...newestFirst].reverse()
    const intents = await MarketingWhatsappIntent.query()
      .where('visitor_id', visitorId)
      .orderBy('clicked_at', 'asc')
    const leads = await DemoRequest.query()
      .where('marketing_visitor_id', visitorId)
      .select('id', 'contacted_at', 'created_at')
    const intentOf = new Map(intents.map((intent) => [Number(intent.eventId), intent]))

    const lastSession =
      sessions.find((session) => session.id === options.session) ??
      sessions[sessions.length - 1] ??
      null
    const firstTouch = touchView(MarketingTracker.firstTouch(visitor))!
    const lastTouch = lastSession ? touchView(MarketingTracker.sessionTouch(lastSession)) : null

    /* explicit interests (first time each), then what was only viewed */
    const explicit: ExplicitInterest[] = []
    const explicitKeys = new Set<Intent>()
    for (const event of events) {
      if (!explicitEvents.has(event.eventName) || !event.interestCategory) continue
      if (explicitKeys.has(event.interestCategory)) continue
      explicitKeys.add(event.interestCategory)
      explicit.push({
        interest: INTENT_LABELS[event.interestCategory],
        via: VIA[event.eventName] ?? 'action',
        at: event.occurredAt.toISO()!,
      })
    }
    const viewed = [
      ...new Set(
        events
          .filter(
            (event) =>
              !explicitEvents.has(event.eventName) &&
              event.interestCategory &&
              !explicitKeys.has(event.interestCategory)
          )
          .map((event) => INTENT_LABELS[event.interestCategory!])
      ),
    ]

    /* milestones */
    const views = events.filter((event) => event.eventName === 'page_view')
    const pages = new Set(views.map((event) => event.page))
    const clicks = events.filter((event) => event.eventName === 'whatsapp_marketing_click')
    const forms = events.filter((event) => event.eventName.endsWith('_form_submitted'))
    const contacts = [
      ...intents
        .filter((intent) => intent.contactedAt)
        .map((intent) => ({
          at: intent.contactedAt!,
          text: `WhatsApp conversation confirmed by sales (Ref ${intent.reference})`,
        })),
      ...leads
        .filter((lead) => lead.contactedAt)
        .map((lead) => ({ at: lead.contactedAt!, text: `Lead #${lead.id} marked as contacted` })),
    ].sort((a, b) => a.at.toMillis() - b.at.toMillis())
    const plural = (count: number, word: string) => `${count} ${word}${count === 1 ? '' : 's'}`

    const milestones: Milestone[] = [
      {
        key: 'first_visit',
        label: 'First visit',
        reached: true,
        at: visitor.firstSeenAt.toISO(),
        items: [
          [firstTouch.source, firstTouch.campaign].filter(Boolean).join(' · '),
          visitor.firstLandingPage ? `Landed on ${visitor.firstLandingPage}` : '',
        ].filter(Boolean),
      },
      {
        key: 'explored',
        label: 'Explored',
        reached: pages.size > 1 || sessions.length > 1 || viewed.length > 0,
        at: views[1]?.occurredAt.toISO() ?? null,
        items: [
          `${plural(pages.size, 'page')} in ${plural(sessions.length, 'visit')}`,
          viewed.length ? `Viewed: ${viewed.join(', ')}` : '',
        ].filter(Boolean),
      },
      {
        key: 'explicit_interest',
        label: 'Explicit interest',
        reached: explicit.length > 0,
        at: explicit[0]?.at ?? null,
        items: explicit.map((item) => `${item.interest} (${item.via})`),
      },
      {
        key: 'whatsapp',
        label: 'WhatsApp click',
        reached: clicks.length > 0,
        at: clicks[0]?.occurredAt.toISO() ?? null,
        items: clicks.map((event) => {
          const intent = intentOf.get(Number(event.id))
          return [
            intentLabel(event.interestCategory) ?? 'General inquiry',
            intent ? `Ref ${intent.reference}` : null,
            intent?.contactedAt ? 'conversation confirmed' : 'not confirmed',
          ]
            .filter(Boolean)
            .join(' · ')
        }),
      },
      {
        key: 'form',
        label: 'Form submission',
        reached: forms.length > 0,
        at: forms[0]?.occurredAt.toISO() ?? null,
        items: forms.map((event) =>
          [submittedForm(event), intentLabel(event.interestCategory)].filter(Boolean).join(' · ')
        ),
      },
      {
        key: 'sales_contact',
        label: 'Sales contact',
        reached: contacts.length > 0,
        at: contacts[0]?.at.toISO() ?? null,
        items: contacts.map((contact) => contact.text),
      },
    ]

    /* raw event log: the first view of each visit is its landing; repeated views collapse */
    const seenSessions = new Set<number | null>()
    const log: JourneyStep[] = []
    let previous: MarketingEvent | null = null
    for (const event of events) {
      const landing = event.eventName === 'page_view' && !seenSessions.has(event.sessionId)
      if (event.eventName === 'page_view') seenSessions.add(event.sessionId)
      const repeat =
        previous &&
        event.eventName === 'page_view' &&
        previous.eventName === 'page_view' &&
        previous.page === event.page &&
        previous.sessionId === event.sessionId
      previous = event
      if (repeat) continue
      log.push({
        at: event.occurredAt.toISO()!,
        label: describe(event, landing, intentOf.get(Number(event.id))?.reference ?? null),
        kind: event.eventName,
        session: event.sessionId,
      })
    }

    return {
      visitor: {
        uuid: visitor.visitorUuid,
        shortId: visitor.visitorUuid.slice(0, 8),
        firstSeenAt: visitor.firstSeenAt.toISO(),
        lastSeenAt: visitor.lastSeenAt.toISO(),
        sessions: sessions.length,
      },
      firstTouch,
      lastTouch,
      explicit,
      viewed,
      milestones,
      events: log.slice(-MarketingJourney.EVENT_LIMIT),
      truncated: log.length > MarketingJourney.EVENT_LIMIT,
    }
  }

  /**
   * A lead's purpose, its frozen acquisition snapshot, the WhatsApp intents
   * linked to it and the journey up to the form. Acquisition comes from the
   * snapshot saved with the lead, never from today's tracking data.
   */
  static async forLead(lead: DemoRequest): Promise<LeadAttribution> {
    const purpose = purposeLabel(lead)
    const conversion = {
      form: FORM_LABELS[leadFormOf(lead)],
      page: lead.conversionPage,
      at: lead.createdAt.toISO(),
    }
    const snapshot = lead.attributionSnapshot
    const acquisition: LeadAttribution['acquisition'] = snapshot
      ? {
          first: touchView(snapshot.first),
          last: touchView(snapshot.last),
          conversionPage: snapshot.conversionPage ?? lead.conversionPage,
          visitor: snapshot.visitor,
          fromSnapshot: true,
        }
      : {
          first: null,
          last: touchView(legacyTouch(lead)),
          conversionPage: lead.conversionPage,
          visitor: null,
          fromSnapshot: false,
        }

    const intents = await MarketingWhatsappIntent.query()
      .where('demo_request_id', lead.id)
      .orderBy('clicked_at', 'asc')
    const whatsapp = intents.map((intent) => WhatsappIntents.summary(intent))

    const visitor = lead.marketingVisitorId
      ? await MarketingVisitor.find(lead.marketingVisitorId)
      : null
    const journey = visitor
      ? await MarketingJourney.forVisitor(visitor.id, {
          until: lead.createdAt,
          session: lead.marketingSessionId,
        })
      : null
    return { purpose, conversion, acquisition, whatsapp, journey }
  }
}

/** A lead from before the snapshot: its own last-touch columns. */
function legacyTouch(lead: DemoRequest): TouchSnapshot {
  let referrerHost: string | null = null
  try {
    referrerHost = lead.referrer ? new URL(lead.referrer).hostname.replace(/^www\./, '') : null
  } catch {
    referrerHost = null
  }
  return {
    at: lead.createdAt.toISO(),
    source: lead.utmSource,
    medium: lead.utmMedium,
    campaign: lead.utmCampaign,
    content: lead.utmContent,
    term: lead.utmTerm,
    referrerHost,
    landingPage: lead.landingPage,
  }
}

/**
 * The few acquisition facts the sales email carries, from the lead's
 * snapshot: purpose, first and last source, campaign, landing and
 * conversion page, WhatsApp references, language. The full journey stays
 * in the back office.
 */
export async function leadAcquisition(lead: DemoRequest): Promise<[string, string][]> {
  const purpose = purposeLabel(lead)
  const rows: [string, string][] = [
    [
      'Purpose',
      purpose.additional.length
        ? `${purpose.primary} (${purpose.primaryKey === 'multiple' ? '' : 'also: '}${purpose.additional.join(', ')})`
        : purpose.primary,
    ],
  ]
  const snapshot = lead.attributionSnapshot
  const first = touchView(snapshot?.first)
  const last = touchView(snapshot ? snapshot.last : legacyTouch(lead))
  if (first) {
    rows.push(['First source', first.source])
    if (first.campaign) rows.push(['First campaign', first.campaign])
    if (first.landingPage) rows.push(['First landing page', first.landingPage])
  }
  if (last) {
    rows.push(['Last source', last.source])
    if (last.campaign) rows.push(['Last campaign', last.campaign])
  }
  const conversionPage = snapshot?.conversionPage ?? lead.conversionPage
  if (conversionPage) rows.push(['Sent from', conversionPage])
  if (snapshot?.whatsappReferences.length) {
    rows.push(['WhatsApp references', snapshot.whatsappReferences.join(', ')])
  }
  rows.push(['Language', lead.locale === 'id' ? 'Indonesian' : 'English'])
  return rows
}
