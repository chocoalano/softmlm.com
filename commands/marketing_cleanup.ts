import { BaseCommand, flags } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { DateTime } from 'luxon'

/**
 * Removes anonymous marketing tracking data older than the retention period
 * (MARKETING_ANONYMOUS_RETENTION_DAYS, docs/marketing-attribution.md). A dry
 * run by default: it only reports what it would delete. Pass `--apply` to
 * delete.
 *
 * Never touches a visitor linked to a lead, nor that visitor's sessions and
 * events: a lead's journey follows the lead's own retention. WhatsApp
 * intents that sales confirmed or linked to a lead are kept. Leads, and
 * the attribution snapshot saved on each lead, are never deleted here.
 *
 *   node ace marketing:cleanup               (dry run, configured retention)
 *   node ace marketing:cleanup --days=365 --apply
 */
export default class MarketingCleanup extends BaseCommand {
  static commandName = 'marketing:cleanup'
  static description = 'Delete anonymous marketing tracking data older than the retention period'
  static options: CommandOptions = { startApp: true }

  /** Nothing younger than this can be removed, whatever --days says. */
  static readonly MINIMUM_DAYS = 30

  @flags.number({
    description: 'Keep data from the last N days (default: MARKETING_ANONYMOUS_RETENTION_DAYS)',
  })
  declare days?: number

  @flags.boolean({ description: 'Delete for real (without it, only report)', default: false })
  declare apply: boolean

  async run() {
    const { default: db } = await import('@adonisjs/lucid/services/db')
    const { default: trackingConfig } = await import('#config/marketing_tracking')

    const days = this.days ?? trackingConfig.retentionDays
    if (!Number.isInteger(days) || days < MarketingCleanup.MINIMUM_DAYS) {
      this.logger.error(`Refusing to keep fewer than ${MarketingCleanup.MINIMUM_DAYS} days`)
      this.exitCode = 1
      return
    }

    const cutoff = DateTime.now().minus({ days }).toFormat('yyyy-MM-dd HH:mm:ss')
    const linked = () =>
      db.from('demo_requests').whereNotNull('marketing_visitor_id').select('marketing_visitor_id')

    const events = () =>
      db
        .from('marketing_events')
        .where('occurred_at', '<', cutoff)
        .whereNotIn('visitor_id', linked())
    const sessions = () =>
      db
        .from('marketing_sessions')
        .where('last_activity_at', '<', cutoff)
        .whereNotIn('visitor_id', linked())
    const visitors = () =>
      db.from('marketing_visitors').where('last_seen_at', '<', cutoff).whereNotIn('id', linked())
    const intents = () =>
      db
        .from('marketing_whatsapp_intents')
        .where('clicked_at', '<', cutoff)
        .whereNull('contacted_at')
        .whereNull('demo_request_id')

    const counted = async (query: ReturnType<typeof events>) => {
      const [row] = await query.count('* as total')
      return Number(row.total)
    }
    const totals = {
      intents: await counted(intents()),
      events: await counted(events()),
      sessions: await counted(sessions()),
      visitors: await counted(visitors()),
    }

    const summary = `${totals.intents} WhatsApp intents, ${totals.events} events, ${totals.sessions} visits and ${totals.visitors} visitors older than ${days} days (not linked to a lead)`
    if (!this.apply) {
      this.logger.info(`Dry run: would delete ${summary}. Run again with --apply to delete.`)
      return
    }

    await db.transaction(async (trx) => {
      await intents().useTransaction(trx).delete()
      await events().useTransaction(trx).delete()
      await sessions().useTransaction(trx).delete()
      await visitors().useTransaction(trx).delete()
    })
    this.logger.success(`Deleted ${summary}.`)
  }
}
