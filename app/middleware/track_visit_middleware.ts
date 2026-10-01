import app from '@adonisjs/core/services/app'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import MarketingTracker from '#services/marketing_tracker'

/**
 * Records a page view for each marketing page a visitor loads, with the
 * visit's touch (landing page, external referrer, UTM tags) and the
 * interest the page stands for. One request is one page view: partial
 * Inertia reloads and prefetches are skipped, and only pages answered with
 * 200 are recorded.
 *
 * Marketing links are full page loads, so an Inertia visit to the page it
 * came from is the redirect back after a form or a reload, not a new view:
 * it keeps the visit alive without adding a page view.
 *
 * The write runs in the background (MarketingTracker queue), so the page
 * never waits for it; tests wait, to stay deterministic. Page views are
 * capped per client address (MarketingTracker.pageViewAllowed).
 */
export default class TrackVisitMiddleware {
  /** An Inertia request whose Referer is this same page (same host and path). */
  static samePage({ request }: HttpContext, path: string | null) {
    const referer = request.header('referer')
    if (!request.header('x-inertia') || !referer || !path) return false
    try {
      const url = new URL(referer)
      return url.host === request.host() && url.pathname === path
    } catch {
      return false
    }
  }

  async handle(ctx: HttpContext, next: NextFn) {
    const { request } = ctx
    const trackable =
      request.method() === 'GET' &&
      !request.header('x-inertia-partial-data') &&
      !/prefetch/i.test(`${request.header('purpose') ?? ''}${request.header('sec-purpose') ?? ''}`)

    const path = MarketingTracker.pagePath(request.url())
    const visit = trackable && path ? MarketingTracker.visit(ctx, path) : null

    const output = await next()

    if (
      visit &&
      ctx.response.getStatus() === 200 &&
      !TrackVisitMiddleware.samePage(ctx, path) &&
      (await MarketingTracker.pageViewAllowed(ctx, visit))
    ) {
      const task = MarketingTracker.record(visit, {
        name: 'page_view',
        page: path,
        locale: visit.touch.locale,
        theme: MarketingTracker.theme(request),
        interest: MarketingTracker.interestForPath(path),
      })
      if (app.inTest) await task
    }

    return output
  }
}
