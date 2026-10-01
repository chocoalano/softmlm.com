import { args, BaseCommand, flags } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

/**
 * Re-sends the emails for a lead, e.g. after the SMTP provider was down:
 * `node ace leads:notify 42` or `node ace leads:notify 42 --internal-only`
 */
export default class NotifyLead extends BaseCommand {
  static commandName = 'leads:notify'
  static description = 'Send (again) the notification emails for a demo request'
  static options: CommandOptions = { startApp: true }

  @args.string({ description: 'ID of the demo request' })
  declare id: string

  @flags.boolean({ description: 'Only notify the sales inbox, not the lead' })
  declare internalOnly: boolean

  async run() {
    /**
     * Routes are only committed when the HTTP server boots; the sales email
     * needs them to build the link to the lead.
     */
    const router = await this.app.container.make('router')
    router.commit()

    const { default: DemoRequest } = await import('#models/demo_request')
    const { default: LeadNotifier } = await import('#services/lead_notifier')

    const lead = await DemoRequest.find(Number(this.id))
    if (!lead) {
      this.logger.error(`No demo request with id ${this.id}`)
      this.exitCode = 1
      return
    }

    await LeadNotifier.deliver(
      lead,
      this.internalOnly ? ['internal'] : ['internal', 'confirmation']
    )
    this.logger.success(
      `Notifications processed for lead #${lead.id}; see its history for the outcome`
    )
  }
}
