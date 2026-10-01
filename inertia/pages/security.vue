<script setup lang="ts">
/**
 * /security: the Security & Trust page (docs/security-marketing.md). How
 * security requirements are clarified before implementation, for owners
 * and IT evaluators. Controls named as existing come from
 * shared/security.ts and belong to mlmsoft's own site and back office;
 * customer platform controls are defined by implementation scope
 * (docs/security-evidence.md). Calm on purpose: three conversion points
 * (hero, one mid-page, final), so the page reads uninterrupted.
 */
import type { SeoMeta } from '#config/seo'
import type { PublicLeadOptions } from '#config/leads'
import { SECURITY_TRACKING_PAGE } from '@shared/security'
import MarketingLayout from '~/layouts/marketing.vue'
import SeoHead from '~/components/site/seo_head.vue'
import ConsultCta from '~/components/site/consult_cta.vue'
import Faq from '~/components/home/faq.vue'
import DemoRequest from '~/components/home/demo_request.vue'
import SecHero from '~/components/security/sec_hero.vue'
import SecScope from '~/components/security/sec_scope.vue'
import SecAccess from '~/components/security/sec_access.vue'
import SecData from '~/components/security/sec_data.vue'
import SecIntegrations from '~/components/security/sec_integrations.vue'
import SecAudit from '~/components/security/sec_audit.vue'
import SecInfrastructure from '~/components/security/sec_infrastructure.vue'
import SecDiscovery from '~/components/security/sec_discovery.vue'
import SecChecklist from '~/components/security/sec_checklist.vue'
import SecVerified from '~/components/security/sec_verified.vue'
import { useCopy, useI18n } from '~/i18n'

defineProps<{ leadOptions: PublicLeadOptions; seo: SeoMeta }>()

const t = useCopy('security')
const { lp } = useI18n()
const page = SECURITY_TRACKING_PAGE
</script>

<template>
  <MarketingLayout :page="page" context="security_review" lead-mode="consultation">
    <SeoHead :seo="seo" />

    <SecHero />
    <SecScope />
    <SecAccess />
    <SecData />
    <SecIntegrations />
    <SecAudit />
    <SecInfrastructure />
    <SecDiscovery />
    <SecChecklist />

    <ConsultCta
      :eyebrow="t.midCta.eyebrow"
      :title="t.midCta.title"
      :text="t.midCta.text"
      context="security_review"
      :page="page"
      section="mid_cta"
      :whatsapp-label="t.midCta.whatsapp"
    />

    <SecVerified />

    <Faq id="faq" :items="t.faq.items" :title="t.faq.title" :lead="t.faq.lead" />

    <ConsultCta
      :title="t.finalCta.title"
      :text="t.finalCta.text"
      context="security_review"
      :page="page"
      section="final_cta"
      :whatsapp-label="t.finalCta.whatsapp"
      :demo-href="lp('/#demo')"
      :secondary-label="t.finalCta.demo"
    />

    <DemoRequest
      :options="leadOptions"
      mode="security"
      source="security_page"
      :title="t.form.title"
      :text="t.form.text"
      context="security_review"
      :page="page"
    />
  </MarketingLayout>
</template>
