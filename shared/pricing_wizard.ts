/**
 * State rules for the pricing needs estimate. Kept framework-free so the
 * step logic can be unit tested. The wizard never produces a price: it
 * collects context for the sales conversation.
 */
import type {
  BusinessType,
  CompensationComplexity,
  CurrentSystem,
  IntegrationNeed,
  LeadModule,
  MemberRange,
  MigrationScope,
  PricingEstimateSnapshot,
} from '#config/leads'

export type WizardMode = 'quick' | 'full'
export type WizardStep = 'business' | 'modules' | 'implementation'

export type WizardAnswers = {
  businessType: BusinessType | ''
  activeMembers: MemberRange | ''
  currentSystem: CurrentSystem | ''
  modules: LeadModule[]
  compensationComplexity: CompensationComplexity | ''
  dataMigration: MigrationScope[]
  integrations: IntegrationNeed[]
}

export const STEPS: Record<WizardMode, WizardStep[]> = {
  quick: ['business', 'modules'],
  full: ['business', 'modules', 'implementation'],
}

export function emptyAnswers(): WizardAnswers {
  return {
    businessType: '',
    activeMembers: '',
    currentSystem: '',
    modules: [],
    compensationComplexity: '',
    dataMigration: [],
    integrations: [],
  }
}

export function isStepComplete(step: WizardStep, answers: WizardAnswers, mode: WizardMode) {
  if (step === 'business') {
    return Boolean(
      answers.businessType && answers.activeMembers && (mode === 'quick' || answers.currentSystem)
    )
  }
  if (step === 'modules') return answers.modules.length > 0
  return Boolean(
    answers.compensationComplexity &&
    answers.dataMigration.length > 0 &&
    answers.integrations.length > 0
  )
}

/**
 * Multi-select where "none" / "not sure" exclude every other choice: picking
 * one of them clears the rest, and picking a real option clears them.
 */
export function toggleChoice<T extends string>(list: T[], value: T, exclusive: T[] = []): T[] {
  if (list.includes(value)) return list.filter((item) => item !== value)
  if (exclusive.includes(value)) return [value]
  return [...list.filter((item) => !exclusive.includes(item)), value]
}

/**
 * The answers stored with a lead: only what the mode asked for, and no
 * empty values.
 */
export function toSnapshot(answers: WizardAnswers, mode: WizardMode): PricingEstimateSnapshot {
  const snapshot: PricingEstimateSnapshot = {}
  if (answers.businessType) snapshot.businessType = answers.businessType
  if (answers.activeMembers) snapshot.activeMembers = answers.activeMembers
  if (answers.modules.length) snapshot.modules = [...answers.modules]
  if (mode === 'full') {
    if (answers.currentSystem) snapshot.currentSystem = answers.currentSystem
    if (answers.compensationComplexity) {
      snapshot.compensationComplexity = answers.compensationComplexity
    }
    if (answers.dataMigration.length) snapshot.dataMigration = [...answers.dataMigration]
    if (answers.integrations.length) snapshot.integrations = [...answers.integrations]
  }
  return snapshot
}

/**
 * Restores answers saved earlier in the visit, ignoring anything that is
 * not a known value (an old or tampered sessionStorage entry).
 */
export function restoreAnswers(raw: unknown, allowed: Record<keyof WizardAnswers, string[]>) {
  const answers = emptyAnswers()
  if (!raw || typeof raw !== 'object') return answers
  const source = raw as Record<string, unknown>
  for (const key of Object.keys(answers) as (keyof WizardAnswers)[]) {
    const value = source[key]
    const current = answers[key]
    if (Array.isArray(current)) {
      if (Array.isArray(value)) {
        ;(answers[key] as string[]) = value.filter(
          (item): item is string => typeof item === 'string' && allowed[key].includes(item)
        )
      }
    } else if (typeof value === 'string' && allowed[key].includes(value)) {
      ;(answers[key] as string) = value
    }
  }
  return answers
}
