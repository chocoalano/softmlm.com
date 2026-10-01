/**
 * Languages and colour themes of the public marketing site. Shared by the
 * server (routes, SEO, redirects), the browser (links, switchers) and tests.
 *
 * Every marketing URL starts with its locale: /en/pricing, /id/pricing.
 * The admin and staff login are not localized and have no prefix.
 */

export const LOCALES = ['en', 'id'] as const
export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'

/** Names shown in the language switcher, each in its own language. */
export const LOCALE_NAMES: Record<Locale, string> = {
  en: 'English',
  id: 'Bahasa Indonesia',
}

/**
 * Cookies holding an explicit choice. Both are plain (unsigned) cookies
 * written by the browser and read by the server, so the first HTML already
 * has the right language link target and theme.
 */
export const LOCALE_COOKIE = 'mlmsoft_locale'
export const THEME_COOKIE = 'mlmsoft_theme'
export const PREFERENCE_MAX_AGE = 60 * 60 * 24 * 365

export const THEMES = ['light', 'dark', 'system'] as const
export type ThemePreference = (typeof THEMES)[number]
export type ColorScheme = 'light' | 'dark'

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value)
}

export function isThemePreference(value: unknown): value is ThemePreference {
  return typeof value === 'string' && (THEMES as readonly string[]).includes(value)
}

/**
 * Splits "/id/pricing" into its locale and the path without it ("/pricing").
 * A path without a locale prefix returns `locale: null`.
 */
export function splitLocale(pathname: string): { locale: Locale | null; path: string } {
  const match = pathname.match(/^\/([a-z]{2})(?=\/|$)(.*)$/)
  if (match && isLocale(match[1])) return { locale: match[1], path: match[2] || '/' }
  return { locale: null, path: pathname || '/' }
}

/**
 * Turns a marketing path into its URL for a locale:
 *   "/"              → "/id"
 *   "/pricing#faq"   → "/id/pricing#faq"
 *   "/#network"      → "/id#network"
 *   "/en/pricing"    → "/id/pricing"   (already localized: locale swapped)
 * Same-page anchors ("#demo") and absolute URLs are returned unchanged.
 */
export function localizePath(href: string, locale: Locale): string {
  if (!href.startsWith('/') || href.startsWith('//')) return href

  const hashIndex = href.search(/[?#]/)
  const pathname = hashIndex === -1 ? href : href.slice(0, hashIndex)
  const suffix = hashIndex === -1 ? '' : href.slice(hashIndex)
  const { path } = splitLocale(pathname)

  return `/${locale}${path === '/' ? '' : path}${suffix}`
}
