<script setup lang="ts">
/**
 * Wallet concept for /features/wallet-payout: the member's wallet next to
 * the finance payout queue, showing the same amounts for each side.
 * Sample data only.
 */
import { computed } from 'vue'
import { CircleCheck, TriangleAlert, Wallet } from 'lucide-vue-next'
import { useCopy } from '~/i18n'
import { useFormat } from '~/composables/format'

const t = useCopy('features')
const mock = computed(() => t.value.pages.wallet.concept.mock)
const { num, rupiah, rupiahShort } = useFormat()

const amounts = [1_250_000, -26_000, 187_500]
const entries = computed(() =>
  mock.value.entries.map((entry, i) => ({ ...entry, amount: amounts[i] }))
)
const statusCounts = [96, 1188, 1160]
const statusTones = ['warn', 'info', 'ok']
</script>

<template>
  <div class="pv" role="img" :aria-label="mock.ariaLabel">
    <div class="ui pv__wallet">
      <div class="pv__wallet-head">
        <span class="pv__icon"><Wallet :size="16" /></span>
        <span class="ui-title">{{ mock.walletTitle }}</span>
      </div>
      <div class="pv__balance">
        <span>{{ mock.available }}</span>
        <b class="sm-num">{{ rupiah(1_260_000) }}</b>
      </div>
      <div class="pv__split">
        <div>
          <span>{{ mock.pending }}</span>
          <b class="sm-num">{{ rupiah(420_000) }}</b>
        </div>
        <div>
          <span>{{ mock.onHold }}</span>
          <b class="sm-num">{{ rupiah(62_500) }}</b>
        </div>
      </div>
      <span class="ui-btn pv__withdraw">{{ mock.withdraw }}</span>
      <div class="ui-label pv__history-label">{{ mock.history }}</div>
      <ul class="pv__entries">
        <li v-for="entry in entries" :key="entry.text">
          <div>
            <div class="pv__entry-text">{{ entry.text }}</div>
            <div class="ui-label">{{ entry.note }}</div>
          </div>
          <b class="sm-num" :class="entry.amount < 0 ? 'pv__out' : 'pv__in'">
            {{ entry.amount < 0 ? '−' : '+' }}{{ rupiah(Math.abs(entry.amount)) }}
          </b>
        </li>
      </ul>
    </div>

    <div class="ui pv__finance">
      <div class="pv__finance-head">
        <div class="ui-title">{{ mock.financeTitle }}</div>
        <div class="ui-label">{{ mock.recipients }} · {{ num(1284) }}</div>
      </div>
      <div class="pv__total sm-num">{{ rupiahShort(431_100_000) }}</div>
      <ul class="pv__statuses">
        <li v-for="(status, i) in mock.statuses" :key="status">
          <span class="ui-badge" :class="`ui-badge--${statusTones[i]}`">{{ status }}</span>
          <b class="sm-num">{{ num(statusCounts[i]) }}</b>
        </li>
      </ul>
      <ul class="pv__checks">
        <li><CircleCheck :size="15" class="pv__ok" /> {{ mock.checks[0] }}</li>
        <li><TriangleAlert :size="15" class="pv__warn" /> {{ mock.checks[1] }}</li>
      </ul>
      <span class="ui-btn pv__approve">{{ mock.approve }}</span>
    </div>
  </div>
</template>

<style scoped>
.pv {
  width: 100%;
  max-width: 940px;
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: 18px;
  align-items: start;
  font-variant-numeric: tabular-nums;
}
.pv__wallet,
.pv__finance {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: clamp(18px, 2.4vw, 26px);
  border-radius: var(--sm-r-card);
  background: var(--sm-surface);
  border: 1px solid var(--sm-border);
  box-shadow: var(--sm-shadow-product);
}
.pv__wallet-head {
  display: flex;
  align-items: center;
  gap: 10px;
}
.pv__icon {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 9px;
  background: var(--sm-primary-50);
  color: var(--sm-primary-ink);
}
.pv__balance {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 14px 16px;
  border-radius: 16px;
  color: #fff;
  background:
    radial-gradient(circle at 90% 0%, rgba(2, 200, 250, 0.35), transparent 55%),
    linear-gradient(135deg, var(--sm-deep), var(--sm-primary));
}
.pv__balance span {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.75);
}
.pv__balance b {
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.02em;
}
.pv__split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.pv__split div {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 12px;
  border-radius: 12px;
  background: var(--sm-surface-subtle);
}
.pv__split span {
  font-size: 11.5px;
  color: var(--sm-muted);
}
.pv__split b {
  font-size: 14px;
}
.pv__withdraw {
  align-self: stretch;
}
.pv__history-label {
  margin-top: 4px;
}
.pv__entries {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.pv__entries li {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
}
.pv__entry-text {
  font-size: 12.5px;
  font-weight: 600;
}
.pv__entries b {
  flex: none;
  font-size: 12.5px;
}
.pv__in {
  color: var(--sm-ok);
}
.pv__out {
  color: var(--sm-danger);
}
.pv__finance-head {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.pv__total {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.025em;
}
.pv__statuses {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}
.pv__statuses li {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 12px;
  border-radius: 12px;
  background: var(--sm-surface-subtle);
}
.pv__statuses b {
  font-size: 19px;
  font-weight: 650;
}
.pv__checks {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid var(--sm-border);
  font-size: 12.5px;
}
.pv__checks li {
  display: flex;
  align-items: center;
  gap: 8px;
}
.pv__ok {
  flex: none;
  color: var(--sm-ok);
}
.pv__warn {
  flex: none;
  color: var(--sm-warn);
}
.pv__approve {
  align-self: flex-end;
}
@media (max-width: 760px) {
  .pv {
    grid-template-columns: minmax(0, 1fr);
  }
}
@media (max-width: 420px) {
  .pv__statuses {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
