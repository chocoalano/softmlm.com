import { track } from '@shared/analytics'

/**
 * What each software feature link stands for as an interest (first-party
 * tracking, docs/marketing-attribution.md). Pages that are about the
 * software in general count as "software".
 */
const FEATURE_INTERESTS: Record<string, string> = {
  compensation: 'compensation',
  network: 'network',
  ecommerce: 'ecommerce',
  wallet: 'wallet_payout',
  distributors: 'software',
  operations: 'software',
  integrations: 'integration',
  security: 'security',
}

/** A visitor explicitly opened a feature (menu item or card). */
export function exploreFeature(key: string, page: string, locale: string) {
  track('feature_interest', { feature: FEATURE_INTERESTS[key] ?? 'software', page, locale })
}
