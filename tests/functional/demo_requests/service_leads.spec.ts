import { test } from '@japa/runner'
import { DateTime } from 'luxon'
import testUtils from '@adonisjs/core/services/test_utils'
import limiter from '@adonisjs/limiter/services/main'
import mail from '@adonisjs/mail/services/main'
import db from '@adonisjs/lucid/services/db'
import DemoRequest from '#models/demo_request'
import User from '#models/user'
import LeadNotifier from '#services/lead_notifier'
import NewLeadNotification from '#mails/new_lead_notification'
import DemoRequestConfirmation from '#mails/demo_request_confirmation'
import { interestCategoryOf } from '#config/leads'

const consultation = (overrides: Record<string, unknown> = {}) => ({
  fullName: 'Rina Kusuma',
  email: 'rina@example.com',
  company: 'Sehat Bersama',
  message: 'We want a new product line and packaging.',
  source: 'service_branding',
  serviceInterests: ['branding'],
  locale: 'en',
  website: '',
  ...overrides,
})

test.group('Service consultation leads', (group) => {
  group.each.setup(() => testUtils.db().truncate())
  group.each.setup(() => limiter.clear(['memory']))
  group.each.setup(() => {
    mail.fake()
    return async () => {
      await LeadNotifier.idle()
      mail.restore()
    }
  })

  test('a service page stores its source and the chosen topics', async ({ client, assert }) => {
    const response = await client
      .post('/demo-requests')
      .json(consultation({ serviceInterests: ['branding', 'seo'] }))
      .withCsrfToken()
      .redirects(0)

    response.assertStatus(302)
    response.assertFlashMessage(
      'success',
      'Thanks! Our team will reach out shortly to discuss your request.'
    )
    const lead = await DemoRequest.findByOrFail('email', 'rina@example.com')
    assert.equal(lead.source, 'service_branding')
    assert.deepEqual(lead.serviceInterests, ['branding', 'seo'])
    assert.isNull(lead.serviceDetails)
    assert.equal(lead.interestCategory, 'multiple')
    assert.isNull(lead.selectedModulesSnapshot)
  })

  test('the maklon needs selector is stored as service details', async ({ client, assert }) => {
    await client
      .post('/demo-requests')
      .json(
        consultation({
          source: 'service_product_maklon',
          serviceInterests: ['product_maklon'],
          serviceDetails: { productStage: 'concept_ready', targetLaunch: '3_6_months' },
          locale: 'id',
        })
      )
      .withCsrfToken()
      .redirects(0)

    const lead = await DemoRequest.findByOrFail('email', 'rina@example.com')
    assert.equal(lead.interestCategory, 'product_maklon')
    assert.deepEqual(lead.serviceDetails, {
      productStage: 'concept_ready',
      targetLaunch: '3_6_months',
    })
    assert.equal(lead.locale, 'id')
  })

  test('a consultation needs at least one topic, in the visitor language', async ({
    client,
    assert,
  }) => {
    for (const payload of [
      consultation({ source: 'services_overview', serviceInterests: undefined }),
      consultation({ source: 'services_overview', serviceInterests: [], locale: 'id' }),
    ]) {
      const response = await client
        .post('/demo-requests')
        .json(payload)
        .withCsrfToken()
        .accept('json')
      response.assertStatus(422)
      const error = response
        .body()
        .errors.find((item: { field: string }) => item.field === 'serviceInterests')
      assert.exists(error)
    }
    const response = await client
      .post('/demo-requests')
      .json(consultation({ source: 'services_overview', serviceInterests: [], locale: 'id' }))
      .withCsrfToken()
      .accept('json')
    assert.equal(
      response.body().errors.find((item: { field: string }) => item.field === 'serviceInterests')
        .message,
      'Mohon pilih minimal satu topik'
    )
    const [row] = await DemoRequest.query().count('* as total')
    assert.equal(Number(row.$extras.total), 0)
  })

  test('rejects unknown topics and product answers', async ({ client }) => {
    const response = await client
      .post('/demo-requests')
      .json(
        consultation({
          serviceInterests: ['branding', 'crypto'],
          serviceDetails: { productStage: 'factory_owned' },
        })
      )
      .withCsrfToken()
      .accept('json')
    response.assertStatus(422)
  })

  test('software demo requests keep working and stay software inquiries', async ({
    client,
    assert,
  }) => {
    await client
      .post('/demo-requests')
      .json({
        fullName: 'Ayu Pratiwi',
        email: 'ayu@example.com',
        company: 'Nusantara Wellness',
        source: 'homepage_demo',
        modules: ['compensation'],
      })
      .withCsrfToken()
      .redirects(0)

    const lead = await DemoRequest.findByOrFail('email', 'ayu@example.com')
    assert.isNull(lead.serviceInterests)
    assert.equal(lead.interestCategory, 'software')
    assert.deepEqual(lead.selectedModulesSnapshot, ['compensation'])
  })

  test('leads stored before Phase 9 read as software inquiries', async ({ assert }) => {
    // written the way the old code wrote it: no service columns at all
    await db.table('demo_requests').insert({
      full_name: 'Old Lead',
      email: 'old@example.com',
      company: 'Legacy Co',
      status: 'new',
      source: 'homepage_demo',
      locale: 'en',
      created_at: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'),
      updated_at: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'),
    })
    const lead = await DemoRequest.findByOrFail('email', 'old@example.com')
    assert.isNull(lead.serviceInterests)
    assert.isNull(lead.serviceDetails)
    assert.equal(lead.interestCategory, 'software')
    assert.equal(interestCategoryOf(null), 'software')
  })

  test('the sales email names the service; the visitor gets a consultation confirmation', async ({
    client,
  }) => {
    const { mails } = mail.fake()
    await client.post('/demo-requests').json(consultation()).withCsrfToken().redirects(0)
    await LeadNotifier.idle()

    mails.assertSent(NewLeadNotification, ({ message }) =>
      message.hasSubject('New Branding inquiry: Sehat Bersama')
    )
    mails.assertSent(DemoRequestConfirmation, ({ message }) =>
      message.hasSubject("We've received your consultation request")
    )

    const [notification] = mails.sent().filter((sent) => sent instanceof NewLeadNotification)
    const { message } = notification as NewLeadNotification
    message.assertHtmlIncludes('New Branding inquiry from')
    message.assertHtmlIncludes('Branding &amp; Creative')
    message.assertTextIncludes('Interest: Branding')
    message.assertTextIncludes('Services: Branding & Creative')

    const [confirmation] = mails.sent().filter((sent) => sent instanceof DemoRequestConfirmation)
    const confirmationMessage = (confirmation as DemoRequestConfirmation).message
    confirmationMessage.assertTextIncludes("You'd like to discuss: Branding & Creative.")
  })

  test('the confirmation follows the visitor language', async ({ client }) => {
    const { mails } = mail.fake()
    await client
      .post('/demo-requests')
      .json(consultation({ locale: 'id', serviceInterests: ['branding', 'seo'] }))
      .withCsrfToken()
      .redirects(0)
    await LeadNotifier.idle()

    mails.assertSent(NewLeadNotification, ({ message }) =>
      message.hasSubject('New multi-service inquiry: Sehat Bersama')
    )
    mails.assertSent(DemoRequestConfirmation, ({ message }) =>
      message.hasSubject('Permintaan konsultasi Anda sudah kami terima')
    )
    const [confirmation] = mails.sent().filter((sent) => sent instanceof DemoRequestConfirmation)
    const confirmationMessage = (confirmation as DemoRequestConfirmation).message
    confirmationMessage.assertTextIncludes(
      'Topik yang ingin Anda diskusikan: Branding & Kreatif, SEO & Konten.'
    )
  })
})

test.group('Admin | service leads', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  const makeLead = (email: string, overrides: Partial<DemoRequest> = {}) =>
    DemoRequest.create({
      fullName: email.split('@')[0],
      email,
      company: 'Co',
      status: 'new',
      source: 'homepage_demo',
      ...overrides,
    })

  test('sales can filter and read leads by interest', async ({ client, assert }) => {
    const user = await User.create({
      fullName: 'Sales',
      email: 'sales@mlmsoft.test',
      password: 'secret-password',
      role: 'sales',
    })
    await makeLead('software@example.com')
    await makeLead('brand@example.com', {
      source: 'service_branding',
      serviceInterests: ['branding'],
    })
    await makeLead('mix@example.com', {
      source: 'services_overview',
      serviceInterests: ['seo', 'paid_advertising'],
    })
    const maklon = await makeLead('maklon@example.com', {
      source: 'service_product_maklon',
      serviceInterests: ['product_maklon'],
      serviceDetails: { productStage: 'idea' },
    })

    const emails = async (interest: string) => {
      const response = await client
        .get(`/admin/demo-requests?interest=${interest}`)
        .withInertia()
        .loginAs(user)
      response.assertStatus(200)
      return response.inertiaProps.leads.data.map((lead: { email: string }) => lead.email)
    }
    assert.deepEqual(await emails('software'), ['software@example.com'])
    assert.deepEqual(await emails('branding'), ['brand@example.com'])
    assert.deepEqual(await emails('multiple'), ['mix@example.com'])
    assert.deepEqual(await emails('product_maklon'), ['maklon@example.com'])

    const all = await client.get('/admin/demo-requests').withInertia().loginAs(user)
    const categories = Object.fromEntries(
      all.inertiaProps.leads.data.map((lead: { email: string; interestCategory: string }) => [
        lead.email,
        lead.interestCategory,
      ])
    )
    assert.deepEqual(categories, {
      'software@example.com': 'software',
      'brand@example.com': 'branding',
      'mix@example.com': 'multiple',
      'maklon@example.com': 'product_maklon',
    })

    const detail = await client.get(`/admin/demo-requests/${maklon.id}`).withInertia().loginAs(user)
    assert.deepEqual(detail.inertiaProps.lead.serviceInterests, ['product_maklon'])
    assert.deepEqual(detail.inertiaProps.lead.serviceDetails, { productStage: 'idea' })
    assert.isNotEmpty(detail.inertiaProps.options.interestCategories)
  })
})
