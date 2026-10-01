/**
 * Copy for the public marketing site, in English and Bahasa Indonesia.
 *
 * Every piece of text lives in a dictionary under i18n/en or i18n/id, one
 * file per area (common, home, pricing…). The English file is the shape;
 * the Indonesian file must match it (TypeScript enforces this), so a key
 * can never be missing in one language. Components read their area with
 * `useCopy('pricing')` and never branch on the locale themselves.
 *
 * Only the active language is downloaded: each locale is its own chunk,
 * loaded before the page mounts (see app.ts), so there is no flash of the
 * other language.
 */
import { computed, readonly, shallowRef, type ComputedRef } from 'vue'
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  PREFERENCE_MAX_AGE,
  localizePath,
  type Locale,
} from '@shared/locales'
import type { Messages } from './en/index'

export type { Messages }

const loaders: Record<Locale, () => Promise<{ default: Messages }>> = {
  en: () => import('./en/index'),
  id: () => import('./id/index'),
}

const cache = new Map<Locale, Messages>()
const messages = shallowRef<Messages | null>(null)
const activeLocale = shallowRef<Locale>(DEFAULT_LOCALE)

export async function loadMessages(locale: Locale) {
  if (!cache.has(locale)) {
    const module = await loaders[locale]()
    cache.set(locale, module.default)
  }
  messages.value = cache.get(locale)!
  activeLocale.value = locale
}

function current(): Messages {
  if (!messages.value) throw new Error('Marketing copy used before loadMessages()')
  return messages.value
}

/**
 * The copy of one area, in the active language.
 */
export function useCopy<Area extends keyof Messages>(area: Area): ComputedRef<Messages[Area]> {
  return computed(() => current()[area])
}

/**
 * The active locale and a helper turning a site path into its URL in that
 * locale: lp('/pricing#faq') → '/id/pricing#faq'.
 */
export function useI18n() {
  return {
    locale: readonly(activeLocale),
    lp: (path: string) => localizePath(path, activeLocale.value),
  }
}

/**
 * Remembers an explicit language choice, so "/" opens it next time.
 */
export function rememberLocale(locale: Locale) {
  const secure = window.location.protocol === 'https:' ? '; secure' : ''
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${PREFERENCE_MAX_AGE}; samesite=lax${secure}`
}
