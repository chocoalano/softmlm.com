# Feature page strategy (Phase 7B)

A dedicated feature page is only built when it helps a business owner
understand a business problem and makes them more likely to contact
mlmsoft. A page must have at least one strong reason: a distinct search
intent, a large owner question, a marketing differentiator, or a need as a
campaign landing page. Pages are never created to fill a menu.

Inputs audited: the homepage (feature explorer, network, commerce and wallet
sections), `/compensation-plans`, `/pricing`, the five role pages under
`/who-we-serve`, and `docs/capability-evidence.md`.

**Evidence baseline.** mlmsoft has no compensation, network, wallet or
commerce engine in this repository. Every feature page therefore describes
the business need, how we approach it, the workflow we design and an
interface concept with sample data. It never states that a capability is
implemented today.

## Decisions

| Candidate | Decision | Reason | Search intent | Evidence status |
|---|---|---|---|---|
| Compensation Engine | **Merge** into `/compensation-plans` | `/compensation-plans` already covers architectures, the rule builder concept, qualification, ranks, overrides, simulation, versioning, reversal and wallet/tax. A second page would be ~80% duplicate. | "MLM compensation plan software", "sistem bonus MLM" — already served | Reference only (`VERIFIED_IN_REFERENCE_ONLY` / `PLANNED`) |
| Network Management | **Create** `/{locale}/features/network-management` | Owners ask "where is my network growing and where is it stalling?" Distinct intent from compensation: genealogy, sponsor/placement structure, growth visibility. Differentiator: business visibility rather than a tree tutorial. | "MLM genealogy software", "software jaringan MLM", "struktur jaringan binary" | Reference only (sponsor/placement tables in reference apps); not in mlmsoft |
| Ecommerce | **Create** `/{locale}/features/ecommerce` | A frequent owner question in Indonesia is how orders, member pricing and stockists fit with the plan. The angle is the commerce flow of a network business, not a generic online shop. Useful as an ads landing page. | "website MLM", "toko online MLM", "ecommerce direct selling" | Reference only (webstore checkout in reference app); not in mlmsoft |
| Wallet & Payout | **Create** `/{locale}/features/wallet-payout` | Payout disputes and unclear balances are a top trust problem for distributors and finance. Distinct from the Finance role page (which is about the finance team's whole workflow): this page is about the payout rules a business sets and what members see. | "e-wallet MLM", "sistem penarikan bonus", "payout komisi MLM" | Reference only (wallet rows, withdrawal flows in reference app); not in mlmsoft |
| Member Management | **Defer** | Its core (one member record: registration, verification, sponsor context, support history) is already the angle of the Operations role page and its member-view concept; sponsor/placement context belongs to Network Management. A separate page today would duplicate both. "Member management" as a search term is also dominated by club/membership software. Revisit when ads data shows demand or the member module is verified. | Ambiguous ("member management system") | Not in mlmsoft |
| Reward & Loyalty | **Defer** | No verified or reference implementation audited, no distinct owner question beyond a homepage tab. A page now would be thin and speculative. | Weak | `NOT_VERIFIED` |
| Analytics | **Defer** | Would invite promises of live, predictive or AI analytics that do not exist. The owner overview concept already lives on the Owners & Executives page and the homepage command center. | Generic, high risk of over-promising | `NOT_VERIFIED` |
| Distributor / Mobile Experience | **Merge** into `/{locale}/who-we-serve/distributors` | The role page already covers the member journey, experience areas and the member app concept. A mobile page would repeat it. The role page is authoritative and is listed in the features menu. | "aplikasi member MLM", "distributor app" — served by the role page | `NOT_VERIFIED` |

## Features overview

`/{locale}/features` is built because four real destinations exist
(compensation plans, network management, ecommerce, wallet & payout) plus
the distributor experience page. It is an overview grouped by business area,
opening with "Start with the problem you need to solve." — not a menu grid.

## Pages created

Every page follows the same story, with its own copy, problems and visual:

Hero → recognisable business problem → why it gets harder as the network
grows → how mlmsoft approaches it → workflow → interface concept (one
caption: "Interface concept · sample data" / "Konsep tampilan · data
contoh") → business outcomes → related teams → implementation
considerations → FAQ → WhatsApp CTA → Book a Demo.

| Page | Audience | Primary problem | Primary CTA (WhatsApp) | Evidence-safe positioning |
|---|---|---|---|---|
| Network Management | Owners, operations | "I can't see where the network is growing, stalling or at risk." | Discuss your network structure | Visibility and structure are designed with you; the network view is a concept with sample data. |
| Ecommerce | Owners, operations, finance | "Orders, member prices and stockists don't line up with the plan." | Discuss your commerce flow | We map how an order should move through your business rules; nothing is described as automated. |
| Wallet & Payout | Owners, finance | "Members don't understand their balance, and finance can't explain a payout quickly." | Discuss your payout workflow | Payout rules, statuses and approvals are designed with finance; tax is set by the client's advisor. |

WhatsApp messages have their own contexts (`network`, `ecommerce`,
`wallet`) in both languages; leads from these pages use the `feature_page`
source.

## Navigation

The header "Features" menu lists only pages that exist: the three feature
pages, Compensation Plans, Distributor Experience and the overview. The
homepage feature explorer keeps its module tabs; deferred modules have no
menu entry and no dead link.
