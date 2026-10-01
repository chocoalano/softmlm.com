import { test } from '@japa/runner'
import { readFile } from 'node:fs/promises'
import app from '@adonisjs/core/services/app'
import testUtils from '@adonisjs/core/services/test_utils'
import limiter from '@adonisjs/limiter/services/main'
import mail from '@adonisjs/mail/services/main'
import db from '@adonisjs/lucid/services/db'
import type { ApiClient } from '@japa/api-client'
import { whatsappMessages } from '#config/marketing'
import trackingConfig from '#config/marketing_tracking'
import { seoFor } from '#config/seo'
import { publicLeadOptionsFor } from '#config/leads'
import DemoRequest from '#models/demo_request'
import MarketingEvent from '#models/marketing_event'
import MarketingWhatsappIntent from '#models/marketing_whatsapp_intent'
import User from '#models/user'
import LeadNotifier from '#services/lead_notifier'
import NewLeadNotification from '#mails/new_lead_notification'
import DemoRequestConfirmation from '#mails/demo_request_confirmation'
import { INTEGRATIONS_PATH } from '#shared/integrations'
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
 * Phase 10: the Integrations page (docs/integrations-marketing.md).
 */

let userCount = 0
const makeUser = (role: 'sales' | 'admin') =>
  User.create({
    fullName: `${role} ${++userCount}`,
    email: `${role}${userCount}-int@mlmsoft.test`,
    password: 'secret-password',
    role,
  })

function integrationRequest(
  client: ApiClient,
  cookies: Cookies,
  fields: Record<string, unknown> = {}
) {
  let request = client
    .post('/demo-requests')
    .header('user-agent', BROWSER)
    .header('referer', `http://${HOST}/en${INTEGRATIONS_PATH}`)
  if (cookies.visitor) request = request.withCookie(VISITOR, cookies.visitor)
  if (cookies.visit) request = request.withCookie(VISIT, cookies.visit)
  return request
    .json({
      fullName: 'Dimas Pratama',
      email: 'dimas@example.com',
      company: 'Pratama Network',
      source: 'integration_page',
      locale: 'en',
      serviceDetails: {
        integrationNeeds: ['payment', 'logistics'],
        apiDocumentation: 'yes',
        existingSystem: 'An in-house ERP',
      },
      ...fields,
    })
    .withCsrfToken()
    .redirects(0)
}

test.group('Integrations | page', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('exists in both languages, with its own SEO', async ({ client, assert }) => {
    for (const locale of ['en', 'id'] as const) {
      const response = await client.get(`/${locale}${INTEGRATIONS_PATH}`).withInertia()
      response.assertStatus(200)
      response.assertInertiaComponent('integrations')
      const seo = response.inertiaProps.seo
      assert.deepEqual(seo, seoFor('integrations', locale))
      assert.equal(seo.canonical, `https://mlmsoft.test/${locale}${INTEGRATIONS_PATH}`)
      assert.deepEqual(
        seo.alternates.map((alternate: { hreflang: string }) => alternate.hreflang),
        ['en', 'id', 'x-default']
      )
      assert.deepEqual(response.inertiaProps.leadOptions, publicLeadOptionsFor(locale))
    }
    assert.equal(seoFor('integrations', 'en').title, 'MLM Software Integrations')
    assert.equal(seoFor('integrations', 'id').title, 'Integrasi Software MLM')

    const html = await client.get(`/id${INTEGRATIONS_PATH}`)
    assert.match(html.text(), /<html\s+lang="id"/)
  })

  test('the old URL moves permanently to English, keeping campaign tags', async ({ client }) => {
    const response = await client.get('/integrations?utm_source=ads').redirects(0)
    response.assertStatus(301)
    response.assertHeader('location', '/en/integrations?utm_source=ads')
  })

  test('navigation leads to the page; nothing points to the old homepage anchor', async ({
    assert,
  }) => {
    const read = (file: string) => readFile(app.makePath(file), 'utf8')
    const header = await read('inertia/components/site/site_header.vue')
    const footer = await read('inertia/components/site/site_footer.vue')
    const features = await read('inertia/content/features.ts')
    const personas = await read('inertia/content/personas.ts')
    const implementation = await read('inertia/components/implementation/imp_phases.vue')
    const ecommerce = await read('inertia/pages/features/feature.vue')
    const home = await read('inertia/components/home/integrations.vue')
    for (const [name, source] of Object.entries({
      header,
      footer,
      features,
      personas,
      implementation,
      ecommerce,
      home,
    })) {
      assert.include(source, 'INTEGRATIONS_PATH', name)
      assert.notInclude(source, "'/#integrations'", name)
    }
    // the Features menu, not a sixth top-level item
    assert.match(header, /key: 'integrations', icon: Cable, href: lp\(INTEGRATIONS_PATH\)/)
  })
})

test.group('Integrations | consultation form', (group) => {
  group.each.setup(() => testUtils.db().truncate())
  group.each.setup(() => limiter.clear(['memory']))
  group.each.setup(() => {
    mail.fake()
    return async () => {
      await LeadNotifier.idle()
      mail.restore()
    }
  })

  test('stores the integration answers on the lead, with Integration as the purpose', async ({
    client,
    assert,
  }) => {
    const response = await integrationRequest(client, {})
    response.assertStatus(302)
    const lead = await DemoRequest.findByOrFail('email', 'dimas@example.com')
    assert.equal(lead.source, 'integration_page')
    assert.isNull(lead.serviceInterests)
    assert.deepEqual(lead.serviceDetails, {
      integrationNeeds: ['payment', 'logistics'],
      apiDocumentation: 'yes',
      existingSystem: 'An in-house ERP',
    })

    const admin = await makeUser('admin')
    const detail = await client.get(`/admin/demo-requests/${lead.id}`).withInertia().loginAs(admin)
    assert.equal(detail.inertiaProps.attribution.purpose.primary, 'Integration')
    assert.equal(detail.inertiaProps.attribution.conversion.form, 'Consultation form')
    assert.deepEqual(detail.inertiaProps.lead.serviceDetails, lead.serviceDetails)
  })

  test('every answer is optional except the contact details', async ({ client, assert }) => {
    const response = await integrationRequest(client, {}, { serviceDetails: undefined })
    response.assertStatus(302)
    const lead = await DemoRequest.findByOrFail('email', 'dimas@example.com')
    assert.isNull(lead.serviceDetails)
  })

  test('accepts only known areas and short answers, and never stores credentials', async ({
    client,
    assert,
  }) => {
    const invalid = await integrationRequest(
      client,
      {},
      {
        serviceDetails: { integrationNeeds: ['teleport'], apiDocumentation: 'maybe' },
      }
    )
      .accept('json')
      .redirects(0)
    invalid.assertStatus(422)

    const tooLong = await integrationRequest(
      client,
      {},
      {
        email: 'long@example.com',
        serviceDetails: { existingSystem: 'x'.repeat(121) },
      }
    )
      .accept('json')
      .redirects(0)
    tooLong.assertStatus(422)

    await integrationRequest(
      client,
      {},
      {
        apiKey: 'sk_live_123',
        password: 'hunter2',
        serviceDetails: {
          integrationNeeds: ['payment'],
          apiToken: 'secret-token',
          credentials: 'admin:hunter2',
        },
      }
    ).then((response) => response.assertStatus(302))
    const lead = await DemoRequest.findByOrFail('email', 'dimas@example.com')
    const stored = JSON.stringify(lead.serialize())
    for (const secret of ['sk_live_123', 'hunter2', 'secret-token']) {
      assert.notInclude(stored, secret)
    }
    assert.deepEqual(lead.serviceDetails, { integrationNeeds: ['payment'] })
  })

  test('the form asks only whether an API or documentation exists, never for credentials', async ({
    assert,
  }) => {
    const form = await readFile(app.makePath('inertia/components/home/demo_request.vue'), 'utf8')
    assert.notMatch(form, /v-model="form\.(?:apiKey|apiSecret|password|token|credential)/i)
    assert.notMatch(form, /type="password"/)
    for (const locale of ['en', 'id']) {
      const copy = await readFile(app.makePath(`inertia/i18n/${locale}/common.ts`), 'utf8')
      assert.match(copy, /credentials:\s*'[^']*(?:credentials|kredensial)/)
    }
  })

  test('sales get a summary: areas and API answer, no free text in the subject', async ({
    client,
    assert,
  }) => {
    const { mails } = mail.fake()
    await integrationRequest(client, {})
    await LeadNotifier.idle()
    const [notification] = mails.sent().filter((sent) => sent instanceof NewLeadNotification)
    const { message } = notification as NewLeadNotification
    const subject = message.toJSON().message.subject as string
    assert.equal(subject, 'New integration inquiry: Pratama Network')
    message.assertTextIncludes('Interest: Integration')
    message.assertTextIncludes('Integration areas: Payment, Logistics')
    message.assertTextIncludes('API / documentation: Yes')
    assert.notInclude(message.toJSON().message.text as string, 'in-house ERP')

    const [confirmation] = mails.sent().filter((sent) => sent instanceof DemoRequestConfirmation)
    const visitorMail = (confirmation as DemoRequestConfirmation).message
    visitorMail.assertTextIncludes('Payment, Logistics')
    assert.match(visitorMail.toJSON().message.subject as string, /consultation request/)
  })
})

test.group('Integrations | WhatsApp and journey', (group) => {
  group.each.setup(() => testUtils.db().truncate())
  group.each.setup(() => limiter.clear(['memory']))
  group.each.setup(() => {
    mail.fake()
    return async () => {
      await LeadNotifier.idle()
      mail.restore()
    }
  })

  test('the WhatsApp message fits the page, in both languages', async ({
    client,
    assert,
    cleanup,
  }) => {
    enableWhatsapp(cleanup)
    assert.equal(
      whatsappMessages.en.integration_discovery,
      "Hi mlmsoft, I'd like to discuss integrations with the systems our business currently uses."
    )
    assert.equal(
      whatsappMessages.id.integration_discovery,
      'Halo mlmsoft, saya ingin konsultasi mengenai integrasi dengan sistem yang saat ini digunakan bisnis kami.'
    )
    for (const locale of ['en', 'id'] as const) {
      const cookies = cookiesOf(await browse(client, `/${locale}${INTEGRATIONS_PATH}`))
      const response = await browse(
        client,
        `/r/whatsapp/integration_discovery?locale=${locale}&path=/${locale}${INTEGRATIONS_PATH}&section=hero`,
        cookies
      ).redirects(0)
      const text = new URL(response.header('location')!).searchParams.get('text')!
      assert.match(
        text,
        new RegExp(`^${whatsappMessages[locale].integration_discovery} Ref: [A-Z0-9]{6}$`)
      )
    }
  })

  test('without a WhatsApp number the page falls back to its form', async ({ client }) => {
    const response = await browse(client, '/r/whatsapp/integration_discovery?locale=en').redirects(
      0
    )
    response.assertStatus(404)
  })

  test('Google Ads → Integrations → WhatsApp → form: intent, then a linked lead', async ({
    client,
    assert,
    cleanup,
  }) => {
    enableWhatsapp(cleanup)
    const cookies = cookiesOf(
      await browse(
        client,
        `/en${INTEGRATIONS_PATH}?utm_source=google&utm_medium=cpc&utm_campaign=integration_q4`
      )
    )
    // the page itself is only browsed
    const view = await MarketingEvent.findByOrFail('eventName', 'page_view')
    assert.equal(view.interestCategory, 'integration')

    const click = await browse(
      client,
      `/r/whatsapp/integration_discovery?locale=en&path=/en${INTEGRATIONS_PATH}&section=readiness`,
      cookies
    ).redirects(0)
    const reference = /Ref: ([A-Z0-9]{6})$/.exec(
      new URL(click.header('location')!).searchParams.get('text')!
    )![1]
    const intent = await MarketingWhatsappIntent.findByOrFail('reference', reference)
    assert.equal(intent.interestCategory, 'integration')
    assert.equal(intent.attribution?.first?.source, 'google')
    // an intent, not a lead
    const [before] = await db.from('demo_requests').count('* as total')
    assert.equal(Number(before.total), 0)

    await integrationRequest(client, cookies).then((response) => response.assertStatus(302))
    const lead = await DemoRequest.findByOrFail('email', 'dimas@example.com')
    assert.isNotNull(lead.marketingVisitorId)
    assert.equal(lead.attributionSnapshot?.first?.source, 'google')
    assert.equal(lead.attributionSnapshot?.first?.campaign, 'integration_q4')
    assert.deepEqual(lead.attributionSnapshot?.whatsappReferences, [reference])
    await intent.refresh()
    assert.equal(intent.demoRequestId, lead.id)

    const sales = await makeUser('sales')
    const detail = await client.get(`/admin/demo-requests/${lead.id}`).withInertia().loginAs(sales)
    const { attribution } = detail.inertiaProps
    assert.equal(attribution.purpose.primary, 'Integration')
    assert.equal(attribution.acquisition.first.source, 'Google Ads')
    assert.deepEqual(
      attribution.journey.explicit.map((item: { interest: string }) => item.interest),
      ['Integration']
    )
    assert.equal(attribution.whatsapp[0].interest, 'Integration')
  })

  test('opening Integrations from a menu or link is explicit; reading the IT page is not', async ({
    client,
    assert,
  }) => {
    const cookies = cookiesOf(await browse(client, '/en/who-we-serve/it-teams'))
    const itView = await MarketingEvent.findByOrFail('eventName', 'page_view')
    assert.equal(itView.interestCategory, 'software')

    await sendEvents(client, cookies, [
      { name: 'feature_interest', page: '/en/who-we-serve/it-teams', interest: 'integration' },
      { name: 'consultation_form_started', page: '/en/integrations', interest: 'integration' },
    ]).then((response) => response.assertStatus(204))
    const explicit = await MarketingEvent.findByOrFail('eventName', 'feature_interest')
    assert.equal(explicit.interestCategory, 'integration')
    const started = await MarketingEvent.findByOrFail('eventName', 'consultation_form_started')
    assert.equal(started.interestCategory, 'integration')
  })

  test('with tracking off, the page, WhatsApp and the form still work and nothing is stored', async ({
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

    const page = await browse(client, `/id${INTEGRATIONS_PATH}`)
    page.assertStatus(200)
    const click = await browse(
      client,
      `/r/whatsapp/integration_discovery?locale=id&path=/id${INTEGRATIONS_PATH}`
    ).redirects(0)
    assert.equal(
      new URL(click.header('location')!).searchParams.get('text'),
      whatsappMessages.id.integration_discovery
    )
    await integrationRequest(client, {}).then((response) => response.assertStatus(302))
    assert.isNotNull(await DemoRequest.findBy('email', 'dimas@example.com'))
    assert.deepEqual(await counts(), { visitors: 0, sessions: 0, events: 0 })
    const [intents] = await db.from('marketing_whatsapp_intents').count('* as total')
    assert.equal(Number(intents.total), 0)
  })
})
