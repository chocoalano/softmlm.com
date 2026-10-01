<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useForm } from '@inertiajs/vue3'
import {
  ArrowRight,
  CalendarCheck,
  CircleCheck,
  MessagesSquare,
  Presentation,
} from 'lucide-vue-next'
import { urlFor } from '~/client'
import { vReveal } from '~/composables/reveal'
import { demoPrefill } from '~/composables/demo_request'
import NetworkOrb from '~/components/site/network_orb.vue'
import MarketingWhatsappCta from '~/components/site/marketing_whatsapp_cta.vue'
import { useCopy, useI18n } from '~/i18n'
import { track } from '@shared/analytics'
import type { WhatsappContext } from '@shared/whatsapp'
import type { ServiceInterest } from '@shared/services'
import { PRIVACY_PATH } from '@shared/legal'
import type {
  ApiDocumentationAnswer,
  BusinessType,
  IntegrationNeed,
  LeadModule,
  LeadSource,
  MemberRange,
  PricingEstimateSnapshot,
  ProductStage,
  PublicLeadOptions,
  SecurityTopic,
  TargetLaunch,
} from '#config/leads'

/**
 * The one lead form of the marketing site, on the same secure endpoint.
 * `mode="demo"` (software pages): Book a Demo. `mode="consultation"`
 * (services pages): Request a Consultation, with the topics to discuss
 * (`interests` preselects the page's own service) and, on the maklon page,
 * a short optional product block. `mode="integration"` (/integrations): an
 * integration consultation with the areas to connect, whether an API or
 * documentation exists, and the system's name; never credentials.
 * `mode="security"` (/security): a security consultation with the topics to
 * discuss; never credentials or security details.
 */
const props = withDefaults(
  defineProps<{
    options: PublicLeadOptions
    source?: LeadSource
    title?: string
    text?: string
    context?: WhatsappContext
    page?: string
    mode?: 'demo' | 'consultation' | 'integration' | 'security'
    interests?: ServiceInterest[]
    productQuestions?: boolean
  }>(),
  {
    source: 'homepage_demo',
    title: undefined,
    text: undefined,
    context: 'general',
    page: 'homepage',
    mode: 'demo',
    interests: () => [],
    productQuestions: false,
  }
)

const t = useCopy('common')
const { locale, lp } = useI18n()
const integration = computed(() => props.mode === 'integration')
const security = computed(() => props.mode === 'security')
/** The services, integration and security consultations ask no software questions. */
const consultation = computed(() => props.mode !== 'demo')
/** The copy of this form's mode; field labels are shared. */
const copy = computed(() => {
  if (integration.value) return t.value.integrationConsultation
  if (security.value) return t.value.securityConsultation
  return consultation.value ? t.value.consultation : t.value.demo
})
const formId = computed(() => (consultation.value ? 'consultation' : 'demo'))
/** The areas a visitor can tick; "not sure" is simply ticking nothing. */
const integrationNeedOptions = computed(() =>
  props.options.integrationNeeds.filter((item) => item.value !== 'unsure')
)

const form = useForm({
  fullName: '',
  email: '',
  company: '',
  phone: '',
  businessType: '' as BusinessType | '',
  activeMembers: '' as MemberRange | '',
  modules: [] as LeadModule[],
  message: '',
  source: props.source as LeadSource,
  pricingEstimate: null as PricingEstimateSnapshot | null,
  serviceInterests: [...props.interests] as ServiceInterest[],
  productStage: '' as ProductStage | '',
  targetLaunch: '' as TargetLaunch | '',
  integrationNeeds: [] as IntegrationNeed[],
  apiDocumentation: '' as ApiDocumentationAnswer | '',
  existingSystem: '',
  securityTopics: [] as SecurityTopic[],
  /** Only chooses the language of the messages the server answers with. */
  locale: locale.value,
  website: '',
})

/**
 * A demo request sends only the software fields; a consultation sends the
 * topics and, when given, the product answers; an integration consultation
 * sends the integration answers it was given.
 */
form.transform(
  ({
    serviceInterests,
    productStage,
    targetLaunch,
    integrationNeeds,
    apiDocumentation,
    existingSystem,
    securityTopics,
    ...data
  }) => {
    if (!consultation.value) return data
    const { businessType, activeMembers, modules, pricingEstimate, ...contact } = data
    if (security.value) {
      return {
        ...contact,
        ...(securityTopics.length ? { serviceDetails: { securityTopics } } : {}),
      }
    }
    if (integration.value) {
      const system = existingSystem.trim()
      const details = {
        ...(integrationNeeds.length ? { integrationNeeds } : {}),
        ...(apiDocumentation ? { apiDocumentation } : {}),
        ...(system ? { existingSystem: system } : {}),
      }
      return { ...contact, ...(Object.keys(details).length ? { serviceDetails: details } : {}) }
    }
    const details = {
      ...(productStage ? { productStage } : {}),
      ...(targetLaunch ? { targetLaunch } : {}),
    }
    return {
      ...contact,
      serviceInterests,
      ...(Object.keys(details).length ? { serviceDetails: details } : {}),
    }
  }
)

/**
 * The first interaction with the form (focus), once per page load. Only
 * that the form was started is recorded, never what is typed.
 */
let started = false
function onFormFocus() {
  if (started) return
  started = true
  if (consultation.value) {
    track('consultation_form_started', {
      page: props.page,
      locale: locale.value,
      interest: integration.value
        ? 'integration'
        : security.value
          ? 'security'
          : props.interests[0],
    })
  } else {
    track('demo_form_started', { page: props.page, locale: locale.value })
  }
}

/** A visitor ticking a topic is an explicit interest in that service. */
function onTopic(event: Event, value: ServiceInterest) {
  if ((event.target as HTMLInputElement).checked) {
    track('service_interest', { service: value, page: props.page, locale: locale.value })
  }
}

const submitted = ref(false)
const nameInput = ref<HTMLInputElement>()

const moduleLabels = computed(() =>
  form.modules
    .map((value) => props.options.modules.find((item) => item.value === value)?.label ?? value)
    .join(', ')
)

/**
 * Answers from the pricing estimator land here, so the visitor only has to
 * add their contact details. The answers are also kept as a snapshot, and
 * the lead is attributed to the estimator.
 */
watch(
  () => demoPrefill.version,
  () => {
    const snapshot = demoPrefill.snapshot
    form.businessType = snapshot.businessType ?? ''
    form.activeMembers = snapshot.activeMembers ?? ''
    form.modules = [...(snapshot.modules ?? [])]
    form.source = demoPrefill.source
    form.pricingEstimate = { ...snapshot }
    submitted.value = false
    setTimeout(() => nameInput.value?.focus({ preventScroll: true }), 600)
  }
)

function submit() {
  form.post(urlFor('demo_requests.store'), {
    preserveScroll: true,
    onSuccess: (page) => {
      /**
       * The server answers a failed save or a rate limit with a flashed
       * error on a normal redirect: keep the form filled in.
       */
      if (page.flash?.error) return
      form.reset()
      form.serviceInterests = [...props.interests]
      submitted.value = true
    },
  })
}

const expectationIcons = [MessagesSquare, Presentation, CalendarCheck]
const expectations = computed(() =>
  copy.value.expectations.map((text, i) => ({ text, icon: expectationIcons[i] }))
)
</script>

<template>
  <section :id="formId" class="sm-section dr">
    <div class="sm-container">
      <div class="dr__panel">
        <div class="dr__orb" aria-hidden="true"><NetworkOrb tone="dark" :nodes="100" /></div>

        <div class="dr__copy">
          <span v-reveal class="sm-eyebrow">{{ copy.eyebrow }}</span>
          <h2 v-reveal="60" class="sm-h2">{{ title ?? copy.title }}</h2>
          <p v-reveal="120" class="sm-lead">{{ text ?? copy.text }}</p>
          <div v-reveal="160" class="dr__primary">
            <MarketingWhatsappCta
              :context="context"
              :page="page"
              section="final_cta"
              variant="primary"
              size="lg"
            />
            <span class="dr__or">{{ copy.or }}</span>
          </div>
          <ul v-reveal="180" class="dr__list">
            <li v-for="item in expectations" :key="item.text">
              <span class="sm-icon-tile sm-icon-tile--sm"
                ><component :is="item.icon" :size="17"
              /></span>
              {{ item.text }}
            </li>
          </ul>
        </div>

        <div v-reveal="120" class="dr__card">
          <div v-if="submitted" class="dr__success" role="status">
            <span class="dr__success-icon"><CircleCheck :size="28" /></span>
            <h3 class="sm-h3">{{ copy.success.title }}</h3>
            <p class="sm-body">{{ copy.success.text }}</p>
            <button type="button" class="sm-btn sm-btn--light" @click="submitted = false">
              {{ copy.success.again }}
            </button>
          </div>

          <form
            v-else
            class="dr__form"
            novalidate
            :aria-labelledby="`${formId}-form-title`"
            @focusin="onFormFocus"
            @submit.prevent="submit"
          >
            <div class="dr__form-head">
              <h3 :id="`${formId}-form-title`" class="sm-h4">{{ copy.form.title }}</h3>
              <p>{{ copy.form.text }}</p>
            </div>
            <div class="dr__row">
              <div class="dr__field">
                <label for="demo-name">{{ t.demo.form.name }}</label>
                <input
                  id="demo-name"
                  ref="nameInput"
                  v-model="form.fullName"
                  type="text"
                  autocomplete="name"
                  :placeholder="t.demo.form.namePlaceholder"
                  required
                  :aria-invalid="form.errors.fullName ? 'true' : 'false'"
                  :aria-describedby="form.errors.fullName ? 'demo-name-error' : undefined"
                />
                <span v-if="form.errors.fullName" id="demo-name-error" class="dr__error">{{
                  form.errors.fullName
                }}</span>
              </div>
              <div class="dr__field">
                <label for="demo-email">{{ t.demo.form.email }}</label>
                <input
                  id="demo-email"
                  v-model="form.email"
                  type="email"
                  autocomplete="email"
                  :placeholder="t.demo.form.emailPlaceholder"
                  required
                  :aria-invalid="form.errors.email ? 'true' : 'false'"
                  :aria-describedby="form.errors.email ? 'demo-email-error' : undefined"
                />
                <span v-if="form.errors.email" id="demo-email-error" class="dr__error">{{
                  form.errors.email
                }}</span>
              </div>
            </div>

            <div class="dr__row">
              <div class="dr__field">
                <label for="demo-company">{{ t.demo.form.company }}</label>
                <input
                  id="demo-company"
                  v-model="form.company"
                  type="text"
                  autocomplete="organization"
                  :placeholder="t.demo.form.companyPlaceholder"
                  required
                  :aria-invalid="form.errors.company ? 'true' : 'false'"
                  :aria-describedby="form.errors.company ? 'demo-company-error' : undefined"
                />
                <span v-if="form.errors.company" id="demo-company-error" class="dr__error">{{
                  form.errors.company
                }}</span>
              </div>
              <div class="dr__field">
                <label for="demo-phone"
                  >{{ t.demo.form.phone }} <small>{{ t.demo.form.optional }}</small></label
                >
                <input
                  id="demo-phone"
                  v-model="form.phone"
                  type="tel"
                  autocomplete="tel"
                  :placeholder="t.demo.form.phonePlaceholder"
                  :aria-invalid="form.errors.phone ? 'true' : 'false'"
                  :aria-describedby="form.errors.phone ? 'demo-phone-error' : undefined"
                />
                <span v-if="form.errors.phone" id="demo-phone-error" class="dr__error">{{
                  form.errors.phone
                }}</span>
              </div>
            </div>

            <fieldset
              v-if="consultation && !integration && !security"
              class="dr__topics"
              :aria-describedby="
                form.errors.serviceInterests ? 'demo-topics-error' : 'demo-topics-hint'
              "
            >
              <legend>{{ t.consultation.form.topics }}</legend>
              <span id="demo-topics-hint" class="dr__hint">{{
                t.consultation.form.topicsHint
              }}</span>
              <div class="dr__chips">
                <label v-for="item in options.serviceInterests" :key="item.value" class="dr__chip">
                  <input
                    v-model="form.serviceInterests"
                    type="checkbox"
                    :value="item.value"
                    @change="onTopic($event, item.value)"
                  />
                  <span>{{ item.label }}</span>
                </label>
              </div>
              <span v-if="form.errors.serviceInterests" id="demo-topics-error" class="dr__error">{{
                form.errors.serviceInterests
              }}</span>
            </fieldset>

            <fieldset v-if="consultation && productQuestions" class="dr__product">
              <legend>
                {{ t.consultation.form.product.legend }} <small>{{ t.demo.form.optional }}</small>
              </legend>
              <div class="dr__row">
                <div class="dr__field">
                  <label for="demo-stage">{{ t.consultation.form.product.stage }}</label>
                  <select id="demo-stage" v-model="form.productStage">
                    <option value="">{{ t.demo.form.select }}</option>
                    <option
                      v-for="item in options.productStages"
                      :key="item.value"
                      :value="item.value"
                    >
                      {{ item.label }}
                    </option>
                  </select>
                </div>
                <div class="dr__field">
                  <label for="demo-launch">{{ t.consultation.form.product.launch }}</label>
                  <select id="demo-launch" v-model="form.targetLaunch">
                    <option value="">{{ t.demo.form.select }}</option>
                    <option
                      v-for="item in options.targetLaunches"
                      :key="item.value"
                      :value="item.value"
                    >
                      {{ item.label }}
                    </option>
                  </select>
                </div>
              </div>
            </fieldset>

            <fieldset v-if="security" class="dr__topics" aria-describedby="demo-security-hint">
              <legend>
                {{ t.securityConsultation.form.topics }}
                <small>{{ t.demo.form.optional }}</small>
              </legend>
              <span id="demo-security-hint" class="dr__hint">{{
                t.securityConsultation.form.topicsHint
              }}</span>
              <div class="dr__chips">
                <label v-for="item in options.securityTopics" :key="item.value" class="dr__chip">
                  <input v-model="form.securityTopics" type="checkbox" :value="item.value" />
                  <span>{{ item.label }}</span>
                </label>
              </div>
            </fieldset>

            <template v-if="integration">
              <fieldset class="dr__topics" aria-describedby="demo-needs-hint">
                <legend>
                  {{ t.integrationConsultation.form.needs }}
                  <small>{{ t.demo.form.optional }}</small>
                </legend>
                <span id="demo-needs-hint" class="dr__hint">{{
                  t.integrationConsultation.form.needsHint
                }}</span>
                <div class="dr__chips">
                  <label v-for="item in integrationNeedOptions" :key="item.value" class="dr__chip">
                    <input v-model="form.integrationNeeds" type="checkbox" :value="item.value" />
                    <span>{{ item.label }}</span>
                  </label>
                </div>
              </fieldset>

              <fieldset class="dr__topics">
                <legend>
                  {{ t.integrationConsultation.form.api }} <small>{{ t.demo.form.optional }}</small>
                </legend>
                <div class="dr__chips">
                  <label
                    v-for="item in options.apiDocumentationAnswers"
                    :key="item.value"
                    class="dr__chip"
                  >
                    <input
                      v-model="form.apiDocumentation"
                      type="radio"
                      name="api-documentation"
                      :value="item.value"
                    />
                    <span>{{ item.label }}</span>
                  </label>
                </div>
              </fieldset>

              <div class="dr__field">
                <label for="demo-system"
                  >{{ t.integrationConsultation.form.system }}
                  <small>{{ t.demo.form.optional }}</small></label
                >
                <input
                  id="demo-system"
                  v-model="form.existingSystem"
                  type="text"
                  maxlength="120"
                  autocomplete="off"
                  :placeholder="t.integrationConsultation.form.systemPlaceholder"
                />
              </div>
            </template>

            <div v-if="!consultation" class="dr__row">
              <div class="dr__field">
                <label for="demo-business">{{ t.demo.form.businessType }}</label>
                <select
                  id="demo-business"
                  v-model="form.businessType"
                  :aria-invalid="form.errors.businessType ? 'true' : 'false'"
                  :aria-describedby="form.errors.businessType ? 'demo-business-error' : undefined"
                >
                  <option value="">{{ t.demo.form.select }}</option>
                  <option
                    v-for="item in props.options.businessTypes"
                    :key="item.value"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </option>
                </select>
                <span v-if="form.errors.businessType" id="demo-business-error" class="dr__error">{{
                  form.errors.businessType
                }}</span>
              </div>
              <div class="dr__field">
                <label for="demo-members">{{ t.demo.form.activeMembers }}</label>
                <select
                  id="demo-members"
                  v-model="form.activeMembers"
                  :aria-invalid="form.errors.activeMembers ? 'true' : 'false'"
                  :aria-describedby="form.errors.activeMembers ? 'demo-members-error' : undefined"
                >
                  <option value="">{{ t.demo.form.select }}</option>
                  <option
                    v-for="item in props.options.memberRanges"
                    :key="item.value"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </option>
                </select>
                <span v-if="form.errors.activeMembers" id="demo-members-error" class="dr__error">{{
                  form.errors.activeMembers
                }}</span>
              </div>
            </div>

            <p v-if="!consultation && form.modules.length" class="dr__modules">
              <span>{{ t.demo.form.modules }}</span> {{ moduleLabels }}
            </p>

            <div class="dr__field">
              <label for="demo-message"
                >{{ consultation ? copy.form.message : t.demo.form.message }}
                <small>{{ t.demo.form.optional }}</small></label
              >
              <textarea
                id="demo-message"
                v-model="form.message"
                rows="3"
                :aria-describedby="integration || security ? 'demo-credentials' : undefined"
                :placeholder="
                  consultation ? copy.form.messagePlaceholder : t.demo.form.messagePlaceholder
                "
              />
            </div>

            <p v-if="integration || security" id="demo-credentials" class="dr__note">
              {{
                security
                  ? t.securityConsultation.form.credentials
                  : t.integrationConsultation.form.credentials
              }}
            </p>

            <div class="dr__hp" aria-hidden="true">
              <label for="demo-website">Website</label>
              <input
                id="demo-website"
                v-model="form.website"
                type="text"
                tabindex="-1"
                autocomplete="off"
              />
            </div>

            <button
              type="submit"
              class="sm-btn sm-btn--dark sm-btn--block"
              :disabled="form.processing"
            >
              {{
                form.processing
                  ? t.demo.form.sending
                  : consultation
                    ? copy.form.submit
                    : t.demo.form.submit
              }}
              <ArrowRight v-if="!form.processing" :size="18" class="sm-btn__arrow" />
            </button>
            <p class="dr__fine">
              {{ t.demo.form.consent }}
              <a :href="lp(PRIVACY_PATH)">{{ t.demo.form.privacyLink }}</a
              >.
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dr {
  padding-top: 0;
}
.dr__panel {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 560px);
  gap: clamp(32px, 5vw, 72px);
  align-items: center;
  padding: clamp(28px, 5vw, 72px);
  border-radius: 36px;
  overflow: hidden;
  isolation: isolate;
  color: #fff;
  background:
    radial-gradient(60% 80% at 0% 0%, rgba(0, 93, 251, 0.45), transparent 60%),
    radial-gradient(40% 50% at 100% 100%, rgba(2, 200, 250, 0.14), transparent 70%),
    var(--sm-surface-inverse);
  border: 1px solid var(--sm-inverse-edge);
}
.dr__orb {
  position: absolute;
  z-index: -1;
  width: 640px;
  left: -300px;
  bottom: -400px;
  opacity: 0.5;
}
.dr__copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}
.dr__copy .sm-eyebrow {
  color: var(--sm-tech);
}
.dr__copy .sm-lead {
  color: rgba(255, 255, 255, 0.7);
}
.dr__primary {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 16px;
  margin-top: 4px;
}
.dr__or {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}
.dr__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;
  font-size: 15.5px;
  color: rgba(255, 255, 255, 0.85);
}
.dr__list li {
  display: flex;
  align-items: center;
  gap: 12px;
}
.dr__list .sm-icon-tile {
  background: rgba(255, 255, 255, 0.1);
  color: var(--sm-tech);
}
.dr__card {
  padding: clamp(22px, 3vw, 36px);
  border-radius: 28px;
  background: var(--sm-surface);
  color: var(--sm-text);
  box-shadow: 0 40px 80px -30px rgba(0, 0, 0, 0.55);
}
.dr__form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.dr__form-head p {
  margin-top: 2px;
  font-size: 14px;
  color: var(--sm-muted);
}
.dr__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
.dr__field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}
.dr__field label {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--sm-text-2);
}
.dr__field small {
  font-weight: 400;
  color: var(--sm-muted);
}
.dr__field input,
.dr__field select,
.dr__field textarea {
  width: 100%;
  min-height: 46px;
  padding: 11px 14px;
  border-radius: 12px;
  border: 1px solid var(--sm-border-2);
  background: var(--sm-surface);
  font: inherit;
  font-size: 15px;
  color: var(--sm-text);
  transition:
    border-color 0.15s,
    box-shadow 0.15s;
}
.dr__field select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23676B74' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 38px;
}
.dr__field textarea {
  resize: vertical;
  min-height: 92px;
}
.dr__field input::placeholder,
.dr__field textarea::placeholder {
  color: var(--sm-muted);
  opacity: 0.85;
}
.dr__field input:focus,
.dr__field select:focus,
.dr__field textarea:focus {
  outline: none;
  border-color: var(--sm-primary-ink);
  box-shadow: 0 0 0 4px var(--sm-primary-50);
}
.dr__field [aria-invalid='true'] {
  border-color: var(--sm-danger);
}
.dr__error {
  font-size: 13px;
  color: var(--sm-danger);
}
.dr__topics,
.dr__product {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
  border: 0;
}
.dr__topics legend,
.dr__product legend {
  margin-bottom: 2px;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--sm-text-2);
}
.dr__product legend small {
  font-weight: 400;
  color: var(--sm-muted);
}
.dr__hint {
  font-size: 13px;
  color: var(--sm-muted);
}
.dr__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.dr__chip {
  position: relative;
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid var(--sm-border-2);
  background: var(--sm-surface);
  font-size: 14px;
  font-weight: 500;
  color: var(--sm-text-2);
  cursor: pointer;
  transition:
    background 0.15s,
    border-color 0.15s,
    color 0.15s;
}
/* the real checkbox covers the chip, so keyboard, touch and screen readers work */
.dr__chip input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: pointer;
}
/* ticked is shown by a check mark too, not by colour alone */
.dr__chip:has(input:checked)::before {
  content: '✓';
  margin-right: 6px;
  font-weight: 700;
}
.dr__chip:has(input:checked) {
  border-color: var(--sm-primary);
  background: var(--sm-primary-50);
  color: var(--sm-primary-ink);
  font-weight: 600;
}
.dr__chip:has(input:focus-visible) {
  outline: 2px solid var(--sm-primary-ink);
  outline-offset: 2px;
}
.dr__product {
  padding: 14px;
  border-radius: 14px;
  background: var(--sm-surface-subtle);
}
.dr__modules {
  padding: 12px 14px;
  border-radius: 12px;
  background: var(--sm-primary-50);
  font-size: 14px;
  color: var(--sm-text-2);
}
.dr__modules span {
  font-weight: 600;
  color: var(--sm-primary-ink);
}
.dr__hp {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
.dr__fine {
  font-size: 13px;
  color: var(--sm-subtle);
  text-align: center;
}
.dr__fine a {
  color: var(--sm-primary-ink);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.dr__note {
  padding: 10px 12px;
  border-radius: 10px;
  background: var(--sm-warn-bg);
  color: var(--sm-warn);
  font-size: 13.5px;
  line-height: 1.45;
}
.dr__success {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  padding: 16px 0;
}
.dr__success-icon {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: var(--sm-ok-bg);
  color: var(--sm-ok);
}
@media (max-width: 1080px) {
  .dr__panel {
    grid-template-columns: minmax(0, 1fr);
  }
}
@media (max-width: 560px) {
  .dr__panel {
    padding: 28px 18px 18px;
    border-radius: 28px;
    margin-inline: calc(var(--sm-gutter) * -0.5);
  }
  .dr__row {
    grid-template-columns: minmax(0, 1fr);
  }
  .dr__card {
    border-radius: 22px;
  }
}
</style>
