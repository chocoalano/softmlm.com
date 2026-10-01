import { test } from '@japa/runner'
import { readFile } from 'node:fs/promises'
import app from '@adonisjs/core/services/app'
import testUtils from '@adonisjs/core/services/test_utils'
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
import { SECURITY_PATH } from '#shared/security'
import { INTENT_LABELS } from '#shared/tracking'
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
 * Phase 11B: the Security & Trust page (docs/security-marketing.md).
 */

let userCount = 0
const makeUser = (role: 'sales' | 'admin') =>
  User.create({
    fullName: `${role} ${++userCount}`,
    email: `${role}${userCount}-sec@mlmsoft.test`,
    password: 'secret-password',
    role,
  })

function securityRequest(
  client: ApiClient,
  cookies: Cookies,
  fields: Record<string, unknown> = {}
) {
  let request = client
    .post('/demo-requests')
    .header('user-agent', BROWSER)
    .header('referer', `http://${HOST}/en${SECURITY_PATH}`)
  if (cookies.visitor) request = request.withCookie(VISITOR, cookies.visitor)
  if (cookies.visit) request = request.withCookie(VISIT, cookies.visit)
  return request
    .json({
      fullName: 'Ratna Wijaya',
      email: 'ratna@example.com',
      company: 'Wijaya Direct',
      source: 'security_page',
      locale: 'en',
      serviceDetails: { securityTopics: ['access_permissions', 'backup_recovery'] },
      ...fields,
    })
    .withCsrfToken()
    .redirects(0)
}

const read = (file: string) => readFile(app.makePath(file), 'utf8')

test.group('Security | page', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('exists in both languages, with its own SEO', async ({ client, assert }) => {
    for (const locale of ['en', 'id'] as const) {
      const response = await client.get(`/${locale}${SECURITY_PATH}`).withInertia()
      response.assertStatus(200)
      response.assertInertiaComponent('security')
      const seo = response.inertiaProps.seo
      assert.deepEqual(seo, seoFor('security', locale))
      assert.equal(seo.canonical, `https://mlmsoft.test/${locale}${SECURITY_PATH}`)
      assert.deepEqual(
        seo.alternates.map((alternate: { hreflang: string }) => alternate.hreflang),
        ['en', 'id', 'x-default']
      )
      assert.isAtMost(`${seo.title} | mlmsoft`.length, 60)
      assert.isAtLeast(seo.description.length, 110)
      assert.isAtMost(seo.description.length, 160)
      assert.deepEqual(response.inertiaProps.leadOptions, publicLeadOptionsFor(locale))
    }

    const html = await client.get(`/id${SECURITY_PATH}`)
    assert.match(html.text(), /<html\s+lang="id"/)
    assert.include(html.text(), seoFor('security', 'id').title)
  })

  test('the old URL moves permanently to English, keeping campaign tags', async ({ client }) => {
    const response = await client.get('/security?utm_source=newsletter').redirects(0)
    response.assertStatus(301)
    response.assertHeader('location', '/en/security?utm_source=newsletter')
  })

  test('the headline and the scope caption are the agreed wording', async ({ assert }) => {
    const en = await read('inertia/i18n/en/security.ts')
    const id = await read('inertia/i18n/id/security.ts')
    assert.include(en, "title: 'Security requirements should be clear'")
    assert.include(en, "highlight: 'before implementation.'")
    assert.include(id, "title: 'Kebutuhan keamanan perlu jelas'")
    assert.include(id, "highlight: 'sejak awal implementasi.'")
    assert.include(
      en.replace(/\s+/g, ' '),
      'These controls apply to the current mlmsoft marketing and internal lead-management application. Customer platform controls are defined by implementation scope.'
    )
    assert.include(en, 'SSO requirements can be assessed during technical discovery.')
    assert.include(
      en,
      'Backup and recovery requirements are defined as part of the production infrastructure plan.'
    )
  })

  test('linked from the footer, the IT page, Integrations, How We Do It and the homepage; not a header item', async ({
    assert,
  }) => {
    const sources = {
      footer: await read('inertia/components/site/site_footer.vue'),
      personas: await read('inertia/content/personas.ts'),
      integrations: await read('inertia/components/integrations/int_security.vue'),
      implementation: await read('inertia/components/implementation/imp_phases.vue'),
      home: await read('inertia/components/home/security.vue'),
    }
    for (const [name, source] of Object.entries(sources)) {
      assert.include(source, 'SECURITY_PATH', name)
      assert.notInclude(source, "'/#security'", name)
    }
    const header = await read('inertia/components/site/site_header.vue')
    assert.notInclude(header, '#security')
    assert.notInclude(header, 'SECURITY_PATH')
  })

  test('only links to a privacy page once one exists', async ({ assert }) => {
    const pages = await read('start/routes.ts')
    const copy =
      (await read('inertia/i18n/en/security.ts')) + (await read('inertia/pages/security.vue'))
    if (!/privacy/i.test(pages)) assert.notMatch(copy, /\/privacy/)
  })
})

test.group('Security | consultation form', (group) => {
  group.each.setup(() => testUtils.db().truncate())
  group.each.setup(() => {
    mail.fake()
    return async () => {
      await LeadNotifier.idle()
      mail.restore()
    }
  })

  test('stores the topics on the lead, with Security & Access as the purpose', async ({
    client,
    assert,
  }) => {
    const response = await securityRequest(client, {})
    response.assertStatus(302)
    const lead = await DemoRequest.findByOrFail('email', 'ratna@example.com')
    assert.equal(lead.source, 'security_page')
    assert.isNull(lead.serviceInterests)
    assert.deepEqual(lead.serviceDetails, {
      securityTopics: ['access_permissions', 'backup_recovery'],
    })

    const admin = await makeUser('admin')
    const detail = await client.get(`/admin/demo-requests/${lead.id}`).withInertia().loginAs(admin)
    assert.equal(detail.inertiaProps.attribution.purpose.primary, 'Security & Access')
    assert.equal(detail.inertiaProps.attribution.conversion.form, 'Consultation form')
    assert.deepEqual(detail.inertiaProps.lead.serviceDetails, lead.serviceDetails)
    assert.equal(INTENT_LABELS.security, 'Security & Access')
  })

  test('topics are optional; only known topics are accepted; credentials are never stored', async ({
    client,
    assert,
  }) => {
    const bare = await securityRequest(client, {}, { serviceDetails: undefined })
    bare.assertStatus(302)
    const bareLead = await DemoRequest.findByOrFail('email', 'ratna@example.com')
    assert.isNull(bareLead.serviceDetails)

    const invalid = await securityRequest(
      client,
      {},
      { email: 'other@example.com', serviceDetails: { securityTopics: ['penetration'] } }
    )
      .accept('json')
      .redirects(0)
    invalid.assertStatus(422)

    await securityRequest(
      client,
      {},
      {
        email: 'third@example.com',
        password: 'hunter2',
        serviceDetails: {
          securityTopics: ['infrastructure'],
          ipAllowlist: '10.0.0.0/8',
          vulnerability: 'sql injection on /admin',
          credentials: 'root:hunter2',
        },
      }
    ).then((response) => response.assertStatus(302))
    const lead = await DemoRequest.findByOrFail('email', 'third@example.com')
    const stored = JSON.stringify(lead.serialize())
    for (const secret of ['hunter2', '10.0.0.0', 'sql injection']) {
      assert.notInclude(stored, secret)
    }
    assert.deepEqual(lead.serviceDetails, { securityTopics: ['infrastructure'] })
  })

  test('the form warns against sending credentials and asks for none', async ({ assert }) => {
    const form = await read('inertia/components/home/demo_request.vue')
    assert.notMatch(form, /type="password"/)
    assert.include(form, 't.securityConsultation.form.credentials')
    assert.include(
      await read('inertia/i18n/en/common.ts'),
      'Do not send credentials or sensitive security information through this form.'
    )
    assert.include(
      await read('inertia/i18n/id/common.ts'),
      'Mohon jangan mengirim kredensial atau informasi keamanan yang sensitif lewat formulir ini.'
    )
  })

  test('sales get the topics; the visitor gets a consultation confirmation', async ({
    client,
    assert,
  }) => {
    const { mails } = mail.fake()
    await securityRequest(client, {})
    await LeadNotifier.idle()
    const [notification] = mails.sent().filter((sent) => sent instanceof NewLeadNotification)
    const { message } = notification as NewLeadNotification
    assert.equal(message.toJSON().message.subject, 'New security inquiry: Wijaya Direct')
    message.assertTextIncludes('Interest: Security & Access')
    message.assertTextIncludes('Topics: Access & permissions, Backup & recovery')

    const [confirmation] = mails.sent().filter((sent) => sent instanceof DemoRequestConfirmation)
    const visitorMail = (confirmation as DemoRequestConfirmation).message
    visitorMail.assertTextIncludes('Access & permissions, Backup & recovery')
    assert.match(visitorMail.toJSON().message.subject as string, /consultation request/)
  })
})

test.group('Security | WhatsApp and tracking', (group) => {
  group.each.setup(() => testUtils.db().truncate())
  group.each.setup(() => {
    mail.fake()
    return async () => {
      await LeadNotifier.idle()
      mail.restore()
    }
  })

  test('the WhatsApp message fits the page, in both languages, with its reference', async ({
    client,
    assert,
    cleanup,
  }) => {
    enableWhatsapp(cleanup)
    assert.equal(
      whatsappMessages.id.security_review,
      'Halo mlmsoft, saya ingin mendiskusikan kebutuhan keamanan dan akses untuk sistem MLM perusahaan kami.'
    )
    for (const locale of ['en', 'id'] as const) {
      const cookies = cookiesOf(await browse(client, `/${locale}${SECURITY_PATH}`))
      const response = await browse(
        client,
        `/r/whatsapp/security_review?locale=${locale}&path=/${locale}${SECURITY_PATH}&section=hero`,
        cookies
      ).redirects(0)
      const text = new URL(response.header('location')!).searchParams.get('text')!
      assert.match(
        text,
        new RegExp(`^${whatsappMessages[locale].security_review} Ref: [A-Z0-9]{6}$`)
      )
    }
    const intents = await MarketingWhatsappIntent.all()
    assert.lengthOf(intents, 2)
    for (const intent of intents) assert.equal(intent.interestCategory, 'security')
  })

  test('newsletter → Security → WhatsApp → form: browsed, explicit, then a linked lead', async ({
    client,
    assert,
    cleanup,
  }) => {
    enableWhatsapp(cleanup)
    const cookies = cookiesOf(
      await browse(client, `/en${SECURITY_PATH}?utm_source=newsletter&utm_medium=email`)
    )
    const view = await MarketingEvent.findByOrFail('eventName', 'page_view')
    assert.equal(view.interestCategory, 'security')

    const click = await browse(
      client,
      `/r/whatsapp/security_review?locale=en&path=/en${SECURITY_PATH}&section=mid_cta`,
      cookies
    ).redirects(0)
    const reference = /Ref: ([A-Z0-9]{6})$/.exec(
      new URL(click.header('location')!).searchParams.get('text')!
    )![1]
    const [before] = await db.from('demo_requests').count('* as total')
    assert.equal(Number(before.total), 0)

    await securityRequest(client, cookies).then((response) => response.assertStatus(302))
    const lead = await DemoRequest.findByOrFail('email', 'ratna@example.com')
    assert.deepEqual(lead.attributionSnapshot?.whatsappReferences, [reference])

    const sales = await makeUser('sales')
    const detail = await client.get(`/admin/demo-requests/${lead.id}`).withInertia().loginAs(sales)
    const { attribution } = detail.inertiaProps
    assert.equal(attribution.purpose.primary, 'Security & Access')
    assert.deepEqual(
      attribution.journey.explicit.map((item: { interest: string }) => item.interest),
      ['Security & Access']
    )
  })

  test('opening Security from a link is explicit; reading the IT page is not', async ({
    client,
    assert,
  }) => {
    const cookies = cookiesOf(await browse(client, '/en/who-we-serve/it-teams'))
    const itView = await MarketingEvent.findByOrFail('eventName', 'page_view')
    assert.notEqual(itView.interestCategory, 'security')

    await sendEvents(client, cookies, [
      { name: 'feature_interest', page: '/en/who-we-serve/it-teams', interest: 'security' },
      { name: 'consultation_form_started', page: '/en/security', interest: 'security' },
    ]).then((response) => response.assertStatus(204))
    const explicit = await MarketingEvent.findByOrFail('eventName', 'feature_interest')
    assert.equal(explicit.interestCategory, 'security')
    const started = await MarketingEvent.findByOrFail('eventName', 'consultation_form_started')
    assert.equal(started.interestCategory, 'security')
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

    const page = await browse(client, `/id${SECURITY_PATH}`)
    page.assertStatus(200)
    const click = await browse(
      client,
      `/r/whatsapp/security_review?locale=id&path=/id${SECURITY_PATH}`
    ).redirects(0)
    assert.equal(
      new URL(click.header('location')!).searchParams.get('text'),
      whatsappMessages.id.security_review
    )
    await securityRequest(client, {}).then((response) => response.assertStatus(302))
    assert.isNotNull(await DemoRequest.findBy('email', 'ratna@example.com'))
    assert.deepEqual(await counts(), { visitors: 0, sessions: 0, events: 0 })
  })
})
