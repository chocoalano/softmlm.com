<script setup lang="ts">
/**
 * A visitor's journey for sales and marketing, as milestones: First visit
 * → Explored → Explicit interest → WhatsApp click → Form submission →
 * Sales contact. Explicit interest (a CTA, a choice, a form) is shown apart
 * from what was only viewed. The raw events stay collapsed, for debugging.
 * A WhatsApp click is shown as a click, never as a conversation.
 */
import { computed } from 'vue'
import type { VisitorJourney } from '@shared/journey'
import { formatDateTime, formatDay, formatTime } from '~/components/admin/lead_format'

const props = defineProps<{ journey: VisitorJourney; hideInterest?: boolean }>()

/** The event log grouped by day, so repeated dates don't crowd it. */
const days = computed(() => {
  const groups: { day: string; steps: VisitorJourney['events'] }[] = []
  for (const step of props.journey.events) {
    const label = formatDay(step.at)
    const last = groups[groups.length - 1]
    if (last && last.day === label) last.steps.push(step)
    else groups.push({ day: label, steps: [step] })
  }
  return groups
})

const clicked = computed(() =>
  props.journey.milestones.some((milestone) => milestone.key === 'whatsapp' && milestone.reached)
)
</script>

<template>
  <div class="journey">
    <dl v-if="!hideInterest" class="journey__interest">
      <div>
        <dt>Explicit interest</dt>
        <dd>
          {{
            journey.explicit.length ? journey.explicit.map((item) => item.interest).join(', ') : '—'
          }}
        </dd>
      </div>
      <div>
        <dt>Also viewed</dt>
        <dd>{{ journey.viewed.length ? journey.viewed.join(', ') : '—' }}</dd>
      </div>
    </dl>

    <ol class="journey__milestones" aria-label="Conversion journey">
      <li
        v-for="milestone in journey.milestones"
        :key="milestone.key"
        class="journey__milestone"
        :data-key="milestone.key"
        :data-reached="milestone.reached"
      >
        <div class="journey__head">
          <b>{{ milestone.label }}</b>
          <time v-if="milestone.at" :datetime="milestone.at">{{
            formatDateTime(milestone.at)
          }}</time>
          <span v-else class="journey__pending">{{ milestone.reached ? '' : 'Not yet' }}</span>
        </div>
        <ul v-if="milestone.items.length" class="journey__items">
          <li v-for="item in milestone.items" :key="item">{{ item }}</li>
        </ul>
      </li>
    </ol>
    <p v-if="clicked" class="journey__note">
      A WhatsApp click means WhatsApp was opened from the site. It does not confirm that a message
      was sent: confirm it on the WhatsApp intent ("Mark as contacted") once a conversation quoting
      its reference has actually taken place.
    </p>

    <details class="journey__log">
      <summary>Event log ({{ journey.events.length }}) · for debugging</summary>
      <ol class="journey__timeline" aria-label="Event log">
        <li v-for="group in days" :key="group.day" class="journey__day">
          <span class="journey__date">{{ group.day }}</span>
          <ol>
            <li
              v-for="(step, i) in group.steps"
              :key="`${step.at}-${i}`"
              class="journey__step"
              :data-kind="step.kind"
            >
              <time :datetime="step.at" :title="formatDateTime(step.at)">{{
                formatTime(step.at)
              }}</time>
              <span>{{ step.label }}</span>
            </li>
          </ol>
        </li>
      </ol>
      <p v-if="journey.truncated" class="journey__note">Showing the most recent events only.</p>
    </details>
  </div>
</template>

<style scoped>
.journey {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 12px;
}
.journey__interest {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}
.journey__interest > div {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px 12px;
  border-radius: 10px;
  background: var(--paper);
}
.journey__interest dt {
  font-size: 12px;
  color: var(--muted);
}
.journey__interest dd {
  font-size: 14px;
  font-weight: 600;
  overflow-wrap: anywhere;
}
.journey__interest > div + div dd {
  font-weight: 400;
}
.journey__milestones {
  list-style: none;
  display: flex;
  flex-direction: column;
}
.journey__milestone {
  position: relative;
  padding: 0 0 14px 22px;
  border-left: 2px solid var(--line);
  margin-left: 5px;
}
.journey__milestone:last-child {
  padding-bottom: 0;
  border-left-color: transparent;
}
.journey__milestone::before {
  content: '';
  position: absolute;
  top: 3px;
  left: -7px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid var(--muted);
  background: var(--card);
}
.journey__milestone[data-reached='true']::before {
  border-color: #005dfb;
  background: #005dfb;
}
.journey__milestone[data-key='whatsapp'][data-reached='true']::before {
  border-color: #1f9d55;
  background: #1f9d55;
}
.journey__milestone[data-reached='false'] {
  color: var(--muted);
}
.journey__head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 4px 12px;
  font-size: 14px;
}
.journey__head time,
.journey__pending {
  font-size: 12.5px;
  font-variant-numeric: tabular-nums;
  color: var(--muted);
}
.journey__items {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 4px;
  font-size: 13.5px;
  overflow-wrap: anywhere;
}
.journey__note {
  font-size: 13px;
  color: var(--muted);
}
.journey__log summary {
  cursor: pointer;
  font-size: 13px;
  color: var(--muted);
}
.journey__log[open] summary {
  margin-bottom: 12px;
}
.journey__timeline,
.journey__timeline ol {
  list-style: none;
  display: flex;
  flex-direction: column;
}
.journey__timeline {
  gap: 14px;
}
.journey__date {
  display: block;
  margin-bottom: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--muted);
}
.journey__step {
  position: relative;
  display: grid;
  grid-template-columns: 52px minmax(0, 1fr);
  gap: 10px;
  padding: 5px 0 5px 14px;
  border-left: 2px solid var(--line);
  font-size: 13.5px;
  overflow-wrap: anywhere;
}
.journey__step::before {
  content: '';
  position: absolute;
  top: 12px;
  left: -5px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--muted);
}
.journey__step time {
  font-variant-numeric: tabular-nums;
  color: var(--muted);
}
.journey__step[data-kind='whatsapp_marketing_click']::before {
  background: #1f9d55;
}
.journey__step[data-kind$='_form_submitted']::before {
  background: #005dfb;
}
</style>
