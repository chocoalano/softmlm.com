<script setup lang="ts">
/**
 * /integrations: integration readiness, discovery and system architecture
 * (docs/integrations-marketing.md). A marketing page for owners and IT
 * evaluators, not developer documentation: it explains how integrations
 * are scoped and promises no connector (docs/integration-evidence.md).
 */
import type { SeoMeta } from '#config/seo'
import type { PublicLeadOptions } from '#config/leads'
import { INTEGRATIONS_TRACKING_PAGE } from '@shared/integrations'
import MarketingLayout from '~/layouts/marketing.vue'
import SeoHead from '~/components/site/seo_head.vue'
import ConsultCta from '~/components/site/consult_cta.vue'
import Faq from '~/components/home/faq.vue'
import DemoRequest from '~/components/home/demo_request.vue'
import ServiceCrossLink from '~/components/services/service_cross_link.vue'
import IntHero from '~/components/integrations/int_hero.vue'
import IntProblem from '~/components/integrations/int_problem.vue'
import IntAreas from '~/components/integrations/int_areas.vue'
import IntDiscovery from '~/components/integrations/int_discovery.vue'
import IntTruth from '~/components/integrations/int_truth.vue'
import IntExamples from '~/components/integrations/int_examples.vue'
import IntPatterns from '~/components/integrations/int_patterns.vue'
import IntApproach from '~/components/integrations/int_approach.vue'
import IntReadiness from '~/components/integrations/int_readiness.vue'
import IntSecurity from '~/components/integrations/int_security.vue'
import IntFailure from '~/components/integrations/int_failure.vue'
import { useCopy, useI18n } from '~/i18n'

defineProps<{ leadOptions: PublicLeadOptions; seo: SeoMeta }>()

const t = useCopy('integrations')
const { lp } = useI18n()
const page = INTEGRATIONS_TRACKING_PAGE
</script>

<template>
  <MarketingLayout :page="page" context="integration_discovery" lead-mode="consultation">
    <SeoHead :seo="seo" />

    <IntHero />
    <IntProblem />
    <IntAreas />
    <IntDiscovery />
    <IntTruth />
    <IntExamples />

    <ConsultCta
      :eyebrow="t.midCta.eyebrow"
      :title="t.midCta.title"
      :text="t.midCta.text"
      context="integration_discovery"
      :page="page"
      section="mid_cta"
      :whatsapp-label="t.midCta.whatsapp"
    />

    <IntPatterns />
    <IntApproach />
    <ServiceCrossLink
      :text="t.pricing.text"
      :label="t.pricing.link"
      :href="lp('/pricing')"
      :page="page"
    />
    <IntReadiness />
    <IntSecurity />
    <IntFailure />

    <Faq id="faq" :items="t.faq.items" :title="t.faq.title" :lead="t.faq.lead" />

    <ConsultCta
      :title="t.finalCta.title"
      :text="t.finalCta.text"
      context="integration_discovery"
      :page="page"
      section="final_cta"
      :whatsapp-label="t.finalCta.whatsapp"
      :demo-href="lp('/#demo')"
      :secondary-label="t.finalCta.demo"
    />

    <DemoRequest
      :options="leadOptions"
      mode="integration"
      source="integration_page"
      :title="t.form.title"
      :text="t.form.text"
      context="integration_discovery"
      :page="page"
    />
  </MarketingLayout>
</template>
