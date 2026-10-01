<script setup lang="ts">
import { computed } from 'vue'
import { Blocks, Landmark, Network, ShoppingBag, SlidersHorizontal, Zap } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import { useCopy } from '~/i18n'

const t = useCopy('homeIntro')

const icons = [
  { key: 'oneSystem', icon: Blocks },
  { key: 'trust', icon: Zap },
  { key: 'fit', icon: SlidersHorizontal },
  { key: 'network', icon: Network },
  { key: 'sales', icon: ShoppingBag },
  { key: 'money', icon: Landmark },
] as const
const capabilities = computed(() =>
  icons.map((item) => ({ ...item, ...t.value.platform.capabilities[item.key] }))
)
</script>

<template>
  <section id="platform" class="sm-section po">
    <div class="sm-container">
      <div class="sm-heading sm-heading--center">
        <span v-reveal class="sm-eyebrow">{{ t.platform.eyebrow }}</span>
        <h2 v-reveal="60" class="sm-h2">{{ t.platform.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.platform.lead }}</p>
      </div>

      <div v-reveal class="po__chain">
        <div class="po__rail" role="list" :aria-label="t.platform.chainLabel">
          <div class="po__track" aria-hidden="true"><span class="po__pulse" /></div>
          <span v-for="(step, i) in t.platform.chain" :key="step" class="po__node" role="listitem">
            <span class="po__index">{{ String(i + 1).padStart(2, '0') }}</span>
            {{ step }}
          </span>
        </div>
      </div>

      <div class="po__grid">
        <article
          v-for="(item, i) in capabilities"
          :key="item.key"
          v-reveal="(i % 3) * 80"
          class="po__card"
        >
          <span class="sm-icon-tile"><component :is="item.icon" :size="22" /></span>
          <h3 class="sm-h4">{{ item.title }}</h3>
          <p class="sm-body">{{ item.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.po__chain {
  margin-bottom: clamp(40px, 5vw, 64px);
  padding: 4px 2px 12px;
  overflow-x: auto;
  scrollbar-width: none;
}
.po__chain::-webkit-scrollbar {
  display: none;
}
.po__rail {
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: 8px;
  width: max-content;
  min-width: 100%;
}
.po__track {
  position: absolute;
  left: 24px;
  right: 24px;
  top: 21px;
  height: 2px;
  background: linear-gradient(
    90deg,
    var(--sm-primary-100),
    var(--sm-primary-200),
    var(--sm-primary-100)
  );
  overflow: hidden;
}
.po__pulse {
  position: absolute;
  top: 0;
  left: 0;
  width: 160px;
  height: 100%;
  background: linear-gradient(90deg, transparent, var(--sm-primary), var(--sm-tech), transparent);
}
@media (prefers-reduced-motion: no-preference) {
  .po__pulse {
    animation: po-travel 5.5s var(--sm-ease) infinite;
  }
}
@keyframes po-travel {
  from {
    left: -160px;
  }
  to {
    left: 100%;
  }
}
.po__node {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex: none;
  height: 44px;
  padding: 0 14px 0 7px;
  border-radius: 999px;
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
  font-size: 14px;
  font-weight: 600;
  color: var(--sm-text);
  box-shadow: var(--sm-shadow-soft);
}
.po__index {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--sm-primary-50);
  color: var(--sm-primary-ink);
  font-size: 11px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}
.po__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  border-radius: var(--sm-r-card);
  overflow: hidden;
  background: var(--sm-border);
  border: 1px solid var(--sm-border);
}
.po__card {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: clamp(28px, 3vw, 40px);
  background: var(--sm-surface);
  transition: background 0.2s;
}
.po__card:hover {
  background: var(--sm-surface-subtle);
}
.po__card .sm-h4 {
  margin-top: 10px;
}
@media (max-width: 980px) {
  .po__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 620px) {
  .po__grid {
    grid-template-columns: minmax(0, 1fr);
  }
  .po__chain {
    margin-inline: calc(var(--sm-gutter) * -1);
    padding-inline: var(--sm-gutter);
  }
}
</style>
