import leadsConfig, {
  interestCategoryOf,
  isConsultationSource,
  isIntegrationSource,
} from '#config/leads'
import type { InterestCategory } from '#config/leads'
import type DemoRequest from '#models/demo_request'

const labelOf = (list: readonly { value: string; label: string }[], value: string | null) =>
  value ? (list.find((item) => item.value === value)?.label ?? value) : null

/**
 * How the sales inbox names a consultation in the subject and heading.
 */
const INQUIRY_NAMES: Record<InterestCategory, string> = {
  software: 'software',
  social_media: 'Social Media',
  seo: 'SEO',
  paid_advertising: 'Advertising',
  branding: 'Branding',
  product_maklon: 'Maklon',
  multiple: 'multi-service',
}

/**
 * The lead fields both emails may show, with option keys turned into the
 * labels a person reads. A consultation request (services pages) is told
 * apart from a software demo request, and shows what the visitor wants to
 * discuss instead of the software questions. An integration consultation
 * lists the integration areas and whether an API or documentation exists;
 * the system name the visitor typed stays in the back office, like the
 * message.
 */
export function leadEmailData(lead: DemoRequest, acquisition: [string, string][] = []) {
  const consultation = isConsultationSource(lead.source) || Boolean(lead.serviceInterests?.length)
  const category = interestCategoryOf(lead.serviceInterests)
  const services = (lead.serviceInterests ?? [])
    .map((value) => labelOf(leadsConfig.serviceInterests, value))
    .filter(Boolean) as string[]
  const modules = (lead.selectedModulesSnapshot ?? [])
    .map((value) => labelOf(leadsConfig.modules, value))
    .filter(Boolean) as string[]
  const businessType = labelOf(leadsConfig.businessTypes, lead.businessType)
  const activeMembers = labelOf(leadsConfig.memberRanges, lead.activeMembers)
  const productStage = labelOf(leadsConfig.productStages, lead.serviceDetails?.productStage ?? null)
  const targetLaunch = labelOf(
    leadsConfig.targetLaunches,
    lead.serviceDetails?.targetLaunch ?? null
  )
  const integration = isIntegrationSource(lead.source)
  const integrationNeeds = (lead.serviceDetails?.integrationNeeds ?? [])
    .map((value) => labelOf(leadsConfig.integrationNeeds, value))
    .filter(Boolean) as string[]
  const apiDocumentation = labelOf(
    leadsConfig.apiDocumentationAnswers,
    lead.serviceDetails?.apiDocumentation ?? null
  )

  const contact: [string, string][] = [
    ['Name', lead.fullName],
    ['Company', lead.company],
    ['Email', lead.email],
    ['Phone', lead.phone || '—'],
  ]
  const rows: [string, string][] = integration
    ? [
        ...contact,
        ['Interest', 'Integration'],
        ['Integration areas', integrationNeeds.length ? integrationNeeds.join(', ') : '—'],
        ['API / documentation', apiDocumentation ?? '—'],
      ]
    : consultation
      ? [
          ...contact,
          ['Interest', labelOf(leadsConfig.interestCategories, category) ?? '—'],
          ['Services', services.length ? services.join(', ') : '—'],
          ...(productStage ? [['Product stage', productStage] as [string, string]] : []),
          ...(targetLaunch ? [['Target launch', targetLaunch] as [string, string]] : []),
        ]
      : [
          ...contact,
          ['Company type', businessType || '—'],
          ['Active members', activeMembers || '—'],
          ['Modules', modules.length ? modules.join(', ') : '—'],
        ]

  return {
    acquisition,
    kind: consultation ? ('consultation' as const) : ('demo' as const),
    inquiryName: integration ? 'integration' : INQUIRY_NAMES[category],
    headline: consultation
      ? `New ${integration ? 'integration' : INQUIRY_NAMES[category]} inquiry from`
      : 'New demo request from',
    rows,
    fullName: lead.fullName,
    firstName: lead.fullName.split(' ')[0],
    company: lead.company,
    email: lead.email,
    phone: lead.phone,
    businessType,
    activeMembers,
    modules,
    services,
    source: labelOf(leadsConfig.sources, lead.source),
    utm: [
      ['Source', lead.utmSource],
      ['Medium', lead.utmMedium],
      ['Campaign', lead.utmCampaign],
      ['Content', lead.utmContent],
      ['Term', lead.utmTerm],
    ].filter(([, value]) => Boolean(value)) as [string, string][],
    landingPage: lead.landingPage,
    referrer: lead.referrer,
  }
}
