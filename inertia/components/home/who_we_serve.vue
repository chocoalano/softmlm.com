<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  ArrowRight,
  Check,
  CircleCheck,
  Package,
  TriangleAlert,
  TrendingDown,
  TrendingUp,
} from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import VisualNote from '~/components/site/visual_note.vue'
import DistributorApp from '~/components/who_we_serve/concepts/distributor_app.vue'
import TechnicalDiscovery from '~/components/who_we_serve/concepts/technical_discovery.vue'
import { findPersona, personaPath, type PersonaKey } from '@shared/personas'
import { personaIcons } from '~/content/personas'
import { useCopy, useI18n } from '~/i18n'

const t = useCopy('homeClosing')
const common = useCopy('common')
const { locale, lp } = useI18n()

const roleKeys: PersonaKey[] = ['executives', 'finance', 'operations', 'it', 'distributors']

const roles = computed(() =>
  roleKeys.map((key) => ({
    key,
    label: common.value.roles[key].short,
    icon: personaIcons[key],
    href: lp(personaPath(findPersona(key))),
    ...t.value.roles.items[key],
  }))
)

const activeKey = ref<PersonaKey>('executives')
const role = computed(() => roles.value.find((r) => r.key === activeKey.value)!)

function onKeydown(event: KeyboardEvent, index: number) {
  const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
  if (!step) return
  event.preventDefault()
  const next = roleKeys[(index + step + roleKeys.length) % roleKeys.length]
  activeKey.value = next
  document.getElementById(`ws-tab-${next}`)?.focus()
}

/* Sample data for the interface concepts; their text comes from the copy. */
const mockups = computed(() => t.value.roles.mockups)

/* Sample figures, formatted in the page language (Rp12.48B / Rp12,48 miliar). */
const kpiData = [
  {
    value: 12_480_000_000,
    unit: 'rupiah',
    delta: 12.4,
    deltaUnit: 'percent',
    tone: 'up',
    icon: TrendingUp,
  },
  { value: 46.2, unit: 'percent', delta: 0.8, deltaUnit: 'points', tone: 'up', icon: TrendingUp },
  { value: 14.7, unit: 'percent', delta: 0.7, deltaUnit: 'points', tone: 'down', icon: TrendingUp },
  {
    value: 59.4,
    unit: 'percent',
    delta: -0.9,
    deltaUnit: 'points',
    tone: 'down',
    icon: TrendingDown,
  },
]
const kpis = computed(() => {
  const copy = mockups.value.executives
  const oneDecimal = { minimumFractionDigits: 1, maximumFractionDigits: 1 }
  const number = new Intl.NumberFormat(locale.value, oneDecimal)
  const signed = new Intl.NumberFormat(locale.value, { ...oneDecimal, signDisplay: 'exceptZero' })
  const compact = new Intl.NumberFormat(locale.value, {
    notation: 'compact',
    maximumFractionDigits: 2,
  })
  return kpiData.map((kpi, i) => ({
    label: copy.kpis[i],
    value:
      kpi.unit === 'rupiah' ? `Rp${compact.format(kpi.value)}` : `${number.format(kpi.value)}%`,
    delta:
      signed.format(kpi.delta).replace('-', '−') +
      (kpi.deltaUnit === 'percent' ? '%' : ` ${copy.points}`),
    tone: kpi.tone,
    icon: kpi.icon,
  }))
})

const alertKinds = [
  { icon: CircleCheck, class: 'ws__ok' },
  { icon: TriangleAlert, class: 'ws__warn' },
  { icon: TriangleAlert, class: 'ws__warn' },
]
const alerts = computed(() =>
  mockups.value.executives.alerts.map((text, i) => ({ text, ...alertKinds[i] }))
)

const pipelineData = [
  { count: 48, tone: 'warn' },
  { count: 36, tone: 'info' },
  { count: 112, tone: 'info' },
  { count: 1088, tone: 'ok' },
]
const pipeline = computed(() =>
  mockups.value.operations.stages.map((label, i) => ({
    label,
    tone: pipelineData[i].tone,
    count: pipelineData[i].count.toLocaleString(locale.value),
  }))
)
</script>

<template>
  <section id="who-we-serve" class="sm-section sm-section--tint ws">
    <div class="sm-container">
      <div class="sm-heading sm-heading--center">
        <span v-reveal class="sm-eyebrow">{{ t.roles.eyebrow }}</span>
        <h2 v-reveal="60" class="sm-h2">{{ t.roles.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.roles.lead }}</p>
      </div>

      <div v-reveal class="ws__tabs-wrap">
        <div class="sm-tabs" role="tablist" :aria-label="t.roles.tablistLabel">
          <button
            v-for="(item, i) in roles"
            :id="`ws-tab-${item.key}`"
            :key="item.key"
            type="button"
            role="tab"
            class="sm-tab"
            :aria-selected="item.key === activeKey"
            aria-controls="ws-panel"
            :tabindex="item.key === activeKey ? 0 : -1"
            @click="activeKey = item.key"
            @keydown="onKeydown($event, i)"
          >
            <component :is="item.icon" :size="17" />
            {{ item.label }}
          </button>
        </div>
      </div>

      <div
        id="ws-panel"
        v-reveal
        class="ws__panel"
        role="tabpanel"
        :aria-labelledby="`ws-tab-${activeKey}`"
      >
        <Transition name="ws-fade" mode="out-in">
          <div :key="activeKey" class="ws__copy">
            <h3 class="sm-h3">{{ role.title }}</h3>
            <p class="sm-body">{{ role.text }}</p>
            <ul class="ws__points">
              <li v-for="point in role.points" :key="point" class="sm-check">
                <Check :size="17" /> {{ point }}
              </li>
            </ul>
            <a :href="role.href" class="sm-link ws__more">
              {{ role.more }} <ArrowRight :size="16" />
            </a>
          </div>
        </Transition>

        <div class="ws__stage">
          <Transition name="ws-screen" mode="out-in">
            <!-- Executives -->
            <div v-if="activeKey === 'executives'" key="executives" class="ui ws__card">
              <div class="ws__card-head">
                <div class="ui-title">{{ mockups.executives.title }}</div>
                <span class="ui-badge ui-badge--plain">{{ mockups.executives.period }}</span>
              </div>
              <div class="ws__kpis">
                <div v-for="kpi in kpis" :key="kpi.label">
                  <span class="ui-label">{{ kpi.label }}</span
                  ><b>{{ kpi.value }}</b
                  ><span class="ui-delta" :class="`ui-delta--${kpi.tone}`"
                    ><component :is="kpi.icon" :size="12" /> {{ kpi.delta }}</span
                  >
                </div>
              </div>
              <div class="ui-label ws__label">{{ mockups.executives.alertsLabel }}</div>
              <ul class="ws__alerts">
                <li v-for="alert in alerts" :key="alert.text">
                  <component :is="alert.icon" :size="16" :class="alert.class" /> {{ alert.text }}
                </li>
              </ul>
            </div>

            <!-- Finance -->
            <div v-else-if="activeKey === 'finance'" key="finance" class="ui ws__card">
              <div class="ws__card-head">
                <div>
                  <div class="ui-title">{{ mockups.finance.title }}</div>
                  <div class="ui-label">{{ mockups.finance.batch }}</div>
                </div>
                <span class="ui-badge ui-badge--warn">{{ mockups.finance.status }}</span>
              </div>
              <dl class="ws__sums">
                <div>
                  <dt>{{ mockups.finance.approved }}</dt>
                  <dd>Rp440.000.000</dd>
                </div>
                <div>
                  <dt>{{ mockups.finance.withheld }}</dt>
                  <dd>−Rp8.900.000</dd>
                </div>
                <div class="ws__total">
                  <dt>{{ mockups.finance.net }}</dt>
                  <dd>Rp431.100.000</dd>
                </div>
              </dl>
              <ul class="ws__checks">
                <li v-for="check in mockups.finance.checks" :key="check">
                  <CircleCheck :size="16" /> {{ check }}
                </li>
              </ul>
              <div class="ws__actions">
                <span class="ui-btn ui-btn--light">{{ mockups.finance.download }}</span>
                <span class="ui-btn"><Check :size="13" /> {{ mockups.finance.approve }}</span>
              </div>
            </div>

            <!-- Operations -->
            <div v-else-if="activeKey === 'operations'" key="operations" class="ui ws__card">
              <div class="ws__card-head">
                <div class="ui-title">{{ mockups.operations.title }}</div>
                <span class="ui-label">{{ mockups.operations.location }}</span>
              </div>
              <div class="ws__pipe">
                <div v-for="stage in pipeline" :key="stage.label" class="ws__stage-col">
                  <span class="ui-badge" :class="`ui-badge--${stage.tone}`">{{ stage.label }}</span>
                  <b class="sm-num">{{ stage.count }}</b>
                  <span class="ws__ticket" /><span class="ws__ticket" /><span
                    class="ws__ticket ws__ticket--short"
                  />
                </div>
              </div>
              <div class="ws__sla">
                <Package :size="16" />
                <span
                  ><b>{{ mockups.operations.slaValue }}</b> {{ mockups.operations.slaText }}</span
                >
              </div>
            </div>

            <!-- IT -->
            <TechnicalDiscovery v-else-if="activeKey === 'it'" key="it" compact />

            <!-- Distributors -->
            <DistributorApp v-else key="distributors" />
          </Transition>
        </div>
      </div>
      <VisualNote />
    </div>
  </section>
</template>

<style scoped>
.ws__tabs-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 28px;
}
.ws__tabs-wrap .sm-tabs {
  background: var(--sm-surface);
}
.ws__tabs-wrap .sm-tab[aria-selected='true'] {
  background: var(--sm-surface-subtle);
}
.ws__panel {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  gap: clamp(32px, 5vw, 72px);
  align-items: center;
  padding: clamp(24px, 4vw, 56px);
  border-radius: var(--sm-r-shell);
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
}
.ws__copy {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.ws__more {
  margin-top: 4px;
}
.ws__points {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 20px;
  margin-top: 6px;
}
.ws__stage {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 520px;
  padding: clamp(24px, 4vw, 48px);
  border-radius: 24px;
  background:
    radial-gradient(60% 60% at 90% 10%, rgba(2, 200, 250, 0.16), transparent 70%),
    radial-gradient(70% 70% at 0% 100%, rgba(0, 93, 251, 0.14), transparent 70%), var(--sm-canvas);
}
.ws__card {
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 22px;
  border-radius: 20px;
  background: var(--sm-surface);
  border: 1px solid var(--sm-border);
  box-shadow: var(--sm-shadow-float);
}
.ws__card-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}
.ws__kpis {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.ws__kpis > div {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 14px;
  border-radius: 12px;
  background: var(--sm-surface-subtle);
}
.ws__kpis b {
  font-size: 20px;
  font-weight: 650;
  letter-spacing: -0.02em;
}
.ws__label {
  margin-bottom: -6px;
}
.ws__alerts,
.ws__checks {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.ws__alerts li,
.ws__checks li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
}
.ws__ok,
.ws__checks svg {
  flex: none;
  color: var(--sm-ok);
}
.ws__warn {
  flex: none;
  color: var(--sm-warn);
}
.ws__sums {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px;
  border-radius: 12px;
  background: var(--sm-surface-subtle);
  font-variant-numeric: tabular-nums;
}
.ws__sums div {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}
.ws__sums dt {
  color: var(--sm-muted);
}
.ws__sums dd {
  font-weight: 600;
}
.ws__total {
  padding-top: 8px;
  border-top: 1px solid var(--sm-border);
}
.ws__total dd {
  font-size: 16px;
  color: var(--sm-primary-ink);
}
.ws__actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
.ws__pipe {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}
.ws__stage-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 12px;
  border-radius: 12px;
  background: var(--sm-surface-subtle);
}
.ws__stage-col b {
  font-size: 20px;
  font-weight: 650;
  letter-spacing: -0.02em;
}
.ws__ticket {
  width: 100%;
  height: 26px;
  border-radius: 7px;
  background: var(--sm-surface);
  border: 1px solid var(--sm-border);
}
.ws__ticket--short {
  width: 60%;
  opacity: 0.6;
}
.ws__sla {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 12px;
  background: var(--sm-primary-50);
  color: var(--sm-primary-ink);
  font-size: 13px;
}
.ws-fade-enter-active,
.ws-fade-leave-active,
.ws-screen-enter-active,
.ws-screen-leave-active {
  transition:
    opacity 0.24s var(--sm-ease),
    transform 0.24s var(--sm-ease);
}
.ws-fade-enter-from,
.ws-screen-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.ws-fade-leave-to,
.ws-screen-leave-to {
  opacity: 0;
}

@media (max-width: 980px) {
  .ws__panel {
    grid-template-columns: minmax(0, 1fr);
  }
  .ws__tabs-wrap {
    justify-content: flex-start;
    margin-inline: calc(var(--sm-gutter) * -1);
    padding-inline: var(--sm-gutter);
  }
  .ws__tabs-wrap .sm-tabs {
    max-width: 100%;
  }
}
@media (max-width: 620px) {
  .ws__panel {
    padding: 20px;
    border-radius: var(--sm-r-card);
  }
  .ws__points {
    grid-template-columns: minmax(0, 1fr);
  }
  .ws__stage {
    position: relative;
    min-height: 0;
    padding: 20px 12px;
    margin-inline: -8px;
  }
  .ws__card {
    padding: 16px;
  }
  .ws__pipe {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
