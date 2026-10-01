<script setup lang="ts">
/**
 * The hero's security model concept: the areas a security model connects,
 * around the model agreed per implementation. An architecture drawing, not
 * a list of controls: the caption says it is a concept, and screen readers
 * get the description instead of the drawing. On phones the drawing
 * becomes a stack under the model.
 */
import { computed } from 'vue'
import { Cable, Database, Fingerprint, KeyRound, ServerCog } from 'lucide-vue-next'
import markUrl from '~/assets/brand/mlmsofts-mark.png'
import VisualNote from '~/components/site/visual_note.vue'
import { useCopy } from '~/i18n'

const t = useCopy('security')

const nodes = computed(() => {
  const copy = t.value.model.nodes
  return [
    { key: 'identity', icon: Fingerprint, ...copy.identity },
    { key: 'access', icon: KeyRound, ...copy.access },
    { key: 'data', icon: Database, ...copy.data },
    { key: 'integrations', icon: Cable, ...copy.integrations },
    { key: 'operations', icon: ServerCog, ...copy.operations },
  ]
})

/* the connectors, in the drawing's 100 × 100 space (the grid cells' centres) */
const lines = [
  [50, 37.5, 50, 12.5],
  [50, 37.5, 16, 37.5],
  [50, 37.5, 84, 37.5],
  [50, 37.5, 50, 62.5],
  [50, 62.5, 50, 87.5],
]
</script>

<template>
  <figure class="smod" aria-labelledby="smod-caption" aria-describedby="smod-description">
    <p id="smod-description" class="sr-only">{{ t.model.description }}</p>
    <div class="smod__stage" aria-hidden="true">
      <svg class="smod__lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line
          v-for="([x1, y1, x2, y2], i) in lines"
          :key="i"
          :x1="x1"
          :y1="y1"
          :x2="x2"
          :y2="y2"
          class="smod__line"
          :style="{ animationDelay: `${i * -0.7}s` }"
        />
      </svg>

      <div class="smod__hub">
        <span class="smod__hub-mark"><img :src="markUrl" alt="" width="27" height="30" /></span>
        <b>{{ t.model.centre }}</b>
        <span>{{ t.model.centreText }}</span>
      </div>

      <div
        v-for="node in nodes"
        :key="node.key"
        class="smod__node"
        :class="`smod__node--${node.key}`"
      >
        <span class="sm-icon-tile sm-icon-tile--sm"><component :is="node.icon" :size="18" /></span>
        <span class="smod__text">
          <b>{{ node.label }}</b>
          <span>{{ node.text }}</span>
        </span>
      </div>
    </div>
    <figcaption id="smod-caption"><VisualNote :label="t.model.caption" /></figcaption>
  </figure>
</template>

<style scoped>
.smod {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 0;
}
.smod__stage {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
  grid-template-rows: repeat(4, minmax(78px, auto));
  grid-template-areas:
    '. identity .'
    'access hub data'
    '. integrations .'
    '. operations .';
  align-items: center;
  gap: 16px 18px;
  padding: clamp(18px, 2.4vw, 28px);
  border-radius: var(--sm-r-shell);
  border: 1px solid var(--sm-border);
  background:
    radial-gradient(60% 50% at 50% 38%, var(--sm-glow), transparent 70%), var(--sm-surface);
  box-shadow: var(--sm-shadow-soft);
}
.smod__lines {
  position: absolute;
  inset: clamp(18px, 2.4vw, 28px);
  width: calc(100% - 2 * clamp(18px, 2.4vw, 28px));
  height: calc(100% - 2 * clamp(18px, 2.4vw, 28px));
  overflow: visible;
}
.smod__line {
  stroke: var(--sm-primary);
  stroke-opacity: 0.45;
  stroke-width: 1.4;
  stroke-dasharray: 3 4;
  vector-effect: non-scaling-stroke;
  animation: smod-flow 2.8s linear infinite;
}
@keyframes smod-flow {
  to {
    stroke-dashoffset: -14;
  }
}
.smod__hub {
  grid-area: hub;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 16px 12px;
  text-align: center;
  border-radius: var(--sm-r-card);
  color: var(--sm-on-inverse);
  background:
    radial-gradient(80% 90% at 50% 0%, rgba(0, 152, 247, 0.35), transparent 70%),
    var(--sm-surface-inverse);
  border: 1px solid var(--sm-inverse-edge);
  box-shadow: var(--sm-shadow-float);
}
.smod__hub-mark {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.08);
}
.smod__hub b {
  font-family: var(--sm-display);
  font-size: 15px;
  font-weight: 700;
}
.smod__hub > span:last-child {
  font-size: 12.5px;
  color: var(--sm-on-inverse-muted);
}
.smod__node {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 12px;
  border-radius: var(--sm-r-md);
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
  min-width: 0;
}
.smod__node--identity {
  grid-area: identity;
}
.smod__node--access {
  grid-area: access;
}
.smod__node--data {
  grid-area: data;
}
.smod__node--integrations {
  grid-area: integrations;
}
.smod__node--operations {
  grid-area: operations;
}
.smod__text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.smod__text b {
  font-size: 14px;
  font-weight: 650;
}
.smod__text span {
  font-size: 12.5px;
  line-height: 1.35;
  color: var(--sm-muted);
}
@media (prefers-reduced-motion: reduce) {
  .smod__line {
    animation: none;
  }
}
/* phones: the model first, then each area as a row */
@media (max-width: 560px) {
  .smod__stage {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: none;
    grid-template-areas:
      'hub'
      'identity'
      'access'
      'data'
      'integrations'
      'operations';
    gap: 10px;
  }
  .smod__lines {
    display: none;
  }
  .smod__node {
    flex-direction: row;
    align-items: center;
    gap: 12px;
  }
}
</style>
