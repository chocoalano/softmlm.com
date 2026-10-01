<script setup lang="ts">
/**
 * /terms: the Terms of Use (docs/legal-review.md). A draft until the final
 * legal and business review; the operator's legal details and governing
 * law are added only once confirmed.
 */
import type { SeoMeta } from '#config/seo'
import type { PublicLeadOptions } from '#config/leads'
import { TERMS_TRACKING_PAGE } from '@shared/legal'
import MarketingLayout from '~/layouts/marketing.vue'
import SeoHead from '~/components/site/seo_head.vue'
import LegalDocument from '~/components/legal/legal_document.vue'
import DemoRequest from '~/components/home/demo_request.vue'
import { useCopy } from '~/i18n'

defineProps<{ leadOptions: PublicLeadOptions; seo: SeoMeta }>()

const t = useCopy('legal')
const page = TERMS_TRACKING_PAGE
</script>

<template>
  <MarketingLayout :page="page">
    <SeoHead :seo="seo" />

    <LegalDocument doc="terms" :page="page" />

    <DemoRequest
      :options="leadOptions"
      source="legal_page"
      :title="t.form.title"
      :text="t.form.text"
      :page="page"
    />
  </MarketingLayout>
</template>
