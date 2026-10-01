# Security evidence

Internal document (Phase 11). It records which security controls exist in
mlmsoft, for which scope, and on what evidence. Public pages may only name a
control whose row says **Public Claim Allowed: Yes**. The public Security page
reads them from `shared/security.ts`, and `tests/unit/security_evidence.spec.ts`
checks both against this table. Findings and fixes are in
`docs/security-audit.md`. Neither document is served by the site.

Last verified: 2026-10-01.

## Scopes

| Scope | What it covers |
|---|---|
| `MARKETING_SITE` | The public mlmsoft website: pages, lead forms, WhatsApp redirect, first-party tracking. |
| `INTERNAL_ADMIN` | The mlmsoft back office: staff accounts, leads, WhatsApp intents, marketing analytics. |
| `CUSTOMER_PLATFORM` | An MLM platform built for a customer. Not part of this application: its controls are defined by each implementation's scope and verified there. |

## Statuses

| Status | Meaning |
|---|---|
| `VERIFIED` | Implemented and proven by a test, a code check or a recorded verification run. |
| `CONFIG_DEPENDENT` | Implemented, but only effective when production is configured as documented (the dependency is named). |
| `PARTIALLY_VERIFIED` | Part of the control is proven; the rest is open (named in the row). |
| `PLANNED` | Decided, not built. |
| `NOT_VERIFIED` | Not implemented or not proven. Must not be claimed. |
| `NOT_APPLICABLE` | The surface does not exist in this application. |

**Public Claim Allowed** is `Yes` only for a `VERIFIED` row without an open
production dependency. Hashing is not encryption. Encryption at rest is
not claimed anywhere.

## Evidence

| ID | Control | Scope | Evidence | Status | Production Dependency | Public Claim Allowed |
|---|---|---|---|---|---|---|
| SEC-MKT-001 | CSRF protection on every state-changing request (lead forms, tracking events, sign-in, sign-out, back-office actions); no route is exempt | MARKETING_SITE | `config/shield.ts` (no exempt routes); `tests/functional/security/app_security.spec.ts` (Security \| CSRF); `tests/functional/demo_requests/store.spec.ts` | VERIFIED | None | Yes |
| SEC-MKT-002 | Server-side validation and length limits on every public input; unknown fields dropped; tracking metadata allowlisted | MARKETING_SITE | `app/validators/*`; `tests/functional/demo_requests/store.spec.ts`; `tests/functional/marketing/tracking.spec.ts`, `scenarios.spec.ts` (malicious metadata) | VERIFIED | None | Yes |
| SEC-MKT-003 | Abuse limits per client address on lead forms, tracking events, WhatsApp click recording and page-view recording | MARKETING_SITE | `start/limiter.ts`; `config/marketing_tracking.ts`; `tests/functional/security/app_security.spec.ts` (tracking caps); `tests/functional/demo_requests/store.spec.ts` | CONFIG_DEPENDENT | Correct client address behind the hosting proxy (`docs/production-blockers.md` #2) | No |
| SEC-MKT-004 | Browser security headers on every response: Content-Security-Policy (production), X-Frame-Options DENY, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, HSTS | MARKETING_SITE | `config/shield.ts`; `app/middleware/security_headers_middleware.ts`; `tests/functional/security/app_security.spec.ts` (response headers); production build check in `docs/security-audit.md` | VERIFIED | None | Yes |
| SEC-MKT-005 | Encryption in transit (HTTPS) | MARKETING_SITE | HSTS header and Secure cookies in production (`config/shield.ts`, `config/session.ts`); TLS is terminated by the hosting | CONFIG_DEPENDENT | TLS certificate and HTTPS redirect on the host (#20) | No |
| SEC-MKT-006 | No open redirect: the WhatsApp redirect always goes to wa.me with the configured number; "back" redirects stay on the site | MARKETING_SITE | `app/controllers/whatsapp_redirect_controller.ts`; `tests/functional/security/app_security.spec.ts` (redirects) | VERIFIED | None | Yes |
| SEC-MKT-007 | Production error pages show no technical detail; server-error messages are hidden in HTML and JSON | MARKETING_SITE | `app/exceptions/handler.ts`; `tests/unit/error_disclosure.spec.ts`; production build check | VERIFIED | None | Yes |
| SEC-MKT-008 | No public debug, diagnostic or test route; dotfiles are refused | MARKETING_SITE | `start/routes.ts`; `tests/functional/security/app_security.spec.ts` (public debug routes) | VERIFIED | None | Yes |
| SEC-MKT-009 | The deployment publishes only public assets (no server code, configuration or database) | MARKETING_SITE | Production build serves `build/public` only (production build check: `/package.json`, `/config/app.ts`, `/.env` answer 404) | CONFIG_DEPENDENT | Hostinger output directory must be `build/public` (#20): with `build`, the live site served compiled server files (`/package.json`, `/config/app.js`) on 2026-10-01; re-check after the next deploy | No |
| SEC-MKT-010 | No third-party tracking or advertising scripts: scripts load from the site itself only | MARKETING_SITE | CSP `script-src 'self'` (`config/shield.ts`); first-party tracking only (`docs/marketing-attribution.md`) | VERIFIED | None | Yes |
| SEC-MKT-011 | Pseudonymous first-party tracking: random visitor ID, no IP address and no personal data in tracking events (metadata allowlisted), Global Privacy Control and opt-out honoured | MARKETING_SITE | `app/services/marketing_tracker.ts`; `tests/functional/marketing/tracking.spec.ts`, `scenarios.spec.ts` (malicious metadata) | VERIFIED | None | Yes |
| SEC-MKT-012 | Lead personal data kept out of logs (info logs carry IDs only; failed queries log no values) | MARKETING_SITE | `config/database.ts` (`compileSqlOnError: false`); `tests/unit/error_disclosure.spec.ts` | VERIFIED | None | No |
| SEC-MKT-013 | Lead text cannot break out of the page data and blank the page | MARKETING_SITE | `start/view.ts`; `tests/functional/security/app_security.spec.ts` (page payload); production build check | VERIFIED | None | No |
| SEC-MKT-014 | Bot handling on lead forms (honeypot, duplicate-burst detection) and tracking (bot user agents ignored) | MARKETING_SITE | `tests/functional/demo_requests/store.spec.ts`; `tests/functional/marketing/tracking.spec.ts` | VERIFIED | None | No |
| SEC-MKT-015 | Multipart request bodies are not processed (nothing written to disk) | MARKETING_SITE | `config/bodyparser.ts`; `tests/functional/security/app_security.spec.ts` | VERIFIED | None | No |
| SEC-MKT-016 | File uploads | MARKETING_SITE | No upload feature exists | NOT_APPLICABLE | None | No |
| SEC-MKT-017 | Server-side requests to user-supplied URLs (SSRF) | MARKETING_SITE | No applicable current surface found: the application makes no outbound HTTP requests; mail goes to the configured SMTP host | NOT_APPLICABLE | None | No |
| SEC-MKT-018 | Inbound third-party webhooks | MARKETING_SITE | None exist; `/marketing/events` is a first-party, CSRF-protected endpoint | NOT_APPLICABLE | None | No |
| SEC-MKT-019 | Payments, wallets or money movement | MARKETING_SITE | None in this application | NOT_APPLICABLE | None | No |
| SEC-MKT-020 | Secrets only in the environment; `.env` and local databases never tracked | MARKETING_SITE | `config/*` read secrets from `start/env.ts`; `.gitignore`; `.env.example` (placeholders only); git index check (`docs/security-audit.md`) | VERIFIED | None | Yes |
| SEC-MKT-021 | No remote kill switch, remote code loading or runtime command execution | MARKETING_SITE | Code review (`docs/security-audit.md`) | VERIFIED | None | No |
| SEC-MKT-022 | Dependencies without known vulnerabilities | MARKETING_SITE | `npm audit`: 0 vulnerabilities on 2026-10-01 | VERIFIED | Re-run on every release | No |
| SEC-MKT-023 | Supported runtime (Node.js 24) | MARKETING_SITE | `package.json` engines | CONFIG_DEPENDENT | Node 24 selected on the host (#20) | No |
| SEC-MKT-024 | Production database on MySQL with separate credentials | MARKETING_SITE | `config/database.ts`; full suite on MySQL 9.6 (`docs/production-blockers.md` #17) | PARTIALLY_VERIFIED | MySQL 8.0 / hosting engine not yet run (#4, #17) | No |
| SEC-MKT-025 | Email authentication (SPF, DKIM, DMARC) for lead emails | MARKETING_SITE | Depends on the mail provider and DNS | CONFIG_DEPENDENT | Mail provider and DNS (#5) | No |
| SEC-MKT-026 | Encryption at rest | MARKETING_SITE | Not implemented by the application; depends on hosting storage | NOT_VERIFIED | Hosting | No |
| SEC-MKT-027 | Backups and tested restore | MARKETING_SITE | None recorded | NOT_VERIFIED | Backup schedule and a restore test (#6) | No |
| SEC-ADM-001 | Staff passwords stored as salted one-way hashes, never in plain text or logs | INTERNAL_ADMIN | `config/hash.ts`; `tests/functional/auth/create_user_command.spec.ts` | VERIFIED | None | Yes |
| SEC-ADM-002 | Sign-in: one message for every failure, timing-safe check, account lockout after repeated failures | INTERNAL_ADMIN | `app/controllers/session_controller.ts`; `tests/functional/auth/session.spec.ts` | CONFIG_DEPENDENT | Correct client address (#2): the lockout is per account and address | No |
| SEC-ADM-003 | Session renewed at sign-in; HttpOnly, SameSite and (production) Secure cookies | INTERNAL_ADMIN | `config/session.ts`; `tests/functional/auth/session.spec.ts`; production build check (real browser) | VERIFIED | None | Yes |
| SEC-ADM-004 | Signing out ends the session on the server | INTERNAL_ADMIN | Database session store (`database/migrations/1791300000000_create_sessions_table.ts`); production build check: a copied cookie stops working after sign-out | CONFIG_DEPENDENT | `SESSION_DRIVER=database` in production | No |
| SEC-ADM-005 | Role-based access to the back office, checked on the server for every page and action | INTERNAL_ADMIN | `app/abilities/main.ts`; `tests/functional/security/app_security.spec.ts` (role matrix); `tests/functional/admin/demo_requests.spec.ts` | VERIFIED | None | Yes |
| SEC-ADM-006 | Least privilege inside the back office: the marketing role sees analytics but no lead contact details or lead references | INTERNAL_ADMIN | `tests/functional/security/app_security.spec.ts`; `tests/functional/marketing/tracking.spec.ts` | VERIFIED | None | Yes |
| SEC-ADM-007 | WhatsApp references expire and only resolve for signed-in, authorised staff | INTERNAL_ADMIN | `config/marketing_tracking.ts` (`referenceDays`); `tests/functional/marketing/scenarios.spec.ts`, `tracking.spec.ts` | VERIFIED | None | Yes |
| SEC-ADM-008 | Lead status changes and notes recorded with the staff member and time | INTERNAL_ADMIN | `app/models/demo_request_activity.ts`; `tests/functional/admin/demo_requests.spec.ts` | VERIFIED | None | Yes |
| SEC-ADM-015 | A history of every back-office change | INTERNAL_ADMIN | Lead work is recorded (SEC-ADM-008); WhatsApp intent changes are not (`docs/security-audit.md` AUD-025) | PARTIALLY_VERIFIED | None | No |
| SEC-ADM-009 | No public sign-up in production; staff accounts created by an administrator | INTERNAL_ADMIN | `config/accounts.ts`; `commands/create_user.ts`; `tests/functional/auth/*` | VERIFIED | None | Yes |
| SEC-ADM-010 | Back-office pages are not cached, and page history is cleared after sign-out | INTERNAL_ADMIN | `app/middleware/auth_middleware.ts`; `tests/functional/security/app_security.spec.ts`; production build check | VERIFIED | None | No |
| SEC-ADM-011 | Password reset by email | INTERNAL_ADMIN | No reset flow exists (no password is ever sent by email) | NOT_APPLICABLE | None | No |
| SEC-ADM-012 | Remember-me sign-in | INTERNAL_ADMIN | Not offered | NOT_APPLICABLE | None | No |
| SEC-ADM-013 | Two-factor authentication | INTERNAL_ADMIN | Not implemented | NOT_VERIFIED | None | No |
| SEC-ADM-014 | Single sign-on | INTERNAL_ADMIN | Not implemented | NOT_VERIFIED | None | No |
| SEC-CUS-001 | Customer data isolation and access control | CUSTOMER_PLATFORM | Defined by implementation scope | NOT_VERIFIED | Per implementation | No |
| SEC-CUS-002 | Controls on member, wallet and payout data | CUSTOMER_PLATFORM | Defined by implementation scope | NOT_VERIFIED | Per implementation | No |
| SEC-CUS-003 | SSO and two-factor authentication | CUSTOMER_PLATFORM | Assessed during technical discovery | NOT_VERIFIED | Per implementation | No |
| SEC-CUS-004 | Integration credentials handling | CUSTOMER_PLATFORM | Defined by implementation scope (`docs/integration-evidence.md`) | NOT_VERIFIED | Per implementation | No |
| SEC-CUS-005 | Audit trail for financial operations | CUSTOMER_PLATFORM | Defined by implementation scope | NOT_VERIFIED | Per implementation | No |
| SEC-CUS-006 | Encryption at rest | CUSTOMER_PLATFORM | Confirmed as part of the deployment architecture | NOT_VERIFIED | Per implementation | No |
| SEC-CUS-007 | Backups and disaster recovery | CUSTOMER_PLATFORM | Confirmed as part of the deployment architecture | NOT_VERIFIED | Per implementation | No |
| SEC-CUS-008 | Infrastructure controls (hosting, network, monitoring) | CUSTOMER_PLATFORM | Confirmed as part of the deployment architecture | NOT_VERIFIED | Per implementation | No |
| SEC-CUS-009 | Compliance certification (e.g. SOC 2, ISO 27001) | CUSTOMER_PLATFORM | None held | NOT_VERIFIED | None | No |
