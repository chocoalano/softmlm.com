import { test } from '@japa/runner'
import { DateTime } from 'luxon'
import testUtils from '@adonisjs/core/services/test_utils'
import limiter from '@adonisjs/limiter/services/main'
import mail from '@adonisjs/mail/services/main'
import db from '@adonisjs/lucid/services/db'
import type { ApiClient } from '@japa/api-client'
import marketingConfig, { whatsappMessages } from '#config/marketing'
import trackingConfig from '#config/marketing_tracking'
import MarketingVisitor from '#models/marketing_visitor'
import MarketingSession from '#models/marketing_session'
import MarketingEvent from '#models/marketing_event'
import MarketingWhatsappIntent from '#models/marketing_whatsapp_intent'
import DemoRequest from '#models/demo_request'
import User from '#models/user'
import LeadNotifier from '#services/lead_notifier'
import MarketingTracker from '#services/marketing_tracker'
import NewLeadNotification from '#mails/new_lead_notification'
import { contactPurposeOf } from '#services/contact_purpose'
import {
  BROWSER,
  HOST,
  VISIT,
  VISITOR,
  browse,
  cookiesOf,
  counts,
  enableWhatsapp,
  sendEvents,
} from '#tests/support/tracking'

test.group('Marketing tracking | visitors and visits', (group) => {
  group.each.setup(() => testUtils.db().truncate())
  group.each.setup(() => limiter.clear(['memory']))

  test('a first visit creates an anonymous visitor, a visit and a page view', async ({
    client,
    assert,
  }) => {
    const response = await browse(
      client,
      '/en/services/product-maklon?utm_source=instagram&utm_medium=paid&utm_campaign=maklon_launch',
      {},
      { referer: 'https://l.instagram.com/some/path?email=ayu@example.com' }
    )
    response.assertStatus(200)

    const { visitor: uuid, visit } = cookiesOf(response)
    assert.match(uuid!, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
    assert.match(visit!, /^[0-9a-f-]{36}~instagram\|paid\|maklon_launch$/)
    const header = response.headers()['set-cookie'] as unknown as string[]
    const visitorCookie = header.find((line) => line.startsWith(`${VISITOR}=`))!
    assert.include(visitorCookie, 'HttpOnly')
    assert.match(visitorCookie, /SameSite=Lax/i)
    assert.match(visitorCookie, /Max-Age=7776000/)

    const visitor = await MarketingVisitor.findByOrFail('visitorUuid', uuid)
    assert.equal(visitor.firstLandingPage, '/en/services/product-maklon')
    assert.equal(visitor.firstReferrer, 'https://l.instagram.com/some/path')
    assert.equal(visitor.firstReferrerHost, 'l.instagram.com')
    assert.equal(visitor.firstUtmSource, 'instagram')
    assert.equal(visitor.firstUtmCampaign, 'maklon_launch')
    assert.equal(visitor.firstLocale, 'en')

    const session = await MarketingSession.findByOrFail('visitorId', visitor.id)
    assert.equal(session.deviceCategory, 'desktop')
    assert.equal(session.utmMedium, 'paid')

    const [view] = await MarketingEvent.query().where('visitor_id', visitor.id)
    assert.equal(view.eventName, 'page_view')
    assert.equal(view.page, '/en/services/product-maklon')
    assert.equal(view.interestCategory, 'product_maklon')
  })

  test('a returning visitor keeps its id; a visit ends after inactivity', async ({
    client,
    assert,
  }) => {
    const first = cookiesOf(await browse(client, '/id?utm_source=instagram&utm_campaign=launch'))
    const second = cookiesOf(await browse(client, '/id/pricing', first))
    assert.equal(second.visitor, first.visitor)
    assert.equal(second.visit, first.visit)

    // the visit cookie expired (30 minutes without activity): only the visitor cookie comes back
    const third = cookiesOf(await browse(client, '/en/how-we-do-it', { visitor: first.visitor }))
    assert.equal(third.visitor, first.visitor)
    assert.notEqual(third.visit, first.visit)

    assert.deepEqual(await counts(), { visitors: 1, sessions: 2, events: 3 })
    const visitor = await MarketingVisitor.findByOrFail('visitorUuid', first.visitor)
    assert.equal(visitor.firstUtmSource, 'instagram')
    const sessions = await MarketingSession.query().orderBy('id')
    assert.isNull(sessions[1].utmSource)
    assert.equal(sessions[1].landingPage, '/en/how-we-do-it')
  })

  test('a new campaign starts a new visit; the first touch is never rewritten', async ({
    client,
    assert,
  }) => {
    const first = cookiesOf(
      await browse(client, '/en?utm_source=instagram&utm_medium=paid&utm_campaign=maklon')
    )
    const second = cookiesOf(
      await browse(
        client,
        '/en/pricing?utm_source=google&utm_medium=cpc&utm_campaign=search',
        first
      )
    )
    assert.notEqual(second.visit, first.visit)

    const visitor = await MarketingVisitor.findByOrFail('visitorUuid', first.visitor)
    assert.equal(visitor.firstUtmSource, 'instagram')
    const sessions = await MarketingSession.query().orderBy('id')
    assert.deepEqual(
      sessions.map((session) => session.utmSource),
      ['instagram', 'google']
    )
  })

  test('bots, opt-outs and Global Privacy Control are not tracked', async ({ client, assert }) => {
    const bot = await client.get('/en').header('user-agent', 'curl/8.4.0')
    assert.isUndefined(bot.cookie(VISITOR))
    const preview = await client.get('/en').header('user-agent', 'WhatsApp/2.23.20.0')
    assert.isUndefined(preview.cookie(VISITOR))
    const gpc = await browse(client, '/en', {}, { 'sec-gpc': '1' })
    assert.isUndefined(gpc.cookie(VISITOR))
    // the opt-out cookie exactly as a browser sends it
    const optedOut = await fetch(`http://${HOST}/en`, {
      headers: { 'user-agent': BROWSER, 'cookie': `${trackingConfig.cookies.optOut}=off` },
    })
    assert.equal(optedOut.status, 200)
    assert.notInclude(optedOut.headers.get('set-cookie') ?? '', `${VISITOR}=`)

    assert.deepEqual(await counts(), { visitors: 0, sessions: 0, events: 0 })
  })

  test('tracking can be switched off entirely', async ({ client, assert, cleanup }) => {
    const config = trackingConfig as { enabled: boolean }
    config.enabled = false
    cleanup(() => {
      config.enabled = true
    })
    const response = await browse(client, '/en')
    response.assertStatus(200)
    assert.isUndefined(response.cookie(VISITOR))
    assert.deepEqual(await counts(), { visitors: 0, sessions: 0, events: 0 })
  })

  test('only marketing pages answered with 200 count as page views', async ({ client, assert }) => {
    const cookies = cookiesOf(await browse(client, '/en'))
    await browse(client, '/en/does-not-exist', cookies)
    await browse(client, '/en', cookies, { 'x-inertia': 'true', 'x-inertia-partial-data': 'x' })
    await browse(client, '/en', cookies, { 'sec-purpose': 'prefetch' })
    const views = await MarketingEvent.query().where('event_name', 'page_view')
    assert.lengthOf(views, 1)
  })

  test('the redirect back after a form is not another page view', async ({ client, assert }) => {
    const cookies = cookiesOf(await browse(client, '/en/services/seo'))
    await browse(client, '/en/services/seo', cookies)
      .withInertia()
      .header('referer', `http://${HOST}/en/services/seo`)
    // an Inertia visit coming from another page still counts
    await browse(client, '/en/pricing', cookies)
      .withInertia()
      .header('referer', `http://${HOST}/en/services/seo`)

    const views = await MarketingEvent.query().where('event_name', 'page_view').orderBy('id')
    assert.deepEqual(
      views.map((view) => view.page),
      ['/en/services/seo', '/en/pricing']
    )
  })

  test('pages share whether tracking is allowed, never the visitor id', async ({
    client,
    assert,
  }) => {
    const tracked = await browse(client, '/en').withInertia()
    assert.isTrue(tracked.inertiaProps.marketing.tracking)
    assert.notInclude(JSON.stringify(tracked.inertiaProps), cookiesOf(tracked).visitor!)
    const gpc = await browse(client, '/en', {}, { 'sec-gpc': '1' }).withInertia()
    assert.isFalse(gpc.inertiaProps.marketing.tracking)
  })
})

test.group('Marketing tracking | browser events', (group) => {
  group.each.setup(() => testUtils.db().truncate())
  group.each.setup(() => limiter.clear(['memory']))

  test('allowlisted events are stored; personal data never is', async ({ client, assert }) => {
    const cookies = cookiesOf(await browse(client, '/en/services'))
    const response = await sendEvents(client, cookies, [
      {
        name: 'service_interest',
        page: '/en/services',
        interest: 'seo',
        locale: 'en',
        theme: 'dark',
        email: 'ayu@example.com',
        metadata: { email: 'ayu@example.com', from: 'en' },
      },
      {
        name: 'language_changed',
        page: '/en/services',
        metadata: {
          from: 'en',
          to: 'id',
          name: 'Ayu Pratiwi',
          email: 'ayu@example.com',
          phone: '081234567890',
          address: 'Jl. Sudirman 1',
          nik: '3174000000000001',
          password: 'secret',
          token: 'abc.def.ghi',
          authToken: 'Bearer x',
        },
      },
      { name: 'consultation_form_started', page: '/en/services', interest: 'branding' },
    ])
    response.assertStatus(204)

    const events = await MarketingEvent.query().whereNot('event_name', 'page_view').orderBy('id')
    assert.deepEqual(
      events.map((event) => [event.eventName, event.interestCategory, event.metadata]),
      [
        ['service_interest', 'seo', null],
        ['language_changed', null, { from: 'en', to: 'id' }],
        ['consultation_form_started', 'branding', null],
      ]
    )
    assert.equal(events[0].theme, 'dark')

    const everything = JSON.stringify(await db.from('marketing_events').select('*'))
    for (const leak of ['ayu', '0812', 'Sudirman', '3174', 'secret', 'Bearer', 'abc.def']) {
      assert.notInclude(everything.toLowerCase(), leak.toLowerCase(), leak)
    }
    for (const key of ['name', 'email', 'phone', 'address', 'nik', 'password', 'token']) {
      assert.notInclude(everything, `"${key}"`, key)
    }
  })

  test('only known event names, paths and sizes are accepted', async ({ client }) => {
    const cookies = cookiesOf(await browse(client, '/en'))
    for (const events of [
      [{ name: 'page_view', page: '/en' }],
      [{ name: 'whatsapp_marketing_click', page: '/en' }],
      [{ name: 'service_interest', page: 'https://evil.example/x' }],
      [{ name: 'service_interest', page: '/en', section: 'x'.repeat(41) }],
      [{ name: 'service_interest', page: '/en', interest: 'crypto' }],
      Array.from({ length: 21 }, () => ({ name: 'service_interest', page: '/en' })),
      [],
    ]) {
      const response = await sendEvents(client, cookies, events)
      response.assertStatus(422)
    }
  })

  test('an interest must fit its event', async ({ client, assert }) => {
    const cookies = cookiesOf(await browse(client, '/en'))
    await sendEvents(client, cookies, [
      { name: 'feature_interest', page: '/en', interest: 'branding' },
      { name: 'feature_interest', page: '/en', interest: 'network' },
    ])
    const events = await MarketingEvent.query()
      .where('event_name', 'feature_interest')
      .orderBy('id')
    assert.deepEqual(
      events.map((event) => event.interestCategory),
      [null, 'network']
    )
  })

  test('events without a known visitor create nothing', async ({ client, assert }) => {
    const response = await sendEvents(client, {}, [{ name: 'service_interest', page: '/en' }])
    response.assertStatus(204)
    assert.deepEqual(await counts(), { visitors: 0, sessions: 0, events: 0 })
  })

  test('the events endpoint is rate limited', async ({ client }) => {
    const cookies = cookiesOf(await browse(client, '/en'))
    for (let i = 0; i < trackingConfig.rateLimit.requests; i++) {
      await sendEvents(client, cookies, [{ name: 'service_interest', page: '/en' }])
    }
    const blocked = await sendEvents(client, cookies, [{ name: 'service_interest', page: '/en' }])
    blocked.assertStatus(429)
  })
})

test.group('Marketing tracking | WhatsApp clicks', (group) => {
  group.each.setup(() => testUtils.db().truncate())
  group.each.setup(() => limiter.clear(['memory']))

  test('a click is recorded with its context, then sent to WhatsApp with a reference', async ({
    client,
    assert,
    cleanup,
  }) => {
    enableWhatsapp(cleanup)
    const cookies = cookiesOf(await browse(client, '/id/services/product-maklon'))
    const response = await browse(
      client,
      '/r/whatsapp/service_product_maklon?locale=id&path=/id/services/product-maklon&section=hero&variant=primary&theme=dark',
      cookies
    ).redirects(0)

    response.assertStatus(302)
    const location = new URL(response.header('location')!)
    assert.equal(location.origin, 'https://wa.me')
    assert.equal(location.pathname, '/6281234567890')
    const text = location.searchParams.get('text')!
    // the reference goes at the end of the message
    const match = text.match(/^(.*) Ref: ([A-Z0-9]{6})$/)!
    assert.equal(match[1], whatsappMessages.id.service_product_maklon)
    assert.equal(match[1], 'Halo mlmsoft, saya ingin konsultasi mengenai maklon produk.')
    assert.match(match[2], /^[A-HJKMNP-Z2-9]{6}$/)

    const click = await MarketingEvent.findByOrFail('eventName', 'whatsapp_marketing_click')
    const intent = await MarketingWhatsappIntent.findByOrFail('reference', match[2])
    assert.equal(intent.eventId, click.id)
    assert.equal(intent.context, 'service_product_maklon')
    assert.equal(intent.interestCategory, 'product_maklon')
    assert.equal(intent.page, '/id/services/product-maklon')
    assert.equal(intent.section, 'hero')
    assert.equal(intent.locale, 'id')
    assert.isNull(intent.contactedAt)
    assert.isNull(intent.demoRequestId)
    assert.equal(
      Math.round(intent.expiresAt.diff(intent.clickedAt, 'days').days),
      trackingConfig.referenceDays
    )
    assert.equal(intent.attribution?.first?.landingPage, '/id/services/product-maklon')
    assert.equal(click.interestCategory, 'product_maklon')
    assert.equal(click.page, '/id/services/product-maklon')
    assert.equal(click.section, 'hero')
    assert.equal(click.locale, 'id')
    assert.deepEqual(click.metadata, { context: 'service_product_maklon', variant: 'primary' })

    // the reference reveals nothing internal
    assert.notInclude(cookies.visitor!.toUpperCase(), match[2])
    assert.notEqual(match[2], String(click.id))
    assert.notEqual(match[2], String(intent.id))

    // a click is intent, not a lead or a customer
    const [leads] = await db.from('demo_requests').count('* as total')
    assert.equal(Number(leads.total), 0)
    assert.equal(response.header('cache-control'), 'no-store')
  })

  test('every click gets its own reference', async ({ client, assert, cleanup }) => {
    enableWhatsapp(cleanup)
    const cookies = cookiesOf(await browse(client, '/en'))
    for (let i = 0; i < 5; i++) {
      await browse(client, '/r/whatsapp/general?locale=en&path=/en', cookies).redirects(0)
    }
    const intents = await MarketingWhatsappIntent.all()
    assert.lengthOf(new Set(intents.map((intent) => intent.reference)), 5)
  })

  test('only configured contexts, only wa.me: no open redirect', async ({
    client,
    assert,
    cleanup,
  }) => {
    enableWhatsapp(cleanup)
    for (const path of ['/r/whatsapp/evil', '/r/whatsapp/__proto__', '/r/whatsapp/toString']) {
      const response = await browse(client, path).redirects(0)
      response.assertStatus(404)
    }
    const response = await browse(
      client,
      '/r/whatsapp/general?next=https://evil.example&path=https://evil.example/x&locale=xx'
    ).redirects(0)
    response.assertStatus(302)
    assert.match(response.header('location')!, /^https:\/\/wa\.me\/6281234567890\?text=/)
    const click = await MarketingEvent.findByOrFail('eventName', 'whatsapp_marketing_click')
    assert.isNull(click.page)
    assert.equal(click.locale, 'en')
  })

  test('without a configured number the redirect does not exist', async ({ client }) => {
    const response = await browse(client, '/r/whatsapp/general?locale=en').redirects(0)
    response.assertStatus(404)
  })

  test('bots are sent on without a reference and without a record', async ({
    client,
    assert,
    cleanup,
  }) => {
    enableWhatsapp(cleanup)
    const response = await client
      .get('/r/whatsapp/service_branding?locale=en')
      .header('user-agent', 'facebookexternalhit/1.1')
      .redirects(0)
    response.assertStatus(302)
    const text = new URL(response.header('location')!).searchParams.get('text')
    assert.equal(text, whatsappMessages.en.service_branding)
    assert.deepEqual(await counts(), { visitors: 0, sessions: 0, events: 0 })
  })
})

test.group('Marketing tracking | leads', (group) => {
  group.each.setup(() => testUtils.db().truncate())
  group.each.setup(() => limiter.clear(['memory']))
  group.each.setup(() => {
    mail.fake()
    return async () => {
      await LeadNotifier.idle()
      mail.restore()
    }
  })

  async function journeyToLead(client: ApiClient) {
    const first = cookiesOf(
      await browse(
        client,
        '/id/services/product-maklon?utm_source=instagram&utm_medium=paid&utm_campaign=maklon_september'
      )
    )
    await browse(client, '/id/services/branding', first)
    // a later visit, through Google
    const later = cookiesOf(
      await browse(
        client,
        '/id/services/product-maklon',
        { visitor: first.visitor },
        {
          referer: 'https://www.google.com/',
        }
      )
    )
    const response = await client
      .post('/demo-requests')
      .header('user-agent', BROWSER)
      .header('referer', `http://${HOST}/id/services/product-maklon`)
      .withCookie(VISITOR, later.visitor!)
      .withCookie(VISIT, later.visit!)
      .json({
        fullName: 'Rina Kusuma',
        email: 'rina@example.com',
        company: 'Sehat Bersama',
        source: 'service_product_maklon',
        serviceInterests: ['product_maklon', 'branding'],
        locale: 'id',
      })
      .withCsrfToken()
      .redirects(0)
    response.assertStatus(302)
    return { first, later }
  }

  test('a lead is linked to the visitor and visit it was sent from', async ({ client, assert }) => {
    const { first } = await journeyToLead(client)
    const lead = await DemoRequest.findByOrFail('email', 'rina@example.com')
    const visitor = await MarketingVisitor.findByOrFail('visitorUuid', first.visitor)
    const sessions = await MarketingSession.query().where('visitor_id', visitor.id).orderBy('id')

    assert.equal(lead.marketingVisitorId, visitor.id)
    assert.equal(lead.marketingSessionId, sessions[1].id)
    assert.equal(lead.conversionPage, '/id/services/product-maklon')
    // last touch on the lead, first touch on the visitor
    assert.isNull(lead.utmSource)
    assert.equal(lead.referrer, 'https://www.google.com/')
    assert.equal(visitor.firstUtmSource, 'instagram')
    // the acquisition snapshot is frozen on the lead
    const snapshot = lead.attributionSnapshot!
    assert.equal(snapshot.visitor, first.visitor!.slice(0, 8))
    assert.equal(snapshot.first?.source, 'instagram')
    assert.equal(snapshot.first?.medium, 'paid')
    assert.equal(snapshot.first?.campaign, 'maklon_september')
    assert.equal(snapshot.first?.landingPage, '/id/services/product-maklon')
    assert.isNull(snapshot.last?.source)
    assert.equal(snapshot.last?.referrerHost, 'google.com')
    assert.equal(snapshot.conversionPage, '/id/services/product-maklon')

    const submitted = await MarketingEvent.findByOrFail('eventName', 'consultation_form_submitted')
    assert.equal(submitted.interestCategory, 'product_maklon')
    assert.deepEqual(submitted.metadata, { form: 'consultation', source: 'service_product_maklon' })
    // the event holds no contact data
    assert.notInclude(JSON.stringify(submitted.serialize()), 'rina')
  })

  test('without tracking a lead is stored as before', async ({ client, assert }) => {
    await client
      .post('/demo-requests')
      .json({
        fullName: 'Ayu Pratiwi',
        email: 'ayu@example.com',
        company: 'Nusantara Wellness',
        source: 'homepage_demo',
      })
      .withCsrfToken()
      .redirects(0)
    const lead = await DemoRequest.findByOrFail('email', 'ayu@example.com')
    assert.isNull(lead.marketingVisitorId)
    assert.isNull(lead.marketingSessionId)
    assert.isNull(lead.attributionSnapshot?.first)
    assert.isNull(lead.attributionSnapshot?.visitor)
    assert.deepEqual(await counts(), { visitors: 0, sessions: 0, events: 0 })
  })

  test('another browser is never matched to a lead', async ({ client, assert }) => {
    const someoneElse = cookiesOf(await browse(client, '/en/services/branding'))
    await journeyToLead(client)
    const lead = await DemoRequest.findByOrFail('email', 'rina@example.com')
    const other = await MarketingVisitor.findByOrFail('visitorUuid', someoneElse.visitor)
    assert.notEqual(lead.marketingVisitorId, other.id)
  })

  test('the sales email names the purpose and the sources', async ({ client, assert }) => {
    const { mails } = mail.fake()
    await journeyToLead(client)
    await LeadNotifier.idle()
    const [notification] = mails.sent().filter((sent) => sent instanceof NewLeadNotification)
    const { message } = notification as NewLeadNotification
    message.assertTextIncludes('Purpose: Product Maklon (also: Branding)')
    message.assertTextIncludes('First source: Instagram Ads')
    message.assertTextIncludes('First campaign: maklon_september')
    message.assertTextIncludes('Last source: google.com')
    message.assertTextIncludes('Sent from: /id/services/product-maklon')
    message.assertTextIncludes('Language: Indonesian')
    assert.notInclude(message.toJSON().message.text as string, 'Landed on')
  })

  test('contact purposes follow fixed rules', ({ assert }) => {
    const lead = (overrides: Partial<DemoRequest>) =>
      ({
        serviceInterests: null,
        source: 'homepage_demo',
        conversionPage: null,
        selectedModulesSnapshot: null,
        pricingEstimateSnapshot: null,
        ...overrides,
      }) as DemoRequest

    assert.deepEqual(contactPurposeOf(lead({})), {
      primary: 'software',
      additional: [],
      multiple: false,
    })
    // several topics and no page to decide between them: Multiple
    assert.deepEqual(
      contactPurposeOf(lead({ serviceInterests: ['product_maklon', 'branding', 'social_media'] })),
      {
        primary: 'multiple',
        additional: ['product_maklon', 'branding', 'social_media'],
        multiple: true,
      }
    )
    // on a service page, the page's own service is the clear intent
    assert.deepEqual(
      contactPurposeOf(
        lead({ source: 'service_branding', serviceInterests: ['product_maklon', 'branding'] })
      ),
      { primary: 'branding', additional: ['product_maklon'], multiple: true }
    )
    assert.deepEqual(contactPurposeOf(lead({ serviceInterests: ['seo'] })), {
      primary: 'seo',
      additional: [],
      multiple: false,
    })
    assert.equal(contactPurposeOf(lead({ source: 'compensation_page' })).primary, 'compensation')
    assert.equal(contactPurposeOf(lead({ source: 'homepage_estimator' })).primary, 'pricing')
    assert.equal(
      contactPurposeOf(lead({ source: 'implementation_page' })).primary,
      'implementation'
    )
    assert.equal(
      contactPurposeOf(
        lead({ source: 'feature_page', conversionPage: '/id/features/wallet-payout' })
      ).primary,
      'wallet_payout'
    )
    assert.deepEqual(
      contactPurposeOf(
        lead({
          source: 'pricing_page',
          pricingEstimateSnapshot: { currentSystem: 'replacing', modules: ['compensation'] },
        })
      ),
      { primary: 'pricing', additional: ['compensation', 'migration'], multiple: true }
    )
  })
})

test.group('Marketing tracking | back office', (group) => {
  group.each.setup(() => testUtils.db().truncate())
  group.each.setup(() => limiter.clear(['memory']))
  group.each.setup(() => {
    mail.fake()
    return async () => {
      await LeadNotifier.idle()
      mail.restore()
    }
  })

  let userCount = 0
  const makeUser = (role: 'user' | 'sales' | 'marketing' | 'admin') =>
    User.create({
      fullName: `${role} ${++userCount}`,
      email: `${role}${userCount}@mlmsoft.test`,
      password: 'secret-password',
      role,
    })

  test('marketing analytics are for admin, sales and marketing only', async ({ client }) => {
    for (const role of ['admin', 'sales', 'marketing'] as const) {
      const user = await makeUser(role)
      for (const path of ['/admin/marketing', '/admin/marketing/visitors']) {
        const response = await client.get(path).loginAs(user)
        response.assertStatus(200)
      }
    }
    const plain = await makeUser('user')
    const forbidden = [
      await client.get('/admin/marketing').loginAs(plain),
      await client.get('/admin/marketing/visitors').loginAs(plain),
    ]
    for (const response of forbidden) response.assertStatus(403)
    // the marketing role sees analytics, not the leads' contact details
    const marketing = await makeUser('marketing')
    const leads = await client.get('/admin/demo-requests').loginAs(marketing)
    leads.assertStatus(403)
    const guest = await client.get('/admin/marketing').redirects(0)
    guest.assertStatus(302)
  })

  test('a lead shows its purpose, acquisition and journey', async ({ client, assert }) => {
    const first = cookiesOf(
      await browse(
        client,
        '/id/services/product-maklon?utm_source=instagram&utm_medium=paid&utm_campaign=maklon_september'
      )
    )
    await sendEvents(client, first, [
      { name: 'service_interest', page: '/id/services/product-maklon', interest: 'branding' },
    ])
    const original = marketingConfig.whatsapp
    marketingConfig.whatsapp = { enabled: true, number: '6281234567890' }
    await browse(
      client,
      '/r/whatsapp/service_product_maklon?locale=id&path=/id/services/product-maklon',
      first
    ).redirects(0)
    marketingConfig.whatsapp = original
    await client
      .post('/demo-requests')
      .header('user-agent', BROWSER)
      .header('referer', `http://${HOST}/id/services/product-maklon`)
      .withCookie(VISITOR, first.visitor!)
      .withCookie(VISIT, first.visit!)
      .json({
        fullName: 'Rina Kusuma',
        email: 'rina@example.com',
        company: 'Sehat Bersama',
        source: 'service_product_maklon',
        serviceInterests: ['product_maklon'],
        locale: 'id',
      })
      .withCsrfToken()
      .redirects(0)

    const lead = await DemoRequest.findByOrFail('email', 'rina@example.com')
    const sales = await makeUser('sales')
    const detail = await client.get(`/admin/demo-requests/${lead.id}`).withInertia().loginAs(sales)
    const { attribution } = detail.inertiaProps
    assert.equal(attribution.purpose.primary, 'Product Maklon')
    assert.equal(attribution.conversion.form, 'Consultation form')
    assert.equal(attribution.conversion.page, '/id/services/product-maklon')
    assert.isTrue(attribution.acquisition.fromSnapshot)
    assert.equal(attribution.acquisition.first.source, 'Instagram Ads')
    assert.equal(attribution.acquisition.first.channel, 'Paid')
    assert.equal(attribution.acquisition.first.campaign, 'maklon_september')
    assert.equal(attribution.journey.firstTouch.source, 'Instagram Ads')

    // explicit interest apart from pages merely viewed
    assert.deepEqual(
      attribution.journey.explicit.map((item: { interest: string }) => item.interest),
      ['Branding', 'Product Maklon']
    )
    const milestones = Object.fromEntries(
      attribution.journey.milestones.map((item: { key: string; reached: boolean }) => [
        item.key,
        item.reached,
      ])
    )
    assert.deepEqual(milestones, {
      first_visit: true,
      explored: false,
      explicit_interest: true,
      whatsapp: true,
      form: true,
      sales_contact: false,
    })
    const labels = attribution.journey.events.map((step: { label: string }) => step.label)
    assert.equal(labels[0], 'Landed on /id/services/product-maklon')
    assert.include(labels, 'Chose Branding')
    assert.isTrue(
      labels.some((label: string) =>
        /^Clicked WhatsApp \(Product Maklon\) · Ref [A-Z0-9]{6}$/.test(label)
      )
    )
    assert.equal(labels.at(-1), 'Submitted the consultation form')

    // the same browser's WhatsApp intent is linked to the lead
    assert.lengthOf(attribution.whatsapp, 1)
    const [intent] = attribution.whatsapp
    assert.equal(intent.interest, 'Product Maklon')
    assert.equal(intent.linkMethod, 'same_visitor')
    assert.isFalse(intent.contacted)
    assert.deepEqual(lead.attributionSnapshot?.whatsappReferences, [intent.reference])

    // WhatsApp reference search in the visitor list, as pasted from a message
    const search = await client
      .get('/admin/marketing/visitors')
      .qs({ q: `Ref: ${intent.reference.toLowerCase()}` })
      .withInertia()
      .loginAs(sales)
    assert.lengthOf(search.inertiaProps.visitors, 1)
    assert.equal(search.inertiaProps.visitors[0].uuid, first.visitor)
    assert.deepEqual(search.inertiaProps.visitors[0].leadIds, [lead.id])
    assert.isTrue(search.inertiaProps.reference.resolvable)
    // a WhatsApp click never changes the lead's status
    await lead.refresh()
    assert.equal(lead.status, 'new')
  })

  test('anonymous visitors stay anonymous; the marketing role gets no lead link', async ({
    client,
    assert,
  }) => {
    const anonymous = cookiesOf(await browse(client, '/en/pricing'))
    const marketing = await makeUser('marketing')
    const list = await client.get('/admin/marketing/visitors').withInertia().loginAs(marketing)
    const [row] = list.inertiaProps.visitors
    assert.equal(row.uuid, anonymous.visitor)
    assert.equal(row.shortId, anonymous.visitor!.slice(0, 8))
    assert.isFalse(row.converted)
    assert.deepEqual(row.leadIds, [])
    assert.notProperty(row, 'email')
    assert.notProperty(row, 'fullName')

    const byId = await client
      .get('/admin/marketing/visitors')
      .qs({ q: anonymous.visitor!.slice(0, 8).toUpperCase() })
      .withInertia()
      .loginAs(marketing)
    assert.deepEqual(
      byId.inertiaProps.visitors.map((visitor: { uuid: string }) => visitor.uuid),
      [anonymous.visitor]
    )

    const page = await client
      .get(`/admin/marketing/visitors/${anonymous.visitor}`)
      .withInertia()
      .loginAs(marketing)
    page.assertStatus(200)
    assert.deepEqual(page.inertiaProps.leads, [])
    assert.equal(page.inertiaProps.journey.events[0].label, 'Landed on /en/pricing')
    // browsing only: no explicit interest, the page is "viewed"
    assert.deepEqual(page.inertiaProps.journey.explicit, [])
    assert.deepEqual(page.inertiaProps.journey.viewed, ['Pricing'])
    assert.isNull(row.explicitInterest)
    assert.equal(row.viewedInterest, 'Pricing')
  })

  test('leads from before tracking have no journey', async ({ client, assert }) => {
    const lead = await DemoRequest.create({
      fullName: 'Old Lead',
      email: 'old@example.com',
      company: 'Legacy Co',
      status: 'new',
      source: 'homepage_demo',
    })
    const admin = await makeUser('admin')
    const detail = await client.get(`/admin/demo-requests/${lead.id}`).withInertia().loginAs(admin)
    assert.isNull(detail.inertiaProps.attribution.journey)
    assert.equal(detail.inertiaProps.attribution.purpose.primary, 'Software')
    assert.isFalse(detail.inertiaProps.attribution.acquisition.fromSnapshot)
    assert.equal(detail.inertiaProps.attribution.acquisition.last.source, 'Direct')
  })

  test('the overview counts visitors, WhatsApp clicks and form leads', async ({
    client,
    assert,
    cleanup,
  }) => {
    enableWhatsapp(cleanup)
    const one = cookiesOf(await browse(client, '/en/services/seo?utm_source=newsletter'))
    await browse(client, '/r/whatsapp/service_seo?locale=en&path=/en/services/seo', one).redirects(
      0
    )
    await browse(client, '/id/pricing')
    const admin = await makeUser('admin')
    const overview = await client.get('/admin/marketing?period=7').withInertia().loginAs(admin)
    const { report } = overview.inertiaProps
    assert.equal(report.period, '7')
    assert.deepEqual(report.kpis, {
      visitors: 2,
      whatsappIntents: 1,
      formLeads: 0,
      qualifiedLeads: 0,
      linkedLeads: 0,
    })
    // visitors → explicit interest → WhatsApp → form
    assert.deepEqual(
      report.funnel.map((step: { total: number }) => step.total),
      [2, 1, 1, 0]
    )
    assert.sameDeepMembers(report.topSources, [
      { label: 'Direct', total: 1 },
      { label: 'Newsletter', total: 1 },
    ])
    assert.deepEqual(report.topExplicit, [{ label: 'SEO', total: 1 }])
    assert.includeDeepMembers(report.byPage, [
      { page: '/en/services/seo', views: 1, whatsapp: 1, forms: 0 },
    ])
  })
})

test.group('Marketing tracking | retention', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  async function makeVisitor(uuid: string, daysAgo: number) {
    const at = DateTime.now().minus({ days: daysAgo })
    const visitor = await MarketingVisitor.create({
      visitorUuid: uuid,
      firstSeenAt: at,
      lastSeenAt: at,
    })
    const session = await MarketingSession.create({
      visitorId: visitor.id,
      sessionUuid: uuid.replace(/^./, 'a'),
      startedAt: at,
      lastActivityAt: at,
    })
    await MarketingEvent.create({
      visitorId: visitor.id,
      sessionId: session.id,
      eventName: 'page_view',
      page: '/en',
      occurredAt: at,
    })
    return visitor
  }

  test('cleanup is a dry run by default and never touches lead journeys', async ({ assert }) => {
    const old = await makeVisitor('11111111-1111-4111-8111-111111111111', 400)
    const linked = await makeVisitor('22222222-2222-4222-8222-222222222222', 400)
    await makeVisitor('33333333-3333-4333-8333-333333333333', 10)
    await DemoRequest.create({
      fullName: 'Kept Lead',
      email: 'kept@example.com',
      company: 'Co',
      status: 'new',
      source: 'homepage_demo',
      marketingVisitorId: linked.id,
    })
    const ace = await testUtils.app.container.make('ace')
    ace.ui.switchMode('raw')

    const dry = await ace.exec('marketing:cleanup', [])
    dry.assertSucceeded()
    dry.assertLogMatches(/would delete 0 WhatsApp intents, 1 events, 1 visits and 1 visitors/)
    assert.deepEqual(await counts(), { visitors: 3, sessions: 3, events: 3 })

    const apply = await ace.exec('marketing:cleanup', ['--apply'])
    apply.assertSucceeded()
    assert.deepEqual(await counts(), { visitors: 2, sessions: 2, events: 2 })
    assert.isNull(await MarketingVisitor.find(old.id))
    assert.isNotNull(await MarketingVisitor.find(linked.id))
    assert.isNotNull(await DemoRequest.findBy('email', 'kept@example.com'))

    const tooShort = await ace.exec('marketing:cleanup', ['--days=7', '--apply'])
    tooShort.assertFailed()
  })

  test('tracking writes are queued and never throw', async ({ assert }) => {
    await MarketingTracker.enqueue(async () => {
      throw new Error('database unavailable')
    })
    await MarketingTracker.idle()
    assert.isTrue(true)
  })
})
