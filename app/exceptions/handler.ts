import app from '@adonisjs/core/services/app'
import { leadFormLocale, leadFormText } from '#i18n/lead_form'
import { splitLocale } from '#shared/locales'
import { errors as limiterErrors } from '@adonisjs/limiter'
import { type HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import type { HttpError, StatusPageRange, StatusPageRenderer } from '@adonisjs/core/types/http'

export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  /**
   * Status pages are used to display a custom HTML pages for certain error
   * codes. You might want to enable them in production only, but feel
   * free to enable them in development as well.
   */
  protected renderStatusPages = app.inProduction

  /**
   * Status pages is a collection of error code range and a callback
   * to return the HTML contents to send as a response.
   */
  protected statusPages: Record<StatusPageRange, StatusPageRenderer> = {
    '403': (_, { inertia }) => inertia.render('errors/forbidden', {}),
    '404': (_, { inertia, request }) =>
      inertia.render('marketing_not_found', { locale: splitLocale(request.url()).locale ?? 'en' }),
    '500..599': (_, { inertia }) => inertia.render('errors/server_error', {}),
  }

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(error: unknown, ctx: HttpContext) {
    /**
     * Rate-limited Inertia form posts get a readable message on the page
     * they came from instead of a raw 429 body. Other clients keep the
     * plain 429 response with Retry-After headers.
     */
    if (error instanceof limiterErrors.E_TOO_MANY_REQUESTS && ctx.request.header('x-inertia')) {
      const minutes = Math.max(1, Math.ceil(error.response.availableIn / 60))
      ctx.response.header('Retry-After', error.response.availableIn)
      const locale = leadFormLocale(ctx.request.input('locale'))
      ctx.session.flash('error', leadFormText(locale).tooManyRequests(minutes))
      return ctx.response.redirect().back()
    }

    return super.handle(error, ctx)
  }

  /**
   * Outside debug mode a server error (5xx) never shows its own message to
   * the visitor, in HTML, JSON or JSON:API: it can carry SQL, file paths or
   * a provider's reply. The original error is still reported (logged) as
   * is. Client errors (4xx) keep their message.
   */
  async renderErrorAsHTML(error: HttpError, ctx: HttpContext) {
    return super.renderErrorAsHTML(this.redacted(error, ctx), ctx)
  }

  async renderErrorAsJSON(error: HttpError, ctx: HttpContext) {
    return super.renderErrorAsJSON(this.redacted(error, ctx), ctx)
  }

  async renderErrorAsJSONAPI(error: HttpError, ctx: HttpContext) {
    return super.renderErrorAsJSONAPI(this.redacted(error, ctx), ctx)
  }

  protected redacted(error: HttpError, ctx: HttpContext): HttpError {
    if (this.isDebuggingEnabled(ctx) || error.status < 500) return error
    return { status: error.status, message: 'Internal server error' }
  }

  /**
   * The method is used to report error to the logging service or
   * the a third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
