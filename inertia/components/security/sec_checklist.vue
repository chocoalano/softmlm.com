<script setup lang="ts">
/**
 * Security requirements checklist, for the visitor's own preparation.
 * Nothing is scored, saved or sent: the answers live in this component
 * only, and the result is one plain sentence. Native checkboxes, so
 * keyboard and screen readers work as they do everywhere else.
 */
import { ref } from 'vue'
import { ListChecks } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import { useCopy } from '~/i18n'

const t = useCopy('security')
const checked = ref<number[]>([])
</script>

<template>
  <section
    id="checklist"
    class="sm-section sm-section--compact sm-section--tint scheck"
    aria-labelledby="scheck-title"
  >
    <div class="sm-container scheck__grid">
      <div class="scheck__copy">
        <span v-reveal class="sm-eyebrow">{{ t.checklist.eyebrow }}</span>
        <h2 id="scheck-title" v-reveal="60" class="sm-h2">{{ t.checklist.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.checklist.lead }}</p>
      </div>

      <div v-reveal="120" class="scheck__card">
        <fieldset class="scheck__list">
          <legend class="scheck__legend">
            <ListChecks :size="18" aria-hidden="true" /> {{ t.checklist.label }}
          </legend>
          <label v-for="(item, i) in t.checklist.items" :key="item" class="scheck__item">
            <input v-model="checked" type="checkbox" :value="i" />
            <span>{{ item }}</span>
          </label>
        </fieldset>

        <p class="scheck__result" role="status" aria-live="polite">
          {{ checked.length ? t.checklist.result : t.checklist.resultEmpty }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scheck__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  gap: clamp(32px, 5vw, 72px);
  align-items: start;
}
.scheck__copy {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.scheck__card {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: clamp(22px, 3vw, 32px);
  border-radius: var(--sm-r-shell);
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
  box-shadow: var(--sm-shadow-soft);
}
.scheck__list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 0;
  padding: 0;
  margin: 0;
}
.scheck__legend {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: 650;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--sm-muted);
}
.scheck__legend svg {
  color: var(--sm-primary-ink);
}
.scheck__item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 14px;
  border-radius: var(--sm-r-md);
  border: 1px solid var(--sm-border);
  cursor: pointer;
  font-size: 15.5px;
  line-height: 1.45;
  transition:
    border-color 0.15s var(--sm-ease),
    background-color 0.15s var(--sm-ease);
}
.scheck__item:hover {
  border-color: var(--sm-border-2);
}
.scheck__item:has(input:checked) {
  border-color: var(--sm-primary);
  background: var(--sm-primary-50);
}
.scheck__item input {
  flex: none;
  width: 18px;
  height: 18px;
  margin-top: 1px;
  accent-color: var(--sm-primary);
}
.scheck__item:has(input:focus-visible) {
  outline: 2px solid var(--sm-primary);
  outline-offset: 2px;
}
.scheck__result {
  padding: 14px 16px;
  border-radius: var(--sm-r-md);
  background: var(--sm-surface-subtle);
  font-size: 15px;
  line-height: 1.5;
}
@media (max-width: 900px) {
  .scheck__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
