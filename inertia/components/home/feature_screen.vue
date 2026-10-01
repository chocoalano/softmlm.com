<script setup lang="ts">
/**
 * One product mock per platform module, shown by the feature explorer.
 * Words come from the homePlatform copy; the sample figures below are the
 * same in every language.
 */
import { computed } from 'vue'
import {
  ArrowDownLeft,
  ArrowUpRight,
  Check,
  Clock,
  CreditCard,
  FileCheck,
  IdCard,
  Landmark,
  Play,
  RefreshCw,
  Ticket,
  Trophy,
} from 'lucide-vue-next'
import type { ModuleKey } from '~/content/modules'
import { useCopy } from '~/i18n'
import { useFormat } from '~/composables/format'

defineProps<{ name: ModuleKey }>()

const t = useCopy('homePlatform')
const s = computed(() => t.value.screens)
/** Sample figures in the page language: Rp1.25M / Rp1,25 jt, 8,420 / 8.420. */
const { num, percent, change, rupiahShort } = useFormat()

const timelineTones = ['fs__dot--info', 'fs__dot--ok', '']
const kycIcons = [IdCard, FileCheck, Landmark]
const rulesOn = [true, true, true, false]

type OrderStatus = 'paid' | 'shipped' | 'awaiting' | 'refunded'
const statusTone: Record<OrderStatus, string> = {
  paid: 'ok',
  shipped: 'info',
  awaiting: 'warn',
  refunded: 'danger',
}
/** A row without a buyer is a retail customer. */
const orderData: { id: string; buyer?: string; total: string; ap: number; status: OrderStatus }[] =
  [
    { id: 'INV-20931', buyer: 'Sarah W.', total: 'Rp1.250.000', ap: 1.25e6, status: 'paid' },
    { id: 'INV-20930', total: 'Rp349.000', ap: 280e3, status: 'shipped' },
    { id: 'INV-20929', buyer: 'Maya L.', total: 'Rp2.100.000', ap: 2.1e6, status: 'paid' },
    { id: 'INV-20928', buyer: 'Rizky A.', total: 'Rp780.000', ap: 780e3, status: 'awaiting' },
    { id: 'INV-20927', total: 'Rp199.000', ap: 160e3, status: 'refunded' },
  ]
const orders = computed(() => orderData.map((order) => ({ ...order, ap: rupiahShort(order.ap) })))

const walletAmounts = [
  { amount: '+Rp187.500', incoming: true },
  { amount: '+Rp420.000', incoming: true },
  { amount: '−Rp2.000.000', incoming: false },
]

const rewardIcons = [Ticket, CreditCard, Trophy]
const leaderboard = computed(() => [
  ['Maya L.', num(8420)],
  ['Rizky A.', num(7960)],
  ['Putri S.', num(7310)],
])

const monthlySales = [7.9, 8.4, 8.1, 9.0, 9.5, 9.2, 10.1, 10.6, 10.9, 11.4, 11.1, 12.48]
const salesMax = 14

const queueTones = ['warn', 'warn', 'info', 'info', 'ok']
</script>

<template>
  <div class="ui fs">
    <!-- Member management -->
    <template v-if="name === 'members'">
      <div class="ui-panel fs__main">
        <div class="fs__profile">
          <span class="ui-avatar fs__avatar">SW</span>
          <div class="fs__grow">
            <div class="fs__name">Sarah Wijaya</div>
            <div class="ui-label">{{ s.members.meta }}</div>
          </div>
          <span class="ui-badge ui-badge--info ui-badge--plain">Platinum</span>
        </div>
        <div class="fs__stats">
          <div>
            <div class="ui-label">{{ s.members.personalAp }}</div>
            <b>{{ rupiahShort(4.2e6) }}</b>
          </div>
          <div>
            <div class="ui-label">{{ s.members.groupSales }}</div>
            <b>{{ rupiahShort(186.4e6) }}</b>
          </div>
          <div>
            <div class="ui-label">{{ s.members.directMembers }}</div>
            <b>43</b>
          </div>
        </div>
        <div class="fs__tabs">
          <span v-for="(tab, i) in s.members.tabs" :key="tab" :class="{ 'is-on': i === 0 }">{{
            tab
          }}</span>
        </div>
        <ul class="fs__timeline">
          <li v-for="(item, i) in s.members.timeline" :key="item.title">
            <span class="fs__dot" :class="timelineTones[i]" />
            <div>
              <b>{{ item.title }}</b>
              <div class="ui-label">{{ item.meta }}</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="ui-panel fs__float fs__float--br">
        <div class="ui-title">{{ s.members.kycTitle }}</div>
        <ul class="fs__checks">
          <li v-for="(item, i) in s.members.kyc" :key="item">
            <component :is="kycIcons[i]" :size="14" /> {{ item }}
            <span class="ui-badge ui-badge--ok">{{ s.members.verified }}</span>
          </li>
        </ul>
      </div>
    </template>

    <!-- Compensation plan -->
    <template v-else-if="name === 'compensation'">
      <div class="ui-panel fs__main">
        <div class="fs__row">
          <div>
            <div class="ui-title">{{ s.compensation.title }}</div>
            <div class="ui-label">{{ s.compensation.meta }}</div>
          </div>
          <span class="ui-btn"><Play :size="12" /> {{ s.compensation.simulate }}</span>
        </div>
        <ul class="fs__rules">
          <li v-for="(rule, i) in s.compensation.rules" :key="rule.name">
            <span class="fs__toggle" :class="{ 'is-on': rulesOn[i] }" />
            <div class="fs__grow">
              <b>{{ rule.name }}</b>
              <div class="ui-label">{{ rule.detail }}</div>
            </div>
            <span v-if="rulesOn[i]" class="ui-badge ui-badge--ok">{{ s.compensation.on }}</span>
            <span v-else class="ui-badge ui-badge--warn">{{ s.compensation.draft }}</span>
          </li>
        </ul>
      </div>
      <div class="ui-panel fs__float fs__float--br">
        <div class="ui-label">{{ s.compensation.simulation }}</div>
        <div class="fs__big">{{ change(3.2) }}</div>
        <div class="ui-label">{{ s.compensation.simulationNote }}</div>
      </div>
    </template>

    <!-- Ecommerce -->
    <template v-else-if="name === 'ecommerce'">
      <div class="ui-panel fs__main">
        <div class="fs__row">
          <div class="ui-title">{{ s.ecommerce.title }}</div>
          <span class="ui-label">{{ s.ecommerce.today }}</span>
        </div>
        <table class="ui-table">
          <thead>
            <tr>
              <th>{{ s.ecommerce.columns.order }}</th>
              <th>{{ s.ecommerce.columns.buyer }}</th>
              <th class="r">{{ s.ecommerce.columns.total }}</th>
              <th class="r">{{ s.ecommerce.columns.ap }}</th>
              <th>{{ s.ecommerce.columns.status }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id">
              <td>{{ order.id }}</td>
              <td>{{ order.buyer ?? s.ecommerce.customer }}</td>
              <td class="r">{{ order.total }}</td>
              <td class="r">{{ order.ap }}</td>
              <td>
                <span class="ui-badge" :class="`ui-badge--${statusTone[order.status]}`">{{
                  s.ecommerce.status[order.status]
                }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="ui-panel fs__float fs__float--tr fs__product">
        <div class="fs__product-img" />
        <div class="ui-title">Vita Glow Serum 30ml</div>
        <div class="fs__row">
          <b>Rp350.000</b
          ><span class="ui-badge ui-badge--info ui-badge--plain">AP {{ rupiahShort(350e3) }}</span>
        </div>
        <div class="ui-label">{{ s.ecommerce.productPrice }}</div>
      </div>
    </template>

    <!-- Network -->
    <template v-else-if="name === 'network'">
      <div class="ui-panel fs__main">
        <div class="fs__row">
          <div>
            <div class="ui-title">{{ s.network.title }}</div>
            <div class="ui-label">{{ s.network.meta }}</div>
          </div>
          <span class="ui-badge ui-badge--plain">{{ s.network.total }}</span>
        </div>
        <div class="fs__legs">
          <div class="fs__leg">
            <div class="ui-label">{{ s.network.left }}</div>
            <b class="fs__big">{{ rupiahShort(842e6) }}</b>
            <div class="ui-label">{{ s.network.leftMeta }}</div>
            <div class="ui-progress"><span style="width: 100%" /></div>
          </div>
          <div class="fs__leg">
            <div class="ui-label">{{ s.network.right }}</div>
            <b class="fs__big">{{ rupiahShort(791e6) }}</b>
            <div class="ui-label">{{ s.network.rightMeta }}</div>
            <div class="ui-progress"><span style="width: 94%" /></div>
          </div>
        </div>
        <div class="fs__note"><RefreshCw :size="13" /> {{ s.network.note }}</div>
      </div>
      <div class="ui-panel fs__float fs__float--br fs__mini-tree" aria-hidden="true">
        <span class="fs__node fs__node--root">BS</span>
        <div class="fs__branches">
          <span class="fs__node">SW</span><span class="fs__node">DP</span>
        </div>
        <div class="fs__branches fs__branches--4">
          <span class="fs__node" /><span class="fs__node" /><span class="fs__node" /><span
            class="fs__node"
          />
        </div>
      </div>
    </template>

    <!-- Wallet & payout -->
    <template v-else-if="name === 'wallet'">
      <div class="ui-panel fs__main">
        <div class="ui-label">{{ s.wallet.available }}</div>
        <div class="fs__big fs__big--lg">Rp3.420.000</div>
        <div class="fs__row fs__balances">
          <span
            ><span class="ui-label">{{ s.wallet.pending }}</span> <b>Rp1.180.000</b></span
          >
          <span
            ><span class="ui-label">{{ s.wallet.onHold }}</span> <b>Rp250.000</b></span
          >
          <span class="ui-btn">{{ s.wallet.withdraw }}</span>
        </div>
        <ul class="fs__ledger">
          <li v-for="(entry, i) in s.wallet.entries" :key="entry.meta">
            <span class="fs__io" :class="{ 'fs__io--in': walletAmounts[i].incoming }">
              <ArrowDownLeft v-if="walletAmounts[i].incoming" :size="14" />
              <ArrowUpRight v-else :size="14" />
            </span>
            <div class="fs__grow">
              <b>{{ entry.title }}</b>
              <div class="ui-label">{{ entry.meta }}</div>
            </div>
            <b :class="{ fs__in: walletAmounts[i].incoming }">{{ walletAmounts[i].amount }}</b>
          </li>
        </ul>
      </div>
    </template>

    <!-- Rewards -->
    <template v-else-if="name === 'rewards'">
      <div class="ui-panel fs__main">
        <div class="fs__row">
          <div>
            <div class="ui-label">{{ s.rewards.points }}</div>
            <div class="fs__big">{{ s.rewards.total }}</div>
          </div>
          <span class="ui-badge ui-badge--warn ui-badge--plain"
            ><Clock :size="12" /> {{ s.rewards.sprint }}</span
          >
        </div>
        <div class="fs__catalog">
          <div v-for="(item, i) in s.rewards.items" :key="item.name" class="fs__reward">
            <component :is="rewardIcons[i]" :size="18" /><b>{{ item.name }}</b
            ><span class="ui-label">{{ item.meta }}</span
            ><span class="ui-btn" :class="{ 'ui-btn--light': i > 0 }">{{ item.action }}</span>
          </div>
        </div>
      </div>
      <div class="ui-panel fs__float fs__float--tr">
        <div class="ui-title">{{ s.rewards.leaderboard }}</div>
        <ol class="fs__board">
          <li v-for="([person, points], i) in leaderboard" :key="person">
            <span>{{ i + 1 }}</span> {{ person }} <b>{{ points }}</b>
          </li>
        </ol>
      </div>
    </template>

    <!-- Analytics -->
    <template v-else-if="name === 'analytics'">
      <div class="ui-panel fs__main">
        <div class="fs__row">
          <div>
            <div class="ui-title">{{ s.analytics.title }}</div>
            <div class="ui-label">{{ s.analytics.unit }}</div>
          </div>
          <span class="ui-badge ui-badge--ok ui-badge--plain">{{ s.analytics.growth }}</span>
        </div>
        <div class="fs__bars" role="img" :aria-label="s.analytics.chartLabel">
          <div v-for="(value, i) in monthlySales" :key="i" class="fs__bar-col">
            <span
              class="fs__bar"
              :class="{ 'is-current': i === monthlySales.length - 1 }"
              :style="{ height: `${(value / salesMax) * 100}%` }"
            />
            <span class="fs__bar-label">{{ s.analytics.months[i] }}</span>
          </div>
        </div>
        <div class="fs__stats">
          <div>
            <div class="ui-label">{{ s.analytics.averageOrder }}</div>
            <b>{{ rupiahShort(682e3) }}</b>
          </div>
          <div>
            <div class="ui-label">{{ s.analytics.retention }}</div>
            <b>{{ percent(71.4) }}</b>
          </div>
          <div>
            <div class="ui-label">{{ s.analytics.apPerMember }}</div>
            <b>{{ rupiahShort(678e3) }}</b>
          </div>
        </div>
      </div>
    </template>

    <!-- Operations -->
    <template v-else>
      <div class="ui-panel fs__main">
        <div class="fs__row">
          <div class="ui-title">{{ s.operations.title }}</div>
          <span class="ui-label">{{ s.operations.team }}</span>
        </div>
        <ul class="fs__queue">
          <li v-for="(item, i) in s.operations.queue" :key="item.name">
            <b>{{ item.name }}</b
            ><span class="ui-badge" :class="`ui-badge--${queueTones[i]}`">{{ item.count }}</span
            ><span class="ui-label">{{ item.due }}</span>
          </li>
        </ul>
      </div>
      <div class="ui-panel fs__float fs__float--br">
        <div class="fs__row">
          <span class="ui-avatar">RA</span>
          <div class="fs__grow">
            <b>Rizky Ananda</b>
            <div class="ui-label">{{ s.operations.applicant }}</div>
          </div>
        </div>
        <div class="fs__row fs__actions">
          <span class="ui-btn ui-btn--light">{{ s.operations.reject }}</span>
          <span class="ui-btn"><Check :size="13" /> {{ s.operations.approve }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.fs {
  position: relative;
  width: 100%;
  max-width: 540px;
  margin: 0 auto;
  padding: 8px 0 56px;
}
.fs__main {
  position: relative;
  padding: 22px;
  border-radius: 18px;
  box-shadow: var(--sm-shadow-float);
}
.fs__float {
  position: absolute;
  z-index: 1;
  width: 250px;
  padding: 14px 16px;
  border-radius: 16px;
  box-shadow: var(--sm-shadow-float);
}
.fs__float--br {
  right: -40px;
  bottom: 0;
}
.fs__float--tr {
  right: -56px;
  top: -28px;
}
.fs__grow {
  flex: 1;
  min-width: 0;
}
.fs__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
.fs__main > .fs__row:first-child {
  margin-bottom: 16px;
}
.fs__big {
  display: block;
  font-size: 22px;
  font-weight: 650;
  letter-spacing: -0.025em;
  font-variant-numeric: tabular-nums;
}
.fs__big--lg {
  font-size: 30px;
}
.fs__profile {
  display: flex;
  align-items: center;
  gap: 12px;
}
.fs__avatar {
  width: 48px;
  height: 48px;
  font-size: 15px;
}
.fs__name {
  font-size: 17px;
  font-weight: 650;
  letter-spacing: -0.02em;
}
.fs__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 18px;
}
.fs__stats > div {
  padding: 12px;
  border-radius: 12px;
  background: var(--sm-surface-subtle);
}
.fs__stats b {
  font-size: 15px;
  font-variant-numeric: tabular-nums;
}
.fs__tabs {
  display: flex;
  gap: 16px;
  margin-top: 18px;
  border-bottom: 1px solid var(--sm-border);
  font-size: 12.5px;
  font-weight: 600;
  color: var(--sm-muted);
}
.fs__tabs span {
  padding-bottom: 8px;
}
.fs__tabs .is-on {
  color: var(--sm-text);
  box-shadow: inset 0 -2px 0 var(--sm-primary);
}
.fs__timeline {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 16px;
}
.fs__timeline li {
  display: flex;
  gap: 12px;
}
.fs__dot {
  width: 10px;
  height: 10px;
  flex: none;
  margin-top: 4px;
  border-radius: 50%;
  background: var(--sm-border-2);
}
.fs__dot--ok {
  background: var(--sm-ok);
}
.fs__dot--info {
  background: var(--sm-primary);
}
.fs__checks {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
}
.fs__checks li {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
}
.fs__checks .ui-badge {
  margin-left: auto;
}
.fs__checks svg {
  color: var(--sm-muted);
}
.fs__rules {
  list-style: none;
  display: flex;
  flex-direction: column;
}
.fs__rules li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-top: 1px solid var(--sm-border);
}
.fs__toggle {
  position: relative;
  width: 30px;
  height: 18px;
  flex: none;
  border-radius: 999px;
  background: var(--sm-border-2);
}
.fs__toggle::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}
.fs__toggle.is-on {
  background: var(--sm-primary);
}
.fs__toggle.is-on::after {
  left: 14px;
}
.fs__product {
  width: 210px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.fs__product-img {
  height: 92px;
  border-radius: 10px;
  margin-bottom: 4px;
  background:
    radial-gradient(circle at 50% 60%, rgba(255, 255, 255, 0.92) 0 18%, transparent 19%),
    radial-gradient(circle at 50% 40%, rgba(255, 255, 255, 0.7) 0 10%, transparent 11%),
    linear-gradient(135deg, rgba(1, 180, 245, 0.2), var(--sm-primary-100));
}
.fs__legs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.fs__leg {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px;
  border-radius: 12px;
  background: var(--sm-surface-subtle);
}
.fs__leg .ui-progress {
  margin-top: 6px;
}
.fs__note {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  padding: 10px 12px;
  border-radius: 10px;
  background: var(--sm-primary-50);
  color: var(--sm-primary-ink);
  font-size: 12.5px;
  font-weight: 500;
}
.fs__mini-tree {
  width: 190px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.fs__branches {
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.fs__node {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--sm-primary-100);
  color: var(--sm-primary-ink);
  font-size: 10px;
  font-weight: 700;
}
.fs__branches--4 .fs__node {
  width: 18px;
  height: 18px;
  background: var(--sm-primary-50);
}
.fs__node--root {
  background: var(--sm-primary);
  color: #fff;
}
.fs__balances {
  margin: 12px 0 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--sm-border);
  font-size: 13px;
}
.fs__ledger {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-variant-numeric: tabular-nums;
}
.fs__ledger li {
  display: flex;
  align-items: center;
  gap: 12px;
}
.fs__io {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  flex: none;
  border-radius: 9px;
  background: var(--sm-surface-hover);
  color: var(--sm-muted);
}
.fs__io--in {
  background: var(--sm-ok-bg);
  color: var(--sm-ok);
}
.fs__in {
  color: var(--sm-ok);
}
.fs__catalog {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 4px;
}
.fs__reward {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px 12px;
  border-radius: 12px;
  background: var(--sm-surface-subtle);
  font-size: 12.5px;
}
.fs__reward > svg {
  color: var(--sm-primary-ink);
}
.fs__reward .ui-btn {
  margin-top: 6px;
  height: 30px;
  padding: 0 8px;
  font-size: 11.5px;
}
.fs__board {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
  font-size: 12.5px;
  font-variant-numeric: tabular-nums;
}
.fs__board li {
  display: flex;
  align-items: center;
  gap: 8px;
}
.fs__board li span {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  border-radius: 6px;
  background: var(--sm-primary-50);
  color: var(--sm-primary-ink);
  font-size: 11px;
  font-weight: 700;
}
.fs__board b {
  margin-left: auto;
}
.fs__bars {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  height: 170px;
  padding-bottom: 20px;
  margin: 6px 0 4px;
  border-bottom: 1px solid var(--sm-border);
}
.fs__bar-col {
  position: relative;
  flex: 1;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.fs__bar {
  width: 100%;
  max-width: 22px;
  border-radius: 4px 4px 0 0;
  background: var(--sm-primary-200);
}
.fs__bar.is-current {
  background: var(--sm-primary);
}
.fs__bar-label {
  position: absolute;
  bottom: -20px;
  font-size: 10.5px;
  color: var(--sm-subtle);
}
.fs__queue {
  list-style: none;
  display: flex;
  flex-direction: column;
}
.fs__queue li {
  display: grid;
  grid-template-columns: 1fr auto 96px;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-top: 1px solid var(--sm-border);
}
.fs__queue .ui-label {
  text-align: right;
}
.fs__actions {
  justify-content: flex-end;
  margin-top: 12px;
}

@media (max-width: 1180px) {
  .fs__float--br,
  .fs__float--tr {
    right: -12px;
  }
}
@media (max-width: 620px) {
  .fs {
    padding-bottom: 0;
  }
  .fs__float {
    position: relative;
    inset: auto;
    width: auto;
    margin: -12px 16px 0;
  }
  .fs__float--tr {
    display: none;
  }
  .fs__main {
    padding: 16px;
  }
  .fs__catalog {
    grid-template-columns: 1fr 1fr;
  }
  .fs__stats {
    gap: 6px;
  }
  .fs__stats > div {
    padding: 10px 8px;
  }
  .fs__stats .ui-label {
    font-size: 10.5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .fs__stats b {
    font-size: 13.5px;
  }
  .fs__catalog .fs__reward:last-child {
    display: none;
  }
  .ui-table th:nth-child(2),
  .ui-table td:nth-child(2) {
    display: none;
  }
}
</style>
