import app from '@adonisjs/core/services/app'
import { defineConfig } from '@adonisjs/shield'

const cspDirectives = {
  defaultSrc: ["'self'"],
  scriptSrc: ["'self'"],
  styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
  fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
  imgSrc: ["'self'", 'data:'],
  connectSrc: ["'self'"],
  objectSrc: ["'none'"],
  baseUri: ["'self'"],
  formAction: ["'self'"],
  frameAncestors: ["'none'"],
}

/**
 * The same policy as a `<meta http-equiv>` value, written into every page
 * (resources/views/inertia_layout.edge). Hostinger's CDN replaces the
 * Content-Security-Policy header with its own `upgrade-insecure-requests`
 * (mlmsofts.com, 2026-10-02), so the page has to carry the policy itself.
 * `frame-ancestors` is not allowed in a meta policy (browsers ignore it and
 * log an error); X-Frame-Options: DENY covers framing on every response.
 */
export function cspMetaPolicy(directives: Record<string, string[]> = cspDirectives) {
  return Object.entries(directives)
    .filter(([name]) => name !== 'frameAncestors')
    .map(([name, sources]) =>
      [name.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`), ...sources].join(' ')
    )
    .join('; ')
}

const shieldConfig = defineConfig({
  /**
   * Configure CSP policies for your app. Refer documentation
   * to learn more.
   */
  csp: {
    /**
     * On in production only: Vite's dev server injects scripts and opens a
     * websocket this policy would block. Check a production build
     * (`node ace build`) after adding any third-party script, style, font,
     * image or endpoint.
     *
     * - Scripts: only the app's own bundles. No inline script, no eval. The
     *   Inertia page payload is a JSON <script>, which is not executed.
     * - Styles: 'unsafe-inline' is needed by the layout's first-paint
     *   <style>, Vue's style bindings and the Inertia progress bar. Fonts
     *   come from Google Fonts.
     * - Requests: same origin only (the marketing events endpoint).
     *   WhatsApp is a link the visitor follows, not a request from the page.
     */
    enabled: app.inProduction,

    directives: cspDirectives,

    reportOnly: false,
  },

  /**
   * Configure CSRF protection options. Refer documentation
   * to learn more.
   */
  csrf: {
    /**
     * Enable CSRF token verification for state-changing requests.
     */
    enabled: true,

    /**
     * Route patterns to exclude from CSRF checks.
     * Useful for external webhooks or API endpoints.
     */
    exceptRoutes: [],

    /**
     * Expose an encrypted XSRF-TOKEN cookie for frontend HTTP clients.
     */
    enableXsrfCookie: true,

    /**
     * HTTP methods protected by CSRF validation.
     */
    methods: ['POST', 'PUT', 'PATCH', 'DELETE'],
  },

  /**
   * Control how your website should be embedded inside
   * iframes.
   */
  xFrame: {
    /**
     * Enable the X-Frame-Options header.
     */
    enabled: true,

    /**
     * Block all framing attempts. Default value is DENY.
     */
    action: 'DENY',
  },

  /**
   * Force browser to always use HTTPS.
   */
  hsts: {
    /**
     * Enable the Strict-Transport-Security header.
     */
    enabled: true,

    /**
     * HSTS policy duration remembered by browsers.
     */
    maxAge: '180 days',
  },

  /**
   * Disable browsers from sniffing content types and rely only
   * on the response content-type header.
   */
  contentTypeSniffing: {
    /**
     * Enable X-Content-Type-Options: nosniff.
     */
    enabled: true,
  },
})

export default shieldConfig
