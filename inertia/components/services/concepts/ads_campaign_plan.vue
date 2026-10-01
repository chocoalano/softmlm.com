<script setup lang="ts">
/**
 * Paid advertising concept: a campaign plan before any budget is spent, and
 * the path from audience to inquiry. Plan fields only: no spend, ROAS or
 * result figures.
 */
import { computed } from 'vue'
import { useCopy } from '~/i18n'

const t = useCopy('services')
const v = computed(() => t.value.pages.paid_advertising.visual)
</script>

<template>
  <figure class="ui acp">
    <div class="acp__head">
      <div class="acp__title">{{ v.title }}</div>
      <span class="ui-badge ui-badge--plain">{{ t.shared.concept }}</span>
    </div>
    <dl class="acp__rows">
      <div v-for="(row, i) in v.rows" :key="row.label" class="acp__row">
        <dt>
          <span class="acp__num" aria-hidden="true">{{ i + 1 }}</span> {{ row.label }}
        </dt>
        <dd>{{ row.value }}</dd>
      </div>
    </dl>
    <ol class="acp__funnel">
      <li v-for="(step, i) in v.funnel" :key="step" :style="{ '--i': i }">{{ step }}</li>
    </ol>
    <figcaption class="acp__caption">{{ v.label }}</figcaption>
  </figure>
</template>

<style scoped>
.acp {
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  padding: clamp(16px, 2.4vw, 24px);
  border-radius: var(--sm-r-card);
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
  box-shadow: var(--sm-shadow-product);
}
.acp__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.acp__title {
  font-size: 17px;
  font-weight: 650;
  letter-spacing: -0.02em;
}
.acp__rows {
  display: flex;
  flex-direction: column;
  border-radius: 14px;
  border: 1px solid var(--sm-border);
  overflow: hidden;
}
.acp__row {
  display: grid;
  grid-template-columns: 150px minmax(0, 1fr);
  gap: 12px;
  padding: 11px 14px;
}
.acp__row + .acp__row {
  border-top: 1px solid var(--sm-border);
}
.acp__row:nth-child(odd) {
  background: var(--sm-surface-subtle);
}
.acp__row dt {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--sm-muted);
}
.acp__num {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  flex: none;
  border-radius: 50%;
  background: var(--sm-primary-100);
  color: var(--sm-primary-ink);
  font-size: 11px;
  font-weight: 700;
}
.acp__row dd {
  font-size: 13.5px;
  line-height: 1.45;
  color: var(--sm-text);
}
.acp__funnel {
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.acp__funnel li {
  width: calc(100% - var(--i) * 14%);
  padding: 8px 10px;
  border-radius: 10px;
  /* blue towards navy: white text stays readable on every step */
  background: var(--sm-primary);
  color: #fff;
  font-size: 12.5px;
  font-weight: 650;
  text-align: center;
}
.acp__funnel li:nth-child(2) {
  background: #004cd1;
}
.acp__funnel li:nth-child(3) {
  background: #0a3a9c;
}
.acp__funnel li:nth-child(4) {
  background: #0a2350;
}
.acp__caption {
  font-size: 12px;
  color: var(--sm-muted);
}
@media (max-width: 520px) {
  .acp__row {
    grid-template-columns: minmax(0, 1fr);
    gap: 4px;
  }
}
</style>
