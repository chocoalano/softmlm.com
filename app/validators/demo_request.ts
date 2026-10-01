import vine from '@vinejs/vine'
import leadsConfig, { consultationSources, values } from '#config/leads'
import { LOCALES } from '#shared/locales'
import { leadFormMessages } from '#i18n/lead_form'

/**
 * Normalises a phone number to international format. Numbers written the
 * Indonesian way ("0812…", "812…", "62812…") become "+62812…"; numbers
 * that already start with "+" keep their country code.
 */
export function normalizePhone(raw: string) {
  const international = raw.trim().startsWith('+')
  let digits = raw.replace(/\D/g, '')
  if (!international) {
    if (digits.startsWith('0')) digits = `62${digits.slice(1)}`
    else if (!digits.startsWith('62')) digits = `62${digits}`
  }
  return `+${digits}`
}

const collapseWhitespace = (value: string) => value.replace(/\s+/g, ' ').trim()

/**
 * An optional list of distinct values taken from one of the lead option lists.
 */
const optionList = <T extends readonly { value: string }[]>(options: T) =>
  vine
    .array(vine.enum(values(options)))
    .maxLength(options.length)
    .distinct()
    .optional()

/**
 * Validator for every public "Book a Demo" / quote form. Only the fields
 * below are ever read, so extra fields in the payload are dropped. The
 * `website` field is a honeypot: humans never see it, bots fill it in.
 */
export const demoRequestValidator = vine.create({
  fullName: vine.string().trim().minLength(2).maxLength(120).transform(collapseWhitespace),
  email: vine.string().trim().email().maxLength(254).toLowerCase(),
  company: vine.string().trim().minLength(2).maxLength(160).transform(collapseWhitespace),
  phone: vine
    .string()
    .trim()
    .regex(/^\+?[\d\s().-]{7,24}$/)
    .transform(normalizePhone)
    .optional(),
  businessType: vine.enum(values(leadsConfig.businessTypes)).optional(),
  activeMembers: vine.enum(values(leadsConfig.memberRanges)).optional(),
  modules: vine
    .array(vine.enum(values(leadsConfig.modules)))
    .maxLength(leadsConfig.modules.length)
    .distinct()
    .optional(),
  message: vine.string().trim().maxLength(2000).optional(),
  source: vine.enum(values(leadsConfig.sources)),
  locale: vine.enum(LOCALES).optional(),
  pricingEstimate: vine
    .object({
      businessType: vine.enum(values(leadsConfig.businessTypes)).optional(),
      activeMembers: vine.enum(values(leadsConfig.memberRanges)).optional(),
      currentSystem: vine.enum(values(leadsConfig.currentSystems)).optional(),
      modules: optionList(leadsConfig.modules),
      compensationComplexity: vine.enum(values(leadsConfig.compensationComplexities)).optional(),
      dataMigration: optionList(leadsConfig.migrationScopes),
      integrations: optionList(leadsConfig.integrationNeeds),
    })
    .optional(),
  /**
   * Consultation requests (services pages): what the visitor wants to
   * discuss, plus optional answers from the maklon needs selector or the
   * integration consultation.
   */
  serviceInterests: vine
    .array(vine.enum(values(leadsConfig.serviceInterests)))
    .minLength(1)
    .maxLength(leadsConfig.serviceInterests.length)
    .distinct()
    .optional()
    .requiredWhen('source', 'in', [...consultationSources]),
  serviceDetails: vine
    .object({
      productStage: vine.enum(values(leadsConfig.productStages)).optional(),
      targetLaunch: vine.enum(values(leadsConfig.targetLaunches)).optional(),
      /** The integration consultation: broad areas, never providers or credentials. */
      integrationNeeds: optionList(leadsConfig.integrationNeeds),
      apiDocumentation: vine.enum(values(leadsConfig.apiDocumentationAnswers)).optional(),
      existingSystem: vine.string().trim().maxLength(120).transform(collapseWhitespace).optional(),
      /** The security consultation: broad topics only, never credentials or findings. */
      securityTopics: optionList(leadsConfig.securityTopics),
    })
    .optional(),
  website: vine.string().optional(),
})

/**
 * English wording by default; the controller passes the page's locale.
 */
demoRequestValidator.messagesProvider = leadFormMessages('en')
