<script setup lang="ts">
import type { PublicLeadOptions } from '#config/leads'
import type { SeoMeta } from '#config/seo'
import MarketingLayout from '~/layouts/marketing.vue'
import SeoHead from '~/components/site/seo_head.vue'
import Faq from '~/components/home/faq.vue'
import DemoRequest from '~/components/home/demo_request.vue'
import PricingHero from '~/components/pricing/pricing_hero.vue'
import PricingWizard from '~/components/pricing/pricing_wizard.vue'
import PricingDetails from '~/components/pricing/pricing_details.vue'
import { useCopy } from '~/i18n'

defineProps<{ leadOptions: PublicLeadOptions; seo: SeoMeta }>()

const t = useCopy('pricing')
</script>

<template>
  <MarketingLayout page="pricing" context="pricing">
    <SeoHead :seo="seo" />

    <PricingHero />

    <section
      id="estimate"
      class="sm-section sm-section--tint pricing-estimate"
      aria-labelledby="estimate-title"
    >
      <div class="sm-container">
        <div class="sm-heading sm-heading--center">
          <span class="sm-eyebrow">{{ t.estimate.eyebrow }}</span>
          <h2 id="estimate-title" class="sm-h2">{{ t.estimate.title }}</h2>
          <p class="sm-lead">{{ t.estimate.lead }}</p>
        </div>
        <div class="pricing-estimate__wizard">
          <PricingWizard :options="leadOptions" mode="full" page="pricing" source="pricing_page" />
        </div>
      </div>
    </section>

    <PricingDetails />

    <Faq id="faq" :items="t.faq.items" :title="t.faq.title" :lead="t.faq.lead" />

    <DemoRequest
      :options="leadOptions"
      source="pricing_page"
      :title="t.demo.title"
      :text="t.demo.text"
      context="pricing"
      page="pricing"
    />
  </MarketingLayout>
</template>

<style scoped>
.pricing-estimate__wizard {
  max-width: 1080px;
  margin: 0 auto;
}
</style>
