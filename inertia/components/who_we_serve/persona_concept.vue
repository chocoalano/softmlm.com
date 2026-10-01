<script setup lang="ts">
/**
 * Frames a role's interface or workflow concept, with one caption under it
 * saying it is a concept with sample data.
 */
import { computed } from 'vue'
import { vReveal } from '~/composables/reveal'
import VisualNote from '~/components/site/visual_note.vue'
import { useCopy } from '~/i18n'
import type { PersonaKey } from '@shared/personas'

const props = defineProps<{ persona: PersonaKey }>()

const t = useCopy('personas')
const concept = computed(() => t.value.personas[props.persona].concept)
</script>

<template>
  <section
    class="sm-section sm-section--compact sm-section--tint pc"
    aria-labelledby="concept-title"
  >
    <div class="sm-container">
      <div class="sm-heading sm-heading--center pc__head">
        <span v-reveal class="sm-eyebrow">{{ concept.eyebrow }}</span>
        <h2 id="concept-title" v-reveal="60" class="sm-h2">{{ concept.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ concept.lead }}</p>
      </div>
      <div v-reveal="120" class="pc__stage">
        <slot />
      </div>
      <VisualNote :label="concept.caption" />
    </div>
  </section>
</template>

<style scoped>
.pc__head {
  margin-bottom: clamp(32px, 4vw, 56px);
}
.pc__stage {
  position: relative;
  display: flex;
  justify-content: center;
}
</style>
