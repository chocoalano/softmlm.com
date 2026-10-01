import vine from '@vinejs/vine'
import trackingConfig from '#config/marketing_tracking'
import { LOCALES } from '#shared/locales'
import { CLIENT_EVENTS, INTENTS } from '#shared/tracking'
import { PAGE_PATH, SLUG } from '#services/marketing_tracker'

/**
 * Events the browser may send (POST /marketing/events). Every field is an
 * enumerated value or a short slug/path; objects keep only the keys listed
 * here, so a stray `email`, `phone` or `message` is dropped, never stored.
 */
export const marketingEventsValidator = vine.create({
  events: vine
    .array(
      vine.object({
        name: vine.enum(CLIENT_EVENTS),
        page: vine.string().trim().maxLength(255).regex(PAGE_PATH),
        section: vine.string().trim().maxLength(40).regex(SLUG).optional(),
        locale: vine.enum(LOCALES).optional(),
        theme: vine.enum(['light', 'dark'] as const).optional(),
        interest: vine.enum(INTENTS).optional(),
        metadata: vine
          .object({
            from: vine.enum(LOCALES).optional(),
            to: vine.enum(LOCALES).optional(),
            mode: vine.enum(['quick', 'full'] as const).optional(),
          })
          .optional(),
      })
    )
    .minLength(1)
    .maxLength(trackingConfig.maxEventsPerRequest),
})
