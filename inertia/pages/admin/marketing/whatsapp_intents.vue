<script setup lang="ts">
/**
 * WhatsApp intents: every WhatsApp CTA click with its reference. An intent
 * is not a lead: it only says WhatsApp was opened, about what, and how the
 * visitor arrived. Sales confirms real conversations on the intent itself.
 */
import { reactive } from 'vue'
import { Head, router } from '@inertiajs/vue3'
import { Link } from '@adonisjs/inertia/vue'
import { Search } from 'lucide-vue-next'
import type { WhatsappIntentSummary } from '@shared/journey'
import Page from '~/components/page.vue'
import AppLayout from '~/layouts/app.vue'
import { urlFor } from '~/client'
import { formatDateTime } from '~/components/admin/lead_format'

type IntentRow = WhatsappIntentSummary & {
  linked: boolean
  landingPage: string | null
  campaign: string | null
  locale: string | null
}

const props = defineProps<{
  intents: IntentRow[]
  metadata: { total: number; perPage: number; currentPage: number; lastPage: number }
  filters: { q: string; contacted: string; linked: string }
  invalidReference: boolean
  canManageLeads: boolean
}>()

const form = reactive({ ...props.filters })

function apply(page?: number) {
  const query = Object.fromEntries(
    Object.entries({ ...form, page }).filter(([, value]) => value !== '' && value !== undefined)
  )
  router.get(urlFor('admin.marketing.whatsapp.index'), query, { preserveScroll: true })
}
</script>

<template>
  <AppLayout>
    <Head title="WhatsApp intents">
      <meta name="robots" content="noindex, nofollow" />
    </Head>
    <Page
      title="WhatsApp intents"
      description="WhatsApp clicks from the site, each with its reference. A click is intent, not a conversation and not a lead."
      class="page--wide"
    >
      <template #actions>
        <Link route="admin.marketing.overview" class="btn btn--secondary btn--sm">Overview</Link>
      </template>

      <form
        class="panel filters"
        role="search"
        aria-label="Find WhatsApp intents"
        @submit.prevent="apply()"
      >
        <div class="field">
          <label class="field__label" for="intent-search">Reference</label>
          <input
            id="intent-search"
            v-model="form.q"
            class="field__input"
            type="search"
            placeholder="M7K4P2 or Ref: M7K4P2"
            autocomplete="off"
          />
        </div>
        <div class="field">
          <label class="field__label" for="intent-contacted">Conversation</label>
          <select
            id="intent-contacted"
            v-model="form.contacted"
            class="field__input field__select"
            @change="apply()"
          >
            <option value="">All</option>
            <option value="yes">Confirmed by sales</option>
            <option value="no">Not confirmed</option>
          </select>
        </div>
        <div class="field">
          <label class="field__label" for="intent-linked">Lead</label>
          <select
            id="intent-linked"
            v-model="form.linked"
            class="field__input field__select"
            @change="apply()"
          >
            <option value="">All</option>
            <option value="yes">Linked to a lead</option>
            <option value="no">No lead</option>
          </select>
        </div>
        <div class="filters__actions">
          <button type="submit" class="btn btn--primary"><Search :size="15" /> Search</button>
        </div>
      </form>

      <p v-if="invalidReference" class="panel notice" role="status">
        A reference has six letters and digits, for example <b>M7K4P2</b>.
      </p>

      <div class="panel panel--flush">
        <div class="table-scroll">
          <table class="data-table">
            <caption class="sr-only">
              WhatsApp intents
            </caption>
            <thead>
              <tr>
                <th>Reference</th>
                <th>Clicked</th>
                <th>Interest</th>
                <th>Landing page</th>
                <th>Campaign</th>
                <th>Language</th>
                <th>Conversation</th>
                <th>Lead</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="intent in intents" :key="intent.id">
                <td>
                  <Link
                    route="admin.marketing.whatsapp.show"
                    :params="{ id: intent.id }"
                    class="data-table__primary mono"
                  >
                    {{ intent.reference }}
                  </Link>
                </td>
                <td class="data-table__muted">{{ formatDateTime(intent.at) }}</td>
                <td>{{ intent.interest }}</td>
                <td>
                  <span class="data-table__clip" :title="intent.landingPage ?? ''">{{
                    intent.landingPage ?? '—'
                  }}</span>
                </td>
                <td>{{ intent.campaign ?? '—' }}</td>
                <td>{{ intent.locale?.toUpperCase() ?? '—' }}</td>
                <td>
                  <span class="badge" :class="{ 'badge--converted': intent.contacted }">
                    {{ intent.contacted ? 'Confirmed' : 'Not confirmed' }}
                  </span>
                </td>
                <td>
                  <Link
                    v-if="intent.linkedLeadId"
                    route="admin.demo_requests.show"
                    :params="{ id: intent.linkedLeadId }"
                    >Lead #{{ intent.linkedLeadId }}</Link
                  >
                  <template v-else>{{ intent.linked ? 'Linked' : 'No lead' }}</template>
                </td>
              </tr>
              <tr v-if="!intents.length">
                <td colspan="8" class="data-table__muted">No WhatsApp intents match.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <nav v-if="metadata.lastPage > 1" class="pagination" aria-label="Pagination">
          <span>Page {{ metadata.currentPage }} of {{ metadata.lastPage }}</span>
          <div class="pagination__pages">
            <button
              type="button"
              class="pagination__page"
              :disabled="metadata.currentPage === 1"
              @click="apply(metadata.currentPage - 1)"
            >
              <span class="sr-only">Previous page</span><span aria-hidden="true">‹</span>
            </button>
            <button
              type="button"
              class="pagination__page"
              :disabled="metadata.currentPage === metadata.lastPage"
              @click="apply(metadata.currentPage + 1)"
            >
              <span class="sr-only">Next page</span><span aria-hidden="true">›</span>
            </button>
          </div>
        </nav>
      </div>
    </Page>
  </AppLayout>
</template>

<style scoped>
.notice {
  margin-top: 16px;
  font-size: 14px;
}
.filters + .panel,
.notice + .panel {
  margin-top: 16px;
}
</style>
