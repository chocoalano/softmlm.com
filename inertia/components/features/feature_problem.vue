<script setup lang="ts">
import { computed } from 'vue'
import { MessageCircleQuestion, Quote } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import type { FeatureKey } from '@shared/features'
import { useCopy } from '~/i18n'

const props = defineProps<{ feature: FeatureKey }>()
const t = useCopy('features')
const problem = computed(() => t.value.pages[props.feature].problem)
</script>

<template>
  <section
    class="sm-section sm-section--compact sm-section--tint fp"
    aria-labelledby="problem-title"
  >
    <div class="sm-container fp__grid">
      <div class="fp__copy">
        <span v-reveal class="sm-eyebrow">{{ t.shared.problemEyebrow }}</span>
        <Quote v-reveal="40" :size="30" class="fp__mark" aria-hidden="true" />
        <h2 id="problem-title" v-reveal="60" class="fp__quote">“{{ problem.quote }}”</h2>
        <p v-reveal="120" class="sm-lead">{{ problem.text }}</p>
      </div>
      <div v-reveal="120" class="fp__signals">
        <p class="fp__signals-label">{{ t.shared.signalsLabel }}</p>
        <ul>
          <li v-for="signal in problem.signals" :key="signal">
            <MessageCircleQuestion :size="18" aria-hidden="true" />
            <span>{{ signal }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fp__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  gap: clamp(40px, 6vw, 96px);
  align-items: center;
}
.fp__copy {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.fp__mark {
  color: var(--sm-primary-200);
}
.fp__quote {
  font-family: var(--sm-display);
  font-size: clamp(30px, 3.6vw, 46px);
  font-weight: 700;
  line-height: 1.12;
  letter-spacing: -0.03em;
  text-wrap: balance;
}
.fp__signals {
  padding: clamp(22px, 3vw, 32px);
  border-radius: var(--sm-r-shell);
  background: var(--sm-surface);
  border: 1px solid var(--sm-border);
}
.fp__signals-label {
  padding-bottom: 14px;
  margin-bottom: 8px;
  border-bottom: 1px solid var(--sm-border);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--sm-muted);
}
.fp__signals ul {
  list-style: none;
  display: flex;
  flex-direction: column;
}
.fp__signals li {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 14px 0;
  border-bottom: 1px solid var(--sm-border);
  font-size: 16.5px;
  font-weight: 600;
  line-height: 1.45;
}
.fp__signals li:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}
.fp__signals svg {
  flex: none;
  margin-top: 2px;
  color: var(--sm-primary-ink);
}
@media (max-width: 980px) {
  .fp__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
