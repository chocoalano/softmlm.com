/**
 * The Privacy Notice and the Terms of Use (docs/legal-review.md). Routes,
 * SEO, the footer, the lead form's consent line and the pages read this
 * module. Both texts are drafts that describe the site's actual behaviour;
 * they still need a final legal and business review before production
 * sign-off.
 */

export const PRIVACY_PATH = '/privacy'
export const TERMS_PATH = '/terms'

/** The `page` value sent with conversion events (see shared/analytics.ts). */
export const PRIVACY_TRACKING_PAGE = 'privacy'
export const TERMS_TRACKING_PAGE = 'terms'

/** The date shown as "Last updated" on both pages (ISO, for <time datetime>). */
export const LEGAL_UPDATED = '2026-10-01'

/** Where a visitor turns first-party analytics off or back on. */
export const TRACKING_PREFERENCE_PATH = '/privacy/tracking'

/**
 * Whether this browser is counted by the first-party analytics, as the
 * Privacy Notice shows it: switched off for everyone (`disabled`), Global
 * Privacy Control sent (`gpc`), turned off by the visitor (`off`), or on.
 */
export type TrackingPreference = 'on' | 'off' | 'gpc' | 'disabled'
