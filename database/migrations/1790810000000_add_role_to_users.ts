import { BaseSchema } from '@adonisjs/lucid/schema'

/**
 * Roles for back-office access. Every existing and self-registered user
 * starts as a plain "user"; staff are promoted with `node ace users:role`.
 */
export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('role', 32).notNullable().defaultTo('user')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('role')
    })
  }
}
