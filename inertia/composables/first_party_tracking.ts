/**
 * The browser half of first-party tracking (docs/marketing-attribution.md).
 *
 * Listens to `track()` and forwards the events the server accepts from a
 * browser (interest, forms started, the needs estimate, language changes)
 * to POST /marketing/events: sent right away (events of the same moment
 * in one request) with `keepalive`, so a link that leaves the page does not
 * lose them, and never awaited by anything the visitor does. Requests sent
 * from `pagehide` are not reliably delivered, so it is only a safety net.
 * Page views, WhatsApp clicks and form submissions are recorded by the
 * server itself.
 *
 * Nothing identifying is sent: the visitor is the HttpOnly cookie the
 * server set, the payload holds enumerated values and the page path. When
 * tracking is off (setting, opt-out, Global Privacy Control) nothing is
 * queued at all.
 */
import { onTrack, type AnalyticsEvent, type AnyEventProps } from '@shared/analytics'
import { CLIENT_EVENTS } from '@shared/tracking'

type Payload = {
  name: string
  page: string
  locale?: string
  theme?: string
  interest?: string
  metadata?: Record<string, string>
}

const MAX_BATCH = 20
const clientEvents = new Set<string>(CLIENT_EVENTS)
let queue: Payload[] = []
let scheduled = false
let started = false

function xsrfToken() {
  const match = document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : ''
}

function flush() {
  scheduled = false
  if (!queue.length) return
  const events = queue.slice(0, MAX_BATCH)
  queue = queue.slice(MAX_BATCH)
  try {
    fetch('/marketing/events', {
      method: 'POST',
      keepalive: true,
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-XSRF-TOKEN': xsrfToken(),
      },
      body: JSON.stringify({ events }),
    }).catch(() => {
      /* tracking never affects the visitor */
    })
  } catch {
    /* fetch unavailable: nothing to do */
  }
  if (queue.length) flush()
}

function toPayload(event: AnalyticsEvent, props: AnyEventProps): Payload {
  const values = props as Record<string, string | undefined>
  const html = document.documentElement
  const payload: Payload = {
    name: event,
    page: window.location.pathname,
    locale: values.locale && values.locale !== 'unknown' ? values.locale : html.lang || undefined,
    theme: html.dataset.siteScheme || undefined,
  }
  const interest = values.service ?? values.feature ?? values.interest
  if (interest && interest !== 'unknown') payload.interest = interest
  if (event === 'language_changed') payload.metadata = { from: values.from!, to: values.to! }
  if (event === 'pricing_started' || event === 'pricing_completed') {
    payload.metadata = { mode: values.mode! }
  }
  return payload
}

/**
 * Starts the collector once per page load. `enabled` is read for every
 * event, so turning tracking off takes effect immediately.
 */
export function initFirstPartyTracking(enabled: () => boolean) {
  if (started || typeof window === 'undefined') return
  started = true

  onTrack((event, props) => {
    if (!clientEvents.has(event) || !enabled()) return
    queue.push(toPayload(event, props))
    // after the current handler, before a clicked link navigates away
    if (!scheduled) {
      scheduled = true
      queueMicrotask(flush)
    }
  })

  window.addEventListener('pagehide', flush)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flush()
  })
}
