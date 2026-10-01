<script setup lang="ts">
/**
 * Access & identity: the questions roles are designed from, and single
 * sign-on as something assessed during discovery, never as available.
 */
import { CircleHelp, Fingerprint } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import { useCopy } from '~/i18n'

const t = useCopy('security')
</script>

<template>
  <section
    class="sm-section sm-section--compact sm-section--tint saccess"
    aria-labelledby="saccess-title"
  >
    <div class="sm-container saccess__grid">
      <div class="saccess__copy">
        <span v-reveal class="sm-eyebrow">{{ t.access.eyebrow }}</span>
        <h2 id="saccess-title" v-reveal="60" class="sm-h2">{{ t.access.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.access.lead }}</p>
        <aside v-reveal="160" class="saccess__note" aria-labelledby="saccess-sso">
          <Fingerprint :size="20" aria-hidden="true" />
          <div>
            <b id="saccess-sso">{{ t.access.sso.title }}</b>
            <p>{{ t.access.sso.text }}</p>
          </div>
        </aside>
      </div>
      <ol v-reveal="120" class="saccess__list">
        <li v-for="question in t.access.questions" :key="question">
          <CircleHelp :size="18" aria-hidden="true" />
          <span>{{ question }}</span>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.saccess__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(32px, 5vw, 72px);
  align-items: start;
}
.saccess__copy {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.saccess__note {
  display: flex;
  gap: 14px;
  margin-top: 8px;
  padding: 18px 20px;
  border-radius: var(--sm-r-card);
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
}
.saccess__note svg {
  flex: none;
  margin-top: 2px;
  color: var(--sm-primary-ink);
}
.saccess__note b {
  font-size: 15px;
  font-weight: 650;
}
.saccess__note p {
  margin-top: 4px;
  font-size: 14.5px;
  line-height: 1.55;
  color: var(--sm-muted);
}
.saccess__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.saccess__list li {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 16px 18px;
  border-radius: var(--sm-r-card);
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
  font-size: 15.5px;
  line-height: 1.5;
}
.saccess__list svg {
  flex: none;
  margin-top: 2px;
  color: var(--sm-primary-ink);
}
@media (max-width: 900px) {
  .saccess__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
