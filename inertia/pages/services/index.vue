<script setup lang="ts">
/**
 * /services: the growth services around the software, which stays the
 * core offering (docs/services-marketing-strategy.md). WhatsApp first; the
 * form here requests a consultation, not a software demo.
 */
import type { SeoMeta } from '#config/seo'
import type { PublicLeadOptions } from '#config/leads'
import { SERVICES_TRACKING_PAGE } from '@shared/services'
import MarketingLayout from '~/layouts/marketing.vue'
import SeoHead from '~/components/site/seo_head.vue'
import Faq from '~/components/home/faq.vue'
import DemoRequest from '~/components/home/demo_request.vue'
import ServiceHero from '~/components/services/service_hero.vue'
import HubVisual from '~/components/services/hub_visual.vue'
import HubChallenge from '~/components/services/hub_challenge.vue'
import ServiceEcosystem from '~/components/services/service_ecosystem.vue'
import ServiceCards from '~/components/services/service_cards.vue'
import HubTogether from '~/components/services/hub_together.vue'
import HubStart from '~/components/services/hub_start.vue'
import { vReveal } from '~/composables/reveal'
import { useCopy } from '~/i18n'

defineProps<{ leadOptions: PublicLeadOptions; seo: SeoMeta }>()

const t = useCopy('services')
const page = SERVICES_TRACKING_PAGE
</script>

<template>
  <MarketingLayout :page="page" context="services_overview" lead-mode="consultation">
    <SeoHead :seo="seo" />

    <ServiceHero
      :eyebrow="t.hub.hero.eyebrow"
      :title="t.hub.hero.title"
      :highlight="t.hub.hero.highlight"
      :lead="t.hub.hero.lead"
      :cta-label="t.hub.hero.cta"
      context="services_overview"
      :page="page"
      secondary-href="#service-areas"
      :secondary-label="t.hub.hero.explore"
    >
      <template #after>
        <p v-reveal="220" class="hub-positioning">{{ t.hub.hero.positioning }}</p>
      </template>
      <HubVisual />
    </ServiceHero>

    <HubChallenge />
    <ServiceEcosystem />

    <section
      id="service-areas"
      class="sm-section sm-section--compact sm-section--flush-top"
      aria-labelledby="areas-title"
    >
      <div class="sm-container">
        <div class="sm-heading">
          <span v-reveal class="sm-eyebrow">{{ t.hub.areas.eyebrow }}</span>
          <h2 id="areas-title" v-reveal="60" class="sm-h2">{{ t.hub.areas.title }}</h2>
        </div>
        <ServiceCards :page="page" :label="t.hub.areas.eyebrow" />
      </div>
    </section>

    <HubTogether />
    <HubStart />

    <Faq id="faq" :items="t.hub.faq.items" :title="t.hub.faq.title" :lead="t.shared.faqLead" />

    <DemoRequest
      :options="leadOptions"
      mode="consultation"
      source="services_overview"
      :title="t.hub.consult.title"
      :text="t.hub.consult.text"
      context="services_overview"
      :page="page"
    />
  </MarketingLayout>
</template>

<style scoped>
.hub-positioning {
  padding-left: 14px;
  border-left: 3px solid var(--sm-primary);
  font-size: 15.5px;
  font-weight: 600;
  line-height: 1.5;
  color: var(--sm-text-2);
}
</style>
