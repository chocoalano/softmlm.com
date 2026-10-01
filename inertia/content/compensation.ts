/**
 * Compensation structures shown on /compensation-plans as references for
 * mapping a business. They are presented as architectures we discuss, not
 * as features that are available (see docs/capability-evidence.md).
 *
 * Structure only: each key picks its diagram here and its name and
 * description from the `compensation` copy (i18n/en, i18n/id).
 */
export const patterns = [
  { key: 'binary', diagram: 'binary' },
  { key: 'unilevel', diagram: 'unilevel' },
  { key: 'matrix', diagram: 'matrix' },
  { key: 'generation', diagram: 'generation' },
  { key: 'hybrid', diagram: 'hybrid' },
  { key: 'custom', diagram: 'custom' },
] as const
