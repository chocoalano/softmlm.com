# Integrations page: marketing strategy

`/en/integrations` and `/id/integrations` (Phase 10). Evidence:
`docs/integration-evidence.md`.

## Objective

A marketing page about **integration readiness, discovery and system
architecture** for business owners, operations, finance and IT evaluators.
It answers the owner's question "If we already use a payment gateway, a
bank, a courier, accounting software, WhatsApp or our own systems, how does
mlmsoft fit in?" with:

> We start by mapping the systems you already use, which data needs to
> move, which system is the source of truth, and which parts need to be
> integrated.

It is not an integration marketplace, a connector catalogue, a logo wall,
a generic API platform or developer documentation. Integrations stay part
of the software and implementation proposition.

What an owner should take away: connecting systems is more than plugging
in an API. What IT should take away: the team understands source of truth,
authentication, failure, retry, reconciliation and external dependencies.
What nobody should take away: that mlmsoft already integrates with every
provider.

## Claim boundaries

- No provider integration is verified in mlmsoft
  (`docs/integration-evidence.md`). The page therefore names no provider and
  shows no logo. A test checks every public file against the provider list
  in the evidence document.
- Areas are **discussed**, methods are **assessed per project**:
  "Common integration areas we discuss", "The exact integration method
  depends on the systems, providers and technical access available in your
  project."
- Examples (payment, logistics, finance, messaging) are labelled conceptual
  and describe the questions a flow raises, never an existing connector.
- Patterns (immediate, scheduled, manual import/export, event-driven) are
  "considered during solution design", not capabilities. "Real-time" is not
  used: the claims gate treats it as an unproven quality; the page says
  "Immediate".
- Security, failure handling and observability are methodology: no queue,
  retry, alerting or security control is described as existing (the durable
  queue is still production blocker #3).
- No timeline and no integration price. Factors are listed; pricing links to
  `/pricing`.
- The claims gate rejects, in English and Indonesian: integrates with
  all/every, ready-made or pre-built integrations/connectors, plug and play,
  one-click integration, built-in integrations, supported payment gateways,
  all major couriers, native integration, seamless integration, "connects to
  any system", *terintegrasi dengan semua*, *siap pakai*, *tinggal
  sambungkan*, *sekali klik*, *semua payment gateway*, *semua ekspedisi*,
  *integrasi bawaan*, *langsung terhubung*.

## Terminology

| Category (page) | Form value (`integrationNeeds`) | Covers |
|---|---|---|
| Payments | `payment` | Payment confirmation, transaction status |
| Banking & Payout | `banking` | Disbursement, withdrawals, bank requirements |
| Logistics | `logistics` | Rates, shipments, waybills, delivery status |
| Accounting & Finance | `accounting` | Financial records, exports, reconciliation |
| Messaging | `messaging` | Notifications, member and customer communication |
| Existing Systems | `internal_system` | ERP, CRM, warehouse, POS, custom software |

Indonesian keeps the usual technical terms (API, webhook, sandbox, payment,
finance, messaging) inside Indonesian sentences: *Integrasi sistem*, *alur
data*, *source of truth*.

**API and webhook wording.** For owners, the page explains the concepts in
plain words ("An API lets two systems exchange data through an agreed
interface"; "A webhook is a message one system sends to another when
something happens"). It never says mlmsoft has, offers or supports an API or
webhooks: mlmsoft has no public or partner API, and its own JSON endpoints
are not an integration API.

## Discovery methodology (what the page teaches)

1. **Data flow first.** For each connection: what data, who owns it, when
   it moves, what confirms success, what happens on failure.
2. **Source of truth.** Each data domain (order status, payment status,
   member profile, inventory, commission context, shipment status) has one
   authoritative system, agreed before development. The MLM system is not
   assumed to own everything.
3. **Configuration vs development.** Existing capability → configuration →
   custom integration → external limitation.
4. **Who owns each side.** mlmsoft team, the client's team, the external
   provider, a third-party vendor. Established before development: API
   availability, credentials, sandbox, documentation, callback/webhook
   requirements, rate limits, approvals, vendor support.
5. **Security decisions.** Authentication, credentials, authorization,
   transport, data scope, logging, retry, auditability.
6. **The failure path.** Unavailable system → what happens to the
   transaction → retry, queue, manual review, reconciliation; plus what is
   logged, which failures are actionable, who is alerted.

## Page structure

Hero (WhatsApp *Discuss Your Integrations*, secondary *Request an
Integration Consultation*) with the architecture concept → the five reasons
integration needs design → integration areas + disclosure → data flow →
source of truth → conceptual examples (tabs) → WhatsApp band → patterns and
plain-language terms → configuration vs development + ownership → link to
pricing → readiness checklist → security decisions → failure path and
observability → FAQ (10) → final band (WhatsApp, *Book a Demo* on the
homepage) → integration consultation form.

The hero's secondary button opens the page's own form, an integration
consultation, rather than "Book a Demo": a demo button that led to a
consultation form would mislead. "Book a Demo" stays available in the final
band (homepage form).

**Architecture concept.** A hub with six areas and moving dashed lines
(still when reduced motion is requested), captioned *Integration
architecture concept* / *Konsep arsitektur integrasi*, with a text
equivalent for screen readers. Below 1180px it sits under the copy; on
phones it becomes a stack of cards. Existing palette and tokens only.

**Readiness checklist.** Seven statements, native checkboxes, no score,
nothing saved or sent. The result is one of two sentences: "These are useful
inputs for an integration discovery session." or "Some technical details can
be clarified during discovery."

## Conversion and tracking

- WhatsApp context `integration_discovery` everywhere on the page; the
  message ends with the WhatsApp intent reference when tracking is allowed.
- Form: the shared lead form in `integration` mode, source
  `integration_page`, contact purpose **Integration**. Optional: integration
  areas, "Is there an API or documentation for the system?" (yes / no / not
  sure), existing system (120 characters). A note asks visitors not to send
  credentials; there is no credential field. Stored in `service_details`;
  the system name stays in the back office (not in emails).
- Interest `integration`: viewing the page is *browsed*; opening it from the
  Features menu, the feature index, the homepage, How We Do It, the IT role
  page or the Ecommerce page, the WhatsApp CTA and the form are *explicit*.
  Viewing the IT role page alone is not an integration interest.

## Navigation and links

- Features mega menu (after Wallet & Payout), mobile drawer, footer Features
  column. Not a sixth top-level item; never under Services.
- Homepage integrations section: "We identify which external systems matter
  to the workflow and assess how data should move between them.", six
  areas, *Explore Integrations*.
- How We Do It (Integrate phase), IT role page (area link), Ecommerce
  (contextual line after the considerations), feature index ("Existing
  systems need to work together.").

## Future verified connectors

`shared/integrations.ts` holds `verifiedIntegrations` (provider, area,
status `available` | `custom`, localized description, optional
documentation URL). It is empty; the page renders an "Available
integrations" section only when it is not. To add one:

1. Implement and test the integration in mlmsoft.
2. Change its row in `docs/integration-evidence.md` to
   `VERIFIED_IN_MLMSOFT` with "Public Claim Allowed: Yes".
3. Add it to `verifiedIntegrations` (the evidence test requires both).
4. Use the provider's name or logo only with permission.

`planned` integrations are not listed publicly unless product strategy
decides otherwise. Separate SEO pages per integration theme (payment,
shipping, API) wait until there is something verified to say.
