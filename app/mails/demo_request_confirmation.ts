import { BaseMail } from '@adonisjs/mail'
import type DemoRequest from '#models/demo_request'
import { isConsultationSource, publicLeadOptionsFor } from '#config/leads'
import { leadConfirmationText } from '#i18n/lead_confirmation'
import { leadFormLocale } from '#i18n/lead_form'

/**
 * Acknowledges a demo or consultation request to the visitor, in the
 * language of the page they used. It promises no response time: there is
 * no formal SLA yet.
 */
export default class DemoRequestConfirmation extends BaseMail {
  subject: string

  /**
   * @param replyTo The sales inbox, so a reply reaches a person. Without it
   * the email doesn't invite a reply.
   */
  constructor(
    private lead: DemoRequest,
    private replyToAddress?: string
  ) {
    super()
    this.subject = DemoRequestConfirmation.copyFor(lead).subject
  }

  /** The demo wording, or the consultation wording for the services pages. */
  static copyFor(lead: DemoRequest) {
    const text = leadConfirmationText[leadFormLocale(lead.locale)]
    return isConsultationSource(lead.source) ? text.consultation : text
  }

  prepare() {
    const locale = leadFormLocale(this.lead.locale)
    const text = DemoRequestConfirmation.copyFor(this.lead)
    const options = publicLeadOptionsFor(locale)
    const labelled = (values: string[] | null, list: { value: string; label: string }[]) =>
      (values ?? []).map((value) => list.find((item) => item.value === value)?.label ?? value)
    const modules = [
      ...labelled(this.lead.serviceInterests, options.serviceInterests),
      ...labelled(this.lead.selectedModulesSnapshot, options.modules),
      ...labelled(this.lead.serviceDetails?.integrationNeeds ?? null, options.integrationNeeds),
    ].join(', ')

    const data = {
      lang: locale,
      title: text.subject,
      heading: text.heading(this.lead.fullName.split(' ')[0]),
      received: text.received(this.lead.company),
      interests: modules ? text.interests(modules) : null,
      reply: this.replyToAddress ? leadConfirmationText[locale].reply : null,
      footer: text.footer,
    }

    if (this.replyToAddress) this.message.replyTo(this.replyToAddress)
    this.message
      .to(this.lead.email, this.lead.fullName)
      .htmlView('emails/demo_request_confirmation', data)
      .textView('emails/demo_request_confirmation_text', data)
  }
}
