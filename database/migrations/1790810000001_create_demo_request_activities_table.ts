import { BaseSchema } from '@adonisjs/lucid/schema'

/**
 * Append-only history of what happened to a lead: status changes and
 * internal notes, with who did it and when. Nothing here is ever updated
 * in place, so the timeline doubles as an audit trail.
 */
export default class extends BaseSchema {
  protected tableName = 'demo_request_activities'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table
        .integer('demo_request_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('demo_requests')
        .onDelete('CASCADE')
      table
        .integer('user_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('users')
        .onDelete('SET NULL')
      table.string('type', 32).notNullable()
      table.string('from_status', 32).nullable()
      table.string('to_status', 32).nullable()
      table.text('body').nullable()
      table.timestamp('created_at').notNullable()

      table.index(['demo_request_id', 'created_at'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
