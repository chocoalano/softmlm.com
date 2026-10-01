import { test } from '@japa/runner'
import { DateTime } from 'luxon'
import testUtils from '@adonisjs/core/services/test_utils'
import limiter from '@adonisjs/limiter/services/main'
import mail from '@adonisjs/mail/services/main'
import db from '@adonisjs/lucid/services/db'
import type { ApiClient } from '@japa/api-client'
import trackingConfig from '#config/marketing_tracking'
import MarketingVisitor from '#models/marketing_visitor'
import MarketingSession from '#models/marketing_session'
import MarketingEvent from '#models/marketing_event'
import MarketingWhatsappIntent from '#models/marketing_whatsapp_intent'
import DemoRequest from '#models/demo_request'
import User from '#models/user'
import LeadNotifier from '#services/lead_notifier'
import MarketingReports from '#services/marketing_reports'
import { parseReference } from '#services/whatsapp_intents'
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
  type Cookies,
} from '#tests/support/tracking'

/**
 * End-to-end scenarios of the Phase 9.5 addendum (docs/marketing-attribution.md):
 * anonymous WhatsApp intent, form conversion, WhatsApp then form, tracking
 * switched off, malicious metadata; plus the sales actions on an intent
 * and the security of references.
 */

let userCount = 0
const makeUser = (role: 'user' | 'sales' | 'marketing' | 'admin') =>
  User.create({
    fullName: `${role} ${++userCount}`,
    email: `${role}${userCount}@mlmsoft.test`,
    password: 'secret-password',
    role,
  })

/** Clicks a WhatsApp CTA and returns the reference in the prefilled message. */
async function clickWhatsapp(client: ApiClient, context: string, path: string, cookies: Cookies) {
  const locale = path.split('/')[1]
  const response = await browse(
    client,
    `/r/whatsapp/${context}?locale=${locale}&path=${path}&section=hero&variant=primary`,
    cookies
  ).redirects(0)
  response.assertStatus(302)
  const text = new URL(response.header('location')!).searchParams.get('text')!
  return { text, reference: /Ref: ([A-Z0-9]{6})$/.exec(text)?.[1] ?? null }
}

function sendForm(
  client: ApiClient,
  cookies: Cookies,
  page: string,
  fields: Record<string, unknown>
) {
  let request = client
    .post('/demo-requests')
    .header('user-agent', BROWSER)
    .header('referer', `http://${HOST}${page}`)
  if (cookies.visitor) request = request.withCookie(VISITOR, cookies.visitor)
  if (cookies.visit) request = request.withCookie(VISIT, cookies.visit)
  return request.json(fields).withCsrfToken().redirects(0)
}

test.group('Marketing scenarios', (group) => {
  group.each.setup(() => testUtils.db().truncate())
  group.each.setup(() => limiter.clear(['memory']))
  group.each.setup(() => {
    mail.fake()
    return async () => {
      await LeadNotifier.idle()
      mail.restore()
    }
  })

  test('A: Instagram Ads → Maklon → Branding → WhatsApp, no form', async ({
    client,
    assert,
    cleanup,
  }) => {
    enableWhatsapp(cleanup)
    const cookies = cookiesOf(
      await browse(
        client,
        '/id/services/product-maklon?utm_source=instagram&utm_medium=paid&utm_campaign=maklon_september'
      )
    )
    await browse(client, '/id/services/branding', cookies)
    await browse(client, '/id/pricing', cookies)
    const { text, reference } = await clickWhatsapp(
      client,
      'service_product_maklon',
      '/id/services/product-maklon',
      cookies
    )
    assert.match(text, /^Halo mlmsoft, saya ingin konsultasi mengenai maklon produk\. Ref: /)

    // an intent, not a lead, not a customer
    const intent = await MarketingWhatsappIntent.findByOrFail('reference', reference)
    assert.isNull(intent.demoRequestId)
    const [leads] = await db.from('demo_requests').count('* as total')
    assert.equal(Number(leads.total), 0)

    // sales finds it by the reference pasted from WhatsApp
    const sales = await makeUser('sales')
    const search = await client
      .get('/admin/search')
      .qs({ q: `Ref: ${reference}` })
      .loginAs(sales)
      .redirects(0)
    search.assertStatus(302)
    assert.equal(search.header('location'), `/admin/marketing/whatsapp/${intent.id}`)

    const page = await client
      .get(`/admin/marketing/whatsapp/${intent.id}`)
      .withInertia()
      .loginAs(sales)
    const props = page.inertiaProps
    assert.equal(props.intent.interest, 'Product Maklon')
    assert.equal(props.first.source, 'Instagram Ads')
    assert.equal(props.first.campaign, 'maklon_september')
    assert.equal(props.last.landingPage, '/id/services/product-maklon')
    assert.deepEqual(props.alsoViewed, ['Branding', 'Pricing'])
    assert.isNull(props.lead)
    assert.isFalse(props.intent.contacted)

    // the visitor stays anonymous: no name, no contact field anywhere
    const visitors = await client.get('/admin/marketing/visitors').withInertia().loginAs(sales)
    const [row] = visitors.inertiaProps.visitors
    assert.equal(row.explicitInterest, 'Product Maklon')
    assert.equal(row.whatsappIntents, 1)
    assert.isFalse(row.converted)
    assert.notInclude(JSON.stringify(visitors.inertiaProps.visitors), '@')
  })

  test('B: Google organic → Pricing → Compensation → demo form', async ({ client, assert }) => {
    const cookies = cookiesOf(
      await browse(client, '/en/pricing', {}, { referer: 'https://www.google.com/search' })
    )
    await browse(client, '/en/compensation-plans', cookies)
    const response = await sendForm(client, cookies, '/en/compensation-plans', {
      fullName: 'Budi Santoso',
      email: 'budi@example.com',
      company: 'Maju Jaya',
      source: 'compensation_page',
      locale: 'en',
    })
    response.assertStatus(302)

    const lead = await DemoRequest.findByOrFail('email', 'budi@example.com')
    assert.isNotNull(lead.marketingVisitorId)
    const admin = await makeUser('admin')
    const detail = await client.get(`/admin/demo-requests/${lead.id}`).withInertia().loginAs(admin)
    const { attribution } = detail.inertiaProps
    assert.equal(attribution.purpose.primary, 'Compensation')
    assert.equal(attribution.acquisition.first.source, 'google.com')
    assert.equal(attribution.acquisition.first.channel, 'Organic search')
    assert.equal(attribution.acquisition.first.landingPage, '/en/pricing')
    assert.equal(attribution.acquisition.last.source, 'google.com')
    assert.equal(attribution.acquisition.conversionPage, '/en/compensation-plans')
    // the form is the explicit interest; Pricing was only viewed
    assert.deepEqual(
      attribution.journey.explicit.map((item: { interest: string }) => item.interest),
      ['Compensation']
    )
    assert.deepEqual(attribution.journey.viewed, ['Pricing'])
    assert.isEmpty(attribution.whatsapp)
  })

  test('C: Instagram Ads → Maklon → WhatsApp → back direct → Branding consultation', async ({
    client,
    assert,
    cleanup,
  }) => {
    enableWhatsapp(cleanup)
    const first = cookiesOf(
      await browse(
        client,
        '/id/services/product-maklon?utm_source=instagram&utm_medium=paid&utm_campaign=maklon_september'
      )
    )
    const { reference } = await clickWhatsapp(
      client,
      'service_product_maklon',
      '/id/services/product-maklon',
      first
    )
    // later: the visit has expired, the cookie persists, they come back directly
    const later = cookiesOf(
      await browse(client, '/id/services/branding', { visitor: first.visitor })
    )
    assert.equal(later.visitor, first.visitor)
    await sendForm(client, later, '/id/services/branding', {
      fullName: 'Rina Kusuma',
      email: 'rina@example.com',
      company: 'Sehat Bersama',
      source: 'service_branding',
      serviceInterests: ['branding'],
      locale: 'id',
    }).then((response) => response.assertStatus(302))

    const visitor = await MarketingVisitor.findByOrFail('visitorUuid', first.visitor)
    const sessions = await MarketingSession.query().where('visitor_id', visitor.id)
    assert.lengthOf(sessions, 2)

    const lead = await DemoRequest.findByOrFail('email', 'rina@example.com')
    assert.equal(lead.marketingVisitorId, visitor.id)
    // first touch survives the later direct visit
    assert.equal(lead.attributionSnapshot?.first?.source, 'instagram')
    assert.isNull(lead.attributionSnapshot?.last?.source)
    assert.isNull(lead.attributionSnapshot?.last?.referrerHost)
    assert.deepEqual(lead.attributionSnapshot?.whatsappReferences, [reference])

    const sales = await makeUser('sales')
    const detail = await client.get(`/admin/demo-requests/${lead.id}`).withInertia().loginAs(sales)
    const { attribution } = detail.inertiaProps
    assert.equal(attribution.acquisition.first.source, 'Instagram Ads')
    assert.equal(attribution.acquisition.last.source, 'Direct')
    // the form's intent is the purpose; the earlier WhatsApp intent is kept
    assert.equal(attribution.purpose.primary, 'Branding')
    assert.deepEqual(
      attribution.journey.explicit.map((item: { interest: string }) => item.interest),
      ['Product Maklon', 'Branding']
    )
    assert.lengthOf(attribution.whatsapp, 1)
    assert.equal(attribution.whatsapp[0].interest, 'Product Maklon')
    assert.equal(attribution.whatsapp[0].reference, reference)
    const intent = await MarketingWhatsappIntent.findByOrFail('reference', reference)
    assert.equal(intent.interestCategory, 'product_maklon')
    assert.equal(intent.demoRequestId, lead.id)
    assert.equal(intent.linkMethod, 'same_visitor')
  })

  test('D: with tracking switched off, pages, WhatsApp and forms work and nothing is stored', async ({
    client,
    assert,
    cleanup,
  }) => {
    enableWhatsapp(cleanup)
    const original = trackingConfig.enabled
    ;(trackingConfig as { enabled: boolean }).enabled = false
    cleanup(() => {
      ;(trackingConfig as { enabled: boolean }).enabled = original
    })

    for (const path of ['/en', '/id/services/product-maklon', '/en/pricing']) {
      const page = await browse(client, path)
      page.assertStatus(200)
      assert.isUndefined(page.cookie(VISITOR))
    }
    const { text, reference } = await clickWhatsapp(
      client,
      'service_product_maklon',
      '/en/services/product-maklon',
      {}
    )
    assert.isNull(reference)
    assert.equal(text, "Hi mlmsoft, I'd like to discuss product maklon for our business.")

    const events = await sendEvents(client, {}, [{ name: 'service_interest', page: '/en' }])
    events.assertStatus(204)
    const form = await sendForm(client, {}, '/en', {
      fullName: 'Ayu Pratiwi',
      email: 'ayu@example.com',
      company: 'Nusantara Wellness',
      source: 'homepage_demo',
      locale: 'en',
    })
    form.assertStatus(302)
    assert.isNotNull(await DemoRequest.findBy('email', 'ayu@example.com'))

    assert.deepEqual(await counts(), { visitors: 0, sessions: 0, events: 0 })
    const [intents] = await db.from('marketing_whatsapp_intents').count('* as total')
    assert.equal(Number(intents.total), 0)
  })

  test('E: malicious metadata never stores personal data', async ({ client, assert }) => {
    const cookies = cookiesOf(await browse(client, '/en/pricing'))
    const personal = {
      email: 'ayu@example.com',
      phone: '+6281234567890',
      nik: '3174000000000001',
      password: 'secret',
      token: 'eyJhbGciOi.secret',
      nested: { deep: 'x'.repeat(5000) },
    }
    // extra keys are dropped by validation, oversized values rejected
    await sendEvents(client, cookies, [
      { name: 'pricing_started', page: '/en/pricing', metadata: { mode: 'quick', ...personal } },
      {
        name: 'language_changed',
        page: '/en/pricing',
        metadata: { from: 'en', to: 'id', ...personal },
      },
      { name: 'feature_interest', page: '/en/pricing', interest: 'wallet_payout', ...personal },
    ]).then((response) => response.assertStatus(204))
    const oversized = await sendEvents(client, cookies, [
      { name: 'pricing_completed', page: `/en/${'a'.repeat(300)}`, section: 'x'.repeat(500) },
    ])
    assert.oneOf(oversized.status(), [204, 422])
    const tooMany = await sendEvents(
      client,
      cookies,
      Array.from({ length: trackingConfig.maxEventsPerRequest + 1 }, () => ({
        name: 'pricing_started',
        page: '/en/pricing',
      }))
    )
    assert.oneOf(tooMany.status(), [204, 422])

    const stored = await MarketingEvent.all()
    const dump = JSON.stringify(stored.map((event) => event.serialize()))
    for (const value of ['ayu@example.com', '6281234567890', '3174000000000001', 'secret']) {
      assert.notInclude(dump, value)
    }
    assert.notInclude(dump, 'xxxxxxxxxx')
    const pricing = stored.find((event) => event.eventName === 'pricing_started')!
    assert.deepEqual(pricing.metadata, { mode: 'quick' })
    // the needs estimate is always about pricing, whatever the browser claims
    assert.equal(pricing.interestCategory, 'pricing')
    assert.isBelow(stored.length, trackingConfig.maxEventsPerRequest)
  })
})

test.group('Marketing scenarios | sales actions and security', (group) => {
  group.each.setup(() => testUtils.db().truncate())
  group.each.setup(() => limiter.clear(['memory']))
  group.each.setup(() => {
    mail.fake()
    return async () => {
      await LeadNotifier.idle()
      mail.restore()
    }
  })

  async function anonymousIntent(client: ApiClient, cleanup: (fn: () => void) => void) {
    enableWhatsapp(cleanup)
    const cookies = cookiesOf(await browse(client, '/en/services/seo'))
    const { reference } = await clickWhatsapp(client, 'service_seo', '/en/services/seo', cookies)
    return MarketingWhatsappIntent.findByOrFail('reference', reference)
  }

  test('references are read however sales pastes them', ({ assert }) => {
    assert.deepEqual(parseReference('M7K4P2'), { reference: 'M7K4P2', explicit: false })
    assert.deepEqual(parseReference(' m7k4p2 '), { reference: 'M7K4P2', explicit: false })
    assert.deepEqual(parseReference('Ref: M7K4P2'), { reference: 'M7K4P2', explicit: true })
    assert.deepEqual(parseReference('(Ref: M7K4P2)'), { reference: 'M7K4P2', explicit: true })
    assert.deepEqual(parseReference('ref m7k4p2'), { reference: 'M7K4P2', explicit: true })
    for (const value of ['M7K4P', 'M7K4P21', 'M0K4P2', 'MIK4P2', 'Ref: nope', '', null]) {
      assert.isNull(parseReference(value), String(value))
    }
  })

  test('sales marks a conversation as contacted and links it to a lead, by hand', async ({
    client,
    assert,
    cleanup,
  }) => {
    const intent = await anonymousIntent(client, cleanup)
    const lead = await DemoRequest.create({
      fullName: 'Dewi Lestari',
      email: 'dewi@example.com',
      company: 'Lestari Group',
      status: 'new',
      source: 'homepage_demo',
    })
    const sales = await makeUser('sales')
    const url = `/admin/marketing/whatsapp/${intent.id}`

    await client.post(`${url}/contacted`).withCsrfToken().loginAs(sales).redirects(0)
    await client
      .post(`${url}/lead`)
      .json({ lead: lead.id })
      .withCsrfToken()
      .loginAs(sales)
      .redirects(0)
    await intent.refresh()
    assert.isNotNull(intent.contactedAt)
    assert.equal(intent.contactedBy, sales.id)
    assert.equal(intent.demoRequestId, lead.id)
    assert.equal(intent.linkMethod, 'manual')

    // linking never creates a lead, nor changes the lead's status
    const [leads] = await db.from('demo_requests').count('* as total')
    assert.equal(Number(leads.total), 1)
    await lead.refresh()
    assert.equal(lead.status, 'new')
    const activities = await lead.related('activities').query()
    assert.include(
      activities.map((item) => item.body),
      `WhatsApp reference ${intent.reference} linked (SEO)`
    )

    const journey = await client.get(`/admin/demo-requests/${lead.id}`).withInertia().loginAs(sales)
    assert.equal(journey.inertiaProps.attribution.whatsapp[0].reference, intent.reference)

    const missing = await client
      .post(`${url}/lead`)
      .json({ lead: 99999 })
      .withCsrfToken()
      .loginAs(sales)
      .redirects(0)
    missing.assertStatus(302)

    await client.delete(`${url}/contacted`).withCsrfToken().loginAs(sales).redirects(0)
    await client.delete(`${url}/lead`).withCsrfToken().loginAs(sales).redirects(0)
    await intent.refresh()
    assert.isNull(intent.contactedAt)
    assert.isNull(intent.demoRequestId)
  })

  test('the marketing role can look up intents but not act on them', async ({
    client,
    assert,
    cleanup,
  }) => {
    const intent = await anonymousIntent(client, cleanup)
    const marketing = await makeUser('marketing')
    const list = await client.get('/admin/marketing/whatsapp').withInertia().loginAs(marketing)
    list.assertStatus(200)
    assert.lengthOf(list.inertiaProps.intents, 1)
    // refused: 403, or for a page request a redirect back with the error
    const act = await client
      .post(`/admin/marketing/whatsapp/${intent.id}/contacted`)
      .withCsrfToken()
      .loginAs(marketing)
      .redirects(0)
    assert.oneOf(act.status(), [302, 403])
    const json = await client
      .post(`/admin/marketing/whatsapp/${intent.id}/contacted`)
      .accept('json')
      .withCsrfToken()
      .loginAs(marketing)
    json.assertStatus(403)
    await intent.refresh()
    assert.isNull(intent.contactedAt)
  })

  test('a reference never opens anything without a signed-in, authorised user', async ({
    client,
    assert,
    cleanup,
  }) => {
    const intent = await anonymousIntent(client, cleanup)
    for (const path of [
      `/journey/${intent.reference}`,
      `/r/${intent.reference}`,
      `/ref/${intent.reference}`,
    ]) {
      const response = await client.get(path).redirects(0)
      assert.oneOf(response.status(), [301, 302, 404], path)
      // nothing behind the reference leaks: no visitor, no attribution
      const visitor = await MarketingVisitor.findOrFail(intent.visitorId)
      assert.notInclude(response.text(), visitor.visitorUuid)
      assert.notInclude(response.text(), 'expiresAt')
    }
    for (const path of [
      '/admin/search?q=' + intent.reference,
      '/admin/marketing/whatsapp',
      `/admin/marketing/whatsapp/${intent.id}`,
    ]) {
      const guest = await client.get(path).redirects(0)
      guest.assertStatus(302)
      assert.match(guest.header('location')!, /^\/login(\?|$)/)
    }
    const plain = await makeUser('user')
    const forbidden = await client.get(`/admin/marketing/whatsapp/${intent.id}`).loginAs(plain)
    forbidden.assertStatus(403)
  })

  test('an expired, unconfirmed reference no longer opens the journey', async ({
    client,
    assert,
    cleanup,
  }) => {
    const intent = await anonymousIntent(client, cleanup)
    intent.expiresAt = DateTime.now().minus({ days: 1 })
    await intent.save()
    const sales = await makeUser('sales')
    const page = await client
      .get(`/admin/marketing/whatsapp/${intent.id}`)
      .withInertia()
      .loginAs(sales)
    assert.isFalse(page.inertiaProps.intent.resolvable)
    assert.isNull(page.inertiaProps.first)
    assert.isNull(page.inertiaProps.visitorUuid)
    const visitors = await client
      .get('/admin/marketing/visitors')
      .qs({ q: intent.reference })
      .withInertia()
      .loginAs(sales)
    assert.isEmpty(visitors.inertiaProps.visitors)
    assert.isFalse(visitors.inertiaProps.reference.resolvable)
  })

  test('the lead search shows a matching intent next to the text results', async ({
    client,
    assert,
    cleanup,
  }) => {
    const intent = await anonymousIntent(client, cleanup)
    const sales = await makeUser('sales')
    const list = await client
      .get('/admin/demo-requests')
      .qs({ q: intent.reference })
      .withInertia()
      .loginAs(sales)
    assert.equal(list.inertiaProps.reference.reference, intent.reference)
    assert.equal(list.inertiaProps.reference.interest, 'SEO')
    const missing = await client
      .get('/admin/demo-requests')
      .qs({ q: 'Ref: M7K4P2' })
      .withInertia()
      .loginAs(sales)
    assert.isTrue(missing.inertiaProps.reference.missing)
    const plain = await client
      .get('/admin/demo-requests')
      .qs({ q: 'Nusantara' })
      .withInertia()
      .loginAs(sales)
    assert.isNull(plain.inertiaProps.reference)
  })

  test('a lead keeps its acquisition after anonymous data is cleaned up', async ({
    client,
    assert,
    cleanup,
  }) => {
    enableWhatsapp(cleanup)
    const cookies = cookiesOf(
      await browse(client, '/en/services/seo?utm_source=google&utm_medium=cpc&utm_campaign=seo_q4')
    )
    await sendForm(client, cookies, '/en/services/seo', {
      fullName: 'Tono',
      email: 'tono@example.com',
      company: 'Tono Co',
      source: 'service_seo',
      serviceInterests: ['seo'],
      locale: 'en',
    })
    const lead = await DemoRequest.findByOrFail('email', 'tono@example.com')
    const before = lead.attributionSnapshot

    // even if the visitor's tracking rows disappear, the snapshot does not
    await db.from('marketing_events').delete()
    await db.from('marketing_sessions').delete()
    await db.from('demo_requests').where('id', lead.id).update({ marketing_visitor_id: null })
    await db.from('marketing_visitors').delete()
    await lead.refresh()
    assert.deepEqual(lead.attributionSnapshot, before)

    const admin = await makeUser('admin')
    const detail = await client.get(`/admin/demo-requests/${lead.id}`).withInertia().loginAs(admin)
    assert.equal(detail.inertiaProps.attribution.acquisition.first.source, 'Google Ads')
    assert.equal(detail.inertiaProps.attribution.acquisition.first.campaign, 'seo_q4')
    assert.isNull(detail.inertiaProps.attribution.journey)
  })

  test('the retention cleanup keeps confirmed and linked intents', async ({
    client,
    assert,
    cleanup,
  }) => {
    const anonymous = await anonymousIntent(client, cleanup)
    const confirmed = await anonymousIntent(client, cleanup)
    for (const intent of [anonymous, confirmed]) {
      intent.clickedAt = DateTime.now().minus({ days: 400 })
    }
    confirmed.contactedAt = DateTime.now().minus({ days: 399 })
    await anonymous.save()
    await confirmed.save()

    const ace = await testUtils.app.container.make('ace')
    ace.ui.switchMode('raw')
    const run = await ace.exec('marketing:cleanup', ['--apply'])
    run.assertSucceeded()
    assert.isNull(await MarketingWhatsappIntent.find(anonymous.id))
    assert.isNotNull(await MarketingWhatsappIntent.find(confirmed.id))
  })

  test('"today" starts at midnight in the business timezone', ({ assert }) => {
    const since = DateTime.fromFormat(MarketingReports.since('today'), 'yyyy-MM-dd HH:mm:ss')
    const midnight = DateTime.now().setZone('Asia/Jakarta').startOf('day')
    assert.equal(since.toMillis(), midnight.toLocal().set({ millisecond: 0 }).toMillis())
  })

  test('list pages use a fixed number of queries, whatever the number of rows', async ({
    client,
    assert,
    cleanup,
  }) => {
    enableWhatsapp(cleanup)
    const sales = await makeUser('sales')
    const queriesFor = async (path: string) => {
      const connection = db.connection()
      let total = 0
      const count = () => {
        total++
      }
      connection.getWriteClient().on('query', count)
      await client.get(path).withInertia().loginAs(sales)
      connection.getWriteClient().off('query', count)
      return total
    }
    const addVisitors = async (amount: number) => {
      for (let i = 0; i < amount; i++) {
        const cookies = cookiesOf(await browse(client, '/en/services/seo'))
        await clickWhatsapp(client, 'service_seo', '/en/services/seo', cookies)
      }
    }

    await addVisitors(2)
    const few = {
      visitors: await queriesFor('/admin/marketing/visitors'),
      intents: await queriesFor('/admin/marketing/whatsapp'),
      overview: await queriesFor('/admin/marketing'),
    }
    await addVisitors(6)
    const more = {
      visitors: await queriesFor('/admin/marketing/visitors'),
      intents: await queriesFor('/admin/marketing/whatsapp'),
      overview: await queriesFor('/admin/marketing'),
    }
    // the listener really counts queries (not 0 = 0)
    assert.isAbove(few.visitors, 3)
    assert.isAbove(few.intents, 1)
    assert.deepEqual(more, few)
  })
})
