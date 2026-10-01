<script setup lang="ts">
import { computed } from 'vue'
import { Head, useForm, usePage } from '@inertiajs/vue3'
import { Link } from '@adonisjs/inertia/vue'
import { ArrowLeft } from 'lucide-vue-next'
import type { Data } from '@generated/data'
import type { AdminLeadOptions, LeadStatus } from '#config/leads'
import type { LeadAttribution } from '@shared/journey'
import VisitorJourney from '~/components/admin/visitor_journey.vue'
import TouchDetails from '~/components/admin/touch_details.vue'
import { urlFor } from '~/client'
import Page from '~/components/page.vue'
import AppLayout from '~/layouts/app.vue'
import {
  formatDateTime,
  interestLabel,
  labelFor,
  moduleLabels,
} from '~/components/admin/lead_format'

const props = defineProps<{
  lead: Data.DemoRequest.Variants['forDetail']
  activities: Data.DemoRequestActivity[]
  options: AdminLeadOptions
  attribution: LeadAttribution
}>()

const page = usePage()
const statusForm = useForm({ status: props.lead.status as LeadStatus })
const noteForm = useForm({ body: '' })

function updateStatus() {
  statusForm.patch(urlFor('admin.demo_requests.update_status', { id: props.lead.id }), {
    preserveScroll: true,
  })
}

function addNote() {
  noteForm.post(urlFor('admin.demo_requests.notes.store', { id: props.lead.id }), {
    preserveScroll: true,
    onSuccess: () => noteForm.reset(),
  })
}

const milestones = computed(() => [
  { label: 'Created', at: props.lead.createdAt },
  { label: 'Contacted', at: props.lead.contactedAt },
  { label: 'Qualified', at: props.lead.qualifiedAt },
  { label: 'Demo scheduled', at: props.lead.demoScheduledAt },
  { label: 'Converted', at: props.lead.convertedAt },
  { label: 'Closed', at: props.lead.closedAt },
])

const estimate = computed(() => props.lead.pricingEstimateSnapshot)

/**
 * What the lead is about. Demo and estimate requests (and every lead from
 * before the services pages) have no service interests: software inquiry.
 */
const inquiryRows = computed(() => {
  const details = props.lead.serviceDetails
  return [
    {
      label: 'Interest',
      value: interestLabel(props.options, props.lead.interestCategory, props.lead.serviceInterests),
    },
    {
      label: 'Topics chosen',
      value: listOf(props.options.serviceInterests, props.lead.serviceInterests ?? undefined),
    },
    ...(details?.productStage
      ? [
          {
            label: 'Product stage',
            value: labelFor(props.options.productStages, details.productStage),
          },
        ]
      : []),
    ...(details?.targetLaunch
      ? [
          {
            label: 'Target launch',
            value: labelFor(props.options.targetLaunches, details.targetLaunch),
          },
        ]
      : []),
    /* the integration consultation (/integrations) */
    ...(details?.integrationNeeds?.length
      ? [
          {
            label: 'Integration areas',
            value: listOf(props.options.integrationNeeds, details.integrationNeeds),
          },
        ]
      : []),
    ...(details?.apiDocumentation
      ? [
          {
            label: 'API / documentation',
            value: labelFor(props.options.apiDocumentationAnswers, details.apiDocumentation),
          },
        ]
      : []),
    ...(details?.existingSystem
      ? [{ label: 'Existing system', value: details.existingSystem }]
      : []),
  ]
})

const listOf = (list: { value: string; label: string }[], values: string[] | undefined) =>
  values?.length ? values.map((value) => labelFor(list, value)).join(', ') : '—'

const estimateRows = computed(() => {
  const answers = estimate.value
  if (!answers) return []
  return [
    { label: 'Business type', value: labelFor(props.options.businessTypes, answers.businessType) },
    { label: 'Active members', value: labelFor(props.options.memberRanges, answers.activeMembers) },
    {
      label: 'Current system',
      value: labelFor(props.options.currentSystems, answers.currentSystem),
    },
    { label: 'Modules', value: moduleLabels(props.options, answers.modules) },
    {
      label: 'Compensation',
      value: labelFor(props.options.compensationComplexities, answers.compensationComplexity),
    },
    {
      label: 'Data migration',
      value: listOf(props.options.migrationScopes, answers.dataMigration),
    },
    { label: 'Integrations', value: listOf(props.options.integrationNeeds, answers.integrations) },
  ]
})

/** WhatsApp intents of this lead that were about something else than its purpose. */
const earlierIntents = computed(() =>
  props.attribution.whatsapp.filter(
    (intent) => intent.interest !== props.attribution.purpose.primary
  )
)

const whatsapp = computed(() =>
  props.lead.phone ? `https://wa.me/${props.lead.phone.replace(/\D/g, '')}` : null
)

const statusLabel = (value: string | null) => labelFor(props.options.statuses, value)
</script>

<template>
  <AppLayout>
    <Head :title="`${lead.fullName} · Leads`">
      <meta name="robots" content="noindex, nofollow" />
    </Head>
    <Page :title="lead.fullName" :description="lead.company" class="page--wide">
      <template #actions>
        <span class="badge" :class="`badge--${lead.status}`">{{ statusLabel(lead.status) }}</span>
        <Link route="admin.demo_requests.index" class="btn btn--secondary btn--sm">
          <ArrowLeft :size="15" /> All leads
        </Link>
      </template>

      <div class="detail-grid">
        <div class="detail-stack">
          <section class="panel purpose" aria-labelledby="purpose-title">
            <h2 id="purpose-title" class="section__title">Contact purpose</h2>
            <p class="purpose__primary">{{ attribution.purpose.primary }}</p>
            <p v-if="attribution.purpose.additional.length" class="purpose__also">
              {{ attribution.purpose.primaryKey === 'multiple' ? '' : 'Also: '
              }}{{ attribution.purpose.additional.join(', ') }}
            </p>
            <p class="section__description">
              {{ attribution.conversion.form }}
              <template v-if="attribution.conversion.page">
                · sent from {{ attribution.conversion.page }}</template
              >
              · {{ formatDateTime(attribution.conversion.at) }}
            </p>
            <dl v-if="attribution.journey || attribution.whatsapp.length" class="purpose__facts">
              <template v-if="attribution.journey">
                <dt>Explicit interest</dt>
                <dd>
                  {{
                    attribution.journey.explicit.length
                      ? attribution.journey.explicit.map((item) => item.interest).join(', ')
                      : '—'
                  }}
                </dd>
                <dt>Also viewed</dt>
                <dd>
                  {{
                    attribution.journey.viewed.length ? attribution.journey.viewed.join(', ') : '—'
                  }}
                </dd>
              </template>
              <template v-if="earlierIntents.length">
                <dt>Earlier WhatsApp intent</dt>
                <dd>
                  <span v-for="intent in earlierIntents" :key="intent.id" class="purpose__intent">
                    {{ intent.interest }} · Ref {{ intent.reference }}
                  </span>
                </dd>
              </template>
            </dl>
          </section>

          <section
            v-if="attribution.whatsapp.length"
            class="panel"
            aria-labelledby="whatsapp-title"
          >
            <h2 id="whatsapp-title" class="section__title">WhatsApp intents</h2>
            <p class="section__description">
              WhatsApp clicks linked to this lead. A click is not a conversation: confirm it on the
              intent once sales has actually spoken with them.
            </p>
            <ul class="intents">
              <li v-for="intent in attribution.whatsapp" :key="intent.id">
                <div>
                  <b>Ref {{ intent.reference }}</b> · {{ intent.interest }}
                  <small>
                    {{ formatDateTime(intent.at) }} ·
                    {{ intent.linkMethod === 'manual' ? 'linked by sales' : 'same browser' }}
                  </small>
                </div>
                <span class="badge" :class="{ 'badge--converted': intent.contacted }">
                  {{ intent.contacted ? 'Conversation confirmed' : 'Not confirmed' }}
                </span>
                <Link
                  route="admin.marketing.whatsapp.show"
                  :params="{ id: intent.id }"
                  class="btn btn--ghost btn--sm"
                >
                  Open
                </Link>
              </li>
            </ul>
          </section>

          <section class="panel" aria-labelledby="contact-title">
            <h2 id="contact-title" class="section__title">Contact</h2>
            <dl class="detail-list">
              <dt>Name</dt>
              <dd>{{ lead.fullName }}</dd>
              <dt>Company</dt>
              <dd>{{ lead.company }}</dd>
              <dt>Email</dt>
              <dd>
                <a :href="`mailto:${lead.email}`">{{ lead.email }}</a>
              </dd>
              <dt>Phone</dt>
              <dd>
                <template v-if="lead.phone">
                  <a :href="`tel:${lead.phone}`">{{ lead.phone }}</a>
                  ·
                  <a :href="whatsapp!" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                </template>
                <template v-else>—</template>
              </dd>
            </dl>
          </section>

          <section class="panel" aria-labelledby="inquiry-title">
            <h2 id="inquiry-title" class="section__title">Inquiry</h2>
            <dl class="detail-list">
              <template v-for="row in inquiryRows" :key="row.label">
                <dt>{{ row.label }}</dt>
                <dd>{{ row.value }}</dd>
              </template>
              <dt>Source</dt>
              <dd>{{ labelFor(options.sources, lead.source) }}</dd>
            </dl>
          </section>

          <section class="panel" aria-labelledby="business-title">
            <h2 id="business-title" class="section__title">Business</h2>
            <dl class="detail-list">
              <dt>Business type</dt>
              <dd>{{ labelFor(options.businessTypes, lead.businessType) }}</dd>
              <dt>Active members</dt>
              <dd>{{ labelFor(options.memberRanges, lead.activeMembers) }}</dd>
              <dt>Modules of interest</dt>
              <dd>{{ moduleLabels(options, lead.selectedModulesSnapshot) }}</dd>
              <dt>Estimator</dt>
              <dd>{{ estimate ? 'Answers below' : 'Not used' }}</dd>
            </dl>
            <template v-if="estimate">
              <h3 class="section__title" :style="{ marginTop: '20px' }">Estimator answers</h3>
              <dl class="detail-list">
                <template v-for="row in estimateRows" :key="row.label">
                  <dt>{{ row.label }}</dt>
                  <dd>{{ row.value }}</dd>
                </template>
              </dl>
            </template>
            <template v-if="lead.message">
              <h3 class="section__title" :style="{ marginTop: '20px' }">Message</h3>
              <p class="detail-message">{{ lead.message }}</p>
            </template>
          </section>

          <section class="panel" aria-labelledby="acquisition-title">
            <h2 id="acquisition-title" class="section__title">Acquisition</h2>
            <p class="section__description">
              {{
                attribution.acquisition.fromSnapshot
                  ? 'Saved when the lead was created; later tracking changes or cleanup never alter it.'
                  : 'This lead predates acquisition snapshots: only its own last touch is known.'
              }}
            </p>
            <h3 class="section__subtitle">First touch</h3>
            <TouchDetails
              :touch="attribution.acquisition.first"
              show-date
              empty="Not recorded: first-party tracking was off for this visitor, or the lead predates it."
            />
            <h3 class="section__subtitle">Last session before the form</h3>
            <TouchDetails :touch="attribution.acquisition.last" show-date />
            <h3 class="section__subtitle">Conversion</h3>
            <dl class="detail-list">
              <dt>Sent from</dt>
              <dd>{{ attribution.acquisition.conversionPage || '—' }}</dd>
              <dt>Form source</dt>
              <dd>{{ labelFor(options.sources, lead.source) }}</dd>
              <template v-if="attribution.acquisition.visitor">
                <dt>Visitor</dt>
                <dd>{{ attribution.acquisition.visitor }}</dd>
              </template>
            </dl>
          </section>

          <section v-if="attribution.journey" class="panel" aria-labelledby="journey-title">
            <div class="journey-head">
              <h2 id="journey-title" class="section__title">Visitor journey</h2>
              <Link
                v-if="page.props.permissions?.viewMarketing"
                route="admin.marketing.visitor"
                :params="{ uuid: attribution.journey.visitor.uuid }"
                class="btn btn--ghost btn--sm"
              >
                Visitor {{ attribution.journey.visitor.shortId }}
              </Link>
            </div>
            <p class="section__description">
              From the first visit to the form, then any sales contact.
            </p>
            <VisitorJourney :journey="attribution.journey" hide-interest />
          </section>
        </div>

        <div class="detail-stack">
          <section class="panel" aria-labelledby="status-title">
            <h2 id="status-title" class="section__title">Lead status</h2>
            <form
              class="section__body"
              :style="{ marginTop: '14px' }"
              @submit.prevent="updateStatus"
            >
              <div class="field">
                <label class="field__label" for="lead-status">Status</label>
                <select
                  id="lead-status"
                  v-model="statusForm.status"
                  class="field__input field__select"
                  :aria-invalid="statusForm.errors.status ? 'true' : 'false'"
                  :aria-describedby="statusForm.errors.status ? 'lead-status-error' : undefined"
                >
                  <option v-for="item in options.statuses" :key="item.value" :value="item.value">
                    {{ item.label }}
                  </option>
                </select>
                <span v-if="statusForm.errors.status" id="lead-status-error" class="field__error">
                  {{ statusForm.errors.status }}
                </span>
              </div>
              <button
                type="submit"
                class="btn btn--primary btn--block"
                :disabled="statusForm.processing || statusForm.status === lead.status"
              >
                {{ statusForm.processing ? 'Saving…' : 'Update status' }}
              </button>
            </form>
            <ul class="milestones" aria-label="Lifecycle">
              <li v-for="item in milestones" :key="item.label" :data-done="Boolean(item.at)">
                <span>{{ item.label }}</span>
                <time v-if="item.at" :datetime="item.at">{{ formatDateTime(item.at) }}</time>
                <span v-else>—</span>
              </li>
            </ul>
          </section>

          <section class="panel" aria-labelledby="notes-title">
            <h2 id="notes-title" class="section__title">Internal notes</h2>
            <p class="section__description">Visible to the sales team only.</p>
            <form class="section__body" :style="{ marginTop: '14px' }" @submit.prevent="addNote">
              <div class="field">
                <label class="field__label sr-only" for="lead-note">New note</label>
                <textarea
                  id="lead-note"
                  v-model="noteForm.body"
                  class="field__input"
                  rows="3"
                  placeholder="Call summary, next steps, objections…"
                  :aria-invalid="noteForm.errors.body ? 'true' : 'false'"
                  :aria-describedby="noteForm.errors.body ? 'lead-note-error' : undefined"
                />
                <span v-if="noteForm.errors.body" id="lead-note-error" class="field__error">
                  {{ noteForm.errors.body }}
                </span>
              </div>
              <button
                type="submit"
                class="btn btn--secondary btn--block"
                :disabled="noteForm.processing || !noteForm.body.trim()"
              >
                {{ noteForm.processing ? 'Adding…' : 'Add note' }}
              </button>
            </form>

            <h3 class="section__title" :style="{ marginTop: '24px' }">History</h3>
            <p v-if="!activities.length" class="section__description">
              No notes, emails or status changes yet.
            </p>
            <ol v-else class="timeline">
              <li v-for="item in activities" :key="item.id" :data-type="item.type">
                <div>
                  <template v-if="item.type === 'status_changed'">
                    Status changed from <b>{{ statusLabel(item.fromStatus) }}</b> to
                    <b>{{ statusLabel(item.toStatus) }}</b>
                  </template>
                  <template v-else-if="item.type === 'note'">Note</template>
                  <template v-else>{{ item.body }}</template>
                </div>
                <div class="timeline__meta">
                  {{ item.author }} ·
                  <time :datetime="item.createdAt ?? undefined">{{
                    formatDateTime(item.createdAt)
                  }}</time>
                </div>
                <p v-if="item.type === 'note' && item.body" class="timeline__body">
                  {{ item.body }}
                </p>
                <p v-if="item.type === 'notification_failed'" class="field__error">
                  Retry with <code>node ace leads:notify {{ lead.id }}</code> once mail is working.
                </p>
              </li>
            </ol>
          </section>
        </div>
      </div>
    </Page>
  </AppLayout>
</template>

<style scoped>
.purpose__primary {
  margin-top: 8px;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.01em;
}
.purpose__also {
  margin-top: 2px;
  font-size: 14px;
  font-weight: 600;
}
.purpose__facts {
  display: grid;
  grid-template-columns: max-content minmax(0, 1fr);
  gap: 6px 16px;
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid var(--line);
  font-size: 14px;
}
.purpose__facts dt {
  color: var(--muted);
}
.purpose__intent {
  display: block;
}
.intents {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 12px;
}
.intents li {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 12px;
  font-size: 14px;
}
.intents li > div {
  flex: 1 1 220px;
}
.intents small {
  display: block;
  font-size: 12.5px;
  color: var(--muted);
}
@media (max-width: 560px) {
  .purpose__facts {
    grid-template-columns: minmax(0, 1fr);
    gap: 2px;
  }
  .purpose__facts dd + dt {
    margin-top: 8px;
  }
}
.section__subtitle {
  margin: 14px 0 4px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--muted);
}
.journey-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
</style>
