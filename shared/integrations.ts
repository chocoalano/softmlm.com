import type { Locale } from './locales.js'

/**
 * The Integrations page: integration readiness, discovery and system
 * architecture (docs/integrations-marketing.md). Routes, SEO, navigation,
 * tracking and the page read this module.
 */

export const INTEGRATIONS_PATH = '/integrations'

/** The `page` value sent with conversion events (see shared/analytics.ts). */
export const INTEGRATIONS_TRACKING_PAGE = 'integrations'

/** Broad integration areas the page discusses. Categories, never providers. */
export const integrationAreas = [
  'payments',
  'banking',
  'logistics',
  'finance',
  'messaging',
  'systems',
] as const

export type IntegrationArea = (typeof integrationAreas)[number]

/**
 * A connector that is verified in mlmsoft itself and approved for public
 * listing (status VERIFIED_IN_MLMSOFT and "Public claim allowed: Yes" in
 * docs/integration-evidence.md). `custom` means built per project on a
 * verified foundation; anything planned stays out of the public list.
 */
export type VerifiedIntegration = {
  provider: string
  area: IntegrationArea
  status: 'available' | 'custom'
  description: Record<Locale, string>
  documentationUrl?: string
}

/**
 * Empty on purpose: no provider integration is verified in mlmsoft yet.
 * The page renders an "Available integrations" section only when this list
 * has entries; a test keeps it in step with the evidence matrix.
 */
export const verifiedIntegrations: VerifiedIntegration[] = []
