<script setup lang="ts">
/**
 * The service's own process, as an ordered flow: a row on wide screens,
 * a vertical list on narrow ones. Plain text in reading order.
 */
import { computed } from 'vue'
import { vReveal } from '~/composables/reveal'
import type { ServiceKey } from '@shared/services'
import { useCopy } from '~/i18n'

const props = defineProps<{ service: ServiceKey }>()
const t = useCopy('services')
const process = computed(() => t.value.pages[props.service].process)
</script>

<template>
  <section class="sm-section sm-section--compact sm-section--tint spr" aria-labelledby="spr-title">
    <div class="sm-container">
      <div class="sm-heading">
        <span v-reveal class="sm-eyebrow">{{ t.shared.processEyebrow }}</span>
        <h2 id="spr-title" v-reveal="60" class="sm-h2">{{ process.title }}</h2>
      </div>
      <ol class="spr__flow" :style="{ '--steps': process.steps.length }">
        <li
          v-for="(step, i) in process.steps"
          :key="step.title"
          v-reveal="(i % 4) * 50"
          class="spr__step"
        >
          <span class="spr__num" aria-hidden="true">{{ i + 1 }}</span>
          <h3 class="spr__title">{{ step.title }}</h3>
          <p>{{ step.text }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.spr__flow {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(var(--steps), minmax(0, 1fr));
  gap: 10px;
}
.spr__step {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px 16px;
  border-radius: 20px;
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
}
/* connector to the next step */
.spr__step:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 33px;
  right: -11px;
  width: 12px;
  height: 2px;
  background: var(--sm-primary-200);
}
.spr__num {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--sm-primary);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}
.spr__step:last-child .spr__num {
  background: linear-gradient(135deg, var(--sm-primary), var(--sm-tech));
}
.spr__title {
  font-size: 15.5px;
  font-weight: 650;
  letter-spacing: -0.01em;
}
.spr__step p {
  font-size: 14px;
  line-height: 1.5;
  color: var(--sm-muted);
}
@media (max-width: 1180px) {
  .spr__flow {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }
  .spr__step::after {
    display: none;
  }
}
@media (max-width: 640px) {
  .spr__flow {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
    padding-left: 14px;
    border-left: 2px solid var(--sm-primary-200);
  }
  .spr__step {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    column-gap: 14px;
    row-gap: 2px;
    padding: 12px 0 12px 0;
    border: 0;
    border-radius: 0;
    background: none;
  }
  .spr__num {
    grid-row: span 2;
    margin-left: -30px;
    box-shadow: 0 0 0 4px var(--sm-surface-subtle);
  }
}
</style>
