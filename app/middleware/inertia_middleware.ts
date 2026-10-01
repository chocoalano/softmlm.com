import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import UserTransformer from '#transformers/user_transformer'
import marketingConfig from '#config/marketing'
import businessConfig from '#config/business'
import MarketingTracker from '#services/marketing_tracker'
import {
  DEFAULT_LOCALE,
  THEME_COOKIE,
  isLocale,
  isThemePreference,
  type ThemePreference,
} from '#shared/locales'
import BaseInertiaMiddleware from '@adonisjs/inertia/inertia_middleware'

export default class InertiaMiddleware extends BaseInertiaMiddleware {
  share(ctx: HttpContext) {
    /**
     * The share method is called everytime an Inertia page is rendered. In
     * certain cases, a page may get rendered before the session middleware
     * or the auth middleware are executed. For example: During a 404 request.
     *
     * In that case, we must always assume that HttpContext is not fully hydrated
     * with all the properties
     */
    const { auth, request, params } = ctx as Partial<HttpContext>

    /**
     * Marketing routes carry their language in the URL (/en/…, /id/…).
     * Everything else (admin, login) is English.
     */
    const localeParam: unknown = params?.locale
    const locale = isLocale(localeParam) ? localeParam : DEFAULT_LOCALE

    /**
     * The marketing site's colour theme: an explicit choice from the
     * cookie, or "system" (follow the device) when there is none.
     */
    const themeCookie = request?.plainCookie(THEME_COOKIE, { encoded: false })
    const siteTheme: ThemePreference = isThemePreference(themeCookie) ? themeCookie : 'system'

    const theme: 'light' | 'dark' =
      request?.plainCookie('app_theme', {
        defaultValue: 'light',
        encoded: false,
      }) ?? 'light'

    /**
     * Data shared with all Inertia pages. Make sure you are using
     * transformers for rich data-types like Models.
     */
    return {
      errors: ctx.inertia.always(this.getValidationErrors(ctx)),
      user: ctx.inertia.always(auth?.user ? UserTransformer.transform(auth.user) : undefined),
      preferences: ctx.inertia.always({ theme }),
      /** The business timezone the back office shows dates in (config/business.ts). */
      timezone: ctx.inertia.always(businessConfig.timezone),
      permissions: ctx.inertia.always({
        manageLeads: auth?.user?.canManageLeads ?? false,
        viewMarketing: auth?.user?.canViewMarketing ?? false,
      }),
      locale: ctx.inertia.always(locale),
      siteTheme: ctx.inertia.always(siteTheme),
      marketing: ctx.inertia.always({
        whatsapp: marketingConfig.whatsappFor(locale),
        /** First-party tracking allowed for this browser (docs/marketing-attribution.md). */
        tracking: request ? MarketingTracker.allowed(request) : false,
      }),
    }
  }

  flash(ctx: HttpContext) {
    /**
     * Flash messages travel in the dedicated `flash` field of the page
     * object instead of props, and the client strips them from history
     * state so they never reappear when navigating back.
     */
    const { session } = ctx as Partial<HttpContext>

    const success: string | undefined = session?.flashMessages.get('success')
    const error: string | undefined = session?.flashMessages.get('error')

    return { success, error }
  }

  async handle(ctx: HttpContext, next: NextFn) {
    await this.init(ctx)

    const output = await next()
    this.dispose(ctx)

    return output
  }
}

declare module '@adonisjs/inertia/types' {
  type MiddlewareSharedProps = InferSharedProps<InertiaMiddleware>
  export interface SharedProps extends MiddlewareSharedProps {}
}
