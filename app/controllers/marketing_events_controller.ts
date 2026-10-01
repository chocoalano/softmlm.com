import app from '@adonisjs/core/services/app'
import type { HttpContext } from '@adonisjs/core/http'
import MarketingTracker from '#services/marketing_tracker'
import { marketingEventsValidator } from '#validators/marketing_event'
import type { ClientEvent, Intent } from '#shared/tracking'

const SERVICES: readonly Intent[] = [
  'software',
  'social_media',
  'seo',
  'paid_advertising',
  'branding',
  'product_maklon',
]

/**
 * The interests each browser event may carry; anything else is dropped.
 * The needs estimate is always "pricing"; a language change or a demo form
 * started carries none.
 */
const INTERESTS: Record<ClientEvent, readonly Intent[]> = {
  service_interest: SERVICES,
  feature_interest: [
    'software',
    'compensation',
    'network',
    'ecommerce',
    'wallet_payout',
    'integration',
  ],
  consultation_form_started: [...SERVICES, 'integration'],
  demo_form_started: [],
  pricing_started: ['pricing'],
  pricing_completed: ['pricing'],
  language_changed: [],
}
const FIXED_INTEREST: Partial<Record<ClientEvent, Intent>> = {
  pricing_started: 'pricing',
  pricing_completed: 'pricing',
}

export default class MarketingEventsController {
  /**
   * Events a visitor's browser reports (service and feature interest, forms
   * started, the needs estimate, language changes). Only known visitors are
   * recorded: a request without the visitor cookie creates nothing. Always
   * answers 204 so the page never depends on it.
   */
  async store(ctx: HttpContext) {
    const { request, response } = ctx
    if (!MarketingTracker.allowed(request)) return response.noContent()

    const { events } = await request.validateUsing(marketingEventsValidator)
    const visit = MarketingTracker.visit(ctx, MarketingTracker.pagePath(events[0].page), {
      create: false,
    })
    if (!visit) return response.noContent()

    for (const event of events) {
      const interest =
        FIXED_INTEREST[event.name] ??
        (event.interest && INTERESTS[event.name].includes(event.interest) ? event.interest : null)
      MarketingTracker.record(visit, {
        name: event.name,
        page: event.page,
        section: event.section,
        locale: event.locale,
        theme: event.theme,
        interest,
        metadata: event.metadata,
      })
    }
    if (app.inTest) await MarketingTracker.idle()

    return response.noContent()
  }
}
