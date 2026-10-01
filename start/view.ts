/*
|--------------------------------------------------------------------------
| View globals
|--------------------------------------------------------------------------
|
| Values every Edge template can read. The brand name comes from the one
| place the marketing site keeps it (shared/brand.ts).
|
*/

import edge from 'edge.js'
import { MARKETING_BRAND_NAME } from '#shared/brand'

edge.global('brandName', MARKETING_BRAND_NAME)

/**
 * The page payload written by `@inertia()`, as the Inertia tag writes it
 * but with `<`, `>` and `&` as JSON unicode escapes. The stock tag only
 * escapes `/`: text such as `<!--<script` in a lead's message would put the
 * HTML parser in a state where the payload swallows the mount element, and
 * the back-office page would render blank. (SSR is off: config/inertia.ts.)
 */
edge.global(
  'inertia',
  (page: { ssrBody?: string } = {}, attributes: { id?: string; class?: string; as?: string } = {}) => {
    if (page.ssrBody) return page.ssrBody
    const id = attributes.id || 'app'
    const tag = attributes.as || 'div'
    const className = attributes.class ? ` class="${attributes.class}"` : ''
    const json = JSON.stringify(page).replace(
      /[<>&\u2028\u2029]/g,
      (char) => `\\u${char.charCodeAt(0).toString(16).padStart(4, '0')}`
    )
    return `<script data-page="${id}" type="application/json">${json}</script><${tag} id="${id}"${className}></${tag}>`
  }
)
