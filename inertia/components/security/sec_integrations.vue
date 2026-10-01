<script setup lang="ts">
/**
 * Integration security, in the Phase 10 methodology: the questions every
 * connection is scoped with. No provider names; the link opens the
 * Integrations page (an explicit integration interest).
 */
import { computed } from 'vue'
import {
  ArrowRight,
  FileCheck2,
  KeyRound,
  ListFilter,
  RefreshCw,
  Handshake,
  UserRoundCog,
} from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import { exploreFeature } from '~/composables/interest'
import { INTEGRATIONS_PATH } from '@shared/integrations'
import { SECURITY_TRACKING_PAGE } from '@shared/security'
import { useCopy, useI18n } from '~/i18n'

const t = useCopy('security')
const { lp, locale } = useI18n()
const icons = [KeyRound, Handshake, ListFilter, FileCheck2, RefreshCw, UserRoundCog]
const items = computed(() =>
  t.value.integrations.items.map((item, i) => ({ ...item, icon: icons[i] }))
)

function openIntegrations() {
  exploreFeature('integrations', SECURITY_TRACKING_PAGE, locale.value)
}
</script>

<template>
  <section
    class="sm-section sm-section--compact sm-section--tint sint"
    aria-labelledby="sint-title"
  >
    <div class="sm-container">
      <div class="sint__head">
        <span v-reveal class="sm-eyebrow">{{ t.integrations.eyebrow }}</span>
        <h2 id="sint-title" v-reveal="60" class="sm-h2">{{ t.integrations.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.integrations.lead }}</p>
      </div>
      <ul class="sint__grid">
        <li v-for="(item, i) in items" :key="item.title" v-reveal="(i % 3) * 50" class="sint__item">
          <component :is="item.icon" :size="20" aria-hidden="true" />
          <b>{{ item.title }}</b>
          <span>{{ item.text }}</span>
        </li>
      </ul>
      <a v-reveal :href="lp(INTEGRATIONS_PATH)" class="sm-link sint__link" @click="openIntegrations"
        >{{ t.integrations.link }} <ArrowRight :size="16"
      /></a>
    </div>
  </section>
</template>

<style scoped>
.sint__head {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 760px;
  margin-bottom: clamp(28px, 4vw, 44px);
}
.sint__grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}
.sint__item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 20px;
  border-radius: var(--sm-r-card);
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
}
.sint__item svg {
  margin-bottom: 6px;
  color: var(--sm-primary-ink);
}
.sint__item b {
  font-size: 15.5px;
  font-weight: 650;
}
.sint__item span {
  font-size: 14.5px;
  line-height: 1.5;
  color: var(--sm-muted);
}
.sint__link {
  margin-top: 24px;
}
@media (max-width: 1000px) {
  .sint__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 560px) {
  .sint__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
