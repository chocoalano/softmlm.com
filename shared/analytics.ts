/**
 * Provider-agnostic analytics hook. Pages call `track()`; listeners attach
 * with `onTrack()`: the first-party collector (inertia/composables/
 * first_party_tracking.ts, docs/marketing-attribution.md) and, when a tag
 * manager defined it, `window.dataLayer`. A failing listener never breaks
 * the other or the click.
 *
 * Only an allow-list of non-personal properties is ever forwarded: where
 * it happened, the site language and the colour scheme, and enumerated
 * values (a service, a feature, a locale). Never free text.
 */

export type AnalyticsEvent =
  | 'whatsapp_marketing_click'
  | 'service_interest'
  | 'feature_interest'
  | 'demo_form_started'
  | 'consultation_form_started'
  | 'pricing_started'
  | 'pricing_completed'
  | 'language_changed'

export type AnalyticsProps = {
  page: string
  section: string
  variant: string
  /** Site language: "en" or "id". */
  locale: string
  /** Colour scheme shown: "light" or "dark". */
  theme: string
}

/**
 * A visitor explicitly opened or picked a service (a card, a menu item, a
 * topic in the consultation form). Never fired on page view.
 */
export type ServiceInterestProps = {
  /** One of the keys in shared/services.ts (`serviceInterests`). */
  service: string
  locale: string
  page: string
}

/** A visitor explicitly opened a software feature (menu item or card). */
export type FeatureInterestProps = {
  /** software, compensation, network, ecommerce or wallet_payout */
  feature: string
  locale: string
  page: string
}

/** First interaction with a form (focus), never its content. */
export type FormStartedProps = {
  locale: string
  page: string
  /** The service preselected in a consultation form, if any. */
  interest?: string
}

export type PricingProps = { locale: string; page: string; mode: string }

export type LanguageChangedProps = { from: string; to: string }

type EventProps = {
  whatsapp_marketing_click: AnalyticsProps
  service_interest: ServiceInterestProps
  feature_interest: FeatureInterestProps
  demo_form_started: FormStartedProps
  consultation_form_started: FormStartedProps
  pricing_started: PricingProps
  pricing_completed: PricingProps
  language_changed: LanguageChangedProps
}

export type AnyEventProps = EventProps[AnalyticsEvent]

type Handler = (event: AnalyticsEvent, props: AnyEventProps) => void

export const TRACKED_FEATURES = [
  'software',
  'compensation',
  'network',
  'ecommerce',
  'wallet_payout',
  'integration',
] as const

/** Kept in step with `serviceInterests` in shared/services.ts (a unit test checks). */
export const TRACKED_SERVICES = [
  'software',
  'social_media',
  'seo',
  'paid_advertising',
  'branding',
  'product_maklon',
] as const

const handlers = new Set<Handler>()
const SLUG_KEYS = ['page', 'section', 'variant'] as const
const SAFE_VALUE = /^[a-z0-9_-]{1,40}$/
const ENUM_KEYS = { locale: ['en', 'id'], theme: ['light', 'dark'] } as const

export function onTrack(handler: Handler) {
  handlers.add(handler)
  return () => handlers.delete(handler)
}

/**
 * Keeps only allow-listed keys with short slug values, so an email, phone
 * number or free text can never reach an analytics provider.
 */
export function sanitize(props: Record<string, unknown>): AnalyticsProps {
  const clean = {} as AnalyticsProps
  for (const key of SLUG_KEYS) {
    const value = String(props[key] ?? '').toLowerCase()
    clean[key] = SAFE_VALUE.test(value) ? value : 'unknown'
  }
  for (const [key, allowed] of Object.entries(ENUM_KEYS) as [
    keyof typeof ENUM_KEYS,
    readonly string[],
  ][]) {
    const value = String(props[key] ?? '')
    clean[key] = allowed.includes(value) ? value : 'unknown'
  }
  return clean
}

/**
 * The allow-list for `service_interest`: a known service key, the page slug
 * and the language, nothing else.
 */
export function sanitizeServiceInterest(props: Record<string, unknown>): ServiceInterestProps {
  const service = String(props.service ?? '')
  const page = String(props.page ?? '').toLowerCase()
  const locale = String(props.locale ?? '')
  return {
    service: (TRACKED_SERVICES as readonly string[]).includes(service) ? service : 'unknown',
    page: SAFE_VALUE.test(page) ? page : 'unknown',
    locale: ENUM_KEYS.locale.includes(locale as 'en') ? locale : 'unknown',
  }
}

const oneOf = (value: unknown, allowed: readonly string[]) =>
  allowed.includes(String(value)) ? String(value) : 'unknown'
const slug = (value: unknown) => {
  const text = String(value ?? '').toLowerCase()
  return SAFE_VALUE.test(text) ? text : 'unknown'
}

/**
 * The allow-list of every event other than the WhatsApp click and service
 * interest: enumerated values and slugs only.
 */
export function sanitizeEvent(
  event: AnalyticsEvent,
  props: Record<string, unknown>
): AnyEventProps {
  const locale = oneOf(props.locale, ENUM_KEYS.locale)
  switch (event) {
    case 'whatsapp_marketing_click':
      return sanitize(props)
    case 'service_interest':
      return sanitizeServiceInterest(props)
    case 'feature_interest':
      return { feature: oneOf(props.feature, TRACKED_FEATURES), locale, page: slug(props.page) }
    case 'demo_form_started':
    case 'consultation_form_started':
      return {
        locale,
        page: slug(props.page),
        ...(props.interest
          ? { interest: oneOf(props.interest, [...TRACKED_SERVICES, 'integration']) }
          : {}),
      }
    case 'pricing_started':
    case 'pricing_completed':
      return { locale, page: slug(props.page), mode: oneOf(props.mode, ['quick', 'full']) }
    case 'language_changed':
      return { from: oneOf(props.from, ENUM_KEYS.locale), to: oneOf(props.to, ENUM_KEYS.locale) }
  }
}

export function track<Event extends AnalyticsEvent>(event: Event, props: EventProps[Event]) {
  const clean = sanitizeEvent(event, props as Record<string, unknown>)
  for (const handler of handlers) {
    try {
      handler(event, clean)
    } catch {
      /* an analytics failure must never break a click */
    }
  }

  const layer = (globalThis as { dataLayer?: unknown[] }).dataLayer
  if (Array.isArray(layer)) layer.push({ event, ...clean })
}
