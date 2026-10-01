import { belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DemoRequestActivitySchema } from '#database/schema'
import type { LeadStatus } from '#config/leads'
import User from '#models/user'

export type DemoRequestActivityType =
  | 'status_changed'
  | 'note'
  | 'notification_sent'
  | 'notification_failed'
  | 'whatsapp_linked'
  | 'whatsapp_unlinked'
  | 'whatsapp_contacted'

export default class DemoRequestActivity extends DemoRequestActivitySchema {
  static updatedAt = false as const

  @column()
  declare type: DemoRequestActivityType

  @column()
  declare fromStatus: LeadStatus | null

  @column()
  declare toStatus: LeadStatus | null

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
