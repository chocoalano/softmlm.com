import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { MarketingVisitorSchema } from '#database/schema'
import MarketingSession from '#models/marketing_session'
import MarketingEvent from '#models/marketing_event'

/**
 * An anonymous browser, known only by a random UUID from a first-party
 * cookie, with the touch it first arrived through. Never holds personal
 * data: a visitor becomes identifiable only through a lead it submits.
 */
export default class MarketingVisitor extends MarketingVisitorSchema {
  static table = 'marketing_visitors'

  @hasMany(() => MarketingSession, { foreignKey: 'visitorId' })
  declare sessions: HasMany<typeof MarketingSession>

  @hasMany(() => MarketingEvent, { foreignKey: 'visitorId' })
  declare events: HasMany<typeof MarketingEvent>
}
