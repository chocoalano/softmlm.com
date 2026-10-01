<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import FlashToasts from '~/components/flash_toasts.vue'
import SiteHeader from '~/components/site/site_header.vue'
import SiteFooter from '~/components/site/site_footer.vue'
import MarketingWhatsappCta from '~/components/site/marketing_whatsapp_cta.vue'
import type { WhatsappContext } from '@shared/whatsapp'
import { provideLeadMode, type LeadMode } from '~/composables/lead_target'
import { initFirstPartyTracking } from '~/composables/first_party_tracking'
import { usePage } from '@inertiajs/vue3'

/**
 * `page` names the page in conversion tracking; `context` picks the
 * WhatsApp message used by the header, drawer and sticky button;
 * `leadMode` says whether the page's form books a demo or requests a
 * consultation (services pages).
 */
const props = withDefaults(
  defineProps<{ page?: string; context?: WhatsappContext; leadMode?: LeadMode }>(),
  {
    page: 'homepage',
    context: 'general',
    leadMode: 'demo',
  }
)
provideLeadMode(props.leadMode)

const inertiaPage = usePage()
initFirstPartyTracking(() => Boolean(inertiaPage.props.marketing?.tracking))

/**
 * On phones a WhatsApp bar stays within reach once the hero has scrolled
 * away. It steps aside while the demo form is on screen and while any form
 * field has focus, so it never covers typing or validation messages.
 */
const showStickyCta = ref(false)
let demoVisible = false
let editing = false
let observer: IntersectionObserver | undefined

function update() {
  showStickyCta.value = window.scrollY > 640 && !demoVisible && !editing
}

function isField(target: EventTarget | null) {
  return target instanceof HTMLElement && target.matches('input, select, textarea')
}

function onFocusIn(event: FocusEvent) {
  if (!isField(event.target)) return
  editing = true
  update()
}

function onFocusOut(event: FocusEvent) {
  if (!isField(event.target)) return
  editing = false
  update()
}

onMounted(() => {
  window.addEventListener('scroll', update, { passive: true })
  document.addEventListener('focusin', onFocusIn)
  document.addEventListener('focusout', onFocusOut)
  const demo = document.getElementById('demo')
  if (demo && typeof IntersectionObserver !== 'undefined') {
    observer = new IntersectionObserver(([entry]) => {
      demoVisible = entry.isIntersecting
      update()
    })
    observer.observe(demo)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', update)
  document.removeEventListener('focusin', onFocusIn)
  document.removeEventListener('focusout', onFocusOut)
  observer?.disconnect()
})
</script>

<template>
  <div id="top" class="site">
    <SiteHeader :tracking-page="props.page" :context="props.context" />
    <main id="main">
      <slot />
    </main>
    <SiteFooter :tracking-page="props.page" :context="props.context" />

    <Transition name="sticky-cta">
      <div v-show="showStickyCta" class="sticky-cta">
        <MarketingWhatsappCta
          :context="props.context"
          :page="props.page"
          section="sticky_mobile"
          variant="primary"
          block
        />
      </div>
    </Transition>
  </div>
  <FlashToasts />
</template>

<style scoped>
.sticky-cta {
  display: none;
}
@media (max-width: 720px) {
  .site {
    padding-bottom: 76px;
  }
  .sticky-cta {
    position: fixed;
    left: 12px;
    right: 12px;
    bottom: calc(12px + env(safe-area-inset-bottom, 0px));
    z-index: 40;
    display: block;
    padding: 6px;
    border-radius: 18px;
    background: var(--sm-surface-glass);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    box-shadow: var(--sm-shadow-float);
  }
}
.sticky-cta-enter-active,
.sticky-cta-leave-active {
  transition:
    opacity 0.25s var(--sm-ease),
    transform 0.25s var(--sm-ease);
}
.sticky-cta-enter-from,
.sticky-cta-leave-to {
  opacity: 0;
  transform: translateY(16px);
}
</style>
