import type { Locale } from '#shared/locales'

/**
 * Lead ("Book a Demo") configuration: the options visitors can pick, the
 * sales lifecycle, allowed lead sources and anti-spam limits.
 *
 * This file is the single source of truth. The marketing pages receive the
 * option lists as Inertia props, and the validator only accepts values
 * defined here, so a label can change without breaking stored data.
 */

const leadsConfig = {
  /**
   * Sales lifecycle. The order matters: it is the order shown in the admin.
   */
  statuses: [
    { value: 'new', label: 'New' },
    { value: 'contacted', label: 'Contacted' },
    { value: 'qualified', label: 'Qualified' },
    { value: 'demo_scheduled', label: 'Demo scheduled' },
    { value: 'converted', label: 'Converted' },
    { value: 'closed', label: 'Closed' },
    { value: 'spam', label: 'Spam' },
  ],

  /**
   * Where a lead was submitted from. Every public form must send one of
   * these, so reports can separate the homepage from the pricing page.
   */
  sources: [
    { value: 'homepage_demo', label: 'Homepage demo form' },
    { value: 'homepage_estimator', label: 'Homepage pricing estimator' },
    { value: 'pricing_page', label: 'Pricing page' },
    { value: 'compensation_page', label: 'Compensation plans page' },
    { value: 'integration_page', label: 'Integrations page' },
    { value: 'security_page', label: 'Security page' },
    { value: 'feature_page', label: 'Feature page' },
    { value: 'role_page', label: 'Who we serve page' },
    { value: 'implementation_page', label: 'How we do it page' },
    { value: 'services_overview', label: 'Services overview' },
    { value: 'service_social_media', label: 'Social media service page' },
    { value: 'service_seo', label: 'SEO service page' },
    { value: 'service_paid_advertising', label: 'Advertising service page' },
    { value: 'service_branding', label: 'Branding service page' },
    { value: 'service_product_maklon', label: 'Maklon service page' },
  ],

  /**
   * What a consultation request is about: the software or one of the growth
   * services (shared/services.ts). Stored in `service_interests`; a lead
   * without it is a software demo or estimate request.
   */
  serviceInterests: [
    { value: 'software', label: 'MLM / Direct Selling Software' },
    { value: 'social_media', label: 'Social Media Management' },
    { value: 'seo', label: 'SEO & Content' },
    { value: 'paid_advertising', label: 'Paid Advertising' },
    { value: 'branding', label: 'Branding & Creative' },
    { value: 'product_maklon', label: 'Product Development / Maklon' },
  ],

  /**
   * How the back office groups leads: derived from `service_interests`
   * (none → software, one → that service, several → multiple).
   */
  interestCategories: [
    { value: 'software', label: 'Software inquiry' },
    { value: 'social_media', label: 'Social Media' },
    { value: 'seo', label: 'SEO' },
    { value: 'paid_advertising', label: 'Advertising' },
    { value: 'branding', label: 'Branding' },
    { value: 'product_maklon', label: 'Maklon' },
    { value: 'multiple', label: 'Multiple services' },
  ],

  /**
   * The optional needs selector on the maklon page. Deliberately no product
   * categories: none are verified yet (docs/product-maklon-evidence.md).
   */
  productStages: [
    { value: 'idea', label: 'Just an idea' },
    { value: 'concept_ready', label: 'Product concept ready' },
    { value: 'product_exists', label: 'Formula or product already exists' },
    { value: 'new_manufacturing', label: 'Looking for a new manufacturing setup' },
  ],

  targetLaunches: [
    { value: 'within_3_months', label: 'Within 3 months' },
    { value: '3_6_months', label: '3–6 months' },
    { value: 'over_6_months', label: 'More than 6 months' },
    { value: 'not_sure', label: 'Not decided yet' },
  ],

  /**
   * Business model, shared by the homepage quick estimator, /pricing, the
   * demo form and the admin filters.
   */
  businessTypes: [
    {
      value: 'mlm',
      label: 'MLM / Network Marketing',
      description: 'Members earn on their own sales and on their network',
    },
    {
      value: 'direct_selling',
      label: 'Direct Selling',
      description: 'Products sold person to person by independent sellers',
    },
    {
      value: 'reseller',
      label: 'Reseller / Distributor',
      description: 'Tiered resellers, agents or stockists',
    },
    {
      value: 'affiliate',
      label: 'Affiliate',
      description: 'Commission on referred sales, usually one or two levels',
    },
    {
      value: 'community_commerce',
      label: 'Community Commerce',
      description: 'Selling through communities and group buying',
    },
    { value: 'other', label: 'Other', description: 'Something else, or a mix of the above' },
  ],

  memberRanges: [
    { value: 'under_1k', label: '< 1,000' },
    { value: '1k_5k', label: '1,000 – 5,000' },
    { value: '5k_25k', label: '5,001 – 25,000' },
    { value: '25k_100k', label: '25,001 – 100,000' },
    { value: 'over_100k', label: '100,000+' },
  ],

  modules: [
    {
      value: 'member_management',
      label: 'Member Management',
      description: 'Registration, member data, verification and status',
    },
    {
      value: 'compensation',
      label: 'Compensation Plan',
      description: 'Bonuses, qualifications and ranks',
    },
    {
      value: 'ecommerce',
      label: 'Ecommerce',
      description: 'Products, member pricing, checkout and orders',
    },
    {
      value: 'network',
      label: 'Network Management',
      description: 'Sponsor and placement structure, genealogy',
    },
    {
      value: 'wallet_payout',
      label: 'Wallet & Payout',
      description: 'Member balances, withdrawals and payouts',
    },
    {
      value: 'rewards',
      label: 'Reward & Loyalty',
      description: 'Points, vouchers, campaigns and milestones',
    },
    {
      value: 'analytics',
      label: 'Analytics',
      description: 'Reports and dashboards for owners and finance',
    },
    {
      value: 'mobile',
      label: 'Mobile Experience',
      description: 'A mobile-friendly experience for your members',
    },
    {
      value: 'api_integrations',
      label: 'Integration / API',
      description: 'Connecting payment, logistics and other systems',
    },
  ],

  currentSystems: [
    { value: 'none', label: 'Not yet' },
    { value: 'replacing', label: 'Yes, we want to replace or migrate it' },
    { value: 'in_development', label: 'One is being developed' },
  ],

  compensationComplexities: [
    { value: 'simple', label: 'Simple', description: 'One or two bonus types' },
    {
      value: 'multiple',
      label: 'Multiple bonuses or qualifications',
      description: 'Several bonus types, ranks or qualification rules',
    },
    {
      value: 'custom',
      label: 'Custom, or not sure yet',
      description: 'Unusual rules, or a plan that still needs mapping',
    },
  ],

  migrationScopes: [
    { value: 'none', label: 'None' },
    { value: 'member_data', label: 'Member data' },
    { value: 'network_structure', label: 'Network structure' },
    { value: 'transaction_history', label: 'Transaction history' },
    { value: 'unsure', label: 'Not sure yet' },
  ],

  /**
   * Broad integration areas (never providers), shared by the estimator, the
   * integration consultation on /integrations, the back office and emails
   * (docs/integrations-marketing.md).
   */
  integrationNeeds: [
    { value: 'payment', label: 'Payment' },
    { value: 'banking', label: 'Banking / Payout' },
    { value: 'logistics', label: 'Logistics' },
    { value: 'accounting', label: 'Accounting / Finance' },
    { value: 'messaging', label: 'Messaging' },
    { value: 'internal_system', label: 'Existing internal system' },
    { value: 'other', label: 'Other' },
    { value: 'unsure', label: 'Not sure yet' },
  ],

  /** "Is there an API or documentation for the system?" on the integration consultation. */
  apiDocumentationAnswers: [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
    { value: 'not_sure', label: 'Not sure' },
  ],

  /**
   * A second submission with the same email or phone inside this window is
   * treated as a double submit and not stored again. After the window a
   * repeat request is a new, legitimate lead.
   */
  duplicateWindowMinutes: 15,

  /**
   * Back-office roles allowed to view and work leads.
   */
  managerRoles: ['admin', 'sales'],

  /**
   * The timestamp recorded the first time a lead reaches a status. It is
   * never overwritten when a lead moves back and forth.
   */
  statusTimestamps: {
    contacted: 'contactedAt',
    qualified: 'qualifiedAt',
    demo_scheduled: 'demoScheduledAt',
    converted: 'convertedAt',
    closed: 'closedAt',
  },

  adminPageSize: 25,

  /**
   * Server-side rate limit for POST /demo-requests, per client IP.
   */
  rateLimit: {
    requests: 5,
    window: '10 minutes',
    blockFor: '15 minutes',
  },
} as const

export default leadsConfig

type Option<T extends readonly { value: string }[]> = T[number]['value']

export type LeadStatus = Option<typeof leadsConfig.statuses>
export type LeadSource = Option<typeof leadsConfig.sources>
export type BusinessType = Option<typeof leadsConfig.businessTypes>
export type MemberRange = Option<typeof leadsConfig.memberRanges>
export type LeadModule = Option<typeof leadsConfig.modules>
export type CurrentSystem = Option<typeof leadsConfig.currentSystems>
export type CompensationComplexity = Option<typeof leadsConfig.compensationComplexities>
export type MigrationScope = Option<typeof leadsConfig.migrationScopes>
export type IntegrationNeed = Option<typeof leadsConfig.integrationNeeds>
export type ServiceInterestOption = Option<typeof leadsConfig.serviceInterests>
export type InterestCategory = Option<typeof leadsConfig.interestCategories>
export type ProductStage = Option<typeof leadsConfig.productStages>
export type TargetLaunch = Option<typeof leadsConfig.targetLaunches>
export type ApiDocumentationAnswer = Option<typeof leadsConfig.apiDocumentationAnswers>

/**
 * Optional answers from a service page or the integration consultation,
 * stored in `service_details`. Never credentials: the form asks only
 * whether an API or documentation exists.
 */
export type ServiceDetails = {
  productStage?: ProductStage
  targetLaunch?: TargetLaunch
  integrationNeeds?: IntegrationNeed[]
  apiDocumentation?: ApiDocumentationAnswer
  /** The system's name or a short description, typed by the visitor. */
  existingSystem?: string
}

export const values = <T extends readonly { value: string }[]>(options: T) =>
  options.map((option) => option.value) as Option<T>[]

export type LeadOption<Value extends string> = { value: Value; label: string }

type Described<Value extends string> = LeadOption<Value> & { description: string }

export type PublicLeadOptions = {
  businessTypes: Described<BusinessType>[]
  memberRanges: LeadOption<MemberRange>[]
  modules: Described<LeadModule>[]
  currentSystems: LeadOption<CurrentSystem>[]
  compensationComplexities: Described<CompensationComplexity>[]
  migrationScopes: LeadOption<MigrationScope>[]
  integrationNeeds: LeadOption<IntegrationNeed>[]
  serviceInterests: LeadOption<ServiceInterestOption>[]
  productStages: LeadOption<ProductStage>[]
  targetLaunches: LeadOption<TargetLaunch>[]
  apiDocumentationAnswers: LeadOption<ApiDocumentationAnswer>[]
}

/**
 * The option lists the public forms need, sent to pages as props. These are
 * the English labels, also used by the back office.
 */
export const publicLeadOptions: PublicLeadOptions = {
  businessTypes: [...leadsConfig.businessTypes],
  memberRanges: [...leadsConfig.memberRanges],
  modules: [...leadsConfig.modules],
  currentSystems: [...leadsConfig.currentSystems],
  compensationComplexities: [...leadsConfig.compensationComplexities],
  migrationScopes: [...leadsConfig.migrationScopes],
  integrationNeeds: [...leadsConfig.integrationNeeds],
  serviceInterests: [...leadsConfig.serviceInterests],
  productStages: [...leadsConfig.productStages],
  targetLaunches: [...leadsConfig.targetLaunches],
  apiDocumentationAnswers: [...leadsConfig.apiDocumentationAnswers],
}

type Text = { label: string; description?: string }

/**
 * Indonesian labels for the same stored values. Only the text a visitor
 * reads changes; the value sent to the server and stored stays the key.
 */
const indonesianLabels: {
  businessTypes: Record<BusinessType, Required<Text>>
  memberRanges: Record<MemberRange, string>
  modules: Record<LeadModule, Required<Text>>
  currentSystems: Record<CurrentSystem, string>
  compensationComplexities: Record<CompensationComplexity, Required<Text>>
  migrationScopes: Record<MigrationScope, string>
  integrationNeeds: Record<IntegrationNeed, string>
  serviceInterests: Record<ServiceInterestOption, string>
  productStages: Record<ProductStage, string>
  targetLaunches: Record<TargetLaunch, string>
  apiDocumentationAnswers: Record<ApiDocumentationAnswer, string>
} = {
  businessTypes: {
    mlm: {
      label: 'MLM / Network Marketing',
      description: 'Member mendapat penghasilan dari penjualan pribadi dan dari jaringannya',
    },
    direct_selling: {
      label: 'Direct Selling',
      description: 'Produk dijual langsung oleh penjual independen',
    },
    reseller: {
      label: 'Reseller / Distributor',
      description: 'Reseller, agen atau stokis bertingkat',
    },
    affiliate: {
      label: 'Affiliate',
      description: 'Komisi dari penjualan hasil referensi, biasanya satu atau dua level',
    },
    community_commerce: {
      label: 'Bisnis Komunitas',
      description: 'Penjualan melalui komunitas dan pembelian bersama',
    },
    other: { label: 'Lainnya', description: 'Model lain, atau gabungan dari model di atas' },
  },
  memberRanges: {
    'under_1k': '< 1.000',
    '1k_5k': '1.000 – 5.000',
    '5k_25k': '5.001 – 25.000',
    '25k_100k': '25.001 – 100.000',
    'over_100k': '100.000+',
  },
  modules: {
    member_management: {
      label: 'Manajemen Member',
      description: 'Registrasi, data member, verifikasi dan status',
    },
    compensation: { label: 'Compensation Plan', description: 'Bonus, kualifikasi dan rank' },
    ecommerce: { label: 'Ecommerce', description: 'Produk, harga member, checkout dan order' },
    network: {
      label: 'Manajemen Jaringan',
      description: 'Struktur sponsor dan penempatan, genealogi',
    },
    wallet_payout: { label: 'Wallet & Payout', description: 'Saldo member, penarikan dan payout' },
    rewards: { label: 'Reward & Loyalty', description: 'Poin, voucher, kampanye dan pencapaian' },
    analytics: { label: 'Analitik', description: 'Laporan dan dashboard untuk owner dan finance' },
    mobile: {
      label: 'Pengalaman Mobile',
      description: 'Pengalaman yang nyaman dipakai member dari ponsel',
    },
    api_integrations: {
      label: 'Integrasi / API',
      description: 'Menghubungkan pembayaran, logistik dan sistem lain',
    },
  },
  currentSystems: {
    none: 'Belum ada',
    replacing: 'Sudah ada, ingin diganti atau dimigrasikan',
    in_development: 'Sedang dikembangkan',
  },
  compensationComplexities: {
    simple: { label: 'Sederhana', description: 'Satu atau dua jenis bonus' },
    multiple: {
      label: 'Beberapa bonus atau kualifikasi',
      description: 'Beberapa jenis bonus, rank atau aturan kualifikasi',
    },
    custom: {
      label: 'Custom, atau belum yakin',
      description: 'Aturan yang tidak umum, atau plan yang masih perlu dipetakan',
    },
  },
  migrationScopes: {
    none: 'Tidak ada',
    member_data: 'Data member',
    network_structure: 'Struktur jaringan',
    transaction_history: 'Riwayat transaksi',
    unsure: 'Belum tahu',
  },
  integrationNeeds: {
    payment: 'Pembayaran',
    banking: 'Bank / Payout',
    logistics: 'Logistik',
    accounting: 'Akuntansi / Keuangan',
    messaging: 'Pesan & notifikasi',
    internal_system: 'Sistem internal yang sudah ada',
    other: 'Lainnya',
    unsure: 'Belum tahu',
  },
  serviceInterests: {
    software: 'Software MLM / Direct Selling',
    social_media: 'Pengelolaan Media Sosial',
    seo: 'SEO & Konten',
    paid_advertising: 'Iklan Digital',
    branding: 'Branding & Kreatif',
    product_maklon: 'Pengembangan & Maklon Produk',
  },
  productStages: {
    idea: 'Masih berupa ide',
    concept_ready: 'Konsep produk sudah siap',
    product_exists: 'Formula atau produk sudah ada',
    new_manufacturing: 'Mencari tempat produksi baru',
  },
  targetLaunches: {
    'within_3_months': 'Dalam 3 bulan',
    '3_6_months': '3–6 bulan',
    'over_6_months': 'Lebih dari 6 bulan',
    'not_sure': 'Belum ditentukan',
  },
  apiDocumentationAnswers: {
    yes: 'Ya',
    no: 'Tidak',
    not_sure: 'Belum tahu',
  },
}

const relabel = <V extends string, T extends LeadOption<V>>(
  options: readonly T[],
  labels: Record<V, string | Required<Text>>
): T[] =>
  options.map((option) => {
    const text = labels[option.value]
    return typeof text === 'string'
      ? { ...option, label: text }
      : { ...option, label: text.label, description: text.description }
  })

/**
 * The public option lists in a visitor's language.
 */
export function publicLeadOptionsFor(locale: Locale): PublicLeadOptions {
  if (locale === 'en') return publicLeadOptions
  const labels = indonesianLabels
  return {
    businessTypes: relabel(publicLeadOptions.businessTypes, labels.businessTypes),
    memberRanges: relabel(publicLeadOptions.memberRanges, labels.memberRanges),
    modules: relabel(publicLeadOptions.modules, labels.modules),
    currentSystems: relabel(publicLeadOptions.currentSystems, labels.currentSystems),
    compensationComplexities: relabel(
      publicLeadOptions.compensationComplexities,
      labels.compensationComplexities
    ),
    migrationScopes: relabel(publicLeadOptions.migrationScopes, labels.migrationScopes),
    integrationNeeds: relabel(publicLeadOptions.integrationNeeds, labels.integrationNeeds),
    serviceInterests: relabel(publicLeadOptions.serviceInterests, labels.serviceInterests),
    productStages: relabel(publicLeadOptions.productStages, labels.productStages),
    targetLaunches: relabel(publicLeadOptions.targetLaunches, labels.targetLaunches),
    apiDocumentationAnswers: relabel(
      publicLeadOptions.apiDocumentationAnswers,
      labels.apiDocumentationAnswers
    ),
  }
}

/**
 * Answers from a pricing estimator, stored with the lead as a snapshot so
 * later changes to the estimator never rewrite what the visitor chose.
 */
export type PricingEstimateSnapshot = {
  businessType?: BusinessType
  activeMembers?: MemberRange
  currentSystem?: CurrentSystem
  modules?: LeadModule[]
  compensationComplexity?: CompensationComplexity
  dataMigration?: MigrationScope[]
  integrations?: IntegrationNeed[]
}

export type AdminLeadOptions = PublicLeadOptions & {
  statuses: LeadOption<LeadStatus>[]
  sources: LeadOption<LeadSource>[]
  interestCategories: LeadOption<InterestCategory>[]
}

/**
 * Option lists (with labels) the back office needs to render filters,
 * badges and status controls.
 */
export const adminLeadOptions: AdminLeadOptions = {
  ...publicLeadOptions,
  statuses: [...leadsConfig.statuses],
  sources: [...leadsConfig.sources],
  interestCategories: [...leadsConfig.interestCategories],
}

/**
 * The back-office grouping of a lead. Leads from before Phase 9, and every
 * demo or estimate request, have no service interests: they are software
 * inquiries.
 */
export const consultationSources = [
  'services_overview',
  'service_social_media',
  'service_seo',
  'service_paid_advertising',
  'service_branding',
  'service_product_maklon',
] as const satisfies readonly LeadSource[]

/**
 * Consultation requests come from the services pages; every other source
 * is a software demo or estimate request.
 */
/**
 * Consultations without service topics: the integration consultation on
 * /integrations. Its purpose comes from the source (Integration).
 */
export const integrationSources = ['integration_page'] as const satisfies readonly LeadSource[]

export function isConsultationSource(source: string) {
  return (
    (consultationSources as readonly string[]).includes(source) ||
    (integrationSources as readonly string[]).includes(source)
  )
}

export function isIntegrationSource(source: string) {
  return (integrationSources as readonly string[]).includes(source)
}

export function interestCategoryOf(
  interests: readonly string[] | null | undefined
): InterestCategory {
  if (!interests?.length) return 'software'
  if (interests.length > 1) return 'multiple'
  return interests[0] as InterestCategory
}
