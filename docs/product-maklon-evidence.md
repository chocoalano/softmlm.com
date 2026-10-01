# Product Development / Maklon: evidence register

The marketing site offers product development and maklon (contract
manufacturing) inquiries, because the business owner asked for it (Phase 9
brief, 2026-09-30) and confirmed the public offer in Phase 9.5. The page
invites a conversation about the product the visitor wants to build;
specifics are discussed per product.

Offer line used on the page (hero lead and FAQ):

- EN: "We also accept product development and maklon inquiries for MLM and
  direct selling businesses."
- ID: "Kami juga menerima jasa pengembangan dan maklon produk untuk
  kebutuhan bisnis MLM dan direct selling."

Claim boundary (the page's "What we discuss with you" block and FAQ):

- EN: "Formulation, packaging, regulatory needs, production volume and the
  implementation process are discussed based on the product you want to
  develop."
- ID: "Kebutuhan formulasi, kemasan, regulasi, volume produksi dan proses
  implementasi akan dibahas berdasarkan produk yang ingin dikembangkan."

Only **VERIFIED** facts may appear as active claims on the page.

| Status | Meaning |
|---|---|
| `VERIFIED` | Confirmed by the business owner; may be stated on the site. |
| `NOT_REQUIRED` | Deliberately not published, by business decision. Not a gap. |
| `UNVERIFIED` | No evidence yet; the page may only mention it as a topic to discuss, never as a capability. |
| `DO_NOT_CLAIM` | Must not appear as a claim until evidence changes the status. |

## Register

| Topic | What the page says today | Status | Needed to change it |
|---|---|---|---|
| Public offer: product development and maklon inquiries are accepted | "We also accept product development and maklon inquiries for MLM and direct selling businesses." | **VERIFIED** (business owner, Phase 9 and 9.5) | – |
| Consultation about the product idea or an existing product | "A consultation about your product idea or existing product" | **VERIFIED** (same decision) | – |
| Public provider disclosure (which entity, factory or partner manufactures) | Nothing. The page names no provider, factory or partner and does not say "our factory". | **NOT_REQUIRED** by business decision (Phase 9.5) | – The page must still never imply ownership (see the next row). |
| Factory ownership | Not mentioned | DO_NOT_CLAIM | Ownership evidence |
| Product categories | No categories listed; visitors describe their product in their own words | UNVERIFIED | The categories that can actually be produced |
| Formulation / R&D | "Formulation requirements" is a discussion topic | UNVERIFIED | Who formulates, and in which categories |
| Packaging | "Packaging" is a discussion topic | UNVERIFIED | Packaging design and sourcing scope |
| Production capacity | "Production volume" is a discussion topic | UNVERIFIED | Production model, sites, capacity |
| Certifications (ISO, GMP, HACCP) | Not mentioned | UNVERIFIED · DO_NOT_CLAIM | Certificates for the producing entity |
| Regulatory support (BPOM, Halal) | "Regulatory needs" is a discussion topic; no registration is promised | UNVERIFIED · DO_NOT_CLAIM | Which registrations are handled, with evidence |
| Minimum order quantity | Not mentioned; "Minimum quantities and prices depend on the product and are discussed with you." | UNVERIFIED · DO_NOT_CLAIM | Commercial terms |
| Lead time | Not mentioned | UNVERIFIED · DO_NOT_CLAIM | Commercial terms |
| Fulfilment / logistics | Not mentioned | UNVERIFIED | Whether fulfilment is part of the offer |
| Geography | Not mentioned | UNVERIFIED | Where production and delivery happen |
| Prices | "Pricing depends on scope" | DO_NOT_CLAIM | Commercial structure |

## Copy rules

- No defensive or provider wording ("we are not a factory", "production by
  a partner", "the provider will be confirmed"). The page states the offer
  and what is discussed; it does not explain who manufactures.
- Every specific (formulation, packaging, regulation, volume, timing,
  price) is phrased as something **discussed for the visitor's product**,
  never as a capability.
- Hero: "Tell us what product you want to build." / "Ceritakan produk yang
  ingin Anda buat." Primary CTA "Consult About Product Maklon" / "Konsultasi
  Maklon Produk" (WhatsApp `service_product_maklon`), secondary "Request a
  Consultation" (the consultation form).

## Sources checked

- Phase 9 brief: the service is requested; no delivery details given.
- Phase 9.5 brief: the public offer is confirmed; a public provider
  disclosure is not required by business decision.
- Reference projects (read-only): `laravel-webstore` has a configurable
  storefront badge whose default text is "BPOM & Halal". That is a retail
  store setting for a product brand, **not** evidence about any maklon
  capability. `puranusa.id` and `esas-tenancy` contain nothing about
  manufacturing. → No evidence changes any UNVERIFIED status above.

## Guarded by

- Claims gate rules *maklon claim* / *maklon claim (id)*: certified factory,
  BPOM/Halal included, guaranteed approval, any product, unlimited
  capacity, fastest production.
- `docs/production-blockers.md` #14 *Product Maklon Claims Review*: the
  UNVERIFIED rows stay discussion topics until evidence exists; a claims
  review happens before public launch.
