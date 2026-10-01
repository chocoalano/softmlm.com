<script setup lang="ts">
/**
 * Inside the Migrate phase: what a migration involves beyond the import.
 */
import { ArrowRight } from 'lucide-vue-next'
import { useCopy, useI18n } from '~/i18n'

const t = useCopy('implementation')
const { lp } = useI18n()
</script>

<template>
  <div class="mr" role="group" aria-labelledby="mr-title">
    <div class="mr__head">
      <h4 id="mr-title" class="mr__title">{{ t.migrationReality.title }}</h4>
      <p class="sm-body">{{ t.migrationReality.text }}</p>
    </div>
    <ol class="mr__steps">
      <li v-for="(step, i) in t.migrationReality.steps" :key="step.title" class="mr__step">
        <span class="mr__num" aria-hidden="true">{{ i + 1 }}</span>
        <span class="mr__step-title">{{ step.title }}</span>
        <span class="mr__step-text">{{ step.text }}</span>
      </li>
    </ol>
    <a :href="lp('/pricing')" class="sm-link"
      >{{ t.migrationReality.pricingLink }} <ArrowRight :size="16"
    /></a>
  </div>
</template>

<style scoped>
.mr {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  margin-top: 16px;
  padding: clamp(20px, 3vw, 32px);
  border-radius: var(--sm-r-card);
  border: 1px dashed var(--sm-primary-200);
  background: var(--sm-surface);
}
.mr__head {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.mr__title {
  font-family: var(--sm-display);
  font-size: clamp(21px, 2vw, 26px);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.024em;
  text-wrap: balance;
}
.mr__steps {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  width: 100%;
  counter-reset: step;
}
.mr__step {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px;
  border-radius: 14px;
  background: var(--sm-surface-subtle);
}
.mr__num {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  margin-bottom: 6px;
  border-radius: 50%;
  background: var(--sm-primary);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
}
.mr__step:last-child .mr__num {
  background: linear-gradient(135deg, var(--sm-primary), var(--sm-tech));
}
.mr__step-title {
  font-size: 15px;
  font-weight: 650;
  color: var(--sm-text);
}
.mr__step-text {
  font-size: 13.5px;
  line-height: 1.5;
  color: var(--sm-muted);
}
@media (max-width: 1180px) {
  .mr__steps {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 520px) {
  .mr__steps {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
  }
  .mr__step {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    column-gap: 12px;
    padding: 10px 0;
    border-radius: 0;
    background: none;
  }
  .mr__step + .mr__step {
    border-top: 1px solid var(--sm-border);
  }
  .mr__num {
    grid-row: span 2;
    margin: 0;
  }
}
</style>
