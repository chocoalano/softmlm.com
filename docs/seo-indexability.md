# SEO: indexability and technical foundation

Phase 12C. Which URLs search engines may index, how canonical, hreflang,
sitemap, robots and structured data are built, and what is deliberately
not published. Tests: `tests/functional/marketing/seo.spec.ts`,
`tests/functional/marketing/site.spec.ts`, `tests/functional/marketing/legal.spec.ts`.

## Rules

- **One source.** Titles, descriptions, canonicals, hreflang, social cards,
  breadcrumbs, structured data and the sitemap all come from
  `config/seo.ts` (`marketingPages`, `seoFor`). A new marketing page is
  added there once.
- **Canonical** = `APP_URL` + the localized path. Never the request's Host
  or `X-Forwarded-Host`; query strings (UTM tags, ad click ids) never
  change it, so `/id/services/seo?utm_source=instagram` is canonical to
  `/id/services/seo`. Exactly one canonical per page.
- **hreflang**: every page lists `en`, `id` and `x-default` (English), and
  each language version names the other back. Both versions always exist.
- **Indexable** = the public marketing pages (`marketing.*` routes except
  the 404). Every other response carries `X-Robots-Tag: noindex`, and pages
  without SEO data (back office, login, 404) also carry
  `<meta name="robots" content="noindex">`
  (`app/middleware/search_indexing_middleware.ts`,
  `resources/views/inertia_layout.edge`).
- **Staging**: `SEARCH_INDEXING_ENABLED=false` makes every response
  `X-Robots-Tag: noindex, nofollow`, every page `noindex`, and robots.txt
  `Disallow: /`. Production leaves the variable unset; nothing turns
  production off by accident (the default is indexable, and canonicals
  always point at `APP_URL`).
- **robots.txt is not security.** It keeps crawlers out of `/admin`,
  `/dashboard` and `/r/` (the WhatsApp redirect). Access control lives in
  the routes themselves. `/login` stays crawlable so its noindex is seen.

## Indexability matrix

| Route | EN/ID | Index? | Canonical | Sitemap | Reason |
| --- | --- | --- | --- | --- | --- |
| `/{locale}` (home) | both | yes | self | yes | marketing page; WebSite structured data |
| `/{locale}/compensation-plans` | both | yes | self | yes | marketing page |
| `/{locale}/pricing` | both | yes | self | yes | marketing page |
| `/{locale}/who-we-serve` | both | yes | self | yes | marketing page |
| `/{locale}/who-we-serve/{executives,finance,operations,it-teams,distributors}` | both | yes | self | yes | marketing pages; breadcrumbs |
| `/{locale}/how-we-do-it` | both | yes | self | yes | marketing page |
| `/{locale}/features` | both | yes | self | yes | marketing page |
| `/{locale}/features/{network-management,ecommerce,wallet-payout}` | both | yes | self | yes | marketing pages; breadcrumbs |
| `/{locale}/integrations` | both | yes | self | yes | marketing page; breadcrumbs (under Features) |
| `/{locale}/security` | both | yes | self | yes | marketing page |
| `/{locale}/services` | both | yes | self | yes | marketing page |
| `/{locale}/services/{social-media,seo,paid-advertising,branding,product-maklon}` | both | yes | self | yes | marketing pages; breadcrumbs |
| `/{locale}/privacy`, `/{locale}/terms` | both | yes | self | yes | public legal pages |
| `/{locale}/*` (unknown) | both | **no** | none | no | localized 404, status 404, noindex header and meta |
| `/` | — | no | — | no | 302 to the visitor's language (`/en` by default) |
| `/pricing`, `/security`, `/privacy`, … `/features/:slug` (pre-locale) | — | no | — | no | single 301 to the `/en` page, query kept |
| `/login`, `/signup` | — | **no** | none | no | noindex header and meta; `/signup` is 404 in production |
| `/dashboard`, `/admin/*` | — | **no** | none | no | signed-in only; noindex; disallowed in robots.txt |
| `/r/whatsapp/:context` | — | **no** | — | no | 302 to WhatsApp; noindex; disallowed in robots.txt |
| `POST /demo-requests`, `POST /marketing/events`, `POST /privacy/tracking` | — | no | — | no | form and tracking endpoints, not pages |
| `/robots.txt`, `/sitemap.xml` | — | — | — | — | crawler files, built from `marketingPages` |
| `/og/*.jpg`, `/assets/*`, favicons | — | — | — | — | static files |

## Social cards (Open Graph and X)

Every marketing page has `og:type`, `og:site_name`, `og:title`,
`og:description`, `og:url` (= canonical), `og:locale` (+ alternate),
`og:image` with width, height and alt, and the matching `twitter:*`
tags (`summary_large_image`). They are server-rendered, so link previews
see them without JavaScript.

One branded card per language: `public/og/social-card-en.jpg` and
`social-card-id.jpg` (1200×630), rendered by `node ace og:image` from the
brand name and `SOCIAL_CARD` in `config/seo.ts`. It is a brand card, not a
product screenshot. Re-run the command when the brand name (blocker #13)
or the card copy changes. No X account is named (`twitter:site`), because
none is confirmed.

## Structured data

| Type | Status | Why |
| --- | --- | --- |
| `WebSite` | **published** on the home page (name, url, inLanguage) | verifiable facts only |
| `BreadcrumbList` | **published** on nested pages | built from the same list as the visible trail (`components/site/breadcrumbs.vue`), so they always match |
| `Organization` | **deferred** | brand and domain are not settled (blocker #13: copy "mlmsoft", logo artwork "mlmsofts", domain mlmsofts.com, while mlmsoft.com belongs to a third party); no confirmed legal entity, address, founding date, social profiles or logo URL |
| `FAQPage` | **deferred** | the FAQ copy lives in the client bundles; publishing it twice risks drift, and Google shows FAQ rich results only for a few authoritative sites |
| `SoftwareApplication` / `Product` / `Service` | **not published** | no price, rating, review or operating system that is true for every client; schema must not outrun the product evidence |

The claims gate also runs over titles, descriptions, social alt text,
the social card copy and the structured data (`seo.spec.ts`).

## Audits (2026-10-01)

- **Canonical:** one per page, `APP_URL` + path, same locale; unchanged by
  UTM tags and by a spoofed `X-Forwarded-Host` (tested).
- **hreflang:** reciprocal for every EN/ID pair, `x-default` → English,
  every alternate a real 200 page (tested).
- **Redirects:** every pre-locale URL (including `/features` and
  `/features/:slug`, added in this phase) is one 301 to the final `/en`
  page, which answers 200; `/` is one 302. No chains, no loops (tested).
- **404:** status 404, noindex, no canonical, site navigation and a way
  back; its "Book a Demo" buttons now open the home page form.
- **Titles and descriptions:** no exact duplicates in either language
  (tested). Two generic English titles were sharpened ("MLM Software
  Pricing", "MLM Compensation Plans & Bonus Structures"). Near-duplicate
  patterns remain by design (service pages share "… for MLM Businesses";
  role pages share "MLM Software for …").
- **Indonesian copy:** a targeted pass replaced English leakage and
  glossary breaches in high-impact places ("tahap discovery" → "tahap
  memahami bisnis", pricing phase labels, "Rp…M" → "Rp… miliar", maklon
  hero wording, "channel" → "kanal", "scope" → "cakupan", "Payment" →
  "Pembayaran", "Source of truth", "reversal" headings, WhatsApp
  messages). The remaining items need the native review (blocker #10).
- **Internal links:** every link resolves (tested); the `/#feature-*`
  links now have real anchors, so the home page scrolls to the feature
  explorer.

## Known limits

- **SSR is off.** Page content is rendered in the browser. Google renders
  JavaScript; the head (title, description, canonical, hreflang, social
  cards, structured data) is server-rendered for every crawler. Turning on
  SSR is a separate project.
- **Web fonts** load from Google Fonts on marketing pages (named in the
  Privacy Notice). Self-hosting them would remove a third-party request
  and speed up the first render.
- **Production verification** of robots.txt, sitemap.xml and the social
  cards on the real domain is pending the next deployment (blocker #20,
  `docs/production-deployment.md`).
