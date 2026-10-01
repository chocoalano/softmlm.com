import { UserSchema } from '#database/schema'
import { column } from '@adonisjs/lucid/orm'
import { marketingViewerRoles, type UserRole } from '#config/roles'
import leadsConfig from '#config/leads'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'

export default class User extends compose(UserSchema, withAuthFinder(hash)) {
  @column()
  declare role: UserRole

  /**
   * Back-office staff who can view and work "Book a Demo" leads.
   */
  get canManageLeads() {
    return (leadsConfig.managerRoles as readonly string[]).includes(this.role)
  }

  /**
   * Staff who can see marketing analytics: visitors, sources, campaigns and
   * journeys. Contact details stay behind canManageLeads.
   */
  get canViewMarketing() {
    return (marketingViewerRoles as readonly string[]).includes(this.role)
  }

  get initials() {
    const [first, last] = this.fullName ? this.fullName.split(' ') : this.email.split('@')
    if (first && last) {
      return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase()
    }

    return `${first.slice(0, 2)}`.toUpperCase()
  }
}
