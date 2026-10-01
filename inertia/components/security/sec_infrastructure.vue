<script setup lang="ts">
/**
 * Infrastructure & operations: the topics agreed in the deployment
 * architecture. Nothing here says a control is in place: each item is
 * what gets decided before production.
 */
import { computed } from 'vue'
import {
  Activity,
  DatabaseZap,
  GitBranch,
  HardDriveDownload,
  KeySquare,
  Layers3,
  Globe,
} from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import { useCopy } from '~/i18n'

const t = useCopy('security')
const icons = [Globe, DatabaseZap, HardDriveDownload, Activity, Layers3, KeySquare, GitBranch]
const items = computed(() =>
  t.value.infrastructure.items.map((item, i) => ({ ...item, icon: icons[i] }))
)
</script>

<template>
  <section
    class="sm-section sm-section--compact sm-section--tint sinfra"
    aria-labelledby="sinfra-title"
  >
    <div class="sm-container">
      <div class="sinfra__head">
        <span v-reveal class="sm-eyebrow">{{ t.infrastructure.eyebrow }}</span>
        <h2 id="sinfra-title" v-reveal="60" class="sm-h2">{{ t.infrastructure.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.infrastructure.lead }}</p>
      </div>
      <dl class="sinfra__list">
        <div
          v-for="(item, i) in items"
          :key="item.title"
          v-reveal="(i % 4) * 40"
          class="sinfra__item"
        >
          <dt><component :is="item.icon" :size="18" aria-hidden="true" /> {{ item.title }}</dt>
          <dd>{{ item.text }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.sinfra__head {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 860px;
  margin-bottom: clamp(28px, 4vw, 44px);
}
.sinfra__list {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}
.sinfra__item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 18px;
  border-radius: var(--sm-r-card);
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
}
/* seven topics: the last one takes the rest of the second row */
.sinfra__item:last-child {
  grid-column: span 2;
}
.sinfra__item dt {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15.5px;
  font-weight: 650;
}
.sinfra__item dt svg {
  color: var(--sm-primary-ink);
}
.sinfra__item dd {
  font-size: 14.5px;
  line-height: 1.5;
  color: var(--sm-muted);
}
@media (max-width: 1000px) {
  .sinfra__list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 520px) {
  .sinfra__list {
    grid-template-columns: minmax(0, 1fr);
  }
  .sinfra__item:last-child {
    grid-column: auto;
  }
}
</style>
