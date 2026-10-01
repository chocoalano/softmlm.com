# Marketing site: languages (EN / ID)

The public marketing site is available in **English (`en`)** and **Bahasa
Indonesia (`id`)**. The admin, staff login and back office are English only
and are not part of this system.

## URLs

Every marketing URL starts with its locale. Slugs are the same in both
languages.

| Page | English | Indonesian |
|---|---|---|
| Home | `/en` | `/id` |
| Compensation plans | `/en/compensation-plans` | `/id/compensation-plans` |
| Pricing | `/en/pricing` | `/id/pricing` |
| Who we serve | `/en/who-we-serve` | `/id/who-we-serve` |
| Role pages | `/en/who-we-serve/finance` … | `/id/who-we-serve/finance` … |
| How we do it | `/en/how-we-do-it` | `/id/how-we-do-it` |
| Services hub | `/en/services` | `/id/services` |
| Service pages | `/en/services/branding` … | `/id/services/branding` … |

- `/` redirects (302) to the visitor's saved language, otherwise `/en`. No IP
  or browser-language detection. The query string (UTM tags) is kept.
- The pre-locale URLs (`/pricing`, `/compensation-plans`, `/who-we-serve…`, `/how-we-do-it`)
  redirect permanently (301) to their English page, so nothing is served twice.
- Any other address under `/en/…` or `/id/…` shows the marketing 404 in that
  language (HTTP 404, `noindex`).
- An unknown locale (`/fr/pricing`) is a plain 404.

Routes live in `start/routes.ts`; the list of locales, cookie names and the
`localizePath()` / `splitLocale()` helpers in `shared/locales.ts` (used by the
server, the browser and the tests).

## Language choice

- The language comes from the URL, so the server renders `<html lang>` and all
  SEO tags correctly in the first response. There is no language flash.
- The switcher (EN / ID in the header, full names in the mobile drawer) links
  to the same page in the other language and keeps the current section
  (`#hash`). On click it saves the choice in the `mlmsoft_locale` cookie
  (1 year, `SameSite=Lax`), which `/` uses next time.
- The pricing wizard keeps its answers when the language changes (they are
  stored per browser tab and are language-independent keys).

## Where copy lives

| What | Where |
|---|---|
| Page copy (every sentence, label, aria-label, mockup text) | `inertia/i18n/en/*.ts` and `inertia/i18n/id/*.ts`, one file per area |
| SEO titles and descriptions | `config/seo.ts` (`title.en`, `title.id` …) |
| WhatsApp pre-filled messages | `config/marketing.ts` (`whatsappMessages.en / .id`) |
| Book a Demo option labels | `config/leads.ts` (`publicLeadOptionsFor(locale)`) |
| Form validation and flash messages | `app/i18n/lead_form.ts` |
| Lead confirmation email | `app/i18n/lead_confirmation.ts` |

Areas in `inertia/i18n`: `common` (header, footer, switchers, CTAs, demo form,
404), `modules`, `homeIntro`, `homePlatform`, `homeClosing`, `compensation`,
`pricing`, `personas`, `features`, `implementation`, `services`.

### Adding or changing copy

1. Add the key to the **English** file of the area. Its shape is the contract.
2. Add the same key to the **Indonesian** file. The file is typed
   `const x: typeof en`, so a missing key fails `npm run typecheck`.
3. In the component: `const t = useCopy('pricing')`, then `{{ t.hero.title }}`.
   Never write `locale === 'id' ? … : …` in a component.
4. Links: `const { lp } = useI18n()` and `:href="lp('/pricing#estimate')"`.
   Never hardcode `/en` or `/id`. Same-page anchors (`#demo`) stay as they are.
5. Run the claims gate (`node ace test unit`): it scans both languages.

Only the active language is downloaded: each locale is its own JavaScript
chunk, loaded before the page mounts (`inertia/app.ts`).

### Stored values stay keys

Forms send and store stable keys (`direct_selling`, `community_commerce`),
never the translated label. The lead also stores the `locale` it was
submitted in, so sales can reply in that language and the confirmation email
is sent in it.

## Writing Indonesian copy

Indonesian is written for Indonesian business owners, not translated word
for word. Keep the intent, hierarchy and persuasion of the English line;
change the sentence where needed.

| English | Not this | Prefer |
|---|---|---|
| Your compensation plan should fit your business. | Rencana kompensasi Anda harus cocok dengan bisnis Anda. | Sistem bonus harus mengikuti cara bisnis Anda berjalan. |
| See the business behind the network. | Lihat bisnis di belakang jaringan. | Lihat kondisi bisnis di balik pertumbuhan jaringan Anda. |

- Address the reader as **Anda**. Business-formal, friendly, never stiff.
- Short headlines. Avoid chains of "yang", overuse of "tersebut" and
  "melakukan".
- Brand and industry terms stay in English where Indonesian businesses use
  them (see glossary). The sentence around them is Indonesian.
- No placeholders (`TODO_TRANSLATE`) and no silent English fallback.

### Glossary

| English | Indonesian | Note |
|---|---|---|
| Member | member | |
| Distributor | distributor | |
| Sponsor | sponsor | |
| Upline / Downline | upline / downline | |
| Placement | penempatan | |
| Leg | leg | binary legs |
| Genealogy | genealogi | |
| Network | jaringan | |
| Rank | rank | not "peringkat" |
| Qualification | kualifikasi | |
| Commission | komisi | |
| Bonus | bonus | |
| Payout | payout | "pencairan" may explain it in prose |
| Wallet | wallet | |
| Withdrawal | penarikan | |
| Compensation plan | compensation plan | "sistem bonus" in explanatory prose |
| Order | order | |
| Refund / return | refund / retur | |
| Reconciliation | rekonsiliasi | |
| Tax withholding | pemotongan pajak; slip: bukti potong | |
| Owner | owner, pemilik bisnis | |
| Finance team | tim finance | |
| Operations | operasional | |
| Dashboard | dashboard | |
| Stockist | stokis | |
| Implementation / migration / integration | implementasi / migrasi / integrasi | |
| Discovery (phase) | Pahami Bisnis (phase label); tahap memahami bisnis (prose) | never "penemuan"; older pages still say "tahap discovery" in prose |
| Implementation phases | Pahami Bisnis, Blueprint Sistem, Konfigurasi, Integrasi, Migrasi, Pengujian, Training, Go-Live, Support | same labels on the home page and /how-we-do-it |
| Services (nav) | Layanan | |
| Growth services | Layanan pendukung bisnis | the services around the software |
| Social Media Management | Pengelolaan Media Sosial | |
| SEO & Content | SEO & Konten | |
| Paid Advertising | Iklan Digital | not "Periklanan" (too formal for UI) |
| Branding & Creative | Branding & Kreatif | |
| Product Development / Maklon | Pengembangan & Maklon Produk | "maklon" stays: it is the word owners use |
| Request a Consultation | Ajukan Konsultasi | services pages; software pages keep "Jadwalkan Demo" |
| Product discovery | product discovery | kept in English in the maklon copy |
| Search intent | intensi pencarian | |
| Landing page | landing page | |
| Example creative direction | Contoh arah kreatif | caption on fictional brand visuals |
| Billion (Rp) | miliar | `Rp12,48 miliar`, never "M" (reads as million to some, miliar to others) |
| Consult via WhatsApp | Konsultasi via WhatsApp | |
| Book a Demo | Jadwalkan Demo | |
| Talk to our team | Hubungi tim kami | |
| Interface concept · sample data | Konsep tampilan · data contoh | |

## SEO

- Each language version has its own title, description and canonical
  (`https://mlmsoft.com/id/pricing` is canonical to itself, never to English).
- Every page lists `hreflang="en"`, `hreflang="id"` and `hreflang="x-default"`
  (English) alternates.
- Titles and descriptions are written per language for search intent
  (e.g. `Harga Software MLM`), not translated literally. Keep titles within
  60 characters including ` | mlmsoft`, descriptions 110–160 characters.
- The theme never changes a URL.
- The sitemap (Phase 12) must list both languages.

## WhatsApp

Messages are chosen by page context (`general`, `pricing`, `finance` …) and
page language. They describe the topic only; nothing a visitor typed is ever
put in the URL. Click tracking is one event, `whatsapp_marketing_click`,
with `page`, `section`, `variant`, `locale` and `theme` (no personal data).

## Claims

The claims gate (`tests/support/claims.ts`) checks English and Indonesian
wording, including every file in `inertia/i18n`. Discussing needs is
allowed ("Diskusikan kebutuhan integrasi bisnis Anda"); presenting an
unverified capability as available is not ("mlmsoft sudah terintegrasi
dengan semua payment gateway", "Bonus dihitung secara otomatis").
