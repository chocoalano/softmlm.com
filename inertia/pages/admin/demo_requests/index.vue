<script setup lang="ts">
import { computed, onBeforeUnmount, reactive, ref, watch } from 'vue'
import { Head, router } from '@inertiajs/vue3'
import { Link } from '@adonisjs/inertia/vue'
import { ArrowDown, ArrowUp, ArrowUpDown, Inbox, SearchX } from 'lucide-vue-next'
import type { Data } from '@generated/data'
import type { AdminLeadOptions } from '#config/leads'
import type { WhatsappIntentSummary } from '@shared/journey'
import { urlFor } from '~/client'
import Page from '~/components/page.vue'
import AppLayout from '~/layouts/app.vue'
import {
  formatDateTime,
  interestLabel,
  labelFor,
  moduleLabels,
} from '~/components/admin/lead_format'

type Filters = {
  q: string
  status: string
  businessType: string
  activeMembers: string
  source: string
  interest: string
  from: string
  to: string
  sort: string
  direction: 'asc' | 'desc'
}

const props = defineProps<{
  leads: {
    data: Data.DemoRequest[]
    metadata: { total: number; perPage: number; currentPage: number; lastPage: number }
  }
  filters: Filters
  hasAnyLeads: boolean
  options: AdminLeadOptions
  /** A WhatsApp reference typed into the search, and its intent if it exists. */
  reference:
    | (WhatsappIntentSummary & { resolvable: boolean; missing?: undefined })
    | { reference: string; missing: true }
    | null
}>()

const form = reactive<Filters>({ ...props.filters })
watch(
  () => props.filters,
  (filters) => Object.assign(form, filters)
)

const loading = ref(false)
const stopStart = router.on('start', () => (loading.value = true))
const stopFinish = router.on('finish', () => (loading.value = false))
onBeforeUnmount(() => {
  stopStart()
  stopFinish()
})

/**
 * Only non-empty filters go into the URL, so links stay short and
 * shareable between colleagues.
 */
function query(overrides: Partial<Filters> & { page?: number } = {}) {
  const values: Record<string, string | number> = { ...form, ...overrides }
  if (values.sort === 'created_at' && values.direction === 'desc') {
    delete values.sort
    delete values.direction
  }
  return Object.fromEntries(Object.entries(values).filter(([, value]) => value !== ''))
}

function apply(overrides: Partial<Filters> = {}) {
  router.get(urlFor('admin.demo_requests.index'), query(overrides), {
    preserveState: true,
    preserveScroll: true,
    replace: true,
  })
}

let searchTimer: ReturnType<typeof setTimeout> | undefined
function onSearchInput() {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => apply(), 350)
}

function reset() {
  Object.assign(form, {
    q: '',
    status: '',
    businessType: '',
    activeMembers: '',
    source: '',
    interest: '',
    from: '',
    to: '',
    sort: 'created_at',
    direction: 'desc',
  })
  apply()
}

function sortBy(column: string) {
  const direction = form.sort === column && form.direction === 'desc' ? 'asc' : 'desc'
  form.sort = column
  form.direction = direction
  apply()
}

const ariaSort = (column: string) =>
  form.sort === column ? (form.direction === 'asc' ? 'ascending' : 'descending') : 'none'

const meta = computed(() => props.leads.metadata)
const range = computed(() => {
  const start = (meta.value.currentPage - 1) * meta.value.perPage + 1
  const end = Math.min(meta.value.total, start + props.leads.data.length - 1)
  return { start, end }
})

/**
 * First, last and the pages around the current one, with gaps as null.
 */
const pages = computed(() => {
  const { currentPage, lastPage } = meta.value
  const wanted = new Set([1, lastPage, currentPage - 1, currentPage, currentPage + 1])
  const list = [...wanted].filter((n) => n >= 1 && n <= lastPage).sort((a, b) => a - b)
  return list.flatMap((n, i) => (i > 0 && n - list[i - 1] > 1 ? [null, n] : [n]))
})

const columns: { label: string; sort?: string }[] = [
  { label: 'Name', sort: 'full_name' },
  { label: 'Company', sort: 'company' },
  { label: 'Status', sort: 'status' },
  { label: 'Interest' },
  { label: 'Email' },
  { label: 'Phone' },
  { label: 'Business type' },
  { label: 'Members' },
  { label: 'Modules' },
  { label: 'Source' },
  { label: 'Created', sort: 'created_at' },
  { label: 'Last updated', sort: 'updated_at' },
]
</script>

<template>
  <AppLayout>
    <Head title="Leads">
      <meta name="robots" content="noindex, nofollow" />
    </Head>
    <Page
      title="Leads"
      description="Book a Demo, quote and consultation requests from the marketing site."
      class="page--wide"
    >
      <template #actions>
        <span class="page__meta">{{ meta.total }} {{ meta.total === 1 ? 'lead' : 'leads' }}</span>
      </template>

      <form
        v-if="hasAnyLeads"
        class="panel filters"
        role="search"
        aria-label="Filter leads"
        @submit.prevent="apply()"
      >
        <div class="field">
          <label class="field__label" for="lead-search">Search</label>
          <input
            id="lead-search"
            v-model="form.q"
            class="field__input"
            type="search"
            placeholder="Name, company, email or phone"
            @input="onSearchInput"
          />
        </div>
        <div class="field">
          <label class="field__label" for="lead-status">Status</label>
          <select
            id="lead-status"
            v-model="form.status"
            class="field__input field__select"
            @change="apply()"
          >
            <option value="">All statuses</option>
            <option v-for="item in options.statuses" :key="item.value" :value="item.value">
              {{ item.label }}
            </option>
          </select>
        </div>
        <div class="field">
          <label class="field__label" for="lead-type">Business type</label>
          <select
            id="lead-type"
            v-model="form.businessType"
            class="field__input field__select"
            @change="apply()"
          >
            <option value="">All types</option>
            <option v-for="item in options.businessTypes" :key="item.value" :value="item.value">
              {{ item.label }}
            </option>
          </select>
        </div>
        <div class="field">
          <label class="field__label" for="lead-members">Members</label>
          <select
            id="lead-members"
            v-model="form.activeMembers"
            class="field__input field__select"
            @change="apply()"
          >
            <option value="">Any size</option>
            <option v-for="item in options.memberRanges" :key="item.value" :value="item.value">
              {{ item.label }}
            </option>
          </select>
        </div>
        <div class="field">
          <label class="field__label" for="lead-interest">Interest</label>
          <select
            id="lead-interest"
            v-model="form.interest"
            class="field__input field__select"
            @change="apply()"
          >
            <option value="">All interests</option>
            <option
              v-for="item in options.interestCategories"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </option>
          </select>
        </div>
        <div class="field">
          <label class="field__label" for="lead-source">Source</label>
          <select
            id="lead-source"
            v-model="form.source"
            class="field__input field__select"
            @change="apply()"
          >
            <option value="">All sources</option>
            <option v-for="item in options.sources" :key="item.value" :value="item.value">
              {{ item.label }}
            </option>
          </select>
        </div>

        <div class="filters__row">
          <div class="field">
            <label class="field__label" for="lead-from">Created from</label>
            <input
              id="lead-from"
              v-model="form.from"
              class="field__input"
              type="date"
              :max="form.to || undefined"
              @change="apply()"
            />
          </div>
          <div class="field">
            <label class="field__label" for="lead-to">Created to</label>
            <input
              id="lead-to"
              v-model="form.to"
              class="field__input"
              type="date"
              :min="form.from || undefined"
              @change="apply()"
            />
          </div>
          <div class="filters__actions">
            <button type="button" class="btn btn--secondary" @click="reset">Reset</button>
            <button type="submit" class="btn btn--primary">Apply</button>
          </div>
        </div>
      </form>

      <p v-if="reference" class="panel reference" role="status">
        <template v-if="reference.missing">
          No WhatsApp click with reference <b>{{ reference.reference }}</b
          >.
        </template>
        <template v-else>
          WhatsApp reference <b>{{ reference.reference }}</b
          >: {{ reference.interest }}, clicked {{ formatDateTime(reference.at) }}.
          {{
            reference.linkedLeadId
              ? `Linked to lead #${reference.linkedLeadId}.`
              : 'Not linked to a lead yet.'
          }}
          <Link
            route="admin.marketing.whatsapp.show"
            :params="{ id: reference.id }"
            class="reference__link"
            >Open the WhatsApp intent</Link
          >
        </template>
      </p>

      <div class="panel panel--flush">
        <div v-if="!hasAnyLeads" class="empty">
          <div class="empty__mark"><Inbox :size="22" /></div>
          <h1>No leads yet</h1>
          <p>
            Requests submitted through Book a Demo, the pricing estimator and the services pages
            will appear here.
          </p>
        </div>

        <div v-else-if="!leads.data.length" class="empty">
          <div class="empty__mark"><SearchX :size="22" /></div>
          <h1>No leads match these filters</h1>
          <p>Try a different search or clear the filters to see every lead.</p>
          <button type="button" class="btn btn--secondary" @click="reset">Clear filters</button>
        </div>

        <template v-else>
          <ul class="lead-cards" :aria-busy="loading" aria-label="Leads">
            <li v-for="lead in leads.data" :key="lead.id" class="lead-card">
              <div class="lead-card__top">
                <Link
                  route="admin.demo_requests.show"
                  :params="{ id: lead.id }"
                  class="data-table__primary"
                >
                  {{ lead.fullName }}
                </Link>
                <span class="badge" :class="`badge--${lead.status}`">
                  {{ labelFor(options.statuses, lead.status) }}
                </span>
              </div>
              <span>{{ lead.company }}</span>
              <span>{{
                interestLabel(options, lead.interestCategory, lead.serviceInterests)
              }}</span>
              <span class="lead-card__meta">
                {{ labelFor(options.businessTypes, lead.businessType) }} ·
                {{ labelFor(options.memberRanges, lead.activeMembers) }} ·
                {{ formatDateTime(lead.createdAt) }}
              </span>
            </li>
          </ul>

          <div class="table-scroll table-scroll--desktop" :aria-busy="loading">
            <table class="data-table">
              <caption class="sr-only">
                Leads
              </caption>
              <thead>
                <tr>
                  <th
                    v-for="col in columns"
                    :key="col.label"
                    :aria-sort="col.sort ? ariaSort(col.sort) : undefined"
                  >
                    <button
                      v-if="col.sort"
                      type="button"
                      class="sort-button"
                      :class="{ 'sort-button--active': form.sort === col.sort }"
                      @click="sortBy(col.sort)"
                    >
                      {{ col.label }}
                      <ArrowUp
                        v-if="form.sort === col.sort && form.direction === 'asc'"
                        :size="13"
                      />
                      <ArrowDown v-else-if="form.sort === col.sort" :size="13" />
                      <ArrowUpDown v-else :size="13" aria-hidden="true" />
                    </button>
                    <template v-else>{{ col.label }}</template>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="lead in leads.data" :key="lead.id">
                  <td>
                    <Link
                      route="admin.demo_requests.show"
                      :params="{ id: lead.id }"
                      class="data-table__primary"
                    >
                      {{ lead.fullName }}
                    </Link>
                  </td>
                  <td>{{ lead.company }}</td>
                  <td>
                    <span class="badge" :class="`badge--${lead.status}`">
                      {{ labelFor(options.statuses, lead.status) }}
                    </span>
                  </td>
                  <td>
                    <span
                      class="data-table__clip"
                      :title="interestLabel(options, lead.interestCategory, lead.serviceInterests)"
                    >
                      {{ interestLabel(options, lead.interestCategory, lead.serviceInterests) }}
                    </span>
                  </td>
                  <td class="data-table__muted">{{ lead.email }}</td>
                  <td class="data-table__muted">{{ lead.phone || '—' }}</td>
                  <td>{{ labelFor(options.businessTypes, lead.businessType) }}</td>
                  <td>{{ labelFor(options.memberRanges, lead.activeMembers) }}</td>
                  <td>
                    <span
                      class="data-table__clip"
                      :title="moduleLabels(options, lead.selectedModulesSnapshot)"
                    >
                      {{ moduleLabels(options, lead.selectedModulesSnapshot) }}
                    </span>
                  </td>
                  <td class="data-table__muted">{{ labelFor(options.sources, lead.source) }}</td>
                  <td class="data-table__muted">{{ formatDateTime(lead.createdAt) }}</td>
                  <td class="data-table__muted">{{ formatDateTime(lead.updatedAt) }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <nav class="pagination" aria-label="Pagination">
            <span>Showing {{ range.start }}–{{ range.end }} of {{ meta.total }}</span>
            <div v-if="meta.lastPage > 1" class="pagination__pages">
              <span v-if="meta.currentPage === 1" class="pagination__page" aria-disabled="true">
                <span class="sr-only">Previous page</span>
                <span aria-hidden="true">‹</span>
              </span>
              <Link
                v-else
                route="admin.demo_requests.index"
                :qs="query({ page: meta.currentPage - 1 })"
                class="pagination__page"
                preserve-scroll
              >
                <span class="sr-only">Previous page</span>
                <span aria-hidden="true">‹</span>
              </Link>
              <template v-for="(n, i) in pages" :key="n ?? `gap-${i}`">
                <span v-if="n === null" class="pagination__page" aria-hidden="true">…</span>
                <span
                  v-else-if="n === meta.currentPage"
                  class="pagination__page"
                  aria-current="page"
                >
                  <span class="sr-only">Page</span> {{ n }}
                </span>
                <Link
                  v-else
                  route="admin.demo_requests.index"
                  :qs="query({ page: n })"
                  class="pagination__page"
                  preserve-scroll
                >
                  <span class="sr-only">Page</span> {{ n }}
                </Link>
              </template>
              <span
                v-if="meta.currentPage === meta.lastPage"
                class="pagination__page"
                aria-disabled="true"
              >
                <span class="sr-only">Next page</span>
                <span aria-hidden="true">›</span>
              </span>
              <Link
                v-else
                route="admin.demo_requests.index"
                :qs="query({ page: meta.currentPage + 1 })"
                class="pagination__page"
                preserve-scroll
              >
                <span class="sr-only">Next page</span>
                <span aria-hidden="true">›</span>
              </Link>
            </div>
          </nav>
        </template>
      </div>
    </Page>
  </AppLayout>
</template>

<style scoped>
.reference {
  margin-bottom: 16px;
  font-size: 14px;
}
.reference__link {
  margin-left: 4px;
  font-weight: 600;
}
</style>
