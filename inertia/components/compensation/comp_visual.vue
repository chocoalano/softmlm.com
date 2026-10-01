<script setup lang="ts">
/**
 * Illustrations for the compensation page sections. Every figure is demo
 * data; each visual says so in its own caption. Names, ranks and amounts
 * are sample data and stay the same in every language.
 */
import { computed, ref } from 'vue'
import {
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  CircleCheck,
  CircleX,
  FileText,
  Landmark,
  Link2,
} from 'lucide-vue-next'
import { useCopy } from '~/i18n'

defineProps<{
  name:
    'qualification' | 'rank' | 'override' | 'simulation' | 'versioning' | 'reversal' | 'wallet_tax'
  tone?: 'light' | 'dark'
}>()

const copy = useCopy('compensation')
const t = computed(() => copy.value.visuals)

const rupiah = (value: number) =>
  `${value < 0 ? '−' : ''}Rp${Math.abs(Math.round(value)).toLocaleString('id-ID')}`

/* --- qualification --- */
const checks = computed(() => [
  { key: 'active', ok: true, text: t.value.qualification.checks.active },
  { key: 'placed', ok: true, text: t.value.qualification.checks.placed },
  { key: 'verified', ok: true, text: t.value.qualification.checks.verified },
  { key: 'rank', ok: false, text: t.value.qualification.checks.rank },
])

/* --- override with compression (interactive) --- */
const compression = ref(true)
const OVERRIDE_BASE = 1_000_000
const rates = [10, 8, 6, 4, 2]
const uplines = [
  { name: 'Putri S.', rank: 'Silver', active: true },
  { name: 'Andre S.', rank: 'Silver', active: false },
  { name: 'Lina H.', rank: 'Gold', active: true },
  { name: 'Dewi A.', rank: 'Silver', active: false },
  { name: 'Daniel P.', rank: 'Gold', active: true },
  { name: 'Sarah W.', rank: 'Platinum', active: true },
  { name: 'Budi S.', rank: 'Diamond', active: true },
]
const overrides = computed(() => {
  let generation = 0
  return uplines.map((member) => {
    if (compression.value && !member.active) return { ...member, generation: null, amount: 0 }
    generation++
    const rate = rates[generation - 1] ?? 0
    const amount = member.active ? (OVERRIDE_BASE * rate) / 100 : 0
    return { ...member, generation: generation <= rates.length ? generation : null, rate, amount }
  })
})
const overrideTotal = computed(() => overrides.value.reduce((sum, row) => sum + row.amount, 0))

/* --- rank ladder --- */
const rankLadder = [
  { key: 'silver', name: 'Silver', progress: 100 },
  { key: 'gold', name: 'Gold', progress: 100 },
  { key: 'platinum', name: 'Platinum', progress: 50 },
  { key: 'diamond', name: 'Diamond', progress: 0 },
] as const
const ranks = computed(() =>
  rankLadder.map((rank) => ({ ...rank, rule: t.value.rank.rules[rank.key] }))
)

/* --- simulation --- */
const scenario = [
  { key: 'total', current: 1_840_000_000, proposed: 1_897_000_000 },
  { key: 'pairing', current: 552_000_000, proposed: 609_000_000 },
  { key: 'override', current: 368_000_000, proposed: 368_000_000 },
] as const
const scenarioMax = Math.max(...scenario.flatMap((row) => [row.current, row.proposed]))
/** Rp1.84B / Rp552M in English, Rp1,84M / Rp552jt in Indonesian. */
const compact = (value: number) => {
  const units = copy.value.units
  return value >= 1_000_000_000
    ? `Rp${(value / 1_000_000_000).toFixed(2).replace('.', units.decimal)}${units.billion}`
    : `Rp${Math.round(value / 1_000_000)}${units.million}`
}

/* --- versioning --- */
const versions = computed(() => [
  { key: 'v1', badge: 'ui-badge--plain', active: false, ...t.value.versioning.versions.v1 },
  { key: 'v2', badge: 'ui-badge--ok', active: true, ...t.value.versioning.versions.v2 },
  { key: 'v3', badge: 'ui-badge--warn', active: false, ...t.value.versioning.versions.v3 },
])
</script>

<template>
  <div class="ui cv" :class="`cv--${tone ?? 'light'}`">
    <!-- Qualification & eligibility -->
    <div v-if="name === 'qualification'" class="cv__panel">
      <div class="cv__head">
        <div>
          <div class="ui-label">{{ t.qualification.label }}</div>
          <div class="ui-title">Sarah Wijaya</div>
        </div>
        <span class="ui-badge ui-badge--plain">{{ t.demoData }}</span>
      </div>
      <ul class="cv__checks">
        <li v-for="check in checks" :key="check.key">
          <CircleCheck v-if="check.ok" :size="16" class="cv__ok" />
          <CircleX v-else :size="16" class="cv__no" />
          {{ check.text }}
        </li>
      </ul>
      <div class="cv__result">
        <span>{{ t.qualification.resultLabel }}</span>
        <b>{{ t.qualification.resultValue }}</b>
      </div>
    </div>

    <!-- Rank ladder -->
    <div v-else-if="name === 'rank'" class="cv__panel">
      <div class="cv__head">
        <div>
          <div class="ui-label">{{ t.rank.label }}</div>
          <div class="ui-title">{{ t.rank.title }}</div>
        </div>
        <span class="ui-badge ui-badge--plain">{{ t.demoData }}</span>
      </div>
      <ol class="cv__ranks">
        <li v-for="rank in ranks" :key="rank.key" :data-done="rank.progress === 100">
          <div class="cv__rank-top">
            <b>{{ rank.name }}</b>
            <span class="ui-label">{{
              rank.progress === 100 ? t.rank.achieved : `${rank.progress}%`
            }}</span>
          </div>
          <span class="ui-label">{{ rank.rule }}</span>
          <div class="ui-progress"><span :style="{ width: `${rank.progress}%` }" /></div>
        </li>
      </ol>
    </div>

    <!-- Override with compression -->
    <div v-else-if="name === 'override'" class="cv__panel">
      <div class="cv__head">
        <div>
          <div class="ui-label">{{ t.override.label }}</div>
          <div class="ui-title">{{ t.override.title }}</div>
        </div>
        <label class="cv__switch">
          <input v-model="compression" type="checkbox" role="switch" />
          <span class="cv__switch-ui" aria-hidden="true" />
          {{ t.override.compression }}
        </label>
      </div>
      <table class="ui-table">
        <thead>
          <tr>
            <th>{{ t.override.columns.upline }}</th>
            <th>{{ t.override.columns.status }}</th>
            <th>{{ t.override.columns.generation }}</th>
            <th class="r">{{ t.override.columns.override }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in overrides" :key="row.name" :class="{ cv__muted: !row.active }">
            <td>
              {{ row.name }} <span class="ui-label">· {{ row.rank }}</span>
            </td>
            <td>
              <span class="ui-badge" :class="row.active ? 'ui-badge--ok' : 'ui-badge--warn'">
                {{ row.active ? t.override.active : t.override.inactive }}
              </span>
            </td>
            <td>
              {{
                row.generation
                  ? `G${row.generation} · ${row.rate}%`
                  : compression && !row.active
                    ? t.override.skipped
                    : '—'
              }}
            </td>
            <td class="r">
              <b>{{ row.amount ? rupiah(row.amount) : '—' }}</b>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="cv__result" aria-live="polite">
        <span>{{ compression ? t.override.withCompression : t.override.withoutCompression }}</span>
        <b>{{ t.override.total }} {{ rupiah(overrideTotal) }}</b>
      </div>
    </div>

    <!-- Simulation -->
    <div v-else-if="name === 'simulation'" class="cv__panel">
      <div class="cv__head">
        <div>
          <div class="ui-label">{{ t.simulation.label }}</div>
          <div class="ui-title">{{ t.simulation.title }}</div>
        </div>
        <span class="ui-badge ui-badge--plain">{{ t.illustration }}</span>
      </div>
      <ul class="cv__bars">
        <li v-for="row in scenario" :key="row.key">
          <span class="cv__bar-label">{{ t.simulation.rows[row.key] }}</span>
          <span class="cv__bar-track">
            <span
              class="cv__bar cv__bar--current"
              :style="{ width: `${(row.current / scenarioMax) * 100}%` }"
            />
            <span
              class="cv__bar cv__bar--proposed"
              :style="{ width: `${(row.proposed / scenarioMax) * 100}%` }"
            />
          </span>
          <span class="cv__bar-values">
            <span>{{ compact(row.current) }}</span>
            <b>{{ compact(row.proposed) }}</b>
          </span>
        </li>
      </ul>
      <div class="cv__legend">
        <span><i class="cv__key cv__key--current" /> {{ t.simulation.current }}</span>
        <span><i class="cv__key cv__key--proposed" /> {{ t.simulation.proposed }}</span>
      </div>
    </div>

    <!-- Versioning -->
    <div v-else-if="name === 'versioning'" class="cv__panel">
      <div class="cv__head">
        <div>
          <div class="ui-label">{{ t.versioning.label }}</div>
          <div class="ui-title">{{ t.versioning.title }}</div>
        </div>
        <span class="ui-badge ui-badge--plain">{{ t.illustration }}</span>
      </div>
      <ol class="cv__versions">
        <li v-for="version in versions" :key="version.key" :data-active="version.active">
          <b>{{ version.name }}</b
          ><span class="ui-badge" :class="version.badge">{{ version.status }}</span>
          <span class="ui-label">{{ version.meta }}</span>
        </li>
      </ol>
      <div class="cv__result">
        <span>{{ t.versioning.resultLabel }}</span>
        <b>{{ t.versioning.resultValue }}</b>
      </div>
    </div>

    <!-- Reversal -->
    <div v-else-if="name === 'reversal'" class="cv__panel">
      <div class="cv__head">
        <div>
          <div class="ui-label">{{ t.reversal.label }}</div>
          <div class="ui-title">{{ t.reversal.title }}</div>
        </div>
        <span class="ui-badge ui-badge--plain">{{ t.illustration }}</span>
      </div>
      <ul class="cv__ledger">
        <li>
          <span class="cv__io cv__io--in"><ArrowDownLeft :size="14" /></span>
          <span class="cv__ledger-text"
            ><b>{{ t.reversal.bonus }}</b
            ><span class="ui-label">{{ t.reversal.bonusMeta }}</span></span
          >
          <b class="cv__in">+{{ rupiah(62500) }}</b>
        </li>
        <li>
          <span class="cv__io"><ArrowUpRight :size="14" /></span>
          <span class="cv__ledger-text"
            ><b>{{ t.reversal.reversal }}</b
            ><span class="ui-label">{{ t.reversal.reversalMeta }}</span></span
          >
          <b>{{ rupiah(-62500) }}</b>
        </li>
      </ul>
      <div class="cv__result">
        <span><Link2 :size="14" /> {{ t.reversal.resultLabel }}</span>
        <b>{{ t.reversal.net }} {{ rupiah(0) }}</b>
      </div>
    </div>

    <!-- Wallet & tax -->
    <div v-else class="cv__panel">
      <div class="cv__head">
        <div>
          <div class="ui-label">{{ t.walletTax.label }}</div>
          <div class="ui-title">{{ t.walletTax.title }}</div>
        </div>
        <span class="ui-badge ui-badge--plain">{{ t.illustration }}</span>
      </div>
      <ol class="cv__flow">
        <li>
          <span class="ui-label">{{ t.walletTax.gross }}</span
          ><b>{{ rupiah(420000) }}</b>
        </li>
        <li aria-hidden="true"><ArrowRight :size="16" /></li>
        <li>
          <span class="ui-label">{{ t.walletTax.withheld }}</span
          ><b>{{ rupiah(-21000) }}</b>
        </li>
        <li aria-hidden="true"><ArrowRight :size="16" /></li>
        <li>
          <span class="ui-label">{{ t.walletTax.credited }}</span
          ><b class="cv__in">{{ rupiah(399000) }}</b>
        </li>
      </ol>
      <ul class="cv__docs">
        <li><Landmark :size="15" /> {{ t.walletTax.ledger }}</li>
        <li><FileText :size="15" /> {{ t.walletTax.withholding }}</li>
      </ul>
      <p class="cv__foot">{{ t.walletTax.foot }}</p>
    </div>
  </div>
</template>

<style scoped>
.cv__panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  border-radius: 24px;
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
  box-shadow: var(--sm-shadow-product);
}
.cv__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--sm-border);
}
.cv__checks {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 13.5px;
}
.cv__checks li {
  display: flex;
  align-items: center;
  gap: 10px;
}
.cv__ok,
.cv__in {
  color: var(--sm-ok);
}
.cv__no {
  color: var(--sm-danger);
}
.cv__result {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 6px 12px;
  padding: 12px 14px;
  border-radius: 12px;
  background: var(--sm-primary-50);
  font-size: 13px;
}
.cv__result span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--sm-text-2);
}
.cv__result b {
  color: var(--sm-primary-ink);
}
.cv__ranks {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.cv__ranks li {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.cv__ranks li[data-done='false'] b {
  color: var(--sm-text-2);
}
.cv__rank-top {
  display: flex;
  justify-content: space-between;
}
.cv__switch {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}
.cv__switch input {
  position: absolute;
  opacity: 0;
}
.cv__switch-ui {
  position: relative;
  width: 34px;
  height: 20px;
  border-radius: 999px;
  background: var(--sm-border-2);
  transition: background 0.15s;
}
.cv__switch-ui::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  transition: left 0.15s var(--sm-ease);
}
.cv__switch input:checked + .cv__switch-ui {
  background: var(--sm-primary);
}
.cv__switch input:checked + .cv__switch-ui::after {
  left: 16px;
}
.cv__switch input:focus-visible + .cv__switch-ui {
  outline: 2px solid var(--sm-primary-ink);
  outline-offset: 2px;
}
.cv__muted td {
  color: var(--sm-subtle);
}
.cv__bars {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.cv__bars li {
  display: grid;
  grid-template-columns: 110px 1fr auto;
  align-items: center;
  gap: 12px;
  font-size: 12.5px;
}
.cv__bar-track {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.cv__bar {
  display: block;
  height: 9px;
  border-radius: 0 4px 4px 0;
}
.cv__bar--current {
  background: var(--sm-primary-200);
}
.cv__bar--proposed {
  background: var(--sm-primary);
}
.cv__bar-values {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-variant-numeric: tabular-nums;
  color: var(--sm-muted);
}
.cv__bar-values b {
  color: var(--sm-text);
}
.cv__legend {
  display: flex;
  gap: 18px;
  font-size: 12px;
  color: var(--sm-muted);
}
.cv__legend span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.cv__key {
  width: 12px;
  height: 8px;
  border-radius: 2px;
}
.cv__key--current {
  background: var(--sm-primary-200);
}
.cv__key--proposed {
  background: var(--sm-primary);
}
.cv__versions {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.cv__versions li {
  display: grid;
  grid-template-columns: auto auto 1fr;
  align-items: center;
  gap: 4px 10px;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid var(--sm-border);
  font-size: 13px;
}
.cv__versions li .ui-label {
  grid-column: 1 / -1;
}
.cv__versions li[data-active='true'] {
  border-color: var(--sm-primary-200);
  background: var(--sm-primary-50);
}
.cv__ledger {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-variant-numeric: tabular-nums;
}
.cv__ledger li {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
}
.cv__ledger-text {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.cv__io {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  flex: none;
  border-radius: 9px;
  background: var(--sm-surface-hover);
  color: var(--sm-muted);
}
.cv__io--in {
  background: var(--sm-ok-bg);
  color: var(--sm-ok);
}
.cv__flow {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font-variant-numeric: tabular-nums;
}
.cv__flow li:not([aria-hidden]) {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 12px;
  border-radius: 12px;
  background: var(--sm-surface-subtle);
  flex: 1;
}
.cv__flow li[aria-hidden] {
  color: var(--sm-subtle);
}
.cv__flow b {
  font-size: 15px;
}
.cv__docs {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 13px;
}
.cv__docs li {
  display: flex;
  align-items: center;
  gap: 8px;
}
.cv__docs svg {
  color: var(--sm-primary-ink);
}
.cv__foot {
  font-size: 12px;
  color: var(--sm-muted);
}
@media (max-width: 560px) {
  .cv__panel {
    padding: 16px;
    border-radius: var(--sm-r-card);
  }
  .cv__head {
    flex-direction: column;
  }
  .cv__bars li {
    grid-template-columns: minmax(0, 1fr) auto;
  }
  .cv__bar-label {
    grid-column: 1 / -1;
  }
  .cv__flow {
    flex-direction: column;
    align-items: stretch;
  }
  .cv__flow li[aria-hidden] {
    align-self: center;
    transform: rotate(90deg);
  }
  .ui-table th:nth-child(2),
  .ui-table td:nth-child(2) {
    display: none;
  }
}
</style>
