<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import { useCopy } from '~/i18n'
import { useLeadTarget } from '~/composables/lead_target'
import type { FaqItem } from '~/content/faq'

withDefaults(defineProps<{ items: FaqItem[]; title: string; lead: string; id?: string }>(), {
  id: 'faq',
})

const t = useCopy('common')
const leadTarget = useLeadTarget()
</script>

<template>
  <section :id="id" class="sm-section fq">
    <div class="sm-container fq__grid">
      <div class="fq__side">
        <span v-reveal class="sm-eyebrow">{{ t.faq.eyebrow }}</span>
        <h2 v-reveal="60" class="sm-h2">{{ title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ lead }}</p>
        <a v-reveal="160" :href="leadTarget.href" class="sm-btn sm-btn--light">{{
          t.faq.askTeam
        }}</a>
      </div>
      <div class="fq__list">
        <details
          v-for="(item, i) in items"
          :key="item.q"
          v-reveal="(i % 3) * 40"
          class="fq__item"
          :open="i === 0"
        >
          <summary>
            <span>{{ item.q }}</span>
            <span class="fq__icon" aria-hidden="true"><Plus :size="18" /></span>
          </summary>
          <p>{{ item.a }}</p>
        </details>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fq__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.7fr);
  gap: clamp(40px, 6vw, 96px);
  align-items: start;
}
.fq__side {
  position: sticky;
  top: calc(var(--sm-header-h) + 40px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}
.fq__list {
  border-top: 1px solid var(--sm-border);
}
.fq__item {
  border-bottom: 1px solid var(--sm-border);
}
.fq__item summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 24px 0;
  font-size: 18px;
  font-weight: 650;
  letter-spacing: -0.015em;
  list-style: none;
  cursor: pointer;
}
.fq__item summary::-webkit-details-marker {
  display: none;
}
.fq__item summary:hover {
  color: var(--sm-primary-ink);
}
.fq__icon {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  flex: none;
  border-radius: 50%;
  background: var(--sm-surface-subtle);
  color: var(--sm-text);
  transition:
    transform 0.25s var(--sm-ease),
    background 0.25s;
}
.fq__item[open] .fq__icon {
  transform: rotate(45deg);
  background: var(--sm-primary);
  color: #fff;
}
.fq__item p {
  max-width: 680px;
  padding: 0 60px 26px 0;
  font-size: 16px;
  line-height: 1.7;
  color: var(--sm-muted);
}
@media (max-width: 980px) {
  .fq__grid {
    grid-template-columns: minmax(0, 1fr);
  }
  .fq__side {
    position: static;
  }
}
@media (max-width: 560px) {
  .fq__item summary {
    font-size: 16.5px;
    padding: 20px 0;
  }
  .fq__item p {
    padding-right: 0;
  }
}
</style>
