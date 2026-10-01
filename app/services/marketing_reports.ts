import { DateTime } from 'luxon'
import db from '@adonisjs/lucid/services/db'
import businessConfig from '#config/business'
import leadsConfig from '#config/leads'
import DemoRequest from '#models/demo_request'
import { EXPLICIT_EVENTS, INTENT_LABELS, type Intent } from '#shared/tracking'
import { purposeLabel, sourceLabel, touchView } from '#services/marketing_journey'

const SQL_DATETIME = 'yyyy-MM-dd HH:mm:ss'

/** Event names as the funnel and page report count them. */
const WHATSAPP = 'whatsapp_marketing_click'
const SUBMISSIONS = ['demo_form_submitted', 'consultation_form_submitted']

export const PERIODS = ['today', '7', '30', '90'] as const
export type Period = (typeof PERIODS)[number]

const count = (row: Record<string, unknown> | undefined, key = 'total') => Number(row?.[key] ?? 0)

type Row = Record<string, unknown>
type Ranked = { label: string; total: number }

/** Adds up rows that end up with the same label ("ig" and "instagram"), largest first. */
function merge(rows: Ranked[], limit: number) {
  const totals = new Map<string, number>()
  for (const row of rows) totals.set(row.label, (totals.get(row.label) ?? 0) + row.total)
  return [...totals]
    .map(([label, total]) => ({ label, total }))
    .sort((a, b) => b.total - a.total || a.label.localeCompare(b.label))
    .slice(0, limit)
}

/**
 * Aggregates for /admin/marketing, actionable first: visitors, WhatsApp
 * intents, form leads and qualified leads for the period, then where they
 * came from, where they landed, what they explicitly asked about, and the
 * latest leads. Plain counts over a date range: directional marketing
 * numbers, not billing-grade.
 *
 * "Today" and each period start at midnight in the business timezone;
 * timestamps are compared in the database's own (UTC) time.
 *
 * Portable SQL only (COUNT, COUNT DISTINCT, COALESCE, CASE, GROUP BY), so
 * the same queries run on SQLite (development, tests) and MySQL 8
 * (production). See docs/marketing-attribution.md for the definitions.
 */
export default class MarketingReports {
  static since(period: Period) {
    const days = period === 'today' ? 0 : Number(period) - 1
    return DateTime.now()
      .setZone(businessConfig.timezone)
      .startOf('day')
      .minus({ days })
      .toLocal()
      .toFormat(SQL_DATETIME)
  }

  static async overview(period: Period, { canManageLeads }: { canManageLeads: boolean }) {
    const since = MarketingReports.since(period)
    const sessions = () => db.from('marketing_sessions').where('started_at', '>=', since)
    const events = () => db.from('marketing_events').where('occurred_at', '>=', since)
    const leads = () => db.from('demo_requests').where('created_at', '>=', since)

    const [visitors] = await sessions().countDistinct('visitor_id as total')
    const [intents] = await db
      .from('marketing_whatsapp_intents')
      .where('clicked_at', '>=', since)
      .count('* as total')
    const [formLeads] = await leads().count('* as total')
    const [qualified] = await leads().whereNotNull('qualified_at').count('* as total')
    const [linked] = await leads().whereNotNull('marketing_visitor_id').count('* as total')

    const [explicitVisitors] = await events()
      .whereIn('event_name', [...EXPLICIT_EVENTS])
      .whereNotNull('interest_category')
      .countDistinct('visitor_id as total')
    const [whatsappVisitors] = await events()
      .where('event_name', WHATSAPP)
      .countDistinct('visitor_id as total')
    const [formVisitors] = await events()
      .whereIn('event_name', SUBMISSIONS)
      .countDistinct('visitor_id as total')

    const bySource: Row[] = await sessions()
      .select('utm_source', 'utm_medium', 'referrer_host')
      .count('* as total')
      .groupBy('utm_source', 'utm_medium', 'referrer_host')
      .orderBy('total', 'desc')
      .limit(50)
    /* labels as everywhere else ("Instagram Ads", "google.com", "Direct"), then merged */
    const topSources = merge(
      bySource.map((row) => ({
        label: row.utm_source
          ? sourceLabel({ utmSource: String(row.utm_source), utmMedium: row.utm_medium as string })
          : sourceLabel({ referrerHost: (row.referrer_host as string | null) ?? null }),
        total: count(row),
      })),
      8
    )

    const byCampaign: Row[] = await sessions()
      .whereNotNull('utm_campaign')
      .select('utm_campaign')
      .count('* as total')
      .groupBy('utm_campaign')
      .orderBy('total', 'desc')
      .limit(8)
    const byLanding: Row[] = await sessions()
      .whereNotNull('landing_page')
      .select('landing_page')
      .count('* as total')
      .groupBy('landing_page')
      .orderBy('total', 'desc')
      .limit(8)
    const byExplicit: Row[] = await events()
      .whereIn('event_name', [...EXPLICIT_EVENTS])
      .whereNotNull('interest_category')
      .select('interest_category')
      .countDistinct('visitor_id as total')
      .groupBy('interest_category')
      .orderBy('total', 'desc')
      .limit(8)

    /* conversion by page: views, WhatsApp clicks and form submissions on each page */
    const byPage: Row[] = await events()
      .whereNotNull('page')
      .select('page')
      .select(db.raw(`SUM(CASE WHEN event_name = 'page_view' THEN 1 ELSE 0 END) as views`))
      .select(db.raw(`SUM(CASE WHEN event_name = ? THEN 1 ELSE 0 END) as whatsapp`, [WHATSAPP]))
      .select(db.raw(`SUM(CASE WHEN event_name IN (?, ?) THEN 1 ELSE 0 END) as forms`, SUBMISSIONS))
      .groupBy('page')
      .orderBy('views', 'desc')
      .limit(12)

    /* the latest leads: one query, attribution from each lead's own snapshot */
    const recent = await DemoRequest.query()
      .where('created_at', '>=', since)
      .orderBy('created_at', 'desc')
      .orderBy('id', 'desc')
      .limit(8)
    const statusLabel = (value: string) =>
      leadsConfig.statuses.find((status) => status.value === value)?.label ?? value

    return {
      period,
      kpis: {
        visitors: count(visitors),
        whatsappIntents: count(intents),
        formLeads: count(formLeads),
        qualifiedLeads: count(qualified),
        linkedLeads: count(linked),
      },
      funnel: [
        { key: 'visitors', total: count(visitors) },
        { key: 'explicit', total: count(explicitVisitors) },
        { key: 'whatsapp', total: count(whatsappVisitors) },
        { key: 'forms', total: count(formVisitors) },
      ],
      topSources,
      topCampaigns: byCampaign.map((row) => ({
        label: String(row.utm_campaign),
        total: count(row),
      })),
      topLanding: byLanding.map((row) => ({ label: String(row.landing_page), total: count(row) })),
      topExplicit: byExplicit.map((row) => ({
        label: INTENT_LABELS[row.interest_category as Intent] ?? String(row.interest_category),
        total: count(row),
      })),
      recentLeads: recent.map((lead) => {
        const snapshot = lead.attributionSnapshot
        const touch = touchView(snapshot?.first ?? snapshot?.last)
        return {
          id: canManageLeads ? lead.id : null,
          at: lead.createdAt.toISO(),
          purpose: purposeLabel(lead).primary,
          source: touch?.source ?? '—',
          status: statusLabel(lead.status),
          tracked: lead.marketingVisitorId !== null,
        }
      }),
      byPage: byPage.map((row) => ({
        page: String(row.page),
        views: Number(row.views ?? 0),
        whatsapp: Number(row.whatsapp ?? 0),
        forms: Number(row.forms ?? 0),
      })),
    }
  }
}
