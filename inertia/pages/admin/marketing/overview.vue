<script setup lang="ts">
/**
 * Marketing overview, actionable first: visitors, WhatsApp intents, form
 * leads and qualified leads for the period; where they came from, where
 * they landed and what they explicitly asked about; the latest leads.
 * Plain counts, directional (bots are filtered only by obvious user
 * agents). Periods start at midnight in the business timezone.
 */
import { computed } from 'vue'
import { Head, router } from '@inertiajs/vue3'
import { Link } from '@adonisjs/inertia/vue'
import Page from '~/components/page.vue'
import AppLayout from '~/layouts/app.vue'
import { urlFor } from '~/client'
import { formatDateTime } from '~/components/admin/lead_format'

type Row = { label: string; total: number }

const props = defineProps<{
  report: {
    period: 'today' | '7' | '30' | '90'
    kpis: {
      visitors: number
      whatsappIntents: number
      formLeads: number
      qualifiedLeads: number
      linkedLeads: number
    }
    funnel: { key: string; total: number }[]
    topSources: Row[]
    topCampaigns: Row[]
    topLanding: Row[]
    topExplicit: Row[]
    recentLeads: {
      id: number | null
      at: string | null
      purpose: string
      source: string
      status: string
      tracked: boolean
    }[]
    byPage: { page: string; views: number; whatsapp: number; forms: number }[]
  }
}>()

const periods = [
  { value: 'today', label: 'Today' },
  { value: '7', label: '7 days' },
  { value: '30', label: '30 days' },
  { value: '90', label: '90 days' },
] as const

function setPeriod(period: string) {
  router.get(urlFor('admin.marketing.overview'), { period }, { preserveScroll: true })
}

const cards = computed(() => {
  const k = props.report.kpis
  return [
    { label: 'Visitors', value: k.visitors, hint: 'Distinct anonymous visitors' },
    {
      label: 'WhatsApp intents',
      value: k.whatsappIntents,
      hint: 'WhatsApp opened from the site; not a confirmed conversation',
    },
    { label: 'Form leads', value: k.formLeads, hint: `${k.linkedLeads} with a visitor journey` },
    {
      label: 'Qualified leads',
      value: k.qualifiedLeads,
      hint: 'Leads from the period sales qualified',
    },
  ]
})

const funnelLabels: Record<string, string> = {
  visitors: 'Visitors',
  explicit: 'Showed explicit interest',
  whatsapp: 'Clicked WhatsApp',
  forms: 'Sent a form (lead)',
}
const funnelTop = computed(() => Math.max(1, props.report.funnel[0]?.total ?? 0))

const breakdowns = computed(() => [
  { title: 'Top sources', hint: 'Visits', rows: props.report.topSources },
  { title: 'Top landing pages', hint: 'Visits', rows: props.report.topLanding },
  { title: 'Top explicit interests', hint: 'Visitors', rows: props.report.topExplicit },
  { title: 'Top campaigns', hint: 'Visits', rows: props.report.topCampaigns },
])
</script>

<template>
  <AppLayout>
    <Head title="Marketing">
      <meta name="robots" content="noindex, nofollow" />
    </Head>
    <Page
      title="Marketing"
      description="Where visitors come from, what they explicitly ask about, and which leads they became."
      class="page--wide"
    >
      <template #actions>
        <div class="period" role="group" aria-label="Period">
          <button
            v-for="item in periods"
            :key="item.value"
            type="button"
            class="btn btn--sm"
            :class="item.value === report.period ? 'btn--primary' : 'btn--secondary'"
            :aria-pressed="item.value === report.period"
            @click="setPeriod(item.value)"
          >
            {{ item.label }}
          </button>
        </div>
        <Link route="admin.marketing.whatsapp.index" class="btn btn--secondary btn--sm">
          WhatsApp intents
        </Link>
        <Link route="admin.marketing.visitors" class="btn btn--secondary btn--sm">Visitors</Link>
      </template>

      <ul class="stats" aria-label="Totals">
        <li v-for="card in cards" :key="card.label" class="panel stat">
          <span class="stat__label">{{ card.label }}</span>
          <b class="stat__value">{{ card.value.toLocaleString('en-US') }}</b>
          <span class="stat__hint">{{ card.hint }}</span>
        </li>
      </ul>

      <div class="breakdowns">
        <section
          v-for="block in breakdowns"
          :key="block.title"
          class="panel"
          :aria-label="block.title"
        >
          <h2 class="section__title">{{ block.title }}</h2>
          <p class="section__description">{{ block.hint }}</p>
          <p v-if="!block.rows.length" class="section__description">No data in this period.</p>
          <table v-else class="data-table">
            <tbody>
              <tr v-for="row in block.rows" :key="row.label">
                <td>
                  <span class="data-table__clip" :title="row.label">{{ row.label }}</span>
                </td>
                <td class="num">{{ row.total.toLocaleString('en-US') }}</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>

      <section class="panel" aria-labelledby="recent-title">
        <h2 id="recent-title" class="section__title">Recent leads</h2>
        <p class="section__description">
          Latest form leads in the period, with the source they first came from.
        </p>
        <div class="table-scroll">
          <table class="data-table">
            <thead>
              <tr>
                <th>Received</th>
                <th>Purpose</th>
                <th>First source</th>
                <th>Status</th>
                <th>Lead</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(lead, i) in report.recentLeads" :key="lead.id ?? i">
                <td class="data-table__muted">{{ formatDateTime(lead.at) }}</td>
                <td>{{ lead.purpose }}</td>
                <td>{{ lead.source }}</td>
                <td>{{ lead.status }}</td>
                <td>
                  <Link v-if="lead.id" route="admin.demo_requests.show" :params="{ id: lead.id }"
                    >Lead #{{ lead.id }}</Link
                  >
                  <template v-else>—</template>
                </td>
              </tr>
              <tr v-if="!report.recentLeads.length">
                <td colspan="5" class="data-table__muted">No leads in this period.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="panel" aria-labelledby="funnel-title">
        <h2 id="funnel-title" class="section__title">Funnel</h2>
        <p class="section__description">
          Distinct visitors in the period. A WhatsApp click is intent, not a conversation.
        </p>
        <ol class="funnel">
          <li v-for="step in report.funnel" :key="step.key">
            <span class="funnel__label">{{ funnelLabels[step.key] }}</span>
            <span class="funnel__bar"
              ><span :style="{ width: `${(step.total / funnelTop) * 100}%` }"
            /></span>
            <b>{{ step.total.toLocaleString('en-US') }}</b>
          </li>
        </ol>
      </section>

      <section class="panel" aria-labelledby="pages-title">
        <h2 id="pages-title" class="section__title">Conversion by page</h2>
        <p class="section__description">
          Views, WhatsApp clicks and forms sent on each page in the period.
        </p>
        <div class="table-scroll">
          <table class="data-table">
            <thead>
              <tr>
                <th>Page</th>
                <th class="num">Views</th>
                <th class="num">WhatsApp clicks</th>
                <th class="num">Forms</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in report.byPage" :key="row.page">
                <td>{{ row.page }}</td>
                <td class="num">{{ row.views }}</td>
                <td class="num">{{ row.whatsapp }}</td>
                <td class="num">{{ row.forms }}</td>
              </tr>
              <tr v-if="!report.byPage.length">
                <td colspan="4" class="data-table__muted">No data in this period.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </Page>
  </AppLayout>
</template>

<style scoped>
.period {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 6px;
}
.stats {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}
.stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.stat__label {
  font-size: 13px;
  color: var(--muted);
}
.stat__value {
  font-size: 26px;
  font-variant-numeric: tabular-nums;
}
.stat__hint {
  font-size: 12px;
  color: var(--muted);
}
.funnel {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 14px;
}
.funnel li {
  display: grid;
  grid-template-columns: 190px minmax(0, 1fr) 64px;
  align-items: center;
  gap: 12px;
  font-size: 14px;
}
.funnel b {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
.funnel__bar {
  height: 10px;
  border-radius: 999px;
  background: var(--paper);
  overflow: hidden;
}
.funnel__bar span {
  display: block;
  height: 100%;
  min-width: 2px;
  border-radius: 999px;
  background: #005dfb;
}
.breakdowns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
}
.breakdowns .data-table {
  margin-top: 8px;
}
.num {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
.panel + .panel,
.breakdowns + .panel {
  margin-top: 16px;
}
/* grid cells: the grid gap spaces them */
.stats > .panel,
.breakdowns > .panel {
  margin-top: 0;
}
@media (max-width: 560px) {
  .funnel li {
    grid-template-columns: minmax(0, 1fr) 56px;
  }
  .funnel__bar {
    grid-column: 1 / -1;
    grid-row: 2;
  }
}
</style>
