import { randomInt } from 'node:crypto'
import { DateTime } from 'luxon'
import logger from '@adonisjs/core/services/logger'
import trackingConfig from '#config/marketing_tracking'
import type { WhatsappContext } from '#config/marketing'
import MarketingTracker, { WHATSAPP_INTENTS, type Visit } from '#services/marketing_tracker'
import MarketingWhatsappIntent from '#models/marketing_whatsapp_intent'
import DemoRequestActivity from '#models/demo_request_activity'
import type DemoRequest from '#models/demo_request'
import type User from '#models/user'
import { INTENT_LABELS } from '#shared/tracking'
import type { WhatsappIntentSummary } from '#shared/journey'

const SQL_DATETIME = 'yyyy-MM-dd HH:mm:ss'

/** Letters and digits that cannot be confused when read aloud or typed (no I, L, O, 0, 1). */
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
export const REFERENCE = /^[A-HJKMNP-Z2-9]{6}$/

/**
 * The reference in whatever form sales pastes it: "M7K4P2", "m7k4p2",
 * "Ref: M7K4P2", "(Ref: M7K4P2)". Null when it cannot be a reference.
 * `explicit` tells whether the input said "Ref" itself.
 */
export function parseReference(input: unknown): { reference: string; explicit: boolean } | null {
  if (typeof input !== 'string') return null
  const text = input.trim().toUpperCase().replace(/^\(/, '').replace(/\)$/, '').trim()
  const prefixed = /^REF\b\s*[:#.]?\s*/.exec(text)
  const code = prefixed ? text.slice(prefixed[0].length).trim() : text
  return REFERENCE.test(code) ? { reference: code, explicit: Boolean(prefixed) } : null
}

export type ClickInput = {
  context: WhatsappContext
  page: string | null
  section: string | null
  locale: string
  theme: string | null
  variant: string | null
}

/**
 * WhatsApp intents (docs/marketing-attribution.md): every WhatsApp CTA
 * click through /r/whatsapp gets a short random reference, created here on
 * the server, stored with the click's context and attribution and an
 * expiry. A reference is an attribution reference only: it identifies no
 * one, carries no id, and never grants access to anything.
 */
export default class WhatsappIntents {
  /**
   * 6 characters from 31: about 887 million values, random (crypto), not
   * sequential and unrelated to any id. Unique among stored intents.
   */
  static async newReference() {
    for (let attempt = 0; attempt < 5; attempt++) {
      const reference = Array.from({ length: 6 }, () => ALPHABET[randomInt(ALPHABET.length)]).join(
        ''
      )
      const taken = await MarketingWhatsappIntent.findBy('reference', reference)
      if (!taken) return reference
    }
    return null
  }

  /**
   * Records the click (journey event) and its intent. Returns null when
   * anything fails: the visitor still goes to WhatsApp, without a reference.
   */
  static async record(visit: Visit, input: ClickInput) {
    const now = DateTime.now()
    const interest = WHATSAPP_INTENTS[input.context]
    const tracked = await MarketingTracker.recordNow(
      visit,
      {
        name: 'whatsapp_marketing_click',
        page: input.page,
        section: input.section,
        locale: input.locale,
        theme: input.theme,
        interest,
        metadata: { context: input.context, variant: input.variant },
      },
      now
    )
    if (!tracked) return null

    try {
      const reference = await WhatsappIntents.newReference()
      if (!reference) return null
      const { event, visitor, session } = tracked
      return await MarketingWhatsappIntent.create({
        reference,
        visitorId: visitor.id,
        sessionId: session.id,
        eventId: event.id,
        context: input.context,
        page: event.page,
        section: event.section,
        locale: event.locale,
        interestCategory: interest,
        attribution: {
          first: MarketingTracker.firstTouch(visitor),
          last: MarketingTracker.sessionTouch(session),
        },
        clickedAt: now,
        expiresAt: now.plus({ days: trackingConfig.referenceDays }),
      })
    } catch (error) {
      logger.error({ err: error }, 'WhatsApp intent could not be recorded')
      return null
    }
  }

  static isExpired(intent: MarketingWhatsappIntent, now = DateTime.now()) {
    return intent.expiresAt < now
  }

  /**
   * An expired reference no longer opens the anonymous journey behind it,
   * unless sales already confirmed or linked it (then it belongs to a
   * sales record).
   */
  static isResolvable(intent: MarketingWhatsappIntent) {
    return (
      !WhatsappIntents.isExpired(intent) ||
      intent.contactedAt !== null ||
      intent.demoRequestId !== null
    )
  }

  static async find(reference: string) {
    return MarketingWhatsappIntent.findBy('reference', reference)
  }

  static summary(intent: MarketingWhatsappIntent): WhatsappIntentSummary {
    return {
      id: intent.id,
      reference: intent.reference,
      at: intent.clickedAt.toISO(),
      interest: intent.interestCategory ? INTENT_LABELS[intent.interestCategory] : 'Not specified',
      contacted: intent.contactedAt !== null,
      contactedAt: intent.contactedAt?.toISO() ?? null,
      linkedLeadId: intent.demoRequestId,
      linkMethod: intent.linkMethod,
      expired: WhatsappIntents.isExpired(intent),
    }
  }

  /**
   * A lead sent from the same browser: its still-open WhatsApp intents are
   * linked to it (never another visitor's). The lead keeps its own form
   * intent; the WhatsApp intents stay as they were.
   */
  static async linkSameVisitor(lead: DemoRequest) {
    if (!lead.marketingVisitorId) return
    try {
      await MarketingWhatsappIntent.query()
        .where('visitor_id', lead.marketingVisitorId)
        .whereNull('demo_request_id')
        .where('expires_at', '>=', DateTime.now().toFormat(SQL_DATETIME))
        .update({
          demo_request_id: lead.id,
          link_method: 'same_visitor',
          linked_at: DateTime.now().toFormat(SQL_DATETIME),
          updated_at: DateTime.now().toFormat(SQL_DATETIME),
        })
    } catch (error) {
      logger.error({ err: error, leadId: lead.id }, 'WhatsApp intents could not be linked')
    }
  }

  /** Sales confirmed that a WhatsApp conversation with this reference took place. */
  static async markContacted(intent: MarketingWhatsappIntent, user: User) {
    if (intent.contactedAt) return
    intent.contactedAt = DateTime.now()
    intent.contactedBy = user.id
    await intent.save()
    if (intent.demoRequestId) {
      await DemoRequestActivity.create({
        demoRequestId: intent.demoRequestId,
        userId: user.id,
        type: 'whatsapp_contacted',
        body: `WhatsApp conversation confirmed (Ref ${intent.reference})`,
      })
    }
  }

  static async unmarkContacted(intent: MarketingWhatsappIntent) {
    intent.contactedAt = null
    intent.contactedBy = null
    await intent.save()
  }

  /** Sales links the conversation to an existing lead. Never creates a lead. */
  static async link(intent: MarketingWhatsappIntent, lead: DemoRequest, user: User) {
    intent.demoRequestId = lead.id
    intent.linkMethod = 'manual'
    intent.linkedAt = DateTime.now()
    intent.linkedBy = user.id
    await intent.save()
    await DemoRequestActivity.create({
      demoRequestId: lead.id,
      userId: user.id,
      type: 'whatsapp_linked',
      body: `WhatsApp reference ${intent.reference} linked${intent.interestCategory ? ` (${INTENT_LABELS[intent.interestCategory]})` : ''}`,
    })
  }

  static async unlink(intent: MarketingWhatsappIntent, user: User) {
    const leadId = intent.demoRequestId
    if (!leadId) return
    intent.demoRequestId = null
    intent.linkMethod = null
    intent.linkedAt = null
    intent.linkedBy = null
    await intent.save()
    await DemoRequestActivity.create({
      demoRequestId: leadId,
      userId: user.id,
      type: 'whatsapp_unlinked',
      body: `WhatsApp reference ${intent.reference} unlinked`,
    })
  }
}
