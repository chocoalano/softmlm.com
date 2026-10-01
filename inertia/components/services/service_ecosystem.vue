<script setup lang="ts">
/**
 * The services hub's concept diagram: the business in the middle, the
 * software as the core offering, and product, brand and digital growth
 * (SEO, advertising, social media) around it. The same structure is a text
 * list, shown instead of the diagram on narrow screens.
 */
import { computed } from 'vue'
import {
  Blocks,
  Building2,
  Megaphone,
  Package,
  Palette,
  Search,
  CalendarRange,
  TrendingUp,
} from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import { useCopy } from '~/i18n'

const t = useCopy('services')
const eco = computed(() => t.value.hub.ecosystem)

/** Positions in % of the canvas; lines join each node to its parent. */
const nodes = computed(() => [
  { key: 'brand', x: 50, y: 9, parent: 'center', icon: Palette },
  { key: 'product', x: 14, y: 44, parent: 'center', icon: Package },
  { key: 'software', x: 86, y: 44, parent: 'center', icon: Blocks },
  { key: 'growth', x: 50, y: 72, parent: 'center', icon: TrendingUp },
  { key: 'seo', x: 18, y: 93, parent: 'growth', icon: Search },
  { key: 'ads', x: 50, y: 95, parent: 'growth', icon: Megaphone },
  { key: 'social', x: 82, y: 93, parent: 'growth', icon: CalendarRange },
])
const center = { x: 50, y: 44 }
const position = (key: string) =>
  key === 'center' ? center : nodes.value.find((node) => node.key === key)!

type NodeKey = keyof typeof t.value.hub.ecosystem.nodes
const label = (key: string) => eco.value.nodes[key as NodeKey]
</script>

<template>
  <section class="sm-section sm-section--compact seco" aria-labelledby="seco-title">
    <div class="sm-container">
      <div class="sm-heading sm-heading--center">
        <span v-reveal class="sm-eyebrow">{{ eco.eyebrow }}</span>
        <h2 id="seco-title" v-reveal="60" class="sm-h2">{{ eco.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ eco.lead }}</p>
      </div>

      <figure v-reveal="80" class="seco__figure">
        <figcaption class="sr-only">{{ eco.label }}</figcaption>
        <div class="seco__canvas" aria-hidden="true">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" class="seco__lines">
            <line
              v-for="node in nodes"
              :key="node.key"
              :x1="position(node.parent).x"
              :y1="position(node.parent).y"
              :x2="node.x"
              :y2="node.y"
              :class="{ 'seco__line--core': node.key === 'software' }"
              vector-effect="non-scaling-stroke"
            />
          </svg>
          <div class="seco__center" :style="{ left: `${center.x}%`, top: `${center.y}%` }">
            <Building2 :size="22" />
            <span>{{ eco.center }}</span>
          </div>
          <div
            v-for="node in nodes"
            :key="node.key"
            class="seco__node"
            :class="[`seco__node--${node.key}`, { 'seco__node--core': node.key === 'software' }]"
            :style="{ left: `${node.x}%`, top: `${node.y}%` }"
          >
            <component :is="node.icon" :size="16" />
            <span>{{ label(node.key) }}</span>
            <em v-if="node.key === 'software'">{{ eco.core }}</em>
          </div>
        </div>

        <!-- the same structure as text: read by screen readers, shown on phones -->
        <ul class="seco__list">
          <li class="seco__list-center">{{ eco.center }}</li>
          <li class="seco__list-core">
            {{ eco.nodes.software }} <em>· {{ eco.core }}</em>
          </li>
          <li>{{ eco.nodes.product }}</li>
          <li>{{ eco.nodes.brand }}</li>
          <li>
            {{ eco.nodes.growth }}
            <ul>
              <li>{{ eco.nodes.seo }}</li>
              <li>{{ eco.nodes.ads }}</li>
              <li>{{ eco.nodes.social }}</li>
            </ul>
          </li>
        </ul>
        <p class="seco__caption" aria-hidden="true">{{ t.shared.concept }}</p>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.seco__figure {
  position: relative;
  max-width: 980px;
  margin: 0 auto;
}
.seco__canvas {
  position: relative;
  aspect-ratio: 16 / 9.5;
  margin: 0 6%;
  border-radius: var(--sm-r-shell);
  background:
    radial-gradient(45% 55% at 50% 44%, var(--sm-glow), transparent 70%), var(--sm-canvas);
  border: 1px solid var(--sm-border);
}
.seco__lines {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}
.seco__lines line {
  stroke: var(--sm-primary-200);
  stroke-width: 1.5;
  stroke-dasharray: 4 5;
}
.seco__lines .seco__line--core {
  stroke: var(--sm-primary);
  stroke-width: 2.5;
  stroke-dasharray: none;
}
.seco__center,
.seco__node {
  position: absolute;
  transform: translate(-50%, -50%);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}
.seco__center {
  flex-direction: column;
  justify-content: center;
  width: 128px;
  height: 128px;
  border-radius: 50%;
  background: var(--sm-surface-inverse);
  border: 1px solid var(--sm-inverse-edge);
  color: #fff;
  font-family: var(--sm-display);
  font-size: 15px;
  font-weight: 700;
  text-align: center;
  box-shadow:
    0 0 0 10px var(--sm-glow),
    var(--sm-shadow-float);
}
.seco__center svg {
  color: var(--sm-tech);
}
.seco__node {
  padding: 9px 14px;
  border-radius: 999px;
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
  box-shadow: var(--sm-shadow-soft);
  font-size: 14px;
  font-weight: 600;
  color: var(--sm-text);
}
.seco__node svg {
  color: var(--sm-primary-ink);
}
.seco__node--growth {
  border-style: dashed;
  border-color: var(--sm-primary-200);
  background: var(--sm-surface-subtle);
}
.seco__node--core {
  padding: 12px 18px;
  border-color: var(--sm-primary);
  background: var(--sm-primary);
  color: #fff;
  font-size: 15px;
  box-shadow: 0 16px 36px -18px rgba(0, 93, 251, 0.8);
}
.seco__node--core svg {
  color: #fff;
}
.seco__node em {
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.2);
  font-size: 11px;
  font-style: normal;
  font-weight: 600;
}
.seco__caption {
  margin-top: 12px;
  font-size: 12.5px;
  text-align: center;
  color: var(--sm-muted);
}
/* the text version: for screen readers on wide screens, visible on phones */
.seco__list {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
@media (max-width: 720px) {
  .seco__canvas {
    display: none;
  }
  .seco__list {
    position: static;
    width: auto;
    height: auto;
    overflow: visible;
    clip: auto;
    white-space: normal;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 18px;
    border-radius: var(--sm-r-card);
    border: 1px solid var(--sm-border);
    background: var(--sm-canvas);
  }
  .seco__list li {
    padding: 10px 14px;
    border-radius: 14px;
    background: var(--sm-surface);
    border: 1px solid var(--sm-border);
    font-weight: 600;
    font-size: 15px;
  }
  .seco__list .seco__list-center {
    background: var(--sm-surface-inverse);
    border-color: var(--sm-inverse-edge);
    color: #fff;
    text-align: center;
  }
  .seco__list .seco__list-core {
    background: var(--sm-primary);
    border-color: var(--sm-primary);
    color: #fff;
  }
  .seco__list em {
    font-style: normal;
    font-weight: 500;
    opacity: 0.85;
  }
  .seco__list ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 8px;
  }
  .seco__list ul li {
    padding: 6px 12px;
    border-radius: 999px;
    background: var(--sm-surface-subtle);
    font-size: 14px;
    font-weight: 500;
  }
}
@media (max-width: 1024px) and (min-width: 721px) {
  .seco__canvas {
    margin: 0;
  }
  .seco__node {
    font-size: 13px;
    padding: 8px 12px;
  }
  .seco__center {
    width: 108px;
    height: 108px;
    font-size: 14px;
  }
}
</style>
