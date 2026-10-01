import User from '#models/user'
import accountsConfig from '#config/accounts'
import { signupValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

/**
 * The starter kit's self sign-up, for development only. In production it
 * does not exist (404) unless PUBLIC_SIGNUP_ENABLED is true; staff accounts
 * are created with `node ace users:create`.
 */
export default class NewAccountController {
  async create({ inertia, response }: HttpContext) {
    if (!accountsConfig.publicSignup) return response.notFound()
    return inertia.render('auth/signup', {})
  }

  async store({ request, response, auth }: HttpContext) {
    if (!accountsConfig.publicSignup) return response.notFound()
    const { fullName, email, password } = await request.validateUsing(signupValidator)
    const user = await User.create({ fullName, email, password })

    await auth.use('web').login(user)
    response.redirect().toRoute('dashboard')
  }
}
