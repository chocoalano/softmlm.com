import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import MarketingTracker from '#services/marketing_tracker'
import { trackingPreferenceText } from '#i18n/privacy'
import { LOCALES } from '#shared/locales'

const trackingPreferenceValidator = vine.create({
  tracking: vine.enum(['on', 'off'] as const),
  locale: vine.enum(LOCALES).optional(),
})

export default class TrackingPreferenceController {
  /**
   * The analytics switch on the Privacy Notice. Only this browser's
   * cookies change, and the choice itself is not recorded anywhere.
   */
  async update({ request, response, session }: HttpContext) {
    const { tracking, locale } = await request.validateUsing(trackingPreferenceValidator)

    if (tracking === 'off') MarketingTracker.optOut(response)
    else MarketingTracker.optIn(response)

    session.flash('success', trackingPreferenceText(locale)[tracking])
    return response.redirect().back()
  }
}
