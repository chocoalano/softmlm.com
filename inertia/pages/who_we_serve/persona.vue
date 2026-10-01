<script setup lang="ts">
/**
 * One page for each role in /who-we-serve/*. The story is the same for
 * every role; the copy (i18n `personas`), the way problems are shown and
 * the concept visual (content/personas.ts) are the role's own.
 */
import { computed, type Component } from 'vue'
import type { SeoMeta } from '#config/seo'
import type { PublicLeadOptions } from '#config/leads'
import { personaTrackingPage, type PersonaKey } from '@shared/personas'
import MarketingLayout from '~/layouts/marketing.vue'
import SeoHead from '~/components/site/seo_head.vue'
import ConsultCta from '~/components/site/consult_cta.vue'
import Faq from '~/components/home/faq.vue'
import DemoRequest from '~/components/home/demo_request.vue'
import PersonaHero from '~/components/who_we_serve/persona_hero.vue'
import PersonaMatters from '~/components/who_we_serve/persona_matters.vue'
import PersonaProblems from '~/components/who_we_serve/persona_problems.vue'
import PersonaApproach from '~/components/who_we_serve/persona_approach.vue'
import PersonaAreas from '~/components/who_we_serve/persona_areas.vue'
import PersonaConcept from '~/components/who_we_serve/persona_concept.vue'
import PersonaQuestions from '~/components/who_we_serve/persona_questions.vue'
import PersonaConnections from '~/components/who_we_serve/persona_connections.vue'
import ExecutiveOverview from '~/components/who_we_serve/concepts/executive_overview.vue'
import FinanceReview from '~/components/who_we_serve/concepts/finance_review.vue'
import OperationsMember from '~/components/who_we_serve/concepts/operations_member.vue'
import TechnicalDiscovery from '~/components/who_we_serve/concepts/technical_discovery.vue'
import DistributorApp from '~/components/who_we_serve/concepts/distributor_app.vue'
import { useCopy } from '~/i18n'

const props = defineProps<{ leadOptions: PublicLeadOptions; seo: SeoMeta; persona: PersonaKey }>()

const concepts: Record<PersonaKey, Component> = {
  executives: ExecutiveOverview,
  finance: FinanceReview,
  operations: OperationsMember,
  it: TechnicalDiscovery,
  distributors: DistributorApp,
}

const t = useCopy('personas')
const content = computed(() => t.value.personas[props.persona])
const trackingPage = computed(() => personaTrackingPage(props.persona))
</script>

<template>
  <MarketingLayout :page="trackingPage" :context="persona">
    <SeoHead :seo="seo" />

    <PersonaHero :persona="persona" />
    <PersonaMatters :persona="persona" />
    <PersonaProblems :persona="persona" />
    <PersonaApproach :persona="persona" />
    <PersonaAreas :persona="persona" />
    <PersonaConcept :persona="persona">
      <component :is="concepts[persona]" />
    </PersonaConcept>
    <PersonaQuestions :persona="persona" />
    <PersonaConnections :persona="persona" />

    <ConsultCta
      :title="content.cta.title"
      :text="content.cta.text"
      :context="persona"
      :page="trackingPage"
      section="consult_cta"
      :whatsapp-label="content.cta.label"
    />

    <Faq id="faq" :items="content.faqs" :title="content.faqTitle" :lead="t.shared.faqLead" />

    <DemoRequest
      :options="leadOptions"
      source="role_page"
      :title="content.demo.title"
      :text="content.demo.text"
      :context="persona"
      :page="trackingPage"
    />
  </MarketingLayout>
</template>
