import { BaseSchema } from '@adonisjs/lucid/schema'

/**
 * Server-side sessions (SESSION_DRIVER=database, production): signing out
 * deletes the session here, so a copied session cookie stops working.
 * The cookie store cannot do that (docs/security-audit.md).
 */
export default class extends BaseSchema {
  protected tableName = 'sessions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.text('data').notNullable()
      table.string('user_id').nullable().index()
      table.timestamp('expires_at').notNullable().index()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
