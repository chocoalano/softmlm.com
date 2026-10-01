<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { Check } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import { modules, type ModuleKey } from '~/content/modules'
import FeatureScreen from '~/components/home/feature_screen.vue'
import VisualNote from '~/components/site/visual_note.vue'
import MarketingWhatsappCta from '~/components/site/marketing_whatsapp_cta.vue'
import { useCopy } from '~/i18n'

const t = useCopy('homePlatform')
const moduleCopy = useCopy('modules')

const root = ref<HTMLElement>()
const activeKey = ref<ModuleKey>('members')
const active = computed(() => modules.find((m) => m.key === activeKey.value)!)
const detail = computed(() => t.value.features.details[activeKey.value])
const activeLabel = computed(() => moduleCopy.value[activeKey.value].label)

function select(key: ModuleKey) {
  activeKey.value = key
  document.getElementById(`fx-tab-${key}`)?.scrollIntoView({ block: 'nearest', inline: 'center' })
}

function onKeydown(event: KeyboardEvent, index: number) {
  const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
  if (!step) return
  event.preventDefault()
  const next = modules[(index + step + modules.length) % modules.length]
  select(next.key)
  document.getElementById(`fx-tab-${next.key}`)?.focus()
}

/**
 * Links like `#feature-wallet` (header mega menu, footer) open the
 * matching tab and scroll the explorer into view.
 */
function syncFromHash() {
  const match = window.location.hash.match(/^#feature-(\w+)$/)
  const key = match?.[1] as ModuleKey | undefined
  if (!key || !modules.some((item) => item.key === key)) return
  select(key)
  root.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => {
  syncFromHash()
  window.addEventListener('hashchange', syncFromHash)
})
onBeforeUnmount(() => window.removeEventListener('hashchange', syncFromHash))
</script>

<template>
  <section id="features" ref="root" class="sm-section fx">
    <!-- real targets for #feature-<key> links, so the page scrolls here on load -->
    <span
      v-for="item in modules"
      :id="`feature-${item.key}`"
      :key="`anchor-${item.key}`"
      class="fx__anchor"
      aria-hidden="true"
    />
    <div class="sm-container">
      <div class="sm-heading sm-heading--center">
        <span v-reveal class="sm-eyebrow">{{ t.features.eyebrow }}</span>
        <h2 v-reveal="60" class="sm-h2">{{ t.features.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.features.lead }}</p>
      </div>

      <div v-reveal class="fx__tabs-wrap">
        <div class="sm-tabs fx__tabs" role="tablist" :aria-label="t.features.tabsLabel">
          <button
            v-for="(item, i) in modules"
            :id="`fx-tab-${item.key}`"
            :key="item.key"
            type="button"
            role="tab"
            class="sm-tab"
            :aria-selected="item.key === activeKey"
            aria-controls="fx-panel"
            :tabindex="item.key === activeKey ? 0 : -1"
            @click="select(item.key)"
            @keydown="onKeydown($event, i)"
          >
            <component :is="item.icon" :size="17" />
            {{ moduleCopy[item.key].short }}
          </button>
        </div>
      </div>

      <div
        id="fx-panel"
        v-reveal
        class="fx__panel"
        role="tabpanel"
        :aria-labelledby="`fx-tab-${activeKey}`"
      >
        <Transition name="fx-fade" mode="out-in">
          <div :key="activeKey" class="fx__copy">
            <span class="sm-icon-tile"><component :is="active.icon" :size="22" /></span>
            <h3 class="sm-h3">{{ detail.title }}</h3>
            <p class="sm-body">{{ detail.text }}</p>
            <ul class="fx__points">
              <li v-for="point in detail.points" :key="point" class="sm-check">
                <Check :size="17" /> {{ point }}
              </li>
            </ul>
            <MarketingWhatsappCta
              page="homepage"
              section="features"
              variant="contextual"
              appearance="link"
              :label="t.features.askAbout(activeLabel)"
            />
          </div>
        </Transition>

        <div class="fx__stage">
          <Transition name="fx-screen" mode="out-in">
            <FeatureScreen :key="activeKey" :name="activeKey" />
          </Transition>
        </div>
      </div>
      <VisualNote />
    </div>
  </section>
</template>

<style scoped>
.fx__anchor {
  display: block;
  height: 0;
  scroll-margin-top: var(--sm-header-h);
}
.fx__tabs-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 28px;
}
.fx__tabs {
  max-width: 100%;
}
.fx__panel {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  gap: clamp(32px, 5vw, 72px);
  align-items: center;
  padding: clamp(24px, 4vw, 56px);
  border-radius: var(--sm-r-shell);
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
}
.fx__copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
}
.fx__copy .sm-h3 {
  margin-top: 6px;
}
.fx__points {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 20px;
  margin: 6px 0 8px;
  width: 100%;
}
.fx__points .sm-check {
  font-size: 15px;
}
.fx__stage {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 480px;
  padding: clamp(28px, 4vw, 56px) clamp(20px, 3vw, 56px);
  border-radius: 24px;
  overflow: hidden;
  background:
    radial-gradient(60% 60% at 85% 10%, rgba(2, 200, 250, 0.18), transparent 70%),
    radial-gradient(70% 70% at 10% 90%, rgba(0, 93, 251, 0.16), transparent 70%), var(--sm-canvas);
}
.fx__stage::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(0, 93, 251, 0.14) 1px, transparent 1px);
  background-size: 22px 22px;
  -webkit-mask-image: linear-gradient(180deg, #000, transparent 85%);
  mask-image: linear-gradient(180deg, #000, transparent 85%);
}
.fx-fade-enter-active,
.fx-fade-leave-active {
  transition:
    opacity 0.2s var(--sm-ease),
    transform 0.2s var(--sm-ease);
}
.fx-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.fx-fade-leave-to {
  opacity: 0;
}
.fx-screen-enter-active,
.fx-screen-leave-active {
  transition:
    opacity 0.28s var(--sm-ease),
    transform 0.28s var(--sm-ease);
}
.fx-screen-enter-from {
  opacity: 0;
  transform: translateY(12px) scale(0.985);
}
.fx-screen-leave-to {
  opacity: 0;
  transform: scale(0.985);
}

@media (max-width: 980px) {
  .fx__panel {
    grid-template-columns: minmax(0, 1fr);
  }
  .fx__tabs-wrap {
    margin-inline: calc(var(--sm-gutter) * -1);
    padding-inline: var(--sm-gutter);
    justify-content: flex-start;
  }
}
@media (max-width: 620px) {
  .fx__panel {
    padding: 20px;
    border-radius: var(--sm-r-card);
  }
  .fx__points {
    grid-template-columns: minmax(0, 1fr);
  }
  .fx__stage {
    min-height: 0;
    padding: 20px 12px;
    margin-inline: -8px;
  }
}
</style>
