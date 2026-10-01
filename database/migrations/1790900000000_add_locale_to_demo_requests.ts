import { BaseSchema } from '@adonisjs/lucid/schema'

/**
 * The language the visitor used on the site ("en" or "id"), so sales can
 * reply in it and the confirmation email is sent in it. Existing leads all
 * came from the English-only site.
 */
export default class extends BaseSchema {
  protected tableName = 'demo_requests'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('locale', 8).notNullable().defaultTo('en')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('locale')
    })
  }
}
