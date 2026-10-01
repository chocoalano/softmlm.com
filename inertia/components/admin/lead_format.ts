import type { AdminLeadOptions } from '#config/leads'

type Option = { value: string; label: string }

/**
 * Display helpers shared by the lead list and detail pages.
 */
export function labelFor(list: Option[], value: string | null | undefined) {
  if (!value) return '—'
  return list.find((item) => item.value === value)?.label ?? value
}

export function moduleLabels(options: AdminLeadOptions, modules: string[] | null | undefined) {
  if (!modules?.length) return '—'
  return modules.map((value) => labelFor(options.modules, value)).join(', ')
}

/**
 * "Software inquiry", "Branding", or "Multiple services: SEO, Branding".
 */
export function interestLabel(
  options: AdminLeadOptions,
  category: string | null | undefined,
  interests: string[] | null | undefined
) {
  const name = labelFor(options.interestCategories, category ?? 'software')
  if (category !== 'multiple' || !interests?.length) return name
  return `${name}: ${interests.map((value) => labelFor(options.serviceInterests, value)).join(', ')}`
}

/**
 * Back-office dates are shown in the business timezone (config/business.ts),
 * whatever the browser's own zone. Set once from the shared page props.
 */
let timeZone = 'Asia/Jakarta'
let formats = createFormats(timeZone)

function createFormats(zone: string) {
  return {
    dateTime: new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: zone,
    }),
    day: new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeZone: zone }),
    time: new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: zone }),
  }
}

export function setDisplayTimeZone(zone: unknown) {
  if (typeof zone !== 'string' || zone === timeZone) return
  try {
    formats = createFormats(zone)
    timeZone = zone
  } catch {
    // unknown zone: keep the current one
  }
}

export function formatDateTime(value: string | null | undefined) {
  return value ? formats.dateTime.format(new Date(value)) : '—'
}

export function formatDay(value: string) {
  return formats.day.format(new Date(value))
}

export function formatTime(value: string) {
  return formats.time.format(new Date(value))
}
