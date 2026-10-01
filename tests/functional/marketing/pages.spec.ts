import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import limiter from '@adonisjs/limiter/services/main'
import mail from '@adonisjs/mail/services/main'
import DemoRequest from '#models/demo_request'
import LeadNotifier from '#services/lead_notifier'
import { ATTRIBUTION_SESSION_KEY } from '#middleware/capture_attribution_middleware'

test.group('Marketing pages', (group) => {
  group.each.setup(() => testUtils.db().truncate())
  group.each.setup(() => limiter.clear(['memory']))
  group.each.setup(() => {
    mail.fake()
    return async () => {
      await LeadNotifier.idle()
      mail.restore()
    }
  })

  test('the homepage renders with the lead form options', async ({ client, assert }) => {
    const response = await client.get('/en').withInertia()

    response.assertStatus(200)
    response.assertInertiaComponent('home')
    assert.isNotEmpty(response.inertiaProps.leadOptions.businessTypes)
  })

  test('/compensation-plans renders with the lead form options', async ({ client, assert }) => {
    const response = await client.get('/en/compensation-plans').withInertia()

    response.assertStatus(200)
    response.assertInertiaComponent('compensation_plans')
    assert.deepEqual(
      response.inertiaProps.leadOptions.memberRanges.map((range: { value: string }) => range.value),
      ['under_1k', '1k_5k', '5k_25k', '25k_100k', 'over_100k']
    )
  })

  test('/pricing renders with every estimate option', async ({ client, assert }) => {
    const response = await client.get('/id/pricing').withInertia()

    response.assertStatus(200)
    response.assertInertiaComponent('pricing')
    const options = response.inertiaProps.leadOptions
    for (const key of [
      'businessTypes',
      'memberRanges',
      'modules',
      'currentSystems',
      'compensationComplexities',
      'migrationScopes',
      'integrationNeeds',
    ]) {
      assert.isNotEmpty(options[key], key)
    }
  })

  test('every page receives the WhatsApp settings, disabled without a number', async ({
    client,
    assert,
  }) => {
    const response = await client.get('/id/pricing').withInertia()
    const whatsapp = response.inertiaProps.marketing.whatsapp

    assert.isFalse(whatsapp.enabled)
    assert.isNull(whatsapp.number)
    assert.properties(whatsapp.messages, ['general', 'compensation', 'pricing', 'implementation'])
    assert.match(whatsapp.messages.general, /^Halo mlmsoft/)
  })

  test('a lead from the pricing estimate keeps its source and answers', async ({
    client,
    assert,
  }) => {
    const snapshot = {
      businessType: 'reseller',
      activeMembers: '1k_5k',
      currentSystem: 'none',
      modules: ['member_management', 'ecommerce'],
      compensationComplexity: 'simple',
      dataMigration: ['none'],
      integrations: ['payment', 'logistics'],
    }
    await client
      .post('/demo-requests')
      .json({
        fullName: 'Ayu Pratiwi',
        email: 'ayu@example.com',
        company: 'Nusantara Wellness',
        businessType: 'reseller',
        activeMembers: '1k_5k',
        modules: ['member_management', 'ecommerce'],
        source: 'pricing_page',
        pricingEstimate: snapshot,
      })
      .withCsrfToken()
      .redirects(0)

    const lead = await DemoRequest.findByOrFail('email', 'ayu@example.com')
    assert.equal(lead.source, 'pricing_page')
    assert.deepEqual(lead.pricingEstimateSnapshot, snapshot)
    assert.deepEqual(lead.selectedModulesSnapshot, ['member_management', 'ecommerce'])
  })

  test('landing on /compensation-plans is recorded for attribution', async ({ client }) => {
    const response = await client.get(
      '/id/compensation-plans?utm_source=linkedin&utm_medium=social'
    )

    response.assertSession(ATTRIBUTION_SESSION_KEY, {
      landingPage: '/id/compensation-plans',
      referrer: null,
      utm: { utm_source: 'linkedin', utm_medium: 'social' },
    })
  })

  test('a demo request from the compensation page is attributed to it', async ({
    client,
    assert,
  }) => {
    await client
      .post('/demo-requests')
      .json({
        fullName: 'Ayu Pratiwi',
        email: 'ayu@example.com',
        company: 'Nusantara Wellness',
        source: 'compensation_page',
      })
      .withCsrfToken()
      .redirects(0)

    const lead = await DemoRequest.findByOrFail('email', 'ayu@example.com')
    assert.equal(lead.source, 'compensation_page')
  })
})
