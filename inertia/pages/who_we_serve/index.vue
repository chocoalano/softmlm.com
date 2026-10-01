<script setup lang="ts">
import type { SeoMeta } from '#config/seo'
import type { PublicLeadOptions } from '#config/leads'
import MarketingLayout from '~/layouts/marketing.vue'
import SeoHead from '~/components/site/seo_head.vue'
import Faq from '~/components/home/faq.vue'
import DemoRequest from '~/components/home/demo_request.vue'
import LandingHero from '~/components/who_we_serve/landing_hero.vue'
import PersonaCards from '~/components/who_we_serve/persona_cards.vue'
import TeamFlow from '~/components/who_we_serve/team_flow.vue'
import BusinessFirst from '~/components/who_we_serve/business_first.vue'
import { useCopy } from '~/i18n'

defineProps<{ leadOptions: PublicLeadOptions; seo: SeoMeta }>()

const t = useCopy('personas')
</script>

<template>
  <MarketingLayout page="who_we_serve" context="general">
    <SeoHead :seo="seo" />

    <LandingHero />
    <PersonaCards />
    <TeamFlow />
    <BusinessFirst />

    <Faq
      id="faq"
      :items="t.landing.faq.items"
      :title="t.landing.faq.title"
      :lead="t.landing.faq.lead"
    />

    <DemoRequest
      :options="leadOptions"
      source="role_page"
      :title="t.landing.demo.title"
      :text="t.landing.demo.text"
      context="general"
      page="who_we_serve"
    />
  </MarketingLayout>
</template>
