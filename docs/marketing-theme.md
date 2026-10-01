# Marketing site: light and dark theme

The public marketing site supports **Light**, **Dark** and **System**
(follow the device). First visit: System. The admin keeps its own theme.

## How it works

| Piece | Role |
|---|---|
| `mlmsoft_theme` cookie | The explicit choice: `light`, `dark` or `system` (1 year, `SameSite=Lax`). |
| `<html data-site-theme>` | The choice, rendered by the server from the cookie. |
| `<html data-site-scheme>` | What is shown: `light` or `dark`. The server renders it for an explicit choice; for System, `initSiteTheme()` resolves the device preference before the page mounts and keeps following it. |
| Inline `<style>` in `resources/views/inertia_layout.edge` | Paints the page background in the right scheme before any script or stylesheet loads. |
| `inertia/composables/site_theme.ts` | `useSiteTheme()` → `preference`, `scheme`, `setSiteTheme()`. |
| `inertia/components/site/theme_switcher.vue` | The control: icon button + options in the header, inline options in the mobile drawer. |

An explicit Light or Dark is never overridden by a device change; System
follows it live. A switch is instant (colour transitions are paused for a
frame), so reduced-motion users see no animation either.

## Tokens

Components use semantic tokens from `inertia/css/site.css`, never raw light
colours. Dark values are defined once, under `html[data-site-scheme='dark'] .site`.

| Token | Use |
|---|---|
| `--sm-page` | Page background |
| `--sm-surface` | Elevated surfaces: cards, panels, mockup screens, inputs |
| `--sm-surface-subtle` | Tinted sections, wells inside cards |
| `--sm-surface-hover` | Hover and pressed backgrounds, segmented-control tracks |
| `--sm-surface-glass` | Translucent header, sticky bar, chips over imagery |
| `--sm-surface-inverse` + `--sm-inverse-edge` | Dark bands and panels (CTA bands, demo panel); the edge shows them on a dark page |
| `--sm-canvas` | Backdrop behind product mockups |
| `--sm-text`, `--sm-text-2`, `--sm-muted`, `--sm-subtle` | Text, from strongest to tertiary (all ≥ 4.5:1) |
| `--sm-on-inverse`, `--sm-on-inverse-muted` | Text on inverse panels |
| `--sm-border`, `--sm-border-2` | Hairlines and stronger outlines |
| `--sm-primary` | Brand **fill** (buttons, bars, active dots), same in both schemes |
| `--sm-primary-ink` | Brand-coloured **text, links, icons**, focus ring (lighter in dark) |
| `--sm-primary-50/100/200` | Brand tints (translucent in dark) |
| `--sm-tech`, `--sm-tech-ink` | Cyan accent (the highlight of the logo mark) as fill / as text |
| `--sm-strong`, `--sm-on-strong` | The strong button: navy on light pages, near-white on dark |
| `--sm-ok/-warn/-danger/-info` + `-bg` | Status, always with an icon or label |
| `--sm-shadow-*` | Depth, deeper and darker in dark |

Dark mode uses deep navy surfaces (`#050d1c` page, `#0b1629` panels),
never pure black, with subtle brand glow.

## Brand palette

The palette comes from the mlmsofts logo (`inertia/assets/brand/`): navy
`#041836` (the "mlm" of the wordmark), royal blue `#005DFB`, azure `#0098F7`
and cyan `#06C8F5`. `--sm-primary` is the royal blue, `--sm-accent` the
azure, `--sm-tech` the cyan and `--sm-deep` / `--sm-surface-inverse` the navy.
Headline gradients (`.sm-grad`) run blue → azure → cyan, with darker stops on
light pages and lighter stops on dark pages so they stay ≥ 3:1 as large text.
The favicon and touch icons in `public/` use the same mark.

The logo component (`inertia/components/logo.vue`) swaps to a wordmark with a
light "mlm" on dark pages; the mark itself is the same in both schemes.

## Adding a theme-aware component

1. Use tokens for every surface, text and border colour.
2. Brand gradients and glows (`rgba(0, 93, 251, …)` blue, `rgba(2, 200, 250, …)`
   cyan) can stay: they read on both schemes. White text is fine on inverse
   panels and fills.
3. Anything drawn in script (canvas, SVG fills) reads `useSiteTheme().scheme`
   and redraws on change (see `network_orb.vue`).
4. Check it in all four states: English + Light, English + Dark, Indonesian +
   Light, Indonesian + Dark.

## Accessibility

- Text tokens meet WCAG AA (4.5:1) on page, surface and tinted surface in
  both schemes, status colours on their `-bg` tints as well.
- The focus ring uses `--sm-primary-ink` (≥ 3:1 in both schemes).
- The theme and language controls are keyboard operable (arrow keys in the
  theme options, Escape closes the popover and returns focus), labelled, and
  show their active state.
