<script setup lang="ts">
/**
 * Member app concept: rank progress, key numbers and a referral link.
 * Used on the homepage "Who it's for" section and on
 * /who-we-serve/distributors. Sample member and numbers only.
 *
 * The phone frame is dark by design in both themes; the screen and its
 * cards follow the theme tokens.
 */
import { computed } from 'vue'
import { Bell, CircleCheck, Copy, Gift, House, Package, UsersRound, Wallet } from 'lucide-vue-next'
import { useCopy } from '~/i18n'
import { useFormat } from '~/composables/format'

const t = useCopy('personas')
/** Sample figures in the page language: Rp1.26M / Rp1,26 jt, 4,820 / 4.820. */
const { num, rupiahShort } = useFormat()
const copy = computed(() => t.value.concepts.distributor)
</script>

<template>
  <div class="da" role="img" :aria-label="copy.label">
    <div class="ui da__phone">
      <div class="da__notch" />
      <div class="da__screen">
        <div class="da__greet">
          <div>
            <div class="ui-label">{{ copy.greeting }}</div>
            <div class="da__hello">Ayu Pratiwi</div>
          </div>
          <span class="da__bell"><Bell :size="16" /></span>
        </div>

        <div class="da__rank">
          <div class="da__rank-top">
            <span class="da__rank-label"
              >{{ copy.nextRank }} <span class="da__rank-name">GOLD</span></span
            >
            <span class="da__rank-left">{{ copy.daysLeft }}</span>
          </div>
          <div class="da__rank-value">
            85% <span>{{ copy.progress }}</span>
          </div>
          <div class="da__rank-bar"><span style="width: 85%" /></div>
          <div class="da__rank-row">
            <span>{{ copy.salesTarget }}</span
            ><b>{{ rupiahShort(42.5e6) }} / {{ rupiahShort(50e6) }}</b>
          </div>
          <div class="da__rank-row">
            <span>{{ copy.directRequirement }}</span
            ><b>43 / 50</b>
          </div>
          <span class="da__rank-btn">{{ copy.viewRequirements }}</span>
        </div>

        <div class="da__tiles">
          <div>
            <Wallet :size="15" /><span>{{ copy.tiles.wallet }}</span
            ><b>{{ rupiahShort(1.26e6) }}</b>
          </div>
          <div>
            <Gift :size="15" /><span>{{ copy.tiles.points }}</span
            ><b>{{ num(4820) }}</b>
          </div>
          <div>
            <UsersRound :size="15" /><span>{{ copy.tiles.team }}</span
            ><b>186</b>
          </div>
          <div>
            <Package :size="15" /><span>{{ copy.tiles.orders }}</span
            ><b>12</b>
          </div>
        </div>

        <div class="da__ref">
          <div>
            <div class="ui-label">{{ copy.referralLabel }}</div>
            <b>{{ copy.referralLink }}</b>
          </div>
          <span class="da__copy-btn"><Copy :size="14" /></span>
        </div>
      </div>
      <div class="da__tabbar">
        <span class="is-on"><House :size="17" />{{ copy.tabs.home }}</span>
        <span><UsersRound :size="17" />{{ copy.tabs.team }}</span>
        <span><Wallet :size="17" />{{ copy.tabs.wallet }}</span>
        <span><Gift :size="17" />{{ copy.tabs.rewards }}</span>
      </div>
    </div>
    <div class="ui da__toast">
      <span class="da__toast-icon"><CircleCheck :size="16" /></span>
      <div>
        <div class="ui-title">{{ copy.toastTitle }}</div>
        <div class="ui-label">{{ copy.toastMeta }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.da {
  position: relative;
  padding: 0 40px;
}
.da__phone {
  position: relative;
  width: 290px;
  height: 624px;
  padding: 12px;
  border-radius: 46px;
  background: #050d1c;
  box-shadow:
    0 0 0 2px #12306a,
    var(--sm-shadow-product);
  display: flex;
  flex-direction: column;
}
.da__notch {
  position: absolute;
  top: 20px;
  left: 50%;
  width: 84px;
  height: 22px;
  margin-left: -42px;
  border-radius: 999px;
  background: #050d1c;
  z-index: 2;
}
.da__screen {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 48px 14px 12px;
  border-radius: 36px 36px 0 0;
  background: var(--sm-surface-subtle);
  overflow: hidden;
}
.da__greet {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.da__hello {
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.02em;
}
.da__bell {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--sm-surface);
  border: 1px solid var(--sm-border);
}
.da__rank {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px;
  border-radius: 18px;
  color: var(--sm-on-inverse);
  background:
    radial-gradient(circle at 90% 0%, rgba(2, 200, 250, 0.4), transparent 50%),
    linear-gradient(135deg, var(--sm-deep), var(--sm-primary));
}
.da__rank-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}
.da__rank-name {
  color: #fff;
  padding: 2px 10px;
  border-radius: 999px;
  background: linear-gradient(135deg, #e9b949, #c98a14);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.12em;
}
.da__rank-left {
  font-size: 11px;
  color: var(--sm-on-inverse-muted);
}
.da__rank-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--sm-on-inverse-muted);
}
.da__rank-value {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.02em;
}
.da__rank-value span {
  font-size: 13px;
  font-weight: 500;
  color: var(--sm-on-inverse-muted);
}
.da__rank-bar {
  height: 8px;
  margin: 4px 0 6px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
}
.da__rank-bar span {
  display: block;
  height: 100%;
  border-radius: 999px;
  background: var(--sm-tech);
}
.da__rank-row {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--sm-on-inverse-muted);
}
.da__rank-btn {
  margin-top: 8px;
  padding: 7px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.14);
  font-size: 12px;
  font-weight: 600;
  text-align: center;
}
.da__tiles {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.da__tiles > div {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 12px;
  border-radius: 14px;
  background: var(--sm-surface);
  border: 1px solid var(--sm-border);
  font-size: 11px;
  color: var(--sm-muted);
}
.da__tiles svg {
  color: var(--sm-primary-ink);
  margin-bottom: 4px;
}
.da__tiles b {
  font-size: 15px;
  color: var(--sm-text);
}
.da__ref {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border-radius: 14px;
  background: var(--sm-surface);
  border: 1px dashed var(--sm-primary-200);
  font-size: 12.5px;
}
.da__copy-btn {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 9px;
  background: var(--sm-primary);
  color: #fff;
}
.da__tabbar {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 10px 6px 14px;
  border-radius: 0 0 36px 36px;
  background: var(--sm-surface);
  font-size: 10px;
  font-weight: 600;
  color: var(--sm-subtle);
}
.da__tabbar span {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
}
.da__tabbar .is-on {
  color: var(--sm-primary-ink);
}
.da__toast {
  position: absolute;
  right: -44px;
  top: 392px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 16px;
  background: var(--sm-surface);
  border: 1px solid var(--sm-border);
  box-shadow: var(--sm-shadow-float);
}
.da__toast-icon {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: var(--sm-ok-bg);
  color: var(--sm-ok);
}
@media (prefers-reduced-motion: no-preference) {
  .da__toast {
    animation: sm-float 7s ease-in-out infinite;
  }
}
@media (max-width: 620px) {
  .da {
    padding: 0;
  }
  .da__toast {
    right: -8px;
    top: auto;
    bottom: 90px;
  }
}
</style>
