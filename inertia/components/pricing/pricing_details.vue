<script setup lang="ts">
/**
 * What shapes a quotation, and what an implementation involves.
 */
import { computed } from 'vue'
import { vReveal } from '~/composables/reveal'
import { implementationSteps, priceFactors } from '~/content/pricing'
import MarketingWhatsappCta from '~/components/site/marketing_whatsapp_cta.vue'
import { useCopy } from '~/i18n'

const t = useCopy('pricing')

const factors = computed(() =>
  priceFactors.map((item) => ({ ...item, ...t.value.details.factors.items[item.key] }))
)
const steps = computed(() =>
  implementationSteps.map((step) => ({ ...step, ...t.value.details.steps.items[step.key] }))
)
</script>

<template>
  <section id="price-factors" class="sm-section pd">
    <div class="sm-container">
      <div class="sm-heading sm-heading--center">
        <span v-reveal class="sm-eyebrow">{{ t.details.factors.eyebrow }}</span>
        <h2 v-reveal="60" class="sm-h2">{{ t.details.factors.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.details.factors.lead }}</p>
      </div>
      <ul class="pd__factors">
        <li v-for="(item, i) in factors" :key="item.key" v-reveal="(i % 3) * 70" class="pd__factor">
          <span class="sm-icon-tile"
            ><component :is="item.icon" :size="21" aria-hidden="true"
          /></span>
          <h3 class="sm-h4">{{ item.title }}</h3>
          <p class="sm-body">{{ item.text }}</p>
        </li>
      </ul>
    </div>
  </section>

  <section id="implementation" class="sm-section sm-section--tint pd">
    <div class="sm-container">
      <div class="sm-heading sm-heading--center">
        <span v-reveal class="sm-eyebrow">{{ t.details.steps.eyebrow }}</span>
        <h2 v-reveal="60" class="sm-h2">{{ t.details.steps.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.details.steps.lead }}</p>
      </div>
      <ol class="pd__steps">
        <li v-for="(step, i) in steps" :key="step.key" v-reveal="(i % 4) * 60" class="pd__step">
          <span class="pd__num">{{ String(i + 1).padStart(2, '0') }}</span>
          <component :is="step.icon" :size="20" class="pd__icon" aria-hidden="true" />
          <h3 class="sm-h4">{{ step.title }}</h3>
          <p>{{ step.text }}</p>
        </li>
      </ol>
      <div v-reveal class="pd__cta">
        <MarketingWhatsappCta
          context="implementation"
          page="pricing"
          section="implementation"
          variant="contextual"
          :label="t.details.steps.cta"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.pd__factors {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.pd__factor {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 28px;
  border-radius: 22px;
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
}
.pd__factor .sm-h4 {
  margin-top: 6px;
}
.pd__steps {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}
.pd__step {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 22px;
  border-radius: 20px;
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
}
.pd__num {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--sm-primary-ink);
}
.pd__icon {
  color: var(--sm-primary-ink);
}
.pd__step p {
  font-size: 14.5px;
  line-height: 1.5;
  color: var(--sm-muted);
}
.pd__cta {
  display: flex;
  justify-content: center;
  margin-top: clamp(28px, 4vw, 40px);
}
@media (max-width: 1080px) {
  .pd__factors {
    grid-template-columns: repeat(2, 1fr);
  }
  .pd__steps {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 560px) {
  .pd__factors,
  .pd__steps {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
