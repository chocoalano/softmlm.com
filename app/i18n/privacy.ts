import { DEFAULT_LOCALE, isLocale, type Locale } from '#shared/locales'

/**
 * What the analytics switch on the Privacy Notice answers, in the page's
 * language.
 */
const text: Record<Locale, { off: string; on: string }> = {
  en: {
    off: 'Analytics is off for this browser.',
    on: 'Analytics is on for this browser.',
  },
  id: {
    off: 'Analitik dinonaktifkan untuk browser ini.',
    on: 'Analitik diaktifkan kembali untuk browser ini.',
  },
}

export function trackingPreferenceText(locale: unknown) {
  return text[isLocale(locale) ? locale : DEFAULT_LOCALE]
}
