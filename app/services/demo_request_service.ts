import { createHmac } from 'node:crypto'
import { DateTime } from 'luxon'
import db from '@adonisjs/lucid/services/db'
import env from '#start/env'
import leadsConfig from '#config/leads'
import DemoRequest from '#models/demo_request'
import type {
  BusinessType,
  LeadModule,
  LeadSource,
  MemberRange,
  PricingEstimateSnapshot,
  ServiceDetails,
} from '#config/leads'
import type { ServiceInterest } from '#shared/services'
import type { Attribution } from '#middleware/capture_attribution_middleware'
import type { Locale } from '#shared/locales'
import type { LeadAttributionSnapshot } from '#shared/journey'

export type DemoRequestInput = {
  fullName: string
  email: string
  company: string
  phone?: string
  businessType?: BusinessType
  activeMembers?: MemberRange
  modules?: LeadModule[]
  message?: string
  source: LeadSource
  locale: Locale
  pricingEstimate?: PricingEstimateSnapshot
  serviceInterests?: ServiceInterest[]
  serviceDetails?: ServiceDetails
}

export type RequestContext = {
  ip: string
  userAgent: string | null
  attribution: Attribution | null
  /**
   * The anonymous visitor and visit the form was sent from (first-party
   * tracking), when tracking is allowed. Its visit touch becomes the lead's
   * last-touch attribution; the visitor keeps the first touch.
   */
  marketing?: {
    visitorId: number
    sessionId: number | null
    conversionPage: string | null
    lastTouch: Attribution | null
    snapshot: LeadAttributionSnapshot
  } | null
}

export type SubmitResult = { status: 'created'; lead: DemoRequest } | { status: 'duplicate' }

export default class DemoRequestService {
  /**
   * One-way, keyed hash of the client IP. It lets us spot repeated spam
   * from one address without storing the address itself.
   */
  static hashIp(ip: string) {
    return createHmac('sha256', env.get('APP_KEY').release()).update(ip).digest('hex')
  }

  /**
   * The acquisition snapshot of a lead sent without first-party tracking
   * (switched off, opted out): only the visit's own last touch is known.
   */
  static snapshotFromAttribution(attribution: Attribution | null): LeadAttributionSnapshot {
    let referrerHost: string | null = null
    try {
      referrerHost = attribution?.referrer
        ? new URL(attribution.referrer).hostname.replace(/^www\./, '')
        : null
    } catch {
      referrerHost = null
    }
    return {
      version: 1,
      capturedAt: DateTime.now().toISO()!,
      visitor: null,
      first: null,
      last: attribution
        ? {
            at: null,
            source: attribution.utm.utm_source ?? null,
            medium: attribution.utm.utm_medium ?? null,
            campaign: attribution.utm.utm_campaign ?? null,
            content: attribution.utm.utm_content ?? null,
            term: attribution.utm.utm_term ?? null,
            referrerHost,
            landingPage: attribution.landingPage.split('?')[0].slice(0, 255) || null,
          }
        : null,
      conversionPage: null,
      whatsappReferences: [],
    }
  }

  /**
   * Stores a lead unless the same email or phone already submitted one a
   * few minutes ago (a double click or a retried request). The check and
   * the insert share a transaction so two parallel submissions cannot both
   * get through.
   */
  static async submit(input: DemoRequestInput, context: RequestContext): Promise<SubmitResult> {
    return db.transaction(async (trx) => {
      const since = DateTime.now().minus({ minutes: leadsConfig.duplicateWindowMinutes })
      const duplicate = await DemoRequest.query({ client: trx })
        .where((query) => {
          query.where('email', input.email)
          if (input.phone) query.orWhere('phone', input.phone)
        })
        .where('created_at', '>=', since.toFormat('yyyy-MM-dd HH:mm:ss'))
        .first()

      if (duplicate) return { status: 'duplicate' as const }

      const estimate = input.pricingEstimate
      const attribution = context.marketing?.lastTouch ?? context.attribution
      const marketing = context.marketing ?? null

      const lead = await DemoRequest.create(
        {
          fullName: input.fullName,
          email: input.email,
          company: input.company,
          phone: input.phone ?? null,
          businessType: input.businessType ?? estimate?.businessType ?? null,
          activeMembers: input.activeMembers ?? estimate?.activeMembers ?? null,
          message: input.message ?? null,
          status: 'new',
          source: input.source,
          locale: input.locale,
          selectedModulesSnapshot: input.modules?.length
            ? input.modules
            : estimate?.modules?.length
              ? estimate.modules
              : null,
          pricingEstimateSnapshot: estimate && Object.keys(estimate).length ? estimate : null,
          serviceInterests: input.serviceInterests?.length ? input.serviceInterests : null,
          serviceDetails:
            input.serviceDetails && Object.keys(input.serviceDetails).length
              ? input.serviceDetails
              : null,
          landingPage: attribution?.landingPage ?? null,
          referrer: attribution?.referrer ?? null,
          utmSource: attribution?.utm.utm_source ?? null,
          utmMedium: attribution?.utm.utm_medium ?? null,
          utmCampaign: attribution?.utm.utm_campaign ?? null,
          utmContent: attribution?.utm.utm_content ?? null,
          utmTerm: attribution?.utm.utm_term ?? null,
          marketingVisitorId: marketing?.visitorId ?? null,
          marketingSessionId: marketing?.sessionId ?? null,
          conversionPage: marketing?.conversionPage ?? null,
          attributionSnapshot:
            marketing?.snapshot ?? DemoRequestService.snapshotFromAttribution(attribution),
          ipHash: DemoRequestService.hashIp(context.ip),
          userAgent: context.userAgent?.slice(0, 512) ?? null,
        },
        { client: trx }
      )

      return { status: 'created' as const, lead }
    })
  }
}
