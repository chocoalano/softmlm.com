import { BaseSchema } from '@adonisjs/lucid/schema'

/**
 * Phase 9.5 addendum (docs/marketing-attribution.md).
 *
 * - `marketing_whatsapp_intents`: one row per WhatsApp CTA click, with its
 *   short random reference ("M7K4P2"), expiry, the attribution at the time
 *   of the click, and what sales did with it (contacted, linked lead).
 *   A WhatsApp intent is not a lead. It keeps its own attribution, so it
 *   survives the cleanup of the anonymous visitor it came from.
 * - `marketing_events.reference` moves to the intent: the intent table is
 *   the only place a reference lives.
 * - `demo_requests.attribution_snapshot`: the lead's first/last touch,
 *   conversion page and visitor reference, frozen when the lead is created.
 *
 * Portable across SQLite and MySQL 8: standard types, indexes on short
 * columns only.
 */
export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('marketing_events', (table) => {
      table.dropUnique(['reference'])
    })
    this.schema.alterTable('marketing_events', (table) => {
      table.dropColumn('reference')
    })

    this.schema.createTable('marketing_whatsapp_intents', (table) => {
      table.increments('id')
      table.string('reference', 12).notNullable().unique()
      table
        .integer('visitor_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('marketing_visitors')
        .onDelete('SET NULL')
      table
        .integer('session_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('marketing_sessions')
        .onDelete('SET NULL')
      table
        .bigInteger('event_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('marketing_events')
        .onDelete('SET NULL')
      table.string('context', 40).notNullable()
      table.string('page', 255).nullable()
      table.string('section', 40).nullable()
      table.string('locale', 8).nullable()
      table.string('interest_category', 40).nullable()
      /** First touch and the click's visit touch, as TouchPair JSON. */
      table.json('attribution').nullable()
      table.timestamp('clicked_at').notNullable()
      table.timestamp('expires_at').notNullable()
      table.timestamp('contacted_at').nullable()
      table
        .integer('contacted_by')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('users')
        .onDelete('SET NULL')
      table
        .integer('demo_request_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('demo_requests')
        .onDelete('SET NULL')
      /** "same_visitor" (the lead came from the same browser) or "manual" (sales). */
      table.string('link_method', 16).nullable()
      table.timestamp('linked_at').nullable()
      table
        .integer('linked_by')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('users')
        .onDelete('SET NULL')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.index(['clicked_at'])
      table.index(['visitor_id'])
      table.index(['demo_request_id'])
      table.index(['contacted_at'])
      table.index(['interest_category'])
    })

    this.schema.alterTable('demo_requests', (table) => {
      table.json('attribution_snapshot').nullable()
    })
  }

  async down() {
    this.schema.alterTable('demo_requests', (table) => {
      table.dropColumn('attribution_snapshot')
    })
    this.schema.dropTable('marketing_whatsapp_intents')
    this.schema.alterTable('marketing_events', (table) => {
      table.string('reference', 12).nullable().unique()
    })
  }
}
