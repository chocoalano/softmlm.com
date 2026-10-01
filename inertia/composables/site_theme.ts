/**
 * Light, dark or "system" for the public marketing site.
 *
 * The server already renders an explicit choice onto <html> (from the
 * cookie), and a small inline style paints the right background before
 * anything loads. For "system", `initSiteTheme` resolves the device
 * preference before the app mounts and keeps following it while the
 * choice stays "system". An explicit Light or Dark is never overridden by
 * a device change.
 *
 * <html data-site-theme>  the choice: light | dark | system
 * <html data-site-scheme> what is shown: light | dark (the CSS keys off this)
 */
import { computed, readonly, ref } from 'vue'
import {
  PREFERENCE_MAX_AGE,
  THEME_COOKIE,
  isThemePreference,
  type ColorScheme,
  type ThemePreference,
} from '@shared/locales'

const preference = ref<ThemePreference>('system')
const systemDark = ref(false)

const scheme = computed<ColorScheme>(() =>
  preference.value === 'system' ? (systemDark.value ? 'dark' : 'light') : preference.value
)

function apply() {
  const root = document.documentElement
  if (!root.classList.contains('site-root')) return
  root.dataset.siteTheme = preference.value
  root.dataset.siteScheme = scheme.value
}

let initialised = false

export function initSiteTheme(initial: unknown) {
  preference.value = isThemePreference(initial) ? initial : 'system'
  if (!initialised && typeof window.matchMedia === 'function') {
    initialised = true
    const query = window.matchMedia('(prefers-color-scheme: dark)')
    systemDark.value = query.matches
    query.addEventListener('change', (event) => {
      systemDark.value = event.matches
      apply()
    })
  }
  apply()
}

/**
 * Switches instantly: colour transitions are paused for one frame so the
 * whole page doesn't fade component by component.
 */
export function setSiteTheme(next: ThemePreference) {
  const root = document.documentElement
  root.classList.add('site-theme-switching')
  preference.value = next
  apply()
  const secure = window.location.protocol === 'https:' ? '; secure' : ''
  document.cookie = `${THEME_COOKIE}=${next}; path=/; max-age=${PREFERENCE_MAX_AGE}; samesite=lax${secure}`
  requestAnimationFrame(() =>
    requestAnimationFrame(() => root.classList.remove('site-theme-switching'))
  )
}

export function useSiteTheme() {
  return { preference: readonly(preference), scheme, setSiteTheme }
}
