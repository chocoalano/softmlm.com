/**
 * The shapes the back office receives for journeys, WhatsApp intents and a
 * lead's attribution (app/services/marketing_journey.ts and
 * app/services/whatsapp_intents.ts build them). Types only.
 */

/** One touch as stored: raw UTM tags, referring host and landing page. */
export type TouchSnapshot = {
  at: string | null
  source: string | null
  medium: string | null
  campaign: string | null
  content: string | null
  term: string | null
  referrerHost: string | null
  landingPage: string | null
}

/** The first touch of the visitor and the touch of the visit it acted in. */
export type TouchPair = {
  first: TouchSnapshot | null
  last: TouchSnapshot | null
}

/**
 * Saved on a lead when it is created and never changed afterwards, so a
 * later cleanup of anonymous tracking data cannot rewrite how the lead was
 * acquired.
 */
export type LeadAttributionSnapshot = TouchPair & {
  version: 1
  capturedAt: string
  /** The visitor's short id ("1b6be7b4"), when tracking was allowed. */
  visitor: string | null
  conversionPage: string | null
  /** WhatsApp references of the same visitor, linked to the lead. */
  whatsappReferences: string[]
}

/** A touch as the back office shows it. */
export type TouchView = {
  at: string | null
  source: string
  channel: string
  campaign: string | null
  landingPage: string | null
  referrerHost: string | null
  utm: { label: string; value: string }[]
}

export type MilestoneKey =
  'first_visit' | 'explored' | 'explicit_interest' | 'whatsapp' | 'form' | 'sales_contact'

/** One step of the conversion journey: First visit → … → Sales contact. */
export type Milestone = {
  key: MilestoneKey
  label: string
  reached: boolean
  at: string | null
  items: string[]
}

/** A raw event, for debugging only (collapsed in the back office). */
export type JourneyStep = {
  at: string
  label: string
  kind: string
  session: number | null
}

export type ExplicitInterest = { interest: string; via: string; at: string }

export type VisitorJourney = {
  visitor: {
    uuid: string
    shortId: string
    firstSeenAt: string | null
    lastSeenAt: string | null
    sessions: number
  }
  firstTouch: TouchView
  lastTouch: TouchView | null
  /** Interests the visitor acted on (CTA, selection, form). */
  explicit: ExplicitInterest[]
  /** Interests only seen as pages, excluding the explicit ones. */
  viewed: string[]
  milestones: Milestone[]
  events: JourneyStep[]
  truncated: boolean
}

export type WhatsappIntentSummary = {
  id: number
  reference: string
  at: string | null
  interest: string
  contacted: boolean
  contactedAt: string | null
  linkedLeadId: number | null
  linkMethod: 'same_visitor' | 'manual' | null
  expired: boolean
}

export type LeadAttribution = {
  purpose: { primary: string; additional: string[]; multiple: boolean; primaryKey: string }
  conversion: { form: string; page: string | null; at: string | null }
  acquisition: {
    first: TouchView | null
    last: TouchView | null
    conversionPage: string | null
    visitor: string | null
    /** False for leads from before the snapshot existed: rebuilt from the lead's columns. */
    fromSnapshot: boolean
  }
  whatsapp: WhatsappIntentSummary[]
  journey: VisitorJourney | null
}
