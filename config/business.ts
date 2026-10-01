import { IANAZone } from 'luxon'
import env from '#start/env'

/**
 * The business's own timezone. Timestamps are stored in UTC; this only
 * decides how the back office shows dates and where "today" starts in its
 * reports. An unknown zone name falls back to Asia/Jakarta.
 */
const configured = env.get('BUSINESS_TIMEZONE', 'Asia/Jakarta')

const businessConfig = {
  timezone: IANAZone.isValidZone(configured) ? configured : 'Asia/Jakarta',
} as const

export default businessConfig
