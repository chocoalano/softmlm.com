<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowDownRight, ArrowUpRight, MousePointerClick } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import { useCopy, type Messages } from '~/i18n'
import AreaChart from '~/components/site/area_chart.vue'
import Sparkline from '~/components/site/sparkline.vue'
import VisualNote from '~/components/site/visual_note.vue'
import { useFormat } from '~/composables/format'

type MetricKey = keyof Messages['homeIntro']['commandCenter']['metrics']

/** Sample data of one metric; its words come from the homeIntro copy. */
type MetricData = {
  key: MetricKey
  value: string
  delta: string
  direction: 'up' | 'down'
  tone: 'good' | 'bad' | 'neutral'
  series: number[]
  labels: string[]
  format: (value: number) => string
  /** In the order of the breakdown names in the copy. */
  breakdown: number[]
  unit: (value: number) => string
}

type Metric = Omit<MetricData, 'breakdown'> & {
  label: string
  caption: string
  period: string
  breakdownTitle: string
  breakdown: [string, number][]
}

const t = useCopy('homeIntro')

/** Sample figures in the page language: Rp412.8M / Rp412,8 jt, 18,420 / 18.420. */
const { num, change, scale } = useFormat()
const rupiahM = (v: number) => `Rp${num(v, v % 1 ? 1 : 0)}${scale('M')}`
const rupiahB = (v: number) => `Rp${num(v, 2)}${scale('B')}`
const thousands = (v: number) => `${num(v, v % 1 ? 1 : 0)}${scale('K')}`
const count = (v: number) => num(v)

const metrics = computed<Metric[]>(() => {
  const copy = t.value.commandCenter
  const days = Array.from({ length: 14 }, (_, i) => copy.day(17 + i))
  const weeks = Array.from({ length: 12 }, (_, i) => copy.week(28 + i))
  const months = copy.months
  const pts = copy.points

  const data: MetricData[] = [
    {
      key: 'revenue',
      value: rupiahM(412.8),
      delta: change(8.2),
      direction: 'up',
      tone: 'good',
      series: [318, 342, 301, 355, 372, 349, 390, 368, 401, 385, 379, 410, 381.5, 412.8],
      labels: days,
      format: rupiahM,
      breakdown: [256.1, 115.6, 41.1],
      unit: rupiahM,
    },
    {
      key: 'growth',
      value: change(4.7),
      delta: change(0.6, 1, ` ${pts}`),
      direction: 'up',
      tone: 'good',
      series: [21.4, 22.1, 22.9, 23.6, 24.2, 25.0, 25.9, 26.8, 27.7, 28.6, 29.6, 31.0],
      labels: months,
      format: thousands,
      breakdown: [6.1, 5.4, 4.2, 3.1],
      unit: (v) => change(v),
    },
    {
      key: 'active',
      value: count(18420),
      delta: change(3.1),
      direction: 'up',
      tone: 'good',
      series: [12.1, 12.6, 13.0, 13.4, 13.9, 14.5, 15.0, 15.6, 16.2, 16.9, 17.86, 18.42],
      labels: months,
      format: thousands,
      breakdown: [9820, 5410, 2370, 820],
      unit: count,
    },
    {
      key: 'registrations',
      value: count(842),
      delta: change(12.6),
      direction: 'up',
      tone: 'good',
      series: [512, 540, 498, 610, 655, 590, 702, 688, 731, 705, 748, 842],
      labels: months,
      format: count,
      breakdown: [514, 177, 151],
      unit: count,
    },
    {
      key: 'commission',
      value: rupiahB(1.84),
      delta: change(18.4),
      direction: 'up',
      tone: 'neutral',
      series: [1.1, 1.18, 1.2, 1.26, 1.31, 1.29, 1.4, 1.46, 1.52, 1.49, 1.554, 1.84],
      labels: months,
      format: rupiahB,
      breakdown: [736, 552, 368, 184],
      unit: rupiahM,
    },
    {
      key: 'wallet',
      value: rupiahM(628.4),
      delta: change(-2.3),
      direction: 'down',
      tone: 'good',
      series: [540, 566, 588, 602, 611, 634, 655, 648, 662, 651, 643.2, 628.4],
      labels: weeks,
      format: rupiahM,
      breakdown: [412.1, 168.9, 47.4],
      unit: rupiahM,
    },
    {
      key: 'reward',
      value: `${num(3.2, 1)}${scale('M')} ${pts}`,
      delta: change(6),
      direction: 'up',
      tone: 'neutral',
      series: [2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 2.95, 3.02, 3.2],
      labels: months,
      format: (v) => `${num(v, 1)}${scale('M')}`,
      breakdown: [2.41, 0.52, 0.27],
      unit: (v) => `${num(v, 2)}${scale('M')} ${pts}`,
    },
    {
      key: 'leaders',
      value: 'Budi Santoso',
      delta: change(9.8),
      direction: 'up',
      tone: 'good',
      series: [301, 318, 330, 351, 359, 380, 390, 402, 418, 431, 423.7, 465.2],
      labels: months,
      format: rupiahM,
      breakdown: [465.2, 186.4, 142.9, 118.3],
      unit: rupiahM,
    },
  ]

  return data.map((metric) => {
    const words = copy.metrics[metric.key]
    return {
      ...metric,
      label: words.label,
      caption: words.caption,
      period: words.period,
      breakdownTitle: words.breakdownTitle,
      breakdown: metric.breakdown.map((value, i): [string, number] => [words.breakdown[i], value]),
    }
  })
})

const activeKey = ref<MetricKey>('revenue')
const active = computed(() => metrics.value.find((m) => m.key === activeKey.value)!)
const breakdownMax = computed(() => Math.max(...active.value.breakdown.map(([, v]) => v)))

function onKeydown(event: KeyboardEvent, index: number) {
  const step = ['ArrowDown', 'ArrowRight'].includes(event.key)
    ? 1
    : ['ArrowUp', 'ArrowLeft'].includes(event.key)
      ? -1
      : 0
  if (!step) return
  event.preventDefault()
  const list = metrics.value
  const next = list[(index + step + list.length) % list.length]
  activeKey.value = next.key
  document.getElementById(`cc-tab-${next.key}`)?.focus()
}
</script>

<template>
  <section id="command-center" class="sm-section sm-section--tint cc">
    <div class="sm-container">
      <div class="sm-heading sm-heading--center">
        <span v-reveal class="sm-eyebrow">{{ t.commandCenter.eyebrow }}</span>
        <h2 v-reveal="60" class="sm-h2">{{ t.commandCenter.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.commandCenter.lead }}</p>
      </div>

      <div v-reveal class="cc__shell">
        <div
          class="cc__list"
          role="tablist"
          :aria-label="t.commandCenter.listLabel"
          aria-orientation="vertical"
        >
          <p class="cc__hint"><MousePointerClick :size="14" /> {{ t.commandCenter.hint }}</p>
          <button
            v-for="(metric, i) in metrics"
            :id="`cc-tab-${metric.key}`"
            :key="metric.key"
            type="button"
            role="tab"
            class="cc__metric"
            :aria-selected="metric.key === activeKey"
            aria-controls="cc-panel"
            :tabindex="metric.key === activeKey ? 0 : -1"
            @click="activeKey = metric.key"
            @keydown="onKeydown($event, i)"
          >
            <span class="cc__metric-text">
              <span class="cc__metric-label">{{ metric.label }}</span>
              <span class="cc__metric-value">{{ metric.value }}</span>
            </span>
            <Sparkline :data="metric.series" />
          </button>
        </div>

        <div
          id="cc-panel"
          class="ui cc__detail"
          role="tabpanel"
          :aria-labelledby="`cc-tab-${activeKey}`"
        >
          <Transition name="cc-fade" mode="out-in">
            <div :key="active.key" class="cc__detail-inner">
              <div class="cc__detail-head">
                <div>
                  <div class="cc__detail-label">{{ active.label }}</div>
                  <div class="cc__figure">{{ active.value }}</div>
                  <div class="cc__delta" :class="`cc__delta--${active.tone}`">
                    <ArrowUpRight v-if="active.direction === 'up'" :size="16" />
                    <ArrowDownRight v-else :size="16" />
                    <b>{{ active.delta }}</b>
                    <span>{{ active.caption }}</span>
                  </div>
                </div>
              </div>

              <div class="cc__chart">
                <div class="ui-label cc__period">{{ active.period }}</div>
                <AreaChart
                  :data="active.series"
                  :labels="active.labels"
                  :format="active.format"
                  :height="210"
                />
              </div>

              <div class="cc__breakdown">
                <div class="ui-title">{{ active.breakdownTitle }}</div>
                <ul>
                  <li v-for="[name, value] in active.breakdown" :key="name">
                    <span class="cc__bd-name">{{ name }}</span>
                    <span class="cc__bd-bar"
                      ><span :style="{ width: `${(value / breakdownMax) * 100}%` }"
                    /></span>
                    <b class="sm-num">{{ active.unit(value) }}</b>
                  </li>
                </ul>
              </div>
            </div>
          </Transition>
        </div>
      </div>
      <VisualNote />
    </div>
  </section>
</template>

<style scoped>
.cc__shell {
  display: grid;
  grid-template-columns: 360px 1fr;
  border-radius: var(--sm-r-shell);
  background: var(--sm-surface);
  border: 1px solid var(--sm-border);
  box-shadow: var(--sm-shadow-product);
  overflow: hidden;
}
.cc__list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px;
  border-right: 1px solid var(--sm-border);
  background: var(--sm-surface-subtle);
}
.cc__hint {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px 10px;
  font-size: 12.5px;
  font-weight: 500;
  color: var(--sm-subtle);
}
.cc__metric {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid transparent;
  text-align: left;
  transition:
    background 0.18s var(--sm-ease),
    border-color 0.18s var(--sm-ease),
    box-shadow 0.18s var(--sm-ease);
}
.cc__metric:hover {
  background: var(--sm-surface);
}
.cc__metric[aria-selected='true'] {
  background: var(--sm-surface);
  border-color: var(--sm-primary-200);
  box-shadow: 0 0 0 3px var(--sm-primary-50);
}
.cc__metric-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.cc__metric-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--sm-muted);
}
.cc__metric-value {
  font-size: 17px;
  font-weight: 650;
  letter-spacing: -0.02em;
  color: var(--sm-text);
  white-space: nowrap;
}
.cc__detail {
  padding: clamp(24px, 3vw, 40px);
  min-width: 0;
}
.cc__detail-inner {
  display: flex;
  flex-direction: column;
  gap: 28px;
  height: 100%;
}
.cc__detail-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}
.cc__detail-label {
  font-size: 15px;
  font-weight: 600;
  color: var(--sm-muted);
}
.cc__figure {
  margin-top: 4px;
  font-size: clamp(36px, 4vw, 52px);
  font-weight: 650;
  letter-spacing: -0.035em;
  line-height: 1.1;
}
.cc__delta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  font-size: 14px;
  color: var(--sm-muted);
}
.cc__delta b {
  font-weight: 650;
}
.cc__delta--good svg,
.cc__delta--good b {
  color: var(--sm-ok);
}
.cc__delta--bad svg,
.cc__delta--bad b {
  color: var(--sm-danger);
}
.cc__delta--neutral svg,
.cc__delta--neutral b {
  color: var(--sm-primary-ink);
}
.cc__period {
  margin-bottom: 18px;
}
.cc__breakdown {
  padding-top: 24px;
  border-top: 1px solid var(--sm-border);
}
.cc__breakdown ul {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px 40px;
  margin-top: 16px;
}
.cc__breakdown li {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  grid-template-areas: 'name value' 'bar bar';
  gap: 6px 12px;
  font-size: 13.5px;
}
.cc__bd-name {
  grid-area: name;
  color: var(--sm-text-2);
}
.cc__breakdown b {
  grid-area: value;
  font-weight: 600;
}
.cc__bd-bar {
  grid-area: bar;
  height: 8px;
  border-radius: 999px;
  background: var(--sm-surface-subtle);
}
.cc__bd-bar span {
  display: block;
  height: 100%;
  border-radius: 999px;
  background: var(--sm-primary);
  transition: width 0.6s var(--sm-ease-out);
}
.cc-fade-enter-active,
.cc-fade-leave-active {
  transition:
    opacity 0.22s var(--sm-ease),
    transform 0.22s var(--sm-ease);
}
.cc-fade-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.cc-fade-leave-to {
  opacity: 0;
}

@media (max-width: 980px) {
  .cc__shell {
    grid-template-columns: minmax(0, 1fr);
  }
  .cc__list {
    flex-direction: row;
    overflow-x: auto;
    scrollbar-width: none;
    border-right: 0;
    border-bottom: 1px solid var(--sm-border);
    padding: 12px;
  }
  .cc__list::-webkit-scrollbar {
    display: none;
  }
  .cc__hint {
    display: none;
  }
  .cc__metric {
    flex: none;
    background: var(--sm-surface);
    border-color: var(--sm-border);
  }
  .cc__metric svg {
    display: none;
  }
}
@media (max-width: 620px) {
  .cc__breakdown ul {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
