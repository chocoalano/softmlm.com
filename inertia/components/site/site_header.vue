<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { usePage } from '@inertiajs/vue3'
import {
  ArrowRight,
  Cable,
  ChevronDown,
  LayoutGrid,
  Menu,
  Network,
  ShoppingBag,
  SlidersHorizontal,
  Smartphone,
  Wallet,
  X,
} from 'lucide-vue-next'
import Logo from '~/components/logo.vue'
import MarketingWhatsappCta from '~/components/site/marketing_whatsapp_cta.vue'
import LocaleSwitcher from '~/components/site/locale_switcher.vue'
import ThemeSwitcher from '~/components/site/theme_switcher.vue'
import type { WhatsappContext } from '@shared/whatsapp'
import { WHO_WE_SERVE_PATH, personaPath, personas } from '@shared/personas'
import { FEATURES_PATH, featurePath, findFeature } from '@shared/features'
import { HOW_WE_DO_IT_PATH } from '@shared/implementation'
import { INTEGRATIONS_PATH } from '@shared/integrations'
import { SERVICES_PATH, servicePath, services, type ServiceKey } from '@shared/services'
import { track } from '@shared/analytics'
import { personaIcons } from '~/content/personas'
import { serviceIcons } from '~/content/services'
import { useLeadTarget } from '~/composables/lead_target'
import { exploreFeature } from '~/composables/interest'
import { useCopy, useI18n } from '~/i18n'

const props = withDefaults(defineProps<{ trackingPage?: string; context?: WhatsappContext }>(), {
  trackingPage: 'homepage',
  context: 'general',
})

const t = useCopy('common')
const { lp, locale } = useI18n()
const leadTarget = useLeadTarget()
const page = usePage()

/** Marks the link to the page being viewed (anchors on other pages never match). */
const current = (href: string) => (href === page.url.split(/[?#]/)[0] ? 'page' : undefined)

/**
 * Five items at most: Features, Who We Serve, Services, How We Do It,
 * Pricing. Compensation Plans leads the Features menu.
 */
const linksAfter = computed(() => [
  { label: t.value.nav.howWeDoIt, href: lp(HOW_WE_DO_IT_PATH) },
  { label: t.value.nav.pricing, href: lp('/pricing') },
])

const roleLinks = computed(() =>
  personas.map((persona) => ({
    key: persona.key,
    label: t.value.roles[persona.key].label,
    description: t.value.roles[persona.key].nav,
    href: lp(personaPath(persona)),
    icon: personaIcons[persona.key],
  }))
)

/**
 * Only pages that exist (docs/feature-page-strategy.md).
 */
const featureLinks = computed(() => {
  const copy = t.value.nav.featureLinks
  return [
    { key: 'compensation', icon: SlidersHorizontal, href: lp('/compensation-plans') },
    { key: 'network', icon: Network, href: lp(featurePath(findFeature('network'))) },
    { key: 'ecommerce', icon: ShoppingBag, href: lp(featurePath(findFeature('ecommerce'))) },
    { key: 'wallet', icon: Wallet, href: lp(featurePath(findFeature('wallet'))) },
    { key: 'integrations', icon: Cable, href: lp(INTEGRATIONS_PATH) },
    { key: 'distributors', icon: Smartphone, href: lp(`${WHO_WE_SERVE_PATH}/distributors`) },
  ].map((item) => ({ ...item, ...copy[item.key as keyof typeof copy] }))
})

const platformLinks = computed(() => [
  { label: t.value.nav.platformLinks.commandCenter, href: lp('/#command-center') },
  { label: t.value.nav.platformLinks.network, href: lp('/#network') },
  { label: t.value.nav.platformLinks.security, href: lp('/#security') },
])

/**
 * Growth services: professional services around the software, never
 * listed under Features (docs/services-marketing-strategy.md).
 */
const serviceLinks = computed(() =>
  services.map((service) => ({
    key: service.key,
    ...t.value.nav.serviceLinks[service.key],
    href: lp(servicePath(service)),
    icon: serviceIcons[service.key],
  }))
)

/** A visitor chose to explore a service; the menu or drawer then closes. */
function exploreService(service: ServiceKey) {
  track('service_interest', { service, page: props.trackingPage, locale: locale.value })
  close()
  mobileOpen.value = false
}

/** A visitor chose a feature from the menu or drawer. */
function chooseFeature(key: string) {
  exploreFeature(key, props.trackingPage, locale.value)
  close()
  mobileOpen.value = false
}

type MenuName = 'platform' | 'roles' | 'services'

const scrolled = ref(false)
const openMenu = ref<MenuName | null>(null)
const mobileOpen = ref(false)
const menuEls: Partial<Record<MenuName, HTMLElement>> = {}
let closeTimer: ReturnType<typeof setTimeout> | undefined

function onScroll() {
  scrolled.value = window.scrollY > 8
}

function show(menu: MenuName) {
  clearTimeout(closeTimer)
  openMenu.value = menu
}

function toggle(menu: MenuName) {
  clearTimeout(closeTimer)
  openMenu.value = openMenu.value === menu ? null : menu
}

function closeSoon() {
  clearTimeout(closeTimer)
  closeTimer = setTimeout(() => (openMenu.value = null), 140)
}

function close() {
  openMenu.value = null
}

function onFocusOut(menu: MenuName, event: FocusEvent) {
  if (openMenu.value === menu && !menuEls[menu]?.contains(event.relatedTarget as Node)) close()
}

function onKeydown(event: KeyboardEvent) {
  if (event.key !== 'Escape') return
  const menu = openMenu.value
  close()
  mobileOpen.value = false
  if (menu) menuEls[menu]?.querySelector<HTMLElement>('button')?.focus()
}

function onPointerDown(event: PointerEvent) {
  const menu = openMenu.value
  if (menu && !menuEls[menu]?.contains(event.target as Node)) close()
}

watch(mobileOpen, (open) => {
  document.documentElement.style.overflow = open ? 'hidden' : ''
})

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('pointerdown', onPointerDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('pointerdown', onPointerDown)
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <header class="hdr" :class="{ 'hdr--scrolled': scrolled || mobileOpen }">
    <div class="sm-container hdr__inner">
      <Logo :size="34" wordmark :href="lp('/')" :label="t.brand.homeLabel" />

      <nav class="hdr__nav" :aria-label="t.nav.mainLabel">
        <div
          :ref="(el) => (menuEls.platform = el as HTMLElement)"
          class="hdr__menu"
          @mouseenter="show('platform')"
          @mouseleave="closeSoon"
          @focusout="onFocusOut('platform', $event)"
        >
          <button
            type="button"
            class="hdr__link"
            :aria-expanded="openMenu === 'platform'"
            aria-controls="platform-menu"
            @click="toggle('platform')"
          >
            {{ t.nav.features }}
            <ChevronDown
              :size="15"
              class="hdr__chev"
              :class="{ 'hdr__chev--open': openMenu === 'platform' }"
            />
          </button>

          <Transition name="mega">
            <div v-show="openMenu === 'platform'" id="platform-menu" class="mega">
              <div class="mega__modules">
                <p class="mega__label">{{ t.nav.features }}</p>
                <div class="mega__grid">
                  <a
                    v-for="item in featureLinks"
                    :key="item.key"
                    :href="item.href"
                    class="mega__item"
                    @click="chooseFeature(item.key)"
                  >
                    <span class="sm-icon-tile sm-icon-tile--sm"
                      ><component :is="item.icon" :size="18"
                    /></span>
                    <span>
                      <span class="mega__title">{{ item.label }}</span>
                      <span class="mega__desc">{{ item.text }}</span>
                    </span>
                  </a>
                </div>
              </div>
              <div class="mega__side">
                <a :href="lp(FEATURES_PATH)" class="mega__feature" @click="close">
                  <span class="mega__feature-art" aria-hidden="true">
                    <LayoutGrid :size="22" />
                  </span>
                  <span class="mega__title">{{ t.nav.allFeatures.title }}</span>
                  <span class="mega__desc">{{ t.nav.allFeatures.text }}</span>
                  <span class="sm-link"
                    >{{ t.nav.allFeatures.link }} <ArrowRight :size="15"
                  /></span>
                </a>
                <p class="mega__label mega__label--side">{{ t.nav.moreLabel }}</p>
                <ul class="mega__links">
                  <li v-for="item in platformLinks" :key="item.href">
                    <a :href="item.href" @click="close">{{ item.label }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </Transition>
        </div>

        <div
          :ref="(el) => (menuEls.roles = el as HTMLElement)"
          class="hdr__menu"
          @mouseenter="show('roles')"
          @mouseleave="closeSoon"
          @focusout="onFocusOut('roles', $event)"
        >
          <button
            type="button"
            class="hdr__link"
            :aria-expanded="openMenu === 'roles'"
            aria-controls="roles-menu"
            @click="toggle('roles')"
          >
            {{ t.nav.whoWeServe }}
            <ChevronDown
              :size="15"
              class="hdr__chev"
              :class="{ 'hdr__chev--open': openMenu === 'roles' }"
            />
          </button>

          <Transition name="mega">
            <div v-show="openMenu === 'roles'" id="roles-menu" class="mega mega--roles">
              <ul class="roles__list">
                <li v-for="item in roleLinks" :key="item.key">
                  <a :href="item.href" class="mega__item" @click="close">
                    <span class="sm-icon-tile sm-icon-tile--sm"
                      ><component :is="item.icon" :size="18"
                    /></span>
                    <span>
                      <span class="mega__title">{{ item.label }}</span>
                      <span class="mega__desc">{{ item.description }}</span>
                    </span>
                  </a>
                </li>
              </ul>
              <a :href="lp(WHO_WE_SERVE_PATH)" class="roles__overview" @click="close">
                <span>
                  <span class="mega__title">{{ t.nav.rolesOverview.title }}</span>
                  <span class="mega__desc">{{ t.nav.rolesOverview.text }}</span>
                </span>
                <ArrowRight :size="16" />
              </a>
            </div>
          </Transition>
        </div>

        <div
          :ref="(el) => (menuEls.services = el as HTMLElement)"
          class="hdr__menu"
          @mouseenter="show('services')"
          @mouseleave="closeSoon"
          @focusout="onFocusOut('services', $event)"
        >
          <button
            type="button"
            class="hdr__link"
            :class="{
              'hdr__link--current': page.url.split(/[?#]/)[0].startsWith(lp(SERVICES_PATH)),
            }"
            :aria-expanded="openMenu === 'services'"
            aria-controls="services-menu"
            @click="toggle('services')"
          >
            {{ t.nav.services }}
            <ChevronDown
              :size="15"
              class="hdr__chev"
              :class="{ 'hdr__chev--open': openMenu === 'services' }"
            />
          </button>

          <Transition name="mega">
            <div v-show="openMenu === 'services'" id="services-menu" class="mega mega--roles">
              <ul class="roles__list">
                <li v-for="item in serviceLinks" :key="item.key">
                  <a
                    :href="item.href"
                    class="mega__item"
                    :aria-current="current(item.href)"
                    @click="exploreService(item.key)"
                  >
                    <span class="sm-icon-tile sm-icon-tile--sm"
                      ><component :is="item.icon" :size="18"
                    /></span>
                    <span>
                      <span class="mega__title">{{ item.label }}</span>
                      <span class="mega__desc">{{ item.text }}</span>
                    </span>
                  </a>
                </li>
              </ul>
              <a :href="lp(SERVICES_PATH)" class="roles__overview" @click="close">
                <span>
                  <span class="mega__title">{{ t.nav.servicesOverview.title }}</span>
                  <span class="mega__desc">{{ t.nav.servicesOverview.text }}</span>
                </span>
                <ArrowRight :size="16" />
              </a>
            </div>
          </Transition>
        </div>

        <a
          v-for="item in linksAfter"
          :key="item.href"
          :href="item.href"
          class="hdr__link"
          :aria-current="current(item.href)"
        >
          {{ item.label }}
        </a>
      </nav>

      <div class="hdr__actions">
        <div class="hdr__prefs">
          <LocaleSwitcher />
          <ThemeSwitcher />
        </div>
        <a :href="leadTarget.href" class="sm-btn sm-btn--ghost sm-btn--sm hdr__demo">{{
          leadTarget.label.value
        }}</a>
        <MarketingWhatsappCta
          :context="context"
          :page="trackingPage"
          section="header"
          variant="primary"
          size="sm"
          class="hdr__cta"
        />
        <button
          type="button"
          class="hdr__burger"
          :aria-expanded="mobileOpen"
          aria-controls="mobile-menu"
          :aria-label="mobileOpen ? t.nav.closeMenu : t.nav.openMenu"
          @click="mobileOpen = !mobileOpen"
        >
          <X v-if="mobileOpen" :size="22" />
          <Menu v-else :size="22" />
        </button>
      </div>
    </div>
  </header>

  <!-- Outside the header: its backdrop-filter would trap position: fixed. -->
  <Transition name="drawer">
    <div v-show="mobileOpen" id="mobile-menu" class="drawer">
      <nav class="drawer__nav" :aria-label="t.nav.mobileLabel">
        <details class="drawer__group">
          <summary>{{ t.nav.features }} <ChevronDown :size="18" /></summary>
          <div class="drawer__modules">
            <a :href="lp(FEATURES_PATH)" @click="mobileOpen = false">
              <ArrowRight :size="17" /> {{ t.nav.allFeatures.title }}
            </a>
            <a
              v-for="item in featureLinks"
              :key="item.key"
              :href="item.href"
              @click="chooseFeature(item.key)"
            >
              <component :is="item.icon" :size="17" /> {{ item.label }}
            </a>
          </div>
        </details>
        <details class="drawer__group">
          <summary>{{ t.nav.whoWeServe }} <ChevronDown :size="18" /></summary>
          <div class="drawer__modules">
            <a :href="lp(WHO_WE_SERVE_PATH)" @click="mobileOpen = false">
              <ArrowRight :size="17" /> {{ t.nav.overview }}
            </a>
            <a
              v-for="item in roleLinks"
              :key="item.key"
              :href="item.href"
              @click="mobileOpen = false"
            >
              <component :is="item.icon" :size="17" /> {{ item.label }}
            </a>
          </div>
        </details>
        <details class="drawer__group">
          <summary>{{ t.nav.services }} <ChevronDown :size="18" /></summary>
          <div class="drawer__modules">
            <a :href="lp(SERVICES_PATH)" @click="mobileOpen = false">
              <ArrowRight :size="17" /> {{ t.nav.servicesOverview.title }}
            </a>
            <a
              v-for="item in serviceLinks"
              :key="item.key"
              :href="item.href"
              @click="exploreService(item.key)"
            >
              <component :is="item.icon" :size="17" /> {{ item.label }}
            </a>
          </div>
        </details>
        <a
          v-for="item in [...linksAfter, ...platformLinks.slice(2)]"
          :key="item.href"
          :href="item.href"
          class="drawer__link"
          :aria-current="current(item.href)"
          @click="mobileOpen = false"
        >
          {{ item.label }}
        </a>
      </nav>
      <div class="drawer__prefs">
        <div class="drawer__pref">
          <span class="drawer__pref-label">{{ t.locale.label }}</span>
          <LocaleSwitcher variant="full" />
        </div>
        <div class="drawer__pref">
          <span class="drawer__pref-label">{{ t.theme.label }}</span>
          <ThemeSwitcher variant="inline" />
        </div>
      </div>
      <div class="drawer__ctas">
        <MarketingWhatsappCta
          :context="context"
          :page="trackingPage"
          section="drawer"
          variant="primary"
          size="lg"
          block
          @click="mobileOpen = false"
        />
        <a
          :href="leadTarget.href"
          class="sm-btn sm-btn--light sm-btn--lg sm-btn--block"
          @click="mobileOpen = false"
        >
          {{ leadTarget.label.value }}
        </a>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.hdr {
  position: sticky;
  top: 0;
  z-index: 50;
  background: color-mix(in srgb, var(--sm-page) 62%, transparent);
  backdrop-filter: saturate(1.6) blur(18px);
  -webkit-backdrop-filter: saturate(1.6) blur(18px);
  border-bottom: 1px solid transparent;
  transition:
    background 0.25s var(--sm-ease),
    border-color 0.25s var(--sm-ease);
}
.hdr--scrolled {
  background: var(--sm-surface-glass);
  border-bottom-color: var(--sm-border);
}
.hdr__inner {
  display: flex;
  align-items: center;
  gap: 16px;
  height: var(--sm-header-h);
}
.hdr__nav {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-inline: auto;
}
.hdr__menu {
  position: relative;
}
.hdr__link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 40px;
  padding: 0 10px;
  white-space: nowrap;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 500;
  color: var(--sm-text-2);
  transition:
    background 0.15s,
    color 0.15s;
}
.hdr__link:hover,
.hdr__link[aria-expanded='true'] {
  background: var(--sm-surface-hover);
  color: var(--sm-text);
}
.hdr__link[aria-current='page'],
.hdr__link--current {
  color: var(--sm-primary-ink);
  font-weight: 600;
}
.hdr__chev {
  color: var(--sm-subtle);
  transition: transform 0.2s var(--sm-ease);
}
.hdr__chev--open {
  transform: rotate(180deg);
}
.hdr__actions {
  display: flex;
  align-items: center;
  gap: 6px;
}
.hdr__prefs {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-right: 4px;
}
.hdr__burger {
  display: none;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  color: var(--sm-text);
}
.hdr__burger:hover {
  background: var(--sm-surface-hover);
}

/* mega menu */
.mega {
  position: absolute;
  top: calc(100% + 12px);
  left: -24px;
  display: grid;
  grid-template-columns: 1fr 280px;
  width: 820px;
  padding: 8px;
  border-radius: 22px;
  background: var(--sm-surface);
  border: 1px solid var(--sm-border);
  box-shadow: var(--sm-shadow-float);
}
.mega::before {
  content: '';
  position: absolute;
  inset: -14px 0 auto;
  height: 14px;
}
.mega__modules {
  padding: 16px 12px 12px;
}
.mega__label {
  padding: 0 10px 8px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--sm-subtle);
}
.mega__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
}
.mega__item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 10px;
  border-radius: 12px;
  transition: background 0.15s;
}
.mega__item:hover {
  background: var(--sm-surface-subtle);
}
.mega__title {
  display: block;
  font-size: 14.5px;
  font-weight: 600;
  color: var(--sm-text);
  letter-spacing: -0.01em;
}
.mega__desc {
  display: block;
  margin-top: 2px;
  font-size: 13px;
  line-height: 1.45;
  color: var(--sm-muted);
}
.mega__side {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  border-radius: 16px;
  background: var(--sm-surface-subtle);
}
.mega__feature {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.mega__feature .sm-link {
  margin-top: 6px;
  font-size: 14px;
}
.mega__feature-art {
  display: grid;
  place-items: center;
  width: 100%;
  height: 92px;
  margin-bottom: 8px;
  border-radius: 12px;
  color: #fff;
  background:
    radial-gradient(circle at 80% 20%, rgba(2, 200, 250, 0.55), transparent 45%),
    linear-gradient(135deg, var(--sm-primary), var(--sm-accent));
}
.mega__label--side {
  padding: 12px 0 0;
  border-top: 1px solid var(--sm-border);
}
.mega__links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.mega__links a {
  display: block;
  padding: 6px 0;
  font-size: 14px;
  font-weight: 500;
  color: var(--sm-text-2);
}
.mega__links a:hover {
  color: var(--sm-primary-ink);
}
.mega--roles {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 400px;
  left: -40px;
}
.roles__list {
  list-style: none;
  display: grid;
  gap: 2px;
  padding: 8px 4px 0;
}
.roles__overview {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 14px;
  background: var(--sm-surface-subtle);
  color: var(--sm-primary-ink);
  transition: background 0.15s;
}
.roles__overview:hover {
  background: var(--sm-primary-50);
}
.mega-enter-active,
.mega-leave-active {
  transition:
    opacity 0.18s var(--sm-ease),
    transform 0.18s var(--sm-ease);
}
.mega-enter-from,
.mega-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* mobile drawer */
.drawer {
  position: fixed;
  z-index: 45;
  top: var(--sm-header-h);
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  padding: 12px 20px 28px;
  background: var(--sm-surface);
  overflow-y: auto;
}
.drawer__nav {
  display: flex;
  flex-direction: column;
}
.drawer__link,
.drawer__group summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 56px;
  font-family: var(--sm-display);
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.02em;
  border-bottom: 1px solid var(--sm-border);
  list-style: none;
  cursor: pointer;
}
.drawer__link[aria-current='page'] {
  color: var(--sm-primary-ink);
}
.drawer__group summary::-webkit-details-marker {
  display: none;
}
.drawer__group[open] summary svg {
  transform: rotate(180deg);
}
.drawer__modules {
  display: grid;
  gap: 4px;
  padding: 10px 0 14px;
  border-bottom: 1px solid var(--sm-border);
}
.drawer__modules a {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 44px;
  font-size: 16px;
  font-weight: 500;
  color: var(--sm-text-2);
}
.drawer__modules svg {
  color: var(--sm-primary-ink);
}
.drawer__prefs {
  display: grid;
  gap: 14px;
}
.drawer__pref {
  display: grid;
  gap: 8px;
}
.drawer__pref-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--sm-muted);
}
.drawer__ctas {
  display: grid;
  gap: 10px;
}
.drawer-enter-active,
.drawer-leave-active {
  transition:
    opacity 0.2s var(--sm-ease),
    transform 0.2s var(--sm-ease);
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/*
 * Widths measured with the full WhatsApp label in both languages (the
 * Indonesian header is the widest): the links never wrap, the demo link
 * appears only where it fits, and below 1280px the menu takes over.
 */
@media (max-width: 1439px) {
  .hdr__demo {
    display: none;
  }
}
@media (max-width: 1279px) {
  .hdr__nav,
  .hdr__prefs {
    display: none;
  }
  .hdr__actions {
    margin-left: auto;
  }
  .hdr__burger {
    display: inline-grid;
  }
}
@media (min-width: 1280px) {
  .drawer {
    display: none !important;
  }
}
@media (max-width: 560px) {
  .hdr__cta {
    display: none;
  }
}
</style>
