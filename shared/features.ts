/**
 * Feature pages that exist (see docs/feature-page-strategy.md). Routes,
 * SEO, navigation and page content all read this list. Each key is also
 * the WhatsApp message context for its page.
 */

export const FEATURES_PATH = '/features'

export const features = [
  { key: 'network', slug: 'network-management' },
  { key: 'ecommerce', slug: 'ecommerce' },
  { key: 'wallet', slug: 'wallet-payout' },
] as const

export type Feature = (typeof features)[number]
export type FeatureKey = Feature['key']

export function featurePath(feature: Pick<Feature, 'slug'>) {
  return `${FEATURES_PATH}/${feature.slug}`
}

export function findFeature(key: FeatureKey): Feature {
  return features.find((feature) => feature.key === key)!
}

/**
 * The `page` value sent with conversion events (see shared/analytics.ts).
 */
export function featureTrackingPage(key: FeatureKey) {
  return `feature_${key}`
}
