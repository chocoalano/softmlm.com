# Security page: marketing strategy

`/en/security` and `/id/security` (Phase 11B). Evidence:
`docs/security-evidence.md`. Audit: `docs/security-audit.md` (internal, never
served).

## Objective

A page that makes owners and IT evaluators trust that mlmsoft thinks about
access, data, integrations, audit history, infrastructure and recovery
**before** a system is launched, without claiming controls that are not in
place.

What each reader should take away:

- **An owner:** "They think about risk before the system goes live."
- **IT:** "They know the difference between authentication, authorisation,
  integration security, data protection, infrastructure, logging and
  recovery."
- **Nobody:** "Every enterprise security control is already available."

## Claim boundaries

- **Three scopes, never mixed** (`docs/security-evidence.md`):
  - `MARKETING_SITE`: mlmsoft's public website;
  - `INTERNAL_ADMIN`: mlmsoft's back office;
  - `CUSTOMER_PLATFORM`: an MLM platform built for a customer.

  Nothing verified for the first two is presented as a capability of the
  third.
- **Only verified controls are named as existing.** They are listed
  under *What we can verify today* and come from `verifiedControls` in
  `shared/security.ts`. Each one cites rows of the evidence matrix that
  are `VERIFIED` with "Public Claim Allowed: Yes" for the same scope, which
  `tests/unit/security_evidence.spec.ts` checks. The caption says they
  apply to the current marketing and internal lead-management application,
  and that customer platform controls are defined by implementation scope.
- **Everything else is a question, a principle or a decision for the
  deployment architecture:**
  - access, data, the four financial-workflow principles (authority,
    traceability, validation, reconciliation), integration security;
  - audit for the customer platform;
  - infrastructure ("Infrastructure controls are confirmed as part of the
    deployment architecture.").
- **Not claimed:** SSO, two-factor authentication, encryption at rest,
  tested backups or disaster recovery, certifications (ISO 27001, SOC 2,
  PCI DSS), and compliance (GDPR, PDPA, UU PDP). The FAQ answers say so in
  the agreed wording. Password hashing is mentioned only as hashing, never
  as encryption.
- **Never revealed:** package versions, rate limits, routes, secret names,
  database topology, host names, audit findings (a test scans the page copy).
- **No privacy link.** The privacy notice does not exist yet (production
  blocker #16).
- **Claims gate.** EN and ID rules reject: enterprise-, bank- and
  military-grade security, fully secure, unhackable, fully encrypted,
  encrypted at rest, SOC 2 / ISO 27001 certified, GDPR compliant,
  guaranteed uptime, zero data loss, disaster-proof, bulletproof security.

## Page structure

1. **Hero:** WhatsApp *Discuss Security Requirements* (`security_review`),
   plus a secondary link to the consultation form. The security model
   concept diagram has a text equivalent and is captioned as a concept.
2. **Security starts with scope:** shared responsibility across six areas,
   each with an owner.
3. **Access & identity:** the questions roles are designed from; SSO "can be
   assessed during technical discovery".
4. **Data protection:** "Not every team needs access to every piece of
   data.", then the financial principles, labelled as design principles,
   not an existing engine.
5. **Integrations:** the Phase 10 questions, linked to `/integrations`.
6. **Audit & traceability:** mlmsoft's own back office today, kept apart
   from what is agreed for the customer platform.
7. **Infrastructure & operations:** topics agreed in the deployment
   architecture.
8. **Questions we clarify before implementation:** seven areas, plus
   compliance requirements brought into discovery.
9. **Checklist:** six statements; no score, nothing saved.
10. **Mid-page CTA.**
11. **What we can verify today.**
12. **FAQ:** ten questions.
13. **Final CTA:** WhatsApp, plus *Book a Demo* on the homepage.
14. **Security consultation form.**

Three conversion points only (hero, mid, final, plus the form): the page is
meant to be read without interruption.

## Conversion and tracking

- **WhatsApp:** context `security_review` in EN and ID; the message ends
  with the reference when tracking is allowed.
- **Form:** the shared lead form in `security` mode, source `security_page`,
  purpose **Security & Access**.
  - Optional topics (`securityTopics`): Access & permissions, Data
    protection, Integrations, Audit & traceability, Infrastructure, Backup &
    recovery, Security requirements, Other.
  - The form shows "Do not send credentials or sensitive security
    information through this form." There is no field for credentials,
    network details or findings, and unknown fields are dropped.
  - The topics appear in the back office, the sales email and the
    confirmation email.
- **Interest `security` (*Security & Access*):**
  - viewing the page is *browsed*;
  - explicit: the footer, the homepage section, the IT role page,
    Integrations and How We Do It links (`feature_interest`), the WhatsApp
    CTA and the form;
  - viewing the IT role page alone is not a security interest.

## Navigation and links

- **Footer:** Company column. Not a header item; the homepage `#security`
  anchor has left the Features menu and the mobile drawer.
- **Contextual links:**
  - the IT role page (Security area);
  - the Integrations page (security decisions section);
  - How We Do It (Blueprint phase: roles, data and approvals);
  - the homepage security section ("Security requirements, discussed
    before launch.", *Explore Security*).

## Visual direction

- Brand palette only (#041836, #005DFB, #0098F7, #06C8F5), through the
  site's tokens, in Light, Dark and System.
- Architecture and process visuals, no padlock, shield or "hacker"
  imagery.
- The diagram is still when reduced motion is requested and stacks on
  phones.
