import { args, BaseCommand, flags } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { roles, type UserRole } from '#config/roles'

/**
 * Creates a back-office account, the controlled alternative to public
 * sign-up (off in production, config/accounts.ts):
 *
 *   node ace users:create sales@mlmsoft.com sales --name="Rina Sales"
 *
 * The password is asked for twice, hidden, never taken as a flag (it would
 * end up in the shell history).
 */
export default class CreateUser extends BaseCommand {
  static commandName = 'users:create'
  static description = `Create a back-office account (${roles.join(', ')})`
  static options: CommandOptions = { startApp: true }

  /** Longer than public sign-up's minimum: these accounts see leads. */
  static readonly MIN_PASSWORD = 12

  @args.string({ description: 'Email address of the new user' })
  declare email: string

  @args.string({ description: `One of: ${roles.join(', ')}` })
  declare role: string

  @flags.string({ description: 'Full name' })
  declare name?: string

  async run() {
    const email = this.email.trim().toLowerCase()
    if (!roles.includes(this.role as UserRole)) {
      this.logger.error(`Unknown role "${this.role}". Use one of: ${roles.join(', ')}`)
      this.exitCode = 1
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
      this.logger.error('Enter a valid email address')
      this.exitCode = 1
      return
    }

    const { default: User } = await import('#models/user')
    if (await User.findBy('email', email)) {
      this.logger.error(`A user with email ${email} already exists`)
      this.exitCode = 1
      return
    }

    const password = await this.prompt.secure('Password', {
      validate: (value) =>
        value.length >= CreateUser.MIN_PASSWORD && value.length <= 128
          ? true
          : `Use ${CreateUser.MIN_PASSWORD} to 128 characters`,
    })
    const confirmation = await this.prompt.secure('Repeat the password')
    if (confirmation !== password) {
      this.logger.error('The passwords do not match')
      this.exitCode = 1
      return
    }

    const user = await User.create({
      email,
      password,
      fullName: this.name?.trim() || null,
      role: this.role as UserRole,
    })
    this.logger.success(`Created ${user.email} as "${user.role}"`)
  }
}
