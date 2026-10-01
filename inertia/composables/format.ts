/**
 * Numbers and money in mockups, written the way each language reads them.
 * English "Rp465.2M" means 465 million, but an Indonesian reader takes "M"
 * as miliar (billion), so Indonesian uses "jt" (juta) and spells out
 * "miliar", which no reader can mistake for million:
 *   rupiahShort(465_200_000) → EN "Rp465.2M" · ID "Rp465,2 jt"
 *   rupiahShort(1_840_000_000) → EN "Rp1.84B" · ID "Rp1,84 miliar"
 * Full amounts always use Indonesian grouping (Rp1.250.000), as every
 * Indonesian invoice does.
 */
import { useI18n } from '~/i18n'

export function useFormat() {
  const { locale } = useI18n()
  const tag = () => (locale.value === 'id' ? 'id-ID' : 'en-US')

  const num = (value: number, digits = 0) =>
    value.toLocaleString(tag(), { minimumFractionDigits: digits, maximumFractionDigits: digits })

  const rupiah = (value: number) => `Rp${Math.round(value).toLocaleString('id-ID')}`

  /** Up to two decimals, without trailing zeros, unless `digits` is fixed. */
  function rupiahShort(value: number, digits?: number) {
    const id = locale.value === 'id'
    const sign = value < 0 ? '−' : ''
    const abs = Math.abs(value)
    const fmt = (v: number) =>
      v.toLocaleString(tag(), {
        minimumFractionDigits: digits ?? 0,
        maximumFractionDigits: digits ?? 2,
      })
    if (abs >= 1e9) return `${sign}Rp${fmt(abs / 1e9)}${id ? ' miliar' : 'B'}`
    if (abs >= 1e6) return `${sign}Rp${fmt(abs / 1e6)}${id ? ' jt' : 'M'}`
    if (abs >= 1e3) return `${sign}Rp${fmt(abs / 1e3)}${id ? ' rb' : 'K'}`
    return `${sign}${rupiah(abs)}`
  }

  const percent = (value: number, digits = 1) => `${num(value, digits)}%`

  /** A change with its sign: "+12.4%" / "+12,4%", "−2.3%" / "−2,3%". */
  const change = (value: number, digits = 1, unit = '%') =>
    `${value < 0 ? '−' : '+'}${num(Math.abs(value), digits)}${unit}`

  /** The suffix for thousands, millions, billions: K/M/B · rb/jt/miliar. */
  const scale = (unit: 'K' | 'M' | 'B') =>
    locale.value === 'id' ? { K: ' rb', M: ' jt', B: ' miliar' }[unit] : unit

  return { num, rupiah, rupiahShort, percent, change, scale }
}
