import User from '#models/user'
import accountsConfig from '#config/accounts'
import { loginValidator } from '#validators/user'
import limiter from '@adonisjs/limiter/services/main'
import { errors as limiterErrors } from '@adonisjs/limiter'
import { errors as authErrors } from '@adonisjs/auth'
import type { HttpContext } from '@adonisjs/core/http'

/** Wrong email and wrong password read the same: no account enumeration. */
const INVALID = 'Invalid email or password.'

export default class SessionController {
  async create({ inertia }: HttpContext) {
    // whoever was signed in before, their encrypted page history is unreadable now
    inertia.clearHistory()
    return inertia.render('auth/login', { signupEnabled: accountsConfig.publicSignup })
  }

  /**
   * Sign-in. Failed attempts count per email and client address; after a
   * few, that pair is paused for a while (the route also has a per-address
   * ceiling). The session id is regenerated on login by the session guard.
   */
  async store({ request, auth, response, session }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    const { failures, window, blockFor } = accountsConfig.login
    const attempts = limiter.use({ requests: failures, duration: window, blockDuration: blockFor })
    const key = `login_failures:${request.ip()}:${email.trim().toLowerCase()}`

    const fail = (message: string) => {
      session.flashExcept(['password'])
      session.flashErrors({ password: message })
      return response.redirect().back()
    }

    let result: Awaited<ReturnType<typeof attempts.penalize<User>>>
    try {
      // a failure counts against the key and is rethrown; a success clears it
      result = await attempts.penalize(key, () => User.verifyCredentials(email, password))
    } catch (failure) {
      if (failure instanceof authErrors.E_INVALID_CREDENTIALS) return fail(INVALID)
      throw failure
    }
    const [blocked, user] = result
    if (blocked instanceof limiterErrors.E_TOO_MANY_REQUESTS || !user) {
      const minutes = blocked ? Math.max(1, Math.ceil(blocked.response.availableIn / 60)) : 1
      return fail(`Too many sign-in attempts. Try again in ${minutes} minutes.`)
    }

    await auth.use('web').login(user)
    response.redirect().toRoute('dashboard')
  }

  async destroy({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    response.redirect().toRoute('session.create')
  }
}
