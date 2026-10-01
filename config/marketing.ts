import env from '#start/env'
import { DEFAULT_LOCALE, type Locale } from '#shared/locales'
import { MARKETING_BRAND_NAME } from '#shared/brand'

/**
 * Marketing conversion settings, shared with every page. WhatsApp is the
 * primary conversion; the number comes from the environment only, so no
 * page ever contains a hardcoded (or made-up) number.
 */

/**
 * Pre-filled WhatsApp messages per page context, in the page's language.
 * They describe the topic only: nothing the visitor typed on the site is
 * ever added to the URL.
 */
const BRAND = MARKETING_BRAND_NAME

const en = {
  general: `Hi ${BRAND}, I'd like to discuss an MLM system for my business.`,
  compensation: `Hi ${BRAND}, I'd like to discuss the compensation plan for my business.`,
  pricing: `Hi ${BRAND}, I'd like to discuss pricing and what an MLM system would need to cover.`,
  implementation: `Hi ${BRAND}, I'd like to discuss implementing or migrating an MLM system.`,
  pricing_result: `Hi ${BRAND}, I've just completed the needs estimate on your website and would like to discuss the implementation.`,
  executives: `Hi ${BRAND}, I'd like to discuss an MLM system for my company's business and operational needs.`,
  finance: `Hi ${BRAND}, I'd like to discuss commissions, payouts and finance requirements for our MLM system.`,
  operations: `Hi ${BRAND}, I'd like to discuss member, order and network operations for our business.`,
  it: `Hi ${BRAND}, I'd like to discuss integrations and the technical requirements of a ${BRAND} implementation.`,
  distributors: `Hi ${BRAND}, I'd like to discuss the app and member experience for our distributor network.`,
  network: `Hi ${BRAND}, I'd like to discuss the network structure of our business.`,
  ecommerce: `Hi ${BRAND}, I'd like to discuss the ordering and commerce flow of our business.`,
  wallet: `Hi ${BRAND}, I'd like to discuss the wallet and payout workflow for our members.`,
  implementation_general: `Hi ${BRAND}, I'd like to discuss an MLM system implementation project for our business.`,
  migration: `Hi ${BRAND}, we currently use another system and would like to discuss migration and implementation.`,
  integration_discovery: `Hi ${BRAND}, I'd like to discuss integrations with the systems our business currently uses.`,
  security_review: `Hi ${BRAND}, I'd like to discuss the security and access requirements of our company's MLM system.`,
  compensation_validation: `Hi ${BRAND}, I'd like to discuss how our compensation plan would be mapped and checked before launch.`,
  services_overview: `Hi ${BRAND}, I'd like to discuss support for our business beyond the software.`,
  service_social_media: `Hi ${BRAND}, I'd like to discuss social media management for our business.`,
  service_seo: `Hi ${BRAND}, I'd like to discuss SEO and content marketing for our business.`,
  service_paid_ads: `Hi ${BRAND}, I'd like to discuss digital advertising for our business.`,
  service_branding: `Hi ${BRAND}, I'd like to discuss branding and brand design for our business.`,
  service_product_maklon: `Hi ${BRAND}, I'd like to discuss product maklon for our business.`,
}

export type WhatsappContext = keyof typeof en

const id: Record<WhatsappContext, string> = {
  general: `Halo ${BRAND}, saya ingin konsultasi mengenai sistem MLM untuk bisnis saya.`,
  compensation: `Halo ${BRAND}, saya ingin konsultasi mengenai compensation plan untuk bisnis saya.`,
  pricing: `Halo ${BRAND}, saya ingin konsultasi mengenai harga dan kebutuhan sistem MLM.`,
  implementation: `Halo ${BRAND}, saya ingin konsultasi mengenai implementasi atau migrasi sistem MLM.`,
  pricing_result: `Halo ${BRAND}, saya baru menyelesaikan estimasi kebutuhan di website dan ingin konsultasi mengenai implementasinya.`,
  executives: `Halo ${BRAND}, saya ingin konsultasi mengenai sistem MLM untuk kebutuhan bisnis dan operasional perusahaan saya.`,
  finance: `Halo ${BRAND}, saya ingin konsultasi mengenai komisi, payout dan kebutuhan finance untuk sistem MLM kami.`,
  operations: `Halo ${BRAND}, saya ingin konsultasi mengenai operasional member, order dan network untuk bisnis kami.`,
  it: `Halo ${BRAND}, saya ingin diskusi mengenai integrasi dan kebutuhan teknis implementasi ${BRAND}.`,
  distributors: `Halo ${BRAND}, saya ingin konsultasi mengenai aplikasi/member experience untuk jaringan distributor kami.`,
  network: `Halo ${BRAND}, saya ingin konsultasi mengenai struktur jaringan bisnis kami.`,
  ecommerce: `Halo ${BRAND}, saya ingin konsultasi mengenai alur order dan penjualan bisnis kami.`,
  wallet: `Halo ${BRAND}, saya ingin konsultasi mengenai alur wallet dan payout untuk member kami.`,
  implementation_general: `Halo ${BRAND}, saya ingin konsultasi mengenai proyek implementasi sistem MLM untuk bisnis kami.`,
  migration: `Halo ${BRAND}, kami saat ini menggunakan sistem lain dan ingin konsultasi mengenai migrasi serta implementasi.`,
  integration_discovery: `Halo ${BRAND}, saya ingin konsultasi mengenai integrasi dengan sistem yang saat ini digunakan bisnis kami.`,
  security_review: `Halo ${BRAND}, saya ingin mendiskusikan kebutuhan keamanan dan akses untuk sistem MLM perusahaan kami.`,
  compensation_validation: `Halo ${BRAND}, saya ingin konsultasi mengenai pemetaan dan pengecekan compensation plan kami sebelum go-live.`,
  services_overview: `Halo ${BRAND}, saya ingin konsultasi mengenai layanan pendukung untuk bisnis kami.`,
  service_social_media: `Halo ${BRAND}, saya ingin konsultasi mengenai pengelolaan media sosial untuk bisnis kami.`,
  service_seo: `Halo ${BRAND}, saya ingin konsultasi mengenai SEO dan content marketing.`,
  service_paid_ads: `Halo ${BRAND}, saya ingin konsultasi mengenai iklan digital untuk bisnis kami.`,
  service_branding: `Halo ${BRAND}, saya ingin konsultasi mengenai branding dan kebutuhan desain brand kami.`,
  service_product_maklon: `Halo ${BRAND}, saya ingin konsultasi mengenai maklon produk.`,
}

export const whatsappMessages: Record<Locale, Record<WhatsappContext, string>> = { en, id }

export type WhatsappNumber = { enabled: true; number: string } | { enabled: false; number: null }
export type WhatsappConfig = WhatsappNumber & { messages: Record<WhatsappContext, string> }

/**
 * Accepts the number in international format with or without "+", spaces
 * or dashes (e.g. "+62 812-3456-7890"). Anything that does not look like
 * an international mobile number disables WhatsApp instead of producing a
 * broken link.
 */
export function resolveWhatsappNumber(
  rawNumber: string | undefined,
  enabledFlag: boolean | undefined
): WhatsappNumber {
  const digits = (rawNumber ?? '').replace(/[\s().+-]/g, '')
  const valid = /^[1-9]\d{7,14}$/.test(digits)

  if (enabledFlag === false || !valid) return { enabled: false, number: null }
  return { enabled: true, number: digits }
}

/**
 * The settings a page receives: the number plus the messages in its language.
 */
export function resolveWhatsappConfig(
  rawNumber: string | undefined,
  enabledFlag: boolean | undefined,
  locale: Locale = DEFAULT_LOCALE
): WhatsappConfig {
  return {
    ...resolveWhatsappNumber(rawNumber, enabledFlag),
    messages: { ...whatsappMessages[locale] },
  }
}

const marketingConfig = {
  whatsapp: resolveWhatsappNumber(
    env.get('WHATSAPP_MARKETING_NUMBER'),
    env.get('WHATSAPP_MARKETING_ENABLED')
  ),

  whatsappFor(locale: Locale): WhatsappConfig {
    return { ...this.whatsapp, messages: whatsappMessages[locale] }
  },
}

export default marketingConfig
