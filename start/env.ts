/*
|--------------------------------------------------------------------------
| Environment variables service
|--------------------------------------------------------------------------
|
| The `Env.create` method creates an instance of the Env service. The
| service validates the environment variables and also cast values
| to JavaScript data types.
|
*/

import { Env } from '@adonisjs/core/env'

export default await Env.create(new URL('../', import.meta.url), {
  // Node
  NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),
  /**
   * Optional: without them the server listens on 0.0.0.0:3333. Hosting
   * panels that start the app themselves (Hostinger) provide PORT.
   */
  PORT: Env.schema.number.optional(),
  HOST: Env.schema.string.optional({ format: 'host' }),
  LOG_LEVEL: Env.schema.string(),

  // App
  APP_KEY: Env.schema.secret(),
  APP_URL: Env.schema.string({ format: 'url', tld: false }),

  /*
  |----------------------------------------------------------
  | Database (config/database.ts). SQLite for development and
  | tests; production uses MySQL (DB_CONNECTION=mysql).
  |----------------------------------------------------------
  */
  DB_CONNECTION: Env.schema.enum.optional(['sqlite', 'mysql'] as const),
  DB_HOST: Env.schema.string.optional({ format: 'host' }),
  DB_PORT: Env.schema.number.optional(),
  DB_USER: Env.schema.string.optional(),
  DB_PASSWORD: Env.schema.secret.optional(),
  DB_DATABASE: Env.schema.string.optional(),

  // Session
  SESSION_DRIVER: Env.schema.enum(['cookie', 'memory', 'database'] as const),

  /*
  |----------------------------------------------------------
  | Variables for configuring the limiter package
  |----------------------------------------------------------
  */
  LIMITER_STORE: Env.schema.enum(['database', 'memory'] as const),

  /*
  |----------------------------------------------------------
  | Variables for configuring the mail package
  |----------------------------------------------------------
  */
  MAIL_MAILER: Env.schema.enum(['smtp'] as const),
  MAIL_FROM_NAME: Env.schema.string(),
  MAIL_FROM_ADDRESS: Env.schema.string({ format: 'email' }),
  SMTP_HOST: Env.schema.string(),
  SMTP_PORT: Env.schema.number(),
  SMTP_SECURE: Env.schema.boolean.optional(),
  SMTP_USERNAME: Env.schema.string.optional(),
  SMTP_PASSWORD: Env.schema.secret.optional(),

  /**
   * Comma-separated inboxes that receive new "Book a Demo" leads. When
   * empty, leads are still stored and the notification is skipped (and
   * logged).
   */
  SALES_NOTIFICATION_EMAILS: Env.schema.string.optional(),

  /*
  |----------------------------------------------------------
  | Marketing
  |----------------------------------------------------------
  */
  /**
   * Sales WhatsApp number in international format (e.g. 6281234567890).
   * When missing or invalid, WhatsApp buttons fall back to the demo form.
   */
  WHATSAPP_MARKETING_NUMBER: Env.schema.string.optional(),
  WHATSAPP_MARKETING_ENABLED: Env.schema.boolean.optional(),

  /*
  |----------------------------------------------------------
  | First-party marketing tracking (docs/marketing-attribution.md)
  |----------------------------------------------------------
  */
  MARKETING_TRACKING_ENABLED: Env.schema.boolean.optional(),
  /** Days anonymous tracking data is kept (leads keep their own snapshot). */
  MARKETING_ANONYMOUS_RETENTION_DAYS: Env.schema.number.optional(),
  /** Days a WhatsApp reference ("Ref: M7K4P2") resolves in the back office. */
  MARKETING_REFERENCE_EXPIRY_DAYS: Env.schema.number.optional(),

  /*
  |----------------------------------------------------------
  | Back-office accounts: the starter kit's public sign-up. Off in
  | production unless set to true (config/accounts.ts).
  |----------------------------------------------------------
  */
  PUBLIC_SIGNUP_ENABLED: Env.schema.boolean.optional(),

  /*
  |----------------------------------------------------------
  | Business timezone: how the back office shows dates and where
  | "today" starts. Timestamps stay UTC in the database.
  |----------------------------------------------------------
  */
  BUSINESS_TIMEZONE: Env.schema.string.optional(),

  /*
  |----------------------------------------------------------
  | Search engines (config/seo.ts). Unset in production; set to
  | false on staging so nothing there is indexed.
  |----------------------------------------------------------
  */
  SEARCH_INDEXING_ENABLED: Env.schema.boolean.optional(),
})
