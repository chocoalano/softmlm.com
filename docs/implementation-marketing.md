# How We Do It: implementation marketing page

`/en/how-we-do-it` and `/id/how-we-do-it` explain how an mlmsoft
implementation runs, from the first conversation to support after launch.
It is a **process page**: it shows how scope is found and agreed, and never
promises a timeline, a migration result, an integration or a support level.

## Routes, navigation, SEO

| | |
|---|---|
| Routes | `/:locale/how-we-do-it` (route `marketing.how_we_do_it`, page `inertia/pages/how_we_do_it.vue`). `/how-we-do-it` → 301 `/en/how-we-do-it`, query string kept. |
| Shared module | `shared/implementation.ts`: path, tracking page (`how_we_do_it`), the nine phase keys and their anchors (`#phase-discover` …). |
| Header | "How We Do It" / "Cara Kami Bekerja" replaces the homepage *Integrations* anchor in the main nav, which moves to the Features menu ("On the homepage"). The nav keeps five items. The current page is marked with `aria-current="page"` (header and drawer). |
| Other entry points | Footer (Company → "How we do it"), homepage implementation section ("See how we work, phase by phase"). |
| SEO | EN "MLM Software Implementation Process \| mlmsoft", ID "Proses Implementasi Software MLM \| mlmsoft"; descriptions cover discovery, compensation plan mapping, migration, testing and launch. Canonical, hreflang (en, id, x-default) and `<html lang>` as on every page. No structured data yet. |
| Lead source | Demo form on the page sends `implementation_page`. |

## Page structure

| Section | Component | Notes |
|---|---|---|
| Hero | `implementation/imp_hero.vue` + `blueprint_canvas.vue` | Six-layer *Implementation Blueprint* (business model → member journey → sales flow → compensation rules → operations → technical blueprint), an ordered list with a caption. The orb is decoration only. |
| Problem | `imp_problem.vue` | Three causes: undocumented rules, teams describing one process differently, messy existing data. |
| Positioning | `imp_positioning.vue` | "Business first. Software second." Used once on the page. |
| Nine phases | `imp_phases.vue` | Discover, Blueprint, Configure, Integrate, Migrate, Test, Train, Launch, Support. Each phase: purpose, what we look at, the phase outcome. Blueprint adds a decision-map example; Configure splits requirements into existing capability / configuration / custom work; Integrate lists *potential* integration areas and a WhatsApp prompt; Migrate lists the data commonly considered. |
| ↳ Migration reality | `migration_reality.vue` (inside Migrate) | Extract → Understand → Clean → Map → Validate → Import → Reconcile, link to Pricing. |
| ↳ Compensation validation | `compensation_validation.vue` (inside Test) | Business rule → example transaction → expected outcome → system result → review → approval, as one worked example. Links to Compensation Plans and WhatsApp. |
| Responsibilities | `imp_responsibilities.vue` | What each side brings, in neutral wording. |
| Who joins discovery | `imp_discovery_team.vue` | Owner/sponsor, operations, finance, IT, compensation/network expert, each linking to its Who We Serve page (the expert to Compensation Plans). |
| Scope factors | `imp_scope.vue` | Nine factors, link to Pricing, and the timeline answer. |
| Migration band | `site/consult_cta.vue` | WhatsApp (migration) + "See Pricing" (the band's second button is configurable). |
| Readiness check | `imp_readiness.vue` | See below. |
| FAQ, final CTA, demo form | shared components | Ten questions; final CTA with "Discuss Your Project via WhatsApp" + Book a Demo. |

## Copy rules

The page describes a process. These sentences carry policy and stay as they are:

- "Migration scope depends on the source system, data quality, and agreed implementation requirements."
- "Training scope is defined based on the roles involved in the implementation."
- "Post-launch support scope is agreed as part of the implementation and commercial arrangement."
- "There is no single timeline that fits every project. The scope becomes clearer after discovery, …"
- Where a policy is not fixed: "The scope is agreed based on the implementation requirements."

Never on this page (or any other; the claims gate checks both languages):
guaranteed launch or migration, "any compensation plan", seamless migration,
zero downtime, instant implementation, go-live "in N weeks", automatic or
one-click migration, 24/7 or unlimited support, a dedicated manager, a support
SLA, "fully integrated" or "built-in integrations". The rules live in
`tests/support/claims.ts` (*implementation promise*, *timeline promise*,
*automatic migration claim*, *any plan claim*, *integration claim*, *support
promise*, each with an Indonesian twin). The honest negation "there is no
one-click migration" / "tidak ada migrasi sekali klik" is allowed.

Integration areas are always "Potential integration areas" / "Area integrasi
yang mungkin", assessed per project. The configure split never names a
capability as existing; it only describes the three groups.

## Indonesian conventions

- Phase labels: Pahami Bisnis, Blueprint Sistem, Konfigurasi, Integrasi,
  Migrasi, Pengujian, Training, Go-Live, Support. "Discovery" is "tahap
  memahami bisnis" in running text, never "penemuan".
- Billions are written out: `Rp12,48 miliar` (`useFormat().rupiahShort` and
  `scale('B')`). Millions stay `jt`, thousands `rb`.
- Phase 8 cleanup elsewhere: "Kondisi pemicu" instead of a bare "Pemicu" in the
  compensation page; "Lebih sedikit waktu untuk spreadsheet bonus" (matches the
  English "Less time on bonus spreadsheets"; the old line promised more).

## WhatsApp and analytics

| Context | Used by |
|---|---|
| `implementation_general` | Hero, readiness check, final CTA, demo panel, header, drawer, sticky bar |
| `migration` | Migration band |
| `integration_discovery` | Integrate phase |
| `compensation_validation` | Compensation validation block |

Messages are fixed per context and language (`config/marketing.ts`); nothing
the visitor types or ticks is added. Without a configured number every
button falls back to "Talk to our team" → the demo form on the page.
Clicks send `page=how_we_do_it`, the section (`hero`, `phase_integrate`,
`compensation_validation`, `migration_band`, `readiness`, `final_cta`, …),
the variant, the language and the colour scheme, nothing else.

## Readiness check

Six real checkboxes in a `<fieldset>`; the count and a short suggestion are
announced through `aria-live="polite"`. It runs in the browser only: no
storage, no request, no analytics event, and the WhatsApp message does not
change. The result never grades the project ("You already have useful inputs
for a discovery conversation." / "Some areas can be clarified during
discovery.").

## Responsive, accessibility, motion

- ≥ 1024px: a sticky rail lists the nine phases, follows the phase being read
  (`aria-current="step"`) and links to each anchor. Below 1024px the rail is
  hidden and the phases become a vertical flow with a line and a node per
  phase; every phase keeps the full width (no squeezed nine-step strip).
- All phase content is plain text in reading order; the rail is navigation
  on top of it. Headings: page H1, section H2, phase H3, embedded blocks H4.
- Motion: reveal on scroll and the canvas layers' entrance, both off under
  `prefers-reduced-motion` (content is visible without them).
- Phones: long button labels wrap inside the button (`site.css`) instead of
  overflowing; this applies site-wide.

## Header widths

With the full WhatsApp label the Indonesian header is the widest. Links never
wrap; the demo link shows from 1440px, the full nav from 1280px, and the menu
below that (`site_header.vue`).

## Tests

- `tests/functional/marketing/how_we_do_it.spec.ts`: both languages, SEO,
  legacy redirect, theme, WhatsApp contexts / no visitor data / fallback,
  analytics sanitising, readiness check stays in the browser, ID labels,
  internal links, lead attribution.
- `tests/unit/claims_gate.spec.ts`: invalid implementation promises (EN + ID)
  and the page's own wording as valid examples; the page's files are in the
  audited list.
- `tests/functional/marketing/site.spec.ts`: the page is a known marketing
  page, renders in both languages and its internal links resolve.

## For the Integrations page (done in Phase 10)

- Done: the Integrate phase links to `/integrations` ("See how integrations
  are planned"), with the same wording and the `integration_discovery`
  WhatsApp context (`docs/integrations-marketing.md`).
- The header has no room for a sixth item in Indonesian; Integrations should
  replace or join a menu, not be added as another top-level link.
- The page must stay on "potential areas, assessed per project" until each
  integration is verified in mlmsoft (`docs/capability-evidence.md`).
