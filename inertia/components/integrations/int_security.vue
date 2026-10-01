<script setup lang="ts">
/**
 * Security decisions every integration needs. Methodology, not a
 * description of controls in place; the link goes to the security topics
 * section on the homepage (there is no separate security page yet).
 */
import { computed } from 'vue'
import {
  ArrowRight,
  FileClock,
  FileText,
  KeyRound,
  Lock,
  RefreshCw,
  ScanEye,
  ShieldCheck,
  SlidersHorizontal,
} from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import { useCopy, useI18n } from '~/i18n'

const t = useCopy('integrations')
const { lp } = useI18n()
const icons = [
  ShieldCheck,
  KeyRound,
  SlidersHorizontal,
  Lock,
  ScanEye,
  FileText,
  RefreshCw,
  FileClock,
]
const items = computed(() => t.value.security.items.map((item, i) => ({ ...item, icon: icons[i] })))
</script>

<template>
  <section class="sm-section sm-section--compact nsec" aria-labelledby="nsec-title">
    <div class="sm-container">
      <div class="nsec__head">
        <span v-reveal class="sm-eyebrow">{{ t.security.eyebrow }}</span>
        <h2 id="nsec-title" v-reveal="60" class="sm-h2">{{ t.security.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.security.lead }}</p>
      </div>
      <ul class="nsec__grid">
        <li v-for="(item, i) in items" :key="item.title" v-reveal="(i % 4) * 50" class="nsec__item">
          <component :is="item.icon" :size="20" aria-hidden="true" />
          <b>{{ item.title }}</b>
          <span>{{ item.text }}</span>
        </li>
      </ul>
      <a v-reveal :href="lp('/#security')" class="sm-link nsec__link"
        >{{ t.security.link }} <ArrowRight :size="16"
      /></a>
    </div>
  </section>
</template>

<style scoped>
.nsec__head {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 760px;
  margin-bottom: clamp(28px, 4vw, 44px);
}
.nsec__grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}
.nsec__item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 20px;
  border-radius: var(--sm-r-card);
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
}
.nsec__item svg {
  margin-bottom: 6px;
  color: var(--sm-primary-ink);
}
.nsec__item b {
  font-size: 15.5px;
  font-weight: 650;
}
.nsec__item span {
  font-size: 14.5px;
  line-height: 1.5;
  color: var(--sm-muted);
}
.nsec__link {
  margin-top: 24px;
}
@media (max-width: 1000px) {
  .nsec__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 520px) {
  .nsec__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
