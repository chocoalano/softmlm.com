<script setup lang="ts">
/**
 * Interactive rule-builder preview for the marketing site. It runs on demo
 * data in the browser only: it is not connected to a compensation engine
 * and saves nothing; the caption under it says so.
 */
import { computed, ref } from 'vue'
import { CalendarCheck, Check, ChevronDown, CircleCheck, CircleX, Save } from 'lucide-vue-next'
import { useCopy } from '~/i18n'

const copy = useCopy('compensation')
const t = computed(() => copy.value.builder.preview)

const method = ref<'percentage' | 'fixed'>('percentage')
const rate = ref(15)
const fixedAmount = ref(150000)
const orders = [300000, 1500000, 5000000]
const order = ref(orders[1])
const saved = ref(false)

const MIN_AP = 500000
const AP_SHARE = 1

const rupiah = (value: number) => `Rp${Math.round(value).toLocaleString('id-ID')}`
/** Short chip label for a sample order: Rp300K / Rp1.5M, or Rp300rb / Rp1,5jt. */
const shortRupiah = (value: number) => {
  const units = copy.value.units
  const [amount, unit] =
    value >= 1_000_000 ? [value / 1_000_000, units.million] : [value / 1000, units.thousand]
  return `Rp${String(amount).replace('.', units.decimal)}${unit}`
}
const ap = computed(() => order.value * AP_SHARE)
const eligible = computed(() => ap.value >= MIN_AP)
const bonus = computed(() => {
  if (!eligible.value) return 0
  return method.value === 'percentage' ? (ap.value * rate.value) / 100 : fixedAmount.value
})

let savedTimer: ReturnType<typeof setTimeout> | undefined
function save() {
  saved.value = true
  clearTimeout(savedTimer)
  savedTimer = setTimeout(() => (saved.value = false), 2400)
}
</script>

<template>
  <div class="ui rb">
    <div class="rb__head">
      <div>
        <div class="ui-label">{{ t.kicker }}</div>
        <div class="rb__title">{{ t.name }}</div>
      </div>
      <span class="ui-badge ui-badge--warn">{{ t.status }}</span>
    </div>

    <div class="rb__fields">
      <div class="ui-field">
        <span class="ui-label">{{ t.base }}</span>
        <span class="ui-input">{{ t.baseValue }} <ChevronDown :size="14" /></span>
      </div>
      <div class="ui-field">
        <span id="rb-method" class="ui-label">{{ t.method }}</span>
        <div class="rb__seg" role="radiogroup" aria-labelledby="rb-method">
          <button
            type="button"
            role="radio"
            :aria-checked="method === 'percentage'"
            @click="method = 'percentage'"
          >
            {{ t.percentage }}
          </button>
          <button
            type="button"
            role="radio"
            :aria-checked="method === 'fixed'"
            @click="method = 'fixed'"
          >
            {{ t.fixed }}
          </button>
        </div>
      </div>

      <div class="ui-field rb__span">
        <label class="rb__range-label" for="rb-rate">
          <span class="ui-label">{{ method === 'percentage' ? t.rate : t.amount }}</span>
          <b class="sm-num">{{ method === 'percentage' ? `${rate}%` : rupiah(fixedAmount) }}</b>
        </label>
        <input
          v-if="method === 'percentage'"
          id="rb-rate"
          v-model.number="rate"
          class="rb__range"
          type="range"
          min="1"
          max="30"
          step="1"
          :style="{ '--fill': `${((rate - 1) / 29) * 100}%` }"
        />
        <input
          v-else
          id="rb-rate"
          v-model.number="fixedAmount"
          class="rb__range"
          type="range"
          min="25000"
          max="500000"
          step="25000"
          :style="{ '--fill': `${((fixedAmount - 25000) / 475000) * 100}%` }"
        />
      </div>

      <div class="ui-field">
        <span class="ui-label">{{ t.eligibility }}</span>
        <span class="ui-input">{{ t.eligibilityValue }} <ChevronDown :size="14" /></span>
      </div>
      <div class="ui-field">
        <span class="ui-label">{{ t.minimum }}</span>
        <span class="ui-input sm-num">{{ rupiah(MIN_AP) }}</span>
      </div>
      <div class="ui-field rb__span">
        <span class="ui-label">{{ t.effective }}</span>
        <span class="ui-input">{{ t.effectiveValue }} <CalendarCheck :size="14" /></span>
      </div>
    </div>

    <div class="rb__sim">
      <div class="rb__sim-head">
        <span id="rb-order" class="ui-title">{{ t.simulate }}</span>
        <div class="rb__seg rb__seg--sm" role="radiogroup" aria-labelledby="rb-order">
          <button
            v-for="value in orders"
            :key="value"
            type="button"
            role="radio"
            :aria-checked="order === value"
            @click="order = value"
          >
            {{ shortRupiah(value) }}
          </button>
        </div>
      </div>
      <dl class="rb__calc">
        <div>
          <dt>{{ t.orderTotal }}</dt>
          <dd class="sm-num">{{ rupiah(order) }}</dd>
        </div>
        <div>
          <dt>{{ t.pointValue }}</dt>
          <dd class="sm-num">{{ rupiah(ap) }}</dd>
        </div>
        <div>
          <dt>{{ t.qualifies }} (AP ≥ {{ rupiah(MIN_AP) }})</dt>
          <dd :class="eligible ? 'rb__yes' : 'rb__no'">
            <CircleCheck v-if="eligible" :size="15" /><CircleX v-else :size="15" />
            {{ eligible ? t.yes : t.belowMinimum }}
          </dd>
        </div>
      </dl>
      <div class="rb__result" aria-live="polite">
        <span>{{ t.result }}</span>
        <b class="sm-num">{{ rupiah(bonus) }}</b>
      </div>
    </div>

    <div class="rb__actions">
      <button type="button" class="ui-btn rb__save" @click="save">
        <Check v-if="saved" :size="14" /><Save v-else :size="14" />
        {{ saved ? t.previewOnly : t.save }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.rb {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 28px;
  border-radius: var(--sm-r-shell);
  background: var(--sm-surface);
  border: 1px solid var(--sm-border);
  box-shadow: var(--sm-shadow-product);
}
.rb__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--sm-border);
}
.rb__title {
  font-size: 20px;
  font-weight: 650;
  letter-spacing: -0.02em;
}
.rb__fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.rb__span {
  grid-column: 1 / -1;
}
.rb__seg {
  display: flex;
  padding: 3px;
  border-radius: 10px;
  background: var(--sm-surface-hover);
}
.rb__seg button {
  flex: 1;
  height: 30px;
  padding: 0 10px;
  border-radius: 8px;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--sm-muted);
  white-space: nowrap;
  transition:
    background 0.15s,
    color 0.15s;
}
.rb__seg button[aria-checked='true'] {
  background: var(--sm-surface);
  color: var(--sm-text);
  box-shadow: 0 1px 2px rgba(4, 24, 54, 0.12);
}
.rb__seg--sm button {
  height: 28px;
  padding: 0 10px;
}
.rb__range-label {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.rb__range-label b {
  font-size: 15px;
  color: var(--sm-primary-ink);
}
.rb__range {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 28px;
  background: transparent;
  cursor: pointer;
}
.rb__range::-webkit-slider-runnable-track {
  height: 6px;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    var(--sm-primary) var(--fill),
    var(--sm-primary-100) var(--fill)
  );
}
.rb__range::-moz-range-track {
  height: 6px;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    var(--sm-primary) var(--fill),
    var(--sm-primary-100) var(--fill)
  );
}
.rb__range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  margin-top: -7px;
  border-radius: 50%;
  background: var(--sm-surface);
  border: 2px solid var(--sm-primary);
  box-shadow: 0 2px 6px rgba(0, 93, 251, 0.35);
}
.rb__range::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--sm-surface);
  border: 2px solid var(--sm-primary);
}
.rb__sim {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 18px;
  border-radius: 16px;
  background: var(--sm-surface-subtle);
  border: 1px solid var(--sm-border);
}
.rb__sim-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}
.rb__calc {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.rb__calc > div {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 13px;
}
.rb__calc dt {
  color: var(--sm-muted);
}
.rb__calc dd {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-weight: 600;
}
.rb__yes {
  color: var(--sm-ok);
}
.rb__no {
  color: var(--sm-danger);
}
.rb__result {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid var(--sm-inverse-edge);
  background: var(--sm-deep);
  color: var(--sm-on-inverse);
}
.rb__result span {
  font-size: 13px;
  color: var(--sm-on-inverse-muted);
}
.rb__result b {
  font-size: 24px;
  font-weight: 650;
  letter-spacing: -0.02em;
  color: var(--sm-tech);
}
.rb__actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
}
.rb__save {
  height: 38px;
  padding: 0 16px;
  font-size: 13px;
}

@media (max-width: 520px) {
  .rb {
    padding: 18px;
    border-radius: var(--sm-r-card);
  }
  .rb__fields {
    grid-template-columns: minmax(0, 1fr);
  }
  .rb__actions {
    justify-content: stretch;
  }
  .rb__save {
    width: 100%;
  }
}
</style>
