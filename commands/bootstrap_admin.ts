import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import env from '#start/env'
import CreateUser from './create_user.js'

/**
 * Creates the first admin account on hosts without a shell (Hostinger
 * shared hosting), from environment variables set in the hosting panel:
 *
 *   BOOTSTRAP_ADMIN_EMAIL, BOOTSTRAP_ADMIN_PASSWORD (12 to 128 characters),
 *   BOOTSTRAP_ADMIN_NAME (optional)
 *
 * `npm run build:hostinger` runs it after the migrations, before the new
 * version receives traffic. It does nothing unless both variables are set,
 * does nothing once an admin exists, and never changes an existing
 * account, so it stays in the build safely. The password is never printed;
 * remove it from the panel once the account exists.
 */
export default class BootstrapAdmin extends BaseCommand {
  static commandName = 'users:bootstrap'
  static description = 'Create the first admin account from BOOTSTRAP_ADMIN_* environment variables'
  static options: CommandOptions = { startApp: true }

  async run() {
    const email = env.get('BOOTSTRAP_ADMIN_EMAIL')?.trim().toLowerCase()
    const password = env.get('BOOTSTRAP_ADMIN_PASSWORD')?.release()
    if (!email || !password) {
      this.logger.info('users:bootstrap: BOOTSTRAP_ADMIN_EMAIL/PASSWORD not set, nothing to do')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
      return this.#fail('BOOTSTRAP_ADMIN_EMAIL is not a valid email address')
    }
    if (password.length < CreateUser.MIN_PASSWORD || password.length > 128) {
      return this.#fail(
        `BOOTSTRAP_ADMIN_PASSWORD must be ${CreateUser.MIN_PASSWORD} to 128 characters long`
      )
    }

    const { default: User } = await import('#models/user')
    if (await User.query().where('role', 'admin').first()) {
      this.logger.info('users:bootstrap: an admin account already exists, nothing to do')
      return
    }
    if (await User.findBy('email', email)) {
      return this.#fail(`${email} already exists without the admin role; it was left unchanged`)
    }

    await User.create({
      email,
      password,
      fullName: env.get('BOOTSTRAP_ADMIN_NAME')?.trim() || null,
      role: 'admin',
    })
    this.logger.success(
      `users:bootstrap: created the admin account ${email}. Remove BOOTSTRAP_ADMIN_PASSWORD from the environment now.`
    )
  }

  #fail(message: string) {
    this.logger.error(`users:bootstrap: ${message}`)
    this.exitCode = 1
  }
}
