import { reactive } from 'vue'
import type { LeadSource, PricingEstimateSnapshot } from '#config/leads'

/**
 * Answers from a pricing estimate, carried over into the "Book a Demo" form
 * so visitors don't have to repeat themselves. `version` changes on every
 * hand-off so the form knows to pick up new answers.
 */
export const demoPrefill = reactive({
  source: 'homepage_estimator' as LeadSource,
  snapshot: {} as PricingEstimateSnapshot,
  version: 0,
})

export function goToDemo() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document
    .getElementById('demo')
    ?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
}

export function handOffToDemo(snapshot: PricingEstimateSnapshot, source: LeadSource) {
  demoPrefill.snapshot = snapshot
  demoPrefill.source = source
  demoPrefill.version++
  goToDemo()
}
