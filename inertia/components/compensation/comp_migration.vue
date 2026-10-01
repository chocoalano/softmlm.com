<script setup lang="ts">
import { computed } from 'vue'
import { ClipboardList, FileSearch, GitCompareArrows, Rocket } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import { useCopy } from '~/i18n'

/**
 * How an existing plan is approached. Written as a process, not a product
 * capability: nothing here implies automated migration.
 */
const t = useCopy('compensation')

const steps = computed(() => {
  const copy = t.value.migration.steps
  return [
    { key: 'share', icon: FileSearch, ...copy.share },
    { key: 'map', icon: ClipboardList, ...copy.map },
    { key: 'compare', icon: GitCompareArrows, ...copy.compare },
    { key: 'launch', icon: Rocket, ...copy.launch },
  ]
})
</script>

<template>
  <section id="migration" class="sm-section sm-section--tint cm">
    <div class="sm-container">
      <div class="sm-heading sm-heading--center">
        <span v-reveal class="sm-eyebrow">{{ t.migration.eyebrow }}</span>
        <h2 v-reveal="60" class="sm-h2">{{ t.migration.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.migration.lead }}</p>
      </div>
      <ol class="cm__steps">
        <li v-for="(step, i) in steps" :key="step.key" v-reveal="i * 70" class="cm__step">
          <span class="cm__num" aria-hidden="true">0{{ i + 1 }}</span>
          <span class="sm-icon-tile"><component :is="step.icon" :size="21" /></span>
          <h3 class="sm-h4">{{ step.title }}</h3>
          <p class="sm-body">{{ step.text }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.cm__steps {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.cm__step {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 26px;
  border-radius: 22px;
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
}
.cm__num {
  position: absolute;
  top: 18px;
  right: 22px;
  font-family: var(--sm-display);
  font-size: 40px;
  font-weight: 800;
  letter-spacing: -0.05em;
  color: var(--sm-primary-100);
}
.cm__step .sm-h4 {
  margin-top: 8px;
}
@media (max-width: 1080px) {
  .cm__steps {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 560px) {
  .cm__steps {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
