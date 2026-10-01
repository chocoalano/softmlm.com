<script setup lang="ts">
/**
 * A process drawn as connected steps. It is an ordered list, so the
 * sequence reads the same with a screen reader; the track and dots are
 * decoration. Horizontal on wide screens, vertical below 1080px.
 */
import { vReveal } from '~/composables/reveal'

withDefaults(
  defineProps<{
    steps: { title: string; text: string; href?: string }[]
    label: string
    tone?: 'light' | 'dark'
  }>(),
  { tone: 'light' }
)
</script>

<template>
  <ol class="flow" :class="`flow--${tone}`" :aria-label="label" :style="{ '--n': steps.length }">
    <li v-for="(step, i) in steps" :key="step.title" v-reveal="i * 60" class="flow__step">
      <span class="flow__dot" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
      <span class="flow__body">
        <a v-if="step.href" :href="step.href" class="flow__title flow__title--link">{{
          step.title
        }}</a>
        <b v-else class="flow__title">{{ step.title }}</b>
        <span class="flow__text">{{ step.text }}</span>
      </span>
    </li>
  </ol>
</template>

<style scoped>
.flow {
  --track: var(--sm-border-2);
  --dot-bg: var(--sm-surface);
  --dot-ink: var(--sm-primary-ink);
  --dot-ring: var(--sm-primary-200);
  --title: var(--sm-text);
  --text: var(--sm-muted);
  position: relative;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(var(--n), minmax(0, 1fr));
  gap: 20px;
}
.flow--dark {
  --track: rgba(255, 255, 255, 0.16);
  --dot-bg: var(--sm-deep-2);
  --dot-ink: var(--sm-tech);
  --dot-ring: rgba(2, 200, 250, 0.4);
  --title: #fff;
  --text: rgba(255, 255, 255, 0.66);
}
.flow::before {
  content: '';
  position: absolute;
  top: 21px;
  left: 22px;
  right: 22px;
  height: 2px;
  border-radius: 2px;
  background: var(--track);
}
.flow__step {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}
.flow__dot {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--dot-bg);
  border: 2px solid var(--dot-ring);
  color: var(--dot-ink);
  font-family: var(--sm-mono);
  font-size: 12.5px;
  font-weight: 500;
  z-index: 1;
}
.flow__body {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.flow__title {
  font-family: var(--sm-display);
  font-size: 17px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.015em;
  color: var(--title);
}
.flow__title--link {
  text-decoration: underline;
  text-decoration-color: var(--dot-ring);
  text-underline-offset: 4px;
  text-decoration-thickness: 2px;
}
.flow__title--link:hover {
  color: var(--dot-ink);
}
.flow__text {
  font-size: 14.5px;
  line-height: 1.55;
  color: var(--text);
}

@media (max-width: 1080px) {
  .flow {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
  }
  .flow::before {
    top: 22px;
    bottom: 22px;
    left: 21px;
    right: auto;
    width: 2px;
    height: auto;
  }
  .flow__step {
    flex-direction: row;
    gap: 18px;
    padding-bottom: 24px;
  }
  .flow__step:last-child {
    padding-bottom: 0;
  }
  .flow__dot {
    flex: none;
  }
  .flow__body {
    padding-top: 10px;
  }
}
</style>
