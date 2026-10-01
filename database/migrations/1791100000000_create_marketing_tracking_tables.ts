import { BaseSchema } from '@adonisjs/lucid/schema'

/**
 * Phase 9.5: first-party marketing tracking (docs/marketing-attribution.md).
 *
 * - `marketing_visitors`: one pseudonymous browser (random UUID cookie) and
 *   its first touch. No personal data.
 * - `marketing_sessions`: one visit, with its own touch (landing page,
 *   referrer, UTM). A visit ends after 30 minutes of inactivity or a new
 *   campaign.
 * - `marketing_events`: meaningful events only, with controlled columns
 *   and an allowlisted `metadata` object.
 * - `demo_requests`: links a lead to the visitor and visit it came from,
 *   plus the page it was submitted on. Plain indexed columns (no foreign
 *   key constraint) so the existing table is not rebuilt; the cleanup
 *   command never deletes a visitor that is linked to a lead.
 *
 * Portable across SQLite (development, tests) and MySQL 8 (production):
 * standard types, no database-specific defaults.
 */
export default class extends BaseSchema {
  async up() {
    this.schema.createTable('marketing_visitors', (table) => {
      table.increments('id')
      table.string('visitor_uuid', 36).notNullable().unique()
      table.timestamp('first_seen_at').notNullable()
      table.timestamp('last_seen_at').notNullable()
      table.string('first_locale', 8).nullable()
      table.string('first_landing_page', 255).nullable()
      table.string('first_referrer', 255).nullable()
      table.string('first_referrer_host', 255).nullable()
      table.string('first_utm_source', 200).nullable()
      table.string('first_utm_medium', 200).nullable()
      table.string('first_utm_campaign', 200).nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.index(['last_seen_at'])
      table.index(['first_utm_source'])
      table.index(['first_utm_campaign'])
    })

    this.schema.createTable('marketing_sessions', (table) => {
      table.increments('id')
      table
        .integer('visitor_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('marketing_visitors')
        .onDelete('CASCADE')
      table.string('session_uuid', 36).notNullable().unique()
      table.timestamp('started_at').notNullable()
      table.timestamp('last_activity_at').notNullable()
      table.string('landing_page', 255).nullable()
      table.string('referrer', 255).nullable()
      table.string('referrer_host', 255).nullable()
      table.string('utm_source', 200).nullable()
      table.string('utm_medium', 200).nullable()
      table.string('utm_campaign', 200).nullable()
      table.string('utm_content', 200).nullable()
      table.string('utm_term', 200).nullable()
      table.string('locale', 8).nullable()
      table.string('device_category', 16).nullable()

      table.index(['visitor_id', 'started_at'])
      table.index(['started_at'])
      table.index(['utm_source'])
      table.index(['utm_campaign'])
      table.index(['referrer_host'])
    })

    this.schema.createTable('marketing_events', (table) => {
      table.bigIncrements('id')
      table
        .integer('visitor_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('marketing_visitors')
        .onDelete('CASCADE')
      table
        .integer('session_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('marketing_sessions')
        .onDelete('SET NULL')
      table.string('event_name', 40).notNullable()
      table.string('page', 255).nullable()
      table.string('section', 40).nullable()
      table.string('locale', 8).nullable()
      table.string('theme', 8).nullable()
      table.string('interest_category', 40).nullable()
      /** Short WhatsApp reference ("K7Q2MX"), only on WhatsApp clicks. */
      table.string('reference', 12).nullable().unique()
      table.json('metadata').nullable()
      table.timestamp('occurred_at').notNullable()

      table.index(['visitor_id', 'occurred_at'])
      table.index(['session_id'])
      table.index(['event_name', 'occurred_at'])
      table.index(['occurred_at'])
      table.index(['interest_category'])
    })

    this.schema.alterTable('demo_requests', (table) => {
      table.integer('marketing_visitor_id').unsigned().nullable().index()
      table.integer('marketing_session_id').unsigned().nullable()
      table.string('conversion_page', 255).nullable()
    })
  }

  async down() {
    this.schema.alterTable('demo_requests', (table) => {
      table.dropIndex(['marketing_visitor_id'])
      table.dropColumn('marketing_visitor_id')
      table.dropColumn('marketing_session_id')
      table.dropColumn('conversion_page')
    })
    this.schema.dropTable('marketing_events')
    this.schema.dropTable('marketing_sessions')
    this.schema.dropTable('marketing_visitors')
  }
}
