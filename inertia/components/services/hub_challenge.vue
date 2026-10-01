<script setup lang="ts">
import { Megaphone, Package, Palette } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import { useCopy } from '~/i18n'

const t = useCopy('services')
const icons = [Package, Palette, Megaphone]
</script>

<template>
  <section class="sm-section sm-section--compact hch" aria-labelledby="hch-title">
    <div class="sm-container hch__grid">
      <div class="hch__copy">
        <span v-reveal class="sm-eyebrow">{{ t.hub.challenge.eyebrow }}</span>
        <h2 id="hch-title" v-reveal="60" class="sm-h2">{{ t.hub.challenge.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.hub.challenge.lead }}</p>
      </div>
      <ul class="hch__points">
        <li
          v-for="(point, i) in t.hub.challenge.points"
          :key="point.title"
          v-reveal="i * 70"
          class="hch__point"
        >
          <span class="sm-icon-tile" aria-hidden="true"
            ><component :is="icons[i]" :size="20"
          /></span>
          <div>
            <h3 class="sm-h4">{{ point.title }}</h3>
            <p class="sm-body">{{ point.text }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.hch__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
  gap: clamp(40px, 6vw, 96px);
  align-items: center;
}
.hch__copy {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.hch__points {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.hch__point {
  display: flex;
  gap: 16px;
  padding: 20px 22px;
  border-radius: var(--sm-r-card);
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
}
.hch__point h3 {
  margin-bottom: 4px;
}
@media (max-width: 900px) {
  .hch__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
