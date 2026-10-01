import DemoRequestService from '#services/demo_request_service'
import LeadNotifier from '#services/lead_notifier'
import { demoRequestValidator } from '#validators/demo_request'
import { leadFormLocale, leadFormMessages, leadFormText } from '#i18n/lead_form'
import { isConsultationSource } from '#config/leads'
import MarketingTracker from '#services/marketing_tracker'
import WhatsappIntents from '#services/whatsapp_intents'
import {
  ATTRIBUTION_SESSION_KEY,
  type Attribution,
} from '#middleware/capture_attribution_middleware'
import type { HttpContext } from '@adonisjs/core/http'

export default class DemoRequestsController {
  async store(ctx: HttpContext) {
    const { request, response, session, logger } = ctx
    /**
     * The page's language only changes the wording of what we answer; the
     * rules are the same for every locale.
     */
    const locale = leadFormLocale(request.input('locale'))
    const messages = leadFormText(locale)

    const { website, ...fields } = await request.validateUsing(demoRequestValidator, {
      messagesProvider: leadFormMessages(locale),
    })
    const input = { ...fields, locale }
    const created = isConsultationSource(input.source)
      ? messages.createdConsultation
      : messages.created

    /**
     * Honeypot filled in: answer like a success so bots learn nothing, but
     * store nothing.
     */
    if (website) {
      logger.info('demo request rejected by honeypot')
      session.flash('success', created)
      return response.redirect().back()
    }

    /**
     * The anonymous visitor this browser has been (first-party tracking),
     * so sales can see the journey before the form. Never blocks the lead.
     */
    const tracked = await MarketingTracker.leadLink(ctx)

    try {
      const result = await DemoRequestService.submit(input, {
        ip: request.ip(),
        userAgent: request.header('user-agent') ?? null,
        attribution: session.get(ATTRIBUTION_SESSION_KEY, null) as Attribution | null,
        marketing: tracked?.link ?? null,
      })

      if (result.status === 'duplicate') {
        logger.info('duplicate demo request skipped')
        session.flash('success', messages.duplicate)
      } else {
        logger.info(
          {
            leadId: result.lead.id,
            source: result.lead.source,
            interest: result.lead.interestCategory,
          },
          'demo request stored'
        )
        session.flash('success', created)
        if (tracked) {
          await MarketingTracker.recordLeadSubmission(tracked, result.lead)
          await WhatsappIntents.linkSameVisitor(result.lead)
        }

        /**
         * Only after the lead is committed. Delivery runs in the background
         * and can never fail the submission.
         */
        LeadNotifier.dispatch(result.lead)
      }
    } catch (error) {
      /**
       * Never surface database details to the visitor. The request id on
       * the log line ties it back to this submission.
       */
      logger.error({ err: error }, 'demo request could not be stored')
      session.flash('error', messages.failed)
    }

    return response.redirect().back()
  }
}
