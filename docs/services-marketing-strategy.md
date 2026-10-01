# Growth services: marketing strategy

Phase 9 adds supporting services to the marketing site: Social Media
Management, SEO & Content, Paid Advertising, Branding & Creative, and
Product Development / Maklon. **Software stays the core offering and the
anchor of the brand.** The services answer "what else can you help us
with?", never "what does this company actually do?".

```text
                 mlmsoft
                    │
             BUSINESS SYSTEM
              /           \
        SOFTWARE      IMPLEMENTATION
                          │
              GROWTH SUPPORT SERVICES
       /       /        |        \        \
   SOCIAL    SEO       ADS    BRANDING   MAKLON
```

Positioning line (used on the services hub and in the homepage section, not
in the homepage hero):

- EN: "One partner for the system behind your network, and the growth around it."
- ID: "Satu partner untuk sistem, brand, produk, dan pertumbuhan bisnis jaringan Anda."

The story behind it (a storytelling device, not an official lifecycle):
business model → product → brand → digital presence → software → traffic →
network growth → operations.

## 1. Audit of the current site (before Phase 9)

| Area | Finding | Decision |
|---|---|---|
| Homepage | Hero, platform, compensation, network, commerce, wallet, who we serve, outcomes, implementation, why mlmsoft, integrations, security, pricing quote, FAQ, demo form. Everything sells the system. | Hero and first screens unchanged. One services section after *Implementation*, before *Why mlmsoft*. |
| Pricing | A software needs estimator; no prices. | No service pricing and no upsell. Services say "pricing depends on scope". |
| How We Do It | A software implementation story. | Unchanged, plus one quiet line pointing to Services. |
| Who We Serve / personas | Teams inside an MLM company. | No service cross-sell: roles are about the system. |
| Features | Software concepts (compensation, network, ecommerce, wallet, distributor experience). | Services never appear under Features. Ecommerce gets one contextual link to Branding. |
| Navigation | Features ▾, Compensation, Who We Serve ▾, How We Do It, Pricing: five items, and the Indonesian header already the widest. | Compensation moves into the Features menu (it is already its first item) and Services takes its place. Still five items. |
| Lead pipeline | One secure endpoint (`POST /demo-requests`), table `demo_requests`, sources per page, software fields (business type, members, modules, estimate). | Same endpoint and table. Two nullable columns for service interest and service answers. |

## 2. Information architecture

```text
/{locale}/services                 hub
/{locale}/services/social-media    Social Media Management
/{locale}/services/seo             SEO & Content
/{locale}/services/paid-advertising  Paid Advertising
/{locale}/services/branding        Branding & Creative
/{locale}/services/product-maklon  Product Development / Maklon
```

`/services` and `/services/:slug` redirect permanently to English, like the
other pre-locale URLs. Software is not a service page: the rest of the site
already sells it.

### Dedicated page or not?

| Service | Unique intent | Enough depth | Clear business problem | Conversion intent | Duplicate risk | Decision |
|---|---|---|---|---|---|---|
| Social Media Management | Management / content help | Scope, calendar workflow, roles | Inconsistent, irregular content; no in-house capacity | Discuss management | Low: about ongoing presence | Dedicated page |
| SEO & Content | Organic visibility | Intent mapping, topic architecture, MLM content themes | Not found by people who search | Discuss SEO | Medium with Social (both "content"): kept apart by search intent vs. feed presence | Dedicated page |
| Paid Advertising | Paid acquisition | Campaign structure, landing alignment, measurement | Spend without structure | Discuss ad goals | Low | Dedicated page |
| Branding & Creative | Identity | Process, identity board, applications | Brand not recognisable or not consistent | Discuss brand | Low | Dedicated page |
| Product Development / Maklon | Developing a physical product | Product discovery areas, needs selector | Product idea without a path to development | Consult about product maklon | None | Dedicated page, with claim restrictions (see `docs/product-maklon-evidence.md`) |

All five are distinct enough; each page follows its own search intent and
its own concept visual rather than one agency template repeated five times.

## 3. Navigation

Desktop main nav, at most five items:

```text
Features ▾   Who We Serve ▾   Services ▾   How We Do It   Pricing
```

- **Features** keeps Compensation Plans as its first, highlighted item, so
  the strongest conversion page stays one click away.
- **Services** is a mega menu: the five services with one line each, and an
  overview card. No service ever appears under Features.
- Integrations (Phase 10) will live under Features, not as a sixth item.
- Mobile drawer: Features, Who We Serve and Services as groups.
- Footer: a Services column replaces the Compensation-plan-types column
  (those links all pointed to one anchor); Compensation stays in Features.

## 4. Homepage section

Placed after *Implementation* and before *Why mlmsoft*. The visitor already
knows who mlmsoft is for and how the system is built.

- Headline "Your business needs more than software." with the
  business-story strip, five service cards and a "one conversation" line.
- CTA band "Need more than the software?": WhatsApp (`services_overview`)
  and "Explore Services".
- The homepage hero and its CTAs do not change.

## 5. Cross-links (contextual only)

| From | Link | Why |
|---|---|---|
| Homepage | Services section | Main entry point |
| How We Do It | One line: "Looking for branding, marketing or product support?" | Visitors planning a launch |
| Ecommerce feature page | "Need help preparing the brand around your online store? Explore Branding." | Natural next need |
| Service pages | One or two related services each | Relevant, never "take all six" |
| Pricing, Compensation, persona pages | None | Would dilute the software story |

## 6. Conversion model

- **Primary everywhere: WhatsApp.** Contexts: `services_overview`,
  `service_social_media`, `service_seo`, `service_paid_ads`,
  `service_branding`, `service_product_maklon`.
- **Secondary:** software pages keep "Book a Demo". Service pages use
  "Request a Consultation", the same form component in *consultation* mode.
  The layout tells the header, drawer, FAQ and WhatsApp fallback where the
  page's form is (`#demo` or `#consultation`).
- WhatsApp appears in the hero, one mid-page band and the final CTA of each
  service page, no more.

## 7. Lead model

Same endpoint, validation, rate limit, honeypot and duplicate check.
`demo_requests` now stores all marketing leads (semantic technical debt: a
future CRM phase can rename it with a controlled migration).

| Column | Type | Meaning |
|---|---|---|
| `service_interests` | JSON array, nullable | Stable values: `software`, `social_media`, `seo`, `paid_advertising`, `branding`, `product_maklon`. `NULL` = a software demo / estimate lead (every lead before Phase 9). |
| `service_details` | JSON object, nullable | Optional answers from a service page. Today only the maklon needs selector: `productStage`, `targetLaunch`. |

Interest category (derived, not stored): no interests → **Software
inquiry**; one → that service; several → **Multiple services**. The
consultation form requires at least one interest; a service page preselects
its own. `selected_modules_snapshot` stays software-only.

New sources: `services_overview`, `service_social_media`, `service_seo`,
`service_paid_advertising`, `service_branding`, `service_product_maklon`.

Admin: an "Interest" column and filter on the list; the detail page shows
the services and any service answers. Emails: the internal subject names
the interest ("New Branding inquiry: Company"); the visitor confirmation
says "consultation request" instead of "demo request", in the visitor's
language.

## 8. Analytics

`whatsapp_marketing_click` keeps page, section, variant, locale and theme.
New `service_interest` (service, locale, page) fires only when a visitor
explicitly opens a service from a card or menu, or ticks it in the form.
No personal data, no new dependency.

Phase 9.5 records these first-party as part of the visitor journey
(`docs/marketing-attribution.md`):

- Viewing a service page (`/services/seo`) counts as *viewed* SEO; opening
  a service from a card or menu, ticking it, clicking its WhatsApp CTA or
  sending its form counts as *explicit* interest. The hub counts as none.
- WhatsApp buttons go through `/r/whatsapp/{context}`, which creates a
  WhatsApp intent with a reference at the end of the message ("… Ref:
  M7K4P2"). Sales searches the reference, confirms the conversation by
  hand and may link it to a lead. A click is never counted as a contact or
  a lead.
- A consultation lead's **Contact Purpose** is the page's own service when
  it is ticked; one topic is the purpose; several topics from the hub are
  "Multiple". An earlier WhatsApp intent about another service stays
  visible next to it.
- The dashboard (`/admin/marketing`) shows WhatsApp intents, form leads,
  qualified leads, top explicit interests and recent leads.

## 9. Pricing

Software pricing logic is untouched. Services say "Pricing depends on scope"
and invite "Discuss your requirements". No packages, retainers, percentages,
article prices or maklon MOQ until a commercial structure exists.

## 10. Evidence

The services may be offered: the business owner has asked for them. Claims
about **performance, history or credentials** need evidence first.

| Claim | Social | SEO | Ads | Branding | Status |
|---|---|---|---|---|---|
| The service is offered (discussion, scoping, delivery by agreement) | ✓ | ✓ | ✓ | ✓ | VERIFIED (owner request, Phase 9 brief) |
| Service areas listed on the page as areas we can discuss | ✓ | ✓ | ✓ | ✓ | VERIFIED as offering scope, NEEDS_CONFIRMATION per project |
| Years of experience, client count, portfolio, case studies | – | – | – | – | NEEDS_CONFIRMATION (none provided) |
| Follower, engagement, ranking, traffic, lead, sales, ROI or ROAS results | – | – | – | – | DO_NOT_CLAIM |
| Official platform partnership (Meta, Google, TikTok) or partner badges | – | – | ✓ | – | DO_NOT_CLAIM until verified |
| Certifications | – | – | – | – | NEEDS_CONFIRMATION |
| Trademark or legal registration | – | – | – | ✓ | DO_NOT_CLAIM (not offered) |
| Packages, prices, posting frequency | – | – | – | – | DO_NOT_CLAIM until commercial terms exist |

Maklon has its own register: `docs/product-maklon-evidence.md`. Since Phase 9.5 the public offer is VERIFIED ("We also accept product development and maklon inquiries for MLM and direct selling businesses.") and a public provider disclosure is not required by business decision; every specific stays a discussion topic.

## 11. Claim rules

The claims gate (`tests/support/claims.ts`) now also rejects, in English
and Indonesian: guaranteed followers, leads, sales, ROAS/ROI, rankings,
"page one", virality, brand recognition or trademarks; and for maklon,
certified factory, BPOM/Halal included, guaranteed approval, "any product",
unlimited capacity and fastest production. Visuals show concepts and sample
workflows, never results: no fake accounts, metrics, rankings, logos or
client brands.

## 12. Visual language

Same tokens and palette (navy `#041836`, blue `#005DFB`, azure `#0098F7`,
cyan `#06C8F5`), light and dark. Each service has its own concept:

| Service | Concept |
|---|---|
| Hub | Service ecosystem around the business, drawn like the network visuals |
| Social | Monthly content calendar: direction → themes → creative → copy → review → publish → learn |
| SEO | Search intent → topic → content → landing page → measurement, as a topic map |
| Ads | Campaign plan: objective → audience → creative → landing page → inquiry → measurement |
| Branding | Identity board for a fictional "Your Brand" (caption: example creative direction) |
| Maklon | Product journey with neutral "YOUR BRAND / PRODUCT CONCEPT" packaging |

No stock photography, no real or look-alike brands.

## 13. Brand name

The final name is still open (production blocker #13: logo "mlmsofts",
copy "mlmsoft"). Phase 9 and 9.5 do **not** rename anything. The name the site
prints is now centralised in `shared/brand.ts` (`MARKETING_BRAND_NAME`) and
used by SEO titles, the page title template, WhatsApp messages and email
settings. A test checks that every brand mention in the marketing copy
matches it. Remaining inconsistencies are listed in
`docs/production-blockers.md` (#13).

## 14. Where it lives

| Piece | Files |
|---|---|
| Services list, paths, lead sources | `shared/services.ts` |
| Brand name | `shared/brand.ts`, `start/view.ts` (Edge global) |
| Copy (EN / ID) | `inertia/i18n/{en,id}/services.ts`, nav and form copy in `common.ts` |
| Hub page | `inertia/pages/services/index.vue` + `components/services/hub_*.vue`, `service_ecosystem.vue` |
| Service pages | `inertia/pages/services/service.vue` + `components/services/service_*.vue`, `concepts/*.vue` |
| Homepage section | `components/services/services_home.vue` (after *Implementation*) |
| Lead form | `components/home/demo_request.vue` (`mode="consultation"`), `composables/lead_target.ts` |
| Lead storage | migration `1791000000000_add_service_interest_to_demo_requests.ts`, `config/leads.ts` |
| Admin | `inertia/pages/admin/demo_requests/{index,show}.vue` (Interest column, filter, Inquiry panel) |
| Emails | `app/mails/lead_email_data.ts`, `app/i18n/lead_confirmation.ts` |
| SEO | `config/seo.ts` (`services`, `services.<key>`) |
| Claims rules | `tests/support/claims.ts` (marketing, platform partner, branding, maklon; EN + ID) |
| Tests | `tests/functional/marketing/services.spec.ts`, `tests/functional/demo_requests/service_leads.spec.ts` |

Header widths were re-measured with the full WhatsApp label: five items fit
from 1280px in both languages, the secondary header link (Book a Demo or
Request a Consultation) from 1440px, and the menu takes over below 1280px.
