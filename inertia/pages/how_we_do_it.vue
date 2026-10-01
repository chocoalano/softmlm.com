<script setup lang="ts">
/**
 * /how-we-do-it: how an implementation runs, from discovery to support
 * after launch (docs/implementation-marketing.md). A process page: it
 * explains how scope is found, and promises no timeline or outcome.
 */
import type { SeoMeta } from '#config/seo'
import type { PublicLeadOptions } from '#config/leads'
import { HOW_WE_DO_IT_TRACKING_PAGE } from '@shared/implementation'
import MarketingLayout from '~/layouts/marketing.vue'
import SeoHead from '~/components/site/seo_head.vue'
import ConsultCta from '~/components/site/consult_cta.vue'
import Faq from '~/components/home/faq.vue'
import DemoRequest from '~/components/home/demo_request.vue'
import ImpHero from '~/components/implementation/imp_hero.vue'
import ImpProblem from '~/components/implementation/imp_problem.vue'
import ImpPositioning from '~/components/implementation/imp_positioning.vue'
import ImpPhases from '~/components/implementation/imp_phases.vue'
import ImpResponsibilities from '~/components/implementation/imp_responsibilities.vue'
import ImpDiscoveryTeam from '~/components/implementation/imp_discovery_team.vue'
import ImpScope from '~/components/implementation/imp_scope.vue'
import ImpReadiness from '~/components/implementation/imp_readiness.vue'
import ServiceCrossLink from '~/components/services/service_cross_link.vue'
import { SERVICES_PATH } from '@shared/services'
import { useCopy, useI18n } from '~/i18n'

defineProps<{ leadOptions: PublicLeadOptions; seo: SeoMeta }>()

const t = useCopy('implementation')
const services = useCopy('services')
const { lp } = useI18n()
const page = HOW_WE_DO_IT_TRACKING_PAGE
</script>

<template>
  <MarketingLayout :page="page" context="implementation_general">
    <SeoHead :seo="seo" />

    <ImpHero />
    <ImpProblem />
    <ImpPositioning />
    <ImpPhases />
    <ImpResponsibilities />
    <ImpDiscoveryTeam />
    <ImpScope />

    <ConsultCta
      :eyebrow="t.migrationBand.eyebrow"
      :title="t.migrationBand.title"
      :text="t.migrationBand.text"
      context="migration"
      :page="page"
      section="migration_band"
      :whatsapp-label="t.migrationBand.whatsapp"
      :demo-href="lp('/pricing')"
      :secondary-label="t.migrationBand.pricing"
    />

    <ImpReadiness />
    <ServiceCrossLink
      :text="services.crossLinks.howWeDoIt.text"
      :label="services.crossLinks.howWeDoIt.link"
      :href="lp(SERVICES_PATH)"
      :page="page"
    />

    <Faq id="faq" :items="t.faq.items" :title="t.faq.title" :lead="t.faq.lead" />

    <ConsultCta
      :title="t.finalCta.title"
      :text="t.finalCta.text"
      context="implementation_general"
      :page="page"
      section="final_cta"
      :whatsapp-label="t.finalCta.whatsapp"
    />

    <DemoRequest
      :options="leadOptions"
      source="implementation_page"
      :title="t.demo.title"
      :text="t.demo.text"
      context="implementation_general"
      :page="page"
    />
  </MarketingLayout>
</template>
