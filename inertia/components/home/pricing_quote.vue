<script setup lang="ts">
import { ArrowRight, Check } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import type { PublicLeadOptions } from '#config/leads'
import PricingWizard from '~/components/pricing/pricing_wizard.vue'
import MarketingWhatsappCta from '~/components/site/marketing_whatsapp_cta.vue'
import { useCopy, useI18n } from '~/i18n'

defineProps<{ options: PublicLeadOptions }>()

/**
 * `pricingQuote.scoped` lists what a tailored quote is scoped around: the
 * topics the sales conversation covers, not a promise of what every plan
 * includes. This section never shows a price.
 */
const t = useCopy('homeClosing')
const { lp } = useI18n()
</script>

<template>
  <section id="pricing" class="sm-section sm-section--tint pq">
    <div class="sm-container">
      <div class="sm-heading sm-heading--center">
        <span v-reveal class="sm-eyebrow">{{ t.pricingQuote.eyebrow }}</span>
        <h2 v-reveal="60" class="sm-h2">{{ t.pricingQuote.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.pricingQuote.lead }}</p>
      </div>

      <div v-reveal class="pq__grid">
        <PricingWizard
          :options="options"
          mode="quick"
          page="homepage"
          source="homepage_estimator"
        />

        <aside class="pq__included">
          <h3 class="sm-h4">{{ t.pricingQuote.scopedTitle }}</h3>
          <ul>
            <li v-for="item in t.pricingQuote.scoped" :key="item" class="sm-check">
              <Check :size="17" /> {{ item }}
            </li>
          </ul>
          <p>
            {{ t.pricingQuote.moreQuestion }}
            <a :href="lp('/pricing')" class="sm-link pq__more"
              >{{ t.pricingQuote.moreLink }} <ArrowRight :size="15"
            /></a>
          </p>
          <MarketingWhatsappCta
            context="pricing"
            page="homepage"
            section="pricing"
            variant="contextual"
            appearance="on-dark"
            :label="t.pricingQuote.whatsapp"
          />
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pq__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(0, 1fr);
  gap: 20px;
  max-width: 1120px;
  margin: 0 auto;
}
.pq__included {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: clamp(22px, 3vw, 36px);
  border-radius: var(--sm-r-shell);
  background: var(--sm-surface-inverse);
  border: 1px solid var(--sm-inverse-edge);
  color: var(--sm-on-inverse);
}
.pq__included ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.pq__included .sm-check {
  color: var(--sm-on-inverse-muted);
}
.pq__included .sm-check > svg {
  color: var(--sm-tech);
}
.pq__included p {
  margin-top: auto;
  padding-top: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  font-size: 15px;
  color: var(--sm-on-inverse-muted);
}
.pq__included .sm-link {
  color: #9fd0ff;
}
.pq__more {
  margin-top: 6px;
}
@media (max-width: 980px) {
  .pq__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
