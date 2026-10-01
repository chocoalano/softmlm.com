import db from '@adonisjs/lucid/services/db'

type ConnectionTarget = { filename?: string; database?: string }

/**
 * A SQLite file whose name contains "test", or a MySQL/PostgreSQL database
 * whose name ends in "_test".
 */
export function isTestDatabase(connection: ConnectionTarget) {
  if (connection.filename) return /test[^/\\]*\.sqlite3?$/i.test(connection.filename)
  return /_test$/i.test(connection.database ?? '')
}

/**
 * Refuses to run the test suite against anything that isn't clearly a test
 * database. Tests truncate and roll back tables, so pointing them at a
 * development, staging or production database must fail loudly instead.
 */
export function assertTestDatabase() {
  const name = db.primaryConnectionName
  const config = db.getRawConnection(name)?.config
  const connection = (config?.connection ?? {}) as ConnectionTarget

  if (!isTestDatabase(connection)) {
    const target = connection.filename ?? connection.database ?? 'an unknown database'
    throw new Error(
      `Refusing to run tests: connection "${name}" points to "${target}", which is not a test ` +
        'database. Use a SQLite file named *test*.sqlite3 or a database ending in "_test".'
    )
  }
}
