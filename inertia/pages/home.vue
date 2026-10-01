<script setup lang="ts">
import type { SeoMeta } from '#config/seo'
import MarketingLayout from '~/layouts/marketing.vue'
import SeoHead from '~/components/site/seo_head.vue'
import Hero from '~/components/home/hero.vue'
import Industries from '~/components/home/industries.vue'
import PlatformOverview from '~/components/home/platform_overview.vue'
import CommandCenter from '~/components/home/command_center.vue'
import FeatureExplorer from '~/components/home/feature_explorer.vue'
import CompensationEngine from '~/components/home/compensation_engine.vue'
import NetworkTree from '~/components/home/network_tree.vue'
import CommerceFlow from '~/components/home/commerce_flow.vue'
import WalletLedger from '~/components/home/wallet_ledger.vue'
import AiInsights from '~/components/home/ai_insights.vue'
import WhoWeServe from '~/components/home/who_we_serve.vue'
import Outcomes from '~/components/home/outcomes.vue'
import Implementation from '~/components/home/implementation.vue'
import Whymlmsoft from '~/components/home/why_mlmsoft.vue'
import ServicesHome from '~/components/services/services_home.vue'
import Integrations from '~/components/home/integrations.vue'
import Security from '~/components/home/security.vue'
import PricingQuote from '~/components/home/pricing_quote.vue'
import Faq from '~/components/home/faq.vue'
import DemoRequest from '~/components/home/demo_request.vue'
import ConsultCta from '~/components/site/consult_cta.vue'
import type { PublicLeadOptions } from '#config/leads'
import { useCopy } from '~/i18n'

defineProps<{ leadOptions: PublicLeadOptions; seo: SeoMeta }>()

const t = useCopy('homeClosing')
</script>

<template>
  <MarketingLayout page="homepage" context="general">
    <SeoHead :seo="seo" />
    <Hero />
    <Industries />
    <PlatformOverview />
    <CommandCenter />
    <FeatureExplorer />
    <CompensationEngine />
    <ConsultCta
      :eyebrow="t.page.compensationCta.eyebrow"
      :title="t.page.compensationCta.title"
      :text="t.page.compensationCta.text"
      context="compensation"
      page="homepage"
      section="compensation_cta"
      :whatsapp-label="t.page.compensationCta.whatsapp"
    />
    <NetworkTree />
    <CommerceFlow />
    <WalletLedger />
    <AiInsights />
    <WhoWeServe />
    <Outcomes />
    <Implementation />
    <ServicesHome />
    <Whymlmsoft />
    <Integrations />
    <Security />
    <PricingQuote :options="leadOptions" />
    <Faq :items="t.faq.items" :title="t.faq.title" :lead="t.faq.lead" />
    <DemoRequest :options="leadOptions" />
  </MarketingLayout>
</template>
