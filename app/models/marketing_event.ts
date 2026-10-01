import { column } from '@adonisjs/lucid/orm'
import { MarketingEventSchema } from '#database/schema'
import type { Intent, TrackingEvent } from '#shared/tracking'

const json = {
  prepare: (value: unknown) =>
    value === null || value === undefined ? null : JSON.stringify(value),
  consume: (value: unknown) => (typeof value === 'string' ? JSON.parse(value) : (value ?? null)),
}

/**
 * Allowlisted metadata: a few enumerated keys per event, never free text
 * (see MarketingTracker.cleanMetadata).
 */
export type EventMetadata = {
  from?: string
  to?: string
  mode?: string
  form?: string
  source?: string
  context?: string
  variant?: string
}

/**
 * One meaningful marketing event of a visitor. Columns are controlled
 * values; nothing a visitor types is ever stored here.
 */
export default class MarketingEvent extends MarketingEventSchema {
  static table = 'marketing_events'

  @column()
  declare eventName: TrackingEvent

  @column()
  declare interestCategory: Intent | null

  @column(json)
  declare metadata: EventMetadata | null
}
