<script setup lang="ts">
/**
 * A self-check for the visitor. It runs in the browser only: the ticks are
 * never stored, sent or added to the WhatsApp message, and the result
 * never grades the project; it only suggests what to bring to discovery.
 */
import { computed, ref } from 'vue'
import { Check, ClipboardCheck } from 'lucide-vue-next'
import MarketingWhatsappCta from '~/components/site/marketing_whatsapp_cta.vue'
import { HOW_WE_DO_IT_TRACKING_PAGE } from '@shared/implementation'
import { vReveal } from '~/composables/reveal'
import { useCopy } from '~/i18n'

const t = useCopy('implementation')
const copy = computed(() => t.value.readiness)
const ticked = ref<boolean[]>([])

const count = computed(() => ticked.value.filter(Boolean).length)
const total = computed(() => copy.value.items.length)
const result = computed(() => {
  const results = copy.value.results
  if (count.value === 0) return results.none
  if (count.value === total.value) return results.all
  return count.value >= total.value / 2 ? results.most : results.some
})
</script>

<template>
  <section id="readiness" class="sm-section sm-section--compact ird" aria-labelledby="ird-title">
    <div class="sm-container ird__grid">
      <div class="ird__side">
        <span v-reveal class="sm-eyebrow">{{ copy.eyebrow }}</span>
        <h2 id="ird-title" v-reveal="60" class="sm-h2">{{ copy.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ copy.lead }}</p>
      </div>

      <div v-reveal="80" class="ird__panel">
        <fieldset class="ird__fieldset">
          <legend class="ird__legend">{{ copy.legend }}</legend>
          <label v-for="(item, i) in copy.items" :key="item" class="ird__item">
            <input v-model="ticked[i]" type="checkbox" class="ird__input" />
            <span class="ird__box" aria-hidden="true"><Check :size="15" /></span>
            <span>{{ item }}</span>
          </label>
        </fieldset>

        <div class="ird__result">
          <div
            class="ird__meter"
            :style="{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }"
            aria-hidden="true"
          >
            <span
              v-for="i in total"
              :key="i"
              class="ird__seg"
              :class="{ 'ird__seg--on': i <= count }"
            />
          </div>
          <div class="ird__result-text" aria-live="polite">
            <span class="ird__count">{{ copy.progress(count, total) }}</span>
            <p>
              <ClipboardCheck :size="18" aria-hidden="true" />
              <span>{{ result }}</span>
            </p>
          </div>
          <p class="ird__note">{{ copy.note }}</p>
          <MarketingWhatsappCta
            context="implementation_general"
            :page="HOW_WE_DO_IT_TRACKING_PAGE"
            section="readiness"
            variant="primary"
            :label="copy.cta"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ird__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.3fr);
  gap: clamp(40px, 6vw, 88px);
  align-items: start;
}
.ird__side {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.ird__panel {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: clamp(22px, 3vw, 36px);
  border-radius: var(--sm-r-card);
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
  box-shadow: var(--sm-shadow-soft);
}
.ird__fieldset {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
  border: 0;
}
.ird__legend {
  margin-bottom: 8px;
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--sm-muted);
}
.ird__item {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid var(--sm-border);
  font-size: 15.5px;
  line-height: 1.45;
  color: var(--sm-text-2);
  cursor: pointer;
  transition:
    border-color 0.15s,
    background 0.15s;
}
.ird__item:hover {
  border-color: var(--sm-border-2);
  background: var(--sm-surface-subtle);
}
/* the real checkbox stays in place for keyboard, touch and screen readers */
.ird__input {
  position: absolute;
  top: 14px;
  left: 16px;
  width: 20px;
  height: 20px;
  margin: 0;
  opacity: 0;
  cursor: pointer;
}
.ird__box {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  flex: none;
  margin-top: 1px;
  border-radius: 6px;
  border: 2px solid var(--sm-border-2);
  background: var(--sm-surface);
  color: transparent;
  transition:
    background 0.15s,
    border-color 0.15s,
    color 0.15s;
}
.ird__input:checked + .ird__box {
  border-color: var(--sm-primary);
  background: var(--sm-primary);
  color: #fff;
}
.ird__input:focus-visible + .ird__box {
  outline: 2px solid var(--sm-primary-ink);
  outline-offset: 2px;
}
.ird__item:has(.ird__input:checked) {
  border-color: var(--sm-primary-200);
  background: var(--sm-primary-50);
  color: var(--sm-text);
}
.ird__result {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  padding-top: 20px;
  border-top: 1px solid var(--sm-border);
}
.ird__meter {
  display: grid;
  gap: 4px;
  width: 100%;
}
.ird__seg {
  height: 6px;
  border-radius: 999px;
  background: var(--sm-surface-hover);
  transition: background 0.2s;
}
.ird__seg--on {
  background: linear-gradient(90deg, var(--sm-primary), var(--sm-accent));
}
.ird__result-text {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.ird__count {
  font-size: 13px;
  font-weight: 600;
  color: var(--sm-muted);
}
.ird__result-text p {
  display: flex;
  gap: 10px;
  font-size: 16.5px;
  font-weight: 600;
  line-height: 1.45;
  color: var(--sm-text);
}
.ird__result-text svg {
  flex: none;
  margin-top: 2px;
  color: var(--sm-primary-ink);
}
.ird__note {
  font-size: 13.5px;
  line-height: 1.5;
  color: var(--sm-muted);
}
@media (prefers-reduced-motion: reduce) {
  .ird__item,
  .ird__box,
  .ird__seg {
    transition: none;
  }
}
@media (max-width: 980px) {
  .ird__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
