<script setup lang="ts">
/**
 * Needs estimate used on the homepage (quick, two steps) and on /pricing
 * (full, three steps). It never shows a price: it collects context, then
 * offers a WhatsApp consultation or hands the answers to the demo form.
 * Answers survive a reload or a trip back within the same visit.
 */
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue'
import { ArrowLeft, ArrowRight, Check, ClipboardCheck } from 'lucide-vue-next'
import type { LeadSource, PublicLeadOptions } from '#config/leads'
import {
  emptyAnswers,
  isStepComplete,
  restoreAnswers,
  STEPS,
  toggleChoice,
  toSnapshot,
  type WizardAnswers,
  type WizardMode,
  type WizardStep,
} from '@shared/pricing_wizard'
import { handOffToDemo } from '~/composables/demo_request'
import MarketingWhatsappCta from '~/components/site/marketing_whatsapp_cta.vue'
import { useCopy, useI18n } from '~/i18n'
import { track } from '@shared/analytics'

const props = withDefaults(
  defineProps<{
    options: PublicLeadOptions
    mode?: WizardMode
    page: string
    source: LeadSource
  }>(),
  { mode: 'full' }
)

const t = useCopy('pricing')
const common = useCopy('common')
const copy = computed(() => t.value.wizard)
const stepLabels = computed<Record<WizardStep, string>>(() => copy.value.steps)

const steps = computed(() => STEPS[props.mode])
const stepIndex = ref(0)
const done = ref(false)
const answers = reactive<WizardAnswers>(emptyAnswers())
const stepHeading = ref<HTMLElement>()

const currentStep = computed(() => steps.value[stepIndex.value])
const canContinue = computed(() => isStepComplete(currentStep.value, answers, props.mode))
const isLastStep = computed(() => stepIndex.value === steps.value.length - 1)

/* --- persistence within the visit --- */
const storageKey = computed(() => `mlmsoft:estimate:${props.mode}`)
const allowed = computed(() => ({
  businessType: props.options.businessTypes.map((o) => o.value),
  activeMembers: props.options.memberRanges.map((o) => o.value),
  currentSystem: props.options.currentSystems.map((o) => o.value),
  modules: props.options.modules.map((o) => o.value),
  compensationComplexity: props.options.compensationComplexities.map((o) => o.value),
  dataMigration: props.options.migrationScopes.map((o) => o.value),
  integrations: props.options.integrationNeeds.map((o) => o.value),
}))

onMounted(() => {
  try {
    const saved = JSON.parse(sessionStorage.getItem(storageKey.value) ?? 'null')
    if (!saved) return
    Object.assign(answers, restoreAnswers(saved.answers, allowed.value))
    const savedStep = Number(saved.step)
    if (Number.isInteger(savedStep) && savedStep >= 0 && savedStep < steps.value.length) {
      stepIndex.value = savedStep
    }
    done.value =
      Boolean(saved.done) && steps.value.every((s) => isStepComplete(s, answers, props.mode))
  } catch {
    /* storage unavailable or corrupt: start fresh */
  }
})

watch(
  [answers, stepIndex, done],
  () => {
    try {
      sessionStorage.setItem(
        storageKey.value,
        JSON.stringify({ answers, step: stepIndex.value, done: done.value })
      )
    } catch {
      /* private mode or blocked storage: the wizard still works */
    }
  },
  { deep: true }
)

/**
 * First-party tracking: the estimate was started (first answer the visitor
 * gives, not answers restored from this tab) and completed. The answers
 * themselves travel only with a submitted lead.
 */
const { locale } = useI18n()
let restoring = true
let startedTracked = false
onMounted(() => nextTick(() => (restoring = false)))
watch(
  answers,
  () => {
    if (restoring || startedTracked) return
    startedTracked = true
    track('pricing_started', { page: props.page, locale: locale.value, mode: props.mode })
  },
  { deep: true }
)

/* --- navigation --- */
async function focusStep() {
  await nextTick()
  stepHeading.value?.focus()
}

function next() {
  if (!canContinue.value) return
  if (isLastStep.value) {
    done.value = true
    track('pricing_completed', { page: props.page, locale: locale.value, mode: props.mode })
  } else stepIndex.value++
  focusStep()
}

function back() {
  if (done.value) done.value = false
  else if (stepIndex.value > 0) stepIndex.value--
  focusStep()
}

function restart() {
  Object.assign(answers, emptyAnswers())
  stepIndex.value = 0
  done.value = false
  focusStep()
}

function bookDemo() {
  handOffToDemo(toSnapshot(answers, props.mode), props.source)
}

/* --- multi-select with exclusive "none / not sure" --- */
function toggleMigration(value: WizardAnswers['dataMigration'][number]) {
  answers.dataMigration = toggleChoice(answers.dataMigration, value, ['none', 'unsure'])
}
function toggleIntegration(value: WizardAnswers['integrations'][number]) {
  answers.integrations = toggleChoice(answers.integrations, value, ['unsure'])
}

/* --- summary --- */
const labelOf = (list: { value: string; label: string }[], value: string) =>
  list.find((item) => item.value === value)?.label ?? value
const listOf = (list: { value: string; label: string }[], values: string[]) =>
  values.map((value) => labelOf(list, value)).join(', ')

const summary = computed(() => {
  const o = props.options
  const label = copy.value.result.summary
  const rows = [
    {
      key: 'businessType',
      label: label.businessType,
      value: labelOf(o.businessTypes, answers.businessType),
    },
    {
      key: 'activeMembers',
      label: label.activeMembers,
      value: labelOf(o.memberRanges, answers.activeMembers),
    },
    { key: 'modules', label: label.modules, value: listOf(o.modules, answers.modules) },
  ]
  if (props.mode === 'full') {
    rows.splice(2, 0, {
      key: 'currentSystem',
      label: label.currentSystem,
      value: labelOf(o.currentSystems, answers.currentSystem),
    })
    rows.push(
      {
        key: 'compensation',
        label: label.compensation,
        value: labelOf(o.compensationComplexities, answers.compensationComplexity),
      },
      {
        key: 'migration',
        label: label.migration,
        value: listOf(o.migrationScopes, answers.dataMigration),
      },
      {
        key: 'integrations',
        label: label.integrations,
        value: listOf(o.integrationNeeds, answers.integrations),
      }
    )
  }
  return rows
})
</script>

<template>
  <div class="pw">
    <ol class="pw__steps" :aria-label="copy.progressLabel">
      <li
        v-for="(step, i) in steps"
        :key="step"
        :class="{ 'is-current': !done && stepIndex === i, 'is-done': done || stepIndex > i }"
        :aria-current="!done && stepIndex === i ? 'step' : undefined"
      >
        <span class="pw__dot">
          <Check v-if="done || stepIndex > i" :size="13" aria-hidden="true" />
          <template v-else>{{ i + 1 }}</template>
        </span>
        <span class="pw__step-label">{{ stepLabels[step] }}</span>
      </li>
    </ol>

    <div v-if="!done" class="pw__body">
      <h3 ref="stepHeading" class="sm-h4 pw__title" tabindex="-1">
        {{ copy.stepOf(stepIndex + 1, steps.length) }} · {{ stepLabels[currentStep] }}
      </h3>

      <!-- Step: business -->
      <template v-if="currentStep === 'business'">
        <fieldset class="pw__group">
          <legend>{{ copy.questions.businessType }}</legend>
          <div class="pw__cards pw__cards--3">
            <label v-for="option in options.businessTypes" :key="option.value" class="pw__card">
              <input
                v-model="answers.businessType"
                type="radio"
                name="pw-business"
                :value="option.value"
              />
              <span class="pw__card-body">
                <b>{{ option.label }}</b>
                <span>{{ option.description }}</span>
              </span>
            </label>
          </div>
        </fieldset>

        <fieldset class="pw__group">
          <legend>{{ copy.questions.activeMembers }}</legend>
          <div class="pw__pills">
            <label v-for="range in options.memberRanges" :key="range.value" class="pw__pill">
              <input
                v-model="answers.activeMembers"
                type="radio"
                name="pw-members"
                :value="range.value"
              />
              <span>{{ range.label }}</span>
            </label>
          </div>
        </fieldset>

        <fieldset v-if="mode === 'full'" class="pw__group">
          <legend>{{ copy.questions.currentSystem }}</legend>
          <div class="pw__pills">
            <label v-for="item in options.currentSystems" :key="item.value" class="pw__pill">
              <input
                v-model="answers.currentSystem"
                type="radio"
                name="pw-system"
                :value="item.value"
              />
              <span>{{ item.label }}</span>
            </label>
          </div>
        </fieldset>
      </template>

      <!-- Step: modules -->
      <fieldset v-else-if="currentStep === 'modules'" class="pw__group">
        <legend>{{ copy.questions.modules }}</legend>
        <div class="pw__cards pw__cards--3">
          <label v-for="item in options.modules" :key="item.value" class="pw__card pw__card--check">
            <input v-model="answers.modules" type="checkbox" :value="item.value" />
            <span class="pw__card-body">
              <b>{{ item.label }}</b>
              <span>{{ item.description }}</span>
            </span>
            <Check :size="16" class="pw__tick" aria-hidden="true" />
          </label>
        </div>
      </fieldset>

      <!-- Step: implementation -->
      <template v-else>
        <fieldset class="pw__group">
          <legend>{{ copy.questions.compensation }}</legend>
          <div class="pw__cards pw__cards--3">
            <label
              v-for="item in options.compensationComplexities"
              :key="item.value"
              class="pw__card"
            >
              <input
                v-model="answers.compensationComplexity"
                type="radio"
                name="pw-complexity"
                :value="item.value"
              />
              <span class="pw__card-body">
                <b>{{ item.label }}</b>
                <span>{{ item.description }}</span>
              </span>
            </label>
          </div>
        </fieldset>

        <fieldset class="pw__group">
          <legend>{{ copy.questions.migration }}</legend>
          <div class="pw__pills">
            <label v-for="item in options.migrationScopes" :key="item.value" class="pw__pill">
              <input
                type="checkbox"
                :value="item.value"
                :checked="answers.dataMigration.includes(item.value)"
                @change="toggleMigration(item.value)"
              />
              <span>{{ item.label }}</span>
            </label>
          </div>
        </fieldset>

        <fieldset class="pw__group">
          <legend>{{ copy.questions.integrations }}</legend>
          <div class="pw__pills">
            <label v-for="item in options.integrationNeeds" :key="item.value" class="pw__pill">
              <input
                type="checkbox"
                :value="item.value"
                :checked="answers.integrations.includes(item.value)"
                @change="toggleIntegration(item.value)"
              />
              <span>{{ item.label }}</span>
            </label>
          </div>
        </fieldset>
      </template>

      <div class="pw__nav">
        <button v-if="stepIndex > 0" type="button" class="sm-btn sm-btn--ghost" @click="back">
          <ArrowLeft :size="17" aria-hidden="true" /> {{ copy.back }}
        </button>
        <span class="pw__spacer" />
        <p v-if="!canContinue" class="pw__hint">{{ copy.incomplete }}</p>
        <button type="button" class="sm-btn sm-btn--primary" :disabled="!canContinue" @click="next">
          {{ isLastStep ? copy.finish : copy.continue }}
          <ArrowRight :size="17" class="sm-btn__arrow" aria-hidden="true" />
        </button>
      </div>
    </div>

    <div v-else class="pw__body pw__result" aria-live="polite">
      <span class="sm-icon-tile"><ClipboardCheck :size="22" aria-hidden="true" /></span>
      <h3 ref="stepHeading" class="sm-h4 pw__title" tabindex="-1">{{ copy.result.title }}</h3>
      <dl class="pw__summary">
        <div v-for="row in summary" :key="row.key">
          <dt>{{ row.label }}</dt>
          <dd>{{ row.value || '—' }}</dd>
        </div>
      </dl>
      <p class="pw__message">{{ copy.result.message }}</p>
      <div class="pw__result-ctas">
        <MarketingWhatsappCta
          context="pricing_result"
          :page="page"
          section="result"
          variant="primary"
          :label="copy.result.whatsapp"
        />
        <button type="button" class="sm-btn sm-btn--light" @click="bookDemo">
          {{ common.cta.bookDemo }}
        </button>
      </div>
      <p class="pw__privacy">{{ copy.result.privacy }}</p>
      <div class="pw__nav pw__nav--result">
        <button type="button" class="sm-btn sm-btn--ghost" @click="back">
          <ArrowLeft :size="17" aria-hidden="true" /> {{ copy.result.change }}
        </button>
        <button type="button" class="sm-btn sm-btn--ghost" @click="restart">
          {{ copy.result.restart }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pw {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: clamp(22px, 3vw, 40px);
  border-radius: var(--sm-r-shell);
  background: var(--sm-surface);
  border: 1px solid var(--sm-border);
  box-shadow: var(--sm-shadow-soft);
}
.pw__steps {
  list-style: none;
  display: flex;
  gap: 8px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--sm-border);
}
.pw__steps li {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 600;
  color: var(--sm-subtle);
}
.pw__dot {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  flex: none;
  border-radius: 50%;
  border: 1.5px solid var(--sm-border-2);
  font-size: 12.5px;
}
.pw__steps .is-current {
  color: var(--sm-text);
}
.pw__steps .is-current .pw__dot {
  border-color: var(--sm-primary-ink);
  color: var(--sm-primary-ink);
  box-shadow: 0 0 0 4px var(--sm-primary-50);
}
.pw__steps .is-done {
  color: var(--sm-text-2);
}
.pw__steps .is-done .pw__dot {
  border-color: var(--sm-primary-ink);
  background: var(--sm-primary);
  color: #fff;
}
.pw__body {
  display: flex;
  flex-direction: column;
  gap: 22px;
}
.pw__title {
  outline: none;
}
.pw__title:focus-visible {
  outline: 2px solid var(--sm-primary-ink);
  outline-offset: 4px;
}
.pw__group {
  border: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.pw__group legend {
  margin-bottom: 12px;
  font-size: 15.5px;
  font-weight: 650;
  color: var(--sm-text);
}
.pw__cards {
  display: grid;
  gap: 10px;
}
.pw__cards--3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.pw__card {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 16px;
  border-radius: 14px;
  border: 1.5px solid var(--sm-border);
  cursor: pointer;
  transition:
    border-color 0.15s,
    background 0.15s,
    box-shadow 0.15s;
}
.pw__card:hover,
.pw__pill:hover {
  border-color: var(--sm-primary-200);
}
.pw__card input,
.pw__pill input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
  accent-color: var(--sm-primary);
}
.pw__card:has(input:checked),
.pw__pill:has(input:checked) {
  border-color: var(--sm-primary-ink);
  background: var(--sm-primary-50);
  color: var(--sm-primary-ink);
}
.pw__card:has(input:focus-visible),
.pw__pill:has(input:focus-visible) {
  box-shadow: 0 0 0 4px var(--sm-primary-100);
}
.pw__card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.pw__card-body b {
  font-size: 15px;
  font-weight: 650;
}
.pw__card-body span {
  font-size: 13.5px;
  line-height: 1.45;
  color: var(--sm-muted);
}
.pw__tick {
  display: none;
  flex: none;
  color: var(--sm-primary-ink);
}
.pw__card:has(input:checked) .pw__tick {
  display: block;
}
.pw__pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.pw__pill {
  position: relative;
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 8px 16px;
  line-height: 1.35;
  border-radius: 999px;
  border: 1.5px solid var(--sm-border);
  font-size: 14.5px;
  font-weight: 600;
  cursor: pointer;
  transition:
    border-color 0.15s,
    background 0.15s,
    box-shadow 0.15s;
}
.pw__nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  padding-top: 18px;
  border-top: 1px solid var(--sm-border);
}
.pw__spacer {
  flex: 1;
}
.pw__hint {
  font-size: 13.5px;
  color: var(--sm-muted);
}
.pw__result {
  align-items: flex-start;
}
.pw__summary {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  padding: 16px 18px;
  border-radius: 16px;
  background: var(--sm-surface-subtle);
}
.pw__summary div {
  display: grid;
  grid-template-columns: 160px minmax(0, 1fr);
  gap: 12px;
  font-size: 15px;
}
.pw__summary dt {
  color: var(--sm-muted);
}
.pw__summary dd {
  font-weight: 600;
}
.pw__message {
  font-size: 16px;
  line-height: 1.6;
  color: var(--sm-text-2);
  max-width: 620px;
}
.pw__result-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.pw__privacy {
  font-size: 13px;
  color: var(--sm-muted);
  max-width: 620px;
}
.pw__nav--result {
  width: 100%;
}
@media (max-width: 900px) {
  .pw__cards--3 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 560px) {
  .pw {
    border-radius: var(--sm-r-card);
  }
  .pw__cards--3 {
    grid-template-columns: minmax(0, 1fr);
  }
  .pw__steps li {
    flex: none;
  }
  .pw__step-label {
    display: none;
  }
  .pw__steps .is-current .pw__step-label {
    display: inline;
  }
  .pw__summary div {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
  }
  .pw__nav .sm-btn--primary {
    flex: 1;
  }
  .pw__spacer {
    display: none;
  }
  .pw__hint {
    width: 100%;
    order: -1;
  }
  .pw__result-ctas > * {
    width: 100%;
  }
}
</style>
