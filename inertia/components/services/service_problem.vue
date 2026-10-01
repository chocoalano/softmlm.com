<script setup lang="ts">
import { computed } from 'vue'
import { MessageCircleQuestion } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import type { ServiceKey } from '@shared/services'
import { useCopy } from '~/i18n'

const props = defineProps<{ service: ServiceKey }>()
const t = useCopy('services')
const problem = computed(() => t.value.pages[props.service].problem)
</script>

<template>
  <section class="sm-section sm-section--compact sm-section--tint spb" aria-labelledby="spb-title">
    <div class="sm-container spb__grid">
      <div class="spb__copy">
        <span v-reveal class="sm-eyebrow">{{ t.shared.problemEyebrow }}</span>
        <h2 id="spb-title" v-reveal="60" class="sm-h2 spb__title">{{ problem.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ problem.lead }}</p>
      </div>
      <ul v-reveal="120" class="spb__signals">
        <li v-for="signal in problem.signals" :key="signal">
          <MessageCircleQuestion :size="18" aria-hidden="true" />
          <span>{{ signal }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.spb__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: clamp(40px, 6vw, 96px);
  align-items: center;
}
.spb__copy {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.spb__title {
  font-size: clamp(30px, 3.6vw, 46px);
}
.spb__signals {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.spb__signals li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 16px;
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
  font-size: 15.5px;
  line-height: 1.5;
  color: var(--sm-text-2);
}
.spb__signals svg {
  flex: none;
  margin-top: 2px;
  color: var(--sm-warn);
}
@media (max-width: 900px) {
  .spb__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
