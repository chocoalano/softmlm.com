<script setup lang="ts">
import { computed } from 'vue'
import { vReveal } from '~/composables/reveal'
import type { FeatureKey } from '@shared/features'
import { featureStructure } from '~/content/features'
import { useCopy } from '~/i18n'

const props = defineProps<{ feature: FeatureKey }>()
const t = useCopy('features')
const outcomes = computed(() => t.value.pages[props.feature].outcomes)
const items = computed(() =>
  outcomes.value.items.map((item, i) => ({
    ...item,
    icon: featureStructure[props.feature].outcomeIcons[i],
  }))
)
</script>

<template>
  <section class="sm-section sm-section--compact fo" aria-labelledby="outcomes-title">
    <div class="sm-container">
      <div class="sm-heading fo__head">
        <span v-reveal class="sm-eyebrow">{{ t.shared.outcomesEyebrow }}</span>
        <h2 id="outcomes-title" v-reveal="60" class="sm-h2">{{ outcomes.title }}</h2>
      </div>
      <ul class="fo__grid">
        <li v-for="(item, i) in items" :key="item.title" v-reveal="(i % 3) * 60">
          <span class="sm-icon-tile"><component :is="item.icon" :size="20" /></span>
          <b>{{ item.title }}</b>
          <span>{{ item.text }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.fo__head {
  margin-bottom: clamp(32px, 4vw, 56px);
}
.fo__grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 16px;
}
.fo__grid li {
  grid-column: span 2;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 26px;
  border-radius: var(--sm-r-card);
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
}
.fo__grid li:nth-child(n + 4) {
  grid-column: span 3;
}
.fo__grid b {
  margin-top: 6px;
  font-family: var(--sm-display);
  font-size: 19px;
  font-weight: 700;
  letter-spacing: -0.018em;
}
.fo__grid li > span:last-child {
  font-size: 15.5px;
  line-height: 1.6;
  color: var(--sm-muted);
}
@media (max-width: 980px) {
  .fo__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .fo__grid li,
  .fo__grid li:nth-child(n + 4) {
    grid-column: auto;
  }
}
@media (max-width: 560px) {
  .fo__grid {
    grid-template-columns: minmax(0, 1fr);
  }
  .fo__grid li {
    padding: 22px;
  }
}
</style>
