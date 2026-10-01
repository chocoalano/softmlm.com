import {
  ChartColumn,
  Gift,
  ListChecks,
  Network,
  ShoppingCart,
  SlidersHorizontal,
  UserRoundCheck,
  Wallet,
} from 'lucide-vue-next'

/**
 * The platform areas, shared by the header menu, the feature explorer tabs
 * and the footer so they never drift apart. Their names and summaries are
 * copy: see `modules` in i18n/en and i18n/id.
 */
export const modules = [
  { key: 'members', icon: UserRoundCheck },
  { key: 'compensation', icon: SlidersHorizontal },
  { key: 'ecommerce', icon: ShoppingCart },
  { key: 'network', icon: Network },
  { key: 'wallet', icon: Wallet },
  { key: 'rewards', icon: Gift },
  { key: 'analytics', icon: ChartColumn },
  { key: 'operations', icon: ListChecks },
] as const

export type ModuleKey = (typeof modules)[number]['key']

/**
 * Plan architectures by their industry names (the same in every language).
 */
export const compensationPlans = [
  'Binary',
  'Unilevel',
  'Matrix',
  'Generation',
  'Stairstep',
  'Board',
  'Australian',
  'Hybrid',
  'Custom',
] as const
