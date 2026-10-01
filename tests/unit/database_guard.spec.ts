import { test } from '@japa/runner'
import { assertTestDatabase, isTestDatabase } from '#tests/support/database_guard'

test.group('Test database guard', () => {
  test('accepts only databases that are clearly for tests', ({ assert }) => {
    assert.isTrue(isTestDatabase({ filename: '/app/tmp/test.sqlite3' }))
    assert.isTrue(isTestDatabase({ database: 'mlmsoft_test' }))

    assert.isFalse(isTestDatabase({ filename: '/app/tmp/db.sqlite3' }))
    assert.isFalse(isTestDatabase({ filename: '/tests/data/db.sqlite3' }))
    assert.isFalse(isTestDatabase({ database: 'mlmsoft' }))
    assert.isFalse(isTestDatabase({ database: 'mlmsoft_staging' }))
    assert.isFalse(isTestDatabase({ database: 'test_mlmsoft_production' }))
    assert.isFalse(isTestDatabase({}))
  })

  test('passes for the configured test connection', ({ assert }) => {
    assert.doesNotThrow(() => assertTestDatabase())
  })
})
