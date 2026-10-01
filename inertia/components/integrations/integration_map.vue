<script setup lang="ts">
/**
 * The hero's architecture concept: the MLM system in the middle, the areas
 * that may need to exchange data around it. A concept, not a list of
 * connectors: no provider names or logos, and the caption says so. Screen
 * readers get the description instead of the drawing. On phones the ring
 * becomes a stack of cards under the hub.
 */
import { computed } from 'vue'
import { Boxes, Calculator, CreditCard, Landmark, MessageSquare, Truck } from 'lucide-vue-next'
import markUrl from '~/assets/brand/mlmsofts-mark.png'
import VisualNote from '~/components/site/visual_note.vue'
import { useCopy } from '~/i18n'

const t = useCopy('integrations')

const nodes = computed(() => {
  const labels = t.value.map.nodes
  return [
    { key: 'payments', icon: CreditCard, label: labels.payments },
    { key: 'banking', icon: Landmark, label: labels.banking },
    { key: 'logistics', icon: Truck, label: labels.logistics },
    { key: 'finance', icon: Calculator, label: labels.finance },
    { key: 'messaging', icon: MessageSquare, label: labels.messaging },
    { key: 'systems', icon: Boxes, label: labels.systems },
  ]
})

/* where each line ends, in the drawing's 100 × 100 space (the grid cells' centres) */
const ends = [
  [16, 15],
  [84, 15],
  [16, 50],
  [84, 50],
  [16, 85],
  [84, 85],
]
</script>

<template>
  <figure class="imap" aria-labelledby="imap-caption" aria-describedby="imap-description">
    <p id="imap-description" class="sr-only">{{ t.map.description }}</p>
    <div class="imap__stage" aria-hidden="true">
      <svg class="imap__lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line
          v-for="([x, y], i) in ends"
          :key="i"
          x1="50"
          y1="50"
          :x2="x"
          :y2="y"
          class="imap__line"
          :style="{ animationDelay: `${i * -0.6}s` }"
        />
      </svg>

      <div class="imap__hub">
        <span class="imap__hub-mark"><img :src="markUrl" alt="" width="27" height="30" /></span>
        <b>{{ t.map.centre }}</b>
        <span>{{ t.map.centreText }}</span>
      </div>

      <div
        v-for="(node, i) in nodes"
        :key="node.key"
        class="imap__node"
        :class="`imap__node--${i}`"
      >
        <span class="sm-icon-tile sm-icon-tile--sm"><component :is="node.icon" :size="18" /></span>
        <span class="imap__label">{{ node.label }}</span>
      </div>
    </div>
    <figcaption id="imap-caption"><VisualNote :label="t.map.caption" /></figcaption>
  </figure>
</template>

<style scoped>
.imap {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 0;
}
.imap__stage {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.9fr) minmax(0, 1fr);
  grid-template-rows: repeat(3, minmax(84px, auto));
  align-items: center;
  gap: 18px 20px;
  padding: clamp(20px, 3vw, 32px);
  border-radius: var(--sm-r-shell);
  border: 1px solid var(--sm-border);
  background:
    radial-gradient(60% 60% at 50% 50%, var(--sm-glow), transparent 75%), var(--sm-surface);
  box-shadow: var(--sm-shadow-product);
  isolation: isolate;
}
.imap__lines {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.imap__line {
  stroke: var(--sm-primary);
  stroke-opacity: 0.45;
  stroke-width: 1.5;
  stroke-dasharray: 3 5;
  vector-effect: non-scaling-stroke;
  animation: imap-flow 3.6s linear infinite;
}
@keyframes imap-flow {
  to {
    stroke-dashoffset: -32;
  }
}
@media (prefers-reduced-motion: reduce) {
  .imap__line {
    animation: none;
  }
}
.imap__hub {
  grid-column: 2;
  grid-row: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 20px 14px;
  border-radius: 20px;
  text-align: center;
  background: var(--sm-surface-inverse);
  color: var(--sm-on-inverse);
  box-shadow:
    0 0 0 6px var(--sm-primary-50),
    var(--sm-shadow-float);
}
.imap__hub-mark {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  margin-bottom: 6px;
  border-radius: 14px;
  background: #ffffff;
}
.imap__hub-mark img {
  width: auto;
  height: 28px;
}
.imap__hub b {
  font-size: 15.5px;
  font-weight: 650;
}
.imap__hub span:last-child {
  font-size: 12.5px;
  color: var(--sm-on-inverse-muted);
}
.imap__node {
  display: flex;
  align-items: center;
  gap: 9px;
  min-width: 0;
  padding: 10px 12px;
  border-radius: 16px;
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
  box-shadow: var(--sm-shadow-soft);
}
.imap__node .sm-icon-tile {
  width: 32px;
  height: 32px;
}
.imap__label {
  min-width: 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.3;
  overflow-wrap: break-word;
  hyphens: auto;
}
.imap__node--0 {
  grid-column: 1;
  grid-row: 1;
}
.imap__node--1 {
  grid-column: 3;
  grid-row: 1;
}
.imap__node--2 {
  grid-column: 1;
  grid-row: 2;
}
.imap__node--3 {
  grid-column: 3;
  grid-row: 2;
}
.imap__node--4 {
  grid-column: 1;
  grid-row: 3;
}
.imap__node--5 {
  grid-column: 3;
  grid-row: 3;
}

/* phones: the hub on top, the areas as a stack of cards under it */
@media (max-width: 640px) {
  .imap__stage {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: none;
    align-items: stretch;
    gap: 10px;
  }
  .imap__lines {
    display: none;
  }
  .imap__hub {
    grid-column: 1 / -1;
    grid-row: auto;
    margin-bottom: 10px;
  }
  .imap__node {
    grid-column: auto !important;
    grid-row: auto !important;
    padding: 10px 12px;
  }
}
@media (max-width: 380px) {
  .imap__stage {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
