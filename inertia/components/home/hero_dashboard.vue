<script setup lang="ts">
import { computed } from 'vue'
import {
  ChartColumn,
  Gift,
  LayoutDashboard,
  Lock,
  Network,
  Search,
  Settings2,
  ShoppingCart,
  SlidersHorizontal,
  TrendingDown,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-vue-next'
import AreaChart from '~/components/site/area_chart.vue'
import CountUp from '~/components/site/count_up.vue'
import Sparkline from '~/components/site/sparkline.vue'
import { useCopy } from '~/i18n'
import { useFormat } from '~/composables/format'

const t = useCopy('homeIntro')
/** Sample figures in the page language: Rp465.2M / Rp465,2 jt. */
const { num, change, scale, rupiahShort } = useFormat()

const navItems = [
  { key: 'overview', icon: LayoutDashboard },
  { key: 'members', icon: Users },
  { key: 'network', icon: Network },
  { key: 'orders', icon: ShoppingCart },
  { key: 'commissions', icon: SlidersHorizontal },
  { key: 'wallet', icon: Wallet },
  { key: 'rewards', icon: Gift },
  { key: 'reports', icon: ChartColumn },
  { key: 'settings', icon: Settings2 },
] as const
const activeNav = 'overview'
const nav = computed(() =>
  navItems.map((item) => ({ ...item, label: t.value.dashboard.nav[item.key] }))
)

const kpis = computed(() => {
  const labels = t.value.dashboard.kpis
  return [
    {
      label: labels.revenue,
      to: 12.48,
      decimals: 2,
      prefix: 'Rp',
      suffix: scale('B'),
      delta: change(12.4),
      up: true,
      trend: [8.1, 8.6, 8.4, 9.2, 9.6, 9.4, 10.3, 10.8, 11.1, 11.6, 11.1, 12.48],
    },
    {
      label: labels.activeMembers,
      to: 18420,
      decimals: 0,
      prefix: '',
      suffix: '',
      delta: change(3.1),
      up: true,
      trend: [12.1, 12.6, 13, 13.4, 13.9, 14.5, 15, 15.6, 16.2, 16.9, 17.86, 18.42],
    },
    {
      label: labels.newMembers,
      to: 842,
      decimals: 0,
      prefix: '+',
      suffix: '',
      delta: change(12.6),
      up: true,
      trend: [512, 540, 498, 610, 655, 590, 702, 688, 731, 705, 748, 842],
    },
    {
      label: labels.commissionPayout,
      to: 1.84,
      decimals: 2,
      prefix: 'Rp',
      suffix: scale('B'),
      delta: change(18.4),
      up: true,
      trend: [1.1, 1.18, 1.2, 1.26, 1.31, 1.29, 1.4, 1.46, 1.52, 1.49, 1.554, 1.84],
    },
  ]
})

const growth = [12.1, 12.6, 13.0, 13.4, 13.9, 14.5, 15.0, 15.6, 16.2, 16.9, 17.86, 18.42]

const status = computed(() => {
  const labels = t.value.dashboard.commission.status
  return [
    { key: 'paid', label: labels.paid, amount: rupiahShort(1.14e9), share: 62, tone: 'ok' },
    {
      key: 'approved',
      label: labels.approved,
      amount: rupiahShort(440e6),
      share: 24,
      tone: 'info',
    },
    { key: 'pending', label: labels.pending, amount: rupiahShort(260e6), share: 14, tone: 'warn' },
  ]
})

const performers = computed(() => [
  {
    name: 'Budi Santoso',
    initials: 'BS',
    rank: 'Diamond',
    sales: rupiahShort(465.2e6),
    delta: change(9.8),
    up: true,
  },
  {
    name: 'Sarah Wijaya',
    initials: 'SW',
    rank: 'Platinum',
    sales: rupiahShort(186.4e6),
    delta: change(12.4),
    up: true,
  },
  {
    name: 'Daniel Pratama',
    initials: 'DP',
    rank: 'Gold',
    sales: rupiahShort(142.9e6),
    delta: change(8.1),
    up: true,
  },
  {
    name: 'Kevin Halim',
    initials: 'KH',
    rank: 'Gold',
    sales: rupiahShort(118.3e6),
    delta: change(-2.3),
    up: false,
  },
])

const regionValues = [
  { key: 'westJava', value: 3.62 },
  { key: 'jakarta', value: 2.91 },
  { key: 'eastJava', value: 2.34 },
  { key: 'centralJava', value: 1.78 },
  { key: 'baliNusaTenggara', value: 0.96 },
] as const
const regions = computed(() =>
  regionValues.map((r) => ({ ...r, name: t.value.dashboard.regions.names[r.key] }))
)
const regionMax = Math.max(...regionValues.map((r) => r.value))
</script>

<template>
  <div class="ui ui-window hd">
    <div class="ui-chrome">
      <div class="ui-dots"><i /><i /><i /></div>
      <div class="ui-url"><Lock :size="11" /> app.mlmsoft.com/overview</div>
      <span style="width: 46px" />
    </div>

    <div class="hd__app">
      <aside class="hd__side">
        <div class="hd__brand">
          <span class="hd__mark" />
          <span>mlmsoft</span>
        </div>
        <nav class="hd__nav">
          <span
            v-for="item in nav"
            :key="item.key"
            class="hd__nav-item"
            :class="{ 'is-active': item.key === activeNav }"
          >
            <component :is="item.icon" :size="15" />
            {{ item.label }}
          </span>
        </nav>
        <div class="hd__tenant">
          <span class="ui-avatar" style="width: 26px; height: 26px; font-size: 10px">{{
            t.dashboard.tenant.initials
          }}</span>
          <span>
            <b>{{ t.dashboard.tenant.name }}</b>
            <small>{{ t.dashboard.tenant.role }}</small>
          </span>
        </div>
      </aside>

      <div class="hd__main">
        <div class="hd__top">
          <div>
            <div class="ui-label">{{ t.dashboard.greeting }}</div>
            <div class="hd__h">{{ t.dashboard.title }}</div>
          </div>
          <div class="hd__tools">
            <span class="ui-input hd__search"
              ><Search :size="13" /> {{ t.dashboard.search }} <kbd>⌘K</kbd></span
            >
            <span class="ui-input">{{ t.dashboard.period }}</span>
            <span class="ui-badge ui-badge--plain">{{ t.dashboard.today }}</span>
          </div>
        </div>

        <div class="hd__kpis">
          <div v-for="kpi in kpis" :key="kpi.label" class="ui-panel hd__kpi">
            <div class="ui-label">{{ kpi.label }}</div>
            <div class="hd__kpi-row">
              <div class="ui-value">
                <CountUp
                  :to="kpi.to"
                  :decimals="kpi.decimals"
                  :prefix="kpi.prefix"
                  :suffix="kpi.suffix"
                />
              </div>
              <Sparkline :data="kpi.trend" />
            </div>
            <span class="ui-delta" :class="kpi.up ? 'ui-delta--up' : 'ui-delta--down'">
              <TrendingUp v-if="kpi.up" :size="12" /><TrendingDown v-else :size="12" />
              {{ kpi.delta }} <span class="hd__vs">{{ t.dashboard.vsLastMonth }}</span>
            </span>
          </div>
        </div>

        <div class="hd__grid">
          <div class="ui-panel">
            <div class="hd__panel-head">
              <div>
                <div class="ui-title">{{ t.dashboard.growth.title }}</div>
                <div class="ui-label">{{ t.dashboard.growth.caption }}</div>
              </div>
              <span class="hd__seg"
                ><span
                  v-for="(range, i) in t.dashboard.growth.ranges"
                  :key="range"
                  :class="{ 'is-on': i === t.dashboard.growth.ranges.length - 1 }"
                  >{{ range }}</span
                ></span
              >
            </div>
            <AreaChart
              :data="growth"
              :labels="t.dashboard.months"
              :height="178"
              :format="(v: number) => `${num(v, v % 1 ? 1 : 0)}${scale('K')}`"
            />
          </div>

          <div class="ui-panel">
            <div class="hd__panel-head">
              <div>
                <div class="ui-title">{{ t.dashboard.commission.title }}</div>
                <div class="ui-label">{{ t.dashboard.commission.caption }}</div>
              </div>
            </div>
            <div class="hd__stack" role="img" :aria-label="t.dashboard.commission.chartLabel">
              <span
                v-for="s in status"
                :key="s.key"
                :class="`is-${s.tone}`"
                :style="{ flexGrow: s.share }"
              />
            </div>
            <ul class="hd__status">
              <li v-for="s in status" :key="s.key">
                <span class="ui-badge" :class="`ui-badge--${s.tone}`">{{ s.label }}</span>
                <span class="hd__status-share">{{ s.share }}%</span>
                <b>{{ s.amount }}</b>
              </li>
            </ul>
            <div class="hd__next">
              <span class="ui-label">{{ t.dashboard.commission.nextRun }}</span>
              <b>{{ t.dashboard.commission.nextRunDate }}</b>
            </div>
          </div>

          <div class="ui-panel">
            <div class="hd__panel-head">
              <div class="ui-title">{{ t.dashboard.performers.title }}</div>
              <span class="ui-label">{{ t.dashboard.performers.caption }}</span>
            </div>
            <table class="ui-table">
              <thead>
                <tr>
                  <th>{{ t.dashboard.performers.member }}</th>
                  <th>{{ t.dashboard.performers.rank }}</th>
                  <th class="r">{{ t.dashboard.performers.sales }}</th>
                  <th class="r">{{ t.dashboard.performers.change }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="p in performers" :key="p.name">
                  <td>
                    <span class="hd__member"
                      ><span class="ui-avatar">{{ p.initials }}</span
                      >{{ p.name }}</span
                    >
                  </td>
                  <td>
                    <span class="ui-badge ui-badge--plain">{{ p.rank }}</span>
                  </td>
                  <td class="r">
                    <b>{{ p.sales }}</b>
                  </td>
                  <td class="r">
                    <span class="ui-delta" :class="p.up ? 'ui-delta--up' : 'ui-delta--down'">{{
                      p.delta
                    }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="ui-panel">
            <div class="hd__panel-head">
              <div class="ui-title">{{ t.dashboard.regions.title }}</div>
              <span class="ui-label">{{ t.dashboard.regions.unit }}</span>
            </div>
            <ul class="hd__regions">
              <li v-for="r in regions" :key="r.key">
                <span class="hd__region-name">{{ r.name }}</span>
                <span class="hd__bar"
                  ><span :style="{ width: `${(r.value / regionMax) * 100}%` }"
                /></span>
                <b>{{ num(r.value, 2) }}</b>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hd {
  width: 1200px;
  height: 800px;
}
.hd__app {
  display: grid;
  grid-template-columns: 200px 1fr;
  height: calc(100% - 40px);
}
.hd__side {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 18px 12px;
  background: var(--sm-surface);
  border-right: 1px solid var(--sm-border);
}
.hd__brand {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 8px;
  font-family: var(--sm-display);
  font-weight: 800;
  font-size: 15px;
  letter-spacing: -0.03em;
}
.hd__mark {
  width: 20px;
  height: 20px;
  border-radius: 6px;
  background:
    radial-gradient(circle at 72% 72%, #06c8f5 0 3px, transparent 3.5px),
    linear-gradient(135deg, #005dfb, #009af9);
}
.hd__nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.hd__nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 34px;
  padding: 0 10px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  color: var(--sm-muted);
}
.hd__nav-item.is-active {
  background: var(--sm-primary-50);
  color: var(--sm-primary-ink);
  font-weight: 600;
}
.hd__tenant {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
  padding: 10px 8px 0;
  border-top: 1px solid var(--sm-border);
  font-size: 12px;
}
.hd__tenant b,
.hd__tenant small {
  display: block;
  line-height: 1.3;
}
.hd__tenant small {
  color: var(--sm-muted);
  font-size: 11px;
}
.hd__main {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 18px 20px;
  background: var(--sm-surface-subtle);
  min-width: 0;
}
.hd__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.hd__h {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.02em;
}
.hd__tools {
  display: flex;
  align-items: center;
  gap: 8px;
}
.hd__search {
  width: 250px;
  justify-content: flex-start;
  color: var(--sm-subtle);
}
.hd__search kbd {
  margin-left: auto;
  font-family: var(--sm-sans);
  font-size: 10.5px;
  color: var(--sm-muted);
  background: var(--sm-surface-hover);
  border-radius: 5px;
  padding: 1px 5px;
}
.hd__kpis {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}
.hd__kpi {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px 16px;
}
.hd__kpi-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
.hd__vs {
  color: var(--sm-subtle);
  font-weight: 500;
}
.hd__grid {
  display: grid;
  grid-template-columns: 1.55fr 1fr;
  grid-template-rows: auto 1fr;
  gap: 12px;
  flex: 1;
  min-height: 0;
}
.hd__panel-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 14px;
}
.hd__seg {
  display: inline-flex;
  padding: 2px;
  border-radius: 8px;
  background: var(--sm-surface-hover);
  font-size: 11px;
  font-weight: 600;
  color: var(--sm-muted);
}
.hd__seg span {
  padding: 3px 8px;
  border-radius: 6px;
}
.hd__seg .is-on {
  background: var(--sm-surface);
  color: var(--sm-text);
  box-shadow: 0 1px 2px rgba(4, 24, 54, 0.1);
}
.hd__stack {
  display: flex;
  gap: 2px;
  height: 12px;
  margin-bottom: 14px;
}
.hd__stack span {
  border-radius: 4px;
}
.hd__stack .is-ok {
  background: #20b27f;
}
.hd__stack .is-info {
  background: var(--sm-primary);
}
.hd__stack .is-warn {
  background: #e9a23b;
}
.hd__status {
  list-style: none;
  display: flex;
  flex-direction: column;
}
.hd__status li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  border-bottom: 1px solid var(--sm-surface-hover);
  font-variant-numeric: tabular-nums;
}
.hd__status-share {
  color: var(--sm-muted);
  font-size: 12px;
}
.hd__status b {
  margin-left: auto;
}
.hd__next {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding: 10px 12px;
  border-radius: 10px;
  background: var(--sm-primary-50);
  font-size: 12.5px;
}
.hd__member {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}
.hd__member .ui-avatar {
  width: 24px;
  height: 24px;
  font-size: 9.5px;
}
.hd__regions {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.hd__regions li {
  display: grid;
  grid-template-columns: 140px 1fr 36px;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
}
.hd__regions b {
  text-align: right;
}
.hd__region-name {
  color: var(--sm-text-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.hd__bar {
  height: 10px;
}
.hd__bar span {
  display: block;
  height: 100%;
  border-radius: 0 4px 4px 0;
  background: #2f8cff;
}
</style>
