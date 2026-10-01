import { test } from '@japa/runner'
import env from '#start/env'
import mail from '@adonisjs/mail/services/main'
import testUtils from '@adonisjs/core/services/test_utils'
import limiter from '@adonisjs/limiter/services/main'
import DemoRequest from '#models/demo_request'
import DemoRequestActivity from '#models/demo_request_activity'
import LeadNotifier from '#services/lead_notifier'
import NewLeadNotification from '#mails/new_lead_notification'
import DemoRequestConfirmation from '#mails/demo_request_confirmation'
import { ATTRIBUTION_SESSION_KEY } from '#middleware/capture_attribution_middleware'

const valid = (overrides: Record<string, unknown> = {}) => ({
  fullName: 'Ayu Pratiwi',
  email: 'ayu@example.com',
  company: 'Nusantara Wellness',
  phone: '0812-3456-7890',
  businessType: 'direct_selling',
  activeMembers: '5k_25k',
  modules: ['compensation', 'wallet_payout'],
  message: 'Confidential: our current vendor is failing us.',
  source: 'homepage_demo',
  website: '',
  ...overrides,
})

const notificationActivities = (leadId: number) =>
  DemoRequestActivity.query()
    .where('demo_request_id', leadId)
    .whereIn('type', ['notification_sent', 'notification_failed'])
    .orderBy('id')

test.group('Demo requests | notifications', (group) => {
  group.each.setup(() => testUtils.db().truncate())
  group.each.setup(() => limiter.clear(['memory']))
  group.each.teardown(() => LeadNotifier.idle())

  test('stores the lead, then emails the sales inbox and the visitor', async ({
    client,
    assert,
    cleanup,
  }) => {
    const { mails } = mail.fake()
    cleanup(() => mail.restore())

    const response = await client.post('/demo-requests').json(valid()).withCsrfToken().redirects(0)
    await LeadNotifier.idle()

    response.assertStatus(302)
    const lead = await DemoRequest.findByOrFail('email', 'ayu@example.com')

    mails.assertSentCount(2)
    mails.assertSent(
      NewLeadNotification,
      ({ message }) =>
        message.hasTo('sales@mlmsoft.test') &&
        message.hasTo('ops@mlmsoft.test') &&
        message.hasSubject('New demo request: Nusantara Wellness') &&
        message.hasReplyTo('ayu@example.com')
    )
    mails.assertSent(
      DemoRequestConfirmation,
      ({ message }) =>
        message.hasTo('ayu@example.com') &&
        message.hasSubject("We've received your demo request") &&
        message.hasReplyTo('sales@mlmsoft.test')
    )

    const outcomes = await notificationActivities(lead.id)
    assert.deepEqual(
      outcomes.map((activity) => [activity.type, activity.body]),
      [
        ['notification_sent', 'Sales team notification sent'],
        ['notification_sent', 'Confirmation email to the lead sent'],
      ]
    )
  })

  test('the sales email carries the lead essentials and a link to the admin', async ({
    client,
    assert,
    cleanup,
  }) => {
    const { mails } = mail.fake()
    cleanup(() => mail.restore())

    await client
      .post('/demo-requests')
      .json(valid())
      .withSession({
        [ATTRIBUTION_SESSION_KEY]: {
          landingPage: '/',
          referrer: null,
          utm: { utm_source: 'newsletter', utm_campaign: 'q4-launch' },
        },
      })
      .withCsrfToken()
      .redirects(0)
    await LeadNotifier.idle()

    const lead = await DemoRequest.findByOrFail('email', 'ayu@example.com')
    const [notification] = mails.sent().filter((sent) => sent instanceof NewLeadNotification)
    const { message } = notification as NewLeadNotification

    for (const text of [
      'Ayu Pratiwi',
      'Nusantara Wellness',
      'ayu@example.com',
      '+6281234567890',
      'Direct Selling',
      '5,001 – 25,000',
      'Compensation Plan, Wallet &amp; Payout',
      'Homepage demo form',
      'newsletter',
      'q4-launch',
      `https://mlmsoft.test/admin/demo-requests/${lead.id}`,
    ]) {
      message.assertHtmlIncludes(text)
    }
    message.assertTextIncludes(`https://mlmsoft.test/admin/demo-requests/${lead.id}`)
    message.assertTextIncludes('Modules: Compensation Plan, Wallet & Payout')
    assert.notInclude(message.toJSON().message.text as string, '&amp;')

    assert.notInclude(message.toJSON().message.html as string, 'Confidential')
    assert.notInclude(message.toJSON().message.html as string, 'ipHash')
  })

  test('the confirmation email promises no response time', async ({ client, assert, cleanup }) => {
    const { mails } = mail.fake()
    cleanup(() => mail.restore())

    await client.post('/demo-requests').json(valid()).withCsrfToken().redirects(0)
    await LeadNotifier.idle()

    const [confirmation] = mails.sent().filter((sent) => sent instanceof DemoRequestConfirmation)
    const html = (confirmation as DemoRequestConfirmation).message.toJSON().message.html as string
    assert.include(html, 'Thanks, Ayu.')
    assert.notMatch(html, /\b(minutes?|hours?|24|within)\b/i)
  })

  test('a mail failure never rolls back or fails the lead', async ({ client, assert, cleanup }) => {
    const original = mail.send.bind(mail)
    mail.send = (async () => {
      const error = new Error('connect ECONNREFUSED 127.0.0.1:1025') as Error & { code: string }
      error.code = 'ECONNREFUSED'
      throw error
    }) as typeof mail.send
    cleanup(() => {
      mail.send = original
    })

    const response = await client.post('/demo-requests').json(valid()).withCsrfToken().redirects(0)
    await LeadNotifier.idle()

    response.assertStatus(302)
    response.assertFlashMessage('success')
    const lead = await DemoRequest.findByOrFail('email', 'ayu@example.com')
    const outcomes = await notificationActivities(lead.id)
    assert.deepEqual(
      outcomes.map((activity) => [activity.type, activity.body]),
      [
        ['notification_failed', 'Sales team notification failed (ECONNREFUSED)'],
        ['notification_failed', 'Confirmation email to the lead failed (ECONNREFUSED)'],
      ]
    )
  })

  test('without a sales inbox the lead is kept and the skip is recorded', async ({
    client,
    assert,
    cleanup,
  }) => {
    const { mails } = mail.fake()
    const configured = env.get('SALES_NOTIFICATION_EMAILS')
    env.set('SALES_NOTIFICATION_EMAILS', '')
    cleanup(() => {
      env.set('SALES_NOTIFICATION_EMAILS', configured ?? '')
      mail.restore()
    })

    await client.post('/demo-requests').json(valid()).withCsrfToken().redirects(0)
    await LeadNotifier.idle()

    mails.assertSentCount(NewLeadNotification, 0)
    mails.assertSent(DemoRequestConfirmation, ({ message }) => !message.toJSON().message.replyTo)
    const lead = await DemoRequest.findByOrFail('email', 'ayu@example.com')
    const [skip] = await notificationActivities(lead.id)
    assert.equal(skip.type, 'notification_failed')
    assert.include(skip.body!, 'no sales inbox configured')
  })

  test('duplicates and honeypot submissions send no email', async ({ client, cleanup }) => {
    const { mails } = mail.fake()
    cleanup(() => mail.restore())

    await client.post('/demo-requests').json(valid()).withCsrfToken().redirects(0)
    await client.post('/demo-requests').json(valid()).withCsrfToken().redirects(0)
    await client
      .post('/demo-requests')
      .json(valid({ email: 'bot@example.com', phone: '', website: 'spam' }))
      .withCsrfToken()
      .redirects(0)
    await LeadNotifier.idle()

    mails.assertSentCount(2)
  })

  test('leads:notify re-sends the emails for a lead', async ({ assert, cleanup }) => {
    const { mails } = mail.fake()
    cleanup(() => mail.restore())
    const lead = await DemoRequest.create({
      fullName: 'Ayu Pratiwi',
      email: 'ayu@example.com',
      company: 'Nusantara Wellness',
      status: 'new',
      source: 'homepage_demo',
    })

    const ace = await testUtils.app.container.make('ace')
    const command = await ace.exec('leads:notify', [String(lead.id), '--internal-only'])

    command.assertSucceeded()
    mails.assertSentCount(1)
    mails.assertSent(NewLeadNotification)
    assert.lengthOf(await notificationActivities(lead.id), 1)
  })
  test('the confirmation email is written in the language the visitor used', async ({
    client,
    assert,
  }) => {
    const { mails } = mail.fake()

    await client
      .post('/demo-requests')
      .json(valid({ locale: 'id', modules: ['member_management', 'wallet_payout'] }))
      .withCsrfToken()
      .redirects(0)
    await LeadNotifier.idle()

    mails.assertSent(DemoRequestConfirmation, ({ message }) =>
      message.hasSubject('Permintaan demo Anda sudah kami terima')
    )
    const [confirmation] = mails.sent().filter((sent) => sent instanceof DemoRequestConfirmation)
    const { html, text } = (confirmation as DemoRequestConfirmation).message.toJSON().message
    assert.include(html as string, '<html lang="id">')
    assert.include(text as string, 'Terima kasih, Ayu. Permintaan demo Anda sudah kami terima.')
    assert.include(text as string, 'Area yang Anda minati: Manajemen Member, Wallet & Payout.')
  })
})
