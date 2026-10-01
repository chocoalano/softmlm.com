# Visitor journey and lead attribution

Phase 9.5 (and its addendum) adds first-party, anonymous tracking to the
marketing site so sales and marketing can answer, for every lead and every
WhatsApp click: **what is this person contacting us about, where did they
come from, and what did they look at before contacting us?** It also gives
marketing directional numbers: visitors, sources, campaigns, explicit
interest, WhatsApp intents and forms.

No third-party pixel, no fingerprinting, no session replay, no IP address
as an identifier, and no personal data in the tracking tables. A visitor
stays anonymous unless they submit a form themselves.

## 1. Definitions

```text
Visitor → Intent → Lead → Qualified → Converted → Customer
```

| Term | Meaning | Where it lives |
|---|---|---|
| **Visitor** | One browser, identified by a random UUID in the first-party cookie `mlmsoft_visitor` (90 days). Not a person: the same person on a phone and a laptop is two visitors; a cleared cookie starts a new visitor. | `marketing_visitors` |
| **Visit** (session) | A run of activity by one visitor. Ends after **30 minutes without activity**, or when the visitor arrives through a **different campaign** (new `utm_source`/`utm_medium`/`utm_campaign`). Cookie `mlmsoft_visit`. | `marketing_sessions` |
| **Event** | Something meaningful the visitor did (list in §4). | `marketing_events` |
| **Intent** | A WhatsApp CTA click, with its reference ("Ref: M7K4P2"). Says WhatsApp was opened and about what. **Not a lead**, not a conversation. | `marketing_whatsapp_intents` |
| **Lead** | A form submission with contact details. Linked to the visitor and visit it was sent from, with a frozen attribution snapshot. | `demo_requests` |
| **Qualified / Converted** | Lead statuses set by sales. Tracking never changes a status. | `demo_requests.status` |
| **Customer** | **Not defined yet.** A lead in status `converted` is *not* shown or counted as a customer: the business has not defined when a converted lead becomes a customer (signed contract? first payment? go-live?). No customer record exists until that definition is written down (CRM phase). | – |

Terminology in the admin: **Visitor Journey**, **Acquisition**, **Contact
Purpose**, **WhatsApp intent**. A WhatsApp click is a **click**, never a
contact.

## 2. First touch, last session and the lead snapshot

- **First touch** is stored once on the visitor when it is created and is
  never overwritten: first landing page, external referrer (origin + path
  only), UTM source / medium / campaign, first language.
- **Every visit** stores its own touch: landing page, referrer, all five
  UTM tags, language, device category (desktop / tablet / mobile).
- **Direct never overwrites a campaign.** A visitor who first came from
  Instagram Ads and later returns directly keeps *First touch: Instagram
  Ads*; the later visit shows *Last session: Direct*.
- **Attribution snapshot.** When a lead is created, its acquisition is
  frozen in `demo_requests.attribution_snapshot`: first touch (source,
  medium, campaign, referrer host, landing page, time), last session
  (all five UTM tags as well), conversion page, the visitor's short id and
  the WhatsApp references of the same browser. The lead page and the sales
  email read the snapshot, not today's tracking tables, so a later cleanup
  of anonymous data never rewrites how a lead was acquired. A lead's UTM
  columns keep the last session's tags, as before.
- Without tracking (switched off, opted out, bot), the snapshot holds only
  the last touch from the visit's own attribution cookie.
- Only paths are stored. Query strings (which can carry an email in a
  campaign link) are never stored; UTM values are cut to 200 characters.

### Source labels

Shown instead of raw URLs, by fixed rules:

| Arrived through | Shown as | Kind |
|---|---|---|
| UTM with a paid medium (`cpc`, `ppc`, `paid`, `paid_social`, `ads`, `display`, …) | "Instagram Ads", "Google Ads" | Paid |
| UTM, other medium | "Newsletter · email" | Campaign |
| Search engine referrer | "google.com" | Organic search |
| Social referrer | "instagram.com" | Social |
| Other site | "example.com" | Referral |
| A visit that started from another page of this site (the previous visit timed out) | "Internal" | Internal |
| Nothing | "Direct" | Direct |

The sanitized referrer (origin + path) is still stored on the visit for
reference. Internal starts are stored as the referrer host `(internal)`.

### Campaign parameters

All five UTM tags are kept. **Ad click ids (`gclid`, `fbclid`, `ttclid`)
are deliberately not stored in Phase 9.5**: they are identifiers issued by
ad platforms, useful only for sending conversions back to those platforms
(third-party enrichment), which is out of scope. Because only paths are
stored, they are dropped with the rest of the query string. If a later
phase needs them (e.g. Google Ads offline conversions), they must be
treated as attribution identifiers: stored per visit, covered by the
privacy notice and by the anonymous retention period, never shown in the
admin.

## 3. WhatsApp intents and the reference token

- **Every active WhatsApp CTA** goes through `/r/whatsapp/{context}`. When
  tracking is allowed, the server creates the intent and its reference and
  records the click, then redirects (302) to `wa.me/{configured number}`.
  The destination is built from the central marketing configuration only:
  unknown context → 404, WhatsApp disabled → 404 (the button falls back to
  the form), the request's query string is never forwarded, `no-store`,
  `noindex`. Not an open redirect.
- **Message:** the reference goes at the end, so it does not disturb the
  conversation:
  - EN: "Hi mlmsoft, I'd like to discuss product maklon for our business. Ref: M7K4P2"
  - ID: "Halo mlmsoft, saya ingin konsultasi mengenai maklon produk. Ref: M7K4P2"
- **The reference:** 6 characters from an alphabet without look-alikes (no
  I, L, O, 0, 1), generated on the server with a cryptographic random
  generator (about 887 million values), unique, not sequential, and
  unrelated to any id, the visitor UUID or any personal data. It is an
  attribution reference only, never an access token.
- **Stored per intent:** reference, visitor, visit, click event, WhatsApp
  context, page, section, language, interest, the first touch and the
  click's visit touch (frozen), `clicked_at`, `expires_at`, and what sales
  did: `contacted_at`/`contacted_by`, linked lead, `link_method`
  (`same_visitor` or `manual`), `linked_at`/`linked_by`. The visitor's
  WhatsApp number is never known to the site and never stored.
- **Expiry:** `MARKETING_REFERENCE_EXPIRY_DAYS` (default 30). After it, a
  reference no longer opens the anonymous journey behind it, unless sales
  already confirmed it or linked it to a lead (it is part of a sales record
  by then).
- **A click is not a contact.** The site cannot know whether a message was
  sent. The event is `whatsapp_marketing_click`; there is no automatic
  "contacted" state and a click never changes a lead's status.
- **Tracking off:** WhatsApp works the same, without a reference and
  without a record.

### Sales flow when a message quotes a reference

1. Paste the reference into the back-office search box (top bar), the
   lead list search, the visitor search or the WhatsApp intents list:
   "M7K4P2", "m7k4p2" and "Ref: M7K4P2" all work.
2. The intent page shows: **WhatsApp intent** (e.g. Product Maklon),
   **First touch** (Instagram Ads), **Campaign**, **Landing page**, **Also
   viewed**, **WhatsApp click** (time, page), **Lead** ("Not linked yet").
3. Verify that the conversation really exists in WhatsApp.
4. Optionally **link it to an existing lead** by its number (never creates
   a lead). The lead's history records the link.
5. **Mark as contacted** (admin and sales only; undoable).

If the person never sent a form, no lead is created from the click and no
name or number is invented. Entering contact details learned in the
conversation must be an explicit sales action (planned for the CRM phase:
"create lead from conversation"), never an inference from tracking.

When the same browser later sends a form, its open (unexpired) WhatsApp
intents are linked to that lead automatically (`same_visitor`). Other
browsers are never matched.

### Future: WhatsApp Business Platform

With the official API (Cloud API webhooks), an incoming message containing
"Ref: M7K4P2" could set the intent's conversation automatically
(`whatsapp_conversation_started`), with the same intent table and no change
to attribution. Needs: a verified business account, a webhook endpoint,
message templates, consent wording, and a decision on storing message
content (recommended: none, only "a conversation started").

## 4. Events

| Event | Recorded by | Interest | Explicit? | Metadata (allowlist) |
|---|---|---|---|---|
| `page_view` | Server (marketing pages, GET 200; not partial reloads, prefetch, or the redirect back after a form) | From the path | No (viewed) | – |
| `whatsapp_marketing_click` | Server (`/r/whatsapp/{context}`) | From the WhatsApp context | **Yes** | `context`, `variant` |
| `service_interest` | Browser (service card or menu opened, topic ticked) | Service | **Yes** | – |
| `feature_interest` | Browser (feature card or menu opened) | Feature | **Yes** | – |
| `pricing_completed` | Browser (estimate shown) | Always `pricing` | **Yes** | `mode` |
| `demo_form_submitted` / `consultation_form_submitted` | Server (after the lead is saved) | The lead's contact purpose | **Yes** | `form`, `source` |
| `pricing_started` | Browser (first real answer) | Always `pricing` | No | `mode` |
| `demo_form_started` / `consultation_form_started` | Browser (first focus in the form) | Preselected service, if any | No | – |
| `language_changed` | Browser | – | No | `from`, `to` |

**Integration interest** (Phase 10, `/integrations`): viewing the page is
*viewed*; opening it from a menu, card or contextual link
(`feature_interest` with `integration`), the `integration_discovery`
WhatsApp CTA (an intent with a reference) and the integration consultation
form (purpose Integration) are *explicit*. Viewing the IT role page alone is
not an integration interest.

**Security interest** (Phase 11, `/security`; label *Security & Access*):
viewing the page is *viewed*; opening it from the footer, the homepage
security section, the IT role page, Integrations or How We Do It
(`feature_interest` with `security`), the `security_review` WhatsApp CTA (an
intent with a reference) and the security consultation form (purpose
Security & Access, topics in `service_details.securityTopics`) are
*explicit*. Viewing the IT role page alone is not a security interest.

**Explicit interest** means the visitor clicked a CTA, chose a service or
feature, completed the needs estimate or sent a form. Everything else only
shows what they **viewed**. The admin keeps the two apart ("Explicit
interest: Product Maklon · Also viewed: Branding, Pricing").

Browser events go to `POST /marketing/events`: sent right away with
`keepalive` (events of the same moment in one request), so a menu or card
click that leaves the page still delivers its event; requests sent from
`pagehide` are not reliably delivered and serve only as a safety net.
CSRF-protected, rate limited (60 per minute per client), at most 20 events
per request, always answered with 204. The server accepts them only from a
browser that already has a visitor cookie; interests are checked per event
and anything outside the allowlist is dropped. The existing `track()` hook
still feeds `window.dataLayer` with the same sanitised values.

## 5. Contact Purpose

One normalized purpose per lead: Software, Compensation, Network,
Ecommerce, Wallet & Payout, Pricing, Implementation, Migration,
Integration, Social Media, SEO, Paid Advertising, Branding, Product Maklon,
Multiple. Derived by fixed rules (`app/services/contact_purpose.ts`),
never scored:

1. **The form decides.** Topics ticked in a consultation form: on a service
   page whose own service is among them, that service is the purpose and
   the others are "Also". One topic is the purpose. Several topics with no
   page to decide between them → **Multiple**, all listed.
2. Otherwise the form's source: compensation page → Compensation; pricing
   page or estimator → Pricing; How We Do It → Implementation; a feature
   page → that feature; anything else → Software.
3. Modules ticked and an estimate replacing the current system add
   Compensation, Network, Ecommerce, Wallet & Payout, Integration or
   Migration as "Also".

**Form submission takes priority, history is kept.** A visitor who clicked
the Maklon WhatsApp CTA and later sent a Branding consultation has the
purpose *Branding*; the lead page still shows *Earlier WhatsApp intent:
Product Maklon · Ref …* and the journey lists both explicit interests.

Browsing alone never sets a purpose: anonymous visitors show an explicit
interest only when they acted on one, otherwise "Viewed …".

## 6. Admin

Access: **admin**, **sales** and **marketing** (`viewMarketing`). The
`marketing` role sees reports, anonymous journeys and WhatsApp intents, but
**no lead contact details** and no sales actions (`manageLeads` is admin and
sales only).

- **Search box** (top bar): a reference opens its intent; anything else
  searches leads (admin, sales) or visitors (marketing).
- **Lead detail:** *Contact purpose* (purpose, also, form, page, time,
  explicit interest, also viewed, earlier WhatsApp intents), *WhatsApp
  intents* linked to the lead, *Acquisition* from the snapshot (first
  touch, last session, conversion), *Visitor journey* as milestones.
- **WhatsApp intents** (`/admin/marketing/whatsapp`): reference, time,
  interest, landing page, campaign, language, conversation confirmed?,
  linked lead?; filters for both. Separate from Leads: an intent is not a
  lead.
- **Marketing** (`/admin/marketing`), actionable first, for Today / 7 / 30 /
  90 days: Visitors, WhatsApp intents, Form leads, Qualified leads; Top
  sources, Top landing pages, Top explicit interests, Top campaigns;
  Recent leads (purpose, first source, status); the funnel (visitors →
  explicit interest → WhatsApp → form); conversion by page. No page-view or
  visit totals on the dashboard.
- **Visitors** (`/admin/marketing/visitors`): anonymous rows ("Anonymous
  visitor 3f9a1c2e"), never a name; explicit interest in bold, otherwise
  "Viewed …"; WhatsApp intents; lead links for admin and sales.

### Reading the journey

Milestones, not raw events:

```text
First visit → Explored → Explicit interest → WhatsApp click → Form submission → Sales contact
```

Each shows its time and a line or two ("Instagram Ads · maklon_september",
"3 pages in 2 visits", "Product Maklon (WhatsApp)", "Product Maklon · Ref
M7K4P2 · not confirmed", "Consultation form · Branding", "WhatsApp
conversation confirmed by sales"). Deterministic, no AI. The raw event log
stays collapsed under the milestones, for debugging only.

**Numbers are directional.** Blocked cookies, private windows, several
devices, ad blockers and bots not caught by the filter all skew them.

### Timezone

Timestamps are stored in UTC. The back office shows every date in the
business timezone, `BUSINESS_TIMEZONE` (default `Asia/Jakarta`), whatever
the viewer's device, and "Today" and each period start at midnight in that
timezone. No attribution or conversion logic depends on the display
timezone.

## 7. Privacy boundary

- **Never stored in tracking tables:** name, email, phone (including the
  visitor's WhatsApp number), address, NIK, company, message, passwords,
  tokens, IP address, full user agent, query strings (including ad click
  ids), form contents (typed or draft). Metadata keys are allowlisted per
  event on both the browser and the server; tests send name, email, phone,
  address, NIK, password, token and oversized JSON and assert that none is
  stored.
- The visitor cookie is HttpOnly, signed, `SameSite=Lax`, `Secure` in
  production. It holds a random UUID only.
- A lead links to its visitor only through the cookie of the browser that
  sent the form. Other visitors are never matched to a lead.
- **A reference is not an access token.** Every lookup (search, intent
  page, journey) needs a signed-in admin, sales or marketing user; there
  is no public route that shows anything behind a reference (tested).
- **Switching off:**
  - `MARKETING_TRACKING_ENABLED=false`: no cookies, no visitors, visits,
    events or intents. Pages, WhatsApp (without a reference) and forms
    work as usual, with no console errors (tested and checked in a
    browser).
  - Global Privacy Control (`Sec-GPC: 1`): the visitor is not tracked.
  - Opt-out cookie `mlmsoft_tracking=off`: the visitor is not tracked. Set by
    the analytics switch on the Privacy Notice (`/en/privacy#choices`,
    `POST /privacy/tracking`, Phase 12B): turning it off also drops the
    visitor and visit cookies; turning it back on clears the opt-out cookie.
- **Bots:** obvious crawlers, link previewers (including WhatsApp's), uptime
  monitors, scripts and headless browsers are not tracked.
- **Internal traffic:** not excluded yet. Office IPs are deliberately not
  hardcoded. Ways to add it later without redesign: staff set the opt-out
  cookie (works today, e.g. from a bookmarklet), skip tracking for requests
  with a signed-in staff session, or a configured internal cookie.
- **Never blocks the visitor:** page-view writes run in the background,
  browser events are fire-and-forget, and every failure is logged and
  swallowed. A WhatsApp click still redirects and a form still saves when
  tracking fails.

## 8. Retention

- `MARKETING_ANONYMOUS_RETENTION_DAYS` (default **365**, changeable without
  a code change) for anonymous tracking data.
- `node ace marketing:cleanup` is a **dry run** by default; `--apply`
  deletes; `--days=N` overrides (minimum 30). It deletes, in one
  transaction, WhatsApp intents never confirmed or linked, events, visits
  and visitors older than the cutoff. It **never** touches a visitor
  linked to a lead (nor its visits and events), a confirmed or linked
  intent, a lead, or a lead's attribution snapshot.
- Not scheduled yet (production blocker #18).

## 9. Emails to sales

The new-lead email carries the purpose, first source, first campaign, first
landing page, last source, last campaign, page sent from, WhatsApp
references and language, from the snapshot, plus a link to the lead. The
full journey stays in the admin: emails are forwarded and archived.

## 10. CRM status recommendation (not migrated)

Current statuses: New, Contacted, Qualified, Demo scheduled, Converted,
Closed, Spam. Recommended for the CRM phase, with a controlled migration:

```text
new → contacted → qualified → meeting_scheduled → proposal_sent → won / lost
                                                          (+ spam)
```

- `meeting_scheduled` replaces `demo_scheduled` (service leads do not book
  a software demo; keep the meeting type as a field).
- `proposal_sent` because every service is priced by scope.
- `won` / `lost` instead of `converted` / `closed`.
- WhatsApp stays an intent with its own confirmation, never a lead status.
- A **customer** record only after the business defines it (see §1).

## 11. Database

| Table | Key columns | Indexes |
|---|---|---|
| `marketing_visitors` | `visitor_uuid` (unique), first touch, `first_seen_at`, `last_seen_at` | `last_seen_at`, `first_utm_source`, `first_utm_campaign` |
| `marketing_sessions` | `visitor_id` (FK, cascade), `session_uuid` (unique), touch, `started_at`, `last_activity_at` | (`visitor_id`, `started_at`), `started_at`, `utm_source`, `utm_campaign`, `referrer_host` |
| `marketing_events` | `visitor_id` (FK, cascade), `session_id` (FK, set null), `event_name`, `page`, `section`, `locale`, `theme`, `interest_category`, `metadata` (JSON), `occurred_at` | (`visitor_id`, `occurred_at`), `session_id`, (`event_name`, `occurred_at`), `occurred_at`, `interest_category` |
| `marketing_whatsapp_intents` | `reference` (unique), `visitor_id`/`session_id`/`event_id` (FK, set null), context, page, section, locale, interest, `attribution` (JSON), `clicked_at`, `expires_at`, `contacted_at`/`contacted_by`, `demo_request_id` (FK, set null), `link_method`, `linked_at`/`linked_by` | `clicked_at`, `visitor_id`, `demo_request_id`, `contacted_at`, `interest_category` |
| `demo_requests` (+4) | `marketing_visitor_id` (indexed), `marketing_session_id`, `conversion_page`, `attribution_snapshot` (JSON) | – |

Migrations: `1791100000000_create_marketing_tracking_tables`,
`1791200000000_create_whatsapp_intents_and_lead_attribution_snapshot`
(moves the reference from events to intents). The largest index is a
`varchar(255)` column: 1,020 bytes in utf8mb4, under MySQL's 3,072-byte
limit.

Portable SQL only (COUNT, COUNT DISTINCT, COALESCE, CASE, GROUP BY, `NOT IN`
with a non-null subquery). The one dialect-specific query is the Phase 9
lead interest filter (`JSON_LENGTH` / `JSON_CONTAINS` on MySQL). All
migrations (up and down) and the full test suite pass on SQLite and on a
throwaway **MySQL 9.6** instance; MySQL **8.0** itself is still to be run
(production blocker #17).

**Performance.** List pages (leads, visitors, WhatsApp intents, overview)
use aggregate queries and never load raw event history; a test checks that
their number of queries stays the same whatever the number of rows. The raw
event log is loaded only on a visitor, lead or intent detail page (latest
400 events, 80 shown).

## 12. Where it lives

| Piece | Files |
|---|---|
| Settings | `config/marketing_tracking.ts`, `config/business.ts`; env `MARKETING_TRACKING_ENABLED`, `MARKETING_ANONYMOUS_RETENTION_DAYS`, `MARKETING_REFERENCE_EXPIRY_DAYS`, `BUSINESS_TIMEZONE` |
| Event names, interests, types | `shared/tracking.ts`, `shared/journey.ts` |
| Visitor, visit, events | `app/services/marketing_tracker.ts`, `app/middleware/track_visit_middleware.ts` |
| Browser events | `inertia/composables/first_party_tracking.ts`, `shared/analytics.ts`, `app/controllers/marketing_events_controller.ts`, `app/validators/marketing_event.ts` |
| WhatsApp intents | `app/services/whatsapp_intents.ts`, `app/controllers/whatsapp_redirect_controller.ts`, `app/controllers/admin_whatsapp_intents_controller.ts`, `inertia/components/site/marketing_whatsapp_cta.vue` |
| Purpose, journey, reports | `app/services/contact_purpose.ts`, `app/services/marketing_journey.ts`, `app/services/marketing_reports.ts` |
| Admin | `app/controllers/admin_marketing_controller.ts`, `app/controllers/admin_search_controller.ts`, `inertia/pages/admin/marketing/*`, `inertia/components/admin/{visitor_journey,touch_details}.vue`, `inertia/pages/admin/demo_requests/{index,show}.vue` |
| Roles | `config/roles.ts` (`marketing`), `app/abilities/main.ts` (`viewMarketing`) |
| Retention | `commands/marketing_cleanup.ts` |
| Tests | `tests/functional/marketing/tracking.spec.ts`, `tests/functional/marketing/scenarios.spec.ts` (scenarios A–E, sales actions, security, query counts), `tests/unit/analytics.spec.ts` |
