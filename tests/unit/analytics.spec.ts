import { test } from '@japa/runner'
import { onTrack, sanitize, sanitizeEvent, track } from '#shared/analytics'

const click = {
  page: 'pricing',
  section: 'result',
  variant: 'primary',
  locale: 'id',
  theme: 'dark',
}

test.group('Analytics hook', () => {
  test('passes the WhatsApp click source, locale and theme to every handler', ({
    assert,
    cleanup,
  }) => {
    const received: unknown[] = []
    const off = onTrack((event, props) => received.push({ event, props }))
    cleanup(() => {
      off()
    })

    track('whatsapp_marketing_click', click)

    assert.deepEqual(received, [{ event: 'whatsapp_marketing_click', props: click }])
  })

  test('only forwards short, non-personal values', ({ assert }) => {
    const clean = sanitize({
      page: 'homepage',
      section: 'ayu@example.com',
      variant: 'Primary',
      locale: 'fr',
      theme: 'sepia',
      phone: '+6281234567890',
    })

    assert.deepEqual(clean, {
      page: 'homepage',
      section: 'unknown',
      variant: 'primary',
      locale: 'unknown',
      theme: 'unknown',
    })
    assert.notProperty(clean, 'phone')
  })

  test('a failing handler never breaks the click', ({ assert, cleanup }) => {
    const off = onTrack(() => {
      throw new Error('provider down')
    })
    cleanup(() => {
      off()
    })

    assert.doesNotThrow(() => track('whatsapp_marketing_click', click))
  })
})

test.group('Analytics hook | journey events', () => {
  const personal = {
    name: 'Ayu Lestari',
    email: 'ayu@example.com',
    phone: '+6281234567890',
    address: 'Jl. Merdeka 1',
    nik: '3201010101010001',
    password: 'secret',
    token: 'abc123',
  }

  test('keeps only the fields each event is allowed to carry', ({ assert }) => {
    const events = [
      ['feature_interest', { feature: 'wallet_payout', locale: 'en', page: 'features' }],
      ['demo_form_started', { locale: 'id', page: 'homepage' }],
      ['consultation_form_started', { locale: 'en', page: 'services', interest: 'seo' }],
      ['pricing_started', { locale: 'en', page: 'pricing', mode: 'quick' }],
      ['pricing_completed', { locale: 'id', page: 'pricing', mode: 'full' }],
      ['language_changed', { from: 'en', to: 'id' }],
    ] as const

    for (const [event, props] of events) {
      const clean = sanitizeEvent(event, { ...props, ...personal })
      assert.deepEqual(clean, props, event)
      for (const key of Object.keys(personal)) assert.notProperty(clean, key, `${event}.${key}`)
    }
  })

  test('replaces free text and unknown values with "unknown"', ({ assert }) => {
    assert.deepEqual(
      sanitizeEvent('feature_interest', {
        feature: 'payroll',
        locale: 'fr',
        page: 'ayu@example.com',
      }),
      { feature: 'unknown', locale: 'unknown', page: 'unknown' }
    )
    assert.deepEqual(sanitizeEvent('language_changed', { from: 'en', to: 'Bahasa Indonesia' }), {
      from: 'en',
      to: 'unknown',
    })
  })

  test('track() forwards the sanitized props, never the raw ones', ({ assert, cleanup }) => {
    const received: unknown[] = []
    const off = onTrack((event, props) => received.push({ event, props }))
    cleanup(() => {
      off()
    })

    track('pricing_started', {
      locale: 'en',
      page: 'pricing',
      mode: 'quick',
      ...personal,
    } as never)

    assert.deepEqual(received, [
      { event: 'pricing_started', props: { locale: 'en', page: 'pricing', mode: 'quick' } },
    ])
  })
})
