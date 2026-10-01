import type { Component } from 'vue'
import {
  Cable,
  CalendarCheck,
  ClipboardCheck,
  Eraser,
  FileSearch,
  Handshake,
  MapPinned,
  MessageCircleQuestion,
  Network,
  Radar,
  Receipt,
  Scale,
  Settings2,
  ShoppingBag,
  SlidersHorizontal,
  Smartphone,
  Smile,
  Store,
  Tags,
  TrendingUp,
  Truck,
  Wallet,
} from 'lucide-vue-next'
import type { FeatureKey } from '@shared/features'
import type { PersonaKey } from '@shared/personas'
import { INTEGRATIONS_PATH } from '@shared/integrations'

/**
 * Structure of /features and the feature pages: icons, related teams and
 * the overview groups. The copy lives in i18n/{en,id}/features.ts.
 */

export const featureIcons: Record<FeatureKey, Component> = {
  network: Network,
  ecommerce: ShoppingBag,
  wallet: Wallet,
}

export const featureStructure: Record<
  FeatureKey,
  { outcomeIcons: Component[]; teams: PersonaKey[] }
> = {
  network: {
    outcomeIcons: [TrendingUp, Radar, Handshake, Scale, MapPinned],
    teams: ['executives', 'operations', 'distributors'],
  },
  ecommerce: {
    outcomeIcons: [Tags, CalendarCheck, Eraser, Truck, Store],
    teams: ['operations', 'finance', 'distributors'],
  },
  wallet: {
    outcomeIcons: [MessageCircleQuestion, FileSearch, ClipboardCheck, Receipt, Smile],
    teams: ['finance', 'executives', 'distributors'],
  },
}

export type FeatureIndexCard =
  | 'compensation'
  | 'wallet'
  | 'network'
  | 'distributors'
  | 'operations'
  | 'ecommerce'
  | 'integrations'

/**
 * The overview, grouped by business area. Only pages that exist.
 */
export const featureIndex: { cards: { key: FeatureIndexCard; href: string; icon: Component }[] }[] =
  [
    {
      cards: [
        { key: 'compensation', href: '/compensation-plans', icon: SlidersHorizontal },
        { key: 'wallet', href: '/features/wallet-payout', icon: Wallet },
      ],
    },
    {
      cards: [
        { key: 'network', href: '/features/network-management', icon: Network },
        { key: 'distributors', href: '/who-we-serve/distributors', icon: Smartphone },
        { key: 'operations', href: '/who-we-serve/operations', icon: Settings2 },
      ],
    },
    {
      cards: [{ key: 'ecommerce', href: '/features/ecommerce', icon: ShoppingBag }],
    },
    {
      cards: [{ key: 'integrations', href: INTEGRATIONS_PATH, icon: Cable }],
    },
  ]
