import { test } from '@japa/runner'
import { existsSync } from 'node:fs'
import app from '@adonisjs/core/services/app'
import testUtils from '@adonisjs/core/services/test_utils'
import type { ApiClient } from '@japa/api-client'
import env from '#start/env'
import {
  breadcrumbNames,
  marketingPages,
  searchEngines,
  seoFor,
  SOCIAL_CARD,
  type MarketingPageKey,
} from '#config/seo'
import { LOCALES, LOCALE_COOKIE, localizePath } from '#shared/locales'
import { findClaimViolations } from '#tests/support/claims'

/**
 * Phase 12C: the technical SEO foundation (docs/seo-indexability.md).
 * Social cards, structured data, the sitemap and robots.txt, robots
 * headers, and the canonical / hreflang / redirect audits.
 */

const APP_URL = env.get('APP_URL').replace(/\/$/, '')
const keys = Object.keys(marketingPages) as MarketingPageKey[]
const pathOf = (key: MarketingPageKey, locale: (typeof LOCALES)[number]) =>
  localizePath(marketingPages[key].path, locale)

/** Every <meta>/<link> attribute value in the page head, keyed by property or name. */
function headOf(html: string) {
  const head = html.slice(0, html.indexOf('</head>'))
  const meta = new Map<string, string[]>()
  for (const [, key, value] of head.matchAll(
    /<meta (?:property|name)="([^"]+)" content="([^"]*)"/g
  )) {
    meta.set(key, [...(meta.get(key) ?? []), value])
  }
  const canonicals = [...head.matchAll(/rel="canonical" href="([^"]+)"/g)].map(([, href]) => href)
  const alternates = Object.fromEntries(
    [...head.matchAll(/rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map(
      ([, lang, href]) => [lang, href]
    )
  )
  const jsonLd = [
    ...head.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g),
  ].map(([, json]) => JSON.parse(json))
  return { meta, canonicals, alternates, jsonLd, head }
}

/** The head of a page, fetched as a browser would. */
async function headAt(client: ApiClient, path: string) {
  const response = await client.get(path)
  return headOf(response.text())
}

const unescape = (value: string) =>
  value
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')

test.group('SEO | social cards and structured data', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('every marketing page has Open Graph and X card tags, from its own SEO', async ({
    client,
    assert,
  }) => {
    for (const key of keys) {
      for (const locale of LOCALES) {
        const seo = seoFor(key, locale)
        const { meta } = await headAt(client, pathOf(key, locale))
        const one = (name: string) => unescape(meta.get(name)?.[0] ?? '')

        assert.equal(one('og:type'), 'website', key)
        assert.equal(one('og:title'), seo.title, key)
        assert.equal(one('og:description'), seo.description, key)
        assert.equal(one('og:url'), seo.canonical, key)
        assert.equal(one('og:locale'), locale === 'en' ? 'en_US' : 'id_ID', key)
        assert.equal(one('og:image'), `${APP_URL}${SOCIAL_CARD.path(locale)}`, key)
        assert.equal(one('og:image:width'), '1200')
        assert.equal(one('og:image:height'), '630')
        assert.isNotEmpty(one('og:image:alt'))
        assert.equal(one('twitter:card'), 'summary_large_image', key)
        assert.equal(one('twitter:title'), seo.title, key)
        assert.equal(one('twitter:image'), one('og:image'), key)
      }
    }
  })

  test('the social card images exist, one per language', ({ assert }) => {
    for (const locale of LOCALES) {
      assert.isTrue(existsSync(app.publicPath(SOCIAL_CARD.path(locale).slice(1))), locale)
    }
  })

  test('structured data: WebSite on the home page, breadcrumbs matching the visible trail', async ({
    client,
    assert,
  }) => {
    for (const key of keys) {
      for (const locale of LOCALES) {
        const seo = seoFor(key, locale)
        const { jsonLd } = await headAt(client, pathOf(key, locale))
        const types = jsonLd.map((data) => data['@type'])

        // only what the site can stand behind (docs/seo-indexability.md)
        for (const type of types) assert.oneOf(type, ['WebSite', 'BreadcrumbList'], key)
        assert.notMatch(JSON.stringify(jsonLd), /aggregateRating|review|offers|price/i)

        assert.equal(types.includes('WebSite'), key === 'home', key)
        const trail = jsonLd.find((data) => data['@type'] === 'BreadcrumbList')
        if (!seo.breadcrumbs.length) {
          assert.isUndefined(trail, key)
          continue
        }
        // the visible breadcrumbs render seo.breadcrumbs; the JSON-LD must say the same
        assert.deepEqual(
          trail.itemListElement.map((item: { name: string; item: string }) => [
            item.name,
            item.item,
          ]),
          seo.breadcrumbs.map((crumb) => [crumb.name, crumb.url]),
          key
        )
        assert.equal(seo.breadcrumbs[0].url, seoFor('home', locale).canonical)
        assert.equal(seo.breadcrumbs.at(-1)!.url, seo.canonical)
      }
    }
  })

  test('nested pages have a trail; every name in it is defined in both languages', ({ assert }) => {
    const nested = keys.filter((key) => key.includes('.') || key === 'integrations')
    for (const key of nested) {
      for (const locale of LOCALES) {
        assert.isAtLeast(seoFor(key, locale).breadcrumbs.length, 3, key)
      }
    }
    for (const names of Object.values(breadcrumbNames)) {
      for (const locale of LOCALES) assert.isNotEmpty(names![locale])
    }
  })
})

test.group('SEO | sitemap and robots', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('sitemap.xml lists every marketing page in both languages, with alternates', async ({
    client,
    assert,
  }) => {
    const response = await client.get('/sitemap.xml')
    response.assertStatus(200)
    assert.match(response.header('content-type') ?? '', /^application\/xml/)
    const xml = response.text()

    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, loc]) => loc)
    assert.lengthOf(locs, keys.length * LOCALES.length)
    for (const key of keys) {
      for (const locale of LOCALES) {
        const seo = seoFor(key, locale)
        assert.include(locs, seo.canonical)
        for (const alternate of seo.alternates) {
          assert.include(
            xml,
            `<xhtml:link rel="alternate" hreflang="${alternate.hreflang}" href="${alternate.href}"/>`
          )
        }
      }
    }
    for (const loc of locs) {
      assert.isTrue(loc.startsWith(`${APP_URL}/`), loc)
      assert.notMatch(loc, /\/(?:admin|login|signup|dashboard|r\/|marketing\/|demo-requests)/)
    }
  })

  test('robots.txt points to the sitemap and keeps crawlers out of the back office', async ({
    client,
    assert,
  }) => {
    const response = await client.get('/robots.txt')
    response.assertStatus(200)
    assert.match(response.header('content-type') ?? '', /^text\/plain/)
    const robots = response.text()
    assert.include(robots, `Sitemap: ${APP_URL}/sitemap.xml`)
    assert.include(robots, 'Disallow: /admin')
    assert.include(robots, 'Disallow: /r/')
    assert.notMatch(robots, /^Disallow: \/$/m)
  })

  test('with indexing switched off (staging) nothing is indexable', async ({
    client,
    assert,
    cleanup,
  }) => {
    searchEngines.indexing = false
    cleanup(() => {
      searchEngines.indexing = true
    })

    const robotsResponse = await client.get('/robots.txt')
    const robots = robotsResponse.text()
    assert.equal(robots, 'User-agent: *\nDisallow: /\n')

    const page = await client.get('/en/pricing')
    page.assertStatus(200)
    page.assertHeader('x-robots-tag', 'noindex, nofollow')
    assert.include(page.text(), '<meta name="robots" content="noindex" />')
  })
})

test.group('SEO | robots headers and the 404', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('marketing pages are indexable; everything else is not', async ({ client, assert }) => {
    for (const path of ['/en', '/id/pricing', '/en/services/seo', '/id/privacy']) {
      const response = await client.get(path)
      response.assertStatus(200)
      assert.isUndefined(response.header('x-robots-tag'), path)
      assert.notInclude(response.text(), 'name="robots"', path)
    }
    for (const path of ['/login', '/r/whatsapp/general', '/admin/demo-requests']) {
      const response = await client.get(path).redirects(0)
      assert.equal(response.header('x-robots-tag'), 'noindex', path)
    }
    const login = await client.get('/login')
    assert.include(login.text(), '<meta name="robots" content="noindex" />')
  })

  test('the localized 404 is a real 404: noindex, no canonical, a way back', async ({
    client,
    assert,
  }) => {
    for (const locale of LOCALES) {
      const response = await client.get(`/${locale}/no-such-page`)
      response.assertStatus(404)
      response.assertHeader('x-robots-tag', 'noindex')
      const { canonicals, head } = headOf(response.text())
      assert.lengthOf(canonicals, 0)
      assert.include(head, '<meta name="robots" content="noindex" />')
      assert.include(response.text(), `"locale":"${locale}"`)
    }
  })
})

test.group('SEO | canonical, hreflang and redirect audits', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('one canonical per page, on APP_URL, in the page language', async ({ client, assert }) => {
    for (const key of keys) {
      for (const locale of LOCALES) {
        const path = pathOf(key, locale)
        const { canonicals } = await headAt(client, path)
        assert.deepEqual(canonicals, [`${APP_URL}${path}`], path)
      }
    }
  })

  test('campaign tags and a hostile Host header never change the canonical', async ({
    client,
    assert,
  }) => {
    const expected = `${APP_URL}/id/services/seo`
    const tagged = await headAt(client, '/id/services/seo?utm_source=instagram&utm_campaign=maklon')
    assert.deepEqual(tagged.canonicals, [expected])
    assert.equal(tagged.meta.get('og:url')?.[0], expected)

    const spoofed = await client
      .get('/id/services/seo')
      .header('host', '127.0.0.1')
      .header('x-forwarded-host', 'evil.example')
    const hostile = headOf(spoofed.text())
    assert.deepEqual(hostile.canonicals, [expected])
    assert.equal(hostile.meta.get('og:url')?.[0], expected)
    assert.notInclude(hostile.head, 'evil.example')
  })

  test('hreflang is reciprocal and every alternate is a real page', async ({ client, assert }) => {
    for (const key of keys) {
      const heads = Object.fromEntries(
        await Promise.all(
          LOCALES.map(async (locale) => [locale, await headAt(client, pathOf(key, locale))])
        )
      )
      for (const locale of LOCALES) {
        const { alternates } = heads[locale]
        assert.sameMembers(Object.keys(alternates), [...LOCALES, 'x-default'], key)
        assert.equal(alternates['x-default'], `${APP_URL}${pathOf(key, 'en')}`)
        for (const other of LOCALES) {
          // each version names every other, and they name it back
          assert.equal(alternates[other], `${APP_URL}${pathOf(key, other)}`, key)
          assert.equal(heads[other].alternates[locale], `${APP_URL}${pathOf(key, locale)}`, key)
        }
      }
    }
  })

  test('legacy and locale redirects reach the final page in one step', async ({
    client,
    assert,
  }) => {
    const legacy = [
      '/compensation-plans',
      '/pricing',
      '/who-we-serve',
      '/who-we-serve/finance',
      '/how-we-do-it',
      '/services',
      '/services/seo',
      '/integrations',
      '/security',
      '/features',
      '/features/wallet-payout',
      '/privacy',
      '/terms',
    ]
    for (const path of legacy) {
      const response = await client.get(`${path}?utm_source=x`).redirects(0)
      response.assertStatus(301)
      const location = response.header('location') ?? ''
      assert.equal(location, `/en${path}?utm_source=x`, path)
      const target = await client.get(location).redirects(0)
      assert.equal(target.status(), 200, location)
    }

    const root = await client.get('/').redirects(0)
    root.assertHeader('location', '/en')
    const preferred = await client.get('/').withPlainCookie(LOCALE_COOKIE, 'id').redirects(0)
    assert.oneOf(preferred.header('location'), ['/en', '/id'])
    const english = await client.get('/en').redirects(0)
    assert.equal(english.status(), 200)
  })
})

test.group('SEO | metadata quality', () => {
  test('no two pages share a title or a description, in either language', ({ assert }) => {
    for (const locale of LOCALES) {
      const titles = keys.map((key) => seoFor(key, locale).title)
      const descriptions = keys.map((key) => seoFor(key, locale).description)
      assert.lengthOf(new Set(titles), titles.length, `${locale} titles`)
      assert.lengthOf(new Set(descriptions), descriptions.length, `${locale} descriptions`)
    }
  })

  test('no unsupported claim hides in titles, descriptions, social or structured data', ({
    assert,
  }) => {
    const offenders: string[] = []
    for (const key of keys) {
      for (const locale of LOCALES) {
        const seo = seoFor(key, locale)
        const text = [
          seo.title,
          seo.description,
          seo.social.image.alt,
          SOCIAL_CARD.headline[locale],
          SOCIAL_CARD.topics[locale],
          JSON.stringify(seo.structuredData),
        ].join('\n')
        for (const violation of findClaimViolations(text)) {
          offenders.push(`${key}.${locale} [${violation.rule}] "${violation.match}"`)
        }
      }
    }
    assert.deepEqual(offenders, [])
  })
})
