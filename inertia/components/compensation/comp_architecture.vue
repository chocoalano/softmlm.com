<script setup lang="ts">
import { computed } from 'vue'
import { ArrowRight, BookOpenCheck, History, SlidersHorizontal } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import { useCopy } from '~/i18n'

const t = useCopy('compensation')

const stageKeys = ['events', 'rules', 'calculation', 'postings'] as const

const stages = computed(() =>
  stageKeys.map((key) => ({ key, ...t.value.architecture.stages[key] }))
)

const principles = computed(() => {
  const copy = t.value.architecture.principles
  return [
    { key: 'data', icon: SlidersHorizontal, ...copy.data },
    { key: 'explainable', icon: BookOpenCheck, ...copy.explainable },
    { key: 'history', icon: History, ...copy.history },
  ]
})
</script>

<template>
  <section id="engine" class="sm-section ca">
    <div class="sm-container">
      <div class="sm-heading sm-heading--center">
        <span v-reveal class="sm-eyebrow">{{ t.architecture.eyebrow }}</span>
        <h2 v-reveal="60" class="sm-h2">{{ t.architecture.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.architecture.lead }}</p>
      </div>

      <ol v-reveal class="ca__flow" :aria-label="t.architecture.flowLabel">
        <li v-for="(stage, i) in stages" :key="stage.key" class="ca__stage">
          <span class="ca__num">{{ i + 1 }}</span>
          <h3 class="sm-h4">{{ stage.label }}</h3>
          <ul>
            <li v-for="item in stage.items" :key="item">{{ item }}</li>
          </ul>
          <ArrowRight
            v-if="i < stages.length - 1"
            class="ca__arrow"
            :size="18"
            aria-hidden="true"
          />
        </li>
      </ol>

      <div class="ca__principles">
        <article
          v-for="(item, i) in principles"
          :key="item.key"
          v-reveal="i * 80"
          class="ca__principle"
        >
          <span class="sm-icon-tile"><component :is="item.icon" :size="21" /></span>
          <h3 class="sm-h4">{{ item.title }}</h3>
          <p class="sm-body">{{ item.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ca__flow {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: clamp(40px, 5vw, 64px);
}
.ca__stage {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 24px;
  border-radius: 22px;
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
  box-shadow: var(--sm-shadow-soft);
}
.ca__stage:nth-child(2),
.ca__stage:nth-child(3) {
  background: linear-gradient(160deg, var(--sm-primary-50), var(--sm-surface));
}
.ca__num {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--sm-primary);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}
.ca__stage ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 14.5px;
  color: var(--sm-muted);
}
.ca__arrow {
  position: absolute;
  top: 50%;
  right: -17px;
  z-index: 1;
  margin-top: -9px;
  color: var(--sm-primary-ink);
  background: var(--sm-surface);
  border-radius: 50%;
}
.ca__principles {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.ca__principle {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 28px;
  border-radius: 22px;
  background: var(--sm-surface-subtle);
  border: 1px solid var(--sm-border);
}
.ca__principle .sm-h4 {
  margin-top: 6px;
}
@media (max-width: 980px) {
  .ca__flow {
    grid-template-columns: repeat(2, 1fr);
  }
  .ca__arrow {
    display: none;
  }
  .ca__principles {
    grid-template-columns: minmax(0, 1fr);
  }
}
@media (max-width: 520px) {
  .ca__flow {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
