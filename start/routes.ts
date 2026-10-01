/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import { seoFor, type MarketingPageKey } from '#config/seo'
import { publicLeadOptionsFor } from '#config/leads'
import MarketingTracker from '#services/marketing_tracker'
import {
  demoRequestThrottle,
  loginThrottle,
  marketingEventsThrottle,
  signupThrottle,
} from '#start/limiter'
import { controllers } from '#generated/controllers'
import { WHO_WE_SERVE_PATH, personaPath, personas } from '#shared/personas'
import { FEATURES_PATH, featurePath, features } from '#shared/features'
import { HOW_WE_DO_IT_PATH } from '#shared/implementation'
import { INTEGRATIONS_PATH } from '#shared/integrations'
import { SECURITY_PATH } from '#shared/security'
import { PRIVACY_PATH, TERMS_PATH, TRACKING_PREFERENCE_PATH } from '#shared/legal'
import { SERVICES_PATH, servicePath, services } from '#shared/services'
import { DEFAULT_LOCALE, LOCALES, LOCALE_COOKIE, isLocale, type Locale } from '#shared/locales'
import router from '@adonisjs/core/services/router'
import type { HttpContext } from '@adonisjs/core/http'

/**
 * "/" opens the visitor's chosen language, or English. No IP or browser
 * language detection: the choice is always the visitor's. The query string
 * is kept so campaign tags survive the redirect.
 */
router
  .get('/', ({ request, response }) => {
    const preferred = request.plainCookie(LOCALE_COOKIE, { encoded: false })
    return response
      .redirect()
      .withQs()
      .toPath(`/${isLocale(preferred) ? preferred : DEFAULT_LOCALE}`)
  })
  .as('home')

/**
 * For crawlers: built from the marketing page list (app/services/crawler_files.ts).
 */
router.get('robots.txt', [controllers.CrawlerFiles, 'robots']).as('robots')
router.get('sitemap.xml', [controllers.CrawlerFiles, 'sitemap']).as('sitemap')

/**
 * Pre-locale URLs move permanently to their English page, so no content is
 * served twice.
 */
const legacyPaths = [
  '/compensation-plans',
  '/pricing',
  WHO_WE_SERVE_PATH,
  HOW_WE_DO_IT_PATH,
  SERVICES_PATH,
  INTEGRATIONS_PATH,
  SECURITY_PATH,
  PRIVACY_PATH,
  TERMS_PATH,
  FEATURES_PATH,
]
for (const path of legacyPaths) {
  router.get(path, ({ response }) => response.redirect().withQs().status(301).toPath(`/en${path}`))
}
for (const prefix of [WHO_WE_SERVE_PATH, SERVICES_PATH, FEATURES_PATH]) {
  router
    .get(`${prefix}/:slug`, ({ params, response }) =>
      response.redirect().withQs().status(301).toPath(`/en${prefix}/${params.slug}`)
    )
    .where('slug', /^[a-z-]+$/)
}

/**
 * What every marketing page receives, in the language of its URL.
 */
function pageProps(key: MarketingPageKey, params: HttpContext['params']) {
  const locale = params.locale as Locale
  return { leadOptions: publicLeadOptionsFor(locale), seo: seoFor(key, locale) }
}

/**
 * Public marketing pages, one set per language. Visiting any of them
 * records how the visitor arrived, for lead attribution.
 */
router
  .group(() => {
    router
      .get('/', ({ params, inertia }) => inertia.render('home', pageProps('home', params)))
      .as('home')
    router
      .get('/compensation-plans', ({ params, inertia }) =>
        inertia.render('compensation_plans', pageProps('compensation_plans', params))
      )
      .as('compensation_plans')
    router
      .get('/pricing', ({ params, inertia }) =>
        inertia.render('pricing', pageProps('pricing', params))
      )
      .as('pricing')
    router
      .get(WHO_WE_SERVE_PATH, ({ params, inertia }) =>
        inertia.render('who_we_serve/index', pageProps('who_we_serve', params))
      )
      .as('who_we_serve')
    for (const persona of personas) {
      router
        .get(personaPath(persona), ({ params, inertia }) =>
          inertia.render('who_we_serve/persona', {
            ...pageProps(`who_we_serve.${persona.key}`, params),
            persona: persona.key,
          })
        )
        .as(`who_we_serve.${persona.key}`)
    }

    router
      .get(HOW_WE_DO_IT_PATH, ({ params, inertia }) =>
        inertia.render('how_we_do_it', pageProps('how_we_do_it', params))
      )
      .as('how_we_do_it')

    router
      .get(INTEGRATIONS_PATH, ({ params, inertia }) =>
        inertia.render('integrations', pageProps('integrations', params))
      )
      .as('integrations')

    router
      .get(SECURITY_PATH, ({ params, inertia }) =>
        inertia.render('security', pageProps('security', params))
      )
      .as('security')

    router
      .get(PRIVACY_PATH, ({ params, request, inertia }) =>
        inertia.render('legal/privacy', {
          ...pageProps('privacy', params),
          trackingPreference: MarketingTracker.preference(request),
        })
      )
      .as('privacy')

    router
      .get(TERMS_PATH, ({ params, inertia }) =>
        inertia.render('legal/terms', pageProps('terms', params))
      )
      .as('terms')

    router
      .get(SERVICES_PATH, ({ params, inertia }) =>
        inertia.render('services/index', pageProps('services', params))
      )
      .as('services')
    for (const service of services) {
      router
        .get(servicePath(service), ({ params, inertia }) =>
          inertia.render('services/service', {
            ...pageProps(`services.${service.key}`, params),
            service: service.key,
          })
        )
        .as(`services.${service.key}`)
    }

    router
      .get(FEATURES_PATH, ({ params, inertia }) =>
        inertia.render('features/index', pageProps('features', params))
      )
      .as('features')
    for (const feature of features) {
      router
        .get(featurePath(feature), ({ params, inertia }) =>
          inertia.render('features/feature', {
            ...pageProps(`features.${feature.key}`, params),
            feature: feature.key,
          })
        )
        .as(`features.${feature.key}`)
    }

    /**
     * Anything else under a language prefix: a 404 in that language, with
     * the site's navigation, instead of a bare error page.
     */
    router
      .get('/*', ({ params, response, inertia }: HttpContext) => {
        response.status(404)
        return inertia.render('marketing_not_found', { locale: params.locale as Locale })
      })
      .as('not_found')
  })
  .prefix('/:locale')
  .where('locale', new RegExp(`^(?:${LOCALES.join('|')})$`))
  .as('marketing')
  .use([middleware.captureAttribution(), middleware.trackVisit()])

router
  .post('demo-requests', [controllers.DemoRequests, 'store'])
  .use(demoRequestThrottle)
  .as('demo_requests.store')

/**
 * First-party marketing tracking (docs/marketing-attribution.md): browser
 * events, and WhatsApp clicks recorded before the visitor is sent on.
 */
router
  .post('marketing/events', [controllers.MarketingEvents, 'store'])
  .use(marketingEventsThrottle)
  .as('marketing.events.store')
/**
 * The analytics switch on the Privacy Notice: sets or clears this
 * browser's opt-out cookie.
 */
router
  .post(TRACKING_PREFERENCE_PATH, [controllers.TrackingPreference, 'update'])
  .as('tracking_preference.update')
router
  .get('r/whatsapp/:context', [controllers.WhatsappRedirect, 'show'])
  .where('context', /^[a-z_]{2,40}$/)
  .as('whatsapp.redirect')

router
  .group(() => {
    router.get('signup', [controllers.NewAccount, 'create'])
    router.post('signup', [controllers.NewAccount, 'store']).use(signupThrottle)

    router.get('login', [controllers.Session, 'create'])
    router.post('login', [controllers.Session, 'store']).use(loginThrottle)
  })
  .use(middleware.guest())

router
  .group(() => {
    router.on('/dashboard').renderInertia('dashboard', {}).as('dashboard')
    router.post('logout', [controllers.Session, 'destroy'])
  })
  .use(middleware.auth())

/**
 * Back office. Every action also checks the "manageLeads" ability, so a
 * signed-in account without a staff role gets a 403.
 */
router
  .group(() => {
    router.get('demo-requests', [controllers.AdminDemoRequests, 'index']).as('demo_requests.index')
    router
      .get('demo-requests/:id', [controllers.AdminDemoRequests, 'show'])
      .where('id', router.matchers.number())
      .as('demo_requests.show')
    router
      .patch('demo-requests/:id/status', [controllers.AdminDemoRequests, 'updateStatus'])
      .where('id', router.matchers.number())
      .as('demo_requests.update_status')
    router
      .post('demo-requests/:id/notes', [controllers.AdminDemoRequests, 'storeNote'])
      .where('id', router.matchers.number())
      .as('demo_requests.notes.store')
  })
  .prefix('admin')
  .as('admin')
  .use(middleware.auth())

/**
 * Marketing analytics: anonymous visitors, sources, campaigns and
 * journeys. Every action checks the "viewMarketing" ability.
 */
router
  .group(() => {
    router.get('/', [controllers.AdminMarketing, 'overview']).as('overview')
    router.get('visitors', [controllers.AdminMarketing, 'visitors']).as('visitors')
    router
      .get('visitors/:uuid', [controllers.AdminMarketing, 'visitor'])
      .where('uuid', /^[0-9a-f-]{36}$/)
      .as('visitor')

    /**
     * WhatsApp intents: clicks with their reference. Viewing needs
     * "viewMarketing"; confirming a conversation or linking a lead needs
     * "manageLeads". A reference never opens anything outside this area.
     */
    router.get('whatsapp', [controllers.AdminWhatsappIntents, 'index']).as('whatsapp.index')
    router
      .group(() => {
        router.get('/', [controllers.AdminWhatsappIntents, 'show']).as('show')
        router
          .post('contacted', [controllers.AdminWhatsappIntents, 'markContacted'])
          .as('contacted')
        router
          .delete('contacted', [controllers.AdminWhatsappIntents, 'unmarkContacted'])
          .as('uncontacted')
        router.post('lead', [controllers.AdminWhatsappIntents, 'link']).as('link')
        router.delete('lead', [controllers.AdminWhatsappIntents, 'unlink']).as('unlink')
      })
      .prefix('whatsapp/:id')
      .where('id', router.matchers.number())
      .as('whatsapp')
  })
  .prefix('admin/marketing')
  .as('admin.marketing')
  .use(middleware.auth())

/**
 * One search box for the back office: a WhatsApp reference opens its
 * intent, anything else searches leads or visitors.
 */
router
  .get('admin/search', [controllers.AdminSearch, 'handle'])
  .as('admin.search')
  .use(middleware.auth())
