import type { HttpContext } from '@adonisjs/core/http'
import { robotsTxt, sitemapXml } from '#services/crawler_files'

export default class CrawlerFilesController {
  robots({ response }: HttpContext) {
    response.header('Content-Type', 'text/plain; charset=utf-8')
    response.header('Cache-Control', 'public, max-age=3600')
    return robotsTxt()
  }

  sitemap({ response }: HttpContext) {
    response.header('Content-Type', 'application/xml; charset=utf-8')
    response.header('Cache-Control', 'public, max-age=3600')
    return sitemapXml()
  }
}
