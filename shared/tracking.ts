/**
 * First-party marketing tracking (docs/marketing-attribution.md): the
 * events and intent categories shared by the browser collector, the server
 * and the back office. Controlled values only: nothing here is free text.
 */

/**
 * What a visitor or lead is about. Used for events (`interest_category`)
 * and for a lead's contact purpose.
 */
export const INTENTS = [
  'software',
  'compensation',
  'network',
  'ecommerce',
  'wallet_payout',
  'pricing',
  'implementation',
  'migration',
  'integration',
  'security',
  'social_media',
  'seo',
  'paid_advertising',
  'branding',
  'product_maklon',
  'multiple',
  'other',
] as const

export type Intent = (typeof INTENTS)[number]

/** How the back office and sales emails name each intent. */
export const INTENT_LABELS: Record<Intent, string> = {
  software: 'Software',
  compensation: 'Compensation',
  network: 'Network',
  ecommerce: 'Ecommerce',
  wallet_payout: 'Wallet & Payout',
  pricing: 'Pricing',
  implementation: 'Implementation',
  migration: 'Migration',
  integration: 'Integration',
  security: 'Security & Access',
  social_media: 'Social Media',
  seo: 'SEO',
  paid_advertising: 'Paid Advertising',
  branding: 'Branding',
  product_maklon: 'Product Maklon',
  multiple: 'Multiple',
  other: 'Other',
}

/**
 * Recorded by the server itself: page views on each marketing page, WhatsApp
 * clicks (through /r/whatsapp) and form submissions (when the lead is stored).
 */
export const SERVER_EVENTS = [
  'page_view',
  'whatsapp_marketing_click',
  'demo_form_submitted',
  'consultation_form_submitted',
] as const

/**
 * The only events the browser may send to POST /marketing/events.
 */
export const CLIENT_EVENTS = [
  'service_interest',
  'feature_interest',
  'demo_form_started',
  'consultation_form_started',
  'pricing_started',
  'pricing_completed',
  'language_changed',
] as const

/**
 * Events that show an explicit interest: the visitor clicked a WhatsApp
 * CTA, chose a service or feature, completed the needs estimate or sent a
 * form. Everything else (page views, a form merely focused) only shows
 * what the visitor browsed.
 */
export const EXPLICIT_EVENTS = [
  'whatsapp_marketing_click',
  'service_interest',
  'feature_interest',
  'pricing_completed',
  'demo_form_submitted',
  'consultation_form_submitted',
] as const

/**
 * Stored as the referrer host of a visit that started from another page of
 * this site (the previous visit timed out): shown as "Internal", never as
 * "Direct". Parentheses keep it apart from any real host name.
 */
export const INTERNAL_REFERRER = '(internal)'

export type ServerEvent = (typeof SERVER_EVENTS)[number]
export type ClientEvent = (typeof CLIENT_EVENTS)[number]
export type TrackingEvent = ServerEvent | ClientEvent
