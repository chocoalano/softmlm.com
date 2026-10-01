import { args, BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { roles, type UserRole } from '#config/roles'

/**
 * Promote or demote a back-office user, e.g.
 * `node ace users:role sales@mlmsoft.com sales`
 */
export default class SetUserRole extends BaseCommand {
  static commandName = 'users:role'
  static description = `Set a user's back-office role (${roles.join(', ')})`
  static options: CommandOptions = { startApp: true }

  @args.string({ description: 'Email address of the user' })
  declare email: string

  @args.string({ description: `One of: ${roles.join(', ')}` })
  declare role: string

  async run() {
    if (!roles.includes(this.role as UserRole)) {
      this.logger.error(`Unknown role "${this.role}". Use one of: ${roles.join(', ')}`)
      this.exitCode = 1
      return
    }

    const { default: User } = await import('#models/user')
    const user = await User.findBy('email', this.email.trim().toLowerCase())
    if (!user) {
      this.logger.error(`No user found with email ${this.email}`)
      this.exitCode = 1
      return
    }

    user.role = this.role as UserRole
    await user.save()
    this.logger.success(`${user.email} is now "${user.role}"`)
  }
}
