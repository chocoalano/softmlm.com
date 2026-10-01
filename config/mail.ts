import env from '#start/env'
import { MARKETING_BRAND_NAME } from '#shared/brand'
import { defineConfig, transports } from '@adonisjs/mail'

const smtpUser = env.get('SMTP_USERNAME')
const smtpPassword = env.get('SMTP_PASSWORD')

const mailConfig = defineConfig({
  default: env.get('MAIL_MAILER'),

  from: {
    address: env.get('MAIL_FROM_ADDRESS'),
    name: env.get('MAIL_FROM_NAME'),
  },

  /**
   * Shared with every email template.
   */
  globals: {
    brandName: MARKETING_BRAND_NAME,
  },

  mailers: {
    /**
     * Any SMTP provider. Credentials are optional so a local SMTP catcher
     * (for example Mailpit on port 1025) works without them.
     */
    smtp: transports.smtp({
      host: env.get('SMTP_HOST'),
      port: env.get('SMTP_PORT'),
      secure: env.get('SMTP_SECURE', false),
      ...(smtpUser && smtpPassword
        ? { auth: { type: 'login' as const, user: smtpUser, pass: smtpPassword.release() } }
        : {}),
    }),
  },
})

export default mailConfig

declare module '@adonisjs/mail/types' {
  export interface MailersList extends InferMailers<typeof mailConfig> {}
}
