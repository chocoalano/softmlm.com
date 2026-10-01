import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * Response headers every response gets, including static files and pages
 * for routes that do not exist (shield only runs on matched routes):
 *
 * - Referrer-Policy: other sites see our origin, never the path or query.
 * - Permissions-Policy: browser features the site never uses stay off.
 * - X-Content-Type-Options / X-Frame-Options: the same values shield sets
 *   on matched routes (config/shield.ts).
 */
export const SECURITY_HEADERS = {
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy':
    'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
} as const

export default class SecurityHeadersMiddleware {
  async handle({ response }: HttpContext, next: NextFn) {
    for (const [name, value] of Object.entries(SECURITY_HEADERS)) response.header(name, value)
    return next()
  }
}
