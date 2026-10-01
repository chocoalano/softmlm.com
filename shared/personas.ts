/**
 * The roles the "Who We Serve" pages speak to. Routes, SEO metadata,
 * navigation and page content all read this list, so the five pages never
 * drift apart. Each key is also the WhatsApp message context for its page
 * (see `whatsappMessages` in config/marketing.ts).
 *
 * Role names are copy: see `roles` in the `common` area of inertia/i18n.
 */

export const WHO_WE_SERVE_PATH = '/who-we-serve'

export const personas = [
  { key: 'executives', slug: 'executives' },
  { key: 'finance', slug: 'finance' },
  { key: 'operations', slug: 'operations' },
  { key: 'it', slug: 'it-teams' },
  { key: 'distributors', slug: 'distributors' },
] as const

export type Persona = (typeof personas)[number]
export type PersonaKey = Persona['key']

export function personaPath(persona: Pick<Persona, 'slug'>) {
  return `${WHO_WE_SERVE_PATH}/${persona.slug}`
}

export function findPersona(key: PersonaKey): Persona {
  return personas.find((persona) => persona.key === key)!
}

/**
 * The `page` value sent with conversion events (see shared/analytics.ts).
 */
export function personaTrackingPage(key: PersonaKey) {
  return `who_we_serve_${key}`
}
