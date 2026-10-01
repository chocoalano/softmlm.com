import { test } from '@japa/runner'
import { DateTime } from 'luxon'
import testUtils from '@adonisjs/core/services/test_utils'
import limiter from '@adonisjs/limiter/services/main'
import mail from '@adonisjs/mail/services/main'
import LeadNotifier from '#services/lead_notifier'
import leadsConfig from '#config/leads'
import DemoRequest from '#models/demo_request'
import DemoRequestService from '#services/demo_request_service'
import { ATTRIBUTION_SESSION_KEY } from '#middleware/capture_attribution_middleware'

const countLeads = async () => {
  const [row] = await DemoRequest.query().count('* as total')
  return Number(row.$extras.total)
}

const valid = (overrides: Record<string, unknown> = {}) => ({
  fullName: '  Ayu   Pratiwi ',
  email: 'Ayu@Example.COM',
  company: 'Nusantara Wellness',
  phone: '0812-3456-7890',
  businessType: 'direct_selling',
  activeMembers: '5k_25k',
  message: 'We run a hybrid plan today.',
  source: 'homepage_demo',
  website: '',
  ...overrides,
})

test.group('Demo requests | store', (group) => {
  group.each.setup(() => testUtils.db().truncate())
  group.each.setup(() => limiter.clear(['memory']))
  group.each.setup(() => {
    mail.fake()
    return async () => {
      await LeadNotifier.idle()
      mail.restore()
    }
  })

  test('stores a valid submission with normalised contact details', async ({ client, assert }) => {
    const response = await client.post('/demo-requests').form(valid()).withCsrfToken().redirects(0)

    response.assertStatus(302)
    response.assertFlashMessage(
      'success',
      'Thanks! Our team will reach out shortly to schedule your demo.'
    )

    const lead = await DemoRequest.findByOrFail('email', 'ayu@example.com')
    assert.equal(lead.fullName, 'Ayu Pratiwi')
    assert.equal(lead.phone, '+6281234567890')
    assert.equal(lead.status, 'new')
    assert.equal(lead.source, 'homepage_demo')
    assert.equal(lead.businessType, 'direct_selling')
    assert.equal(lead.activeMembers, '5k_25k')
    assert.match(lead.ipHash!, /^[a-f0-9]{64}$/)
    assert.notInclude(lead.ipHash!, '127.0.0.1')
  })

  test('rejects invalid input with field errors and stores nothing', async ({ client, assert }) => {
    const response = await client
      .post('/demo-requests')
      .json(
        valid({
          fullName: '',
          email: 'not-an-email',
          phone: 'call me',
          businessType: 'multinational',
          modules: ['ecommerce', 'teleportation'],
          source: 'somewhere',
        })
      )
      .withCsrfToken()
      .accept('json')

    response.assertStatus(422)
    const fields = response.body().errors.map((error: { field: string }) => error.field)
    assert.includeMembers(fields, [
      'fullName',
      'email',
      'phone',
      'businessType',
      'modules.1',
      'source',
    ])
    assert.equal(await countLeads(), 0)
  })

  test('requires a CSRF token', async ({ client, assert }) => {
    const response = await client.post('/demo-requests').form(valid()).redirects(0)

    response.assertFlashMissing('success')
    assert.equal(await countLeads(), 0)
  })

  test('answers bots that fill the honeypot like a success but stores nothing', async ({
    client,
    assert,
  }) => {
    const response = await client
      .post('/demo-requests')
      .form(valid({ website: 'https://spam.example' }))
      .withCsrfToken()
      .redirects(0)

    response.assertStatus(302)
    response.assertFlashMessage('success')
    assert.equal(await countLeads(), 0)
  })

  test('skips a duplicate burst from the same email', async ({ client, assert }) => {
    await client.post('/demo-requests').form(valid()).withCsrfToken().redirects(0)
    const second = await client
      .post('/demo-requests')
      .form(valid({ phone: '', company: 'Another name' }))
      .withCsrfToken()
      .redirects(0)

    second.assertStatus(302)
    second.assertFlashMessage(
      'success',
      'We already received your request a few minutes ago. Our team will be in touch soon.'
    )
    assert.equal(await countLeads(), 1)
  })

  test('skips a duplicate burst from the same phone with another email', async ({
    client,
    assert,
  }) => {
    await client.post('/demo-requests').form(valid()).withCsrfToken().redirects(0)
    await client
      .post('/demo-requests')
      .form(valid({ email: 'other@example.com', phone: '+62 812 3456 7890' }))
      .withCsrfToken()
      .redirects(0)

    assert.equal(await countLeads(), 1)
  })

  test('accepts a repeat request once the duplicate window has passed', async ({
    client,
    assert,
  }) => {
    const earlier = await DemoRequest.create({
      fullName: 'Ayu Pratiwi',
      email: 'ayu@example.com',
      company: 'Nusantara Wellness',
      status: 'contacted',
      source: 'homepage_demo',
    })
    earlier.createdAt = DateTime.now().minus({ minutes: leadsConfig.duplicateWindowMinutes + 5 })
    await earlier.save()

    await client.post('/demo-requests').form(valid()).withCsrfToken().redirects(0)

    assert.equal(await countLeads(), 2)
  })

  test('rate limits bursts per client with a clear 429', async ({ client, assert }) => {
    for (let i = 0; i < leadsConfig.rateLimit.requests; i++) {
      const ok = await client
        .post('/demo-requests')
        .form(valid({ email: `lead${i}@example.com`, phone: '' }))
        .withCsrfToken()
        .redirects(0)
      ok.assertStatus(302)
    }

    const blocked = await client
      .post('/demo-requests')
      .json(valid({ email: 'one-more@example.com', phone: '' }))
      .withCsrfToken()
      .accept('json')

    blocked.assertStatus(429)
    assert.exists(blocked.header('retry-after'))
    assert.equal(blocked.body().errors[0].message, 'Too many requests')
    assert.equal(await countLeads(), leadsConfig.rateLimit.requests)
  })

  test('tells Inertia visitors when they are rate limited', async ({ client }) => {
    for (let i = 0; i <= leadsConfig.rateLimit.requests; i++) {
      await client
        .post('/demo-requests')
        .form(valid({ email: `burst${i}@example.com`, phone: '' }))
        .withCsrfToken()
        .redirects(0)
    }

    const blocked = await client
      .post('/demo-requests')
      .form(valid({ email: 'inertia@example.com', phone: '' }))
      .header('x-inertia', 'true')
      .withCsrfToken()
      .redirects(0)

    blocked.assertStatus(302)
    blocked.assertFlashMessage('error')
  })

  test('captures landing page, external referrer and UTM tags in the session', async ({
    client,
  }) => {
    const response = await client
      .get('/?utm_source=google&utm_medium=cpc&utm_campaign=mlm-software&gclid=abc')
      .header('referer', 'https://www.google.com/search?q=private+query')

    // "/" redirects to /en with the query string kept, where the visit is recorded.
    response.assertSession(ATTRIBUTION_SESSION_KEY, {
      landingPage: '/en',
      referrer: 'https://www.google.com/search',
      utm: { utm_source: 'google', utm_medium: 'cpc', utm_campaign: 'mlm-software' },
    })
  })

  test('stores the session attribution with the lead', async ({ client, assert }) => {
    await client
      .post('/demo-requests')
      .form(valid())
      .withSession({
        [ATTRIBUTION_SESSION_KEY]: {
          landingPage: '/',
          referrer: 'https://www.google.com/search',
          utm: { utm_source: 'google', utm_medium: 'cpc', utm_campaign: 'mlm-software' },
        },
      })
      .withCsrfToken()
      .redirects(0)

    const lead = await DemoRequest.findByOrFail('email', 'ayu@example.com')
    assert.equal(lead.landingPage, '/')
    assert.equal(lead.referrer, 'https://www.google.com/search')
    assert.equal(lead.utmSource, 'google')
    assert.equal(lead.utmMedium, 'cpc')
    assert.equal(lead.utmCampaign, 'mlm-software')
    assert.isNull(lead.utmTerm)
  })

  test('stores the pricing estimator answers as a snapshot', async ({ client, assert }) => {
    await client
      .post('/demo-requests')
      .json(
        valid({
          businessType: undefined,
          activeMembers: undefined,
          source: 'homepage_estimator',
          pricingEstimate: {
            businessType: 'mlm',
            activeMembers: 'over_100k',
            currentSystem: 'replacing',
            modules: ['compensation', 'wallet_payout'],
            compensationComplexity: 'multiple',
            dataMigration: ['member_data', 'network_structure'],
            integrations: ['payment', 'logistics'],
            price: 9999,
          },
        })
      )
      .withCsrfToken()
      .redirects(0)

    const lead = await DemoRequest.findByOrFail('email', 'ayu@example.com')
    assert.equal(lead.source, 'homepage_estimator')
    assert.deepEqual(lead.pricingEstimateSnapshot, {
      businessType: 'mlm',
      activeMembers: 'over_100k',
      currentSystem: 'replacing',
      modules: ['compensation', 'wallet_payout'],
      compensationComplexity: 'multiple',
      dataMigration: ['member_data', 'network_structure'],
      integrations: ['payment', 'logistics'],
    })
    assert.deepEqual(lead.selectedModulesSnapshot, ['compensation', 'wallet_payout'])
    assert.equal(lead.businessType, 'mlm')
    assert.equal(lead.activeMembers, 'over_100k')
  })

  test('rejects unknown estimator answers', async ({ client, assert }) => {
    const response = await client
      .post('/demo-requests')
      .json(
        valid({
          source: 'pricing_page',
          pricingEstimate: {
            businessType: 'mlm',
            compensationComplexity: 'impossible',
            dataMigration: ['member_data', 'member_data'],
            integrations: ['teleport'],
          },
        })
      )
      .withCsrfToken()
      .accept('json')

    response.assertStatus(422)
    const fields = response.body().errors.map((error: { field: string }) => error.field)
    assert.includeMembers(fields, [
      'pricingEstimate.compensationComplexity',
      'pricingEstimate.dataMigration',
      'pricingEstimate.integrations.0',
    ])
    assert.equal(await countLeads(), 0)
  })

  test('never stores fields the form does not own', async ({ client, assert }) => {
    await client
      .post('/demo-requests')
      .json(
        valid({
          id: 999,
          status: 'converted',
          convertedAt: '2026-01-01 00:00:00',
          ipHash: 'forged',
          utmSource: 'forged',
          internalNotes: 'forged',
        })
      )
      .withCsrfToken()
      .redirects(0)

    const lead = await DemoRequest.findByOrFail('email', 'ayu@example.com')
    assert.notEqual(lead.id, 999)
    assert.equal(lead.status, 'new')
    assert.isNull(lead.convertedAt)
    assert.notEqual(lead.ipHash, 'forged')
    assert.isNull(lead.utmSource)
  })

  test('keeps database errors away from the visitor', async ({ client, assert, cleanup }) => {
    const original = DemoRequestService.submit
    DemoRequestService.submit = async () => {
      throw new Error('SQLITE_BUSY: database is locked (internal detail)')
    }
    cleanup(() => {
      DemoRequestService.submit = original
    })

    const response = await client.post('/demo-requests').form(valid()).withCsrfToken().redirects(0)

    response.assertStatus(302)
    const flash = response.flashMessages()
    assert.notInclude(String(flash.error), 'SQLITE')
    assert.include(String(flash.error), "We couldn't send your request")
  })
  test('answers in the language of the page, with the same rules', async ({ client, assert }) => {
    const invalid = valid({ fullName: '', email: 'not-an-email', phone: 'call me' })

    const english = await client
      .post('/demo-requests')
      .json({ ...invalid, locale: 'en' })
      .withCsrfToken()
      .accept('json')
    const indonesian = await client
      .post('/demo-requests')
      .json({ ...invalid, locale: 'id' })
      .withCsrfToken()
      .accept('json')

    english.assertStatus(422)
    indonesian.assertStatus(422)
    const messages = (response: typeof english) =>
      Object.fromEntries(
        response
          .body()
          .errors.map((error: { field: string; message: string }) => [error.field, error.message])
      )

    // Same fields fail in both languages: one set of rules.
    assert.sameMembers(Object.keys(messages(english)), Object.keys(messages(indonesian)))
    assert.equal(messages(english).email, 'Please enter a valid email address')
    assert.equal(messages(indonesian).email, 'Mohon masukkan alamat email yang valid')
    assert.equal(messages(indonesian).phone, 'Mohon masukkan nomor telepon yang valid')
    assert.equal(await countLeads(), 0)
  })

  test('stores the page language with the lead and confirms in it', async ({ client, assert }) => {
    const response = await client
      .post('/demo-requests')
      .json(valid({ locale: 'id' }))
      .withCsrfToken()
      .redirects(0)

    response.assertFlashMessage(
      'success',
      'Terima kasih! Tim kami akan segera menghubungi Anda untuk menjadwalkan demo.'
    )
    const lead = await DemoRequest.findByOrFail('email', 'ayu@example.com')
    assert.equal(lead.locale, 'id')

    const duplicate = await client
      .post('/demo-requests')
      .json(valid({ locale: 'id' }))
      .withCsrfToken()
      .redirects(0)
    duplicate.assertFlashMessage(
      'success',
      'Permintaan Anda sudah kami terima beberapa menit lalu. Tim kami akan segera menghubungi Anda.'
    )
  })

  test('an unknown language is rejected, and no language means English', async ({
    client,
    assert,
  }) => {
    await client
      .post('/demo-requests')
      .json(valid({ locale: 'fr' }))
      .withCsrfToken()
      .redirects(0)

    assert.equal(await countLeads(), 0)

    const response = await client
      .post('/demo-requests')
      .json(valid({ locale: undefined }))
      .withCsrfToken()
      .redirects(0)
    response.assertFlashMessage(
      'success',
      'Thanks! Our team will reach out shortly to schedule your demo.'
    )
    const lead = await DemoRequest.findByOrFail('email', 'ayu@example.com')
    assert.equal(lead.locale, 'en')
  })

  test('tells Indonesian visitors when they are rate limited, in Indonesian', async ({
    client,
    assert,
  }) => {
    for (let i = 0; i <= leadsConfig.rateLimit.requests; i++) {
      await client
        .post('/demo-requests')
        .form(valid({ email: `burst${i}@example.com`, phone: '', locale: 'id' }))
        .withCsrfToken()
        .redirects(0)
    }

    const blocked = await client
      .post('/demo-requests')
      .form(valid({ email: 'inertia@example.com', phone: '', locale: 'id' }))
      .header('x-inertia', 'true')
      .withCsrfToken()
      .redirects(0)

    blocked.assertStatus(302)
    assert.match(
      String(blocked.flashMessages().error),
      /^Terlalu banyak permintaan\. Silakan coba lagi dalam \d+ menit\.$/
    )
  })
})
