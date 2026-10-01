<script setup lang="ts">
/**
 * One explanatory section of the compensation page: copy on one side, a
 * visual (slot) on the other. Copy describes what we design with the
 * client; availability claims are not made here (see the claims gate).
 */
import { Check } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'

withDefaults(
  defineProps<{
    id?: string
    eyebrow: string
    title: string
    text: string
    points?: string[]
    tone?: 'light' | 'tint' | 'dark'
    reverse?: boolean
  }>(),
  { id: undefined, points: () => [], tone: 'light', reverse: false }
)
</script>

<template>
  <section
    :id="id"
    class="sm-section cf"
    :class="{
      'sm-section--tint': tone === 'tint',
      'sm-section--dark': tone === 'dark',
      'cf--reverse': reverse,
    }"
  >
    <div class="sm-container cf__grid">
      <div class="cf__copy">
        <span v-reveal class="sm-eyebrow">{{ eyebrow }}</span>
        <h2 v-reveal="60" class="sm-h2 cf__title">{{ title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ text }}</p>
        <ul v-if="points.length" v-reveal="180" class="cf__points">
          <li v-for="point in points" :key="point" class="sm-check">
            <Check :size="18" /> {{ point }}
          </li>
        </ul>
      </div>
      <div v-reveal="120" class="cf__visual">
        <slot />
      </div>
    </div>
  </section>
</template>

<style scoped>
.cf__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
  gap: clamp(36px, 6vw, 96px);
  align-items: center;
}
.cf--reverse .cf__copy {
  order: 2;
}
.cf__copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
}
.cf__title {
  font-size: clamp(30px, 3.6vw, 48px);
}
.cf__points {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 4px;
}
.cf__visual {
  min-width: 0;
}
@media (max-width: 980px) {
  .cf__grid {
    grid-template-columns: minmax(0, 1fr);
  }
  .cf--reverse .cf__copy {
    order: 0;
  }
}
</style>
