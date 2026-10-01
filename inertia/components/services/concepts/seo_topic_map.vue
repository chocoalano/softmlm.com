<script setup lang="ts">
/**
 * SEO concept: search intent → topic → content → landing page →
 * measurement. Placeholder queries in [brackets], measures as names only:
 * no rankings, positions or traffic figures.
 */
import { computed } from 'vue'
import { ArrowRight, FileText, Gauge, LayoutTemplate, Search, Target } from 'lucide-vue-next'
import { useCopy } from '~/i18n'

const t = useCopy('services')
const v = computed(() => t.value.pages.seo.visual)
</script>

<template>
  <figure class="ui stm">
    <ol class="stm__flow">
      <li class="stm__col">
        <span class="stm__head"
          ><Search :size="15" aria-hidden="true" /> {{ v.columns.intent }}</span
        >
        <ul class="stm__queries">
          <li v-for="query in v.queries" :key="query">{{ query }}</li>
        </ul>
        <ArrowRight :size="16" class="stm__arrow" aria-hidden="true" />
      </li>
      <li class="stm__col">
        <span class="stm__head"
          ><Target :size="15" aria-hidden="true" /> {{ v.columns.topic }}</span
        >
        <span class="stm__pillar">{{ v.pillar }}</span>
        <ArrowRight :size="16" class="stm__arrow" aria-hidden="true" />
      </li>
      <li class="stm__col">
        <span class="stm__head"
          ><FileText :size="15" aria-hidden="true" /> {{ v.columns.content }}</span
        >
        <ul class="stm__pieces">
          <li v-for="piece in v.pieces" :key="piece">
            <span class="stm__lines" aria-hidden="true"><i /><i /></span>
            {{ piece }}
          </li>
        </ul>
        <ArrowRight :size="16" class="stm__arrow" aria-hidden="true" />
      </li>
      <li class="stm__col">
        <span class="stm__head"
          ><LayoutTemplate :size="15" aria-hidden="true" /> {{ v.columns.landing }}</span
        >
        <span class="stm__landing">
          <span class="stm__landing-bar" aria-hidden="true" />
          {{ v.landing }}
        </span>
        <ArrowRight :size="16" class="stm__arrow" aria-hidden="true" />
      </li>
      <li class="stm__col">
        <span class="stm__head"
          ><Gauge :size="15" aria-hidden="true" /> {{ v.columns.measure }}</span
        >
        <ul class="stm__measures">
          <li v-for="measure in v.measures" :key="measure">{{ measure }}</li>
        </ul>
      </li>
    </ol>
    <figcaption class="stm__caption">{{ v.label }}</figcaption>
  </figure>
</template>

<style scoped>
.stm {
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  padding: clamp(16px, 2.4vw, 24px);
  border-radius: var(--sm-r-card);
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
  box-shadow: var(--sm-shadow-product);
}
/* a vertical pipeline: each step is a row, its label on the left */
.stm__flow {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.stm__col {
  position: relative;
  display: grid;
  grid-template-columns: 124px minmax(0, 1fr);
  align-items: center;
  gap: 12px;
}
.stm__col > :not(.stm__head, .stm__arrow) {
  grid-column: 2;
}
.stm__arrow {
  position: absolute;
  left: 52px;
  bottom: -17px;
  transform: rotate(90deg);
  color: var(--sm-primary-200);
}
.stm__head {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--sm-muted);
}
.stm__head svg {
  flex: none;
  color: var(--sm-primary-ink);
}
.stm__queries,
.stm__pieces,
.stm__measures {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.stm__queries li {
  padding: 6px 9px;
  border-radius: 10px;
  background: var(--sm-surface-subtle);
  font-family: var(--sm-mono);
  font-size: 11px;
  line-height: 1.4;
  color: var(--sm-text-2);
}
.stm__pillar {
  justify-self: start;
  padding: 10px 14px;
  border-radius: 12px;
  background: var(--sm-primary);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}
.stm__pieces li {
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 96px;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid var(--sm-border);
  font-size: 12px;
  font-weight: 600;
  color: var(--sm-text);
}
.stm__lines {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.stm__lines i {
  height: 4px;
  border-radius: 2px;
  background: var(--sm-border);
}
.stm__lines i:last-child {
  width: 60%;
}
.stm__landing {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 12px;
  border: 1px solid var(--sm-primary-200);
  background: var(--sm-primary-50);
  font-size: 12.5px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--sm-text);
}
.stm__landing-bar {
  flex: none;
  width: 44px;
  height: 30px;
  border-radius: 7px;
  background: linear-gradient(90deg, var(--sm-primary-100), var(--sm-primary-200));
}
.stm__measures li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 9px;
  border-radius: 10px;
  background: var(--sm-surface-subtle);
  font-size: 12px;
  font-weight: 600;
  color: var(--sm-text-2);
}
.stm__measures li::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--sm-tech);
}
.stm__caption {
  font-size: 12px;
  color: var(--sm-muted);
}
@media (max-width: 480px) {
  .stm__col {
    grid-template-columns: minmax(0, 1fr);
    gap: 8px;
  }
  .stm__col > :not(.stm__head, .stm__arrow) {
    grid-column: 1;
  }
  .stm__arrow {
    display: none;
  }
}
</style>
