import app from '@adonisjs/core/services/app'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import type { Authenticators } from '@adonisjs/auth/types'

/**
 * Signed-in pages carry back-office data (leads, contact details), so the
 * browser keeps none of it once the user has left:
 * - `Cache-Control: no-store`: never stored in the browser or a proxy cache;
 * - in production, Inertia encrypts the page data it keeps in the browser
 *   history, and the login page clears the key (SessionController.create),
 *   so Back after signing out shows nothing. Encryption needs HTTPS, which
 *   production requires anyway (secure session cookie).
 */
export default class AuthMiddleware {
  redirectTo = '/login'

  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: { guards?: (keyof Authenticators)[] } = {}
  ) {
    await ctx.auth.authenticateUsing(options.guards, { loginRoute: this.redirectTo })
    ctx.response.header('Cache-Control', 'no-store')
    if (app.inProduction) ctx.inertia.encryptHistory()
    return next()
  }
}
