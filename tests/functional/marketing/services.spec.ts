import { test } from '@japa/runner'
import { readFile, readdir } from 'node:fs/promises'
import app from '@adonisjs/core/services/app'
import type { ApiClient } from '@japa/api-client'
import { SITE_NAME, seoFor } from '#config/seo'
import { resolveWhatsappConfig, whatsappMessages } from '#config/marketing'
import { whatsappUrl } from '#shared/whatsapp'
import { TRACKED_SERVICES, sanitizeServiceInterest } from '#shared/analytics'
import { MARKETING_BRAND_NAME } from '#shared/brand'
import {
  SERVICES_PATH,
  serviceInterests,
  servicePath,
  services,
  serviceTrackingPage,
} from '#shared/services'
import { LOCALES, THEME_COOKIE, localizePath } from '#shared/locales'
import { auditedFiles, visibleCopy } from '#tests/support/claims'
import env from '#start/env'

const APP_URL = 'https://mlmsoft.test'
const CONTEXTS = [
  'services_overview',
  'service_social_media',
  'service_seo',
  'service_paid_ads',
  'service_branding',
  'service_product_maklon',
] as const

async function source(file: string) {
  return readFile(app.makePath(file), 'utf8')
}

async function html(client: ApiClient, path: string) {
  const response = await client.get(path)
  return response.text()
}

async function htmlTag(path: string, cookie?: string) {
  const response = await fetch(`http://${env.get('HOST')}:${env.get('PORT')}${path}`, {
    headers: cookie ? { cookie } : {},
    redirect: 'manual',
  })
  const body = await response.text()
  return body.match(/<html[\s\S]*?>/)![0]
}

test.group('Services pages', () => {
  test('the hub and every service page render in both languages', async ({ client, assert }) => {
    for (const locale of LOCALES) {
      const hub = await client.get(`/${locale}/services`).withInertia()
      hub.assertStatus(200)
      hub.assertInertiaComponent('services/index')
      assert.deepEqual(hub.inertiaProps.seo, seoFor('services', locale))

      for (const service of services) {
        const response = await client.get(localizePath(servicePath(service), locale)).withInertia()
        response.assertStatus(200)
        response.assertInertiaComponent('services/service')
        assert.equal(response.inertiaProps.service, service.key)
        assert.equal(response.inertiaProps.locale, locale)
        assert.deepEqual(response.inertiaProps.seo, seoFor(`services.${service.key}`, locale))
        assert.isNotEmpty(response.inertiaProps.leadOptions.serviceInterests)
      }
    }
  })

  test('an unknown service is the localized 404', async ({ client }) => {
    for (const locale of LOCALES) {
      const response = await client.get(`/${locale}/services/crypto-mining`).withInertia()
      response.assertStatus(404)
      response.assertInertiaComponent('marketing_not_found')
    }
  })

  test('pre-locale service URLs move permanently to English', async ({ client }) => {
    for (const [from, to] of [
      ['/services', '/en/services'],
      ['/services/branding', '/en/services/branding'],
      ['/services/seo?utm_source=ads', '/en/services/seo?utm_source=ads'],
    ]) {
      const response = await client.get(from).redirects(0)
      response.assertStatus(301)
      response.assertHeader('location', to)
    }
  })

  test('each page has its own title, description, canonical and alternates', async ({
    client,
    assert,
  }) => {
    const branding = await html(client, '/en/services/branding')
    assert.include(branding, '<html\n  lang="en"')
    assert.include(
      branding,
      '<title data-inertia>Branding Services for MLM Businesses | mlmsoft</title>'
    )
    assert.include(branding, `rel="canonical" href="${APP_URL}/en/services/branding"`)
    assert.include(branding, `hreflang="id" href="${APP_URL}/id/services/branding"`)
    assert.include(branding, `hreflang="x-default" href="${APP_URL}/en/services/branding"`)
    assert.notInclude(branding, 'application/ld+json')

    const maklon = await html(client, '/id/services/product-maklon')
    assert.include(maklon, '<html\n  lang="id"')
    assert.include(
      maklon,
      '<title data-inertia>Pengembangan &amp; Maklon Produk untuk Bisnis MLM | mlmsoft</title>'
    )

    for (const service of services) {
      const en = seoFor(`services.${service.key}`, 'en')
      const id = seoFor(`services.${service.key}`, 'id')
      assert.notEqual(en.title, id.title, service.key)
      assert.notEqual(en.description, id.description, service.key)
    }
  })

  test('follows the visitor’s theme choice', async ({ assert }) => {
    for (const locale of LOCALES) {
      const path = `/${locale}/services/seo`
      assert.include(await htmlTag(path, `${THEME_COOKIE}=dark`), 'data-site-scheme="dark"')
      assert.include(await htmlTag(path, `${THEME_COOKIE}=light`), 'data-site-scheme="light"')
      const system = await htmlTag(path)
      assert.include(system, 'data-site-theme="system"')
      assert.notInclude(system, 'data-site-scheme=')
    }
  })

  test('every service has a WhatsApp message in both languages, without visitor data', ({
    assert,
  }) => {
    assert.equal(
      whatsappMessages.id.service_social_media,
      'Halo mlmsoft, saya ingin konsultasi mengenai pengelolaan media sosial untuk bisnis kami.'
    )
    assert.equal(
      whatsappMessages.id.service_seo,
      'Halo mlmsoft, saya ingin konsultasi mengenai SEO dan content marketing.'
    )
    assert.equal(
      whatsappMessages.id.service_paid_ads,
      'Halo mlmsoft, saya ingin konsultasi mengenai iklan digital untuk bisnis kami.'
    )
    assert.equal(
      whatsappMessages.id.service_branding,
      'Halo mlmsoft, saya ingin konsultasi mengenai branding dan kebutuhan desain brand kami.'
    )
    assert.equal(
      whatsappMessages.id.service_product_maklon,
      'Halo mlmsoft, saya ingin konsultasi mengenai maklon produk.'
    )

    for (const locale of LOCALES) {
      const settings = resolveWhatsappConfig('+62 812-3456-7890', undefined, locale)
      for (const context of CONTEXTS) {
        const message = whatsappMessages[locale][context]
        assert.include(message, MARKETING_BRAND_NAME)
        assert.notMatch(message, /[{}@]|\d/, `${locale}.${context}`)
        assert.equal(new URL(whatsappUrl(settings, context)!).searchParams.get('text'), message)
        // without a configured number the button falls back to the page's form
        assert.isNull(whatsappUrl(resolveWhatsappConfig(undefined, undefined, locale), context))
      }
    }
    for (const service of services) {
      assert.include(CONTEXTS, service.whatsapp)
    }
  })

  test('the services copy has the same structure in Indonesian, without English sentences', async ({
    assert,
  }) => {
    const load = async (locale: string) => {
      const module = await import(app.makeURL(`inertia/i18n/${locale}/services.ts`).href)
      return module.default as Record<string, unknown>
    }
    const leaves = (value: unknown, path = ''): [string, string][] => {
      if (typeof value === 'string') return [[path, value]]
      return Object.entries(value as object).flatMap(([key, child]) =>
        leaves(child, path ? `${path}.${key}` : key)
      )
    }
    const en = leaves(await load('en'))
    const id = new Map(leaves(await load('id')))
    assert.deepEqual(
      [...id.keys()],
      en.map(([path]) => path)
    )

    // the fictional brand in the concept visuals is the same placeholder in both languages
    const placeholders = /\.visual\.(?:brand|product)$|\.related\.keys\./
    const untranslated = en
      .filter(([path]) => !placeholders.test(path))
      .filter(([path, text]) => id.get(path) === text && text.split(/\s+/).length >= 3)
      .map(([path]) => path)
    assert.deepEqual(untranslated, [])

    const english = /\b(?:the|and|with|your|what|which|before|after|from|this|that|we|you)\b/i
    const leaked = [...id]
      .filter(([path, text]) => !placeholders.test(path) && english.test(text))
      .map(([path]) => path)
    assert.deepEqual(leaked, [])
  })

  test('services never sit under Features, and the main nav stays at five items', async ({
    assert,
  }) => {
    const header = await source('inertia/components/site/site_header.vue')
    const featureLinks = header.slice(
      header.indexOf('const featureLinks'),
      header.indexOf('const platformLinks')
    )
    for (const service of services) assert.notInclude(featureLinks, service.key)
    assert.include(featureLinks, "key: 'compensation'")
    assert.include(header, 'lp(SERVICES_PATH)')
    assert.include(header, 'lp(servicePath(service))')

    const linksAfter = header.slice(
      header.indexOf('const linksAfter'),
      header.indexOf('const roleLinks')
    )
    // Features, Who We Serve and Services menus, plus these links
    assert.lengthOf(linksAfter.match(/label:/g)!, 2)

    const footer = await source('inertia/components/site/site_footer.vue')
    assert.include(footer, 'servicePath(service)')
  })

  test('software pages link to services only where it fits', async ({ assert }) => {
    assert.include(await source('inertia/pages/home.vue'), '<ServicesHome />')
    assert.include(await source('inertia/pages/how_we_do_it.vue'), 'lp(SERVICES_PATH)')
    const feature = await source('inertia/pages/features/feature.vue')
    assert.include(feature, 'v-if="feature === \'ecommerce\'"')
    for (const file of [
      'inertia/pages/pricing.vue',
      'inertia/pages/compensation_plans.vue',
      'inertia/pages/who_we_serve/persona.vue',
    ]) {
      assert.notInclude(await source(file), 'SERVICES_PATH', file)
    }
  })

  test('service pages request a consultation; software pages still book a demo', async ({
    assert,
  }) => {
    const hub = await source('inertia/pages/services/index.vue')
    const page = await source('inertia/pages/services/service.vue')
    for (const file of [hub, page]) {
      assert.include(file, 'lead-mode="consultation"')
      assert.include(file, 'mode="consultation"')
    }
    assert.include(page, ':source="serviceLeadSource(service)"')
    assert.include(page, ':interests="[service]"')
    assert.include(hub, 'source="services_overview"')
    assert.notInclude(await source('inertia/pages/home.vue'), 'consultation')
  })

  test('service interest events carry the service, page and language only', ({ assert }) => {
    assert.sameMembers([...TRACKED_SERVICES], [...serviceInterests])
    assert.deepEqual(
      sanitizeServiceInterest({
        service: 'branding',
        page: serviceTrackingPage('branding'),
        locale: 'id',
        email: 'someone@example.com',
      }),
      { service: 'branding', page: 'service_branding', locale: 'id' }
    )
    assert.deepEqual(
      sanitizeServiceInterest({ service: 'crypto', page: 'Some Page!', locale: 'fr' }),
      { service: 'unknown', page: 'unknown', locale: 'unknown' }
    )
  })

  test('the brand name comes from one place and every mention in the copy matches it', async ({
    client,
    assert,
  }) => {
    assert.equal(SITE_NAME, MARKETING_BRAND_NAME)
    assert.include(await source('config/mail.ts'), 'brandName: MARKETING_BRAND_NAME')
    assert.include(await html(client, '/en/services'), `| ${MARKETING_BRAND_NAME}</title>`)

    const mismatches: string[] = []
    for (const file of await auditedFiles()) {
      let text: string
      try {
        text = visibleCopy(await source(file))
      } catch {
        continue
      }
      // asset file names (mlmsofts-mark.png) are not copy
      for (const [match] of text.matchAll(/\b(?:mlm ?softs?|soft ?mlm)\b(?![-\w])/gi)) {
        if (match !== MARKETING_BRAND_NAME) mismatches.push(`${file}: ${match}`)
      }
    }
    assert.deepEqual(mismatches, [])
  })

  test('the maklon page claims nothing the evidence register has not verified', async ({
    assert,
  }) => {
    const evidence = await source('docs/product-maklon-evidence.md')
    assert.include(evidence, 'VERIFIED')
    for (const locale of ['en', 'id']) {
      const copy = await source(`inertia/i18n/${locale}/services.ts`)
      const maklon = copy.slice(copy.indexOf('product_maklon: {\n      hero'))
      for (const word of ['BPOM', 'Halal', 'ISO', 'GMP', 'HACCP', 'MOQ', 'factory', 'pabrik']) {
        assert.notInclude(maklon, word, `${locale}: ${word}`)
      }
    }
    const dir = await readdir(app.makePath('inertia/components/services/concepts'))
    assert.include(dir, 'product_journey.vue')
  })

  test('the services hub is linked from the header, footer and home page', async ({ assert }) => {
    for (const file of [
      'inertia/components/site/site_header.vue',
      'inertia/components/site/site_footer.vue',
      'inertia/components/services/services_home.vue',
    ]) {
      assert.include(await source(file), 'SERVICES_PATH', file)
    }
    assert.equal(localizePath(SERVICES_PATH, 'id'), '/id/services')
  })
})
