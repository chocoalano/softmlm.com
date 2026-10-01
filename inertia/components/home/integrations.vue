<script setup lang="ts">
/**
 * The homepage's integration section: the areas discussed in integration
 * discovery, by category, and a link to /integrations. No provider names
 * or logos, and no promise that everything will be connected
 * (docs/integrations-marketing.md).
 */
import { computed } from 'vue'
import {
  ArrowRight,
  Boxes,
  Calculator,
  CreditCard,
  Landmark,
  MessageSquare,
  Truck,
} from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import MarketingWhatsappCta from '~/components/site/marketing_whatsapp_cta.vue'
import { exploreFeature } from '~/composables/interest'
import { INTEGRATIONS_PATH } from '@shared/integrations'
import { useCopy, useI18n } from '~/i18n'

const t = useCopy('homeClosing')
const { lp, locale } = useI18n()

const icons = [CreditCard, Landmark, Truck, Calculator, MessageSquare, Boxes]
const categories = computed(() =>
  t.value.integrations.items.map((item, i) => ({ ...item, icon: icons[i] }))
)

function explore() {
  exploreFeature('integrations', 'homepage', locale.value)
}
</script>

<template>
  <section id="integrations" class="sm-section sm-section--tint ig">
    <div class="sm-container">
      <div class="ig__head">
        <div class="ig__intro">
          <span v-reveal class="sm-eyebrow">{{ t.integrations.eyebrow }}</span>
          <h2 v-reveal="60" class="sm-h2">{{ t.integrations.title }}</h2>
        </div>
        <p v-reveal="120" class="sm-lead">{{ t.integrations.lead }}</p>
      </div>

      <ul class="ig__grid">
        <li
          v-for="(item, i) in categories"
          :key="item.title"
          v-reveal="(i % 4) * 60"
          class="ig__card"
        >
          <span class="sm-icon-tile"><component :is="item.icon" :size="21" /></span>
          <h3 class="sm-h4">{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </li>
        <li v-reveal="180" class="ig__card ig__card--cta">
          <h3 class="sm-h4">{{ t.integrations.custom.title }}</h3>
          <p>{{ t.integrations.custom.text }}</p>
          <div class="ig__actions">
            <a :href="lp(INTEGRATIONS_PATH)" class="sm-btn sm-btn--dark" @click="explore"
              >{{ t.integrations.custom.link }} <ArrowRight :size="17"
            /></a>
            <MarketingWhatsappCta
              context="integration_discovery"
              page="homepage"
              section="integrations"
              variant="contextual"
              appearance="link"
              :label="t.integrations.custom.whatsapp"
            />
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.ig__head {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: 24px 64px;
  align-items: end;
  margin-bottom: clamp(40px, 5vw, 64px);
}
.ig__intro {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.ig__grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}
.ig__card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 24px;
  border-radius: 20px;
  background: var(--sm-surface);
  border: 1px solid var(--sm-border);
  transition:
    border-color 0.2s,
    transform 0.2s var(--sm-ease);
}
.ig__card:hover {
  border-color: var(--sm-primary-200);
  transform: translateY(-2px);
}
.ig__card .sm-icon-tile {
  margin-bottom: 8px;
}
.ig__card p {
  font-size: 14.5px;
  line-height: 1.55;
  color: var(--sm-muted);
}
.ig__card--cta {
  grid-column: span 2;
  justify-content: center;
  background: var(--sm-primary-50);
  border-color: var(--sm-primary-100);
}
.ig__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 20px;
  margin-top: 6px;
}
.ig__card--cta .sm-link {
  margin-top: 4px;
}
@media (max-width: 1080px) {
  .ig__grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .ig__card--cta {
    grid-column: 1 / -1;
  }
  .ig__head {
    grid-template-columns: minmax(0, 1fr);
  }
}
@media (max-width: 760px) {
  .ig__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 480px) {
  .ig__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
