<script setup lang="ts">
import type { PublicLeadOptions } from '#config/leads'
import type { SeoMeta } from '#config/seo'
import MarketingLayout from '~/layouts/marketing.vue'
import SeoHead from '~/components/site/seo_head.vue'
import Faq from '~/components/home/faq.vue'
import DemoRequest from '~/components/home/demo_request.vue'
import CompHero from '~/components/compensation/comp_hero.vue'
import CompArchitecture from '~/components/compensation/comp_architecture.vue'
import CompPatterns from '~/components/compensation/comp_patterns.vue'
import CompBuilderSection from '~/components/compensation/comp_builder_section.vue'
import CompFeature from '~/components/compensation/comp_feature.vue'
import CompVisual from '~/components/compensation/comp_visual.vue'
import CompMigration from '~/components/compensation/comp_migration.vue'
import { useCopy } from '~/i18n'

defineProps<{ leadOptions: PublicLeadOptions; seo: SeoMeta }>()

const t = useCopy('compensation')
</script>

<template>
  <MarketingLayout page="compensation" context="compensation">
    <SeoHead :seo="seo" />

    <CompHero />
    <CompArchitecture />
    <CompPatterns />
    <CompBuilderSection />

    <CompFeature id="qualification" v-bind="t.features.qualification">
      <CompVisual name="qualification" />
    </CompFeature>

    <CompFeature id="ranks" v-bind="t.features.ranks" tone="tint" reverse>
      <CompVisual name="rank" />
    </CompFeature>

    <CompFeature id="override" v-bind="t.features.override">
      <CompVisual name="override" />
    </CompFeature>

    <CompFeature id="simulation" v-bind="t.features.simulation" tone="tint" reverse>
      <CompVisual name="simulation" />
    </CompFeature>

    <CompFeature id="versioning" v-bind="t.features.versioning">
      <CompVisual name="versioning" />
    </CompFeature>

    <CompFeature id="reversal" v-bind="t.features.reversal" tone="tint" reverse>
      <CompVisual name="reversal" />
    </CompFeature>

    <CompFeature id="wallet-tax" v-bind="t.features.walletTax">
      <CompVisual name="wallet_tax" />
    </CompFeature>

    <CompMigration />

    <Faq id="faq" :items="t.faq.items" :title="t.faq.title" :lead="t.faq.lead" />

    <DemoRequest
      :options="leadOptions"
      source="compensation_page"
      :title="t.demo.title"
      :text="t.demo.text"
      context="compensation"
      page="compensation"
    />
  </MarketingLayout>
</template>
