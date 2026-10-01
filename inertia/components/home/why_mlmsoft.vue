<script setup lang="ts">
import { computed } from 'vue'
import { Cable, Headset, History, Layers, SlidersHorizontal, TrendingUp } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import { useCopy } from '~/i18n'

const t = useCopy('homeClosing')

const icons = [SlidersHorizontal, Layers, History, TrendingUp, Cable, Headset]
const reasons = computed(() => t.value.why.items.map((item, i) => ({ ...item, icon: icons[i] })))
</script>

<template>
  <section id="why" class="sm-section wy">
    <div class="sm-container">
      <div class="sm-heading sm-heading--center">
        <span v-reveal class="sm-eyebrow">{{ t.why.eyebrow }}</span>
        <h2 v-reveal="60" class="sm-h2">{{ t.why.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.why.lead }}</p>
      </div>
      <div class="wy__grid">
        <article
          v-for="(item, i) in reasons"
          :key="item.title"
          v-reveal="(i % 3) * 80"
          class="wy__item"
        >
          <span class="wy__icon"><component :is="item.icon" :size="24" /></span>
          <h3 class="sm-h4">{{ item.title }}</h3>
          <p class="sm-body">{{ item.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.wy__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 48px 40px;
}
.wy__item {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 24px;
  border-top: 1px solid var(--sm-border);
}
.wy__icon {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  margin-bottom: 10px;
  border-radius: 16px;
  color: #fff;
  background:
    radial-gradient(circle at 80% 20%, rgba(2, 200, 250, 0.6), transparent 55%),
    linear-gradient(135deg, var(--sm-primary), var(--sm-accent));
  box-shadow: 0 12px 24px -12px rgba(0, 93, 251, 0.6);
}
@media (max-width: 980px) {
  .wy__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 560px) {
  .wy__grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 32px;
  }
}
</style>
