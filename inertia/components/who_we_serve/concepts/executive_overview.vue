<script setup lang="ts">
/**
 * Owner overview concept for /who-we-serve/executives. Sample data only,
 * consistent with the other mockups on the site.
 */
import { computed } from 'vue'
import { CircleCheck, TrendingDown, TrendingUp, TriangleAlert } from 'lucide-vue-next'
import AreaChart from '~/components/site/area_chart.vue'
import Sparkline from '~/components/site/sparkline.vue'
import { useCopy } from '~/i18n'
import { useFormat } from '~/composables/format'

const t = useCopy('personas')
/** Sample figures in the page language: Rp12.48B / Rp12,48 miliar, 18,420 / 18.420. */
const { num, percent, change, rupiahShort, scale } = useFormat()
const copy = computed(() => t.value.concepts.executive)

const kpis = computed(() => [
  {
    label: copy.value.kpis.sales,
    value: rupiahShort(12.48e9),
    delta: change(12.4),
    up: true,
    good: true,
    trend: [8.1, 8.6, 8.4, 9.2, 9.6, 9.4, 10.3, 10.8, 11.1, 11.6, 11.1, 12.48],
  },
  {
    label: copy.value.kpis.activeMembers,
    value: num(18420),
    delta: change(3.1),
    up: true,
    good: true,
    trend: [12.1, 12.6, 13, 13.4, 13.9, 14.5, 15, 15.6, 16.2, 16.9, 17.86, 18.42],
  },
  {
    label: copy.value.kpis.newMembers,
    value: num(842),
    delta: change(12.6),
    up: true,
    good: true,
    trend: [512, 540, 498, 610, 655, 590, 702, 688, 731, 705, 748, 842],
  },
  {
    label: copy.value.kpis.commission,
    value: percent(14.7),
    delta: change(0.7, 1, ` ${copy.value.points}`),
    up: true,
    good: false,
    trend: [13.2, 13.4, 13.5, 13.9, 14.1, 13.8, 14.0, 14.2, 14.4, 14.0, 14.0, 14.7],
  },
])

const sales = [8.1, 8.6, 8.4, 9.2, 9.6, 9.4, 10.3, 10.8, 11.1, 11.6, 11.1, 12.48]

const shares = [31, 26, 19, 14, 10]
const regions = computed(() => copy.value.regions.map((name, i) => ({ name, share: shares[i] })))

const alertOk = [false, false, true]
const alerts = computed(() => copy.value.alerts.map((text, i) => ({ text, ok: alertOk[i] })))
</script>

<template>
  <div class="ui xo" :aria-label="copy.label" role="img">
    <div class="xo__head">
      <div>
        <div class="ui-label">{{ copy.eyebrow }}</div>
        <div class="xo__title">{{ copy.period }}</div>
      </div>
      <span class="xo__seg" aria-hidden="true"
        ><b>{{ copy.ranges[0] }}</b
        ><span>{{ copy.ranges[1] }}</span
        ><span>{{ copy.ranges[2] }}</span></span
      >
    </div>

    <div class="xo__kpis">
      <div v-for="kpi in kpis" :key="kpi.label" class="xo__kpi">
        <span class="ui-label">{{ kpi.label }}</span>
        <b class="sm-num">{{ kpi.value }}</b>
        <span class="xo__kpi-foot">
          <span class="ui-delta" :class="kpi.good ? 'ui-delta--up' : 'ui-delta--down'">
            <TrendingUp v-if="kpi.up" :size="12" /><TrendingDown v-else :size="12" />
            {{ kpi.delta }}
          </span>
          <Sparkline :data="kpi.trend" />
        </span>
      </div>
    </div>

    <div class="xo__body">
      <div class="xo__panel xo__chart">
        <div class="ui-title">{{ copy.chartTitle }}</div>
        <AreaChart
          :data="sales"
          :labels="copy.months"
          :format="(v: number) => `Rp${num(v, 1)}${scale('B')}`"
          :height="180"
          :interactive="false"
        />
      </div>

      <div class="xo__side">
        <div class="xo__panel">
          <div class="ui-title">{{ copy.regionsTitle }}</div>
          <ul class="xo__bars">
            <li v-for="region in regions" :key="region.name">
              <span>{{ region.name }}</span>
              <span class="xo__bar"><span :style="{ width: `${region.share * 3}%` }" /></span>
              <b class="sm-num">{{ region.share }}%</b>
            </li>
          </ul>
        </div>
        <div class="xo__panel">
          <div class="ui-title">{{ copy.alertsTitle }}</div>
          <ul class="xo__alerts">
            <li v-for="alert in alerts" :key="alert.text">
              <CircleCheck v-if="alert.ok" :size="15" class="xo__ok" />
              <TriangleAlert v-else :size="15" class="xo__warn" />
              {{ alert.text }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.xo {
  width: 100%;
  max-width: 1080px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: clamp(16px, 2.4vw, 28px);
  border-radius: var(--sm-r-shell);
  background: var(--sm-surface);
  border: 1px solid var(--sm-border);
  box-shadow: var(--sm-shadow-product);
}
.xo__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.xo__title {
  font-size: 18px;
  font-weight: 650;
  letter-spacing: -0.02em;
}
.xo__seg {
  display: flex;
  padding: 3px;
  border-radius: 10px;
  background: var(--sm-surface-hover);
  font-size: 12px;
  color: var(--sm-muted);
}
.xo__seg > * {
  padding: 5px 10px;
  border-radius: 8px;
}
.xo__seg b {
  background: var(--sm-surface);
  color: var(--sm-text);
  font-weight: 600;
  box-shadow: 0 1px 2px rgba(4, 24, 54, 0.1);
}
.xo__kpis {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}
.xo__kpi {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px;
  border-radius: 14px;
  background: var(--sm-surface-subtle);
}
.xo__kpi b {
  font-size: 22px;
  font-weight: 650;
  letter-spacing: -0.025em;
}
.xo__kpi-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.xo__body {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
  gap: 12px;
}
.xo__panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border-radius: 14px;
  border: 1px solid var(--sm-border);
}
.xo__chart {
  padding-bottom: 28px;
}
.xo__side {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.xo__bars {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.xo__bars li {
  display: grid;
  grid-template-columns: 82px minmax(0, 1fr) 34px;
  align-items: center;
  gap: 10px;
  font-size: 12.5px;
}
.xo__bars b {
  text-align: right;
  font-weight: 600;
}
.xo__bar {
  height: 8px;
  border-radius: 999px;
  background: var(--sm-primary-50);
}
.xo__bar span {
  display: block;
  height: 100%;
  border-radius: 999px;
  background: var(--sm-primary);
}
.xo__alerts {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.xo__alerts li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 12.5px;
  line-height: 1.45;
}
.xo__alerts svg {
  flex: none;
  margin-top: 1px;
}
.xo__ok {
  color: var(--sm-ok);
}
.xo__warn {
  color: var(--sm-warn);
}
@media (max-width: 900px) {
  .xo__kpis {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .xo__body {
    grid-template-columns: minmax(0, 1fr);
  }
}
@media (max-width: 480px) {
  .xo__seg {
    display: none;
  }
  .xo__kpi b {
    font-size: 19px;
  }
  .xo__kpi-foot > svg {
    display: none;
  }
}
</style>
