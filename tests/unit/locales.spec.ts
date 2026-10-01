import { test } from '@japa/runner'
import {
  DEFAULT_LOCALE,
  LOCALES,
  isLocale,
  isThemePreference,
  localizePath,
  splitLocale,
} from '#shared/locales'

test.group('Marketing locales', () => {
  test('English is the default and both locales are known', ({ assert }) => {
    assert.equal(DEFAULT_LOCALE, 'en')
    assert.deepEqual([...LOCALES], ['en', 'id'])
    assert.isTrue(isLocale('id'))
    assert.isFalse(isLocale('fr'))
    assert.isFalse(isLocale(undefined))
  })

  test('localizes site paths and keeps anchors and query strings', ({ assert }) => {
    assert.equal(localizePath('/', 'id'), '/id')
    assert.equal(localizePath('/pricing', 'id'), '/id/pricing')
    assert.equal(localizePath('/pricing#estimate', 'en'), '/en/pricing#estimate')
    assert.equal(localizePath('/#network', 'id'), '/id#network')
    assert.equal(
      localizePath('/who-we-serve/finance?utm_source=x', 'id'),
      '/id/who-we-serve/finance?utm_source=x'
    )
  })

  test('switching language maps a page to the same page in the other language', ({ assert }) => {
    assert.equal(localizePath('/en/who-we-serve/finance', 'id'), '/id/who-we-serve/finance')
    assert.equal(localizePath('/id/compensation-plans', 'en'), '/en/compensation-plans')
    assert.equal(localizePath('/en', 'id'), '/id')
    assert.equal(localizePath('/id?utm_source=x', 'en'), '/en?utm_source=x')
  })

  test('leaves same-page anchors and absolute URLs alone', ({ assert }) => {
    assert.equal(localizePath('#demo', 'id'), '#demo')
    assert.equal(localizePath('https://wa.me/62812', 'id'), 'https://wa.me/62812')
    assert.equal(localizePath('//cdn.example.com/x', 'id'), '//cdn.example.com/x')
  })

  test('splits the locale off a path', ({ assert }) => {
    assert.deepEqual(splitLocale('/id/pricing'), { locale: 'id', path: '/pricing' })
    assert.deepEqual(splitLocale('/en'), { locale: 'en', path: '/' })
    assert.deepEqual(splitLocale('/pricing'), { locale: null, path: '/pricing' })
    assert.deepEqual(splitLocale('/fr/pricing'), { locale: null, path: '/fr/pricing' })
    assert.deepEqual(splitLocale('/identity'), { locale: null, path: '/identity' })
  })

  test('theme preferences are light, dark or system', ({ assert }) => {
    for (const value of ['light', 'dark', 'system']) assert.isTrue(isThemePreference(value))
    for (const value of ['sepia', '', undefined, 'DARK']) assert.isFalse(isThemePreference(value))
  })
})
