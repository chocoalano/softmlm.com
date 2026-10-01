import { test } from '@japa/runner'
import { readFile } from 'node:fs/promises'
import app from '@adonisjs/core/services/app'
import testUtils from '@adonisjs/core/services/test_utils'
import trackingConfig from '#config/marketing_tracking'
import { seoFor } from '#config/seo'
import { publicLeadOptionsFor } from '#config/leads'
import { PRIVACY_PATH, TERMS_PATH, TRACKING_PREFERENCE_PATH } from '#shared/legal'
import { LOCALE_COOKIE, THEME_COOKIE } from '#shared/locales'
import { BROWSER, HOST, VISIT, VISITOR, browse, cookiesOf, counts } from '#tests/support/tracking'

/**
 * Phase 12B: the Privacy Notice, the Terms of Use and the analytics switch
 * (docs/legal-review.md).
 */

const OPT_OUT = trackingConfig.cookies.optOut
const read = (file: string) => readFile(app.makePath(file), 'utf8')

/** The page props, from a request sent exactly as a browser sends it (raw cookies). */
async function pagePropsAsBrowser(path: string, cookie: string) {
  const response = await fetch(`http://${HOST}${path}`, {
    headers: { 'user-agent': BROWSER, cookie },
  })
  const html = await response.text()
  const json = /<script data-page="app" type="application\/json">([\s\S]*?)<\/script>/.exec(
    html
  )![1]
  return JSON.parse(json).props
}

function setCookies(response: { header(name: string): unknown }) {
  const header = response.header('set-cookie')
  return (Array.isArray(header) ? header : header ? [String(header)] : []).join('\n')
}

test.group('Legal | pages', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('privacy and terms exist in both languages, with their own SEO', async ({
    client,
    assert,
  }) => {
    for (const [key, path] of [
      ['privacy', PRIVACY_PATH],
      ['terms', TERMS_PATH],
    ] as const) {
      for (const locale of ['en', 'id'] as const) {
        const response = await client.get(`/${locale}${path}`).withInertia()
        response.assertStatus(200)
        assert.equal(response.inertiaComponent, `legal/${key}`)
        assert.deepEqual(response.inertiaProps.seo, seoFor(key, locale))
        assert.deepEqual(response.inertiaProps.leadOptions, publicLeadOptionsFor(locale))

        const html = await client.get(`/${locale}${path}`)
        const body = html.text()
        assert.include(body, `<html\n  lang="${locale}"`)
        assert.lengthOf(body.match(/rel="canonical"/g) ?? [], 1)
        assert.include(body, `rel="canonical" href="${seoFor(key, locale).canonical}"`)
        for (const alternate of ['en', 'id', 'x-default']) {
          assert.include(body, `hreflang="${alternate}"`)
        }
        assert.notInclude(body, 'noindex')
      }
    }
  })

  test('the pre-locale URLs move to the English pages, keeping campaign tags', async ({
    client,
  }) => {
    for (const path of [PRIVACY_PATH, TERMS_PATH]) {
      const response = await client.get(`${path}?utm_source=newsletter`).redirects(0)
      response.assertStatus(301)
      response.assertHeader('location', `/en${path}?utm_source=newsletter`)
    }
  })

  test('the footer and every lead form link to the Privacy Notice', async ({ assert }) => {
    const footer = await read('inertia/components/site/site_footer.vue')
    assert.include(footer, 'lp(PRIVACY_PATH)')
    assert.include(footer, 'lp(TERMS_PATH)')
    // the one form component behind every demo and consultation form
    const form = await read('inertia/components/home/demo_request.vue')
    assert.match(form, /<p class="dr__fine">[\s\S]*?lp\(PRIVACY_PATH\)[\s\S]*?<\/p>/)
    for (const locale of ['en', 'id']) {
      const common = await read(`inertia/i18n/${locale}/common.ts`)
      assert.match(common, /\n\s+privacy: '[^']+',\n\s+terms: '[^']+',/)
      assert.match(common, /privacyLink: '[^']+'/)
    }
  })
})

/** The legal copy as source text (the inertia/ project is type-checked on its own). */
const copyOf = (locale: 'en' | 'id') => read(`inertia/i18n/${locale}/legal.ts`)

test.group('Legal | what the Privacy Notice says', () => {
  test('the cookie table names the cookies the site really sets', async ({ assert }) => {
    const sessionCookie = /cookieName: '([^']+)'/.exec(await read('config/session.ts'))![1]
    const expected = [
      sessionCookie,
      'XSRF-TOKEN',
      LOCALE_COOKIE,
      THEME_COOKIE,
      trackingConfig.cookies.visitor,
      trackingConfig.cookies.visit,
      trackingConfig.cookies.optOut,
    ]
    for (const locale of ['en', 'id'] as const) {
      const source = await copyOf(locale)
      const listed = [...source.matchAll(/\n\s+cookies: '([^']+)',/g)].flatMap(([, names]) =>
        names.split(', ')
      )
      assert.sameMembers(listed, expected, locale)
    }
  })

  test('it states the real visitor and visit lifetimes', async ({ assert }) => {
    const source = await copyOf('en')
    assert.include(source, `kept for ${trackingConfig.visitorDays} days`)
    assert.include(source, `after ${trackingConfig.sessionTimeoutMinutes} minutes without activity`)
    assert.equal(trackingConfig.optOutDays, 365)
    assert.include(source, "Analytics choice',")
  })

  test('it names no third-party tracker the site does not use', async ({ assert }) => {
    const text = (await copyOf('en')) + (await copyOf('id'))
    for (const tracker of [
      'Meta Pixel',
      'Facebook Pixel',
      'TikTok Pixel',
      'Google Analytics',
      'Google Ads',
      'Google Tag Manager',
      'Hotjar',
    ]) {
      assert.notInclude(text, tracker)
    }
  })

  test('both languages have the same sections, in the same order', async ({ assert }) => {
    const outline = (source: string) =>
      [...source.matchAll(/\n\s+(id|kind): '([a-z-]+)',/g)].map(
        ([, key, value]) => `${key}:${value}`
      )
    assert.deepEqual(outline(await copyOf('id')), outline(await copyOf('en')))
  })
})

test.group('Legal | analytics switch', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('the Privacy Notice shows the browser’s actual state', async ({
    client,
    assert,
    cleanup,
  }) => {
    const on = await browse(client, `/en${PRIVACY_PATH}`).withInertia()
    assert.equal(on.inertiaProps.trackingPreference, 'on')

    const gpc = await browse(client, `/en${PRIVACY_PATH}`, {}, { 'sec-gpc': '1' }).withInertia()
    assert.equal(gpc.inertiaProps.trackingPreference, 'gpc')

    const off = await pagePropsAsBrowser(`/id${PRIVACY_PATH}`, `${OPT_OUT}=off`)
    assert.equal(off.trackingPreference, 'off')

    const config = trackingConfig as { enabled: boolean }
    config.enabled = false
    cleanup(() => {
      config.enabled = true
    })
    const disabled = await browse(client, `/en${PRIVACY_PATH}`).withInertia()
    assert.equal(disabled.inertiaProps.trackingPreference, 'disabled')
  })

  test('turning analytics off sets the opt-out cookie and forgets the visitor', async ({
    client,
    assert,
  }) => {
    const first = await browse(client, `/en${PRIVACY_PATH}`)
    const cookies = cookiesOf(first)
    assert.isString(cookies.visitor)

    const response = await client
      .post(TRACKING_PREFERENCE_PATH)
      .header('user-agent', BROWSER)
      .header('referer', `http://${HOST}/en${PRIVACY_PATH}`)
      .withCookie(VISITOR, cookies.visitor!)
      .withCookie(VISIT, cookies.visit!)
      .form({ tracking: 'off', locale: 'en' })
      .withCsrfToken()
      .redirects(0)

    response.assertStatus(302)
    response.assertHeader('location', `http://${HOST}/en${PRIVACY_PATH}`)
    response.assertFlashMessage('success', 'Analytics is off for this browser.')
    const set = setCookies(response)
    assert.match(set, new RegExp(`${OPT_OUT}=off;[^\\n]*Max-Age=31536000`))
    assert.match(set, new RegExp(`${OPT_OUT}=off;[^\\n]*HttpOnly`))
    assert.match(set, new RegExp(`${VISITOR}=;[^\\n]*Expires=Thu, 01 Jan 1970`))
    assert.match(set, new RegExp(`${VISIT}=;[^\\n]*Expires=Thu, 01 Jan 1970`))

    // the next page, exactly as the browser sends the cookie: nothing recorded
    const before = await counts()
    const next = await fetch(`http://${HOST}/en/pricing`, {
      headers: { 'user-agent': BROWSER, 'cookie': `${OPT_OUT}=off` },
    })
    assert.equal(next.status, 200)
    assert.notInclude(next.headers.get('set-cookie') ?? '', `${VISITOR}=`)
    assert.deepEqual(await counts(), before)
  })

  test('turning it back on clears the opt-out cookie, in the page language', async ({
    client,
    assert,
  }) => {
    const response = await client
      .post(TRACKING_PREFERENCE_PATH)
      .header('referer', `http://${HOST}/id${PRIVACY_PATH}`)
      .form({ tracking: 'on', locale: 'id' })
      .withCsrfToken()
      .redirects(0)

    response.assertStatus(302)
    response.assertFlashMessage('success', 'Analitik diaktifkan kembali untuk browser ini.')
    assert.match(setCookies(response), new RegExp(`${OPT_OUT}=;[^\\n]*Expires=Thu, 01 Jan 1970`))
  })

  test('only "on" and "off" are accepted, and only with the CSRF token', async ({
    client,
    assert,
  }) => {
    const invalid = await client
      .post(TRACKING_PREFERENCE_PATH)
      .form({ tracking: 'maybe' })
      .withCsrfToken()
      .redirects(0)
    invalid.assertStatus(302)
    assert.notInclude(setCookies(invalid), `${OPT_OUT}=`)

    const forged = await client
      .post(TRACKING_PREFERENCE_PATH)
      .form({ tracking: 'off' })
      .redirects(0)
    forged.assertStatus(302)
    forged.assertFlashMessage('errorsBag', { E_BAD_CSRF_TOKEN: 'Invalid or expired CSRF token' })
    assert.notInclude(setCookies(forged), `${OPT_OUT}=off`)
  })
})
