<script setup lang="ts">
/**
 * Inside the Test phase: how one compensation rule is checked, as a
 * worked example that follows the six validation steps.
 */
import { computed } from 'vue'
import { ArrowRight, CircleCheck } from 'lucide-vue-next'
import MarketingWhatsappCta from '~/components/site/marketing_whatsapp_cta.vue'
import { HOW_WE_DO_IT_TRACKING_PAGE } from '@shared/implementation'
import { useFormat } from '~/composables/format'
import { useCopy, useI18n } from '~/i18n'

const t = useCopy('implementation')
const { lp } = useI18n()
const { rupiah } = useFormat()
const copy = computed(() => t.value.compensationValidation)

const steps = computed(() => {
  const example = copy.value.example
  const order = rupiah(1_500_000)
  const bonus = rupiah(150_000)
  const values = [
    example.rule,
    example.transaction(order),
    example.expected(bonus),
    example.result(bonus),
    example.review,
    example.approval,
  ]
  return copy.value.steps.map((label, i) => ({ label, value: values[i] }))
})
</script>

<template>
  <div class="cv" role="group" aria-labelledby="cv-title">
    <div class="cv__head">
      <span class="sm-eyebrow">{{ copy.eyebrow }}</span>
      <h4 id="cv-title" class="cv__title">{{ copy.title }}</h4>
      <p class="sm-body">{{ copy.text }}</p>
    </div>

    <div class="cv__example">
      <p class="cv__example-label">{{ copy.example.label }}</p>
      <ol class="cv__steps" :aria-label="copy.stepsLabel">
        <li
          v-for="(step, i) in steps"
          :key="step.label"
          class="cv__step"
          :class="{ 'cv__step--result': i === 3, 'cv__step--done': i === 5 }"
        >
          <span class="cv__step-label"
            ><span class="cv__num" aria-hidden="true">{{ i + 1 }}</span> {{ step.label }}</span
          >
          <span class="cv__value">{{ step.value }}</span>
          <span v-if="i === 3" class="ui-badge ui-badge--ok ui-badge--plain cv__match"
            ><CircleCheck :size="13" aria-hidden="true" /> {{ copy.example.match }}</span
          >
        </li>
      </ol>
    </div>

    <div class="cv__links">
      <a :href="lp('/compensation-plans')" class="sm-link"
        >{{ copy.link }} <ArrowRight :size="16"
      /></a>
      <MarketingWhatsappCta
        context="compensation_validation"
        :page="HOW_WE_DO_IT_TRACKING_PAGE"
        section="compensation_validation"
        variant="contextual"
        appearance="link"
        :label="copy.whatsapp"
      />
    </div>
  </div>
</template>

<style scoped>
.cv {
  display: flex;
  flex-direction: column;
  gap: 22px;
  margin-top: 16px;
  padding: clamp(20px, 3vw, 32px);
  border-radius: var(--sm-r-card);
  border: 1px solid var(--sm-border);
  background:
    radial-gradient(70% 60% at 100% 0%, var(--sm-glow), transparent 70%), var(--sm-surface);
  box-shadow: var(--sm-shadow-soft);
}
.cv__head {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.cv__title {
  font-family: var(--sm-display);
  font-size: clamp(21px, 2vw, 26px);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.024em;
  text-wrap: balance;
}
.cv__example {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.cv__example-label {
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--sm-muted);
}
.cv__steps {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}
.cv__step {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 14px;
  border-radius: 14px;
  border: 1px solid var(--sm-border);
  background: var(--sm-surface-subtle);
}
.cv__step-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--sm-muted);
}
.cv__num {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--sm-primary-100);
  color: var(--sm-primary-ink);
  font-size: 11px;
  font-weight: 700;
}
.cv__value {
  font-size: 14.5px;
  font-weight: 600;
  line-height: 1.45;
  color: var(--sm-text);
  font-variant-numeric: tabular-nums;
}
.cv__step--result {
  border-color: var(--sm-primary-200);
  background: var(--sm-surface);
}
.cv__step--done .cv__num {
  background: var(--sm-ok-bg);
  color: var(--sm-ok);
}
.cv__match {
  gap: 4px;
}
.cv__links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 28px;
}
@media (max-width: 1180px) {
  .cv__steps {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 520px) {
  .cv__steps {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
