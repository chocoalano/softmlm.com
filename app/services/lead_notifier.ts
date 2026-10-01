import mail from '@adonisjs/mail/services/main'
import logger from '@adonisjs/core/services/logger'
import env from '#start/env'
import type DemoRequest from '#models/demo_request'
import DemoRequestActivity from '#models/demo_request_activity'
import NewLeadNotification from '#mails/new_lead_notification'
import DemoRequestConfirmation from '#mails/demo_request_confirmation'
import { leadAcquisition } from '#services/marketing_journey'

type Kind = 'internal' | 'confirmation'

const LABELS: Record<Kind, string> = {
  internal: 'Sales team notification',
  confirmation: 'Confirmation email to the lead',
}

export function salesRecipients() {
  return (env.get('SALES_NOTIFICATION_EMAILS') ?? '')
    .split(',')
    .map((address) => address.trim())
    .filter(Boolean)
}

/**
 * Emails sent after a lead is stored: a notification to the sales inbox and
 * a confirmation to the visitor.
 *
 * The project has no job queue yet, so delivery runs in the background of
 * the web process, after the response. A mail failure never affects the
 * stored lead: it is logged and written to the lead's history, where it can
 * be retried with `node ace leads:notify <id>`.
 */
export default class LeadNotifier {
  static #pending = new Set<Promise<void>>()

  /**
   * Starts delivery without waiting for it.
   */
  static dispatch(lead: DemoRequest) {
    const task: Promise<void> = LeadNotifier.deliver(lead)
      .catch((error) => logger.error({ err: error, leadId: lead.id }, 'lead notification crashed'))
      .finally(() => LeadNotifier.#pending.delete(task))
    LeadNotifier.#pending.add(task)
    return task
  }

  /**
   * Resolves once every background delivery has finished. Used by tests
   * and on graceful shutdown.
   */
  static async idle() {
    await Promise.all([...LeadNotifier.#pending])
  }

  static async deliver(lead: DemoRequest, kinds: Kind[] = ['internal', 'confirmation']) {
    const recipients = salesRecipients()

    if (kinds.includes('internal')) {
      if (recipients.length) {
        const acquisition = await leadAcquisition(lead).catch(() => [])
        await LeadNotifier.#send(
          lead,
          'internal',
          new NewLeadNotification(lead, recipients, acquisition)
        )
      } else {
        logger.warn({ leadId: lead.id }, 'SALES_NOTIFICATION_EMAILS is empty; sales email skipped')
        await LeadNotifier.#record(
          lead,
          'notification_failed',
          'Sales team notification skipped: no sales inbox configured'
        )
      }
    }

    if (kinds.includes('confirmation')) {
      await LeadNotifier.#send(
        lead,
        'confirmation',
        new DemoRequestConfirmation(lead, recipients[0])
      )
    }
  }

  static async #send(
    lead: DemoRequest,
    kind: Kind,
    mailable: NewLeadNotification | DemoRequestConfirmation
  ) {
    try {
      await mail.send(mailable)
      await LeadNotifier.#record(lead, 'notification_sent', `${LABELS[kind]} sent`)
    } catch (error) {
      const code = (error as { code?: string }).code
      logger.error({ err: error, leadId: lead.id, kind }, 'lead email failed')
      await LeadNotifier.#record(
        lead,
        'notification_failed',
        `${LABELS[kind]} failed${code ? ` (${code})` : ''}`
      )
    }
  }

  static async #record(
    lead: DemoRequest,
    type: 'notification_sent' | 'notification_failed',
    body: string
  ) {
    try {
      await DemoRequestActivity.create({ demoRequestId: lead.id, userId: null, type, body })
    } catch (error) {
      logger.error({ err: error, leadId: lead.id }, 'could not record lead notification outcome')
    }
  }
}
