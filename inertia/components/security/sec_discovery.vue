<script setup lang="ts">
/**
 * "Questions we clarify before implementation": the seven areas the
 * security part of discovery covers, plus where compliance requirements
 * come in. Maturity shown through questions, not claims.
 */
import { vReveal } from '~/composables/reveal'
import { useCopy } from '~/i18n'

const t = useCopy('security')
</script>

<template>
  <section class="sm-section sm-section--compact sdisc" aria-labelledby="sdisc-title">
    <div class="sm-container">
      <div class="sdisc__head">
        <span v-reveal class="sm-eyebrow">{{ t.discovery.eyebrow }}</span>
        <h2 id="sdisc-title" v-reveal="60" class="sm-h2">{{ t.discovery.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.discovery.lead }}</p>
      </div>
      <ol class="sdisc__list">
        <li
          v-for="(item, i) in t.discovery.items"
          :key="item.area"
          v-reveal="(i % 4) * 40"
          class="sdisc__item"
        >
          <span class="sdisc__num" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="sdisc__area">{{ item.area }}</span>
          <b>{{ item.question }}</b>
        </li>
      </ol>
      <p v-reveal class="sdisc__compliance">{{ t.discovery.compliance }}</p>
    </div>
  </section>
</template>

<style scoped>
.sdisc__head {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 760px;
  margin-bottom: clamp(28px, 4vw, 44px);
}
.sdisc__list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}
.sdisc__item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 20px;
  border-radius: var(--sm-r-card);
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
}
.sdisc__num {
  font-family: var(--sm-mono);
  font-size: 12.5px;
  color: var(--sm-primary-ink);
}
.sdisc__area {
  font-size: 12px;
  font-weight: 650;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--sm-muted);
}
.sdisc__item b {
  font-size: 16.5px;
  font-weight: 650;
  line-height: 1.4;
}
.sdisc__compliance {
  margin-top: 22px;
  max-width: 760px;
  font-size: 15.5px;
  line-height: 1.6;
  color: var(--sm-muted);
}
@media (max-width: 1000px) {
  .sdisc__list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 480px) {
  .sdisc__list {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
