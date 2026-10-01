import { isConsultationSource } from '#config/leads'
import type DemoRequest from '#models/demo_request'
import type { Intent } from '#shared/tracking'
import { serviceLeadSource, services } from '#shared/services'

/**
 * "What is this lead contacting us about?", derived from what the visitor
 * chose, by fixed rules (docs/marketing-attribution.md). Nothing is scored
 * or guessed.
 *
 * 1. Topics chosen in a consultation form. On a service page whose own
 *    service is among them, that service is the primary purpose and the
 *    rest are additional. One topic is the purpose. Several topics without
 *    a page to decide between them → "Multiple", with every topic listed.
 * 2. Otherwise the form's source: compensation page → compensation,
 *    pricing and estimator → pricing, how we do it → implementation, a
 *    feature page → that feature (from the page it was sent on), anything
 *    else → software.
 * 3. Modules ticked and an estimate saying the current system will be
 *    replaced add their purposes (compensation, network, ecommerce, wallet
 *    and payout, integration, migration).
 */
export type ContactPurpose = {
  primary: Intent
  additional: Intent[]
  /** More than one purpose (the primary may itself be "multiple"). */
  multiple: boolean
}

const SOURCE_PURPOSE: Partial<Record<string, Intent>> = {
  compensation_page: 'compensation',
  pricing_page: 'pricing',
  homepage_estimator: 'pricing',
  implementation_page: 'implementation',
  integration_page: 'integration',
}

const MODULE_PURPOSE: Partial<Record<string, Intent>> = {
  compensation: 'compensation',
  network: 'network',
  ecommerce: 'ecommerce',
  wallet_payout: 'wallet_payout',
  api_integrations: 'integration',
}

const FEATURE_PAGES: [RegExp, Intent][] = [
  [/\/features\/network-management$/, 'network'],
  [/\/features\/ecommerce$/, 'ecommerce'],
  [/\/features\/wallet-payout$/, 'wallet_payout'],
]

export function contactPurposeOf(
  lead: Pick<
    DemoRequest,
    | 'serviceInterests'
    | 'source'
    | 'conversionPage'
    | 'selectedModulesSnapshot'
    | 'pricingEstimateSnapshot'
  >
): ContactPurpose {
  const chosen = lead.serviceInterests ?? []
  let purposes: Intent[]

  if (chosen.length) {
    const pageService = services.find((service) => serviceLeadSource(service.key) === lead.source)
    if (pageService && chosen.includes(pageService.key)) {
      purposes = [pageService.key, ...chosen.filter((key) => key !== pageService.key)]
    } else if (chosen.length === 1) {
      purposes = [...chosen]
    } else {
      return { primary: 'multiple', additional: [...chosen], multiple: true }
    }
  } else {
    let primary: Intent = SOURCE_PURPOSE[lead.source] ?? 'software'
    if (lead.source === 'feature_page') {
      primary =
        FEATURE_PAGES.find(([pattern]) => pattern.test(lead.conversionPage ?? ''))?.[1] ??
        'software'
    }
    purposes = [primary]
    const modules = lead.selectedModulesSnapshot ?? lead.pricingEstimateSnapshot?.modules ?? []
    for (const module of modules) {
      const purpose = MODULE_PURPOSE[module]
      if (purpose) purposes.push(purpose)
    }
    if (lead.pricingEstimateSnapshot?.currentSystem === 'replacing') purposes.push('migration')
  }

  const unique = [...new Set(purposes)]
  return { primary: unique[0], additional: unique.slice(1), multiple: unique.length > 1 }
}

/** The kind of form a lead came through: consultation, estimate or demo. */
export function leadFormOf(lead: Pick<DemoRequest, 'source' | 'pricingEstimateSnapshot'>) {
  if (isConsultationSource(lead.source)) return 'consultation' as const
  return lead.pricingEstimateSnapshot ? ('estimate' as const) : ('demo' as const)
}
