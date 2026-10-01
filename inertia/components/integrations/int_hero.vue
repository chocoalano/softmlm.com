<script setup lang="ts">
import { vReveal } from '~/composables/reveal'
import MarketingWhatsappCta from '~/components/site/marketing_whatsapp_cta.vue'
import IntegrationMap from '~/components/integrations/integration_map.vue'
import { INTEGRATIONS_TRACKING_PAGE } from '@shared/integrations'
import { useCopy } from '~/i18n'

const t = useCopy('integrations')
</script>

<template>
  <section class="nhero" aria-labelledby="nhero-title">
    <div class="nhero__bg" aria-hidden="true" />
    <div class="sm-container nhero__grid">
      <div class="nhero__copy">
        <span v-reveal class="sm-eyebrow">{{ t.hero.eyebrow }}</span>
        <h1 id="nhero-title" v-reveal="60" class="sm-h1 nhero__title">
          {{ t.hero.title }} <span class="sm-grad">{{ t.hero.highlight }}</span>
        </h1>
        <p v-reveal="120" class="sm-lead">{{ t.hero.lead }}</p>
        <div v-reveal="180" class="nhero__ctas">
          <MarketingWhatsappCta
            context="integration_discovery"
            :page="INTEGRATIONS_TRACKING_PAGE"
            section="hero"
            variant="primary"
            size="lg"
            :label="t.hero.cta"
          />
          <a href="#consultation" class="sm-btn sm-btn--light sm-btn--lg">{{ t.hero.secondary }}</a>
        </div>
      </div>
      <IntegrationMap v-reveal="140" />
    </div>
  </section>
</template>

<style scoped>
.nhero {
  position: relative;
  padding-block: clamp(32px, 5vw, 72px) clamp(56px, 7vw, 104px);
  isolation: isolate;
  overflow: hidden;
}
.nhero__bg {
  position: absolute;
  inset: calc(var(--sm-header-h) * -1) 0 0;
  z-index: -1;
  background:
    radial-gradient(50% 60% at 82% 38%, var(--sm-glow), transparent 70%),
    radial-gradient(30% 40% at 6% 92%, rgba(2, 200, 250, 0.08), transparent 70%),
    linear-gradient(180deg, var(--sm-page), var(--sm-surface-subtle));
}
.nhero__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
  gap: clamp(32px, 5vw, 72px);
  align-items: center;
}
.nhero__copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 22px;
}
.nhero__title {
  font-size: clamp(36px, 4.6vw, 60px);
}
.nhero__ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 6px;
}
/* the map needs room for its labels: below this it sits under the copy, full width */
@media (max-width: 1180px) {
  .nhero__grid {
    grid-template-columns: minmax(0, 1fr);
  }
  .nhero .imap {
    max-width: 720px;
  }
}
@media (max-width: 560px) {
  .nhero__ctas {
    width: 100%;
    flex-direction: column;
  }
  .nhero__ctas .sm-btn {
    width: 100%;
  }
}
</style>
