<script setup lang="ts">
/**
 * Integration readiness checklist, for the visitor's own preparation.
 * Nothing is scored, saved or sent: the answers live in this component
 * only, and the result is one of two plain sentences. Native checkboxes,
 * so keyboard and screen readers work as they do everywhere else.
 */
import { computed, ref } from 'vue'
import { ListChecks } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import MarketingWhatsappCta from '~/components/site/marketing_whatsapp_cta.vue'
import { INTEGRATIONS_TRACKING_PAGE } from '@shared/integrations'
import { useCopy } from '~/i18n'

const t = useCopy('integrations')
const checked = ref<number[]>([])
const allChecked = computed(() => checked.value.length === t.value.readiness.items.length)
</script>

<template>
  <section
    id="readiness"
    class="sm-section sm-section--compact sm-section--tint nready"
    aria-labelledby="nready-title"
  >
    <div class="sm-container nready__grid">
      <div class="nready__copy">
        <span v-reveal class="sm-eyebrow">{{ t.readiness.eyebrow }}</span>
        <h2 id="nready-title" v-reveal="60" class="sm-h2">{{ t.readiness.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.readiness.lead }}</p>
      </div>

      <div v-reveal="120" class="nready__card">
        <fieldset class="nready__list">
          <legend class="nready__legend">
            <ListChecks :size="18" aria-hidden="true" /> {{ t.readiness.label }}
          </legend>
          <label v-for="(item, i) in t.readiness.items" :key="item" class="nready__item">
            <input v-model="checked" type="checkbox" :value="i" />
            <span>{{ item }}</span>
          </label>
        </fieldset>

        <p class="nready__result" role="status" aria-live="polite">
          {{ allChecked ? t.readiness.resultReady : t.readiness.resultOpen }}
        </p>

        <div class="nready__actions">
          <MarketingWhatsappCta
            context="integration_discovery"
            :page="INTEGRATIONS_TRACKING_PAGE"
            section="readiness"
            variant="primary"
            :label="t.readiness.cta"
          />
          <a href="#consultation" class="sm-link">{{ t.readiness.form }}</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.nready__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  gap: clamp(32px, 5vw, 72px);
  align-items: start;
}
.nready__copy {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.nready__card {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: clamp(22px, 3vw, 32px);
  border-radius: var(--sm-r-shell);
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
  box-shadow: var(--sm-shadow-soft);
}
.nready__list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
  padding: 0;
  border: 0;
}
.nready__legend {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--sm-primary-ink);
}
.nready__item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid var(--sm-border);
  background: var(--sm-surface-subtle);
  font-size: 15px;
  line-height: 1.45;
  cursor: pointer;
  transition:
    border-color 0.2s,
    background 0.2s;
}
.nready__item:hover {
  border-color: var(--sm-primary-200);
}
.nready__item:has(input:checked) {
  border-color: var(--sm-primary-200);
  background: var(--sm-primary-50);
}
.nready__item input {
  flex: none;
  width: 18px;
  height: 18px;
  margin-top: 1px;
  accent-color: var(--sm-primary);
}
.nready__item input:focus-visible {
  outline: 2px solid var(--sm-primary);
  outline-offset: 2px;
}
.nready__result {
  padding: 14px 16px;
  border-radius: 12px;
  background: var(--sm-surface-inverse);
  color: var(--sm-on-inverse);
  font-size: 15px;
  font-weight: 600;
  line-height: 1.45;
}
.nready__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 20px;
}
@media (max-width: 960px) {
  .nready__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
@media (max-width: 560px) {
  .nready__actions {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
  }
}
</style>
