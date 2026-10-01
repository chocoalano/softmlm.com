import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { searchEngines } from '#config/seo'

/** robots.txt and the sitemap are crawler files, not pages. */
const CRAWLER_FILES = new Set(['robots', 'sitemap'])

/**
 * Search engines may index the public marketing pages only. Every other
 * response (back office, login, the WhatsApp redirect, form and tracking
 * endpoints, the marketing 404) carries `X-Robots-Tag: noindex`, and a
 * deployment with indexing switched off (staging) is `noindex, nofollow`
 * throughout. robots.txt is a hint for crawlers, never access control.
 */
export default class SearchIndexingMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    await next()

    const name = ctx.route?.name ?? ''
    if (CRAWLER_FILES.has(name)) return
    if (!searchEngines.indexing) {
      ctx.response.header('X-Robots-Tag', 'noindex, nofollow')
    } else if (!name.startsWith('marketing.') || name === 'marketing.not_found') {
      ctx.response.header('X-Robots-Tag', 'noindex')
    }
  }
}
