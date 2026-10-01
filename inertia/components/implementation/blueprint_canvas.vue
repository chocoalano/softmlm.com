<script setup lang="ts">
/**
 * Hero visual for /how-we-do-it: the implementation blueprint as six
 * layers, from the business model down to the technical blueprint. A
 * process diagram, readable as an ordered list; the orb only sets the mood.
 */
import { computed } from 'vue'
import { Blocks, Coins, Route, ShoppingCart, Workflow, Building2 } from 'lucide-vue-next'
import NetworkOrb from '~/components/site/network_orb.vue'
import { useCopy } from '~/i18n'

const t = useCopy('implementation')
const canvas = computed(() => t.value.hero.canvas)
const icons = [Building2, Route, ShoppingCart, Coins, Workflow, Blocks]
</script>

<template>
  <figure class="bpc" aria-labelledby="bpc-title">
    <div class="bpc__orb" aria-hidden="true"><NetworkOrb :nodes="90" /></div>
    <div class="bpc__panel">
      <figcaption id="bpc-title" class="bpc__head">
        <span class="bpc__dots" aria-hidden="true"><i /><i /><i /></span>
        <span class="bpc__title">{{ canvas.title }}</span>
        <span class="sr-only">{{ canvas.label }}</span>
      </figcaption>
      <ol class="bpc__layers">
        <li
          v-for="(layer, i) in canvas.layers"
          :key="layer.title"
          class="bpc__layer"
          :class="{ 'bpc__layer--final': i === canvas.layers.length - 1 }"
          :style="{ '--i': i }"
        >
          <span class="bpc__icon" aria-hidden="true"><component :is="icons[i]" :size="16" /></span>
          <span class="bpc__name">{{ layer.title }}</span>
          <span class="bpc__tags">
            <span v-for="item in layer.items" :key="item" class="bpc__tag">{{ item }}</span>
          </span>
        </li>
      </ol>
    </div>
  </figure>
</template>

<style scoped>
.bpc {
  position: relative;
  width: 100%;
  max-width: 540px;
  justify-self: center;
  padding: 36px 0 24px 36px;
}
.bpc__orb {
  position: absolute;
  top: -8%;
  right: -14%;
  width: 78%;
  aspect-ratio: 1;
  opacity: 0.9;
}
.bpc__panel {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 18px 18px 22px;
  border-radius: var(--sm-r-card);
  border: 1px solid var(--sm-border);
  background: var(--sm-surface-glass);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: var(--sm-shadow-product);
}
.bpc__head {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 4px;
}
.bpc__dots {
  display: inline-flex;
  gap: 5px;
}
.bpc__dots i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--sm-border-2);
}
.bpc__title {
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--sm-muted);
}
.bpc__layers {
  list-style: none;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.bpc__layer {
  position: relative;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  grid-template-areas:
    'icon name'
    'icon tags';
  column-gap: 12px;
  row-gap: 6px;
  align-items: center;
  margin-left: calc(var(--i) * 10px);
  padding: 11px 14px 11px 10px;
  border-radius: 14px;
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
  box-shadow: var(--sm-shadow-soft);
}
/* a stepped thread from each layer's icon to the next one */
.bpc__layer + .bpc__layer::before {
  content: '';
  position: absolute;
  top: -11px;
  left: 24px;
  width: 11px;
  height: 12px;
  margin-left: -10px;
  border-left: 2px solid var(--sm-primary-200);
  border-bottom: 2px solid var(--sm-primary-200);
  border-bottom-left-radius: 6px;
}
.bpc__icon {
  grid-area: icon;
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 9px;
  background: var(--sm-primary-50);
  color: var(--sm-primary-ink);
}
.bpc__name {
  grid-area: name;
  font-size: 14.5px;
  font-weight: 650;
  letter-spacing: -0.01em;
  color: var(--sm-text);
}
.bpc__tags {
  grid-area: tags;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
.bpc__tag {
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--sm-surface-subtle);
  font-size: 12px;
  color: var(--sm-muted);
}
.bpc__layer--final {
  border-color: var(--sm-primary-200);
  background:
    linear-gradient(var(--sm-surface), var(--sm-surface)) padding-box,
    linear-gradient(110deg, var(--sm-primary), var(--sm-tech)) border-box;
  border: 1.5px solid transparent;
  box-shadow:
    0 18px 40px -22px rgba(0, 93, 251, 0.55),
    var(--sm-shadow-soft);
}
.bpc__layer--final .bpc__icon {
  background: linear-gradient(135deg, var(--sm-primary), var(--sm-accent));
  color: #fff;
}
@media (prefers-reduced-motion: no-preference) {
  .bpc__layer {
    animation: bpc-in 0.7s var(--sm-ease-out) both;
    animation-delay: calc(240ms + var(--i) * 90ms);
  }
}
@keyframes bpc-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
}
@media (max-width: 560px) {
  .bpc {
    padding: 28px 0 0;
  }
  .bpc__orb {
    top: -6%;
    right: -18%;
    width: 70%;
  }
  .bpc__layer {
    margin-left: 0;
  }
  .bpc__layer + .bpc__layer::before {
    width: 0;
    margin-left: 0;
    border-bottom: 0;
  }
}
</style>
