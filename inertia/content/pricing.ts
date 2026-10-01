import {
  Blocks,
  Cable,
  DatabaseZap,
  GraduationCap,
  Headset,
  Layers,
  Network,
  PlugZap,
  Rocket,
  SearchCheck,
  Settings2,
  SlidersHorizontal,
  TestTubeDiagonal,
  UsersRound,
} from 'lucide-vue-next'

/**
 * Structure of /pricing: which price factors and implementation steps are
 * shown, in which order, with which icon. Their titles and texts are copy:
 * see `pricing.details` in i18n/en and i18n/id.
 */
export const priceFactors = [
  { key: 'scale', icon: UsersRound },
  { key: 'compensation', icon: SlidersHorizontal },
  { key: 'modules', icon: Blocks },
  { key: 'integration', icon: Cable },
  { key: 'migration', icon: DatabaseZap },
  { key: 'support', icon: Headset },
] as const

export const implementationSteps = [
  { key: 'discovery', icon: SearchCheck },
  { key: 'mapping', icon: Network },
  { key: 'configuration', icon: Settings2 },
  { key: 'integration', icon: PlugZap },
  { key: 'migration', icon: Layers },
  { key: 'testing', icon: TestTubeDiagonal },
  { key: 'training', icon: GraduationCap },
  { key: 'launch', icon: Rocket },
] as const
