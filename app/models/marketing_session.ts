import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { MarketingSessionSchema } from '#database/schema'
import MarketingVisitor from '#models/marketing_visitor'

/**
 * One visit: it starts on a marketing page and ends after 30 minutes of
 * inactivity or when the visitor arrives through a new campaign. Keeps the
 * visit's own touch (landing page, external referrer, UTM tags).
 */
export default class MarketingSession extends MarketingSessionSchema {
  static table = 'marketing_sessions'

  @belongsTo(() => MarketingVisitor, { foreignKey: 'visitorId' })
  declare visitor: BelongsTo<typeof MarketingVisitor>
}
