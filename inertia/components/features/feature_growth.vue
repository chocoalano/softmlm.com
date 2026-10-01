<script setup lang="ts">
/**
 * "Why it gets harder as the network grows": three stages, each drawn as
 * a denser cluster of nodes. The clusters are decoration; the stages are
 * an ordered list with their text.
 */
import { computed } from 'vue'
import { vReveal } from '~/composables/reveal'
import type { FeatureKey } from '@shared/features'
import { useCopy } from '~/i18n'

const props = defineProps<{ feature: FeatureKey }>()
const t = useCopy('features')
const growth = computed(() => t.value.pages[props.feature].growth)

/** Deterministic node rings: 1, 2 and 3 rings around a centre. */
function cluster(rings: number) {
  const nodes: { x: number; y: number; r: number; hub: boolean }[] = [
    { x: 60, y: 60, r: 5, hub: true },
  ]
  for (let ring = 1; ring <= rings; ring++) {
    const count = ring * 7
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + ring * 0.4
      const radius = ring * 16
      nodes.push({
        x: 60 + Math.cos(angle) * radius,
        y: 60 + Math.sin(angle) * radius,
        r: 3.2 - ring * 0.55,
        hub: false,
      })
    }
  }
  return nodes
}

const clusters = [cluster(1), cluster(2), cluster(3)]
</script>

<template>
  <section class="sm-section sm-section--compact fg" aria-labelledby="growth-title">
    <div class="sm-container">
      <div class="sm-heading fg__head">
        <span v-reveal class="sm-eyebrow">{{ t.shared.growthEyebrow }}</span>
        <h2 id="growth-title" v-reveal="60" class="sm-h2">{{ growth.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ growth.lead }}</p>
      </div>
      <ol class="fg__stages">
        <li v-for="(stage, i) in growth.stages" :key="stage.label" v-reveal="i * 80">
          <svg viewBox="0 0 120 120" class="fg__cluster" aria-hidden="true">
            <line
              v-for="(node, n) in clusters[i].slice(1)"
              :key="`l${n}`"
              x1="60"
              y1="60"
              :x2="node.x"
              :y2="node.y"
              class="fg__edge"
            />
            <circle
              v-for="(node, n) in clusters[i]"
              :key="`n${n}`"
              :cx="node.x"
              :cy="node.y"
              :r="node.r"
              :class="node.hub ? 'fg__hub' : 'fg__node'"
            />
          </svg>
          <span class="fg__step">{{ t.shared.stageLabel(i + 1) }}</span>
          <b>{{ stage.label }}</b>
          <span class="fg__text">{{ stage.text }}</span>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.fg__head {
  max-width: 820px;
  margin-bottom: clamp(32px, 4vw, 56px);
}
.fg__stages {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}
.fg__stages li {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 26px;
  border-radius: var(--sm-r-card);
  background: var(--sm-surface-subtle);
}
.fg__cluster {
  width: 112px;
  height: 112px;
  margin-bottom: 10px;
}
.fg__edge {
  stroke: var(--sm-primary-200);
  stroke-width: 0.8;
}
.fg__node {
  fill: var(--sm-accent);
}
.fg__hub {
  fill: var(--sm-tech);
}
.fg__step {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--sm-primary-ink);
}
.fg__stages b {
  font-family: var(--sm-display);
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.02em;
}
.fg__text {
  font-size: 15.5px;
  line-height: 1.6;
  color: var(--sm-muted);
}
@media (max-width: 900px) {
  .fg__stages {
    grid-template-columns: minmax(0, 1fr);
  }
  .fg__stages li {
    display: grid;
    grid-template-columns: 72px minmax(0, 1fr);
    column-gap: 18px;
    align-items: start;
  }
  .fg__cluster {
    grid-row: 1 / span 3;
    width: 72px;
    height: 72px;
    margin: 0;
  }
}
</style>
