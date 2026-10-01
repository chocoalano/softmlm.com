import vine from '@vinejs/vine'
import leadsConfig, { values } from '#config/leads'

export const sortColumns = ['created_at', 'updated_at', 'company', 'full_name', 'status'] as const

/**
 * Filters for the lead list. Parsed with `tryValidate` so a hand-edited
 * query string falls back to defaults instead of erroring.
 */
export const leadFiltersValidator = vine.create({
  q: vine.string().trim().maxLength(100).optional(),
  status: vine.enum(values(leadsConfig.statuses)).optional(),
  businessType: vine.enum(values(leadsConfig.businessTypes)).optional(),
  activeMembers: vine.enum(values(leadsConfig.memberRanges)).optional(),
  source: vine.enum(values(leadsConfig.sources)).optional(),
  interest: vine.enum(values(leadsConfig.interestCategories)).optional(),
  from: vine.date({ formats: ['YYYY-MM-DD'] }).optional(),
  to: vine.date({ formats: ['YYYY-MM-DD'] }).optional(),
  sort: vine.enum(sortColumns).optional(),
  direction: vine.enum(['asc', 'desc'] as const).optional(),
  page: vine.number().withoutDecimals().min(1).max(100000).optional(),
})

export const leadStatusValidator = vine.create({
  status: vine.enum(values(leadsConfig.statuses)),
})

export const leadNoteValidator = vine.create({
  body: vine.string().trim().minLength(1).maxLength(5000),
})
