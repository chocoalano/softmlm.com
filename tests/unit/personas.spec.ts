import { test } from '@japa/runner'
import { resolveWhatsappConfig, whatsappMessages } from '#config/marketing'
import { marketingPages } from '#config/seo'
import { sanitize } from '#shared/analytics'
import { whatsappUrl } from '#shared/whatsapp'
import {
  WHO_WE_SERVE_PATH,
  findPersona,
  personaPath,
  personaTrackingPage,
  personas,
} from '#shared/personas'

test.group('Who We Serve personas', () => {
  test('each persona has its own path, SEO entry and WhatsApp message', ({ assert }) => {
    const paths = personas.map((persona) => personaPath(persona))
    assert.lengthOf(new Set(paths), personas.length)

    for (const persona of personas) {
      assert.match(personaPath(persona), new RegExp(`^${WHO_WE_SERVE_PATH}/[a-z-]+$`))
      assert.equal(marketingPages[`who_we_serve.${persona.key}`].path, personaPath(persona))
      assert.match(whatsappMessages.en[persona.key], /^Hi mlmsoft, I'd like to /)
      assert.match(whatsappMessages.id[persona.key], /^Halo mlmsoft, saya ingin /)
      assert.strictEqual(findPersona(persona.key), persona)
    }
  })

  test('WhatsApp messages carry the topic only, never personal data', ({ assert }) => {
    for (const messages of Object.values(whatsappMessages)) {
      for (const [context, message] of Object.entries(messages)) {
        assert.notMatch(message, /\d|@|\{|\}|https?:/, context)
        assert.isBelow(message.length, 160, context)
      }
    }
  })

  test('a persona page opens WhatsApp with its own message', ({ assert }) => {
    for (const locale of ['en', 'id'] as const) {
      const settings = resolveWhatsappConfig('+62 812-0000-0000', true, locale)
      for (const persona of personas) {
        const url = whatsappUrl(settings, persona.key)!
        assert.equal(
          decodeURIComponent(new URL(url).searchParams.get('text')!),
          whatsappMessages[locale][persona.key]
        )
        assert.isTrue(url.startsWith('https://wa.me/6281200000000?text='))
      }
    }
  })

  test('without a configured number every persona CTA falls back to the demo form', ({
    assert,
  }) => {
    for (const settings of [
      resolveWhatsappConfig(undefined, undefined),
      resolveWhatsappConfig('+62 812-0000-0000', false),
    ]) {
      for (const persona of personas) {
        assert.isNull(whatsappUrl(settings, persona.key))
      }
    }
  })

  test('tracking page names reach analytics unchanged', ({ assert }) => {
    for (const page of ['who_we_serve', ...personas.map((p) => personaTrackingPage(p.key))]) {
      const props = { page, section: 'hero', variant: 'primary', locale: 'id', theme: 'light' }
      assert.deepEqual(sanitize(props), props)
    }
  })
})
