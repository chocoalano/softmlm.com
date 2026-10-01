import { DateTime } from 'luxon'
import db from '@adonisjs/lucid/services/db'
import type { HttpContext } from '@adonisjs/core/http'
import leadsConfig, { adminLeadOptions, type InterestCategory } from '#config/leads'
import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import DemoRequest from '#models/demo_request'
import DemoRequestActivity from '#models/demo_request_activity'
import DemoRequestTransformer from '#transformers/demo_request_transformer'
import DemoRequestActivityTransformer from '#transformers/demo_request_activity_transformer'
import MarketingJourney from '#services/marketing_journey'
import WhatsappIntents, { parseReference } from '#services/whatsapp_intents'
import {
  leadFiltersValidator,
  leadNoteValidator,
  leadStatusValidator,
} from '#validators/admin_demo_request'

const SQL_DATETIME = 'yyyy-MM-dd HH:mm:ss'

/**
 * Filters leads by what they are about. `service_interests` is a JSON
 * array (NULL for software demo requests), queried with the JSON functions
 * of SQLite (development, tests) or MySQL 8 (production).
 */
function whereInterest(
  query: ModelQueryBuilderContract<typeof DemoRequest>,
  interest: InterestCategory
) {
  const mysql = db.connection().dialect.name.startsWith('mysql')
  const length = mysql ? 'JSON_LENGTH(service_interests)' : 'json_array_length(service_interests)'
  const contains = mysql
    ? 'JSON_CONTAINS(service_interests, JSON_QUOTE(?))'
    : 'EXISTS (SELECT 1 FROM json_each(service_interests) WHERE json_each.value = ?)'
  const only = (value: string) => (inner: typeof query) =>
    inner.whereRaw(`${length} = 1`).whereRaw(contains, [value])

  if (interest === 'multiple') return query.whereRaw(`${length} > 1`)
  if (interest === 'software') {
    return query.where((inner) => inner.whereNull('service_interests').orWhere(only('software')))
  }
  return query.where(only(interest))
}

export default class AdminDemoRequestsController {
  /**
   * Paginated, filterable lead list. Invalid filters in a hand-edited URL
   * are ignored rather than turned into an error page.
   */
  async index({ request, inertia, bouncer }: HttpContext) {
    await bouncer.authorize('manageLeads')

    const [, parsed] = await leadFiltersValidator.tryValidate(request.qs())
    const filters = parsed ?? {}

    const query = DemoRequest.query()
    if (filters.q) {
      /**
       * Plain LIKE, not `whereLike`: on MySQL Knex adds `COLLATE utf8_bin`,
       * which fails on utf8mb4 columns. Plain LIKE is case-insensitive on
       * SQLite and on MySQL's default collation alike.
       */
      const term = `%${filters.q}%`
      query.where((search) => {
        search
          .where('full_name', 'like', term)
          .orWhere('company', 'like', term)
          .orWhere('email', 'like', term)
          .orWhere('phone', 'like', term)
      })
    }
    if (filters.status) query.where('status', filters.status)
    if (filters.businessType) query.where('business_type', filters.businessType)
    if (filters.activeMembers) query.where('active_members', filters.activeMembers)
    if (filters.source) query.where('source', filters.source)
    if (filters.interest) whereInterest(query, filters.interest)
    if (filters.from)
      query.where('created_at', '>=', filters.from.startOf('day').toFormat(SQL_DATETIME))
    if (filters.to) query.where('created_at', '<=', filters.to.endOf('day').toFormat(SQL_DATETIME))

    const sort = filters.sort ?? 'created_at'
    const direction = filters.direction ?? 'desc'
    query.orderBy(sort, direction).orderBy('id', direction)

    const page = await query.paginate(filters.page ?? 1, leadsConfig.adminPageSize)

    /**
     * Tells "no leads yet" apart from "no leads match these filters".
     */
    const isFiltered = [
      filters.q,
      filters.status,
      filters.businessType,
      filters.activeMembers,
      filters.source,
      filters.interest,
      filters.from,
      filters.to,
    ].some(Boolean)
    const hasAnyLeads = isFiltered
      ? (await DemoRequest.query().select('id').first()) !== null
      : page.total > 0

    /**
     * A WhatsApp reference typed into the search ("M7K4P2", "Ref: M7K4P2")
     * also shows its intent. The text search still runs: a company name can
     * look like a reference.
     */
    const candidate = filters.q ? parseReference(filters.q) : null
    const intent = candidate ? await WhatsappIntents.find(candidate.reference) : null
    const reference = intent
      ? {
          ...WhatsappIntents.summary(intent),
          resolvable: WhatsappIntents.isResolvable(intent),
        }
      : candidate?.explicit
        ? { reference: candidate.reference, missing: true as const }
        : null

    return inertia.render('admin/demo_requests/index', {
      reference,
      leads: DemoRequestTransformer.paginate(page.all(), page.getMeta()),
      filters: {
        q: filters.q ?? '',
        status: filters.status ?? '',
        businessType: filters.businessType ?? '',
        activeMembers: filters.activeMembers ?? '',
        source: filters.source ?? '',
        interest: filters.interest ?? '',
        from: filters.from?.toISODate() ?? '',
        to: filters.to?.toISODate() ?? '',
        sort,
        direction,
      },
      hasAnyLeads,
      options: adminLeadOptions,
    })
  }

  async show({ params, inertia, bouncer }: HttpContext) {
    await bouncer.authorize('manageLeads')

    const lead = await DemoRequest.findOrFail(params.id)
    const activities = await lead
      .related('activities')
      .query()
      .preload('user')
      .orderBy('created_at', 'desc')
      .orderBy('id', 'desc')

    return inertia.render('admin/demo_requests/show', {
      lead: DemoRequestTransformer.transform(lead).useVariant('forDetail'),
      activities: DemoRequestActivityTransformer.transform(activities),
      options: adminLeadOptions,
      attribution: await MarketingJourney.forLead(lead),
    })
  }

  /**
   * Moves a lead to another status and records who did it. The first time
   * a lead reaches a milestone its timestamp is set; it is never
   * overwritten when the lead moves back and forth.
   */
  async updateStatus({ params, request, response, session, auth, bouncer }: HttpContext) {
    await bouncer.authorize('manageLeads')

    const { status } = await request.validateUsing(leadStatusValidator)
    const lead = await DemoRequest.findOrFail(params.id)

    if (lead.status === status) {
      session.flash('success', 'The lead already has this status.')
      return response.redirect().back()
    }

    await db.transaction(async (trx) => {
      lead.useTransaction(trx)
      const fromStatus = lead.status
      lead.status = status

      const timestamp =
        leadsConfig.statusTimestamps[status as keyof typeof leadsConfig.statusTimestamps]
      if (timestamp && !lead[timestamp]) lead[timestamp] = DateTime.now()

      await lead.save()
      await DemoRequestActivity.create(
        {
          demoRequestId: lead.id,
          userId: auth.user!.id,
          type: 'status_changed',
          fromStatus,
          toStatus: status,
        },
        { client: trx }
      )
    })

    const label = leadsConfig.statuses.find((item) => item.value === status)?.label ?? status
    session.flash('success', `Status changed to ${label}.`)
    return response.redirect().back()
  }

  async storeNote({ params, request, response, session, auth, bouncer }: HttpContext) {
    await bouncer.authorize('manageLeads')

    const { body } = await request.validateUsing(leadNoteValidator)
    const lead = await DemoRequest.findOrFail(params.id)

    await DemoRequestActivity.create({
      demoRequestId: lead.id,
      userId: auth.user!.id,
      type: 'note',
      body,
    })

    session.flash('success', 'Note added.')
    return response.redirect().back()
  }
}
