<script setup lang="ts">
/**
 * One page per feature in /features/* (docs/feature-page-strategy.md). The
 * story is the same for every feature; the copy and the concept visual are
 * the feature's own (i18n/{en,id}/features.ts).
 */
import { computed, type Component } from 'vue'
import type { SeoMeta } from '#config/seo'
import type { PublicLeadOptions } from '#config/leads'
import { featureTrackingPage, type FeatureKey } from '@shared/features'
import MarketingLayout from '~/layouts/marketing.vue'
import SeoHead from '~/components/site/seo_head.vue'
import ConsultCta from '~/components/site/consult_cta.vue'
import Faq from '~/components/home/faq.vue'
import DemoRequest from '~/components/home/demo_request.vue'
import FeatureHero from '~/components/features/feature_hero.vue'
import FeatureProblem from '~/components/features/feature_problem.vue'
import FeatureGrowth from '~/components/features/feature_growth.vue'
import FeatureApproach from '~/components/features/feature_approach.vue'
import FeatureConcept from '~/components/features/feature_concept.vue'
import FeatureOutcomes from '~/components/features/feature_outcomes.vue'
import FeatureTeams from '~/components/features/feature_teams.vue'
import FeatureConsider from '~/components/features/feature_consider.vue'
import NetworkView from '~/components/features/concepts/network_view.vue'
import OrderContext from '~/components/features/concepts/order_context.vue'
import PayoutView from '~/components/features/concepts/payout_view.vue'
import ServiceCrossLink from '~/components/services/service_cross_link.vue'
import { findService, servicePath } from '@shared/services'
import { INTEGRATIONS_PATH } from '@shared/integrations'
import { useCopy, useI18n } from '~/i18n'

const props = defineProps<{ leadOptions: PublicLeadOptions; seo: SeoMeta; feature: FeatureKey }>()

const concepts: Record<FeatureKey, Component> = {
  network: NetworkView,
  ecommerce: OrderContext,
  wallet: PayoutView,
}

const t = useCopy('features')
const services = useCopy('services')
const { lp } = useI18n()
const content = computed(() => t.value.pages[props.feature])
const trackingPage = computed(() => featureTrackingPage(props.feature))
</script>

<template>
  <MarketingLayout :page="trackingPage" :context="feature">
    <SeoHead :seo="seo" />

    <FeatureHero :feature="feature" />
    <FeatureProblem :feature="feature" />
    <FeatureGrowth :feature="feature" />
    <FeatureApproach :feature="feature" />
    <FeatureConcept :feature="feature">
      <component :is="concepts[feature]" />
    </FeatureConcept>
    <FeatureOutcomes :feature="feature" />
    <FeatureTeams :feature="feature" />
    <FeatureConsider :feature="feature" />
    <ServiceCrossLink
      v-if="feature === 'ecommerce'"
      :text="t.pages.ecommerce.integrationsLink.text"
      :label="t.pages.ecommerce.integrationsLink.link"
      :href="lp(INTEGRATIONS_PATH)"
      :page="trackingPage"
      feature="integrations"
    />
    <ServiceCrossLink
      v-if="feature === 'ecommerce'"
      :text="services.crossLinks.ecommerce.text"
      :label="services.crossLinks.ecommerce.link"
      :href="lp(servicePath(findService('branding')))"
      :page="trackingPage"
      service="branding"
    />

    <Faq id="faq" :items="content.faq.items" :title="content.faq.title" :lead="t.shared.faqLead" />

    <ConsultCta
      :title="content.cta.title"
      :text="content.cta.text"
      :context="feature"
      :page="trackingPage"
      section="consult_cta"
      :whatsapp-label="content.cta.label"
    />

    <DemoRequest
      :options="leadOptions"
      source="feature_page"
      :title="content.demo.title"
      :text="content.demo.text"
      :context="feature"
      :page="trackingPage"
    />
  </MarketingLayout>
</template>
