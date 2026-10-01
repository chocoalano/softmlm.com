import vine from '@vinejs/vine'
import type { HttpContext } from '@adonisjs/core/http'
import MarketingWhatsappIntent from '#models/marketing_whatsapp_intent'
import DemoRequest from '#models/demo_request'
import MarketingJourney, { touchView } from '#services/marketing_journey'
import WhatsappIntents, { parseReference } from '#services/whatsapp_intents'
import { INTENT_LABELS } from '#shared/tracking'

const listFilters = vine.create({
  q: vine.string().trim().maxLength(40).optional(),
  contacted: vine.enum(['yes', 'no'] as const).optional(),
  linked: vine.enum(['yes', 'no'] as const).optional(),
  page: vine.number().withoutDecimals().min(1).max(100000).optional(),
})

const linkValidator = vine.create({
  lead: vine.number().withoutDecimals().min(1),
})

const PAGE_SIZE = 25

/**
 * WhatsApp intents (docs/marketing-attribution.md): every WhatsApp CTA
 * click with its reference. An intent is not a lead. Admin, sales and
 * marketing can look them up; only admin and sales (`manageLeads`) can
 * confirm that a conversation took place or link one to an existing lead.
 * Nothing here creates a lead or guesses who the visitor is.
 */
export default class AdminWhatsappIntentsController {
  async index({ request, inertia, bouncer, auth }: HttpContext) {
    await bouncer.authorize('viewMarketing')
    const [, parsed] = await listFilters.tryValidate(request.qs())
    const filters = parsed ?? {}

    const query = MarketingWhatsappIntent.query()
      .orderBy('clicked_at', 'desc')
      .orderBy('id', 'desc')
    const q = filters.q ?? ''
    const reference = q ? parseReference(q) : null
    if (q) query.where('reference', reference?.reference ?? '')
    if (filters.contacted === 'yes') query.whereNotNull('contacted_at')
    if (filters.contacted === 'no') query.whereNull('contacted_at')
    if (filters.linked === 'yes') query.whereNotNull('demo_request_id')
    if (filters.linked === 'no') query.whereNull('demo_request_id')

    const page = await query.paginate(filters.page ?? 1, PAGE_SIZE)
    const canManageLeads = auth.user?.canManageLeads ?? false

    return inertia.render('admin/marketing/whatsapp_intents', {
      intents: page.all().map((intent) => {
        const touch = intent.attribution?.last ?? intent.attribution?.first ?? null
        return {
          ...WhatsappIntents.summary(intent),
          linkedLeadId: canManageLeads ? intent.demoRequestId : null,
          linked: intent.demoRequestId !== null,
          landingPage: touch?.landingPage ?? intent.page,
          campaign:
            intent.attribution?.last?.campaign ?? intent.attribution?.first?.campaign ?? null,
          locale: intent.locale,
        }
      }),
      metadata: page.getMeta(),
      filters: {
        q,
        contacted: filters.contacted ?? '',
        linked: filters.linked ?? '',
      },
      invalidReference: Boolean(q) && !reference,
      canManageLeads,
    })
  }

  /**
   * One intent, as sales needs it when a WhatsApp message quotes its
   * reference: what it was about, how the visitor arrived, what else they
   * looked at, and whether a lead is linked. An expired reference that
   * sales never confirmed no longer shows the anonymous journey behind it.
   */
  async show({ params, inertia, bouncer, auth }: HttpContext) {
    await bouncer.authorize('viewMarketing')
    const intent = await MarketingWhatsappIntent.query()
      .where('id', params.id)
      .preload('contactedByUser')
      .firstOrFail()
    const canManageLeads = auth.user?.canManageLeads ?? false
    const resolvable = WhatsappIntents.isResolvable(intent)
    const interest = intent.interestCategory ? INTENT_LABELS[intent.interestCategory] : null

    const journey =
      resolvable && intent.visitorId ? await MarketingJourney.forVisitor(intent.visitorId) : null
    const lead = intent.demoRequestId ? await DemoRequest.find(intent.demoRequestId) : null

    return inertia.render('admin/marketing/whatsapp_intent', {
      intent: {
        ...WhatsappIntents.summary(intent),
        context: intent.context,
        page: intent.page,
        section: intent.section,
        locale: intent.locale,
        expiresAt: intent.expiresAt.toISO(),
        resolvable,
        contactedBy: intent.contactedByUser
          ? intent.contactedByUser.fullName || intent.contactedByUser.email
          : null,
      },
      first: resolvable ? touchView(intent.attribution?.first) : null,
      last: resolvable ? touchView(intent.attribution?.last) : null,
      otherExplicit: journey
        ? journey.explicit.map((item) => item.interest).filter((label) => label !== interest)
        : [],
      alsoViewed: journey ? journey.viewed.filter((label) => label !== interest) : [],
      visitorUuid: journey?.visitor.uuid ?? null,
      lead: lead
        ? canManageLeads
          ? { id: lead.id, name: lead.fullName, company: lead.company }
          : { id: null, name: null, company: null }
        : null,
      canManageLeads,
    })
  }

  /** Sales confirms a real WhatsApp conversation quoting this reference. */
  async markContacted({ params, response, bouncer, auth, session }: HttpContext) {
    await bouncer.authorize('manageLeads')
    const intent = await MarketingWhatsappIntent.findOrFail(params.id)
    await WhatsappIntents.markContacted(intent, auth.getUserOrFail())
    session.flash('success', `Ref ${intent.reference} marked as contacted`)
    return response.redirect().back()
  }

  async unmarkContacted({ params, response, bouncer, session }: HttpContext) {
    await bouncer.authorize('manageLeads')
    const intent = await MarketingWhatsappIntent.findOrFail(params.id)
    await WhatsappIntents.unmarkContacted(intent)
    session.flash('success', `Ref ${intent.reference} is no longer marked as contacted`)
    return response.redirect().back()
  }

  /** Links the intent to an existing lead, by its number. Never creates one. */
  async link({ params, request, response, bouncer, auth, session }: HttpContext) {
    await bouncer.authorize('manageLeads')
    const intent = await MarketingWhatsappIntent.findOrFail(params.id)
    const { lead: leadId } = await request.validateUsing(linkValidator)
    const lead = await DemoRequest.find(leadId)
    if (!lead) {
      session.flash('error', `Lead #${leadId} does not exist`)
      return response.redirect().back()
    }
    await WhatsappIntents.link(intent, lead, auth.getUserOrFail())
    session.flash('success', `Ref ${intent.reference} linked to lead #${lead.id}`)
    return response.redirect().back()
  }

  async unlink({ params, response, bouncer, auth, session }: HttpContext) {
    await bouncer.authorize('manageLeads')
    const intent = await MarketingWhatsappIntent.findOrFail(params.id)
    await WhatsappIntents.unlink(intent, auth.getUserOrFail())
    session.flash('success', `Ref ${intent.reference} unlinked`)
    return response.redirect().back()
  }
}
