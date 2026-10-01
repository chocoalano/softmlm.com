<script setup lang="ts">
/**
 * Finance workflow concept for /who-we-serve/finance: one payout period,
 * from review to reconciliation. Sample data only.
 */
import { computed } from 'vue'
import { CircleCheck, RotateCcw, TriangleAlert } from 'lucide-vue-next'
import { useCopy } from '~/i18n'
import { useFormat } from '~/composables/format'

const t = useCopy('personas')
const { num } = useFormat()
const copy = computed(() => t.value.concepts.finance)

const stages = computed(() => [
  { label: copy.value.status.calculated, count: num(1284), tone: 'plain' },
  { label: copy.value.status.inReview, count: num(96), tone: 'warn' },
  { label: copy.value.status.approved, count: num(1188), tone: 'info' },
  { label: copy.value.status.readyToPay, count: num(1160), tone: 'info' },
  { label: copy.value.status.paid, count: '0', tone: 'ok' },
])

const rows = computed(() => [
  {
    member: 'Ayu Pratiwi',
    bonus: copy.value.bonuses.generation,
    amount: 'Rp1.250.000',
    status: copy.value.status.approved,
    tone: 'info',
  },
  {
    member: 'Budi Santoso',
    bonus: copy.value.bonuses.directReferral,
    amount: 'Rp187.500',
    status: copy.value.status.inReview,
    tone: 'warn',
  },
  {
    member: 'Maya Lestari',
    bonus: copy.value.bonuses.rank,
    amount: 'Rp2.400.000',
    status: copy.value.status.approved,
    tone: 'info',
  },
  {
    member: 'Rudi Hartono',
    bonus: copy.value.bonuses.leadership,
    amount: 'Rp860.000',
    status: copy.value.status.onHold,
    tone: 'danger',
  },
])
</script>

<template>
  <div class="ui fr" :aria-label="copy.label" role="img">
    <div class="fr__head">
      <div>
        <div class="ui-label">{{ copy.eyebrow }}</div>
        <div class="fr__title">{{ copy.period }}</div>
      </div>
      <span class="ui-badge ui-badge--warn">{{ copy.status.inReview }}</span>
    </div>

    <ol class="fr__stages">
      <li v-for="stage in stages" :key="stage.label">
        <span class="ui-badge" :class="`ui-badge--${stage.tone}`">{{ stage.label }}</span>
        <b class="sm-num">{{ stage.count }}</b>
      </li>
    </ol>

    <div class="fr__body">
      <div class="fr__panel fr__review">
        <div class="ui-title">{{ copy.reviewTitle }}</div>
        <table class="ui-table">
          <thead>
            <tr>
              <th>{{ copy.columns.member }}</th>
              <th>{{ copy.columns.bonus }}</th>
              <th class="r">{{ copy.columns.amount }}</th>
              <th class="r">{{ copy.columns.status }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in rows" :key="row.member">
              <td>{{ row.member }}</td>
              <td class="fr__muted">{{ row.bonus }}</td>
              <td class="r">{{ row.amount }}</td>
              <td class="r">
                <span class="ui-badge" :class="`ui-badge--${row.tone}`">{{ row.status }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="fr__side">
        <div class="fr__panel">
          <div class="fr__adj-head">
            <span class="fr__adj-icon"><RotateCcw :size="15" /></span>
            <div>
              <div class="ui-title">{{ copy.adjustmentTitle }}</div>
              <div class="ui-label">{{ copy.adjustmentOrder }}</div>
            </div>
          </div>
          <dl class="fr__dl">
            <div>
              <dt>{{ copy.originalBonus }}</dt>
              <dd>Rp187.500</dd>
            </div>
            <div>
              <dt>{{ copy.reversalEntry }}</dt>
              <dd class="fr__neg">−Rp187.500</dd>
            </div>
          </dl>
        </div>

        <div class="fr__panel">
          <div class="ui-title">{{ copy.taxTitle }}</div>
          <dl class="fr__dl">
            <div>
              <dt>{{ copy.gross }}</dt>
              <dd>Rp440.000.000</dd>
            </div>
            <div>
              <dt>{{ copy.withheld }}</dt>
              <dd>−Rp8.900.000</dd>
            </div>
            <div class="fr__total">
              <dt>{{ copy.net }}</dt>
              <dd>Rp431.100.000</dd>
            </div>
          </dl>
          <div class="ui-label">{{ copy.taxNote }}</div>
        </div>
      </div>
    </div>

    <ul class="fr__recon">
      <li><CircleCheck :size="15" class="fr__ok" /> {{ copy.reconciliation[0] }}</li>
      <li><CircleCheck :size="15" class="fr__ok" /> {{ copy.reconciliation[1] }}</li>
      <li><TriangleAlert :size="15" class="fr__warn" /> {{ copy.reconciliation[2] }}</li>
    </ul>
  </div>
</template>

<style scoped>
.fr {
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
  font-variant-numeric: tabular-nums;
}
.fr__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.fr__title {
  font-size: 18px;
  font-weight: 650;
  letter-spacing: -0.02em;
}
.fr__stages {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 8px;
}
.fr__stages li {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 12px;
  border-radius: 12px;
  background: var(--sm-surface-subtle);
}
.fr__stages b {
  font-size: 20px;
  font-weight: 650;
  letter-spacing: -0.02em;
}
.fr__body {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
  gap: 12px;
}
.fr__panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border-radius: 14px;
  border: 1px solid var(--sm-border);
}
.fr__review {
  overflow-x: auto;
}
.fr__muted {
  color: var(--sm-muted);
}
.fr__side {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.fr__adj-head {
  display: flex;
  align-items: center;
  gap: 10px;
}
.fr__adj-icon {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 9px;
  background: var(--sm-warn-bg);
  color: var(--sm-warn);
}
.fr__dl {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.fr__dl div {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 12.5px;
}
.fr__dl dt {
  color: var(--sm-muted);
}
.fr__dl dd {
  font-weight: 600;
}
.fr__neg {
  color: var(--sm-danger);
}
.fr__total {
  padding-top: 6px;
  border-top: 1px solid var(--sm-border);
}
.fr__total dd {
  color: var(--sm-primary-ink);
}
.fr__recon {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
  padding: 12px 16px;
  border-radius: 12px;
  background: var(--sm-surface-subtle);
  font-size: 12.5px;
}
.fr__recon li {
  display: flex;
  align-items: center;
  gap: 6px;
}
.fr__ok {
  color: var(--sm-ok);
}
.fr__warn {
  color: var(--sm-warn);
}
@media (max-width: 900px) {
  .fr__stages {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .fr__body {
    grid-template-columns: minmax(0, 1fr);
  }
}
@media (max-width: 520px) {
  .fr__stages {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .fr__stages li:last-child {
    display: none;
  }
  .fr__review th:nth-child(2),
  .fr__review td:nth-child(2) {
    display: none;
  }
  .fr__recon {
    flex-direction: column;
  }
}
</style>
