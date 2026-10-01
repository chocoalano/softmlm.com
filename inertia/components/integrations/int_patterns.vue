<script setup lang="ts">
/**
 * Integration patterns considered during solution design, in business
 * language, plus API, webhook and sandbox in plain words. Patterns that
 * are considered, not capabilities that exist.
 */
import { computed } from 'vue'
import { BellRing, CalendarClock, FileSpreadsheet, Zap } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import { useCopy } from '~/i18n'

const t = useCopy('integrations')

const patterns = computed(() => {
  const items = t.value.patterns.items
  return [
    { key: 'immediate', icon: Zap, ...items.immediate },
    { key: 'scheduled', icon: CalendarClock, ...items.scheduled },
    { key: 'manual', icon: FileSpreadsheet, ...items.manual },
    { key: 'event', icon: BellRing, ...items.event },
  ]
})
</script>

<template>
  <section
    class="sm-section sm-section--compact sm-section--tint npat"
    aria-labelledby="npat-title"
  >
    <div class="sm-container">
      <div class="npat__head">
        <span v-reveal class="sm-eyebrow">{{ t.patterns.eyebrow }}</span>
        <h2 id="npat-title" v-reveal="60" class="sm-h2">{{ t.patterns.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.patterns.lead }}</p>
      </div>

      <div class="npat__grid">
        <ul class="npat__list">
          <li
            v-for="(pattern, i) in patterns"
            :key="pattern.key"
            v-reveal="(i % 2) * 60"
            class="npat__card"
          >
            <span class="sm-icon-tile sm-icon-tile--sm"
              ><component :is="pattern.icon" :size="18"
            /></span>
            <div>
              <h3 class="sm-h4">{{ pattern.title }}</h3>
              <p>{{ pattern.text }}</p>
            </div>
          </li>
        </ul>

        <aside v-reveal="120" class="npat__plain" aria-labelledby="npat-plain-title">
          <h3 id="npat-plain-title" class="npat__label">{{ t.patterns.plain.title }}</h3>
          <dl>
            <div v-for="item in t.patterns.plain.items" :key="item.title">
              <dt>{{ item.title }}</dt>
              <dd>{{ item.text }}</dd>
            </div>
          </dl>
          <p>{{ t.patterns.plain.note }}</p>
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped>
.npat__head {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 760px;
  margin-bottom: clamp(32px, 4vw, 52px);
}
.npat__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
  gap: 16px;
  align-items: start;
}
.npat__list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}
.npat__card {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  height: 100%;
  padding: 22px;
  border-radius: var(--sm-r-card);
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
}
.npat__card > div {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.npat__card p {
  font-size: 15px;
  line-height: 1.55;
  color: var(--sm-muted);
}
.npat__plain {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  border-radius: var(--sm-r-card);
  background: var(--sm-surface-inverse);
  color: var(--sm-on-inverse);
}
.npat__label {
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--sm-tech);
}
.npat__plain dl {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.npat__plain dt {
  font-family: var(--sm-mono);
  font-size: 14px;
  font-weight: 600;
}
.npat__plain dd {
  font-size: 14.5px;
  line-height: 1.5;
  color: var(--sm-on-inverse-muted);
}
.npat__plain > p {
  padding-top: 14px;
  border-top: 1px solid var(--sm-inverse-edge);
  font-size: 14.5px;
  line-height: 1.5;
}
@media (max-width: 1000px) {
  .npat__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
@media (max-width: 620px) {
  .npat__list {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
