import type { HttpContext } from '@adonisjs/core/http'
import { urlFor } from '@adonisjs/core/services/url_builder'
import WhatsappIntents, { parseReference } from '#services/whatsapp_intents'

/**
 * The back office's one search box. A WhatsApp reference ("M7K4P2" or
 * "Ref: M7K4P2") opens its intent; anything else searches leads (admin,
 * sales) or visitors (marketing). Signed-in staff only: a reference never
 * opens anything publicly.
 */
export default class AdminSearchController {
  async handle({ request, response, bouncer, auth }: HttpContext) {
    await bouncer.authorize('viewMarketing')
    const q = String(request.input('q', '')).trim().slice(0, 100)

    // never forward this request's own query string (config/app.ts forwards it by default)
    const go = (path: string, qs?: string) =>
      response
        .redirect()
        .withQs(false)
        .toPath(qs ? `${path}?${new URLSearchParams({ q: qs })}` : path)

    const candidate = parseReference(q)
    if (candidate) {
      const intent = await WhatsappIntents.find(candidate.reference)
      if (intent) return go(urlFor('admin.marketing.whatsapp.show', { id: intent.id }))
      if (candidate.explicit) {
        return go(urlFor('admin.marketing.whatsapp.index'), candidate.reference)
      }
    }

    const target = auth.user?.canManageLeads
      ? urlFor('admin.demo_requests.index')
      : urlFor('admin.marketing.visitors')
    return go(target, q)
  }
}
