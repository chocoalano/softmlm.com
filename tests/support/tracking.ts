import db from '@adonisjs/lucid/services/db'
import type { ApiClient, ApiResponse } from '@japa/api-client'
import env from '#start/env'
import marketingConfig from '#config/marketing'
import trackingConfig from '#config/marketing_tracking'

/**
 * Helpers for the first-party tracking tests: requests from a regular
 * browser (headless and script user agents are treated as bots), with the
 * visitor and visit cookies carried between requests.
 */
export const BROWSER =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36'
export const VISITOR = trackingConfig.cookies.visitor
export const VISIT = trackingConfig.cookies.visit
export const HOST = `${env.get('HOST')}:${env.get('PORT')}`

export type Cookies = { visitor?: string; visit?: string }

export function browse(
  client: ApiClient,
  path: string,
  cookies: Cookies = {},
  headers: Record<string, string> = {}
) {
  let request = client.get(path).header('user-agent', BROWSER)
  for (const [name, value] of Object.entries(headers)) request = request.header(name, value)
  if (cookies.visitor) request = request.withCookie(VISITOR, cookies.visitor)
  if (cookies.visit) request = request.withCookie(VISIT, cookies.visit)
  return request
}

export function cookiesOf(response: ApiResponse): Cookies {
  return {
    visitor: response.cookie(VISITOR)?.value,
    visit: response.cookie(VISIT)?.value,
  }
}

export async function counts() {
  const table = async (name: string) => {
    const [row] = await db.from(name).count('* as total')
    return Number(row.total)
  }
  return {
    visitors: await table('marketing_visitors'),
    sessions: await table('marketing_sessions'),
    events: await table('marketing_events'),
  }
}

export function sendEvents(client: ApiClient, cookies: Cookies, events: unknown[]) {
  let request = client
    .post('/marketing/events')
    .header('user-agent', BROWSER)
    .json({ events })
    .withCsrfToken()
    .accept('json')
  if (cookies.visitor) request = request.withCookie(VISITOR, cookies.visitor)
  if (cookies.visit) request = request.withCookie(VISIT, cookies.visit)
  return request
}

/** Turns WhatsApp on with a test number for one test (never a real number). */
export function enableWhatsapp(cleanup: (fn: () => void) => void) {
  const original = marketingConfig.whatsapp
  marketingConfig.whatsapp = { enabled: true, number: '6281234567890' }
  cleanup(() => {
    marketingConfig.whatsapp = original
  })
}
