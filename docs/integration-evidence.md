# Integration evidence

The evidence gate for every integration mlmsoft mentions in marketing,
product pages and sales material. Audit date: 2026-10-01 (Phase 10).
Companion to `docs/capability-evidence.md`; page rules are in
`docs/integrations-marketing.md`.

## Rules

| Status | Meaning | Public claim |
|---|---|---|
| `VERIFIED_IN_MLMSOFT` | Implemented in this repository and covered by tests. | Only what is verified, in factual wording. Internal tooling is never a product claim. |
| `VERIFIED_IN_REFERENCE_ONLY` | Implemented and wired end to end in a reference application. Not in mlmsoft. | Never "Integrated with X", "supports X" or a logo. It may inform architecture internally; publicly: "Existing systems and third-party services can be assessed during integration discovery." |
| `PARTIALLY_VERIFIED` | Parts exist in a reference application but the flow is incomplete, unused or unsafe. | Not shown. |
| `PLANNED` | On the mlmsoft roadmap, no implementation. | Not shown as a catalogue item. |
| `NOT_VERIFIED` | No evidence anywhere. | Not shown (or asked as a discovery question). |

A provider name in configuration, environment files, seed data, a dropdown,
a mockup, an SQL dump or a historical project is **not** evidence of an
mlmsoft integration.

**API and webhook wording.** mlmsoft has no public or partner API and no
webhook support. Its only JSON endpoints serve its own pages (the
first-party event collector `/marketing/events`, the lead form) and are not
an integration API. Public copy may explain what an API or a webhook is and
ask about them in discovery ("Is there an API or documentation for the
system?"); it may not say mlmsoft has, offers or supports them.

## Method and sources

Read-only audit of this repository and the three reference projects. No
reference code, migration, test or SQL was executed; nothing was changed.
Three agents audited one project each; the findings below were checked
against the files they cite. Credentials present in reference `.env` and
config files were noted, never copied.

| Source | Role |
|---|---|
| This repository (`mlmsoft.com`) | Marketing site, lead pipeline, first-party tracking and back office. No business-system integration code: no outbound HTTP client, no OAuth, no CSV import or export, no webhook receiver. |
| `/Users/ict/Documents/puranusa.id-projects/laravel-webstore` | Reference MLM webstore (Laravel 12, Filament). |
| `/Users/ict/Documents/Laravel/puranusa.id` | Reference MLM application (older). |
| `/Users/ict/Documents/Laravel/esas-tenancy` | Reference multi-tenant HR/payroll SaaS. Architecture patterns only, never MLM evidence. |

## Summary

| Category | VERIFIED in mlmsoft | Reference only | Planned / needs discovery |
|---|---|---|---|
| Payment | — | Hosted payment checkout and signed payment callbacks | Other gateways, refunds through the provider, settlement reconciliation |
| Banking / payout | — | Manual withdrawal workflow (not an integration) | Payout API, bank account validation, bank transfer files |
| Logistics | — | Shipping rates (two providers), shipment booking (one provider) | Tracking and status updates, other couriers |
| Accounting / finance | — | CSV/XLSX exports | Accounting connectors, reconciliation |
| Tax | — | Tax report exports (calculation only partial) | Tax authority systems |
| Messaging | WhatsApp click-to-chat on the marketing site; SMTP lead emails (internal) | Outbound WhatsApp API messages, internal chat alerts | Inbound WhatsApp, SMS, push, OTP |
| Identity | Back-office session login and roles (internal) | API tokens for the reference app's own clients, local two-factor login | SSO, OAuth, external identity providers |
| Data | — (internal endpoints only) | Private REST APIs, CSV/XLSX import, configurable outbound calls (partial) | Public API, webhooks, scheduled sync |
| Existing systems | — | — | ERP, CRM, warehouse, POS, marketplaces |

**No provider integration is `VERIFIED_IN_MLMSOFT`.** The Integrations page
therefore names no provider, shows no logo, and renders no "Available
integrations" section (`verifiedIntegrations` in `shared/integrations.ts`
is empty).

## Evidence matrix

| Integration Area | Provider/Protocol | Source | Evidence | mlmsoft Status | Public Claim Allowed |
|---|---|---|---|---|---|
| Payment gateway (hosted checkout) | Midtrans Snap | laravel-webstore; puranusa.id; esas-tenancy | webstore `app/Services/Payment/MidtransService.php`, `resources/js/composables/useMidtrans.ts`; puranusa `CheckoutController::createMultiItemMidtransPayment`; esas `app/Services/Central/Payment/PaymentService.php` (SaaS billing, idempotency key) | `VERIFIED_IN_REFERENCE_ONLY` | No |
| Virtual account, card, e-wallet, QRIS | Through the hosted checkout page only | laravel-webstore; puranusa.id | No channel-specific code; the channels are the provider's hosted page | `VERIFIED_IN_REFERENCE_ONLY` | No |
| Payment callback with signature check | Midtrans notification (SHA-512) | laravel-webstore; puranusa.id; esas-tenancy | webstore `MidtransCallbackService.php` (row lock, forward-only status, duplicate handling, tests); puranusa `CheckoutController::callback` (wallet top-up path has no duplicate guard); esas `MidtransWebhookController` (CSRF check still applies, so real callbacks are likely rejected) | `VERIFIED_IN_REFERENCE_ONLY` | No |
| Payment verification by polling | Midtrans status API | laravel-webstore; puranusa.id; esas-tenancy | Polling and callback paths disagree on side effects; no scheduled reconciliation | `PARTIALLY_VERIFIED` | No |
| Refund through the provider | Midtrans | all three | Refund status mapped from callbacks only; no refund API call | `PARTIALLY_VERIFIED` | No |
| Other payment gateways | Xendit, DOKU, Duitku, Tripay, iPaymu, Faspay, Stripe, PayPal | — | Not found (esas has dropdown labels only) | `NOT_VERIFIED` | No |
| Payout / disbursement API | Midtrans Iris | puranusa.id; laravel-webstore | puranusa `app/Services/MidtransService.php` is never called; webstore config only | `PARTIALLY_VERIFIED` | No |
| Commission withdrawal workflow | Internal workflow, manual bank transfer | laravel-webstore; puranusa.id | webstore `DashboardService::submitWalletWithdrawal`, `CustomerWithdrawalsTable`; puranusa `WithdrawalManagementController` | `VERIFIED_IN_REFERENCE_ONLY` (not an integration) | No |
| Bank account validation | — | — | Bank fields are free text | `NOT_VERIFIED` | No |
| Bank transfer files / host-to-host | — | esas-tenancy | `disbursement_*` tables exist; nothing writes them | `NOT_VERIFIED` | No |
| Shipping rates | RajaOngkir (Komerce) | puranusa.id | `app/Services/RajaOngkirService.php`, `app/Http/Controllers/Api/ShippingController.php` (public endpoint, no rate limit) | `VERIFIED_IN_REFERENCE_ONLY` | No |
| Shipping rates and shipment booking (waybill) | Lion Parcel | laravel-webstore | `app/Services/Shipping/LionParcelService.php` (tariff, booking), `OrdersTable` booking action | `VERIFIED_IN_REFERENCE_ONLY` | No |
| Region lists for addresses | RajaOngkir | laravel-webstore | `app/Services/RajaOngkirService.php` (lists only; cost call unused) | `PARTIALLY_VERIFIED` | No |
| Tracking and shipment status updates | — | — | Tracking numbers and statuses entered by hand | `NOT_VERIFIED` | No |
| Other couriers and aggregators | JNE, J&T, SiCepat, Biteship, KiriminAja | — | Labels in config only | `NOT_VERIFIED` | No |
| Accounting system connector | Jurnal (Mekari), Accurate Online, Xero | — | Not found | `NOT_VERIFIED` | No |
| Finance exports | CSV / XLSX / PDF files | laravel-webstore; puranusa.id; esas-tenancy | webstore Filament exporters; puranusa tax XLSX (`ReportController`); esas dashboard PDF | `VERIFIED_IN_REFERENCE_ONLY` | No |
| Settlement reconciliation | — | — | Not found | `NOT_VERIFIED` | No |
| Tax withholding calculation | Database procedure | puranusa.id dump | See `docs/capability-evidence.md` (externally triggered, no tests) | `PARTIALLY_VERIFIED` | No |
| Tax reports | XLSX export | puranusa.id | `ReportController` exports | `VERIFIED_IN_REFERENCE_ONLY` (internal) | No |
| Tax authority systems | e-Bupot / Coretax | — | Not found | `NOT_VERIFIED` | No |
| WhatsApp Business API, outbound | Qontak (Mekari) | laravel-webstore; puranusa.id | webstore `app/Services/QontactService.php`, broadcast job; puranusa `app/Services/QontakService.php`, notification jobs | `VERIFIED_IN_REFERENCE_ONLY` | No |
| WhatsApp inbound webhook | Qontak | laravel-webstore | `QontakIncomingWebhookController` (no authentication) | `PARTIALLY_VERIFIED` | No |
| WhatsApp click-to-chat on the marketing site | `wa.me` link through `/r/whatsapp/{context}` | mlmsoft | `app/controllers/whatsapp_redirect_controller.ts`, `app/services/whatsapp_intents.ts`; tracking and scenario tests | `VERIFIED_IN_MLMSOFT` | Contact channel only ("Consult via WhatsApp"); never "WhatsApp integration" |
| Email for lead notifications | SMTP (`@adonisjs/mail`) | mlmsoft | `app/services/lead_notifier.ts`; notification tests. Production SMTP is blocker #5 | `VERIFIED_IN_MLMSOFT` (internal) | No (internal tool) |
| Email for account emails | Framework mail | puranusa.id | Password reset and verification emails | `VERIFIED_IN_REFERENCE_ONLY` | No |
| SMS, OTP, push | — | — | Not found | `NOT_VERIFIED` | No |
| Internal chat alerts | Telegram bot | laravel-webstore | Bug-report alerts to the team | `VERIFIED_IN_REFERENCE_ONLY` (internal) | No |
| SSO / OAuth / external identity provider | — | — | Not found in any project | `NOT_VERIFIED` | No |
| API tokens for the app's own clients | Laravel Sanctum | laravel-webstore; esas-tenancy | webstore `routes/api.php`; esas mobile API | `VERIFIED_IN_REFERENCE_ONLY` | No |
| Two-factor login | Fortify, local TOTP | puranusa.id | Admin login | `VERIFIED_IN_REFERENCE_ONLY` | No |
| Back-office login and roles | Session login, role abilities | mlmsoft | `app/abilities/main.ts`, admin tests | `VERIFIED_IN_MLMSOFT` (internal) | No |
| Public or partner REST API | — | mlmsoft | No such API; reference APIs serve their own apps only | `NOT_VERIFIED` | No ("API" only as a discovery question) |
| Outbound webhooks / configurable outbound calls | Generic HTTP | esas-tenancy | `app/Models/Tenant/Shared/ApiIntegration.php`: two modules wired, synchronous, no retry, user-supplied URLs | `PARTIALLY_VERIFIED` | No |
| CSV/XLSX import | File import | laravel-webstore | Filament importers (shipping targets, withdrawals) | `VERIFIED_IN_REFERENCE_ONLY` | No |
| Scheduled sync with external systems | — | — | No scheduler job talks to an external system | `NOT_VERIFIED` | No |
| First-party event collector | Internal JSON endpoint | mlmsoft | `POST /marketing/events`; tracking tests | `VERIFIED_IN_MLMSOFT` (internal) | No (not an integration API) |
| ERP, CRM, warehouse, POS, marketplace | — | — | Not found | `NOT_VERIFIED` | No |
| Legacy database coupling | Shared database procedures | laravel-webstore; puranusa.id | Both apps call procedures defined outside their repositories | `PARTIALLY_VERIFIED` (pattern, not a connector) | No |

## Design lessons from the reference projects (internal)

Worth carrying over as patterns, re-implemented and tested in mlmsoft:

- Callback signature verification with constant-time comparison; reject
  everything when the secret is missing.
- Row locks and forward-only status transitions so a duplicate or late
  callback cannot reverse a paid order.
- An idempotency key on outbound payment requests, and reusing an open
  checkout instead of creating a second one.
- Logging every inbound callback (payload, outcome) for audit.
- Explicit timeouts, request IDs and tenant headers on outbound calls.

Mistakes to avoid:

- Trusting totals or shipping costs sent by the browser instead of
  re-quoting them on the server.
- Two confirmation paths (polling and callback) with different side effects.
- Unauthenticated inbound webhooks that change account state.
- Synchronous outbound calls without a queue, retry or outbox; URLs taken
  from user input without an allow-list.
- Credentials committed in views or config defaults.

Several security issues were found in the reference projects (outside
mlmsoft). They were reported to the owner and are not detailed here.
Nothing was changed in those projects.

## Provider names never used in public copy

Provider names from the audit and the market. None may appear in public
marketing copy (`tests/unit/integration_evidence.spec.ts` checks every file
the claims gate audits) unless a row above becomes `VERIFIED_IN_MLMSOFT`
with "Public Claim Allowed: Yes" and the provider is listed in
`verifiedIntegrations`.

`Midtrans` `Xendit` `DOKU` `Duitku` `Tripay` `iPaymu` `Faspay` `Stripe`
`PayPal` `GoPay` `OVO` `ShopeePay` `BCA` `BNI` `BRI` `Bank Mandiri`
`CIMB Niaga` `Iris` `JNE` `J&T` `SiCepat` `AnterAja` `Ninja Xpress`
`Lion Parcel` `RajaOngkir` `Komerce` `Biteship` `KiriminAja` `SAP`
`NetSuite` `Odoo` `Accurate Online` `Mekari` `Xero` `QuickBooks` `Qontak`
`Fonnte` `Wablas` `Twilio` `Zenziva` `Telegram` `Coretax` `e-Bupot`
`Tokopedia` `Shopee` `Lazada` `TikTok Shop`

WhatsApp is the marketing site's own contact channel and may be named as a
channel ("Possible channels include email, WhatsApp and SMS"), never as an
integration; Google, Meta and Instagram appear only in the growth services
context, under their own claim rules.
