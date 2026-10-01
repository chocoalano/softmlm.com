import { SimpleMessagesProvider } from '@vinejs/vine'
import { DEFAULT_LOCALE, isLocale, type Locale } from '#shared/locales'

/**
 * What the "Book a Demo" form tells the visitor, in the page's language.
 * The validation rules themselves live once, in #validators/demo_request;
 * only the wording changes per locale.
 */
type LeadFormText = {
  validation: Record<string, string>
  fields: Record<string, string>
  created: string
  createdConsultation: string
  duplicate: string
  failed: string
  tooManyRequests: (minutes: number) => string
}

const text: Record<Locale, LeadFormText> = {
  en: {
    validation: {
      'fullName.required': 'Please enter your name',
      'email.required': 'Please enter your work email',
      'email.email': 'Please enter a valid email address',
      'company.required': 'Please enter your company name',
      'phone.regex': 'Please enter a valid phone number',
      'enum': 'Please choose one of the listed options',
      'source.enum': 'Something went wrong. Please refresh the page and try again',
      'source.required': 'Something went wrong. Please refresh the page and try again',
      'minLength': 'The {{ field }} is too short',
      'maxLength': 'The {{ field }} is too long',
      'serviceInterests.required': 'Please choose at least one topic',
      'serviceInterests.array.minLength': 'Please choose at least one topic',
    },
    fields: {
      fullName: 'name',
      company: 'company name',
      phone: 'phone number',
      message: 'message',
    },
    created: 'Thanks! Our team will reach out shortly to schedule your demo.',
    createdConsultation: 'Thanks! Our team will reach out shortly to discuss your request.',
    duplicate:
      'We already received your request a few minutes ago. Our team will be in touch soon.',
    failed:
      "We couldn't send your request just now. Please try again in a moment, or reach us by email.",
    tooManyRequests: (minutes) =>
      `Too many requests. Please try again in ${minutes} minute${minutes === 1 ? '' : 's'}.`,
  },
  id: {
    validation: {
      'fullName.required': 'Mohon isi nama Anda',
      'email.required': 'Mohon isi email kerja Anda',
      'email.email': 'Mohon masukkan alamat email yang valid',
      'company.required': 'Mohon isi nama perusahaan Anda',
      'phone.regex': 'Mohon masukkan nomor telepon yang valid',
      'enum': 'Mohon pilih salah satu opsi yang tersedia',
      'source.enum': 'Terjadi kendala. Muat ulang halaman, lalu coba lagi',
      'source.required': 'Terjadi kendala. Muat ulang halaman, lalu coba lagi',
      'minLength': '{{ field }} terlalu pendek',
      'maxLength': '{{ field }} terlalu panjang',
      'serviceInterests.required': 'Mohon pilih minimal satu topik',
      'serviceInterests.array.minLength': 'Mohon pilih minimal satu topik',
    },
    fields: {
      fullName: 'Nama',
      company: 'Nama perusahaan',
      phone: 'Nomor telepon',
      message: 'Pesan',
    },
    created: 'Terima kasih! Tim kami akan segera menghubungi Anda untuk menjadwalkan demo.',
    createdConsultation:
      'Terima kasih! Tim kami akan segera menghubungi Anda untuk membahas kebutuhan Anda.',
    duplicate:
      'Permintaan Anda sudah kami terima beberapa menit lalu. Tim kami akan segera menghubungi Anda.',
    failed:
      'Permintaan Anda belum berhasil terkirim. Silakan coba lagi sebentar lagi, atau hubungi kami melalui email.',
    tooManyRequests: (minutes) =>
      `Terlalu banyak permintaan. Silakan coba lagi dalam ${minutes} menit.`,
  },
}

const providers = Object.fromEntries(
  Object.entries(text).map(([locale, { validation, fields }]) => [
    locale,
    new SimpleMessagesProvider(validation, fields),
  ])
) as Record<Locale, SimpleMessagesProvider>

/**
 * The form sends the page's locale with the submission. Anything else
 * falls back to English.
 */
export function leadFormLocale(value: unknown): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE
}

export function leadFormText(locale: Locale) {
  return text[locale]
}

export function leadFormMessages(locale: Locale) {
  return providers[locale]
}
