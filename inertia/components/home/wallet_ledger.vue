<script setup lang="ts">
import { computed } from 'vue'
import {
  ArrowDownLeft,
  ArrowUpRight,
  FileText,
  Landmark,
  Receipt,
  ScrollText,
  ShieldCheck,
} from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import NetworkOrb from '~/components/site/network_orb.vue'
import VisualNote from '~/components/site/visual_note.vue'
import { useCopy } from '~/i18n'

const t = useCopy('homePlatform')

/** Sample ledger rows, newest first; descriptions come from the copy. */
const rows = [
  { date: '30 Sep 09:12', ref: 'LG-88213', amount: 187500, balance: 3420000 },
  { date: '29 Sep 23:00', ref: 'LG-88176', amount: 420000, balance: 3232500 },
  { date: '28 Sep 14:41', ref: 'LG-88102', amount: -2000000, balance: 2812500 },
  { date: '28 Sep 10:05', ref: 'LG-88087', amount: -21000, balance: 4812500 },
  { date: '27 Sep 18:22', ref: 'LG-88040', amount: -62500, balance: 4833500 },
]
const ledger = computed(() => rows.map((row, i) => ({ ...row, text: t.value.wallet.entries[i] })))

const rupiah = (value: number) =>
  `${value < 0 ? '−' : '+'}Rp${Math.abs(value).toLocaleString('id-ID')}`

const taxIcons = [Receipt, FileText, ScrollText, Landmark, ShieldCheck, FileText]
const tax = computed(() => t.value.wallet.tax.map((item, i) => ({ ...item, icon: taxIcons[i] })))
</script>

<template>
  <section id="wallet" class="sm-section sm-section--dark wl">
    <div class="wl__orb" aria-hidden="true"><NetworkOrb tone="dark" :nodes="90" /></div>

    <div class="sm-container">
      <div class="wl__grid">
        <div class="wl__copy">
          <span v-reveal class="sm-eyebrow">{{ t.wallet.eyebrow }}</span>
          <h2 v-reveal="60" class="sm-h2">{{ t.wallet.title }}</h2>
          <p v-reveal="120" class="sm-lead">{{ t.wallet.lead }}</p>
          <p v-reveal="150" class="wl__label">{{ t.wallet.pointsLabel }}</p>
          <ul v-reveal="180" class="wl__points">
            <li v-for="point in t.wallet.points" :key="point" class="sm-check">
              <ShieldCheck :size="18" /> {{ point }}
            </li>
          </ul>
        </div>

        <div v-reveal="120" class="wl__visual">
          <div class="ui wl__wallet">
            <div class="wl__balances">
              <div class="wl__balance wl__balance--main">
                <span>{{ t.wallet.available }}</span>
                <b class="sm-num">Rp3.420.000</b>
              </div>
              <div class="wl__balance">
                <span>{{ t.wallet.pending }}</span>
                <b class="sm-num">Rp1.180.000</b>
              </div>
              <div class="wl__balance">
                <span>{{ t.wallet.onHold }}</span>
                <b class="sm-num">Rp250.000</b>
              </div>
            </div>

            <div class="wl__ledger">
              <div class="wl__ledger-head">
                <span class="ui-title">{{ t.wallet.ledgerTitle }}</span>
              </div>
              <table class="ui-table">
                <thead>
                  <tr>
                    <th>{{ t.wallet.columns.entry }}</th>
                    <th>{{ t.wallet.columns.description }}</th>
                    <th class="r">{{ t.wallet.columns.amount }}</th>
                    <th class="r">{{ t.wallet.columns.balance }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in ledger" :key="row.ref">
                    <td>
                      <span class="wl__ref">
                        <span class="wl__io" :class="row.amount > 0 ? 'wl__io--in' : ''">
                          <ArrowDownLeft v-if="row.amount > 0" :size="12" /><ArrowUpRight
                            v-else
                            :size="12"
                          />
                        </span>
                        <span
                          >{{ row.ref }}<small>{{ row.date }}</small></span
                        >
                      </span>
                    </td>
                    <td class="wl__desc">{{ row.text }}</td>
                    <td class="r" :class="row.amount > 0 ? 'wl__in' : 'wl__out'">
                      {{ rupiah(row.amount) }}
                    </td>
                    <td class="r">Rp{{ row.balance.toLocaleString('id-ID') }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <VisualNote tone="dark" />
        </div>
      </div>

      <div class="wl__tax">
        <div class="wl__tax-head">
          <h3 v-reveal class="sm-h3">{{ t.wallet.taxTitle }}</h3>
          <p v-reveal="60" class="sm-body">{{ t.wallet.taxText }}</p>
        </div>
        <ul class="wl__tax-grid">
          <li v-for="(item, i) in tax" :key="item.title" v-reveal="(i % 3) * 70">
            <span class="sm-icon-tile sm-icon-tile--sm"
              ><component :is="item.icon" :size="18"
            /></span>
            <b>{{ item.title }}</b>
            <span>{{ item.text }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.wl {
  overflow: hidden;
  isolation: isolate;
  background:
    radial-gradient(50% 60% at 100% 0%, rgba(0, 93, 251, 0.28), transparent 70%),
    radial-gradient(40% 40% at 0% 100%, rgba(2, 200, 250, 0.1), transparent 70%),
    var(--sm-surface-inverse);
  border-block: 1px solid var(--sm-inverse-edge);
}
.wl__orb {
  position: absolute;
  z-index: -1;
  width: 720px;
  top: -200px;
  right: -220px;
  opacity: 0.55;
}
.wl__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
  gap: clamp(40px, 6vw, 88px);
  align-items: center;
}
.wl__copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}
.wl__points {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 6px;
}
.wl__visual {
  min-width: 0;
}
.wl__wallet {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 14px;
  border-radius: var(--sm-r-shell);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 60px 120px -40px rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
.wl__balances {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: 10px;
}
.wl__balance {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 18px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.06);
  color: var(--sm-on-inverse);
}
.wl__balance span {
  font-size: 12px;
  color: var(--sm-on-inverse-muted);
}
.wl__balance b {
  font-size: 18px;
  font-weight: 650;
  letter-spacing: -0.02em;
}
.wl__balance--main {
  background: linear-gradient(135deg, var(--sm-primary), #1f86ff);
}
.wl__balance--main span {
  color: rgba(255, 255, 255, 0.8);
}
.wl__balance--main b {
  font-size: 24px;
}
.wl__ledger {
  padding: 18px;
  border-radius: 20px;
  background: var(--sm-surface);
}
.wl__ledger-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 12px;
}
.wl__label {
  margin-top: 4px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--sm-on-inverse-muted);
}
.wl__ref {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}
.wl__ref small {
  display: block;
  font-size: 10.5px;
  font-weight: 400;
  color: var(--sm-muted);
}
.wl__io {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 7px;
  background: var(--sm-surface-hover);
  color: var(--sm-muted);
}
.wl__io--in {
  background: var(--sm-ok-bg);
  color: var(--sm-ok);
}
.wl__desc {
  color: var(--sm-text-2);
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.wl__in {
  color: var(--sm-ok);
  font-weight: 600;
}
.wl__out {
  font-weight: 600;
}
.wl__tax {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
  gap: 32px 64px;
  margin-top: clamp(64px, 8vw, 112px);
  padding-top: clamp(48px, 6vw, 72px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
.wl__tax-head {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.wl__tax-grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.wl__tax-grid li {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 20px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
.wl__tax-grid .sm-icon-tile {
  margin-bottom: 8px;
}
.wl__tax-grid b {
  font-size: 15.5px;
  font-weight: 650;
}
.wl__tax-grid span:last-child {
  font-size: 14px;
  line-height: 1.5;
  color: var(--sm-on-inverse-muted);
}

@media (max-width: 1080px) {
  .wl__grid,
  .wl__tax {
    grid-template-columns: minmax(0, 1fr);
  }
}
@media (max-width: 720px) {
  .wl__balances {
    grid-template-columns: 1fr 1fr;
  }
  .wl__balance--main {
    grid-column: 1 / -1;
  }
  .wl__tax-grid {
    grid-template-columns: 1fr 1fr;
  }
  .wl__ledger {
    overflow-x: auto;
  }
}
@media (max-width: 460px) {
  .wl__tax-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
