<script setup lang="ts">
/**
 * One WhatsApp intent, as sales needs it when a message quotes its
 * reference. The click alone proves nothing: sales confirms the
 * conversation ("Mark as contacted") and may link it to an existing lead.
 * Nothing here creates a lead or fills in who the visitor is.
 */
import { Head, useForm } from '@inertiajs/vue3'
import { Link } from '@adonisjs/inertia/vue'
import { ArrowLeft } from 'lucide-vue-next'
import type { TouchView, WhatsappIntentSummary } from '@shared/journey'
import Page from '~/components/page.vue'
import AppLayout from '~/layouts/app.vue'
import TouchDetails from '~/components/admin/touch_details.vue'
import { urlFor } from '~/client'
import { formatDateTime } from '~/components/admin/lead_format'

const props = defineProps<{
  intent: WhatsappIntentSummary & {
    context: string
    page: string | null
    section: string | null
    locale: string | null
    expiresAt: string | null
    resolvable: boolean
    contactedBy: string | null
  }
  first: TouchView | null
  last: TouchView | null
  otherExplicit: string[]
  alsoViewed: string[]
  visitorUuid: string | null
  lead: { id: number | null; name: string | null; company: string | null } | null
  canManageLeads: boolean
}>()

const contactForm = useForm({})
const linkForm = useForm({ lead: '' })
const params = { id: props.intent.id }

function markContacted() {
  contactForm.post(urlFor('admin.marketing.whatsapp.contacted', params), { preserveScroll: true })
}

function undoContacted() {
  contactForm.delete(urlFor('admin.marketing.whatsapp.uncontacted', params), {
    preserveScroll: true,
  })
}

function linkLead() {
  linkForm.post(urlFor('admin.marketing.whatsapp.link', params), {
    preserveScroll: true,
    onSuccess: () => linkForm.reset(),
  })
}

function unlinkLead() {
  linkForm.delete(urlFor('admin.marketing.whatsapp.unlink', params), { preserveScroll: true })
}
</script>

<template>
  <AppLayout>
    <Head :title="`Ref ${intent.reference} · WhatsApp intents`">
      <meta name="robots" content="noindex, nofollow" />
    </Head>
    <Page
      :title="`Ref ${intent.reference}`"
      description="A WhatsApp click from the site. Intent, not a lead: confirm the conversation once it has really taken place."
      class="page--wide"
    >
      <template #actions>
        <span class="badge" :class="{ 'badge--converted': intent.contacted }">
          {{ intent.contacted ? 'Conversation confirmed' : 'Not confirmed' }}
        </span>
        <Link route="admin.marketing.whatsapp.index" class="btn btn--secondary btn--sm">
          <ArrowLeft :size="15" /> All WhatsApp intents
        </Link>
      </template>

      <div class="detail-grid">
        <div class="detail-stack">
          <section class="panel" aria-labelledby="intent-title">
            <h2 id="intent-title" class="section__title">WhatsApp intent</h2>
            <p class="intent__interest">{{ intent.interest }}</p>
            <p v-if="!intent.resolvable" class="field__error" role="status">
              This reference expired on {{ formatDateTime(intent.expiresAt) }} and was never
              confirmed or linked, so the anonymous journey behind it is no longer shown.
            </p>
            <dl class="detail-list intent__facts">
              <dt>First touch</dt>
              <dd>{{ first?.source ?? '—' }}</dd>
              <dt>Campaign</dt>
              <dd>{{ first?.campaign ?? last?.campaign ?? '—' }}</dd>
              <dt>Landing page</dt>
              <dd>{{ last?.landingPage ?? first?.landingPage ?? '—' }}</dd>
              <template v-if="otherExplicit.length">
                <dt>Other explicit interest</dt>
                <dd>{{ otherExplicit.join(', ') }}</dd>
              </template>
              <dt>Also viewed</dt>
              <dd>{{ alsoViewed.length ? alsoViewed.join(', ') : '—' }}</dd>
              <dt>WhatsApp click</dt>
              <dd>
                {{ formatDateTime(intent.at) }}
                <small v-if="intent.page" class="intent__muted">
                  from {{ intent.page }}{{ intent.section ? ` (${intent.section})` : '' }}</small
                >
              </dd>
              <dt>Lead</dt>
              <dd>
                <template v-if="lead">
                  <Link v-if="lead.id" route="admin.demo_requests.show" :params="{ id: lead.id }"
                    >Lead #{{ lead.id }} · {{ lead.name }}, {{ lead.company }}</Link
                  >
                  <template v-else>Linked to a lead</template>
                  <small class="intent__muted">
                    {{
                      intent.linkMethod === 'manual'
                        ? 'linked by sales'
                        : 'the same browser sent a form'
                    }}</small
                  >
                </template>
                <template v-else>Not linked yet</template>
              </dd>
              <dt>Reference expires</dt>
              <dd>{{ formatDateTime(intent.expiresAt) }}</dd>
            </dl>
            <Link
              v-if="visitorUuid"
              route="admin.marketing.visitor"
              :params="{ uuid: visitorUuid }"
              class="btn btn--secondary btn--sm intent__journey"
            >
              Open the visitor journey
            </Link>
          </section>

          <section v-if="intent.resolvable" class="panel" aria-labelledby="touch-title">
            <h2 id="touch-title" class="section__title">Acquisition at the time of the click</h2>
            <h3 class="section__subtitle">First touch</h3>
            <TouchDetails :touch="first" show-date />
            <h3 class="section__subtitle">Session of the click</h3>
            <TouchDetails :touch="last" show-date />
          </section>
        </div>

        <div class="detail-stack">
          <section class="panel" aria-labelledby="sales-title">
            <h2 id="sales-title" class="section__title">Sales contact</h2>
            <p class="section__description">
              When a WhatsApp message quotes this reference: check the conversation really exists,
              link it to an existing lead if there is one, then mark it as contacted. If the person
              never sent a form, no lead is created from the click.
            </p>

            <template v-if="canManageLeads">
              <div class="intent__action">
                <template v-if="intent.contacted">
                  <p>
                    Confirmed {{ formatDateTime(intent.contactedAt) }}
                    <template v-if="intent.contactedBy"> by {{ intent.contactedBy }}</template>
                  </p>
                  <button
                    type="button"
                    class="btn btn--secondary btn--block"
                    :disabled="contactForm.processing"
                    @click="undoContacted"
                  >
                    Undo
                  </button>
                </template>
                <button
                  v-else
                  type="button"
                  class="btn btn--primary btn--block"
                  :disabled="contactForm.processing"
                  @click="markContacted"
                >
                  Mark as contacted
                </button>
              </div>

              <div class="intent__action">
                <template v-if="lead">
                  <button
                    type="button"
                    class="btn btn--secondary btn--block"
                    :disabled="linkForm.processing"
                    @click="unlinkLead"
                  >
                    Unlink the lead
                  </button>
                </template>
                <form v-else @submit.prevent="linkLead">
                  <div class="field">
                    <label class="field__label" for="intent-lead">Link to lead number</label>
                    <input
                      id="intent-lead"
                      v-model="linkForm.lead"
                      class="field__input"
                      inputmode="numeric"
                      placeholder="e.g. 42"
                      :aria-invalid="linkForm.errors.lead ? 'true' : 'false'"
                      :aria-describedby="linkForm.errors.lead ? 'intent-lead-error' : undefined"
                    />
                    <span v-if="linkForm.errors.lead" id="intent-lead-error" class="field__error">
                      {{ linkForm.errors.lead }}
                    </span>
                  </div>
                  <button
                    type="submit"
                    class="btn btn--secondary btn--block"
                    :disabled="linkForm.processing || !String(linkForm.lead).trim()"
                  >
                    Link to lead
                  </button>
                </form>
              </div>
            </template>
            <p v-else class="section__description">
              Only sales and admins can confirm conversations or link leads.
            </p>
          </section>
        </div>
      </div>
    </Page>
  </AppLayout>
</template>

<style scoped>
.intent__interest {
  margin-top: 8px;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.01em;
}
.intent__facts {
  margin-top: 14px;
}
.intent__muted {
  display: block;
  font-size: 12.5px;
  color: var(--muted);
}
.intent__journey {
  margin-top: 16px;
}
.intent__action {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--line);
  font-size: 14px;
}
.intent__action form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.section__subtitle {
  margin: 14px 0 4px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--muted);
}
</style>
