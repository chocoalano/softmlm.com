<script setup lang="ts">
import { computed } from 'vue'
import { HeartPulse, Pill, Shirt, ShoppingBasket, Sparkles, Users } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import { useCopy } from '~/i18n'

const t = useCopy('homeIntro')

/**
 * Stands in for a client logo wall until there are customers to show.
 * Swap the chips for real logos once they can be named.
 */
const icons = [
  { key: 'beauty', icon: Sparkles },
  { key: 'wellness', icon: HeartPulse },
  { key: 'fmcg', icon: ShoppingBasket },
  { key: 'supplements', icon: Pill },
  { key: 'fashion', icon: Shirt },
  { key: 'community', icon: Users },
] as const
const industries = computed(() =>
  icons.map((item) => ({ ...item, label: t.value.industries.items[item.key] }))
)
</script>

<template>
  <section id="built-for" class="ind" aria-labelledby="industries-title">
    <div class="sm-container ind__inner">
      <p id="industries-title" v-reveal class="ind__title">{{ t.industries.title }}</p>
      <ul class="ind__list">
        <li v-for="(item, i) in industries" :key="item.key" v-reveal="i * 60" class="ind__item">
          <component :is="item.icon" :size="20" />
          {{ item.label }}
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.ind {
  padding-block: 8px clamp(48px, 6vw, 80px);
  background: var(--sm-surface-subtle);
}
.ind__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}
.ind__title {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--sm-subtle);
  text-align: center;
}
.ind__list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px 40px;
}
.ind__item {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--sm-display);
  font-size: 19px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--sm-subtle);
}
.ind__item svg {
  color: var(--sm-primary-200);
}
@media (max-width: 720px) {
  .ind__list {
    gap: 14px 24px;
  }
  .ind__item {
    font-size: 16px;
  }
}
</style>
