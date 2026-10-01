/**
 * The "How We Do It" page: the implementation journey from discovery to
 * post-launch support (docs/implementation-marketing.md). Routes, SEO,
 * navigation and the page read this module.
 */

export const HOW_WE_DO_IT_PATH = '/how-we-do-it'

/** The `page` value sent with conversion events (see shared/analytics.ts). */
export const HOW_WE_DO_IT_TRACKING_PAGE = 'how_we_do_it'

/**
 * The nine phases, in order. Each key is also the phase's anchor on the
 * page (#phase-discover …) and its key in the page dictionary.
 */
export const implementationPhases = [
  'discover',
  'blueprint',
  'configure',
  'integrate',
  'migrate',
  'test',
  'train',
  'launch',
  'support',
] as const

export type ImplementationPhase = (typeof implementationPhases)[number]

export function phaseAnchor(phase: ImplementationPhase) {
  return `phase-${phase}`
}
