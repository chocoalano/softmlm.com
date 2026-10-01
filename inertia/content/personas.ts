import type { Component } from 'vue'
import {
  BadgeCheck,
  Briefcase,
  ChartNoAxesCombined,
  ClipboardCheck,
  Code,
  Compass,
  Eye,
  FileSearch,
  GitBranch,
  Handshake,
  Landmark,
  Link2,
  ListChecks,
  MapPinned,
  Network,
  PackageCheck,
  Receipt,
  RotateCcw,
  Route,
  Scale,
  Server,
  Settings2,
  ShieldCheck,
  Share2,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Trophy,
  UserRound,
  UsersRound,
  Wallet,
  Workflow,
} from 'lucide-vue-next'
import type { PersonaKey } from '@shared/personas'
import { INTEGRATIONS_PATH } from '@shared/integrations'
import { SECURITY_PATH } from '@shared/security'

/**
 * The structure of /who-we-serve and the five role pages: icons, links,
 * the teams each role connects to and how its problems are laid out.
 *
 * All copy lives in the `personas` area of i18n/en and i18n/id. Lists here
 * are in the same order as the lists of copy they decorate (the icon of the
 * second "What matters" item is the second icon in `matters`).
 */

export const personaIcons: Record<PersonaKey, Component> = {
  executives: Briefcase,
  finance: Landmark,
  operations: Settings2,
  it: Code,
  distributors: Smartphone,
}

/**
 * How the "common problems" section is laid out. Each role recognises its
 * problems differently: owners in their own words, finance as questions,
 * operations as scenarios, IT as topics to evaluate, and distributors as
 * the questions members send to support.
 */
export type ProblemStyle = 'quotes' | 'questions' | 'scenarios' | 'topics' | 'member'

export type PersonaStructure = {
  /** Icons of the "What matters" items. */
  matters: Component[]
  problems: ProblemStyle
  /** Icon and, for linked cards, the site path of each relevant area. */
  areas: { icon: Component; href?: string }[]
  /** Site paths of the links under the areas. */
  related?: string[]
  /** The teams this role's work reaches. */
  connections: PersonaKey[]
}

export const personaStructure: Record<PersonaKey, PersonaStructure> = {
  executives: {
    matters: [Eye, Compass, Scale, ShieldCheck, ChartNoAxesCombined],
    problems: 'quotes',
    areas: [
      { icon: ChartNoAxesCombined, href: '/#command-center' },
      { icon: Scale, href: '/compensation-plans' },
      { icon: Network, href: '/#network' },
      { icon: Receipt, href: '/pricing' },
    ],
    connections: ['finance', 'operations', 'distributors'],
  },
  finance: {
    matters: [FileSearch, ClipboardCheck, RotateCcw, Receipt, Scale],
    problems: 'questions',
    areas: [
      { icon: Scale, href: '/compensation-plans' },
      { icon: RotateCcw, href: '/compensation-plans#reversal' },
      { icon: Receipt, href: '/compensation-plans#wallet-tax' },
      { icon: Wallet, href: '/#wallet' },
    ],
    connections: ['operations', 'executives', 'distributors'],
  },
  operations: {
    matters: [UserRound, ListChecks, Handshake, BadgeCheck, ChartNoAxesCombined],
    problems: 'scenarios',
    areas: [
      { icon: UsersRound, href: '/#feature-members' },
      { icon: ShoppingBag, href: '/#feature-ecommerce' },
      { icon: Network, href: '/#network' },
      { icon: Workflow, href: '/#implementation' },
    ],
    connections: ['finance', 'distributors', 'it'],
  },
  it: {
    matters: [ClipboardCheck, Link2, ShieldCheck, GitBranch, Server],
    problems: 'topics',
    areas: [
      { icon: Link2, href: INTEGRATIONS_PATH },
      { icon: ShieldCheck, href: SECURITY_PATH },
      { icon: Route, href: '/#implementation' },
      { icon: ListChecks, href: '/pricing#estimate' },
    ],
    connections: ['finance', 'operations', 'executives'],
  },
  distributors: {
    matters: [ChartNoAxesCombined, Trophy, Wallet, UsersRound, Share2],
    problems: 'member',
    areas: [
      { icon: ChartNoAxesCombined },
      { icon: Network },
      { icon: Trophy },
      { icon: Wallet },
      { icon: Share2 },
      { icon: PackageCheck },
      { icon: Sparkles },
      { icon: MapPinned },
    ],
    related: ['/compensation-plans#ranks', '/pricing#estimate'],
    connections: ['operations', 'finance', 'executives'],
  },
}

/**
 * /who-we-serve: one returned order, followed through every team it
 * touches. The steps that belong to a role link to its page.
 */
export const teamFlowPersonas: (PersonaKey | null)[] = [
  null,
  'operations',
  null,
  'finance',
  'distributors',
  'executives',
]
