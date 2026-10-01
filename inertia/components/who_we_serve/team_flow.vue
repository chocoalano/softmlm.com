<script setup lang="ts">
import { computed } from 'vue'
import { vReveal } from '~/composables/reveal'
import FlowSteps from '~/components/site/flow_steps.vue'
import { findPersona, personaPath } from '@shared/personas'
import { teamFlowPersonas } from '~/content/personas'
import { useCopy, useI18n } from '~/i18n'

const t = useCopy('personas')
const { lp } = useI18n()

const steps = computed(() =>
  t.value.landing.teamFlow.steps.map((step, i) => {
    const persona = teamFlowPersonas[i]
    return { ...step, href: persona ? lp(personaPath(findPersona(persona))) : undefined }
  })
)
</script>

<template>
  <section class="sm-section sm-section--compact tf" aria-labelledby="team-flow-title">
    <div class="sm-container">
      <div class="sm-heading tf__head">
        <span v-reveal class="sm-eyebrow">{{ t.landing.teamFlow.eyebrow }}</span>
        <h2 id="team-flow-title" v-reveal="60" class="sm-h2">{{ t.landing.teamFlow.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.landing.teamFlow.lead }}</p>
      </div>

      <div v-reveal class="tf__panel">
        <p class="tf__example">
          <span class="tf__example-tag">{{ t.landing.teamFlow.exampleTag }}</span>
          {{ t.landing.teamFlow.example }}
        </p>
        <FlowSteps :steps="steps" :label="t.landing.teamFlow.label" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.tf__head {
  max-width: 880px;
  margin-bottom: clamp(32px, 4vw, 56px);
}
.tf__panel {
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding: clamp(24px, 3.5vw, 44px);
  border-radius: var(--sm-r-shell);
  border: 1px solid var(--sm-border);
  background:
    radial-gradient(40% 80% at 100% 0%, rgba(2, 200, 250, 0.08), transparent 70%), var(--sm-surface);
}
.tf__example {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 600;
  color: var(--sm-text-2);
}
.tf__example-tag {
  padding: 3px 10px;
  border-radius: 999px;
  background: var(--sm-primary-50);
  color: var(--sm-primary-ink);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
</style>
