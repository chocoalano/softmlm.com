<script setup lang="ts">
/**
 * Frames a feature's interface concept, with one caption under it saying
 * it is a concept with sample data.
 */
import { computed } from 'vue'
import { vReveal } from '~/composables/reveal'
import VisualNote from '~/components/site/visual_note.vue'
import type { FeatureKey } from '@shared/features'
import { useCopy } from '~/i18n'

const props = defineProps<{ feature: FeatureKey }>()
const t = useCopy('features')
const concept = computed(() => t.value.pages[props.feature].concept)
</script>

<template>
  <section
    class="sm-section sm-section--compact sm-section--tint fc"
    aria-labelledby="concept-title"
  >
    <div class="sm-container">
      <div class="sm-heading sm-heading--center fc__head">
        <span v-reveal class="sm-eyebrow">{{ concept.eyebrow }}</span>
        <h2 id="concept-title" v-reveal="60" class="sm-h2">{{ concept.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ concept.lead }}</p>
      </div>
      <div v-reveal="120" class="fc__stage">
        <slot />
      </div>
      <VisualNote />
    </div>
  </section>
</template>

<style scoped>
.fc__head {
  margin-bottom: clamp(32px, 4vw, 56px);
}
.fc__stage {
  display: flex;
  justify-content: center;
}
</style>
