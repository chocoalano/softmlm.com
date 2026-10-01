<script setup lang="ts">
/**
 * /features, grouped by business area. Every card is a plain link to a page
 * that exists; nothing on the roadmap is listed.
 */
import { computed } from 'vue'
import { ArrowRight, MessageCircleQuestion } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import MarketingWhatsappCta from '~/components/site/marketing_whatsapp_cta.vue'
import { featureIndex } from '~/content/features'
import { exploreFeature } from '~/composables/interest'
import { useCopy, useI18n } from '~/i18n'

const t = useCopy('features')
const { lp, locale } = useI18n()

const groups = computed(() =>
  featureIndex.map((group, i) => ({
    ...t.value.index.groups[i],
    cards: group.cards.map((card) => ({
      ...card,
      ...t.value.index.cards[card.key],
      href: lp(card.href),
    })),
  }))
)
</script>

<template>
  <section
    class="sm-section sm-section--compact sm-section--tint fx"
    :aria-label="t.index.hero.eyebrow"
  >
    <div class="sm-container fx__groups">
      <div v-for="(group, g) in groups" :key="group.title" class="fx__group">
        <div class="fx__group-head">
          <span v-reveal class="fx__group-num" aria-hidden="true">{{
            String(g + 1).padStart(2, '0')
          }}</span>
          <h2 v-reveal="40" class="sm-h3">{{ group.title }}</h2>
          <p v-reveal="80" class="sm-body">{{ group.text }}</p>
        </div>
        <ul class="fx__cards">
          <li v-for="(card, i) in group.cards" :key="card.key" v-reveal="i * 60">
            <a
              :href="card.href"
              class="fx__card"
              @click="exploreFeature(card.key, 'features', locale)"
            >
              <span class="fx__label">
                <span class="sm-icon-tile sm-icon-tile--sm"
                  ><component :is="card.icon" :size="18"
                /></span>
                {{ card.label }}
              </span>
              <span class="fx__problem">“{{ card.problem }}”</span>
              <span class="fx__text">{{ card.text }}</span>
              <span class="sm-link fx__more"
                >{{ t.index.learnMore }} <ArrowRight :size="16"
              /></span>
            </a>
          </li>
        </ul>
      </div>

      <div v-reveal class="fx__missing">
        <span class="sm-icon-tile"><MessageCircleQuestion :size="20" /></span>
        <div>
          <h2 class="sm-h4">{{ t.index.notListed.title }}</h2>
          <p class="sm-body">{{ t.index.notListed.text }}</p>
        </div>
        <MarketingWhatsappCta
          page="features"
          section="not_listed"
          variant="contextual"
          appearance="light"
          :label="t.index.notListed.cta"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.fx__groups {
  display: flex;
  flex-direction: column;
  gap: clamp(48px, 6vw, 80px);
}
.fx__group {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2.4fr);
  gap: clamp(24px, 4vw, 64px);
  align-items: start;
}
.fx__group-head {
  position: sticky;
  top: calc(var(--sm-header-h) + 32px);
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.fx__group-num {
  font-family: var(--sm-mono);
  font-size: 13px;
  color: var(--sm-primary-ink);
}
.fx__cards {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}
.fx__card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
  padding: 26px;
  border-radius: var(--sm-r-card);
  background: var(--sm-surface);
  border: 1px solid var(--sm-border);
  transition:
    border-color 0.2s var(--sm-ease),
    box-shadow 0.2s var(--sm-ease),
    transform 0.2s var(--sm-ease);
}
.fx__card:hover {
  border-color: var(--sm-primary-200);
  box-shadow: var(--sm-shadow-soft);
  transform: translateY(-2px);
}
.fx__label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 650;
}
.fx__problem {
  font-family: var(--sm-display);
  font-size: 20px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.02em;
  text-wrap: balance;
}
.fx__text {
  font-size: 15px;
  line-height: 1.6;
  color: var(--sm-muted);
}
.fx__more {
  margin-top: auto;
  padding-top: 4px;
  font-size: 15px;
}
.fx__missing {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 16px 20px;
  align-items: center;
  padding: clamp(22px, 3vw, 32px);
  border-radius: var(--sm-r-card);
  border: 1px dashed var(--sm-border-2);
  background: var(--sm-surface);
}
.fx__missing .sm-body {
  margin-top: 4px;
}
@media (prefers-reduced-motion: reduce) {
  .fx__card:hover {
    transform: none;
  }
}
@media (max-width: 980px) {
  .fx__group {
    grid-template-columns: minmax(0, 1fr);
  }
  .fx__group-head {
    position: static;
  }
}
@media (max-width: 640px) {
  .fx__cards {
    grid-template-columns: minmax(0, 1fr);
  }
  .fx__missing {
    grid-template-columns: minmax(0, 1fr);
  }
  .fx__missing .sm-btn {
    width: 100%;
  }
}
</style>
