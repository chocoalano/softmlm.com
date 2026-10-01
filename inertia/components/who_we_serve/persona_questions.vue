<script setup lang="ts">
import { computed } from 'vue'
import { CircleHelp } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import MarketingWhatsappCta from '~/components/site/marketing_whatsapp_cta.vue'
import { personaTrackingPage, type PersonaKey } from '@shared/personas'
import { useCopy } from '~/i18n'

const props = defineProps<{ persona: PersonaKey }>()

const t = useCopy('personas')
const questions = computed(() => t.value.personas[props.persona].questions)
</script>

<template>
  <section class="sm-section sm-section--compact pq" aria-labelledby="questions-title">
    <div class="sm-container pq__grid">
      <div class="pq__head">
        <span v-reveal class="sm-eyebrow">{{ t.shared.yourQuestions }}</span>
        <h2 id="questions-title" v-reveal="60" class="sm-h2">{{ questions.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ questions.lead }}</p>
        <div v-reveal="160" class="pq__ask">
          <MarketingWhatsappCta
            :context="persona"
            :page="personaTrackingPage(persona)"
            section="questions"
            variant="contextual"
            :label="t.shared.askWhatsapp"
          />
          <a href="#demo" class="sm-link">{{ t.shared.orBookDemo }}</a>
        </div>
      </div>
      <ol class="pq__list">
        <li v-for="(question, i) in questions.items" :key="question" v-reveal="i * 50">
          <CircleHelp :size="20" aria-hidden="true" />
          <span>{{ question }}</span>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.pq__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
  gap: clamp(40px, 6vw, 96px);
  align-items: center;
}
.pq__head {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
}
.pq__ask {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 24px;
  margin-top: 8px;
}
.pq__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.pq__list li {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 18px 20px;
  border-radius: 16px;
  background: var(--sm-surface-subtle);
  font-size: 16.5px;
  font-weight: 600;
  line-height: 1.45;
  letter-spacing: -0.01em;
}
.pq__list svg {
  flex: none;
  margin-top: 1px;
  color: var(--sm-primary-ink);
}
@media (max-width: 980px) {
  .pq__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
@media (max-width: 560px) {
  .pq__ask {
    width: 100%;
  }
  .pq__ask > .sm-btn {
    width: 100%;
  }
  .pq__list li {
    font-size: 15.5px;
    padding: 16px;
  }
}
</style>
