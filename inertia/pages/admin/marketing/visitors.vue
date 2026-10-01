<script setup lang="ts">
/**
 * Anonymous visitors, most recent first. A visitor is shown by a shortened
 * random id: never a name or a guessed identity. The search takes a
 * WhatsApp reference from a customer's message ("M7K4P2" or "Ref: M7K4P2").
 * The interest column shows an explicit interest (CTA, choice, form) in
 * bold, or, failing that, what the visitor only viewed.
 */
import { reactive } from 'vue'
import { Head, router } from '@inertiajs/vue3'
import { Link } from '@adonisjs/inertia/vue'
import { Search } from 'lucide-vue-next'
import Page from '~/components/page.vue'
import AppLayout from '~/layouts/app.vue'
import { urlFor } from '~/client'
import { formatDateTime } from '~/components/admin/lead_format'

type VisitorRow = {
  uuid: string
  shortId: string
  firstSeenAt: string | null
  lastSeenAt: string | null
  sessions: number
  firstSource: string
  lastSource: string
  explicitInterest: string | null
  viewedInterest: string | null
  whatsappIntents: number
  converted: boolean
  leadIds: number[]
}

const props = defineProps<{
  visitors: VisitorRow[]
  metadata: { total: number; perPage: number; currentPage: number; lastPage: number }
  filters: { q: string; converted: string }
  reference: {
    code: string
    found: boolean
    resolvable: boolean
    intentId: number | null
    at: string | null
    page: string | null
    interest: string | null
  } | null
  canManageLeads: boolean
}>()

const form = reactive({ ...props.filters })

function apply(page?: number) {
  const query = Object.fromEntries(
    Object.entries({ ...form, page }).filter(([, value]) => value !== '' && value !== undefined)
  )
  router.get(urlFor('admin.marketing.visitors'), query, { preserveScroll: true })
}
</script>

<template>
  <AppLayout>
    <Head title="Visitors">
      <meta name="robots" content="noindex, nofollow" />
    </Head>
    <Page
      title="Visitors"
      description="Anonymous first-party visitors. They stay anonymous until they send a form themselves."
      class="page--wide"
    >
      <template #actions>
        <Link route="admin.marketing.overview" class="btn btn--secondary btn--sm">Overview</Link>
      </template>

      <form
        class="panel filters"
        role="search"
        aria-label="Find visitors"
        @submit.prevent="apply()"
      >
        <div class="field">
          <label class="field__label" for="visitor-search">WhatsApp reference or visitor id</label>
          <input
            id="visitor-search"
            v-model="form.q"
            class="field__input"
            type="search"
            placeholder="M7K4P2 or 3f2a9c1b"
            autocomplete="off"
          />
        </div>
        <div class="field">
          <label class="field__label" for="visitor-converted">Sent a form</label>
          <select
            id="visitor-converted"
            v-model="form.converted"
            class="field__input field__select"
            @change="apply()"
          >
            <option value="">All visitors</option>
            <option value="yes">Became a lead</option>
            <option value="no">Anonymous only</option>
          </select>
        </div>
        <div class="filters__actions">
          <button type="submit" class="btn btn--primary"><Search :size="15" /> Search</button>
        </div>
      </form>

      <p v-if="reference" class="panel reference" role="status">
        <template v-if="reference.found && reference.resolvable">
          Reference <b>{{ reference.code }}</b
          >: WhatsApp opened on {{ formatDateTime(reference.at)
          }}<template v-if="reference.page"> from {{ reference.page }}</template
          ><template v-if="reference.interest"> ({{ reference.interest }})</template>. It shows the
          click only; whether a conversation followed is for sales to confirm.
          <Link
            route="admin.marketing.whatsapp.show"
            :params="{ id: reference.intentId! }"
            class="reference__link"
            >Open the WhatsApp intent</Link
          >
        </template>
        <template v-else-if="reference.found">
          Reference <b>{{ reference.code }}</b> has expired: it no longer opens the anonymous
          journey behind it.
        </template>
        <template v-else
          >No WhatsApp click with reference <b>{{ reference.code }}</b
          >.</template
        >
      </p>

      <div class="panel panel--flush">
        <div class="table-scroll">
          <table class="data-table">
            <caption class="sr-only">
              Visitors
            </caption>
            <thead>
              <tr>
                <th>Visitor</th>
                <th>First seen</th>
                <th>Last seen</th>
                <th class="num">Visits</th>
                <th>First source</th>
                <th>Last source</th>
                <th>Interest</th>
                <th class="num">WhatsApp</th>
                <th>Lead</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="visitor in visitors" :key="visitor.uuid">
                <td>
                  <Link
                    route="admin.marketing.visitor"
                    :params="{ uuid: visitor.uuid }"
                    class="data-table__primary"
                  >
                    Anonymous visitor {{ visitor.shortId }}
                  </Link>
                </td>
                <td class="data-table__muted">{{ formatDateTime(visitor.firstSeenAt) }}</td>
                <td class="data-table__muted">{{ formatDateTime(visitor.lastSeenAt) }}</td>
                <td class="num">{{ visitor.sessions }}</td>
                <td>
                  <span class="data-table__clip" :title="visitor.firstSource">{{
                    visitor.firstSource
                  }}</span>
                </td>
                <td>
                  <span class="data-table__clip" :title="visitor.lastSource">{{
                    visitor.lastSource
                  }}</span>
                </td>
                <td>
                  <b v-if="visitor.explicitInterest">{{ visitor.explicitInterest }}</b>
                  <span v-else-if="visitor.viewedInterest" class="data-table__muted"
                    >Viewed {{ visitor.viewedInterest }}</span
                  >
                  <template v-else>—</template>
                </td>
                <td class="num">{{ visitor.whatsappIntents || '—' }}</td>
                <td>
                  <template v-if="visitor.leadIds.length">
                    <Link
                      v-for="id in visitor.leadIds"
                      :key="id"
                      route="admin.demo_requests.show"
                      :params="{ id }"
                      >Lead #{{ id }}</Link
                    >
                  </template>
                  <template v-else>{{ visitor.converted ? 'Yes' : '—' }}</template>
                </td>
              </tr>
              <tr v-if="!visitors.length">
                <td colspan="9" class="data-table__muted">No visitors match.</td>
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
.reference {
  margin-block: 16px;
  font-size: 14px;
}
.reference__link {
  margin-left: 4px;
  font-weight: 600;
}
.num {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
.filters + .panel {
  margin-top: 16px;
}
</style>
