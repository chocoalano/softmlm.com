<script setup lang="ts">
import { computed } from 'vue'
import { Clock, Eye, Database, Scale } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import { useCopy } from '~/i18n'

const t = useCopy('homeClosing')

/**
 * Outcomes are stated qualitatively on purpose. Replace them with measured
 * figures once there are customer case studies to back them up.
 */
const icons = [Clock, Scale, Eye, Database]
const outcomes = computed(() =>
  t.value.outcomes.items.map((item, i) => ({ ...item, icon: icons[i] }))
)
</script>

<template>
  <section class="sm-section oc">
    <div class="sm-container">
      <div class="oc__head">
        <span v-reveal class="sm-eyebrow">{{ t.outcomes.eyebrow }}</span>
        <h2 v-reveal="60" class="sm-h2">{{ t.outcomes.title }}</h2>
      </div>
      <div class="oc__grid">
        <article v-for="(item, i) in outcomes" :key="item.title" v-reveal="i * 80" class="oc__card">
          <span class="oc__index" aria-hidden="true">0{{ i + 1 }}</span>
          <span class="sm-icon-tile"><component :is="item.icon" :size="22" /></span>
          <h3 class="sm-h4">{{ item.title }}</h3>
          <p class="sm-body">{{ item.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.oc__head {
  display: flex;
  flex-direction: column;
  gap: 18px;
  max-width: 760px;
  margin-bottom: clamp(40px, 5vw, 64px);
}
.oc__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.oc__card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 28px;
  border-radius: var(--sm-r-card);
  background: var(--sm-surface-subtle);
  border: 1px solid var(--sm-border);
  overflow: hidden;
  transition:
    transform 0.3s var(--sm-ease),
    box-shadow 0.3s var(--sm-ease);
}
.oc__card:hover {
  transform: translateY(-4px);
  box-shadow: var(--sm-shadow-soft);
}
.oc__card .sm-icon-tile {
  background: var(--sm-surface);
  border: 1px solid var(--sm-border);
}
.oc__card .sm-h4 {
  margin-top: 40px;
  font-size: 21px;
}
.oc__index {
  position: absolute;
  top: 18px;
  right: 22px;
  font-family: var(--sm-display);
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.05em;
  color: var(--sm-primary-100);
}
@media (max-width: 1080px) {
  .oc__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 560px) {
  .oc__grid {
    grid-template-columns: minmax(0, 1fr);
  }
  .oc__card {
    min-height: 0;
  }
  .oc__card .sm-h4 {
    margin-top: 8px;
  }
}
</style>
