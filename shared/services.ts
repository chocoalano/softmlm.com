/**
 * Growth services (docs/services-marketing-strategy.md): professional
 * services around the software, which stays the core offering. Routes, SEO,
 * navigation, lead options and the pages all read this list.
 */

export const SERVICES_PATH = '/services'

/** The `page` value of the services hub in conversion events. */
export const SERVICES_TRACKING_PAGE = 'services'

export const services = [
  { key: 'social_media', slug: 'social-media', whatsapp: 'service_social_media' },
  { key: 'seo', slug: 'seo', whatsapp: 'service_seo' },
  { key: 'paid_advertising', slug: 'paid-advertising', whatsapp: 'service_paid_ads' },
  { key: 'branding', slug: 'branding', whatsapp: 'service_branding' },
  { key: 'product_maklon', slug: 'product-maklon', whatsapp: 'service_product_maklon' },
] as const

export type Service = (typeof services)[number]
export type ServiceKey = Service['key']

/**
 * What a lead can be interested in: the software, or one of the services.
 * Stored as these keys in `demo_requests.service_interests`.
 */
export const serviceInterests = ['software', ...services.map((service) => service.key)] as [
  'software',
  ...ServiceKey[],
]
export type ServiceInterest = 'software' | ServiceKey

export function servicePath(service: Pick<Service, 'slug'>) {
  return `${SERVICES_PATH}/${service.slug}`
}

export function findService(key: ServiceKey): Service {
  return services.find((service) => service.key === key)!
}

/** The `page` value sent with conversion events (see shared/analytics.ts). */
export function serviceTrackingPage(key: ServiceKey) {
  return `service_${key}`
}

/** The lead source a service page's consultation form sends. */
export function serviceLeadSource(key: ServiceKey) {
  return `service_${key}` as const
}
