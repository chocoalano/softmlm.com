# Security audit: Phase 11A

**Internal document.** It is not served by the site; the production build
check below confirms that `/docs/...` paths answer 404. It records findings and fixes
only: no secret, credential or exploitation steps. Controls and their public
status are in `docs/security-evidence.md`.

- **Date:** 2026-10-01.
- **Scope:** the mlmsoft application in this repository, which covers two
  scopes:
  - `MARKETING_SITE`: public pages, lead forms, WhatsApp redirect,
    first-party tracking;
  - `INTERNAL_ADMIN`: staff accounts and the back office.

  `CUSTOMER_PLATFORM` (MLM platforms built for customers) is not part of
  this code. Its controls are defined and verified per implementation.

## Method

1. Code review of routes, middleware, controllers, validators,
   configuration and templates.
2. An independent second review, whose findings are merged below.
3. Automated tests for each fixed finding.
4. A production build rehearsal:
   - a clean copy, `npm run build:hostinger`, a throwaway MySQL 9.6 server;
   - `node build/bin/server.js` run with environment variables only;
   - checked with curl and in headless Chromium.
5. `npm audit`.

Severity is one of CRITICAL, HIGH, MEDIUM, LOW, INFO.

## Exit gate

| Severity | Found | Fixed | Open |
|---|---|---|---|
| CRITICAL | 0 | 0 | 0 |
| HIGH | 0 | 0 | 0 |
| MEDIUM | 7 | 6 | 1 (configuration: AUD-014) |
| LOW | 10 | 7 | 3 |
| INFO | 11 | 2 | 9 |

No CRITICAL or HIGH finding is open. The open MEDIUM is a production
configuration item (`trustProxy`, blocker #2), not a code defect. Phase 11B
(the public Security page) may proceed.

## Findings

### Fixed

**AUD-001: No limit on failed sign-ins**

- **Scope:** INTERNAL_ADMIN
- **Severity:** MEDIUM
- **Evidence:** `SessionController.store` verified credentials without any
  attempt counter.
- **Impact:** Unlimited password guessing against staff accounts.
- **Recommendation:** Lock an account after repeated failures, and cap
  sign-in requests per client.
- **Status:** Fixed.
  - An account is locked after repeated failures (`config/accounts.ts`).
  - A per-address throttle sits on top (`start/limiter.ts`).
  - Every failure gets one generic message.
  - Tests: `tests/functional/auth/session.spec.ts`.

**AUD-002: Public sign-up open in production; staff emails discoverable**

- **Scope:** INTERNAL_ADMIN
- **Severity:** MEDIUM
- **Evidence:**
  - `/signup` was always available.
  - Its "email already taken" error revealed which addresses have accounts.
- **Impact:**
  - Anyone could create an account.
  - Staff email addresses could be enumerated.
- **Recommendation:** Disable public sign-up and create staff accounts
  through a controlled flow.
- **Status:** Fixed.
  - Off in production unless `PUBLIC_SIGNUP_ENABLED=true`; `/signup`
    answers 404 and the link is hidden.
  - `node ace users:create` creates accounts with a hidden, repeated
    password prompt (12+ characters) and lowercased email.
  - Tests: `tests/functional/auth/*`.
  - Blocker #1 is closed.

**AUD-003: Multipart bodies written to disk before any check**

- **Scope:** MARKETING_SITE
- **Severity:** MEDIUM
- **Evidence:** `config/bodyparser.ts` auto-processed multipart bodies up to
  20 MB into the temp directory. This ran before CSRF and rate limits, on
  every route.
- **Impact:** Unauthenticated requests could fill the server disk. The app
  has no upload feature.
- **Recommendation:** Do not process multipart bodies.
- **Status:** Fixed. `autoProcess: false`, limit 1 MB. Test:
  `tests/functional/security/app_security.spec.ts`.

**AUD-004: Unbounded tracking writes per client**

- **Scope:** MARKETING_SITE
- **Severity:** MEDIUM
- **Evidence:** Every page load could create rows without limit:
  - a cookie-less page load created a visitor, a visit and an event;
  - every WhatsApp click created an intent.

  All writes go through one in-process queue.
- **Impact:** Unbounded database growth. Delays on lead submissions that
  wait for the queue.
- **Recommendation:** Cap recording per client and keep serving the
  page.
- **Status:** Fixed.
  - Per-address caps on page views, new visitors and WhatsApp recording
    (`config/marketing_tracking.ts`).
  - Past a cap, or if the limiter store is down, the page and WhatsApp still
    work, unrecorded.
  - Tests: Security | tracking caps.
  - The caps depend on AUD-014.

**AUD-005: Hosting deployment would lose all data**

- **Scope:** MARKETING_SITE, INTERNAL_ADMIN
- **Severity:** MEDIUM
- **Evidence:**
  - Only a SQLite connection inside the app folder was configured.
  - Hostinger builds each deployment in a new folder.
- **Impact:** Leads, accounts and tracking would be lost at every deploy
  (an availability and integrity issue).
- **Recommendation:** Use MySQL from the environment and run migrations
  during the deploy.
- **Status:** Fixed in code.
  - `DB_CONNECTION=mysql` (`config/database.ts`).
  - `npm run build:hostinger` migrates.
  - Rehearsed on MySQL 9.6.
  - Database provisioning remains blocker #4.

**AUD-006: Sessions not revocable**

- **Scope:** INTERNAL_ADMIN
- **Severity:** MEDIUM
- **Evidence:** The cookie session store keeps the whole session in the
  cookie.
- **Impact:** A copied back-office cookie stayed valid after sign-out
  until it expired.
- **Recommendation:** Use a server-side session store in production.
- **Status:** Fixed (configuration).
  - A `sessions` table was added; production uses `SESSION_DRIVER=database`
    (`docs/production-startup.md`).
  - Production build check: a copied cookie works before sign-out and is
    refused after.

**AUD-007: Page data could break the page**

- **Scope:** INTERNAL_ADMIN
- **Severity:** LOW
- **Evidence:** The page payload escaped only `/`. Certain text in a lead
  field made the browser treat the rest of the page as part of the
  payload.
- **Impact:** A lead could make back-office pages render blank. No script
  ran.
- **Recommendation:** Escape `<`, `>` and `&` in the payload.
- **Status:** Fixed.
  - `start/view.ts`.
  - Test: Security | page payload.
  - Production build check with such a lead: page renders, text shown
    literally.

**AUD-008: Server-error messages returned to JSON clients**

- **Scope:** MARKETING_SITE, INTERNAL_ADMIN
- **Severity:** LOW
- **Evidence:** Outside debug mode, a 5xx JSON response carried the
  error's own message.
- **Impact:** Internal details (query text, paths) could reach a client.
- **Recommendation:** Return a generic message for 5xx.
- **Status:** Fixed.
  - `app/exceptions/handler.ts` hides 5xx messages in HTML, JSON and
    JSON:API; logs keep them.
  - Test: `tests/unit/error_disclosure.spec.ts`.

**AUD-009: Personal data in error logs**

- **Scope:** MARKETING_SITE
- **Severity:** LOW
- **Evidence:** A failed query's error message included its bound values
  (names, emails, phone numbers).
- **Impact:** Personal data in log files.
- **Recommendation:** Keep values out of query errors.
- **Status:** Fixed.
  - `compileSqlOnError: false`.
  - Test: `tests/unit/error_disclosure.spec.ts`.
  - Mail errors: see AUD-022.

**AUD-010: Missing browser security headers**

- **Scope:** MARKETING_SITE, INTERNAL_ADMIN
- **Severity:** LOW
- **Evidence:**
  - No CSP, Referrer-Policy or Permissions-Policy.
  - Shield headers were missing on static files and unknown routes.
- **Impact:** Less defence in depth against injected content; full URLs
  could leak in referrers.
- **Recommendation:** Add a strict production CSP and the missing headers on
  every response.
- **Status:** Fixed.
  - A middleware sets Referrer-Policy, Permissions-Policy, nosniff and
    frame denial on every response.
  - The production CSP allows only the site's own scripts and has no
    `unsafe-eval` and no wildcard.
  - Production build check in Chromium: no CSP violation on any public or
    back-office page, in either theme.
  - Remainder: AUD-018.

**AUD-011: Back-office data kept by the browser after sign-out**

- **Scope:** INTERNAL_ADMIN
- **Severity:** LOW
- **Evidence:**
  - No `Cache-Control` on signed-in pages.
  - Page data stayed in the browser history in plain form.
- **Impact:** On a shared computer, lead data could be reopened after
  sign-out.
- **Recommendation:** Send `no-store` and encrypt the page history.
- **Status:** Fixed.
  - `Cache-Control: no-store` on signed-in pages.
  - The page history is encrypted in production and cleared on the login
    page.
  - Tests, plus a production build check: Back after sign-out shows no
    lead.

**AUD-012: Weak account input rules**

- **Scope:** INTERNAL_ADMIN
- **Severity:** LOW
- **Evidence:**
  - Emails were compared as typed.
  - Passwords were capped at 32 characters.
  - The name had no length limit.
- **Impact:**
  - The same address could exist with different capitalisation.
  - Long passphrases were refused.
- **Recommendation:** Normalise emails, allow long passwords and bound the
  name.
- **Status:** Fixed. `app/validators/user.ts`; test "the email is compared
  trimmed and in lower case".

**AUD-013: Lead IDs visible to the marketing role**

- **Scope:** INTERNAL_ADMIN
- **Severity:** INFO
- **Evidence:** The intent detail page and journey text carried the linked
  lead's ID.
- **Impact:** Minor least-privilege gap. No contact details were exposed.
- **Recommendation:** Hide lead references from roles that cannot open
  leads.
- **Status:** Fixed. Test: "the marketing role never learns which lead an
  intent belongs to".

**AUD-026: Third-party promotion on the login page**

- **Scope:** INTERNAL_ADMIN
- **Severity:** INFO
- **Evidence:** The starter kit's sidebar linked to an external product.
- **Impact:** An unrelated external link on the staff login page.
- **Recommendation:** Remove it.
- **Status:** Fixed. `inertia/layouts/auth.vue` now shows a neutral staff
  note.

**AUD-028: The hosting CDN replaces the CSP header**

- **Scope:** MARKETING_SITE, INTERNAL_ADMIN
- **Severity:** LOW
- **Evidence:** On mlmsofts.com (2026-10-02) every response carries
  `Content-Security-Policy: upgrade-insecure-requests` and nothing else,
  also on unmatched routes that never reach shield. The app runs in
  production mode there (Secure cookies, `/signup` 404), so shield did send
  its policy: Hostinger's CDN (`server: hcdn`) overwrites the header. The
  other security headers pass through unchanged.
- **Impact:** On the live site nothing restricted scripts: an inline script
  injected into a page ran. Templates still escape output (no known XSS),
  so this is lost defence in depth.
- **Recommendation:** Deliver the policy in the page as well.
- **Status:** Fixed in code; to verify on the host after the next deploy.
  - Every page repeats the production policy as
    `<meta http-equiv="Content-Security-Policy">`, first in `<head>`
    (`cspMetaPolicy` in `config/shield.ts`, the same directives as the
    header except `frame-ancestors`, which a meta policy cannot carry;
    X-Frame-Options: DENY, which the CDN keeps, covers framing).
  - Test: "pages repeat the production CSP in a <meta>, ahead of every
    style and script".
  - Browser check (Chromium, the live pages and assets behind a local proxy
    that drops the header and adds the meta, as the next deploy will
    serve them): 11 pages in light at 1440px and dark at 390px, EN and ID,
    the 404 and a client-side navigation mount with no CSP violation or
    console error; an injected inline script is blocked. Without the meta,
    the same injected script runs.

### Open

**AUD-014: Client address behind the hosting proxy**

- **Scope:** MARKETING_SITE, INTERNAL_ADMIN
- **Severity:** MEDIUM
- **Evidence:** `trustProxy` is the framework default (loopback).
- **Impact:** Behind a non-local proxy, every visitor shares one address.
  All per-address limits then act site-wide:
  - lead forms;
  - sign-in lockout;
  - tracking caps;
  - lead IP hashes.
- **Recommendation:** Configure the real proxy ranges and test through the
  proxy.
- **Status:** Open, CONFIG_DEPENDENT. Production blocker #2.

**AUD-015: Confirmation email to any submitted address**

- **Scope:** MARKETING_SITE
- **Severity:** LOW
- **Evidence:** The lead form confirms by email to the address entered,
  repeating the submitted name and company.
- **Impact:** Limited misuse to send branded mail to third parties.
  Bounded by the form limits and duplicate detection.
- **Recommendation:** Leave submitted text out of the confirmation, or cap
  confirmations per recipient.
- **Status:** Open; accepted until the email copy is reviewed.

**AUD-016: Password hashing cost**

- **Scope:** INTERNAL_ADMIN
- **Severity:** LOW
- **Evidence:** The scrypt cost is the framework default, below current
  OWASP guidance.
- **Impact:** Faster offline guessing if password hashes leaked.
- **Recommendation:** Raise the cost after benchmarking on the production
  host. Existing hashes stay valid.
- **Status:** Open; benchmark first.

**AUD-017: Lockout keyed by account and address**

- **Scope:** INTERNAL_ADMIN
- **Severity:** LOW
- **Evidence:** The failure counter is per account and client address.
- **Impact:** Guessing from many addresses is limited only per address. A
  per-account-only lockout would let anyone lock staff out.
- **Recommendation:** Alert on repeated failures across addresses
  (monitoring, blocker #7).
- **Status:** Open; accepted trade-off.

**AUD-018: CSP allows inline styles; unknown routes have no CSP**

- **Scope:** MARKETING_SITE
- **Severity:** INFO
- **Evidence:** `style-src 'unsafe-inline'` is needed by:
  - the layout's first-paint style;
  - Vue style bindings;
  - the Inertia progress bar.

  The CSP is set by route middleware, so unmatched routes (404) do not get
  it. Scripts are unaffected.
- **Impact:** Small; style injection only.
- **Recommendation:** Move to nonces or hashes when the progress bar
  supports it.
- **Status:** Documented.

**AUD-019: Development CORS reflects any origin**

- **Scope:** MARKETING_SITE
- **Severity:** INFO
- **Evidence:** `config/cors.ts` in development.
- **Impact:** None in production. A publicly reachable development or
  staging server would be exposed.
- **Recommendation:** Staging runs with `NODE_ENV=production`.
- **Status:** Documented.

**AUD-020: HSTS without subdomains or preload**

- **Scope:** MARKETING_SITE
- **Severity:** INFO
- **Evidence:** `config/shield.ts`.
- **Impact:** Subdomains are not covered.
- **Recommendation:** Add `includeSubDomains` once every subdomain is
  HTTPS-only.
- **Status:** CONFIG_DEPENDENT.

**AUD-021: Google Fonts on every page**

- **Scope:** MARKETING_SITE
- **Severity:** INFO
- **Evidence:** The layout loads fonts from Google.
- **Impact:** Visitors' and staff addresses reach Google, which matters for
  the privacy notice (#16).
- **Recommendation:** Self-host the fonts.
- **Status:** Documented.

**AUD-022: Mail errors may name recipients**

- **Scope:** MARKETING_SITE
- **Severity:** INFO
- **Evidence:** A failed send is logged with the provider's error.
- **Impact:** A recipient address can appear in error logs.
- **Recommendation:** Log the error code only.
- **Status:** Documented.

**AUD-023: Lead IP hash keyed with the app key**

- **Scope:** MARKETING_SITE
- **Severity:** INFO
- **Evidence:** The HMAC uses `APP_KEY`.
- **Impact:** Rotating the app key changes every hash.
- **Recommendation:** Use a dedicated secret.
- **Status:** Documented.

**AUD-024: Rate-limit keys hold client addresses**

- **Scope:** MARKETING_SITE
- **Severity:** INFO
- **Evidence:** The limiter table keys contain the client address for the
  length of a window.
- **Impact:** Short-lived personal data.
- **Recommendation:** Mention it in the privacy notice (#16).
- **Status:** Documented.

**AUD-025: Un-marking a WhatsApp intent is not recorded**

- **Scope:** INTERNAL_ADMIN
- **Severity:** INFO
- **Evidence:** No activity row is written when sales removes "contacted".
- **Impact:** Gap in the activity history.
- **Recommendation:** Record intent changes in an activity log.
- **Status:** Documented.

**AUD-027: Development server serves project files**

- **Scope:** MARKETING_SITE
- **Severity:** INFO
- **Evidence:** Vite's development middleware answers source paths.
- **Impact:** Development only, bound to localhost. The production build
  serves `build/public` only (checked below).
- **Recommendation:** None.
- **Status:** Documented.

## Coverage

| Area | Result |
|---|---|
| Authentication | AUD-001, AUD-002, AUD-012 fixed. Sign-in is timing-safe with one message for all failures; the session is renewed at sign-in; remember-me is not offered; signing out needs a POST with CSRF. |
| Password reset | No reset flow. No password is ever sent by email (the anti-pattern is avoided). Staff accounts are created by an administrator. |
| Authorisation | Every back-office page and action is checked on the server. The role matrix is tested for guest, user, marketing, sales and admin. Single-tenant back office: no object owned by another tenant exists. |
| CSRF | On for POST, PUT, PATCH and DELETE with no exemptions. Every state-changing route is tested without a token. |
| CORS | Same-origin in production; development only reflects origins (AUD-019). |
| Sessions and cookies | HttpOnly and SameSite=Lax; Secure in production; 2-hour age; server-side store (AUD-006). |
| Proxy and client address | AUD-014 (blocker #2). |
| Rate limiting | Lead forms, events, sign-in, sign-up, WhatsApp and page-view recording. Keys depend on AUD-014. |
| Input validation | Server-side validators on every input. Unknown fields dropped. Arrays bounded. Tracking metadata allowlisted. |
| XSS | Templates escape output. No raw HTML rendering of user data. Page payload escaped (AUD-007). Scripts restricted by CSP. |
| SQL | Query builder and bound parameters only. Sort fields allowlisted. |
| SSRF | No applicable current surface found. |
| Open redirects | None: WhatsApp destination fixed; "back" redirects stay on the host. Tested. |
| Webhooks | None exist; none created. |
| Money and payments | Not applicable. |
| Idempotency | Duplicate lead bursts are detected (same email or phone within a window). No payment or other non-idempotent external call. |
| Secrets | Environment only. `.env` gitignored. `.env.example` has placeholders. No secret appears in this audit. |
| Git history | One commit (2026-10-01): no `.env`, database or key file tracked. A stale source archive is tracked (no secrets inside); `*.zip` is now ignored and the archive should be untracked. |
| Kill switch and remote code | None. No command execution, `eval` or remote fetches. |
| Debug and information disclosure | No debug routes. Production status pages show no stack trace. 5xx messages hidden (AUD-008). |
| Logging | Info logs carry IDs only; AUD-009 fixed; AUD-022 open. |
| Email | Recipients and SMTP from the environment. Headers encoded by the mailer. SPF, DKIM and DMARC depend on the provider (blocker #5). |
| Dependencies | `npm audit`: 0 vulnerabilities. Mail library kept at a patched version. |
| Runtime | Node.js 24 required (host setting). |
| Security headers and CSP | AUD-010 fixed; AUD-018 documented; AUD-028 fixed in code (CSP in the page, because the host's CDN replaces the header). |
| Uploads | None. Multipart bodies are not processed (AUD-003). |
| Tracking | First-party and anonymous; GPC and opt-out honoured; references resolve only for authorised staff; caps (AUD-004). |
| Privacy | A privacy notice is required before launch (blocker #16). |
| Bots and abuse | Honeypot, duplicate detection, bot user agents ignored by tracking, caps. |
| Database | MySQL connection from the environment. Suite passes on MySQL 9.6. MySQL 8.0 and the host's engine are not yet run (#4, #17). |
| Backup and disaster recovery | NOT_VERIFIED (#6). No claim. |
| Encryption | In transit: CONFIG_DEPENDENT (TLS at the host; HSTS and Secure cookies in production). At rest: not claimed. Password hashing is not encryption. |
| Audit log | Lead work recorded with user and time; AUD-025 open. |

## Production build check (2026-10-01)

**Setup:**

- A clean copy of the source; no `.env`, environment variables only;
  `NODE_ENV=production`.
- `npm run build:hostinger`: install, build, all migrations on MySQL 9.6.
- `node build/bin/server.js` started from the source root.

**Results:**

- **Routes.**
  - Home, pages and login answer 200; unknown pages 404, with no stack
    trace.
  - `/signup` answers 404.
  - `/package.json`, `/config/app.ts`, `/.env`, `/.git/config`, the
    source paths and `/docs/security-audit.md` answer 404.
- **Headers.** CSP, X-Frame-Options, nosniff, Referrer-Policy,
  Permissions-Policy and HSTS are present. Cookies are Secure and HttpOnly
  (except the CSRF token cookie, which scripts read by design).
- **Browser check (Chromium).** 10 public pages in light and dark, the 404
  page, sign-in and five back-office pages:
  - no CSP violation;
  - no console error apart from the expected 404 document;
  - the session ID changes at sign-in;
  - the sign-up link is hidden;
  - signed-in responses carry `no-store`;
  - a lead with hostile text renders literally;
  - Back after sign-out shows no lead;
  - with the database session store, a copied cookie is refused after
    sign-out.
- **Accounts.** `users:create` works with a hidden prompt; a mixed-case
  email signs in.

## Live host check (2026-10-02)

The deployment live on mlmsofts.com that day (output `build/public`; it
serves the `public/server.cjs` stub, so it is `8d09a2b` or later; the exact
commit is visible in hPanel only). Read-only requests: HEAD for the
exposure probes, GET for pages.

- **Server files.** `/package.json`, `/config/app.js`, `/start/env.js`,
  `/bin/server.js`, `/app/`, `/config/`, `/database/`, `/tests/` and
  `/docs/security-audit.md` answer 404; `/.env` answers 403. The only
  non-asset file served is the documented `/server.cjs` startup stub (one
  `require`, no configuration).
- **Pages.** All 48 sitemap URLs answer 200 with HSTS, X-Frame-Options
  DENY, nosniff and Referrer-Policy; HTML is not cached by the CDN
  (`x-hcdn-cache-status: DYNAMIC`). Cookies are Secure, HttpOnly
  (except the CSRF token cookie) and SameSite=Lax.
- **CSP.** Replaced by the CDN: AUD-028.
- **Not checked from outside:** the Node.js version, the database engine,
  sign-in and sign-out, the forms and mail (`docs/production-deployment.md`,
  smoke test).
