import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export const ATTRIBUTION_SESSION_KEY = 'lead_attribution'

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const

export type Attribution = {
  landingPage: string
  referrer: string | null
  utm: Partial<Record<(typeof UTM_KEYS)[number], string>>
}

/**
 * Remembers how a visitor arrived (landing page, external referrer and UTM
 * tags) in their session, so a lead submitted later in the visit is still
 * attributed. The first touch of a session is kept, unless the visitor
 * arrives again through a new tagged link.
 *
 * Only the path of the landing page and the origin + path of the referrer
 * are stored: query strings can carry personal data.
 */
export default class CaptureAttributionMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const { request, session } = ctx

    if (request.method() === 'GET') {
      const qs = request.qs()
      const utm: Attribution['utm'] = {}
      for (const key of UTM_KEYS) {
        const value = typeof qs[key] === 'string' ? qs[key].trim().slice(0, 200) : ''
        if (value) utm[key] = value
      }

      const hasUtm = Object.keys(utm).length > 0
      if (hasUtm || !session.has(ATTRIBUTION_SESSION_KEY)) {
        const attribution: Attribution = {
          landingPage: request.url().slice(0, 2048),
          referrer: this.#externalReferrer(ctx),
          utm,
        }
        session.put(ATTRIBUTION_SESSION_KEY, attribution)
      }
    }

    return next()
  }

  #externalReferrer({ request }: HttpContext) {
    const header = request.header('referer')
    if (!header) return null
    try {
      const url = new URL(header)
      if (url.host === request.host()) return null
      return `${url.origin}${url.pathname}`.slice(0, 2048)
    } catch {
      return null
    }
  }
}
