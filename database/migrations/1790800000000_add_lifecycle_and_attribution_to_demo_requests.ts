import { BaseSchema } from '@adonisjs/lucid/schema'

/**
 * Turns demo requests into sales leads: lifecycle status and timestamps,
 * acquisition attribution, privacy-safe spam signals and JSON snapshots of
 * what the visitor selected. The free-text `modules` column is replaced by
 * `selected_modules_snapshot`; existing values are carried over.
 */
export default class extends BaseSchema {
  protected tableName = 'demo_requests'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('status', 32).notNullable().defaultTo('new')
      table.timestamp('contacted_at').nullable()
      table.timestamp('qualified_at').nullable()
      table.timestamp('demo_scheduled_at').nullable()
      table.timestamp('converted_at').nullable()
      table.timestamp('closed_at').nullable()

      table.string('source', 64).notNullable().defaultTo('homepage_demo')
      table.string('landing_page', 2048).nullable()
      table.string('referrer', 2048).nullable()
      table.string('utm_source', 200).nullable()
      table.string('utm_medium', 200).nullable()
      table.string('utm_campaign', 200).nullable()
      table.string('utm_content', 200).nullable()
      table.string('utm_term', 200).nullable()

      table.string('ip_hash', 64).nullable()
      table.string('user_agent', 512).nullable()

      table.json('pricing_estimate_snapshot').nullable()
      table.json('selected_modules_snapshot').nullable()

      table.index(['status', 'created_at'])
      table.index(['email', 'created_at'])
      table.index(['phone', 'created_at'])
      table.index(['created_at'])
    })

    this.defer(async (db) => {
      const rows = await db.from(this.tableName).whereNotNull('modules').select('id', 'modules')
      for (const row of rows) {
        const modules = String(row.modules)
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean)
        await db
          .from(this.tableName)
          .where('id', row.id)
          .update({ selected_modules_snapshot: JSON.stringify(modules) })
      }
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('modules')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.text('modules').nullable()
    })

    this.defer(async (db) => {
      const rows = await db
        .from(this.tableName)
        .whereNotNull('selected_modules_snapshot')
        .select('id', 'selected_modules_snapshot')
      for (const row of rows) {
        const modules = JSON.parse(row.selected_modules_snapshot) as string[]
        await db
          .from(this.tableName)
          .where('id', row.id)
          .update({ modules: modules.join(', ') })
      }
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.dropIndex(['status', 'created_at'])
      table.dropIndex(['email', 'created_at'])
      table.dropIndex(['phone', 'created_at'])
      table.dropIndex(['created_at'])
      table.dropColumns(
        'status',
        'contacted_at',
        'qualified_at',
        'demo_scheduled_at',
        'converted_at',
        'closed_at',
        'source',
        'landing_page',
        'referrer',
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'utm_content',
        'utm_term',
        'ip_hash',
        'user_agent',
        'pricing_estimate_snapshot',
        'selected_modules_snapshot'
      )
    })
  }
}
