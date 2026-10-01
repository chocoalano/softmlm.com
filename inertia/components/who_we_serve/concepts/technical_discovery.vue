<script setup lang="ts">
/**
 * A technical discovery worksheet: the questions evaluated with a
 * client's IT team and where each one stands. It shows how the work is
 * organised, not product capabilities. Sample answers only.
 */
import { computed } from 'vue'
import { useCopy } from '~/i18n'

const props = withDefaults(defineProps<{ compact?: boolean }>(), { compact: false })

const t = useCopy('personas')
const copy = computed(() => t.value.concepts.technical)

type Topic = keyof typeof copy.value.topics
type Status = keyof typeof copy.value.status

/** In the order of `concepts.technical.questions` in the dictionary. */
const worksheet: { topic: Topic; status: Status; tone: string }[] = [
  { topic: 'integrations', status: 'agreed', tone: 'ok' },
  { topic: 'integrations', status: 'discussing', tone: 'info' },
  { topic: 'authentication', status: 'open', tone: 'plain' },
  { topic: 'permissions', status: 'agreed', tone: 'ok' },
  { topic: 'migration', status: 'assessing', tone: 'warn' },
  { topic: 'infrastructure', status: 'discussing', tone: 'info' },
  { topic: 'auditability', status: 'open', tone: 'plain' },
]

const rows = computed(() =>
  worksheet.map((row, i) => ({
    topic: copy.value.topics[row.topic],
    question: copy.value.questions[i],
    status: copy.value.status[row.status],
    tone: row.tone,
  }))
)

const visible = computed(() =>
  props.compact ? rows.value.filter((_, i) => i % 2 === 0) : rows.value
)
</script>

<template>
  <div class="ui td" :class="{ 'td--compact': compact }" :aria-label="copy.label" role="img">
    <div class="td__head">
      <div>
        <div class="ui-label">{{ copy.eyebrow }}</div>
        <div class="td__title">{{ copy.title }}</div>
      </div>
      <span class="ui-badge ui-badge--plain">{{ copy.topicCount(visible.length) }}</span>
    </div>

    <div class="td__table">
      <div class="td__row td__row--head">
        <span>{{ copy.columns.topic }}</span>
        <span>{{ copy.columns.question }}</span>
        <span>{{ copy.columns.status }}</span>
      </div>
      <div v-for="row in visible" :key="row.question" class="td__row">
        <span class="td__topic">{{ row.topic }}</span>
        <span class="td__q">{{ row.question }}</span>
        <span
          ><span class="ui-badge" :class="`ui-badge--${row.tone}`">{{ row.status }}</span></span
        >
      </div>
    </div>

    <div v-if="!compact" class="td__foot">
      <span><i class="td__dot td__dot--ok" /> {{ copy.summary.agreed }}</span>
      <span><i class="td__dot td__dot--info" /> {{ copy.summary.inProgress }}</span>
      <span><i class="td__dot" /> {{ copy.summary.open }}</span>
    </div>
  </div>
</template>

<style scoped>
.td {
  width: 100%;
  max-width: 920px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: clamp(16px, 2.4vw, 28px);
  border-radius: var(--sm-r-shell);
  background: var(--sm-surface);
  border: 1px solid var(--sm-border);
  box-shadow: var(--sm-shadow-product);
}
.td--compact {
  max-width: 520px;
  padding: 20px;
  border-radius: 20px;
  box-shadow: var(--sm-shadow-float);
}
.td__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.td__title {
  font-size: 18px;
  font-weight: 650;
  letter-spacing: -0.02em;
}
.td__table {
  display: flex;
  flex-direction: column;
}
.td__row {
  display: grid;
  grid-template-columns: 130px minmax(0, 1fr) 110px;
  align-items: center;
  gap: 16px;
  padding: 11px 0;
  border-bottom: 1px solid var(--sm-surface-hover);
  font-size: 13px;
}
.td__row:last-child {
  border-bottom: 0;
}
.td__row > span:last-child {
  justify-self: end;
}
.td__row--head {
  padding-top: 0;
  border-bottom-color: var(--sm-border);
  font-size: 11px;
  font-weight: 500;
  color: var(--sm-muted);
}
.td__topic {
  font-family: var(--sm-mono);
  font-size: 11.5px;
  color: var(--sm-primary-ink);
}
.td__q {
  font-weight: 500;
}
.td--compact .td__row {
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 4px 12px;
}
.td--compact .td__row--head {
  display: none;
}
.td--compact .td__topic {
  grid-column: 1 / -1;
}
.td--compact .td__q {
  grid-column: 1;
}
.td__foot {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;
  padding-top: 12px;
  border-top: 1px solid var(--sm-border);
  font-size: 12px;
  color: var(--sm-muted);
}
.td__foot span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.td__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--sm-subtle);
}
.td__dot--ok {
  background: var(--sm-ok);
}
.td__dot--info {
  background: var(--sm-info);
}
@media (max-width: 640px) {
  .td__row {
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 4px 12px;
  }
  .td__row--head {
    display: none;
  }
  .td__topic {
    grid-column: 1 / -1;
  }
}
</style>
