<script setup lang="ts">
/**
 * /privacy: the Privacy Notice (docs/legal-review.md). Describes what the
 * site actually collects (docs/marketing-attribution.md) and carries the
 * analytics switch. A draft until the final legal and business review.
 */
import type { SeoMeta } from '#config/seo'
import type { PublicLeadOptions } from '#config/leads'
import { PRIVACY_TRACKING_PAGE, type TrackingPreference } from '@shared/legal'
import MarketingLayout from '~/layouts/marketing.vue'
import SeoHead from '~/components/site/seo_head.vue'
import LegalDocument from '~/components/legal/legal_document.vue'
import DemoRequest from '~/components/home/demo_request.vue'
import { useCopy } from '~/i18n'

defineProps<{
  leadOptions: PublicLeadOptions
  seo: SeoMeta
  trackingPreference: TrackingPreference
}>()

const t = useCopy('legal')
const page = PRIVACY_TRACKING_PAGE
</script>

<template>
  <MarketingLayout :page="page">
    <SeoHead :seo="seo" />

    <LegalDocument doc="privacy" :page="page" :tracking-preference="trackingPreference" />

    <DemoRequest
      :options="leadOptions"
      source="legal_page"
      :title="t.form.title"
      :text="t.form.text"
      :page="page"
    />
  </MarketingLayout>
</template>
