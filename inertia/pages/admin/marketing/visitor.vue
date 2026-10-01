<script setup lang="ts">
/**
 * One anonymous visitor: first touch, last session and journey. If the
 * visitor sent a form, the lead is linked (contact details stay on the
 * lead page, for roles that may see them).
 */
import { Head } from '@inertiajs/vue3'
import { Link } from '@adonisjs/inertia/vue'
import { ArrowLeft } from 'lucide-vue-next'
import type { VisitorJourney as Journey } from '@shared/journey'
import Page from '~/components/page.vue'
import AppLayout from '~/layouts/app.vue'
import VisitorJourney from '~/components/admin/visitor_journey.vue'
import TouchDetails from '~/components/admin/touch_details.vue'
import { formatDateTime } from '~/components/admin/lead_format'

defineProps<{
  journey: Journey
  leads: { id: number | null; createdAt: string | null; purpose: string }[]
  canManageLeads: boolean
}>()
</script>

<template>
  <AppLayout>
    <Head :title="`Visitor ${journey.visitor.shortId}`">
      <meta name="robots" content="noindex, nofollow" />
    </Head>
    <Page
      :title="`Anonymous visitor ${journey.visitor.shortId}`"
      :description="`First seen ${formatDateTime(journey.visitor.firstSeenAt)} · ${journey.visitor.sessions} visit(s)`"
      class="page--wide"
    >
      <template #actions>
        <Link route="admin.marketing.visitors" class="btn btn--secondary btn--sm">
          <ArrowLeft :size="15" /> All visitors
        </Link>
      </template>

      <div class="detail-grid">
        <div class="detail-stack">
          <section class="panel" aria-labelledby="touch-title">
            <h2 id="touch-title" class="section__title">Acquisition</h2>
            <h3 class="section__subtitle">First touch</h3>
            <TouchDetails :touch="journey.firstTouch" show-date />
            <h3 class="section__subtitle">Last session</h3>
            <TouchDetails :touch="journey.lastTouch" show-date />
          </section>

          <section class="panel" aria-labelledby="leads-title">
            <h2 id="leads-title" class="section__title">Lead</h2>
            <p v-if="!leads.length" class="section__description">
              No form sent. This visitor is anonymous.
            </p>
            <ul v-else class="leads">
              <li v-for="(lead, i) in leads" :key="i">
                <Link
                  v-if="lead.id"
                  route="admin.demo_requests.show"
                  :params="{ id: lead.id }"
                  class="data-table__primary"
                  >Lead #{{ lead.id }}</Link
                >
                <span v-else>Lead (contact details visible to sales)</span>
                · {{ lead.purpose }} · {{ formatDateTime(lead.createdAt) }}
              </li>
            </ul>
          </section>
        </div>

        <div class="detail-stack">
          <section class="panel" aria-labelledby="journey-title">
            <h2 id="journey-title" class="section__title">Visitor journey</h2>
            <VisitorJourney :journey="journey" />
          </section>
        </div>
      </div>
    </Page>
  </AppLayout>
</template>

<style scoped>
.section__subtitle {
  margin: 14px 0 4px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--muted);
}
.leads {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
  font-size: 14px;
}
</style>
