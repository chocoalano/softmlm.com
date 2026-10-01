import { test } from '@japa/runner'
import app from '@adonisjs/core/services/app'
import testUtils from '@adonisjs/core/services/test_utils'
import type { ApiClient } from '@japa/api-client'
import env from '#start/env'
import shieldConfig from '#config/shield'
import bodyParserConfig from '#config/bodyparser'
import trackingConfig from '#config/marketing_tracking'
import { SECURITY_HEADERS } from '#middleware/security_headers_middleware'
import type { UserRole } from '#config/roles'
import User from '#models/user'
import DemoRequest from '#models/demo_request'
import DemoRequestActivity from '#models/demo_request_activity'
import MarketingWhatsappIntent from '#models/marketing_whatsapp_intent'
import MarketingVisitor from '#models/marketing_visitor'
import { browse, cookiesOf, counts, enableWhatsapp, type Cookies } from '#tests/support/tracking'

/**
 * Application security checks behind docs/security-evidence.md (Phase 11):
 * response headers, CSRF on every state-changing route, the role matrix of
 * the back office, redirects, public debug routes, the page payload, the
 * tracking caps and what signed-in pages leave in the browser.
 */

let userCount = 0
function makeUser(role: UserRole) {
  userCount++
  return User.create({
    fullName: `${role} ${userCount}`,
    email: `${role}${userCount}@mlmsoft.test`,
    password: 'secret-password',
    role,
  })
}

let leadCount = 0
function makeLead(overrides: Partial<DemoRequest> = {}) {
  leadCount++
  return DemoRequest.create({
    fullName: `Lead ${leadCount}`,
    email: `lead${leadCount}@example.com`,
    company: `Company ${leadCount}`,
    status: 'new',
    source: 'homepage_demo',
    ...overrides,
  })
}

/** Lowers a configured rate limit for one test. */
function lowerLimit(
  limit: { readonly requests: number },
  requests: number,
  cleanup: (fn: () => void) => void
) {
  const writable = limit as { requests: number }
  const original = writable.requests
  writable.requests = requests
  cleanup(() => {
    writable.requests = original
  })
}

/** A WhatsApp click from an anonymous browser, recorded as an intent. */
async function makeIntent(client: ApiClient, cookies?: Cookies) {
  const visit = cookies ?? cookiesOf(await browse(client, '/en/pricing'))
  const response = await browse(
    client,
    '/r/whatsapp/pricing?locale=en&path=/en/pricing&section=hero',
    visit
  ).redirects(0)
  const text = new URL(response.header('location')!).searchParams.get('text')!
  const reference = /Ref: ([A-Z0-9]{6})$/.exec(text)?.[1]
  return MarketingWhatsappIntent.findByOrFail('reference', reference)
}

test.group('Security | response headers', () => {
  test('every response carries the security headers, pages, files and 404s alike', async ({
    client,
    assert,
  }) => {
    for (const path of ['/en', '/id/pricing', '/login', '/favicon.ico', '/no-such-page']) {
      const response = await client.get(path).redirects(0)
      for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
        assert.equal(response.header(name.toLowerCase()), value, `${name} on ${path}`)
      }
    }
  })

  test('pages are served with HSTS and without framing', async ({ client, assert }) => {
    const response = await client.get('/en')
    assert.match(response.header('strict-transport-security') ?? '', /max-age=\d+/)
    assert.equal(response.header('x-frame-options'), 'DENY')
  })

  test('the production CSP: own scripts only, no eval, no wildcard, no framing', ({ assert }) => {
    const { csp } = shieldConfig
    assert.equal(csp.enabled, app.inProduction)
    const directives = csp.directives as Record<string, string[]>
    const sources = Object.values(directives).flat()
    assert.notInclude(sources, "'unsafe-eval'")
    assert.notInclude(sources, '*')
    assert.isFalse(
      sources.some((source) => source.endsWith('*') || source === 'http:' || source === 'https:')
    )
    assert.deepEqual(directives.scriptSrc, ["'self'"])
    assert.deepEqual(directives.connectSrc, ["'self'"])
    assert.deepEqual(directives.objectSrc, ["'none'"])
    assert.deepEqual(directives.frameAncestors, ["'none'"])
    assert.deepEqual(directives.baseUri, ["'self'"])
    // the one documented exception (docs/security-audit.md)
    assert.include(directives.styleSrc, "'unsafe-inline'")
  })

  test('multipart bodies are never written to disk', ({ assert }) => {
    assert.isFalse(bodyParserConfig.multipart.autoProcess)
  })
})

test.group('Security | CSRF', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('state-changing back-office actions need the token, even for an admin', async ({
    client,
    assert,
    cleanup,
  }) => {
    enableWhatsapp(cleanup)
    const admin = await makeUser('admin')
    const lead = await makeLead()
    const intent = await makeIntent(client)

    const attempts = [
      client.patch(`/admin/demo-requests/${lead.id}/status`).json({ status: 'converted' }),
      client.post(`/admin/demo-requests/${lead.id}/notes`).json({ body: 'no token' }),
      client.post(`/admin/marketing/whatsapp/${intent.id}/contacted`),
      client.post(`/admin/marketing/whatsapp/${intent.id}/lead`).json({ lead: lead.id }),
    ]
    for (const attempt of attempts) {
      const response = await attempt.loginAs(admin).redirects(0)
      response.assertStatus(302)
      response.assertFlashMessage('errorsBag', {
        E_BAD_CSRF_TOKEN: 'Invalid or expired CSRF token',
      })
    }

    await lead.refresh()
    await intent.refresh()
    assert.equal(lead.status, 'new')
    assert.lengthOf(await DemoRequestActivity.all(), 0)
    assert.isNull(intent.contactedAt)
    assert.isNull(intent.demoRequestId)
  })

  test('undoing an action needs the token too', async ({ client, assert, cleanup }) => {
    enableWhatsapp(cleanup)
    const sales = await makeUser('sales')
    const lead = await makeLead()
    const intent = await makeIntent(client)
    await client
      .post(`/admin/marketing/whatsapp/${intent.id}/contacted`)
      .withCsrfToken()
      .loginAs(sales)
      .redirects(0)
    await client
      .post(`/admin/marketing/whatsapp/${intent.id}/lead`)
      .json({ lead: lead.id })
      .withCsrfToken()
      .loginAs(sales)
      .redirects(0)

    for (const path of ['contacted', 'lead']) {
      const response = await client
        .delete(`/admin/marketing/whatsapp/${intent.id}/${path}`)
        .loginAs(sales)
        .redirects(0)
      response.assertStatus(302)
    }

    await intent.refresh()
    assert.isNotNull(intent.contactedAt)
    assert.equal(intent.demoRequestId, lead.id)
  })

  test('public forms and the event collector need the token', async ({ client, assert }) => {
    const form = await client
      .post('/demo-requests')
      .form({ fullName: 'No Token', email: 'no-token@example.com', company: 'Co' })
      .redirects(0)
    form.assertStatus(302)
    assert.lengthOf(await DemoRequest.all(), 0)

    const page = await browse(client, '/en/pricing')
    const before = await counts()
    const events = await client
      .post('/marketing/events')
      .json({ events: [{ name: 'faq_opened', page: '/en/pricing', metadata: {} }] })
      .withCookie(trackingConfig.cookies.visitor, cookiesOf(page).visitor!)
      .accept('json')
      .redirects(0)
    assert.notEqual(events.status(), 200)
    assert.deepEqual(await counts(), before)

    const login = await client
      .post('/login')
      .form({ email: 'someone@mlmsoft.test', password: 'secret-password' })
      .redirects(0)
    assert.notEqual(login.header('location'), '/dashboard')
  })
})

test.group('Security | back-office authorization', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  /** Pages that show leads or contact details: sales and admin only. */
  const leadPages = (leadId: number) => ['/admin/demo-requests', `/admin/demo-requests/${leadId}`]
  /** Marketing analytics: sales, marketing and admin. */
  const marketingPages = (intentId: number, visitorUuid: string) => [
    '/admin/marketing',
    '/admin/marketing/visitors',
    `/admin/marketing/visitors/${visitorUuid}`,
    '/admin/marketing/whatsapp',
    `/admin/marketing/whatsapp/${intentId}`,
    '/admin/search?q=lead',
  ]

  async function fixtures(client: ApiClient, cleanup: (fn: () => void) => void) {
    enableWhatsapp(cleanup)
    const lead = await makeLead()
    const intent = await makeIntent(client)
    const visitor = await MarketingVisitor.findOrFail(intent.visitorId)
    return { lead, intent, visitorUuid: visitor.visitorUuid }
  }

  test('guests are sent to the login page from every back-office page', async ({
    client,
    assert,
    cleanup,
  }) => {
    const { lead, intent, visitorUuid } = await fixtures(client, cleanup)
    for (const path of [...leadPages(lead.id), ...marketingPages(intent.id, visitorUuid)]) {
      const response = await client.get(path).redirects(0)
      assert.equal(response.status(), 302, path)
      assert.match(response.header('location') ?? '', /^\/login/, path)
    }
  })

  test('each role sees exactly the pages it should', async ({ client, assert, cleanup }) => {
    const { lead, intent, visitorUuid } = await fixtures(client, cleanup)
    const expected: Record<UserRole, { leads: number; marketing: number }> = {
      user: { leads: 403, marketing: 403 },
      marketing: { leads: 403, marketing: 200 },
      sales: { leads: 200, marketing: 200 },
      admin: { leads: 200, marketing: 200 },
    }
    for (const [role, statuses] of Object.entries(expected) as [UserRole, typeof expected.user][]) {
      const user = await makeUser(role)
      for (const path of leadPages(lead.id)) {
        const response = await client.get(path).withInertia().loginAs(user).redirects(0)
        assert.equal(response.status(), statuses.leads, `${role} ${path}`)
      }
      for (const path of marketingPages(intent.id, visitorUuid)) {
        const response = await client.get(path).withInertia().loginAs(user).redirects(0)
        // the search box sends a found reference or lead straight to its page
        const status =
          path.startsWith('/admin/search') && response.status() === 302 ? 200 : response.status()
        assert.equal(status, statuses.marketing, `${role} ${path}`)
      }
    }
  })

  test('only sales and admins change leads and intents', async ({ client, assert, cleanup }) => {
    const { lead, intent } = await fixtures(client, cleanup)
    for (const role of ['user', 'marketing'] as const) {
      const user = await makeUser(role)
      const actions = [
        client.patch(`/admin/demo-requests/${lead.id}/status`).json({ status: 'converted' }),
        client.post(`/admin/demo-requests/${lead.id}/notes`).json({ body: 'not allowed' }),
        client.post(`/admin/marketing/whatsapp/${intent.id}/contacted`),
        client.post(`/admin/marketing/whatsapp/${intent.id}/lead`).json({ lead: lead.id }),
        client.delete(`/admin/marketing/whatsapp/${intent.id}/contacted`),
        client.delete(`/admin/marketing/whatsapp/${intent.id}/lead`),
      ]
      for (const action of actions) {
        const response = await action.withCsrfToken().loginAs(user).accept('json')
        assert.equal(response.status(), 403, role)
      }
    }
    await lead.refresh()
    await intent.refresh()
    assert.equal(lead.status, 'new')
    assert.lengthOf(await DemoRequestActivity.all(), 0)
    assert.isNull(intent.contactedAt)
    assert.isNull(intent.demoRequestId)
  })

  test('the marketing role never learns which lead an intent belongs to', async ({
    client,
    assert,
    cleanup,
  }) => {
    const { lead, intent } = await fixtures(client, cleanup)
    const sales = await makeUser('sales')
    await client
      .post(`/admin/marketing/whatsapp/${intent.id}/lead`)
      .json({ lead: lead.id })
      .withCsrfToken()
      .loginAs(sales)
      .redirects(0)

    const marketing = await makeUser('marketing')
    const asMarketing = await client
      .get(`/admin/marketing/whatsapp/${intent.id}`)
      .withInertia()
      .loginAs(marketing)
    assert.isNull(asMarketing.inertiaProps.intent.linkedLeadId)
    assert.notInclude(JSON.stringify(asMarketing.inertiaProps), lead.email)

    const asSales = await client
      .get(`/admin/marketing/whatsapp/${intent.id}`)
      .withInertia()
      .loginAs(sales)
    assert.equal(asSales.inertiaProps.intent.linkedLeadId, lead.id)
  })
})

test.group('Security | signed-in pages leave nothing behind', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('back-office responses are never cached', async ({ client, assert }) => {
    const sales = await makeUser('sales')
    for (const path of ['/dashboard', '/admin/demo-requests', '/admin/marketing']) {
      const response = await client.get(path).loginAs(sales)
      assert.equal(response.header('cache-control'), 'no-store', path)
    }
  })

  test('the login page clears the encrypted page history', async ({ client, assert }) => {
    const response = await client.get('/login').withInertia()
    assert.isTrue(response.body().clearHistory)
  })
})

test.group('Security | redirects', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('the WhatsApp redirect only ever goes to wa.me with the configured number', async ({
    client,
    assert,
    cleanup,
  }) => {
    enableWhatsapp(cleanup)
    const hostile = [
      'redirect=https://evil.example',
      'url=//evil.example',
      'next=https%3A%2F%2Fevil.example',
      'path=//evil.example',
      'locale=https://evil.example',
      'number=6289999999999',
    ].join('&')
    const response = await browse(client, `/r/whatsapp/pricing?${hostile}`).redirects(0)
    response.assertStatus(302)
    const location = response.header('location')!
    assert.match(location, /^https:\/\/wa\.me\/6281234567890\?text=/)
    assert.notInclude(location, 'evil')
    assert.notInclude(location, '6289999999999')

    const unknown = await browse(client, '/r/whatsapp/https_evil').redirects(0)
    unknown.assertStatus(404)
  })

  test('"back" never leaves the site', async ({ client, assert }) => {
    const response = await client
      .post('/login')
      .form({ email: 'nobody@mlmsoft.test', password: 'wrong-password' })
      .withCsrfToken()
      .header('referer', 'https://evil.example/phish')
      .redirects(0)
    response.assertStatus(302)
    assert.notInclude(response.header('location') ?? '', 'evil')
  })

  test('old and odd paths redirect inside the site only', async ({ client, assert }) => {
    for (const path of [
      '/pricing?next=https://evil.example',
      '//evil.example',
      '/\\evil.example',
    ]) {
      const response = await client.get(path).redirects(0)
      const location = response.header('location') ?? ''
      assert.notMatch(location, /^(https?:)?\/\/(?!localhost|127\.0\.0\.1)/, path)
      assert.notInclude(location, 'evil.example/', path)
    }
  })
})

test.group('Security | public debug routes', () => {
  /**
   * Source files, docs and the database (/package.json, /config/app.ts,
   * /docs/security-audit.md, /tmp/db.sqlite3…) are reachable only through
   * Vite's dev server, which runs in development and in these tests. The
   * production build serves build/public only: checked on a production
   * build (docs/security-audit.md, SEC-MKT evidence).
   */
  test('no debug or diagnostic route exists, no dotfile is served', async ({ client, assert }) => {
    const appKey = env.get('APP_KEY').release()
    for (const path of [
      '/env',
      '/.env',
      '/debug',
      '/_debug',
      '/phpinfo',
      '/phpinfo.php',
      '/_phpinfo',
      '/test-mail',
      '/test-db',
      '/server-status',
      '/.git/config',
      '/admin/debug',
    ]) {
      const response = await client.get(path).redirects(0)
      // 404, or 403 for dotfiles the static server refuses outright
      assert.oneOf(response.status(), [403, 404], path)
      assert.notInclude(response.text(), appKey, path)
    }
  })
})

test.group('Security | page payload', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('lead text cannot break out of the page payload', async ({ client, assert }) => {
    const sales = await makeUser('sales')
    const message = '</script><!--<script>alert(1)</script> & -->'
    const lead = await makeLead({ message, company: '<!--<script>' })

    const response = await client.get(`/admin/demo-requests/${lead.id}`).loginAs(sales)
    response.assertStatus(200)
    const html = response.text()
    const match =
      /<script data-page="app" type="application\/json">([\s\S]*?)<\/script><div id="app"><\/div>/.exec(
        html
      )
    assert.exists(match, 'payload followed by the mount element')
    const payload = match![1]
    assert.notInclude(payload, '<')
    assert.notInclude(payload, '>')
    assert.equal(JSON.parse(payload).props.lead.message, message)
  })
})

test.group('Security | tracking caps', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('WhatsApp clicks past the cap still open WhatsApp, unrecorded', async ({
    client,
    assert,
    cleanup,
  }) => {
    enableWhatsapp(cleanup)
    lowerLimit(trackingConfig.whatsappRecordLimit, 3, cleanup)

    const cookies = cookiesOf(await browse(client, '/en/pricing'))
    const refs: (string | null)[] = []
    for (let i = 0; i < 4; i++) {
      const response = await browse(client, '/r/whatsapp/pricing?locale=en', cookies).redirects(0)
      response.assertStatus(302)
      assert.match(response.header('location')!, /^https:\/\/wa\.me\//)
      const text = new URL(response.header('location')!).searchParams.get('text')!
      refs.push(/Ref: ([A-Z0-9]{6})$/.exec(text)?.[1] ?? null)
    }
    assert.lengthOf(refs.filter(Boolean), 3)
    assert.isNull(refs[3])
    assert.lengthOf(await MarketingWhatsappIntent.all(), 3)
  })

  test('browsers without cookies past the new-visitor cap are not recorded', async ({
    client,
    assert,
    cleanup,
  }) => {
    lowerLimit(trackingConfig.pageViewLimits.newVisitors, 2, cleanup)
    for (let i = 0; i < 4; i++) {
      const page = await browse(client, '/en')
      page.assertStatus(200)
    }
    const recorded = await counts()
    assert.equal(recorded.visitors, 2)
    assert.equal(recorded.events, 2)
  })

  test('page views past the per-address cap are served but not recorded', async ({
    client,
    assert,
    cleanup,
  }) => {
    lowerLimit(trackingConfig.pageViewLimits.views, 3, cleanup)
    const cookies = cookiesOf(await browse(client, '/en/pricing'))
    for (let i = 0; i < 4; i++) {
      const page = await browse(client, '/en/features', cookies)
      page.assertStatus(200)
    }
    const recorded = await counts()
    assert.equal(recorded.visitors, 1)
    assert.equal(recorded.events, 3)
  })
})
