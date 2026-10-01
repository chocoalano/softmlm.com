import './css/app.css'
import './css/site.css'
import 'vue-sonner/style.css'
import { client } from '~/client'
import { createInertiaApp } from '@inertiajs/vue3'
import { TuyauProvider } from '@adonisjs/inertia/vue'
import { createApp, type DefineComponent, h } from 'vue'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { isLocale } from '@shared/locales'
import { MARKETING_BRAND_NAME } from '@shared/brand'
import { loadMessages } from '~/i18n'
import { initSiteTheme } from '~/composables/site_theme'
import { setDisplayTimeZone } from '~/components/admin/lead_format'

const appName = MARKETING_BRAND_NAME

/**
 * Marketing pages carry SEO metadata (or are the marketing 404 or error
 * page); only they need the marketing copy and theme.
 */
function isMarketingPage(name: string, props: Record<string, unknown>) {
  return props.seo !== undefined || name === 'marketing_not_found' || name === 'errors/server_error'
}

createInertiaApp({
  title: (title) => (title ? `${title} | ${appName}` : appName),
  resolve: async (name, page) => {
    const props = (page?.props ?? {}) as Record<string, unknown>
    if (isMarketingPage(name, props)) {
      initSiteTheme(props.siteTheme)
      await loadMessages(isLocale(props.locale) ? props.locale : 'en')
    } else {
      setDisplayTimeZone(props.timezone)
    }
    return resolvePageComponent(
      `./pages/${name}.vue`,
      import.meta.glob<DefineComponent>('./pages/**/*.vue')
    )
  },
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(TuyauProvider, { client }, { default: () => h(App, props) }) })
      .use(plugin)
      .mount(el)
  },
  progress: {
    color: '#4B5563',
  },
})
