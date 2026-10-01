import env from '#start/env'
import { MARKETING_BRAND_NAME } from '#shared/brand'
import { personaPath, personas, type PersonaKey } from '#shared/personas'
import { FEATURES_PATH, featurePath, features, type FeatureKey } from '#shared/features'
import { HOW_WE_DO_IT_PATH } from '#shared/implementation'
import { INTEGRATIONS_PATH } from '#shared/integrations'
import { SERVICES_PATH, servicePath, services, type ServiceKey } from '#shared/services'
import { DEFAULT_LOCALE, LOCALES, localizePath, type Locale } from '#shared/locales'

/**
 * Title, description, canonical URL and language alternates for every
 * public marketing page, per locale. Pages receive them as a `seo` prop,
 * and the root Edge view renders them into the HTML, so they are there
 * before any JavaScript runs.
 *
 * Each language version is canonical to itself and lists the other as an
 * hreflang alternate; English is the x-default. Canonical URLs are built
 * from APP_URL, never from the request's Host header. The claims rules
 * apply here as on the pages themselves (both languages are scanned).
 */

export const SITE_NAME = MARKETING_BRAND_NAME

type Localized = Record<Locale, string>
type PageMeta = { path: string; title: Localized; description: Localized }

const personaMeta: Record<PersonaKey, Omit<PageMeta, 'path'>> = {
  executives: {
    title: {
      en: 'MLM Software for Business Owners',
      id: 'Software MLM untuk Pemilik Bisnis',
    },
    description: {
      en: 'For MLM and direct selling owners: see sales, network activity, compensation requirements and operational risk together. Talk with our team about your business.',
      id: 'Untuk pemilik bisnis MLM dan direct selling: lihat penjualan, aktivitas jaringan, kebutuhan kompensasi dan risiko operasional dalam satu gambaran utuh.',
    },
  },
  finance: {
    title: {
      en: 'MLM Finance & Commission Management Solutions',
      id: 'Solusi Komisi & Keuangan untuk Bisnis MLM',
    },
    description: {
      en: 'For MLM finance teams: map commissions, payouts, tax and reconciliation before implementation, so every amount is easier to explain.',
      id: 'Untuk tim finance bisnis MLM: petakan komisi, payout, pajak dan rekonsiliasi sebelum implementasi, supaya setiap angka lebih mudah dijelaskan.',
    },
  },
  operations: {
    title: {
      en: 'MLM Operations Software Solutions',
      id: 'Solusi Operasional untuk Bisnis MLM',
    },
    description: {
      en: 'For MLM operations teams: less manual coordination across member onboarding, orders, network changes and support. We design the workflow first.',
      id: 'Untuk tim operasional MLM: kurangi koordinasi manual pada onboarding member, order, perubahan jaringan dan support. Alur kerjanya kami rancang lebih dulu.',
    },
  },
  it: {
    title: {
      en: 'MLM Software for IT Teams',
      id: 'Software MLM untuk Tim IT',
    },
    description: {
      en: 'For technology teams evaluating MLM software: integrations, access, data migration and infrastructure questions, made clear before implementation starts.',
      id: 'Untuk tim IT yang sedang mengevaluasi software MLM: kebutuhan integrasi, akses, migrasi data dan infrastruktur diperjelas sebelum implementasi dimulai.',
    },
  },
  distributors: {
    title: {
      en: 'Distributor Experience for MLM Businesses',
      id: 'Pengalaman Distributor untuk Bisnis MLM',
    },
    description: {
      en: 'Plan a distributor experience that helps members understand their activity, network, rank progress and earnings without asking support every time.',
      id: 'Rancang pengalaman distributor yang membantu member memahami aktivitas, jaringan, progres rank dan penghasilannya tanpa harus selalu bertanya ke tim support.',
    },
  },
}

const featureMeta: Record<FeatureKey, Omit<PageMeta, 'path'>> = {
  network: {
    title: {
      en: 'MLM Network & Genealogy Management',
      id: 'Manajemen Jaringan & Genealogi MLM',
    },
    description: {
      en: 'See where your MLM network is growing, stalling or at risk. We map sponsorship, placement and plan rules first, then design the views each team needs.',
      id: 'Lihat bagian jaringan MLM yang tumbuh, melambat atau berisiko. Kami petakan sponsor, penempatan dan aturan plan dulu, lalu rancang tampilan untuk tiap tim.',
    },
  },
  ecommerce: {
    title: {
      en: 'Ecommerce for MLM & Direct Selling',
      id: 'Ecommerce untuk Bisnis MLM & Direct Selling',
    },
    description: {
      en: 'Commerce that follows your business rules: member prices, stock points, periods and follow-up, mapped around how orders really move in a network business.',
      id: 'Alur penjualan yang mengikuti aturan bisnis Anda: harga member, stock point, periode dan tindak lanjut, dipetakan sesuai cara order bergerak di bisnis jaringan.',
    },
  },
  wallet: {
    title: {
      en: 'MLM Wallet & Payout Workflow',
      id: 'Alur Wallet & Payout Bisnis MLM',
    },
    description: {
      en: 'Make payout rules easier to understand: earning context, pending amounts, adjustments, tax and approvals, written down with your finance team first.',
      id: 'Buat aturan payout lebih mudah dipahami: asal penghasilan, saldo tertunda, penyesuaian, pajak dan persetujuan, disusun bersama tim finance Anda lebih dulu.',
    },
  },
}

const serviceMeta: Record<ServiceKey, Omit<PageMeta, 'path'>> = {
  social_media: {
    title: {
      en: 'Social Media Management for MLM Businesses',
      id: 'Jasa Pengelolaan Media Sosial untuk Bisnis MLM',
    },
    description: {
      en: 'Social media management for MLM and direct selling brands: content planning, creative, copywriting and a publishing workflow, scoped to your business.',
      id: 'Pengelolaan media sosial untuk brand MLM dan direct selling: perencanaan konten, kreatif, copywriting dan alur publikasi yang disesuaikan dengan bisnis Anda.',
    },
  },
  seo: {
    title: {
      en: 'SEO & Content for MLM Businesses',
      id: 'Jasa SEO & Konten untuk Bisnis MLM',
    },
    description: {
      en: 'SEO and content for MLM and direct selling businesses: search intent research, content strategy, on-page SEO and articles that help customers find you.',
      id: 'SEO dan konten untuk bisnis MLM dan direct selling: riset intensi pencarian, strategi konten, SEO on-page dan artikel agar calon pelanggan menemukan Anda.',
    },
  },
  paid_advertising: {
    title: {
      en: 'Digital Advertising for MLM Businesses',
      id: 'Jasa Iklan Digital untuk Bisnis MLM',
    },
    description: {
      en: 'Digital advertising for MLM and direct selling businesses: campaign planning, audience strategy, creative direction, landing pages and reporting.',
      id: 'Iklan digital untuk bisnis MLM dan direct selling: perencanaan kampanye, strategi audiens, arahan kreatif, landing page dan laporan yang terstruktur.',
    },
  },
  branding: {
    title: {
      en: 'Branding Services for MLM Businesses',
      id: 'Jasa Branding untuk Bisnis MLM & Direct Selling',
    },
    description: {
      en: 'Branding for MLM and direct selling businesses: brand strategy, visual identity, packaging direction and campaign visuals your market can recognize.',
      id: 'Branding untuk bisnis MLM dan direct selling: strategi brand, identitas visual, arahan kemasan dan visual kampanye yang lebih mudah dikenali pasar.',
    },
  },
  product_maklon: {
    title: {
      en: 'Product Development & Maklon for MLM Businesses',
      id: 'Pengembangan & Maklon Produk untuk Bisnis MLM',
    },
    description: {
      en: 'Discuss product development and maklon for your MLM business: product concept, positioning, packaging and manufacturing requirements, scoped with you.',
      id: 'Diskusikan pengembangan dan maklon produk untuk bisnis MLM Anda: konsep produk, positioning, kemasan dan kebutuhan produksi, dirumuskan bersama Anda.',
    },
  },
}

export const marketingPages = {
  home: {
    path: '/',
    title: {
      en: 'MLM & Direct Selling Software',
      id: 'Software MLM & Direct Selling untuk Bisnis Anda',
    },
    description: {
      en: 'MLM software built around your business. mlmsoft maps your members, network, compensation plan, orders and payouts, then designs the system around them.',
      id: 'Software MLM yang dirancang mengikuti bisnis Anda. mlmsoft memetakan member, jaringan, compensation plan, order dan payout, lalu merancang sistem di sekitarnya.',
    },
  },
  compensation_plans: {
    path: '/compensation-plans',
    title: {
      en: 'Compensation Plans',
      id: 'Compensation Plan & Sistem Bonus MLM',
    },
    description: {
      en: 'Your compensation plan should fit your business. mlmsoft helps MLM and direct selling companies map bonuses, qualifications and ranks into a structured system.',
      id: 'Sistem bonus harus mengikuti cara bisnis Anda berjalan. mlmsoft membantu memetakan bonus, kualifikasi dan rank ke dalam sistem yang lebih terstruktur.',
    },
  },
  pricing: {
    path: '/pricing',
    title: {
      en: 'Pricing',
      id: 'Harga Software MLM',
    },
    description: {
      en: 'mlmsoft pricing follows your business: members, compensation plan, modules, integrations and migration shape the scope. Estimate your needs, then talk to us.',
      id: 'Harga mlmsoft mengikuti kebutuhan bisnis: jumlah member, compensation plan, modul, integrasi dan migrasi menentukan cakupannya. Mulai dari estimasi kebutuhan.',
    },
  },
  who_we_serve: {
    path: '/who-we-serve',
    title: {
      en: 'MLM Software for Every Team in Your Business',
      id: 'Software MLM untuk Setiap Tim di Bisnis Anda',
    },
    description: {
      en: 'Owners, finance, operations, IT and distributors see an MLM business from different angles. See how mlmsoft helps map their needs into one operating model.',
      id: 'Owner, finance, operasional, IT dan distributor melihat bisnis MLM dari sudut berbeda. Lihat cara mlmsoft memetakan kebutuhan mereka menjadi satu model kerja.',
    },
  },
  how_we_do_it: {
    path: HOW_WE_DO_IT_PATH,
    title: {
      en: 'MLM Software Implementation Process',
      id: 'Proses Implementasi Software MLM',
    },
    description: {
      en: 'How an mlmsoft implementation runs: discovery, compensation plan mapping, data migration, scenario testing, training and a planned launch.',
      id: 'Cara implementasi mlmsoft berjalan: memahami bisnis, memetakan compensation plan, migrasi data, pengujian skenario, training dan go-live yang terencana.',
    },
  },
  integrations: {
    path: INTEGRATIONS_PATH,
    title: {
      en: 'MLM Software Integrations',
      id: 'Integrasi Software MLM',
    },
    description: {
      en: 'How MLM software fits with the payment, logistics, finance, messaging and business systems you already use, mapped during integration discovery.',
      id: 'Cara sistem MLM bekerja bersama payment, logistik, finance, messaging dan sistem bisnis yang sudah Anda gunakan, dipetakan saat discovery integrasi.',
    },
  },
  services: {
    path: SERVICES_PATH,
    title: {
      en: 'Growth Services for MLM & Direct Selling',
      id: 'Layanan Pendukung Bisnis MLM & Direct Selling',
    },
    description: {
      en: 'Beyond MLM software: social media, SEO and content, digital advertising, branding and product development for direct selling businesses, scoped per project.',
      id: 'Selain software MLM: pengelolaan media sosial, SEO & konten, iklan digital, branding, serta pengembangan dan maklon produk untuk bisnis jaringan.',
    },
  },
  features: {
    path: FEATURES_PATH,
    title: {
      en: 'MLM Software Features by Business Problem',
      id: 'Fitur Software MLM Berdasarkan Masalah Bisnis',
    },
    description: {
      en: 'Start with the problem you need to solve: compensation, network, commerce, payouts or the distributor experience. See how mlmsoft approaches each one.',
      id: 'Mulai dari masalah bisnis yang ingin Anda selesaikan: kompensasi, jaringan, penjualan, payout atau pengalaman distributor. Lihat pendekatan mlmsoft.',
    },
  },
  ...(Object.fromEntries(
    features.map((feature) => [
      `features.${feature.key}`,
      { path: featurePath(feature), ...featureMeta[feature.key] },
    ])
  ) as Record<`features.${FeatureKey}`, PageMeta>),
  ...(Object.fromEntries(
    services.map((service) => [
      `services.${service.key}`,
      { path: servicePath(service), ...serviceMeta[service.key] },
    ])
  ) as Record<`services.${ServiceKey}`, PageMeta>),
  ...(Object.fromEntries(
    personas.map((persona) => [
      `who_we_serve.${persona.key}`,
      { path: personaPath(persona), ...personaMeta[persona.key] },
    ])
  ) as Record<`who_we_serve.${PersonaKey}`, PageMeta>),
} satisfies Record<string, PageMeta>

export type MarketingPageKey = keyof typeof marketingPages

export type SeoAlternate = { hreflang: string; href: string }

export type SeoMeta = {
  locale: Locale
  title: string
  description: string
  canonical: string
  alternates: SeoAlternate[]
}

export function absoluteUrl(path: string) {
  return new URL(path, env.get('APP_URL')).href
}

export function seoFor(key: MarketingPageKey, locale: Locale): SeoMeta {
  const { path, title, description } = marketingPages[key]
  return {
    locale,
    title: title[locale],
    description: description[locale],
    canonical: absoluteUrl(localizePath(path, locale)),
    alternates: [
      ...LOCALES.map((alternate) => ({
        hreflang: alternate,
        href: absoluteUrl(localizePath(path, alternate)),
      })),
      { hreflang: 'x-default', href: absoluteUrl(localizePath(path, DEFAULT_LOCALE)) },
    ],
  }
}
