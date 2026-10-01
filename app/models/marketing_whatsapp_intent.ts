import { belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { MarketingWhatsappIntentSchema } from '#database/schema'
import type { WhatsappContext } from '#config/marketing'
import type { Intent } from '#shared/tracking'
import type { TouchPair } from '#shared/journey'
import MarketingVisitor from '#models/marketing_visitor'
import DemoRequest from '#models/demo_request'
import User from '#models/user'

const json = {
  prepare: (value: unknown) =>
    value === null || value === undefined ? null : JSON.stringify(value),
  consume: (value: unknown) => (typeof value === 'string' ? JSON.parse(value) : (value ?? null)),
}

/**
 * A WhatsApp CTA click and its reference ("Ref: M7K4P2"). Intent, not a
 * lead: the site only knows WhatsApp was opened. Sales confirms a real
 * conversation by hand ("Mark as contacted") and may link it to a lead.
 *
 * The reference is an attribution reference only, never an access token:
 * looking it up needs an authorised back-office user.
 */
export default class MarketingWhatsappIntent extends MarketingWhatsappIntentSchema {
  static table = 'marketing_whatsapp_intents'

  @column()
  declare context: WhatsappContext

  @column()
  declare interestCategory: Intent | null

  /** First touch and the click's visit touch, frozen at click time. */
  @column(json)
  declare attribution: TouchPair | null

  @column()
  declare linkMethod: 'same_visitor' | 'manual' | null

  @belongsTo(() => MarketingVisitor, { foreignKey: 'visitorId' })
  declare visitor: BelongsTo<typeof MarketingVisitor>

  @belongsTo(() => DemoRequest, { foreignKey: 'demoRequestId' })
  declare lead: BelongsTo<typeof DemoRequest>

  @belongsTo(() => User, { foreignKey: 'contactedBy' })
  declare contactedByUser: BelongsTo<typeof User>
}
