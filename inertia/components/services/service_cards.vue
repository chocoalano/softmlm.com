<script setup lang="ts">
/**
 * The five growth services as cards linking to their pages. Used on the
 * homepage section and the services hub. Opening a card is an explicit
 * interest in that service (`service_interest`).
 */
import { computed } from 'vue'
import { ArrowRight } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import { servicePath, services, type ServiceKey } from '@shared/services'
import { track } from '@shared/analytics'
import { serviceIcons } from '~/content/services'
import { useCopy, useI18n } from '~/i18n'

const props = withDefaults(defineProps<{ page: string; label: string; audience?: boolean }>(), {
  audience: false,
})

const t = useCopy('services')
const common = useCopy('common')
const { lp, locale } = useI18n()

const cards = computed(() =>
  services.map((service) => ({
    key: service.key,
    title: common.value.nav.serviceLinks[service.key].label,
    text: t.value.cards[service.key],
    who: t.value.hub.audience.items[service.key],
    href: lp(servicePath(service)),
    icon: serviceIcons[service.key],
  }))
)

function explore(service: ServiceKey) {
  track('service_interest', { service, page: props.page, locale: locale.value })
}
</script>

<template>
  <ul class="svc-cards" :aria-label="label">
    <li v-for="(card, i) in cards" :key="card.key" v-reveal="(i % 3) * 60" class="svc-card">
      <span class="sm-icon-tile" aria-hidden="true"><component :is="card.icon" :size="20" /></span>
      <h3 class="svc-card__title">
        <a :href="card.href" class="svc-card__link" @click="explore(card.key)">{{ card.title }}</a>
      </h3>
      <p class="svc-card__text">{{ card.text }}</p>
      <p v-if="audience" class="svc-card__who">{{ card.who }}</p>
      <span class="sm-link svc-card__more" aria-hidden="true"
        >{{ t.shared.explore }} <ArrowRight :size="15"
      /></span>
    </li>
  </ul>
</template>

<style scoped>
.svc-cards {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 14px;
}
.svc-card {
  position: relative;
  grid-column: span 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  padding: 24px;
  border-radius: var(--sm-r-card);
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
  transition:
    border-color 0.2s,
    box-shadow 0.2s,
    transform 0.2s var(--sm-ease);
}
/* five cards: three on the first row, two wider ones on the second */
.svc-card:nth-child(n + 4) {
  grid-column: span 3;
}
.svc-card:hover {
  border-color: var(--sm-primary-200);
  box-shadow: var(--sm-shadow-soft);
}
.svc-card:focus-within {
  border-color: var(--sm-primary-ink);
}
.svc-card__title {
  font-family: var(--sm-display);
  font-size: 19px;
  font-weight: 700;
  letter-spacing: -0.018em;
  line-height: 1.3;
}
/* the whole card is the link's target area */
.svc-card__link::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
}
.svc-card__link:focus-visible {
  outline: none;
}
.svc-card:has(.svc-card__link:focus-visible) {
  outline: 2px solid var(--sm-primary-ink);
  outline-offset: 3px;
}
.svc-card__text {
  flex: 1;
  font-size: 15px;
  line-height: 1.6;
  color: var(--sm-muted);
}
.svc-card__who {
  padding-top: 12px;
  border-top: 1px solid var(--sm-border);
  font-size: 14px;
  line-height: 1.5;
  color: var(--sm-text-2);
}
.svc-card__more {
  font-size: 14.5px;
}
@media (prefers-reduced-motion: no-preference) {
  .svc-card:hover {
    transform: translateY(-2px);
  }
}
@media (max-width: 1024px) {
  .svc-cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .svc-card,
  .svc-card:nth-child(n + 4) {
    grid-column: auto;
  }
  .svc-card:last-child {
    grid-column: 1 / -1;
  }
}
@media (max-width: 640px) {
  .svc-cards {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
