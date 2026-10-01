<script setup lang="ts">
/**
 * Ecommerce concept for /features/ecommerce: one order with the business
 * context a network business needs. Sample data only.
 */
import { computed } from 'vue'
import { ArrowRight, Check } from 'lucide-vue-next'
import { useCopy } from '~/i18n'
import { useFormat } from '~/composables/format'

const t = useCopy('features')
const mock = computed(() => t.value.pages.ecommerce.concept.mock)
const { rupiah } = useFormat()

const prices = [1_000_000, 500_000]
const products = computed(() =>
  mock.value.products.map((label, i) => ({ label, price: rupiah(prices[i]) }))
)
const context = computed(() => [
  { label: mock.value.member, value: 'Ayu Pratiwi · SM-210304' },
  { label: mock.value.sponsor, value: 'Budi Santoso' },
  { label: mock.value.priceLevel, value: mock.value.priceLevelValue },
  { label: mock.value.stockPoint, value: 'Surabaya' },
  { label: mock.value.period, value: mock.value.periodValue },
  { label: mock.value.volume, value: rupiah(1_500_000) },
])
const currentStep = 1
</script>

<template>
  <div class="ui oc" role="img" :aria-label="mock.ariaLabel">
    <div class="oc__head">
      <div>
        <div class="ui-label">{{ mock.order }}</div>
        <div class="oc__title">INV-20931</div>
      </div>
      <span class="ui-badge ui-badge--ok">{{ mock.paid }}</span>
    </div>

    <ol class="oc__timeline">
      <li
        v-for="(step, i) in mock.timeline"
        :key="step"
        :class="{ 'is-done': i <= currentStep, 'is-current': i === currentStep }"
      >
        <span class="oc__dot"><Check v-if="i < currentStep" :size="12" /></span>
        {{ step }}
      </li>
    </ol>

    <div class="oc__body">
      <dl class="oc__context">
        <div v-for="row in context" :key="row.label">
          <dt>{{ row.label }}</dt>
          <dd>{{ row.value }}</dd>
        </div>
      </dl>

      <div class="oc__items">
        <div class="ui-label">{{ mock.items }}</div>
        <ul>
          <li v-for="product in products" :key="product.label">
            <span>{{ product.label }}</span>
            <b class="sm-num">{{ product.price }}</b>
          </li>
        </ul>
        <div class="oc__total">
          <span>{{ mock.total }}</span>
          <b class="sm-num">{{ rupiah(1_500_000) }}</b>
        </div>
        <div class="oc__next">
          <ArrowRight :size="15" />
          <div>
            <div class="ui-label">{{ mock.nextStep }}</div>
            <div class="ui-title">{{ mock.nextStepValue }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.oc {
  width: 100%;
  max-width: 920px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: clamp(16px, 2.4vw, 28px);
  border-radius: var(--sm-r-shell);
  background: var(--sm-surface);
  border: 1px solid var(--sm-border);
  box-shadow: var(--sm-shadow-product);
  font-variant-numeric: tabular-nums;
}
.oc__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.oc__title {
  font-size: 18px;
  font-weight: 650;
  letter-spacing: -0.02em;
}
.oc__timeline {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
}
.oc__timeline li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 12px;
  background: var(--sm-surface-subtle);
  font-size: 12.5px;
  font-weight: 600;
  color: var(--sm-muted);
}
.oc__timeline li.is-done {
  color: var(--sm-text);
}
.oc__timeline li.is-current {
  background: var(--sm-primary-50);
  color: var(--sm-primary-ink);
}
.oc__dot {
  display: grid;
  place-items: center;
  flex: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1.5px solid var(--sm-border-2);
}
.is-done .oc__dot {
  border-color: transparent;
  background: var(--sm-ok);
  color: #fff;
}
.is-current .oc__dot {
  background: var(--sm-primary);
}
.oc__body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 14px;
}
.oc__context {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.oc__context div {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid var(--sm-border);
}
.oc__context dt {
  font-size: 11.5px;
  color: var(--sm-muted);
}
.oc__context dd {
  font-size: 13px;
  font-weight: 600;
}
.oc__items {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px 16px;
  border-radius: 14px;
  background: var(--sm-surface-subtle);
}
.oc__items ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.oc__items li,
.oc__total {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 13px;
}
.oc__total {
  padding-top: 10px;
  border-top: 1px solid var(--sm-border);
  font-weight: 600;
}
.oc__total b {
  color: var(--sm-primary-ink);
}
.oc__next {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 4px;
  padding: 12px;
  border-radius: 12px;
  background: var(--sm-surface);
  border: 1px dashed var(--sm-primary-200);
}
.oc__next svg {
  flex: none;
  margin-top: 3px;
  color: var(--sm-primary-ink);
}
@media (max-width: 760px) {
  .oc__body {
    grid-template-columns: minmax(0, 1fr);
  }
  .oc__timeline {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
