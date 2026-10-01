import env from '#start/env'

/**
 * First-party marketing tracking (docs/marketing-attribution.md).
 *
 * A visitor is a random UUID in a first-party cookie, nothing more: no
 * fingerprinting, no IP address, no personal data until the visitor
 * submits a form themselves. Tracking can be switched off entirely, and it
 * is skipped for visitors who send Global Privacy Control or opted out.
 */
const marketingTrackingConfig = {
  /** Master switch; off means no cookies, no rows, no events. */
  enabled: env.get('MARKETING_TRACKING_ENABLED', true),

  cookies: {
    /** Pseudonymous visitor id (random UUID), HttpOnly, signed. */
    visitor: 'mlmsoft_visitor',
    /** The current visit (session): expires after inactivity. */
    visit: 'mlmsoft_visit',
    /** "off" disables tracking for this browser (set from the Privacy Notice). */
    optOut: 'mlmsoft_tracking',
  },

  /** How long a returning browser is recognised as the same visitor. */
  visitorDays: 90,

  /** How long the visitor's "analytics off" choice is remembered. */
  optOutDays: 365,

  /** A visit ends after this much inactivity (or on a new campaign). */
  sessionTimeoutMinutes: 30,

  /**
   * Anonymous events, sessions, visitors and WhatsApp intents not linked
   * to a lead (nor confirmed by sales) are removed after this many days by
   * `node ace marketing:cleanup` (not scheduled until the retention policy
   * is approved). A lead's attribution snapshot is never affected.
   */
  retentionDays: env.get('MARKETING_ANONYMOUS_RETENTION_DAYS', 365),

  /**
   * How long a WhatsApp reference ("Ref: M7K4P2") resolves to its visitor's
   * journey in the back office. Contacted or linked intents stay visible:
   * they are part of a sales record by then.
   */
  referenceDays: env.get('MARKETING_REFERENCE_EXPIRY_DAYS', 30),

  /** Upper bound of events accepted in one POST /marketing/events. */
  maxEventsPerRequest: 20,

  /** Per client address, for POST /marketing/events. */
  rateLimit: { requests: 60, window: '1 minute' },

  /**
   * Per client address, for recording WhatsApp clicks (/r/whatsapp/…).
   * Past it, the visitor still goes to WhatsApp; the click is just not
   * recorded (no intent, no reference).
   */
  whatsappRecordLimit: { requests: 30, window: '1 minute' },

  /**
   * Per client address, for recording page views: all page views, and the
   * ones that create a new visitor (a browser without the visitor cookie).
   * Past either cap the page is served as usual, just not recorded, so a
   * script requesting pages in a loop cannot grow the tracking tables or
   * the write queue without bound.
   */
  pageViewLimits: {
    views: { requests: 120, window: '1 minute' },
    newVisitors: { requests: 30, window: '10 minutes' },
  },

  /**
   * Obvious crawlers, link previewers, monitors and scripts: not counted as
   * visitors. Directional only, not billing-grade bot detection.
   */
  botPattern:
    /bot\b|bot\/|crawl|spider|slurp|preview|facebookexternalhit|embedly|^whatsapp\/|telegram|discord|slack|skype|monitor|pingdom|uptime|curl|wget|python|httpclient|java\/|go-http|axios|node-fetch|undici|^node$|headless|lighthouse|phantom|puppeteer|playwright/i,
} as const

export default marketingTrackingConfig
