<script setup lang="ts">
import { computed } from 'vue'
import {
  ArrowRight,
  BookCheck,
  Cable,
  DatabaseBackup,
  Database,
  ServerCog,
  UserCog,
} from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import { exploreFeature } from '~/composables/interest'
import { SECURITY_PATH } from '@shared/security'
import { useCopy, useI18n } from '~/i18n'

const t = useCopy('homeClosing')
const { lp, locale } = useI18n()

/**
 * Topics discussed during implementation planning, not a list of controls
 * that are in place today. The button opens the Security page (an explicit
 * security interest).
 */
const icons = [UserCog, Database, Cable, BookCheck, ServerCog, DatabaseBackup]
const topics = computed(() =>
  t.value.security.items.map((item, i) => ({ ...item, icon: icons[i] }))
)

function openSecurity() {
  exploreFeature('security', 'homepage', locale.value)
}
</script>

<template>
  <section id="security" class="sm-section sc">
    <div class="sm-container sc__grid">
      <div class="sc__side">
        <span v-reveal="40" class="sm-eyebrow">{{ t.security.eyebrow }}</span>
        <h2 v-reveal="80" class="sm-h2">{{ t.security.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.security.lead }}</p>
        <a
          v-reveal="160"
          :href="lp(SECURITY_PATH)"
          class="sm-btn sm-btn--dark"
          @click="openSecurity"
        >
          {{ t.security.cta }} <ArrowRight :size="18" class="sm-btn__arrow" />
        </a>
      </div>

      <dl class="sc__list">
        <div v-for="(item, i) in topics" :key="item.title" v-reveal="(i % 3) * 50" class="sc__item">
          <dt>
            <component :is="item.icon" :size="19" />
            {{ item.title }}
          </dt>
          <dd>{{ item.text }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.sc__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr);
  gap: clamp(40px, 6vw, 96px);
  align-items: start;
}
.sc__side {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}
.sc__list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid var(--sm-border);
  border-left: 1px solid var(--sm-border);
}
.sc__item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px;
  border-right: 1px solid var(--sm-border);
  border-bottom: 1px solid var(--sm-border);
}
.sc__item dt {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 650;
  letter-spacing: -0.01em;
}
.sc__item dt svg {
  color: var(--sm-primary-ink);
}
.sc__item dd {
  font-size: 14.5px;
  line-height: 1.55;
  color: var(--sm-muted);
}
@media (max-width: 1080px) {
  .sc__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
@media (max-width: 760px) {
  .sc__list {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 480px) {
  .sc__list {
    grid-template-columns: minmax(0, 1fr);
  }
  .sc__item {
    padding: 20px 4px 20px 20px;
  }
}
</style>
