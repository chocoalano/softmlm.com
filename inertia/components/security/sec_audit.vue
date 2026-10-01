<script setup lang="ts">
/**
 * Audit & traceability: what is recorded in mlmsoft's own back office
 * today (SEC-ADM-008, docs/security-evidence.md), kept apart from what a
 * customer platform needs, which is agreed per scope.
 */
import { BookCheck, History } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import { useCopy } from '~/i18n'

const t = useCopy('security')
</script>

<template>
  <section class="sm-section sm-section--compact saudit" aria-labelledby="saudit-title">
    <div class="sm-container">
      <div class="saudit__head">
        <span v-reveal class="sm-eyebrow">{{ t.audit.eyebrow }}</span>
        <h2 id="saudit-title" v-reveal="60" class="sm-h2">{{ t.audit.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.audit.lead }}</p>
      </div>
      <div class="saudit__grid">
        <article v-reveal class="saudit__card">
          <span class="sm-icon-tile"><History :size="20" /></span>
          <h3 class="sm-h4">{{ t.audit.today.title }}</h3>
          <p>{{ t.audit.today.text }}</p>
        </article>
        <article v-reveal="80" class="saudit__card saudit__card--platform">
          <span class="sm-icon-tile"><BookCheck :size="20" /></span>
          <h3 class="sm-h4">{{ t.audit.platform.title }}</h3>
          <p>{{ t.audit.platform.text }}</p>
          <ul>
            <li v-for="item in t.audit.platform.items" :key="item">{{ item }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.saudit__head {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 760px;
  margin-bottom: clamp(28px, 4vw, 44px);
}
.saudit__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 14px;
}
.saudit__card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: clamp(22px, 3vw, 30px);
  border-radius: var(--sm-r-card);
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
}
.saudit__card .sm-icon-tile {
  margin-bottom: 6px;
}
.saudit__card p {
  font-size: 15px;
  line-height: 1.6;
  color: var(--sm-muted);
}
.saudit__card--platform {
  border-style: dashed;
  border-color: var(--sm-border-2);
}
.saudit__card ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 4px;
}
.saudit__card li {
  position: relative;
  padding-left: 18px;
  font-size: 15px;
  line-height: 1.5;
}
.saudit__card li::before {
  content: '';
  position: absolute;
  left: 2px;
  top: 0.62em;
  width: 7px;
  height: 7px;
  border-radius: 2px;
  background: var(--sm-primary);
}
@media (max-width: 800px) {
  .saudit__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
