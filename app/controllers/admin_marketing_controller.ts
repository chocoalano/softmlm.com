import vine from '@vinejs/vine'
import db from '@adonisjs/lucid/services/db'
import type { HttpContext } from '@adonisjs/core/http'
import MarketingVisitor from '#models/marketing_visitor'
import MarketingSession from '#models/marketing_session'
import DemoRequest from '#models/demo_request'
import MarketingReports, { PERIODS } from '#services/marketing_reports'
import MarketingJourney, { purposeLabel, sourceLabel } from '#services/marketing_journey'
import WhatsappIntents, { parseReference } from '#services/whatsapp_intents'
import { EXPLICIT_EVENTS, INTENT_LABELS, type Intent } from '#shared/tracking'

const overviewFilters = vine.create({
  period: vine.enum(PERIODS).optional(),
})

const visitorFilters = vine.create({
  q: vine.string().trim().maxLength(40).optional(),
  converted: vine.enum(['yes', 'no'] as const).optional(),
  page: vine.number().withoutDecimals().min(1).max(100000).optional(),
})

const PAGE_SIZE = 25

/**
 * First-party marketing analytics (docs/marketing-attribution.md) for
 * admin, sales and marketing. Anonymous visitors stay anonymous: they are
 * shown by a shortened random id, never a name. Contact details appear
 * only through the lead pages, which need `manageLeads`.
 */
export default class AdminMarketingController {
  async overview({ request, inertia, bouncer, auth }: HttpContext) {
    await bouncer.authorize('viewMarketing')
    const [, filters] = await overviewFilters.tryValidate(request.qs())
    const report = await MarketingReports.overview(filters?.period ?? '7', {
      canManageLeads: auth.user?.canManageLeads ?? false,
    })
    return inertia.render('admin/marketing/overview', { report })
  }

  /**
   * Visitors, most recent first. The search takes a WhatsApp reference
   * ("M7K4P2" or "Ref: M7K4P2") or the start of a visitor id. Each row
   * shows the explicit interest (CTA, choice, form) apart from what the
   * visitor only viewed. Four aggregate queries per page, whatever its size.
   */
  async visitors({ request, inertia, bouncer, auth }: HttpContext) {
    await bouncer.authorize('viewMarketing')
    const [, parsed] = await visitorFilters.tryValidate(request.qs())
    const filters = parsed ?? {}

    const query = MarketingVisitor.query().orderBy('last_seen_at', 'desc').orderBy('id', 'desc')
    let reference: {
      code: string
      found: boolean
      resolvable: boolean
      intentId: number | null
      at: string | null
      page: string | null
      interest: string | null
    } | null = null

    const q = filters.q ?? ''
    const candidate = parseReference(q)
    const intent = candidate ? await WhatsappIntents.find(candidate.reference) : null
    if (candidate && (intent || candidate.explicit)) {
      const resolvable = intent ? WhatsappIntents.isResolvable(intent) : false
      reference = {
        code: candidate.reference,
        found: Boolean(intent),
        resolvable,
        intentId: intent?.id ?? null,
        at: intent?.clickedAt.toISO() ?? null,
        page: intent?.page ?? null,
        interest: intent?.interestCategory ? INTENT_LABELS[intent.interestCategory] : null,
      }
      query.where('id', resolvable && intent?.visitorId ? intent.visitorId : 0)
    } else if (q && /^[0-9a-f-]{4,36}$/i.test(q)) {
      /* plain LIKE: see the lead search in AdminDemoRequestsController */
      query.where('visitor_uuid', 'like', `${q.toLowerCase()}%`)
    }

    const linked = db
      .from('demo_requests')
      .whereNotNull('marketing_visitor_id')
      .select('marketing_visitor_id')
    if (filters.converted === 'yes') query.whereIn('id', linked)
    if (filters.converted === 'no') query.whereNotIn('id', linked)

    const page = await query.paginate(filters.page ?? 1, PAGE_SIZE)
    const visitors = page.all()
    const ids = visitors.map((visitor) => visitor.id)

    const sessionCounts: Record<string, unknown>[] = ids.length
      ? await db
          .from('marketing_sessions')
          .whereIn('visitor_id', ids)
          .select('visitor_id')
          .count('* as total')
          .groupBy('visitor_id')
      : []
    const latestSessions = ids.length
      ? await MarketingSession.query().whereIn('visitor_id', ids).orderBy('started_at', 'desc')
      : []
    const interests: Record<string, unknown>[] = ids.length
      ? await db
          .from('marketing_events')
          .whereIn('visitor_id', ids)
          .whereNotNull('interest_category')
          .select('visitor_id', 'interest_category')
          .select(
            db.raw(
              `SUM(CASE WHEN event_name IN (${EXPLICIT_EVENTS.map(() => '?').join(', ')}) THEN 1 ELSE 0 END) as explicit`,
              [...EXPLICIT_EVENTS]
            )
          )
          .count('* as total')
          .groupBy('visitor_id', 'interest_category')
      : []
    const intentCounts: Record<string, unknown>[] = ids.length
      ? await db
          .from('marketing_whatsapp_intents')
          .whereIn('visitor_id', ids)
          .select('visitor_id')
          .count('* as total')
          .groupBy('visitor_id')
      : []
    const leads = ids.length
      ? await DemoRequest.query()
          .whereIn('marketing_visitor_id', ids)
          .select('id', 'marketing_visitor_id', 'created_at')
          .orderBy('created_at', 'asc')
      : []

    const canManageLeads = auth.user?.canManageLeads ?? false
    const rows = visitors.map((visitor) => {
      const last = latestSessions.find((session) => session.visitorId === visitor.id)
      const mine = interests.filter((row) => Number(row.visitor_id) === visitor.id)
      const explicit = mine
        .filter((row) => Number(row.explicit) > 0)
        .sort((a, b) => Number(b.explicit) - Number(a.explicit))[0]
      const viewed = mine.sort((a, b) => Number(b.total) - Number(a.total))[0]
      const visitorLeads = leads.filter((lead) => lead.marketingVisitorId === visitor.id)
      return {
        uuid: visitor.visitorUuid,
        shortId: visitor.visitorUuid.slice(0, 8),
        firstSeenAt: visitor.firstSeenAt.toISO(),
        lastSeenAt: visitor.lastSeenAt.toISO(),
        sessions: Number(
          sessionCounts.find((row) => Number(row.visitor_id) === visitor.id)?.total ?? 0
        ),
        firstSource: sourceLabel({
          utmSource: visitor.firstUtmSource,
          utmMedium: visitor.firstUtmMedium,
          referrerHost: visitor.firstReferrerHost,
        }),
        lastSource: last ? sourceLabel(last) : '—',
        explicitInterest: explicit
          ? (INTENT_LABELS[explicit.interest_category as Intent] ?? null)
          : null,
        viewedInterest:
          !explicit && viewed ? (INTENT_LABELS[viewed.interest_category as Intent] ?? null) : null,
        whatsappIntents: Number(
          intentCounts.find((row) => Number(row.visitor_id) === visitor.id)?.total ?? 0
        ),
        converted: visitorLeads.length > 0,
        leadIds: canManageLeads ? visitorLeads.map((lead) => lead.id) : [],
      }
    })

    return inertia.render('admin/marketing/visitors', {
      visitors: rows,
      metadata: page.getMeta(),
      filters: { q, converted: filters.converted ?? '' },
      reference,
      canManageLeads,
    })
  }

  async visitor({ params, inertia, bouncer, auth }: HttpContext) {
    await bouncer.authorize('viewMarketing')
    const visitor = await MarketingVisitor.findByOrFail('visitorUuid', String(params.uuid))
    const journey = await MarketingJourney.forVisitor(visitor.id)
    const canManageLeads = auth.user?.canManageLeads ?? false
    const leads = await DemoRequest.query()
      .where('marketing_visitor_id', visitor.id)
      .orderBy('created_at', 'asc')

    return inertia.render('admin/marketing/visitor', {
      journey,
      leads: leads.map((lead) => ({
        id: canManageLeads ? lead.id : null,
        createdAt: lead.createdAt.toISO(),
        purpose: purposeLabel(lead).primary,
      })),
      canManageLeads,
    })
  }
}
