# Privacy Notice and Terms of Use: review status

**Requires final legal/business review before production sign-off.**

The pages `/en/privacy`, `/id/privacy`, `/en/terms` and `/id/terms` (Phase
12B) are conservative drafts written from what the site actually does. No
lawyer has reviewed them, and the site does not claim otherwise. The pages
carry no visible "draft" warning; this document is where the open points
live.

Copy: `inertia/i18n/en/legal.ts`, `inertia/i18n/id/legal.ts` (same
sections, same order; a test checks). Pages: `inertia/pages/legal/*`,
`inertia/components/legal/*`. "Last updated" date: `shared/legal.ts`
(`LEGAL_UPDATED`) and the `updated` string in both copy files: change all
three whenever the text changes.

## What each statement rests on

| Privacy Notice says | Evidence in the code |
| --- | --- |
| Form fields received | `app/validators/demo_request.ts` |
| Landing page, referrer (no parameters), UTM, page sent from, kept with a request even when analytics is off | `app/middleware/capture_attribution_middleware.ts`, `DemoRequestService.snapshotFromAttribution` |
| One-way hash of the IP address and the user agent, for spam and abuse | `DemoRequestService.hashIp` (HMAC with `APP_KEY`), `user_agent` (512 chars) on `demo_requests` |
| Random visitor ID 90 days, visit 30 minutes | `config/marketing_tracking.ts` (`visitorDays`, `sessionTimeoutMinutes`) |
| Paths only, language, theme, device category, explicit interests, WhatsApp clicks | `docs/marketing-attribution.md` §4 and §7 |
| No IP in analytics, no fingerprinting, no form contents, no session replay, bots not counted | `docs/marketing-attribution.md` §7, `MarketingTracker.isBot` |
| Linked to a person only through a form from the same browser or a reference linked by sales | `docs/marketing-attribution.md` §3 and §7 |
| WhatsApp reference: random, not an access token, absent when analytics is off | `app/services/whatsapp_intents.ts`, `docs/marketing-attribution.md` §3 |
| Cookie table | `config/session.ts`, `config/shield.ts`, `shared/locales.ts`, `config/marketing_tracking.ts` (a test compares the names) |
| Analytics switch, GPC | `TrackingPreferenceController`, `MarketingTracker.preference/optOut/optIn` |
| Marketing role sees no contact details | `app/abilities/main.ts` (`manageLeads`, `viewMarketing`) |
| Google Fonts receives IP and browser details | `resources/views/inertia_layout.edge` (fonts.googleapis.com, fonts.gstatic.com) |
| No advertising pixels or third-party analytics | CSP `script-src` (`docs/security-evidence.md` SEC-MKT-010) |

If any of these changes, the notice must change in the same commit.

## Open points for legal and business review

1. **Operator identity.** The pages say "the team that operates this
   website". The legal entity, its address and registration details are
   not confirmed, so they are not published. Add them once confirmed
   (brand and domain are still open too: blocker #13).
2. **Governing law and jurisdiction** for the Terms: not stated until
   decided. Nothing on the page names a jurisdiction.
3. **Legal basis and consent model.** Analytics is first-party,
   pseudonymous and on by default, with an opt-out switch and Global
   Privacy Control honoured. Whether this model is sufficient for the
   audiences served (Indonesian Personal Data Protection Law, UU No.
   27/2022, and any other market), or whether analytics must wait for
   consent, is a legal decision. A consent banner was deliberately not
   built without that decision.
4. **Retention.** The notice promises a limited period for anonymous
   analytics, "not indefinitely". Today the period is
   `MARKETING_ANONYMOUS_RETENTION_DAYS` (default 365) and the cleanup
   command exists but is **not scheduled** (blocker #18). Before sign-off:
   approve the period, schedule `node ace marketing:cleanup --apply`, and
   decide how long leads are kept. Then consider stating the periods on the
   page.
5. **Privacy contact.** There is no dedicated address. Requests go through
   WhatsApp or the contact form ("mention that it is a privacy request").
   Decide who handles them, how identity is confirmed and the response
   time, and add a dedicated address if one is created. No privacy officer
   is named, because none has been appointed.
6. **Rights wording.** Access, correction, deletion and withdrawal are
   described as requests "subject to the obligations that apply to us".
   Review against the rights the business is required and prepared to
   operate.
7. **Providers and transfers.** Hosting (Hostinger), the email provider
   (not chosen yet, blocker #5), Google Fonts and WhatsApp are described by
   role, not by name, except Google Fonts and WhatsApp. Confirm the
   agreements with each provider and whether cross-border transfer wording
   is required. Self-hosting the fonts would remove Google from the list.
8. **Terms.** Review the limitation-of-liability and acceptance-by-use
   wording for enforceability, the intellectual property statement (logo
   ownership, blocker #13), and the service-specific clauses (growth
   services, maklon) against the commercial terms (blocker #15).
9. **Children.** The notice says the site is meant for businesses and is
   not directed at children. Confirm.

## What is deliberately not on the pages

- No claim of legal review, certification or compliance with a named law.
- No third-party trackers (Meta Pixel, TikTok Pixel, Google Ads tag,
  Google Analytics, Hotjar): none are deployed. `window.dataLayer` exists
  but nothing consumes it, so it is not described as processing.
- No claim of "completely secure"; security is described by process only.
- No specific retention period until the policy is approved.
