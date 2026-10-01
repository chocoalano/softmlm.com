import { test } from '@japa/runner'
import { readFile } from 'node:fs/promises'
import app from '@adonisjs/core/services/app'
import router from '@adonisjs/core/services/router'
import { marketingPages, seoFor, type MarketingPageKey } from '#config/seo'
import { whatsappMessages } from '#config/marketing'
import { WHO_WE_SERVE_PATH, personaPath, personas } from '#shared/personas'
import { HOW_WE_DO_IT_PATH } from '#shared/implementation'
import { INTEGRATIONS_PATH } from '#shared/integrations'
import { LOCALES, LOCALE_COOKIE, THEME_COOKIE, localizePath } from '#shared/locales'
import { auditedFiles } from '#tests/support/claims'
import env from '#start/env'

const APP_URL = 'https://mlmsoft.test'

/**
 * GET routes that are not public marketing pages.
 */
const NOT_MARKETING = [
  /^\/(?:login|signup|dashboard)$/,
  /^\/admin\//,
  /^\/$/,
  /^\/:locale\/\*$/,
  // tracked WhatsApp redirect (first-party tracking), not a page
  /^\/r\/whatsapp\//,
  // pre-locale URLs, redirected to /en
  /^\/(?:compensation-plans|pricing|who-we-serve|how-we-do-it|services|integrations|security)$/,
  /^\/(?:who-we-serve|services)\/:slug$/,
]

/**
 * A request exactly as a browser sends it, with a raw cookie the page's
 * script wrote (the test client would sign or encode it).
 */
function browserRequest(path: string, cookie?: string) {
  return fetch(`http://${env.get('HOST')}:${env.get('PORT')}${path}`, {
    headers: cookie ? { cookie } : {},
    redirect: 'manual',
  })
}

const pageEntries = Object.entries(marketingPages) as [
  MarketingPageKey,
  (typeof marketingPages)[MarketingPageKey],
][]

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

/**
 * Site paths linked from the marketing source (written as lp('/…') or as
 * plain hrefs), plus the ones built from the persona and module lists, and
 * every element id a link could point to.
 */
async function internalLinks() {
  const files = [...(await auditedFiles()), 'inertia/layouts/marketing.vue']
  const hrefs = new Set<string>()
  const ids = new Set<string>()

  for (const file of files) {
    let source: string
    try {
      source = await readFile(app.makePath(file), 'utf8')
    } catch {
      continue
    }
    for (const [, href] of source.matchAll(/\blp\(\s*'([/#][^']*)'\s*\)/g)) hrefs.add(href)
    for (const [, href] of source.matchAll(/\bhref="([/#][^"]*)"/g)) hrefs.add(href)
    for (const [, href] of source.matchAll(/\bhref:\s*'([/#][^']*)'/g)) hrefs.add(href)
    for (const [, id] of source.matchAll(/\bid="([a-z0-9-]+)"/g)) ids.add(id)
  }

  // the shared lead form's anchor: #demo on software pages, #consultation on services pages
  ids.add('demo')
  ids.add('consultation')

  hrefs.add(WHO_WE_SERVE_PATH)
  hrefs.add(HOW_WE_DO_IT_PATH)
  hrefs.add(INTEGRATIONS_PATH)
  for (const persona of personas) hrefs.add(personaPath(persona))

  const modulesSource = await readFile(app.makePath('inertia/content/modules.ts'), 'utf8')
  for (const [, key] of modulesSource.matchAll(/\bkey: '([a-z]+)'/g)) {
    hrefs.add(`/#feature-${key}`)
    ids.add(`feature-${key}`)
  }

  return { hrefs: [...hrefs].sort(), ids }
}

test.group('Marketing site: languages, SEO and theme', () => {
  test('/ opens English by default and keeps campaign tags', async ({ client }) => {
    const response = await client.get('/?utm_source=linkedin&utm_medium=social').redirects(0)

    response.assertStatus(302)
    response.assertHeader('location', '/en?utm_source=linkedin&utm_medium=social')
  })

  test('/ opens the language the visitor chose before', async ({ assert }) => {
    const chosen = await browserRequest('/', `${LOCALE_COOKIE}=id`)
    assert.equal(chosen.status, 302)
    assert.equal(chosen.headers.get('location'), '/id')

    const bogus = await browserRequest('/', `${LOCALE_COOKIE}=fr`)
    assert.equal(bogus.headers.get('location'), '/en')
  })

  test('pre-locale URLs move permanently to their English page', async ({ client }) => {
    for (const [from, to] of [
      ['/pricing', '/en/pricing'],
      ['/compensation-plans', '/en/compensation-plans'],
      ['/who-we-serve', '/en/who-we-serve'],
      ['/who-we-serve/finance', '/en/who-we-serve/finance'],
      ['/how-we-do-it', '/en/how-we-do-it'],
      ['/pricing?utm_source=ads', '/en/pricing?utm_source=ads'],
    ]) {
      const response = await client.get(from).redirects(0)
      response.assertStatus(301)
      response.assertHeader('location', to)
    }
  })

  test('every marketing page renders in both languages with its own metadata', async ({
    client,
    assert,
  }) => {
    for (const [key, page] of pageEntries) {
      for (const locale of LOCALES) {
        const url = localizePath(page.path, locale)
        const response = await client.get(url)
        response.assertStatus(200)
        const html = response.text()

        assert.include(html, `<html\n  lang="${locale}"`, `${url} lang`)
        assert.include(
          html,
          `<title data-inertia>${escapeHtml(page.title[locale])} | mlmsoft</title>`,
          url
        )
        assert.include(
          html,
          `<meta data-inertia="description" name="description" content="${escapeHtml(page.description[locale])}" />`,
          url
        )

        const canonicals = html.match(/rel="canonical" href="([^"]+)"/g) ?? []
        assert.deepEqual(
          canonicals,
          [`rel="canonical" href="${APP_URL}${url}"`],
          `${key} ${locale}`
        )

        for (const alternate of LOCALES) {
          assert.include(
            html,
            `rel="alternate" hreflang="${alternate}" href="${APP_URL}${localizePath(page.path, alternate)}"`
          )
        }
        assert.include(
          html,
          `rel="alternate" hreflang="x-default" href="${APP_URL}${localizePath(page.path, 'en')}"`
        )
      }
    }
  })

  test('titles and descriptions are unique per language and a sensible length', ({ assert }) => {
    for (const locale of LOCALES) {
      const titles = pageEntries.map(([, page]) => page.title[locale])
      const descriptions = pageEntries.map(([, page]) => page.description[locale])
      assert.lengthOf(new Set(titles), titles.length, locale)
      assert.lengthOf(new Set(descriptions), descriptions.length, locale)

      for (const [key, page] of pageEntries) {
        assert.isAtMost(`${page.title[locale]} | mlmsoft`.length, 60, `${key}.${locale}`)
        assert.isAtLeast(page.description[locale].length, 110, `${key}.${locale}`)
        assert.isAtMost(page.description[locale].length, 160, `${key}.${locale}`)
      }
    }
    // Indonesian metadata is written for Indonesian search, not copied.
    for (const [key, page] of pageEntries) {
      assert.notEqual(page.description.en, page.description.id, key)
    }
  })

  test('the canonical URL comes from APP_URL, not from request headers', async ({
    client,
    assert,
  }) => {
    const response = await client
      .get('/id/who-we-serve/finance')
      .header('host', '127.0.0.1')
      .header('x-forwarded-host', 'attacker.example')

    response.assertStatus(200)
    assert.include(response.text(), `rel="canonical" href="${APP_URL}/id/who-we-serve/finance"`)
    assert.notInclude(response.text(), 'attacker.example')
  })

  test('an unknown language is a plain 404', async ({ client }) => {
    const response = await client.get('/fr/pricing')
    response.assertStatus(404)
  })

  test('an unknown address under a language shows the 404 in that language', async ({
    client,
    assert,
  }) => {
    for (const locale of LOCALES) {
      const response = await client.get(`/${locale}/does-not-exist`).withInertia()
      response.assertStatus(404)
      response.assertInertiaComponent('marketing_not_found')
      assert.equal(response.inertiaProps.locale, locale)
    }

    const html = await client.get('/id/who-we-serve/marketing')
    html.assertStatus(404)
    assert.include(html.text(), '<html\n  lang="id"')
  })

  test('the theme comes from the visitor’s choice and never changes the URL', async ({
    assert,
  }) => {
    /** The opening <html> tag, where the theme attributes live. */
    const htmlFor = async (url: string, theme?: string) => {
      const response = await browserRequest(url, theme ? `${THEME_COOKIE}=${theme}` : undefined)
      const body = await response.text()
      return body.match(/<html[\s\S]*?>/)![0] + body.match(/rel="canonical"[^>]*>/)![0]
    }

    const system = await htmlFor('/en/pricing')
    assert.include(system, 'data-site-theme="system"')
    assert.notInclude(system, 'data-site-scheme=')

    const dark = await htmlFor('/en/pricing', 'dark')
    assert.include(dark, 'data-site-theme="dark"')
    assert.include(dark, 'data-site-scheme="dark"')
    assert.include(dark, `rel="canonical" href="${APP_URL}/en/pricing"`)

    const light = await htmlFor('/id', 'light')
    assert.include(light, 'data-site-scheme="light"')

    const bogus = await htmlFor('/id', 'sepia')
    assert.include(bogus, 'data-site-theme="system"')

    const props = await browserRequest('/id', `${THEME_COOKIE}=dark`)
    const body = await props.text()
    const page = body.match(/data-page="app" type="application\/json">(.*?)<\/script>/s)
    const data = JSON.parse(page![1])
    assert.equal(data.props.siteTheme, 'dark')
    assert.equal(data.props.locale, 'id')
  })

  test('each language receives its own WhatsApp messages and form labels', async ({
    client,
    assert,
  }) => {
    const en = await client.get('/en/pricing').withInertia()
    const id = await client.get('/id/pricing').withInertia()

    assert.deepEqual(en.inertiaProps.marketing.whatsapp.messages, whatsappMessages.en)
    assert.deepEqual(id.inertiaProps.marketing.whatsapp.messages, whatsappMessages.id)

    const label = (props: Record<string, any>, value: string) =>
      props.leadOptions.businessTypes.find((item: { value: string }) => item.value === value).label
    assert.equal(label(en.inertiaProps, 'community_commerce'), 'Community Commerce')
    assert.equal(label(id.inertiaProps, 'community_commerce'), 'Bisnis Komunitas')
    assert.equal(label(id.inertiaProps, 'direct_selling'), 'Direct Selling')
    assert.deepEqual(
      en.inertiaProps.leadOptions.modules.map((item: { value: string }) => item.value),
      id.inertiaProps.leadOptions.modules.map((item: { value: string }) => item.value)
    )
  })

  test('the admin and staff login stay outside the language prefix', async ({ client, assert }) => {
    const login = await client.get('/login').withInertia()
    login.assertStatus(200)
    assert.equal(login.inertiaProps.locale, 'en')
    const localizedLogin = await client.get('/en/login')
    localizedLogin.assertStatus(404)
    const admin = await client.get('/admin/demo-requests').redirects(0)
    admin.assertStatus(302)
  })

  test('every public page is a known marketing page whose copy the claims gate scans', async ({
    client,
    assert,
  }) => {
    const knownPaths = pageEntries.map(([, page]) =>
      localizePath(page.path, 'en').replace('/en', '/:locale')
    )
    const publicGetRoutes = Object.values(router.toJSON())
      .flat()
      .filter((route) => route.methods.includes('GET') && !route.pattern.includes(':id'))
      .map((route) => route.pattern)
      .filter((pattern) => !NOT_MARKETING.some((rule) => rule.test(pattern)))

    assert.sameMembers(publicGetRoutes, knownPaths)

    const scanned = await auditedFiles()
    for (const [, page] of pageEntries) {
      const response = await client.get(localizePath(page.path, 'en')).withInertia()
      const pageFile = `inertia/pages/${response.inertiaComponent}.vue`

      assert.include(scanned, pageFile, page.path)
      // The WhatsApp fallback and every "Book a Demo" button point to #demo.
      assert.include(await readFile(app.makePath(pageFile), 'utf8'), '<DemoRequest', pageFile)
    }
  })

  test('internal links lead to real pages and sections in both languages', async ({
    client,
    assert,
  }) => {
    const { hrefs, ids } = await internalLinks()
    const broken: string[] = []

    for (const href of hrefs) {
      const [path, hash] = href.split('#')
      if (hash && !ids.has(hash)) broken.push(`${href} (no element with id "${hash}")`)
      if (!path) continue

      const targets =
        path === '/login' ? [path] : LOCALES.map((locale) => localizePath(path, locale))
      for (const target of targets) {
        const response = await client.get(target).redirects(0)
        if (response.status() !== 200) broken.push(`${target} (HTTP ${response.status()})`)
      }
    }

    assert.isAbove(hrefs.length, 20)
    assert.deepEqual(broken, [])
  })

  test('the Indonesian home page has its own Indonesian SEO', async ({ client, assert }) => {
    const response = await client.get('/id').withInertia()
    assert.deepEqual(response.inertiaProps.seo, seoFor('home', 'id'))
    assert.match(response.inertiaProps.seo.title, /Software MLM/)
  })
})
