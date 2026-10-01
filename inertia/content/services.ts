import type { Component } from 'vue'
import { CalendarRange, Megaphone, Package, Palette, Search } from 'lucide-vue-next'
import type { ServiceKey } from '@shared/services'

/**
 * One icon per growth service, used next to its name (never on its own:
 * every service is always labelled in text).
 */
export const serviceIcons: Record<ServiceKey, Component> = {
  social_media: CalendarRange,
  seo: Search,
  paid_advertising: Megaphone,
  branding: Palette,
  product_maklon: Package,
}
