<script setup lang="ts">
/**
 * Homepage: the growth services, introduced after the visitor already knows
 * what mlmsoft is for (the software) and how it is implemented. The hero and
 * its CTAs do not mention the services.
 */
import { Handshake } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import ServiceCards from '~/components/services/service_cards.vue'
import ConsultCta from '~/components/site/consult_cta.vue'
import { SERVICES_PATH } from '@shared/services'
import { useCopy, useI18n } from '~/i18n'

const t = useCopy('services')
const { lp } = useI18n()
</script>

<template>
  <section id="services" class="sm-section sh" aria-labelledby="sh-title">
    <div class="sm-container">
      <div class="sh__head">
        <div class="sm-heading sh__heading">
          <span v-reveal class="sm-eyebrow">{{ t.home.eyebrow }}</span>
          <h2 id="sh-title" v-reveal="60" class="sm-h2">{{ t.home.title }}</h2>
          <p v-reveal="120" class="sm-lead">{{ t.home.lead }}</p>
        </div>
        <ol v-reveal="160" class="sh__story" :aria-label="t.home.storyLabel">
          <li
            v-for="(step, i) in t.home.story"
            :key="step"
            class="sh__step"
            :class="{ 'sh__step--core': i === 4 }"
          >
            {{ step }}
            <span v-if="i === 4" class="sh__core">{{ t.home.storyCore }}</span>
          </li>
        </ol>
      </div>

      <ServiceCards page="homepage" :label="t.home.cardsLabel" />

      <div v-reveal class="sh__partner">
        <span class="sm-icon-tile sm-icon-tile--sm" aria-hidden="true"
          ><Handshake :size="18"
        /></span>
        <p>
          <b>{{ t.home.onePartner.title }}</b> {{ t.home.onePartner.text }}
        </p>
      </div>
    </div>
  </section>

  <ConsultCta
    :title="t.home.cta.title"
    :text="t.home.cta.text"
    context="services_overview"
    page="homepage"
    section="services"
    :whatsapp-label="t.home.cta.whatsapp"
    :demo-href="lp(SERVICES_PATH)"
    :secondary-label="t.home.cta.explore"
  />
</template>

<style scoped>
.sh {
  padding-bottom: clamp(24px, 3vw, 40px);
}
.sh__head {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: clamp(32px, 5vw, 72px);
  align-items: end;
  margin-bottom: clamp(32px, 4vw, 56px);
}
.sh__heading {
  margin-bottom: 0;
}
.sh__story {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  counter-reset: story;
}
.sh__step {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid var(--sm-border);
  background: var(--sm-surface-subtle);
  font-size: 14px;
  font-weight: 500;
  color: var(--sm-text-2);
}
.sh__step:not(:last-child)::after {
  content: '→';
  position: absolute;
  right: -8px;
  transform: translateX(50%);
  font-size: 12px;
  color: var(--sm-subtle);
}
.sh__step:not(:last-child) {
  margin-right: 10px;
}
.sh__step--core {
  border-color: var(--sm-primary);
  background: var(--sm-primary);
  color: #fff;
  font-weight: 650;
}
.sh__core {
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--sm-deep);
  font-size: 11.5px;
  font-weight: 600;
}
.sh__partner {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 20px;
  padding: 16px 20px;
  border-radius: 18px;
  background: var(--sm-surface-subtle);
}
.sh__partner p {
  font-size: 15px;
  line-height: 1.55;
  color: var(--sm-muted);
}
.sh__partner b {
  color: var(--sm-text);
  font-weight: 650;
}
@media (max-width: 980px) {
  .sh__head {
    grid-template-columns: minmax(0, 1fr);
    align-items: start;
  }
}
</style>
