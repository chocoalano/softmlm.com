import app from '@adonisjs/core/services/app'
import env from '#start/env'

/**
 * Back-office accounts (docs/security-audit.md, SEC-ADM-002).
 *
 * The starter kit's public sign-up is a development convenience only:
 * mlmsoft is not self-service, and staff accounts are created with
 * `node ace users:create`. Sign-up is off in production unless
 * PUBLIC_SIGNUP_ENABLED says otherwise.
 */
const accountsConfig = {
  publicSignup: env.get('PUBLIC_SIGNUP_ENABLED', !app.inProduction),

  /** Failed sign-in attempts per email and client address before a pause. */
  login: {
    failures: 5,
    window: '1 minute',
    blockFor: '15 minutes',
  },
} as const

export default accountsConfig
