<script setup lang="ts">
/**
 * The areas we discuss, as categories with icons: no provider names or
 * logos (docs/integration-evidence.md). "Available integrations" appears
 * only once `verifiedIntegrations` lists a connector verified in mlmsoft;
 * today it is empty, so nothing is rendered for it.
 */
import { computed } from 'vue'
import {
  ArrowUpRight,
  Boxes,
  Calculator,
  CreditCard,
  Info,
  Landmark,
  MessageSquare,
  Truck,
} from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import { integrationAreas, verifiedIntegrations } from '@shared/integrations'
import { useCopy, useI18n } from '~/i18n'

const t = useCopy('integrations')
const { locale } = useI18n()

const icons = {
  payments: CreditCard,
  banking: Landmark,
  logistics: Truck,
  finance: Calculator,
  messaging: MessageSquare,
  systems: Boxes,
}

const areas = computed(() =>
  integrationAreas.map((key) => ({ key, icon: icons[key], ...t.value.areas.items[key] }))
)

const available = computed(() =>
  verifiedIntegrations.map((item) => ({
    ...item,
    area: t.value.areas.items[item.area].title,
    text: item.description[locale.value],
  }))
)
</script>

<template>
  <section id="areas" class="sm-section sm-section--tint narea" aria-labelledby="narea-title">
    <div class="sm-container">
      <div class="narea__head">
        <span v-reveal class="sm-eyebrow">{{ t.areas.eyebrow }}</span>
        <h2 id="narea-title" v-reveal="60" class="sm-h2">{{ t.areas.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.areas.lead }}</p>
      </div>
      <ul class="narea__grid">
        <li v-for="(area, i) in areas" :key="area.key" v-reveal="(i % 3) * 60" class="narea__card">
          <span class="sm-icon-tile"><component :is="area.icon" :size="21" /></span>
          <h3 class="sm-h4">{{ area.title }}</h3>
          <p>{{ area.text }}</p>
        </li>
      </ul>
      <p v-reveal class="narea__note">
        <Info :size="17" aria-hidden="true" /> {{ t.areas.disclosure }}
      </p>

      <div v-if="available.length" class="narea__available" aria-labelledby="navail-title">
        <h3 id="navail-title" class="sm-h3">{{ t.areas.available.title }}</h3>
        <p class="sm-body">{{ t.areas.available.lead }}</p>
        <ul class="narea__grid">
          <li v-for="item in available" :key="item.provider" class="narea__card">
            <span class="narea__area">{{ item.area }}</span>
            <h4 class="sm-h4">{{ item.provider }}</h4>
            <p>{{ item.text }}</p>
            <a
              v-if="item.documentationUrl"
              :href="item.documentationUrl"
              class="sm-link"
              rel="noopener"
              >{{ t.areas.available.documentation }} <ArrowUpRight :size="15"
            /></a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.narea__head {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 760px;
  margin-bottom: clamp(32px, 4vw, 52px);
}
.narea__grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}
.narea__card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 24px;
  border-radius: var(--sm-r-card);
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
}
.narea__card .sm-icon-tile {
  margin-bottom: 6px;
}
.narea__card p {
  font-size: 15px;
  line-height: 1.55;
  color: var(--sm-muted);
}
.narea__note {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 22px;
  font-size: 15px;
  line-height: 1.5;
  color: var(--sm-text-2);
}
.narea__note svg {
  flex: none;
  margin-top: 2px;
  color: var(--sm-primary-ink);
}
.narea__available {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: clamp(40px, 5vw, 64px);
}
.narea__area {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--sm-muted);
}
@media (max-width: 960px) {
  .narea__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 560px) {
  .narea__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
