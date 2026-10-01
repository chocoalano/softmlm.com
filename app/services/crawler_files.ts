import { LOCALES } from '#shared/locales'
import {
  absoluteUrl,
  marketingPages,
  searchEngines,
  seoFor,
  type MarketingPageKey,
} from '#config/seo'

/**
 * robots.txt and sitemap.xml, built from the same page list and URLs as the
 * canonical and hreflang tags (config/seo.ts), so the three never disagree.
 * Every URL comes from APP_URL, never from the request's Host header.
 */

/**
 * Paths crawlers have no reason to fetch: the back office and the WhatsApp
 * redirect. Not a protection: those routes check access themselves, and
 * the login page is left crawlable so its noindex is seen.
 */
const DISALLOWED = ['/admin', '/dashboard', '/r/']

export function robotsTxt() {
  if (!searchEngines.indexing) return 'User-agent: *\nDisallow: /\n'
  return [
    'User-agent: *',
    ...DISALLOWED.map((path) => `Disallow: ${path}`),
    '',
    `Sitemap: ${absoluteUrl('/sitemap.xml')}`,
    '',
  ].join('\n')
}

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

/** Every public marketing page in every language, with its language alternates. */
export function sitemapXml() {
  const urls = (Object.keys(marketingPages) as MarketingPageKey[]).flatMap((key) =>
    LOCALES.map((locale) => {
      const seo = seoFor(key, locale)
      const alternates = seo.alternates
        .map(
          (alternate) =>
            `    <xhtml:link rel="alternate" hreflang="${alternate.hreflang}" href="${escapeXml(alternate.href)}"/>`
        )
        .join('\n')
      return `  <url>\n    <loc>${escapeXml(seo.canonical)}</loc>\n${alternates}\n  </url>`
    })
  )
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n')
}
