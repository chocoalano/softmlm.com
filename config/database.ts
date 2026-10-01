import { mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import app from '@adonisjs/core/services/app'
import { defineConfig } from '@adonisjs/lucid'
import env from '#start/env'

/**
 * Knex writes a failed query's bound values into the error message by
 * default, so a failed lead insert would put names, emails and phone
 * numbers into the error log. Off: the message keeps the `?` placeholders.
 * (A Knex option Lucid passes through but does not type.)
 */
const errorsWithoutValues = { compileSqlOnError: false } as {}

const connection = env.get('DB_CONNECTION', 'sqlite')

/**
 * Tests get their own file so running the suite never touches local
 * development data. A fresh build has no tmp directory: create it, or the
 * first query fails.
 */
const sqliteFile = app.tmpPath(app.inTest ? 'test.sqlite3' : 'db.sqlite3')
if (connection === 'sqlite') mkdirSync(dirname(sqliteFile), { recursive: true })

const migrations = {
  /**
   * Sort migration files naturally by filename.
   */
  naturalSort: true,

  /**
   * Paths containing migration files.
   */
  paths: ['database/migrations'],
}

const dbConfig = defineConfig({
  /**
   * Default connection used for all queries: DB_CONNECTION, SQLite when
   * unset. Production and staging use MySQL (docs/production-blockers.md
   * #4): a SQLite file inside the deployed build is replaced by the next
   * deployment.
   */
  connection,

  connections: {
    /**
     * SQLite connection (default).
     */
    sqlite: {
      client: 'better-sqlite3',

      connection: {
        filename: sqliteFile,
      },

      /**
       * Required by Knex for SQLite defaults.
       */
      useNullAsDefault: true,

      ...errorsWithoutValues,

      migrations,

      schemaGeneration: {
        enabled: true,
        rulesPaths: ['./database/schema_rules.js'],
      },
    },

    /**
     * MySQL 8 (production and staging). Credentials come from the
     * environment only. Timestamps are written in the process time zone:
     * run with TZ=UTC so the database stays in UTC (.env.example).
     */
    mysql: {
      client: 'mysql2',
      ...errorsWithoutValues,
      connection: {
        host: env.get('DB_HOST', '127.0.0.1'),
        port: env.get('DB_PORT', 3306),
        user: env.get('DB_USER'),
        password: env.get('DB_PASSWORD')?.release(),
        database: env.get('DB_DATABASE'),
        charset: 'utf8mb4',
      },
      migrations,
    },

    /**
     * PostgreSQL connection.
     * Install package to switch: npm install pg
     */
    // pg: {
    //   client: 'pg',
    //   connection: {
    //     host: env.get('DB_HOST'),
    //     port: env.get('DB_PORT'),
    //     user: env.get('DB_USER'),
    //     password: env.get('DB_PASSWORD'),
    //     database: env.get('DB_DATABASE'),
    //   },
    //   migrations: {
    //     naturalSort: true,
    //     paths: ['database/migrations'],
    //   },
    //   debug: app.inDev,
    // },

    /**
     * Microsoft SQL Server connection.
     * Install package to switch: npm install tedious
     */
    // mssql: {
    //   client: 'mssql',
    //   connection: {
    //     server: env.get('DB_HOST'),
    //     port: env.get('DB_PORT'),
    //     user: env.get('DB_USER'),
    //     password: env.get('DB_PASSWORD'),
    //     database: env.get('DB_DATABASE'),
    //   },
    //   migrations: {
    //     naturalSort: true,
    //     paths: ['database/migrations'],
    //   },
    //   debug: app.inDev,
    // },

    /**
     * libSQL (Turso) connection.
     * Install package to switch: npm install @libsql/client
     */
    // libsql: {
    //   client: 'libsql',
    //   connection: {
    //     url: env.get('LIBSQL_URL'),
    //     authToken: env.get('LIBSQL_AUTH_TOKEN'),
    //   },
    //   useNullAsDefault: true,
    //   migrations: {
    //     naturalSort: true,
    //     paths: ['database/migrations'],
    //   },
    //   debug: app.inDev,
    // },
  },
})

export default dbConfig
