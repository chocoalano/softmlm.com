/*
|--------------------------------------------------------------------------
| Define HTTP limiters
|--------------------------------------------------------------------------
|
| The "limiter.define" method creates an HTTP middleware to apply rate
| limits on a route or a group of routes. Feel free to define as many
| throttle middleware as needed.
|
*/

import leadsConfig from '#config/leads'
import trackingConfig from '#config/marketing_tracking'
import limiter from '@adonisjs/limiter/services/main'

/**
 * Public lead forms: a visitor can comfortably submit (and correct) a few
 * requests, while a burst from one address is blocked for a while.
 */
export const demoRequestThrottle = limiter.define('demo_requests', (ctx) => {
  const { requests, window, blockFor } = leadsConfig.rateLimit
  return limiter
    .allowRequests(requests)
    .every(window)
    .blockFor(blockFor)
    .usingKey(`demo_requests:${ctx.request.ip()}`)
})

/**
 * Sign-in and sign-up, per client address: a ceiling on top of the
 * per-account limit on failed sign-ins (SessionController). The client
 * address is only as reliable as `trustProxy` (production blocker #2).
 */
export const loginThrottle = limiter.define('login', (ctx) => {
  return limiter
    .allowRequests(20)
    .every('1 minute')
    .blockFor('10 minutes')
    .usingKey(`login:${ctx.request.ip()}`)
})

export const signupThrottle = limiter.define('signup', (ctx) => {
  return limiter.allowRequests(5).every('1 hour').usingKey(`signup:${ctx.request.ip()}`)
})

/**
 * Browser marketing events (POST /marketing/events): generous for a real
 * visitor, a ceiling for scripts.
 */
export const marketingEventsThrottle = limiter.define('marketing_events', (ctx) => {
  const { requests, window } = trackingConfig.rateLimit
  return limiter
    .allowRequests(requests)
    .every(window)
    .usingKey(`marketing_events:${ctx.request.ip()}`)
})
