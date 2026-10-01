<script setup lang="ts">
/**
 * One page per growth service (docs/services-marketing-strategy.md). The
 * structure is shared; the search intent, copy and concept visual are the
 * service's own. WhatsApp in the hero, one mid-page band and the final
 * panel; the form requests a consultation.
 */
import { computed, type Component } from 'vue'
import type { SeoMeta } from '#config/seo'
import type { PublicLeadOptions } from '#config/leads'
import {
  findService,
  serviceLeadSource,
  serviceTrackingPage,
  type ServiceKey,
} from '@shared/services'
import MarketingLayout from '~/layouts/marketing.vue'
import SeoHead from '~/components/site/seo_head.vue'
import ConsultCta from '~/components/site/consult_cta.vue'
import Faq from '~/components/home/faq.vue'
import DemoRequest from '~/components/home/demo_request.vue'
import ServiceHero from '~/components/services/service_hero.vue'
import ServiceProblem from '~/components/services/service_problem.vue'
import ServiceScope from '~/components/services/service_scope.vue'
import ServiceProcess from '~/components/services/service_process.vue'
import ServiceFit from '~/components/services/service_fit.vue'
import ServiceRelated from '~/components/services/service_related.vue'
import SocialCalendar from '~/components/services/concepts/social_calendar.vue'
import SeoTopicMap from '~/components/services/concepts/seo_topic_map.vue'
import AdsCampaignPlan from '~/components/services/concepts/ads_campaign_plan.vue'
import BrandBoard from '~/components/services/concepts/brand_board.vue'
import ProductJourney from '~/components/services/concepts/product_journey.vue'
import { useCopy } from '~/i18n'

const props = defineProps<{ leadOptions: PublicLeadOptions; seo: SeoMeta; service: ServiceKey }>()

const concepts: Record<ServiceKey, Component> = {
  social_media: SocialCalendar,
  seo: SeoTopicMap,
  paid_advertising: AdsCampaignPlan,
  branding: BrandBoard,
  product_maklon: ProductJourney,
}

const t = useCopy('services')
const content = computed(() => t.value.pages[props.service])
const trackingPage = computed(() => serviceTrackingPage(props.service))
const context = computed(() => findService(props.service).whatsapp)
</script>

<template>
  <MarketingLayout :page="trackingPage" :context="context" lead-mode="consultation">
    <SeoHead :seo="seo" />

    <ServiceHero
      :eyebrow="content.hero.eyebrow"
      :title="content.hero.title"
      :highlight="content.hero.highlight"
      :lead="content.hero.lead"
      :cta-label="content.hero.cta"
      :context="context"
      :page="trackingPage"
      breadcrumb
    >
      <component :is="concepts[service]" />
    </ServiceHero>

    <ServiceProblem :service="service" />
    <ServiceScope :service="service" />
    <ServiceProcess :service="service" />
    <ServiceFit :service="service" />

    <ConsultCta
      :title="content.mid.title"
      :text="content.mid.text"
      :context="context"
      :page="trackingPage"
      section="mid_cta"
      :whatsapp-label="content.mid.whatsapp"
    />

    <ServiceRelated :service="service" :page="trackingPage" />

    <Faq id="faq" :items="content.faq.items" :title="content.faq.title" :lead="t.shared.faqLead" />

    <DemoRequest
      :options="leadOptions"
      mode="consultation"
      :source="serviceLeadSource(service)"
      :interests="[service]"
      :product-questions="service === 'product_maklon'"
      :title="content.consult.title"
      :text="content.consult.text"
      :context="context"
      :page="trackingPage"
    />
  </MarketingLayout>
</template>
