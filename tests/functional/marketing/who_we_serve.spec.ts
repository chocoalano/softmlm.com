import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import limiter from '@adonisjs/limiter/services/main'
import mail from '@adonisjs/mail/services/main'
import DemoRequest from '#models/demo_request'
import LeadNotifier from '#services/lead_notifier'
import { seoFor } from '#config/seo'
import { personaPath, personas } from '#shared/personas'
import { LOCALES, localizePath } from '#shared/locales'

test.group('Who We Serve pages', (group) => {
  group.each.setup(() => testUtils.db().truncate())
  group.each.setup(() => limiter.clear(['memory']))
  group.each.setup(() => {
    mail.fake()
    return async () => {
      await LeadNotifier.idle()
      mail.restore()
    }
  })

  test('the landing page renders in both languages', async ({ client, assert }) => {
    for (const locale of LOCALES) {
      const response = await client.get(`/${locale}/who-we-serve`).withInertia()

      response.assertStatus(200)
      response.assertInertiaComponent('who_we_serve/index')
      assert.deepEqual(response.inertiaProps.seo, seoFor('who_we_serve', locale))
      assert.isNotEmpty(response.inertiaProps.leadOptions.businessTypes)
    }
  })

  test('each role has its own page in both languages', async ({ client, assert }) => {
    for (const locale of LOCALES) {
      for (const persona of personas) {
        const response = await client.get(localizePath(personaPath(persona), locale)).withInertia()

        response.assertStatus(200)
        response.assertInertiaComponent('who_we_serve/persona')
        assert.equal(response.inertiaProps.persona, persona.key)
        assert.deepEqual(response.inertiaProps.seo, seoFor(`who_we_serve.${persona.key}`, locale))
      }
    }
  })

  test('an unknown role is a 404, not an empty page', async ({ client }) => {
    for (const locale of LOCALES) {
      const response = await client.get(`/${locale}/who-we-serve/marketing`)
      response.assertStatus(404)
    }
  })

  test('the distributor page uses the Phase 7 title', ({ assert }) => {
    assert.equal(
      seoFor('who_we_serve.distributors', 'en').title,
      'Distributor Experience for MLM Businesses'
    )
    assert.equal(
      seoFor('who_we_serve.distributors', 'id').title,
      'Pengalaman Distributor untuk Bisnis MLM'
    )
  })

  test('role pages share WhatsApp settings with a message for each role', async ({
    client,
    assert,
  }) => {
    const response = await client.get('/id/who-we-serve/it-teams').withInertia()
    const whatsapp = response.inertiaProps.marketing.whatsapp

    assert.isFalse(whatsapp.enabled)
    assert.isNull(whatsapp.number)
    assert.properties(
      whatsapp.messages,
      personas.map((persona) => persona.key)
    )
    assert.match(whatsapp.messages.it, /^Halo mlmsoft/)
  })

  test('a demo request from a role page is attributed to it', async ({ client, assert }) => {
    await client
      .post('/demo-requests')
      .json({
        fullName: 'Ayu Pratiwi',
        email: 'ayu@example.com',
        company: 'Nusantara Wellness',
        source: 'role_page',
        locale: 'id',
      })
      .withCsrfToken()
      .redirects(0)

    const lead = await DemoRequest.findByOrFail('email', 'ayu@example.com')
    assert.equal(lead.source, 'role_page')
    assert.equal(lead.locale, 'id')
  })
})
