<script setup lang="ts">
/**
 * Conceptual examples (payment, logistics, finance, messaging): the flow
 * and the questions it raises. None names a provider or describes an
 * existing connector; the lead says so. Tabs follow the site's pattern
 * (arrow keys move between them).
 */
import { computed, ref } from 'vue'
import { Calculator, CircleHelp, CreditCard, MessageSquare, Truck } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import { useCopy } from '~/i18n'

const t = useCopy('integrations')

const keys = ['payment', 'logistics', 'finance', 'messaging'] as const
type ExampleKey = (typeof keys)[number]
const icons = {
  payment: CreditCard,
  logistics: Truck,
  finance: Calculator,
  messaging: MessageSquare,
}

const active = ref<ExampleKey>('payment')
const tabs = computed(() =>
  keys.map((key) => ({ key, icon: icons[key], label: t.value.examples[key].tab }))
)
const flowExample = computed(() => {
  const key = active.value
  return key === 'messaging' ? null : t.value.examples[key]
})
const current = computed(() => t.value.examples[active.value])

function onKeydown(event: KeyboardEvent, index: number) {
  const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
  if (!step) return
  event.preventDefault()
  const next = keys[(index + step + keys.length) % keys.length]
  active.value = next
  document.getElementById(`nex-tab-${next}`)?.focus()
}
</script>

<template>
  <section class="sm-section sm-section--compact nex" aria-labelledby="nex-title">
    <div class="sm-container">
      <div class="nex__head">
        <span v-reveal class="sm-eyebrow">{{ t.examples.eyebrow }}</span>
        <h2 id="nex-title" v-reveal="60" class="sm-h2">{{ t.examples.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.examples.lead }}</p>
      </div>

      <div v-reveal class="sm-tabs nex__tabs" role="tablist" :aria-label="t.examples.tabsLabel">
        <button
          v-for="(tab, i) in tabs"
          :id="`nex-tab-${tab.key}`"
          :key="tab.key"
          type="button"
          role="tab"
          class="sm-tab"
          :aria-selected="tab.key === active"
          aria-controls="nex-panel"
          :tabindex="tab.key === active ? 0 : -1"
          @click="active = tab.key"
          @keydown="onKeydown($event, i)"
        >
          <component :is="tab.icon" :size="17" />
          {{ tab.label }}
        </button>
      </div>

      <div
        id="nex-panel"
        class="nex__panel"
        role="tabpanel"
        :aria-labelledby="`nex-tab-${active}`"
        tabindex="0"
      >
        <div class="nex__main">
          <h3 class="sm-h3">{{ current.title }}</h3>
          <p class="sm-body">{{ current.lead }}</p>

          <ol v-if="flowExample" class="nex__flow" :aria-label="t.examples.flowLabel">
            <li v-for="(step, i) in flowExample.steps" :key="step">
              <span class="nex__num" aria-hidden="true">{{ i + 1 }}</span>
              {{ step }}
            </li>
          </ol>

          <template v-else>
            <ul class="nex__kinds">
              <li v-for="kind in t.examples.messaging.kinds" :key="kind.title">
                <b>{{ kind.title }}</b>
                <span>{{ kind.text }}</span>
              </li>
            </ul>
            <p class="nex__channels">{{ t.examples.messaging.channels }}</p>
          </template>
        </div>

        <div class="nex__questions">
          <h4 class="nex__label">{{ t.examples.questionsLabel }}</h4>
          <ul>
            <li v-for="question in current.questions" :key="question" class="sm-check">
              <CircleHelp :size="18" aria-hidden="true" /> {{ question }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.nex__head {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 760px;
  margin-bottom: clamp(28px, 4vw, 44px);
}
.nex__tabs {
  width: fit-content;
  max-width: 100%;
  margin-bottom: 16px;
}
.nex__panel {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
  gap: clamp(24px, 4vw, 56px);
  padding: clamp(24px, 3.5vw, 40px);
  border-radius: var(--sm-r-shell);
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
  box-shadow: var(--sm-shadow-soft);
}
.nex__panel:focus-visible {
  outline: 2px solid var(--sm-primary);
  outline-offset: 3px;
}
.nex__main {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.nex__flow {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 6px;
}
.nex__flow li {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-radius: 12px;
  background: var(--sm-surface-subtle);
  border: 1px solid var(--sm-border);
  font-size: 15px;
  font-weight: 500;
}
.nex__flow li + li::before {
  content: '';
  position: absolute;
  top: -9px;
  left: 27px;
  width: 2px;
  height: 8px;
  background: var(--sm-primary-200);
}
.nex__num {
  display: grid;
  place-items: center;
  flex: none;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  font-size: 12.5px;
  font-weight: 700;
  background: var(--sm-primary-50);
  color: var(--sm-primary-ink);
}
.nex__kinds {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.nex__kinds li {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 12px 16px;
  border-radius: 14px;
  border: 1px solid var(--sm-border);
  background: var(--sm-surface-subtle);
}
.nex__kinds b {
  font-size: 15.5px;
}
.nex__kinds span {
  font-size: 14.5px;
  line-height: 1.5;
  color: var(--sm-muted);
}
.nex__channels {
  font-size: 15px;
  line-height: 1.55;
  color: var(--sm-text-2);
}
.nex__questions {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 22px;
  border-radius: var(--sm-r-card);
  background: var(--sm-primary-50);
  border: 1px solid var(--sm-primary-100);
  align-self: start;
}
.nex__questions ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.nex__label {
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--sm-primary-ink);
}
@media (max-width: 900px) {
  .nex__panel {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
