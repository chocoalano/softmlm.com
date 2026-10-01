<script setup lang="ts">
import { vReveal } from '~/composables/reveal'
import MarketingWhatsappCta from '~/components/site/marketing_whatsapp_cta.vue'
import SecurityModel from '~/components/security/security_model.vue'
import { SECURITY_TRACKING_PAGE } from '@shared/security'
import { useCopy } from '~/i18n'

const t = useCopy('security')
</script>

<template>
  <section class="shero" aria-labelledby="shero-title">
    <div class="shero__bg" aria-hidden="true" />
    <div class="sm-container shero__grid">
      <div class="shero__copy">
        <span v-reveal class="sm-eyebrow">{{ t.hero.eyebrow }}</span>
        <h1 id="shero-title" v-reveal="60" class="sm-h1 shero__title">
          {{ t.hero.title }} <span class="sm-grad">{{ t.hero.highlight }}</span>
        </h1>
        <p v-reveal="120" class="sm-lead">{{ t.hero.lead }}</p>
        <div v-reveal="180" class="shero__ctas">
          <MarketingWhatsappCta
            context="security_review"
            :page="SECURITY_TRACKING_PAGE"
            section="hero"
            variant="primary"
            size="lg"
            :label="t.hero.cta"
          />
          <a href="#consultation" class="sm-btn sm-btn--light sm-btn--lg">{{ t.hero.secondary }}</a>
        </div>
      </div>
      <SecurityModel v-reveal="140" />
    </div>
  </section>
</template>

<style scoped>
.shero {
  position: relative;
  padding-block: clamp(32px, 5vw, 72px) clamp(56px, 7vw, 104px);
  isolation: isolate;
  overflow: hidden;
}
.shero__bg {
  position: absolute;
  inset: calc(var(--sm-header-h) * -1) 0 0;
  z-index: -1;
  background:
    radial-gradient(50% 60% at 82% 38%, var(--sm-glow), transparent 70%),
    radial-gradient(30% 40% at 6% 92%, rgba(6, 200, 245, 0.08), transparent 70%),
    linear-gradient(180deg, var(--sm-page), var(--sm-surface-subtle));
}
.shero__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(32px, 5vw, 72px);
  align-items: center;
}
.shero__copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 22px;
}
.shero__title {
  font-size: clamp(34px, 4.4vw, 58px);
}
.shero__ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 6px;
}
/* the drawing needs room for its labels: below this it sits under the copy */
@media (max-width: 1100px) {
  .shero__grid {
    grid-template-columns: minmax(0, 1fr);
  }
  .shero .smod {
    max-width: 680px;
  }
}
@media (max-width: 560px) {
  .shero__ctas {
    width: 100%;
    flex-direction: column;
  }
  .shero__ctas .sm-btn {
    width: 100%;
  }
}
</style>
