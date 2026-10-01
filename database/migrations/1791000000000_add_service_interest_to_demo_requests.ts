import { BaseSchema } from '@adonisjs/lucid/schema'

/**
 * Phase 9: the site now also offers growth services (social media, SEO,
 * advertising, branding, product development / maklon), and their
 * consultation requests go through the same lead pipeline.
 *
 * - `service_interests`: JSON array of stable keys (`software`,
 *   `social_media`, `seo`, `paid_advertising`, `branding`,
 *   `product_maklon`). NULL means a software demo or estimate request,
 *   which is what every existing lead is, so no backfill is needed.
 * - `service_details`: optional JSON answers from a service page (today the
 *   maklon needs selector). NULL when there are none.
 *
 * The table keeps its name: `demo_requests` now stores all marketing leads
 * (see docs/services-marketing-strategy.md).
 */
export default class extends BaseSchema {
  protected tableName = 'demo_requests'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.json('service_interests').nullable()
      table.json('service_details').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('service_interests')
      table.dropColumn('service_details')
    })
  }
}
