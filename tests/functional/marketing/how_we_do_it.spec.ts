import { test } from '@japa/runner'
import type { ApiClient } from '@japa/api-client'
import { readFile, readdir } from 'node:fs/promises'
import app from '@adonisjs/core/services/app'
import testUtils from '@adonisjs/core/services/test_utils'
import limiter from '@adonisjs/limiter/services/main'
import mail from '@adonisjs/mail/services/main'
import DemoRequest from '#models/demo_request'
import LeadNotifier from '#services/lead_notifier'
import { seoFor } from '#config/seo'
import { resolveWhatsappConfig, whatsappMessages } from '#config/marketing'
import { whatsappUrl } from '#shared/whatsapp'
import { sanitize } from '#shared/analytics'
import { HOW_WE_DO_IT_PATH, HOW_WE_DO_IT_TRACKING_PAGE } from '#shared/implementation'
import { LOCALES, THEME_COOKIE, localizePath } from '#shared/locales'
import env from '#start/env'

const APP_URL = 'https://mlmsoft.test'
const CONTEXTS = [
  'implementation_general',
  'migration',
  'integration_discovery',
  'compensation_validation',
] as const

/** The opening <html> tag of a page, requested with a raw cookie as the page's script writes it. */
async function htmlTag(path: string, cookie?: string) {
  const response = await fetch(`http://${env.get('HOST')}:${env.get('PORT')}${path}`, {
    headers: cookie ? { cookie } : {},
    redirect: 'manual',
  })
  const body = await response.text()
  return body.match(/<html[\s\S]*?>/)![0]
}

async function html(client: ApiClient, path: string) {
  const response = await client.get(path)
  return response.text()
}

async function source(file: string) {
  return readFile(app.makePath(file), 'utf8')
}

async function pageSources() {
  const dir = 'inertia/components/implementation'
  const names = await readdir(app.makePath(dir))
  const files = ['inertia/pages/how_we_do_it.vue', ...names.map((name) => `${dir}/${name}`)]
  const sources = await Promise.all(files.map(source))
  return sources.join('\n')
}

test.group('How We Do It page', (group) => {
  group.each.setup(() => testUtils.db().truncate())
  group.each.setup(() => limiter.clear(['memory']))
  group.each.setup(() => {
    mail.fake()
    return async () => {
      await LeadNotifier.idle()
      mail.restore()
    }
  })

  test('renders in both languages', async ({ client, assert }) => {
    for (const locale of LOCALES) {
      const response = await client.get(`/${locale}/how-we-do-it`).withInertia()

      response.assertStatus(200)
      response.assertInertiaComponent('how_we_do_it')
      assert.equal(response.inertiaProps.locale, locale)
      assert.deepEqual(response.inertiaProps.seo, seoFor('how_we_do_it', locale))
      assert.isNotEmpty(response.inertiaProps.leadOptions.businessTypes)
    }
  })

  test('has its own title, description, canonical and language alternates', async ({
    client,
    assert,
  }) => {
    const en = await html(client, '/en/how-we-do-it')
    assert.include(en, '<html\n  lang="en"')
    assert.include(en, '<title data-inertia>MLM Software Implementation Process | mlmsoft</title>')
    assert.include(en, `rel="canonical" href="${APP_URL}/en/how-we-do-it"`)
    assert.include(en, `hreflang="id" href="${APP_URL}/id/how-we-do-it"`)
    assert.include(en, `hreflang="x-default" href="${APP_URL}/en/how-we-do-it"`)

    const id = await html(client, '/id/how-we-do-it')
    assert.include(id, '<html\n  lang="id"')
    assert.include(id, '<title data-inertia>Proses Implementasi Software MLM | mlmsoft</title>')
    assert.include(id, `rel="canonical" href="${APP_URL}/id/how-we-do-it"`)

    const enDescription = seoFor('how_we_do_it', 'en').description
    for (const topic of ['discovery', 'compensation plan', 'migration', 'testing', 'launch']) {
      assert.include(enDescription, topic)
    }
    const idDescription = seoFor('how_we_do_it', 'id').description
    for (const topic of [
      'memahami bisnis',
      'compensation plan',
      'migrasi',
      'pengujian',
      'go-live',
    ]) {
      assert.include(idDescription, topic)
    }

    // no structured data on this page yet
    assert.notInclude(en, 'application/ld+json')
    assert.notInclude(id, 'application/ld+json')
  })

  test('the pre-locale URL moves permanently to English, keeping campaign tags', async ({
    client,
  }) => {
    const plain = await client.get('/how-we-do-it').redirects(0)
    plain.assertStatus(301)
    plain.assertHeader('location', '/en/how-we-do-it')

    const tagged = await client.get('/how-we-do-it?utm_source=ads').redirects(0)
    tagged.assertStatus(301)
    tagged.assertHeader('location', '/en/how-we-do-it?utm_source=ads')
  })

  test('follows the visitor’s theme choice in both languages', async ({ assert }) => {
    for (const locale of LOCALES) {
      const dark = await htmlTag(`/${locale}/how-we-do-it`, `${THEME_COOKIE}=dark`)
      assert.include(dark, 'data-site-scheme="dark"')

      const light = await htmlTag(`/${locale}/how-we-do-it`, `${THEME_COOKIE}=light`)
      assert.include(light, 'data-site-scheme="light"')

      const system = await htmlTag(`/${locale}/how-we-do-it`)
      assert.include(system, 'data-site-theme="system"')
      assert.notInclude(system, 'data-site-scheme=')
    }
  })

  test('each implementation WhatsApp context has its own message in both languages', ({
    assert,
  }) => {
    assert.equal(
      whatsappMessages.en.migration,
      'Hi mlmsoft, we currently use another system and would like to discuss migration and implementation.'
    )
    assert.equal(
      whatsappMessages.id.migration,
      'Halo mlmsoft, kami saat ini menggunakan sistem lain dan ingin konsultasi mengenai migrasi serta implementasi.'
    )

    for (const locale of LOCALES) {
      const settings = resolveWhatsappConfig('+62 812-3456-7890', undefined, locale)
      for (const context of CONTEXTS) {
        const message = whatsappMessages[locale][context]
        assert.match(message, locale === 'en' ? /^Hi mlmsoft, / : /^Halo mlmsoft, /)
        // a fixed topic only: no placeholders, addresses or numbers
        assert.notMatch(message, /[{}@]|\d/, `${locale}.${context}`)

        const url = new URL(whatsappUrl(settings, context)!)
        assert.equal(url.searchParams.get('text'), message)
      }
    }
  })

  test('without a configured number the WhatsApp buttons fall back to the demo form', async ({
    client,
    assert,
  }) => {
    for (const context of CONTEXTS) {
      assert.isNull(whatsappUrl(resolveWhatsappConfig(undefined, undefined, 'id'), context))
    }

    const response = await client.get('/id/how-we-do-it').withInertia()
    const whatsapp = response.inertiaProps.marketing.whatsapp
    assert.isFalse(whatsapp.enabled)
    assert.equal(whatsapp.messages.migration, whatsappMessages.id.migration)

    // the fallback target: the page's own demo form (#demo)
    assert.include(await pageSources(), '<DemoRequest')
  })

  test('conversion events keep the page, section, language and theme only', ({ assert }) => {
    for (const section of [
      'hero',
      'phase_integrate',
      'compensation_validation',
      'migration_band',
      'readiness',
      'final_cta',
    ]) {
      const clean = sanitize({
        page: HOW_WE_DO_IT_TRACKING_PAGE,
        section,
        variant: 'primary',
        locale: 'id',
        theme: 'dark',
        email: 'someone@example.com',
      })
      assert.deepEqual(clean, {
        page: 'how_we_do_it',
        section,
        variant: 'primary',
        locale: 'id',
        theme: 'dark',
      })
    }
  })

  test('the readiness check stays in the browser', async ({ assert }) => {
    const readiness = await source('inertia/components/implementation/imp_readiness.vue')
    assert.include(readiness, 'type="checkbox"')
    assert.include(readiness, '<fieldset')
    assert.include(readiness, 'aria-live="polite"')
    for (const call of [
      'localStorage',
      'sessionStorage',
      'fetch(',
      'axios',
      'useForm',
      'router.',
      'track(',
    ]) {
      assert.notInclude(readiness, call)
    }
  })

  test('the Indonesian copy has the same structure and no English sentences', async ({
    assert,
  }) => {
    const load = async (locale: string) => {
      const module = await import(app.makeURL(`inertia/i18n/${locale}/implementation.ts`).href)
      return module.default as Record<string, unknown>
    }
    /** Every text of a dictionary by its path; functions are called with sample values. */
    const leaves = (value: unknown, path = ''): [string, string][] => {
      if (typeof value === 'string') return [[path, value]]
      if (typeof value === 'function') return [[path, String(value(1, 6))]]
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
    const untranslated = en
      .filter(([path, text]) => id.get(path) === text && text.split(/\s+/).length >= 3)
      .map(([path]) => path)
    assert.deepEqual(untranslated, [])

    const english = /\b(?:the|and|with|your|what|which|before|after|from|this|that|we|you)\b/i
    const leaked = [...id].filter(([, text]) => english.test(text)).map(([path]) => path)
    assert.deepEqual(leaked, [])
  })

  test('uses the Indonesian phase labels', async ({ assert }) => {
    const id = await source('inertia/i18n/id/implementation.ts')
    for (const label of [
      'Pahami Bisnis',
      'Blueprint Sistem',
      'Konfigurasi',
      'Integrasi',
      'Migrasi',
      'Pengujian',
      'Training',
      'Go-Live',
      'Support',
    ]) {
      assert.include(id, `label: '${label}'`)
    }
    assert.notMatch(id, /penemuan/i)
  })

  test('links to related pages, and is linked from the header, footer and home page', async ({
    assert,
  }) => {
    const page = await pageSources()
    assert.include(page, "lp('/compensation-plans')")
    assert.include(page, "lp('/pricing')")
    assert.include(page, 'lp(FEATURES_PATH)')
    assert.include(page, "findPersona('finance')")
    // the Integrations page does not exist yet (Phase 9)
    assert.notMatch(page, /['"`]\/integrations\b/)

    for (const file of [
      'inertia/components/site/site_header.vue',
      'inertia/components/site/site_footer.vue',
      'inertia/components/home/implementation.vue',
    ]) {
      assert.include(await source(file), 'lp(HOW_WE_DO_IT_PATH)', file)
    }
    assert.equal(localizePath(HOW_WE_DO_IT_PATH, 'id'), '/id/how-we-do-it')
  })

  test('a demo request from this page is attributed to it', async ({ client, assert }) => {
    await client
      .post('/demo-requests')
      .json({
        fullName: 'Rina Kusuma',
        email: 'rina@example.com',
        company: 'Sehat Bersama',
        source: 'implementation_page',
        locale: 'id',
      })
      .withCsrfToken()
      .redirects(0)

    const lead = await DemoRequest.findByOrFail('email', 'rina@example.com')
    assert.equal(lead.source, 'implementation_page')
    assert.equal(lead.locale, 'id')
  })
})
