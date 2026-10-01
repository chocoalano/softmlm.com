import { column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DemoRequestSchema } from '#database/schema'
import {
  interestCategoryOf,
  type InterestCategory,
  type LeadModule,
  type LeadSource,
  type LeadStatus,
  type PricingEstimateSnapshot,
  type ServiceDetails,
} from '#config/leads'
import type { ServiceInterest } from '#shared/services'
import type { Locale } from '#shared/locales'
import type { LeadAttributionSnapshot } from '#shared/journey'
import DemoRequestActivity from '#models/demo_request_activity'

const json = {
  prepare: (value: unknown) =>
    value === null || value === undefined ? null : JSON.stringify(value),
  consume: (value: unknown) => (typeof value === 'string' ? JSON.parse(value) : (value ?? null)),
}

export default class DemoRequest extends DemoRequestSchema {
  @column()
  declare status: LeadStatus

  @column()
  declare source: LeadSource

  /** The site language the visitor used ("en" or "id"). */
  @column()
  declare locale: Locale

  @column(json)
  declare pricingEstimateSnapshot: PricingEstimateSnapshot | null

  @column(json)
  declare selectedModulesSnapshot: LeadModule[] | null

  /**
   * What a consultation request is about. NULL for software demo and
   * estimate requests, including every lead from before Phase 9.
   */
  @column(json)
  declare serviceInterests: ServiceInterest[] | null

  /** Optional answers from a service page (the maklon needs selector). */
  @column(json)
  declare serviceDetails: ServiceDetails | null

  /**
   * First/last touch, conversion page and visitor reference, frozen when
   * the lead was created (docs/marketing-attribution.md). NULL for leads
   * from before the Phase 9.5 addendum.
   */
  @column(json)
  declare attributionSnapshot: LeadAttributionSnapshot | null

  /** Software inquiry, one service, or multiple services. */
  get interestCategory(): InterestCategory {
    return interestCategoryOf(this.serviceInterests)
  }

  @hasMany(() => DemoRequestActivity)
  declare activities: HasMany<typeof DemoRequestActivity>
}
