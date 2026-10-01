<script setup lang="ts">
/**
 * Why integration needs design: the five ways two connected systems still
 * disagree. Questions, not claims.
 */
import { computed } from 'vue'
import { Clock, Fingerprint, Scale, Split, TriangleAlert } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import { useCopy } from '~/i18n'

const t = useCopy('integrations')
const icons = [Split, Fingerprint, Clock, TriangleAlert, Scale]
const items = computed(() => t.value.problem.items.map((item, i) => ({ ...item, icon: icons[i] })))
</script>

<template>
  <section class="sm-section sm-section--compact nprob" aria-labelledby="nprob-title">
    <div class="sm-container">
      <div class="nprob__head">
        <span v-reveal class="sm-eyebrow">{{ t.problem.eyebrow }}</span>
        <h2 id="nprob-title" v-reveal="60" class="sm-h2">{{ t.problem.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.problem.lead }}</p>
      </div>
      <ul class="nprob__grid">
        <li
          v-for="(item, i) in items"
          :key="item.title"
          v-reveal="(i % 3) * 60"
          class="nprob__card"
        >
          <span class="sm-icon-tile"><component :is="item.icon" :size="20" /></span>
          <h3 class="sm-h4">{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.nprob__head {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 760px;
  margin-bottom: clamp(32px, 4vw, 52px);
}
.nprob__grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 14px;
}
.nprob__card {
  grid-column: span 2;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 24px;
  border-radius: var(--sm-r-card);
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
}
/* the last two share the second row */
.nprob__card:nth-child(4),
.nprob__card:nth-child(5) {
  grid-column: span 3;
}
.nprob__card .sm-icon-tile {
  margin-bottom: 6px;
}
.nprob__card p {
  font-size: 15px;
  line-height: 1.55;
  color: var(--sm-muted);
}
@media (max-width: 900px) {
  .nprob__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .nprob__card,
  .nprob__card:nth-child(4),
  .nprob__card:nth-child(5) {
    grid-column: auto;
  }
}
@media (max-width: 560px) {
  .nprob__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
