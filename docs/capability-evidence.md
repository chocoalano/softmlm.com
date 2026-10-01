# Capability evidence

The evidence gate for every capability mlmsoft mentions in marketing,
product pages and sales material. Audit date: 2026-09-30.

## Rules

| Status | Meaning | Marketing allowed |
|---|---|---|
| `VERIFIED_IN_mlmsoft` | Implemented in this repository **and** covered by tests. | Active wording ("Configure…", "Every lead…"). Still no unproven qualifiers. |
| `VERIFIED_IN_REFERENCE_ONLY` | Implemented and wired into a real flow in a reference application; logic readable in code or the production SQL dump. Not executed by us, not in mlmsoft. | Design direction only: "Designed for…". Never "available", "supports", "includes". |
| `PARTIALLY_VERIFIED` | Parts exist in a reference application but the flow is incomplete, broken, or depends on something outside the repositories (e.g. an external cron). | "Planned" only. |
| `PLANNED` | On the mlmsoft roadmap, no implementation evidence. | "Planned", "Early access", or not shown. |
| `NOT_VERIFIED` | No evidence found anywhere. | Not shown (or "Planned" if it is on the roadmap). |

Words not allowed unless the capability is `VERIFIED_IN_mlmsoft` **and** the
specific quality is proven: *supports, includes, built-in, fully automated,
secure, enterprise-grade, unlimited, real-time, compliant*.

## Method and sources

Read-only audit. No reference code, tests, migrations or SQL were executed and
no reference database was touched. Two agents audited the repositories
independently; key claims were then spot-checked by hand (procedure count and
signatures in the dump, call sites, hardcoded pairing values, refund handling).

| Source | Role | Notes |
|---|---|---|
| `/Users/ict/Documents/Laravel/puranusa.id` | Reference implementation (older) | Laravel + Vue. Contains a legacy PHP engine (`app/Services/MLMService.php`) reachable only from admin forms, and a production SQL dump. |
| `/Users/ict/Documents/puranusa.id-projects/laravel-webstore` | Reference implementation (newer rewrite) | Laravel 12 + Filament 5. Calls the same database procedures; contains **no** formulas. |
| `puranusa.id/sql_backup/production_puranusa (5).sql` | Where the running engine actually lives | MariaDB 10.11 dump dated 2026-02-26: 40 stored procedures, 2 triggers, 2 views. Not versioned in any repository. |
| `/Users/ict/Documents/Laravel/esas-tenancy` | Separate reference architecture | Not audited for compensation. Never evidence for mlmsoft multi-tenancy. |
| This repository (`mlmsoft.com`) | mlmsoft | Marketing site, lead pipeline and lead admin. **No compensation, network, wallet or tax code.** |

## Key findings

1. **mlmsoft has no compensation engine yet.** Every compensation, network,
   wallet and tax capability is at most `VERIFIED_IN_REFERENCE_ONLY` and may
   only be described as a design direction.
2. **The reference engine lives in unversioned stored procedures.** Both
   Laravel apps only snapshot per-order bonus components (`products.b_*` ×
   qty onto the order) and call `sp_bonus_engine_run` / `sp_registration`.
   Migrations do not create these procedures nor many of the columns they use.
3. **Daily settlement is triggered from outside the repositories.**
   `sp_generate_bonus` (rolls pending bonuses into `customer_bonuses`, runs
   PPh 21 and wallet posting) has no scheduler, job, command or MySQL EVENT in
   any repository or in the dump, yet dump data shows it ran.
4. **No automated test exercises any bonus calculation.** Existing tests cover
   component sums, placement and withdrawals with procedures mocked.
5. **Formulas are mostly hardcoded** (pairing 350000 per pair / 20000 bonus,
   matching 25–100 %, rank threshold 10,000,000 and 2 recruits, PPh 21
   brackets). Only per-product and per-package amounts are configurable, with
   no effective dates or versioning.
6. **No reversal exists.** Refunds and cancellations change the order status
   only; bonuses, omzet and wallet postings stay.

## Evidence matrix: compensation

| Capability | Source | Evidence | mlmsoft Status | Marketing Allowed |
|---|---|---|---|---|
| Sponsor / direct referral bonus | Dump `sp_bonus_sponsor` (L715), `sp_bonus_sponsor_placement` (L737); webstore `CheckoutService::calculateCartBonusAmounts`, `EloquentCheckoutRepository::callBonusEngine`; puranusa `CheckoutController` (L313, L788, L1190, L1388) | Fixed IDR per product (`products.b_sponsor` × qty → `orders.sponsor_amount`), one level to `sponsor_id`, pending row (status 0). Wired to checkout, Midtrans webhook and placement. No test of the payout. | `VERIFIED_IN_REFERENCE_ONLY` | Design direction only |
| Binary pairing | Dump `sp_bonus_pairing` (L459, called with `350000, 20000` at L681/L1740), `sp_update_group_omzet`, trigger `tr_customer_update_package` | Upline walk with row locks; pairs = ⌊min(L,R)/350000⌋ capped by `max_daily_pairing − daily_pairing`; 20000 per pair; remainder carries over (no flush). Daily cap from package `flush_out` (15/50/100). Values hardcoded in the call. No tests. | `VERIFIED_IN_REFERENCE_ONLY` | Design direction only |
| Matching (rank-based override with compression) | Dump `sp_bonus_matching` (L308), `sp_bonus_matching_placement` (L384) | Base `orders.match_amount`; sponsor-chain walk paying by rank with compression (Associate 25 %, Senior 50/25 %, Executive 75/50/25 %, Director 100/75/50/25 %), stops at Director. Defects: rank string written into tinyint `level` (lost), loop guard never checked. No tests. | `VERIFIED_IN_REFERENCE_ONLY` | Design direction only |
| Retail bonus | Dump `sp_bonus_retail` (L693), `sp_accumulation_stockist_retail_amount_orders` (L28); webstore `CheckoutService::syncOrderRetailAndStockistAmounts` | Pays `retail_amount` to the sponsor for planB orders. puranusa computes the amount only in the single-product checkout path; webstore calls the accumulation procedure but swallows errors. `stockist_amount` is never paid. Admin "release" only flips status (removes it from settlement). | `PARTIALLY_VERIFIED` | Planned only |
| Cashback | Dump `sp_bonus_cashback` (L266), `sp_generate_bonus_cashback` (L843) | planB orders: `orders.cashback_amount` (Σ `b_cashback` × qty) to the buyer, pending then settled. No tests. | `VERIFIED_IN_REFERENCE_ONLY` | Design direction only |
| Lifetime / promotion rewards | Dump `sp_generate_reward_plana` (L1019); puranusa `CustomerLifetimeRewardController::claim`; webstore `DashboardService::formatLifetimeRewardsData` | Group volume accumulates per reward period (`rewards` has start/end dates). Achievement never set by any procedure; claim is manual (puranusa) or display-only (webstore); "release" never credits the wallet. | `PARTIALLY_VERIFIED` | Planned only |
| Rank / qualification | Dump `sp_update_group_omzet` (L1996), `sp_update_group_omzet_placement` (L2131); trigger `trg_update_status_after_omzet` | Unranked → Associate at group omzet ≥ 10,000,000 and ≥ 2 directs; next ranks need ≥ 2 directs at exactly the previous rank. No periods, maintenance, downgrade or history. Engine gated on member status 3 (active). Hardcoded. No tests. | `VERIFIED_IN_REFERENCE_ONLY` | Design direction only |
| Genealogy / network (binary placement + sponsor generations) | Dump `sp_registration` (L1415); webstore `DashboardService::placeMember`, `NetworkService`, `customer_networks`, `customer_network_matrixes`; tests `DashboardPlacementStoredProcedureTest`, `DashboardNetworkTreeDepthLimitTest` and others | Placement with row locks, then `sp_registration` builds ancestor rows. Tests exist but mock the procedure. Placement commits before the procedure runs (no rollback if it fails). | `VERIFIED_IN_REFERENCE_ONLY` | Design direction only |
| Wallet posting of bonuses | Dump `sp_ewallet` (L760), `sp_generate_bonus` (L810); webstore `CustomerWalletTransaction`, `Customer::addBalance` | Settlement credits `customers.ewallet_saldo` (gross minus tax) and writes `bonus` + `tax` rows with before/after balances. Triggered externally; balance is a mutable column, not derived from the ledger; re-running a date would credit twice; PHP release paths post as `topup`. | `PARTIALLY_VERIFIED` | Planned only |
| Wallet top-up / withdrawal ledger | webstore `MidtransCallbackService::processWalletTopup`, `DashboardService::submitWalletWithdrawal`, `CustomerWithdrawalsTable` approve/reject; 9 test files | Locked updates with before/after balances and status transitions; covered by tests. Admins/importer can still write rows with hand-typed balances; checkout with wallet balance writes no `purchase` row. | `VERIFIED_IN_REFERENCE_ONLY` | Design direction only |
| Bonus reversal on refund / cancel / return | puranusa `OrderController::adminCancel`, `ReturnRefundController::processRefund`; webstore `MidtransCallbackService` (L199–200) | **Absent.** Status changes only; bonuses, omzet, wallet and stock are not reversed. | `PLANNED` (not in any source) | Planned only |
| Tax / PPh 21 withholding | Dump `sp_pph21` (L1060), `sp_pph21_report` (L1251), views `vw_customer_bonus_pph21`, `vw_customer_tax_report`; webstore tax reports | 50 % of gross as base, progressive 5/15/25/30 % on cumulative PKP, NPWP holders forced to PTKP 0; withholding deducted in `sp_ewallet`. Hardcoded (incl. withholder name). Monthly report reads the wrong table; view exposes negative values. Externally triggered. No tests. | `PARTIALLY_VERIFIED` | Planned only |
| Settlement / period close | Dump `sp_generate_bonus` (L810) | Exists, but nothing in any repository triggers it. | `PARTIALLY_VERIFIED` | Planned only |
| Rule configuration | `products.b_*`, `customer_package` (webstore `PaketMemberSettings::save`), `rewards` | Per-product/per-package amounts editable in place; components snapshotted onto each order. Formulas and percentages hardcoded in procedures. | `PARTIALLY_VERIFIED` | Planned only |
| Versioned rules with effective dates | — | Not found (only `rewards` has start/end dates). | `PLANNED` | Planned only |
| Commission simulation before publishing | — | Not found. | `PLANNED` | Planned only |
| Idempotent bonus generation | webstore `markOrderBonusGenerated`, SQLSTATE 45000 comment | `orders.bonus_generated` flag set before the procedure runs; failures leave it set; client polling and webhook can race. | `PARTIALLY_VERIFIED` | Not shown |
| Bonus audit trail | Filament CRUD on bonus rows | Admins can create/edit/delete bonus rows without an audit trail. | `NOT_VERIFIED` | Not shown |

### Compensation patterns (for `/compensation-plans`)

| Pattern | Evidence | mlmsoft Status | Marketing Allowed |
|---|---|---|---|
| Binary | Pairing + placement in reference | `VERIFIED_IN_REFERENCE_ONLY` | Design direction |
| Generation / rank-based override | Rank-compressed matching in reference | `VERIFIED_IN_REFERENCE_ONLY` | Design direction |
| Hybrid (e.g. binary + matching + retail/cashback plans) | planA / planB split in reference | `VERIFIED_IN_REFERENCE_ONLY` | Design direction |
| Unilevel | Not found (sponsor-generation rows exist, no unilevel payout) | `PLANNED` | Planned only |
| Matrix (forced width/depth) | Not found (`customer_network_matrixes` is sponsor generations, not a forced matrix) | `PLANNED` | Planned only |
| Stairstep / breakaway | Not found | `PLANNED` | Planned only |
| Board, Australian | Not found | `NOT_VERIFIED` | Not shown |
| Custom rules from building blocks | Not found (formulas hardcoded) | `PLANNED` | Planned only |

## Evidence matrix: capabilities verified in mlmsoft

| Capability | Evidence | mlmsoft Status | Marketing Allowed |
|---|---|---|---|
| Book a Demo lead capture with server-side validation, honeypot and duplicate-burst protection | `app/controllers/demo_requests_controller.ts`, `app/services/demo_request_service.ts`; `tests/functional/demo_requests/store.spec.ts` (14 tests) | `VERIFIED_IN_mlmsoft` | Yes (factual wording) |
| Server-side rate limiting of lead forms | `start/limiter.ts`; rate-limit tests | `VERIFIED_IN_mlmsoft` (per-IP correctness in production depends on `trustProxy`, a production blocker) | Internal only until the proxy is configured |
| Lead attribution (landing page, referrer, UTM) and estimator snapshots | `app/middleware/capture_attribution_middleware.ts`; attribution tests | `VERIFIED_IN_mlmsoft` | Yes |
| Lead management back office with role-based access and history | `app/controllers/admin_demo_requests_controller.ts`, `app/abilities/main.ts`; `tests/functional/admin/demo_requests.spec.ts` (18 tests) | `VERIFIED_IN_mlmsoft` | Internal tool, not a product claim |
| Lead email notifications with failure recording | `app/services/lead_notifier.ts`; `tests/functional/demo_requests/notifications.spec.ts` (7 tests) | `VERIFIED_IN_mlmsoft` (durable queue is a production blocker) | Internal tool, not a product claim |

## Technical capabilities (IT page, Phase 6)

`/who-we-serve/it-teams` discusses these as **questions we evaluate** with a
client's IT team. None of them exists in mlmsoft today, so none may be
described as available. The claims gate fails possession wording such as
"includes SSO", "has a REST API" or "webhooks are available".

| Capability | Evidence | mlmsoft Status | Marketing Allowed |
|---|---|---|---|
| SSO / sign-in with company accounts | None | `NOT_VERIFIED` | As a question only |
| Two-factor authentication | None | `NOT_VERIFIED` | As a question only |
| Encryption at rest | None | `NOT_VERIFIED` | As a question only |
| Disaster recovery | Backups + restore test are production blocker #6 | `PLANNED` | Not claimed until a restore test is recorded |
| Multi-tenancy | `esas-tenancy` is a separate reference, never evidence | `NOT_VERIFIED` | Not shown |
| Public API / webhooks | None (see `docs/integration-evidence.md`) | `NOT_VERIFIED` | As a question only ("Which systems need to exchange data?") |
| Horizontal scalability | None | `NOT_VERIFIED` | Not shown |
| Role-based access to the lead back office | `User.canManageLeads`; admin tests | `VERIFIED_IN_mlmsoft` (internal tool) | Not a product claim |

## Feature pages (Phase 7B)

`/features/network-management`, `/features/ecommerce` and
`/features/wallet-payout` describe business needs, our approach, the
workflow we design and an interface concept with sample data, in English
and Indonesian. Network, commerce and wallet capabilities remain
`VERIFIED_IN_REFERENCE_ONLY` at best; none is described as implemented.
Deferred pages (member management, rewards, analytics) and the reasons are
in `docs/feature-page-strategy.md`.

## Reuse assessment

Worth carrying over as **design ideas** (to be re-implemented and tested in
mlmsoft, not ported):

- Snapshotting per-order bonus components onto the order, so later product
  edits never change existing orders.
- Pending → settled bonus rows, and per-member daily bonus summaries.
- Daily pairing cap by package, carry-over of unpaired volume.
- Rank-based override with compression.
- Wallet rows with before/after balances; locked withdrawal flows.

Not to be ported as-is:

- Stored procedures that live only in a database dump, with no tests.
- Hardcoded rates and thresholds; in-place edits without effective dates.
- Mutable balance columns that can drift from the ledger; float arithmetic in PHP.
- The `bonus_generated` flag pattern (set before success, races between paths).
- Missing reversal; tax report reading the wrong table.

## Recommendation for the mlmsoft engine (roadmap, not implemented)

1. Rules as versioned data with effective dates; every posting references the
   rule version that produced it.
2. Engine in application code with deterministic, idempotent postings keyed by
   (source event, rule version, beneficiary).
3. Money in integer minor units or fixed-precision decimal end to end.
4. Append-only ledger; balances derived from it (or reconciled against it).
5. Reversal as compensating postings for refunds, cancellations and returns.
6. Settlement and period close as scheduled jobs on the durable queue.
7. Golden-scenario tests built from anonymised reference cases, plus a
   parallel-run comparison against reference outputs before any migration.

## Security observation (outside mlmsoft, not acted on)

`/Users/ict/Documents/Laravel/puranusa.id/sql_backup/production_puranusa (5).sql`
is an unencrypted production dump that includes a `customers` table with
national ID numbers (NIK), names, email addresses, phone numbers, addresses,
password column and wallet balances. It is not tracked by git. It should be
moved to encrypted storage or removed according to the data-retention policy
of its owner. Nothing was changed.
