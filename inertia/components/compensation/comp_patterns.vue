<script setup lang="ts">
import { computed } from 'vue'
import { vReveal } from '~/composables/reveal'
import { patterns } from '~/content/compensation'
import { useCopy } from '~/i18n'
import PatternDiagram from '~/components/compensation/pattern_diagram.vue'

const t = useCopy('compensation')

const items = computed(() =>
  patterns.map((pattern) => ({ ...pattern, ...t.value.patterns.items[pattern.key] }))
)
</script>

<template>
  <section id="patterns" class="sm-section sm-section--tint cp">
    <div class="sm-container">
      <div class="sm-heading sm-heading--center">
        <span v-reveal class="sm-eyebrow">{{ t.patterns.eyebrow }}</span>
        <h2 v-reveal="60" class="sm-h2">{{ t.patterns.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.patterns.lead }}</p>
      </div>

      <ul class="cp__grid">
        <li v-for="(item, i) in items" :key="item.key" v-reveal="(i % 4) * 60" class="cp__card">
          <div class="cp__art">
            <PatternDiagram :type="item.diagram" />
          </div>
          <h3 class="sm-h4">{{ item.name }}</h3>
          <p class="cp__text">{{ item.text }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.cp__grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.cp__card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 22px;
  border-radius: 22px;
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
}
.cp__art {
  padding: 12px 8px;
  margin-bottom: 6px;
  border-radius: 14px;
  background: var(--sm-surface-subtle);
}
.cp__text {
  flex: 1;
  font-size: 14.5px;
  line-height: 1.55;
  color: var(--sm-muted);
}
@media (max-width: 1080px) {
  .cp__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 560px) {
  .cp__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
