<script setup lang="ts">
import { computed } from 'vue'
import { Info } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import FlowSteps from '~/components/site/flow_steps.vue'
import type { FeatureKey } from '@shared/features'
import { useCopy } from '~/i18n'

const props = defineProps<{ feature: FeatureKey }>()
const t = useCopy('features')
const approach = computed(() => t.value.pages[props.feature].approach)
</script>

<template>
  <section
    class="sm-section sm-section--compact sm-section--dark fa"
    aria-labelledby="approach-title"
  >
    <div class="fa__glow" aria-hidden="true" />
    <div class="sm-container">
      <div class="sm-heading fa__head">
        <span v-reveal class="sm-eyebrow">{{ t.shared.approachEyebrow }}</span>
        <h2 id="approach-title" v-reveal="60" class="sm-h2">{{ approach.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ approach.lead }}</p>
      </div>
      <FlowSteps :steps="approach.steps" :label="approach.title" tone="dark" />
      <p v-reveal class="fa__note"><Info :size="16" aria-hidden="true" /> {{ approach.note }}</p>
    </div>
  </section>
</template>

<style scoped>
.fa {
  overflow: hidden;
  isolation: isolate;
}
.fa__glow {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(40% 60% at 100% 0%, rgba(2, 200, 250, 0.12), transparent 70%),
    radial-gradient(50% 70% at 0% 100%, rgba(0, 93, 251, 0.35), transparent 70%);
}
.fa__head {
  max-width: 820px;
}
.fa__note {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  max-width: 760px;
  margin-top: clamp(32px, 4vw, 48px);
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  font-size: 14.5px;
  line-height: 1.6;
  color: var(--sm-on-inverse-muted);
}
.fa__note svg {
  flex: none;
  margin-top: 3px;
  color: var(--sm-tech);
}
</style>
