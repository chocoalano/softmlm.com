<script setup lang="ts">
import type { SeoMeta } from '#config/seo'
import type { PublicLeadOptions } from '#config/leads'
import { vReveal } from '~/composables/reveal'
import MarketingLayout from '~/layouts/marketing.vue'
import SeoHead from '~/components/site/seo_head.vue'
import NetworkOrb from '~/components/site/network_orb.vue'
import ConsultCta from '~/components/site/consult_cta.vue'
import MarketingWhatsappCta from '~/components/site/marketing_whatsapp_cta.vue'
import DemoRequest from '~/components/home/demo_request.vue'
import FeaturesOverview from '~/components/features/features_overview.vue'
import { useCopy } from '~/i18n'

defineProps<{ leadOptions: PublicLeadOptions; seo: SeoMeta }>()

const t = useCopy('features')
const common = useCopy('common')
</script>

<template>
  <MarketingLayout page="features" context="general">
    <SeoHead :seo="seo" />

    <section class="xhero">
      <div class="xhero__bg" aria-hidden="true" />
      <div class="xhero__orb" aria-hidden="true"><NetworkOrb :nodes="110" /></div>
      <div class="sm-container xhero__copy">
        <span v-reveal class="sm-eyebrow">{{ t.index.hero.eyebrow }}</span>
        <h1 v-reveal="60" class="sm-h1 xhero__title">
          {{ t.index.hero.title }} <span class="sm-grad">{{ t.index.hero.highlight }}</span>
        </h1>
        <p v-reveal="120" class="sm-lead">{{ t.index.hero.lead }}</p>
        <div v-reveal="180" class="xhero__ctas">
          <MarketingWhatsappCta page="features" section="hero" variant="primary" size="lg" />
          <a href="#demo" class="sm-btn sm-btn--light sm-btn--lg">{{ common.cta.bookDemo }}</a>
        </div>
      </div>
    </section>

    <FeaturesOverview />

    <ConsultCta
      :title="t.index.cta.title"
      :text="t.index.cta.text"
      context="general"
      page="features"
      section="consult_cta"
      :whatsapp-label="t.index.cta.label"
    />

    <DemoRequest
      :options="leadOptions"
      source="feature_page"
      :title="t.index.demo.title"
      :text="t.index.demo.text"
      context="general"
      page="features"
    />
  </MarketingLayout>
</template>

<style scoped>
.xhero {
  position: relative;
  padding-block: clamp(48px, 7vw, 104px) clamp(56px, 7vw, 96px);
  isolation: isolate;
  overflow: hidden;
}
.xhero__bg {
  position: absolute;
  inset: calc(var(--sm-header-h) * -1) 0 0;
  z-index: -2;
  background:
    radial-gradient(50% 60% at 85% 30%, var(--sm-glow), transparent 70%),
    linear-gradient(180deg, var(--sm-page), var(--sm-surface-subtle));
}
.xhero__orb {
  position: absolute;
  z-index: -1;
  width: min(560px, 60vw);
  right: -80px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.9;
}
.xhero__copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 22px;
}
.xhero__title {
  max-width: 820px;
  font-size: clamp(40px, 5.4vw, 72px);
}
.xhero__copy .sm-lead {
  max-width: 640px;
}
.xhero__ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 6px;
}
@media (max-width: 980px) {
  .xhero__orb {
    opacity: 0.35;
    right: -160px;
  }
}
@media (max-width: 560px) {
  .xhero__ctas {
    width: 100%;
    flex-direction: column;
  }
  .xhero__ctas .sm-btn {
    width: 100%;
  }
}
</style>
