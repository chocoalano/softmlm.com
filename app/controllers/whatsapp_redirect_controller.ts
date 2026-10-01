import type { HttpContext } from '@adonisjs/core/http'
import marketingConfig from '#config/marketing'
import trackingConfig from '#config/marketing_tracking'
import MarketingTracker, { PAGE_PATH, SLUG, isWhatsappContext } from '#services/marketing_tracker'
import WhatsappIntents from '#services/whatsapp_intents'
import { DEFAULT_LOCALE, isLocale } from '#shared/locales'

export default class WhatsappRedirectController {
  /**
   * GET /r/whatsapp/:context — records the click, then sends the visitor to
   * WhatsApp with the context's message in their language.
   *
   * Not an open redirect: the destination is always wa.me with the number
   * from the configuration, and the context must be one of the configured
   * WhatsApp contexts. A click only means "opened WhatsApp": it is recorded
   * as `whatsapp_marketing_click`, never as a lead or a contact.
   *
   * When tracking is allowed, the click becomes a WhatsApp intent and the
   * message ends with its short reference ("… Ref: M7K4P2"), created here
   * on the server, which sales can search in the back office. With
   * tracking off, WhatsApp opens the same way without a reference.
   *
   * Recording is capped per client address (marketing_tracking
   * `whatsappRecordLimit`): past it, or when the limiter store is down,
   * WhatsApp still opens, without a reference, so a script cannot fill the
   * intents table and an outage never blocks the conversation.
   */
  async show(ctx: HttpContext) {
    const { params, request, response } = ctx
    const context = params.context
    const qs = request.qs()
    const locale = isLocale(qs.locale) ? qs.locale : DEFAULT_LOCALE
    const settings = marketingConfig.whatsappFor(locale)

    if (!isWhatsappContext(context) || !settings.enabled) return response.notFound()

    const path = typeof qs.path === 'string' && PAGE_PATH.test(qs.path) ? qs.path : null
    const slug = (value: unknown) => (typeof value === 'string' && SLUG.test(value) ? value : null)

    const visit = MarketingTracker.visit(ctx, path)
    const recordable =
      visit !== null &&
      (await MarketingTracker.underLimit(
        `whatsapp_record:${request.ip()}`,
        trackingConfig.whatsappRecordLimit
      ).catch(() => false))
    const intent = recordable
      ? await WhatsappIntents.record(visit, {
          context,
          page: path,
          section: slug(qs.section),
          locale,
          theme: slug(qs.theme),
          variant: slug(qs.variant),
        })
      : null

    const message = intent
      ? `${settings.messages[context]} Ref: ${intent.reference}`
      : settings.messages[context]

    response.header('Cache-Control', 'no-store')
    response.header('X-Robots-Tag', 'noindex, nofollow')
    // never forward this request's query string: the destination is built here only
    return response
      .redirect()
      .withQs(false)
      .toPath(`https://wa.me/${settings.number}?text=${encodeURIComponent(message)}`)
  }
}
