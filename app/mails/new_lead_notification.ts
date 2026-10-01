import { BaseMail } from '@adonisjs/mail'
import env from '#start/env'
import { urlFor } from '@adonisjs/core/services/url_builder'
import type DemoRequest from '#models/demo_request'
import { leadEmailData } from '#mails/lead_email_data'

/**
 * Tells the sales inbox a new lead arrived, with a link to the back office.
 * The subject says what kind of lead it is ("New demo request", "New
 * Branding inquiry"). The visitor's message is left out on purpose: it is
 * read in the admin.
 */
export default class NewLeadNotification extends BaseMail {
  /**
   * @param acquisition Purpose and source rows (see leadAcquisition), loaded
   * before the mail is built.
   */
  constructor(
    private lead: DemoRequest,
    private recipients: string[],
    private acquisition: [string, string][] = []
  ) {
    super()
  }

  prepare() {
    const data = {
      ...leadEmailData(this.lead, this.acquisition),
      adminUrl: urlFor(
        'admin.demo_requests.show',
        { id: this.lead.id },
        { prefixUrl: env.get('APP_URL') }
      ),
    }

    this.message
      .to(this.recipients[0])
      .subject(
        data.kind === 'demo'
          ? `New demo request: ${this.lead.company}`
          : `New ${data.inquiryName} inquiry: ${this.lead.company}`
      )
      .replyTo(this.lead.email, this.lead.fullName)
      .htmlView('emails/new_lead', data)
      .textView('emails/new_lead_text', data)

    for (const recipient of this.recipients.slice(1)) this.message.to(recipient)
  }
}
