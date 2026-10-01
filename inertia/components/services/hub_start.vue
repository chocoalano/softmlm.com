<script setup lang="ts">
/**
 * How an engagement starts, and the honest answer on pricing.
 */
import { Info } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import MarketingWhatsappCta from '~/components/site/marketing_whatsapp_cta.vue'
import { SERVICES_TRACKING_PAGE } from '@shared/services'
import { useCopy } from '~/i18n'

const t = useCopy('services')
</script>

<template>
  <section class="sm-section sm-section--compact hst" aria-labelledby="hst-title">
    <div class="sm-container">
      <div class="sm-heading">
        <span v-reveal class="sm-eyebrow">{{ t.hub.start.eyebrow }}</span>
        <h2 id="hst-title" v-reveal="60" class="sm-h2">{{ t.hub.start.title }}</h2>
      </div>
      <ol class="hst__steps">
        <li
          v-for="(step, i) in t.hub.start.steps"
          :key="step.title"
          v-reveal="(i % 3) * 60"
          class="hst__step"
        >
          <span class="hst__num" aria-hidden="true">{{ i + 1 }}</span>
          <h3 class="hst__title">{{ step.title }}</h3>
          <p>{{ step.text }}</p>
        </li>
      </ol>
      <p v-reveal class="hst__note">
        <Info :size="17" aria-hidden="true" /> {{ t.hub.start.note }}
      </p>

      <div v-reveal class="hst__pricing">
        <div>
          <h3 class="sm-h4">{{ t.hub.pricing.title }}</h3>
          <p>{{ t.hub.pricing.text }}</p>
        </div>
        <MarketingWhatsappCta
          context="services_overview"
          :page="SERVICES_TRACKING_PAGE"
          section="pricing_note"
          variant="contextual"
          appearance="light"
          :label="t.hub.pricing.cta"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hst__steps {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 10px;
}
.hst__step {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px 18px;
  border-radius: 20px;
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
}
.hst__num {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--sm-primary-50);
  color: var(--sm-primary-ink);
  font-size: 13px;
  font-weight: 700;
}
.hst__title {
  font-size: 16px;
  font-weight: 650;
}
.hst__step p {
  font-size: 14px;
  line-height: 1.5;
  color: var(--sm-muted);
}
.hst__note {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 16px;
  font-size: 14.5px;
  line-height: 1.5;
  color: var(--sm-muted);
}
.hst__note svg {
  flex: none;
  margin-top: 2px;
  color: var(--sm-info);
}
.hst__pricing {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px 32px;
  margin-top: clamp(32px, 4vw, 48px);
  padding: clamp(20px, 3vw, 32px);
  border-radius: var(--sm-r-card);
  border: 1px solid var(--sm-primary-200);
  background: var(--sm-primary-50);
}
.hst__pricing > div {
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-width: 640px;
}
.hst__pricing p {
  font-size: 15px;
  line-height: 1.55;
  color: var(--sm-text-2);
}
@media (max-width: 1180px) {
  .hst__steps {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
@media (max-width: 640px) {
  .hst__steps {
    grid-template-columns: minmax(0, 1fr);
  }
  .hst__step {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    column-gap: 14px;
    row-gap: 2px;
    padding: 16px;
  }
  .hst__num {
    grid-row: span 2;
  }
}
</style>
