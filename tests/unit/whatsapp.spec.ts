import { test } from '@japa/runner'
import { resolveWhatsappConfig, whatsappMessages, type WhatsappContext } from '#config/marketing'
import { whatsappUrl } from '#shared/whatsapp'
import { LOCALES } from '#shared/locales'

const enabled = resolveWhatsappConfig('+62 812-3456-7890', undefined)
const contexts = Object.keys(whatsappMessages.en) as WhatsappContext[]

test.group('WhatsApp marketing link', () => {
  test('normalises the configured number and builds a valid wa.me URL', ({ assert }) => {
    assert.isTrue(enabled.enabled)
    assert.equal(enabled.number, '6281234567890')

    const url = new URL(whatsappUrl(enabled, 'general')!)
    assert.equal(url.origin, 'https://wa.me')
    assert.equal(url.pathname, '/6281234567890')
    assert.equal(url.searchParams.get('text'), whatsappMessages.en.general)
  })

  test('uses the message of the page context, in the page language', ({ assert }) => {
    const text = (locale: 'en' | 'id', context: WhatsappContext) =>
      new URL(
        whatsappUrl(resolveWhatsappConfig('+62 812-3456-7890', undefined, locale), context)!
      ).searchParams.get('text')

    assert.equal(
      text('en', 'general'),
      "Hi mlmsoft, I'd like to discuss an MLM system for my business."
    )
    assert.equal(
      text('id', 'general'),
      'Halo mlmsoft, saya ingin konsultasi mengenai sistem MLM untuk bisnis saya.'
    )
    assert.equal(
      text('id', 'compensation'),
      'Halo mlmsoft, saya ingin konsultasi mengenai compensation plan untuk bisnis saya.'
    )
    assert.include(text('en', 'pricing_result')!, 'needs estimate')
    assert.include(text('id', 'pricing_result')!, 'baru menyelesaikan estimasi kebutuhan')
  })

  test('every context has a message in every language, each one different', ({ assert }) => {
    for (const locale of LOCALES) {
      assert.sameMembers(Object.keys(whatsappMessages[locale]), contexts, locale)
      const messages = Object.values(whatsappMessages[locale])
      assert.lengthOf(new Set(messages), messages.length, locale)
    }
    assert.match(whatsappMessages.en.finance, /^Hi mlmsoft, /)
    assert.match(whatsappMessages.id.finance, /^Halo mlmsoft, /)
  })

  test('never carries personal data in the URL', ({ assert }) => {
    for (const locale of LOCALES) {
      const config = resolveWhatsappConfig('+62 812-3456-7890', undefined, locale)
      for (const context of contexts) {
        const url = whatsappUrl(config, context)!
        const text = new URL(url).searchParams.get('text')!
        assert.notMatch(text, /@|\+?\d{8,}/, `${locale}.${context} must not contain contact data`)
        assert.deepEqual([...new URL(url).searchParams.keys()], ['text'])
      }
    }
  })

  test('falls back safely when WhatsApp is disabled or misconfigured', ({ assert }) => {
    for (const config of [
      resolveWhatsappConfig(undefined, undefined),
      resolveWhatsappConfig('', true),
      resolveWhatsappConfig('0812345678', true),
      resolveWhatsappConfig('call-me-maybe', true),
      resolveWhatsappConfig('+62 812-3456-7890', false),
    ]) {
      assert.isFalse(config.enabled)
      assert.isNull(config.number)
      assert.isNull(whatsappUrl(config, 'general'))
    }
    assert.isNull(whatsappUrl(undefined, 'general'))
  })
})
