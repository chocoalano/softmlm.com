import type { Locale } from '#shared/locales'
import { MARKETING_BRAND_NAME as BRAND } from '#shared/brand'

/**
 * The confirmation email a visitor receives after "Book a Demo" or
 * "Request a Consultation", in the language of the page they used. It
 * promises no response time: there is no formal SLA yet.
 */
type ConfirmationCopy = {
  subject: string
  heading: (firstName: string) => string
  received: (company: string) => string
  interests: (list: string) => string
  /** `site` is the host of APP_URL, the site the visitor used. */
  footer: (site: string) => string
}

export type LeadConfirmationText = ConfirmationCopy & {
  reply: string
  /** For consultation requests from the services pages. */
  consultation: ConfirmationCopy
}

export const leadConfirmationText: Record<Locale, LeadConfirmationText> = {
  en: {
    subject: "We've received your demo request",
    heading: (firstName) => `Thanks, ${firstName}. Your demo request is in.`,
    received: (company) =>
      `We've received your request for a ${BRAND} demo for ${company}. Someone from our team will contact you to find a time that works for you.`,
    interests: (modules) => `You told us you're interested in: ${modules}.`,
    reply: "If you'd like to add anything before we talk, simply reply to this email.",
    footer: (site) =>
      `You're receiving this because this email address was used to request a demo on ${site}. If that wasn't you, you can ignore this message.`,
    consultation: {
      subject: "We've received your consultation request",
      heading: (firstName) => `Thanks, ${firstName}. Your consultation request is in.`,
      received: (company) =>
        `We've received your consultation request for ${company}. Someone from our team will contact you to discuss what you need.`,
      interests: (list) => `You'd like to discuss: ${list}.`,
      footer: (site) =>
        `You're receiving this because this email address was used to request a consultation on ${site}. If that wasn't you, you can ignore this message.`,
    },
  },
  id: {
    subject: 'Permintaan demo Anda sudah kami terima',
    heading: (firstName) => `Terima kasih, ${firstName}. Permintaan demo Anda sudah kami terima.`,
    received: (company) =>
      `Kami sudah menerima permintaan demo ${BRAND} untuk ${company}. Tim kami akan menghubungi Anda untuk mencari waktu yang sesuai.`,
    interests: (modules) => `Area yang Anda minati: ${modules}.`,
    reply: 'Jika ada yang ingin Anda tambahkan sebelum kita berdiskusi, cukup balas email ini.',
    footer: (site) =>
      `Anda menerima email ini karena alamat email ini digunakan untuk meminta demo di ${site}. Jika bukan Anda, abaikan saja pesan ini.`,
    consultation: {
      subject: 'Permintaan konsultasi Anda sudah kami terima',
      heading: (firstName) =>
        `Terima kasih, ${firstName}. Permintaan konsultasi Anda sudah kami terima.`,
      received: (company) =>
        `Kami sudah menerima permintaan konsultasi untuk ${company}. Tim kami akan menghubungi Anda untuk membahas kebutuhan Anda.`,
      interests: (list) => `Topik yang ingin Anda diskusikan: ${list}.`,
      footer: (site) =>
        `Anda menerima email ini karena alamat email ini digunakan untuk meminta konsultasi di ${site}. Jika bukan Anda, abaikan saja pesan ini.`,
    },
  },
}
