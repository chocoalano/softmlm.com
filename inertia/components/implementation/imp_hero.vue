<script setup lang="ts">
import { vReveal } from '~/composables/reveal'
import MarketingWhatsappCta from '~/components/site/marketing_whatsapp_cta.vue'
import BlueprintCanvas from '~/components/implementation/blueprint_canvas.vue'
import { HOW_WE_DO_IT_TRACKING_PAGE } from '@shared/implementation'
import { useCopy } from '~/i18n'

const t = useCopy('implementation')
const common = useCopy('common')
</script>

<template>
  <section class="ihero" aria-labelledby="ihero-title">
    <div class="ihero__bg" aria-hidden="true" />
    <div class="sm-container ihero__grid">
      <div class="ihero__copy">
        <span v-reveal class="sm-eyebrow">{{ t.hero.eyebrow }}</span>
        <h1 id="ihero-title" v-reveal="60" class="sm-h1 ihero__title">
          {{ t.hero.title }} <span class="sm-grad">{{ t.hero.highlight }}</span>
        </h1>
        <p v-reveal="120" class="sm-lead">{{ t.hero.lead }}</p>
        <div v-reveal="180" class="ihero__ctas">
          <MarketingWhatsappCta
            context="implementation_general"
            :page="HOW_WE_DO_IT_TRACKING_PAGE"
            section="hero"
            variant="primary"
            size="lg"
            :label="t.hero.cta"
          />
          <a href="#demo" class="sm-btn sm-btn--light sm-btn--lg">{{ common.cta.bookDemo }}</a>
        </div>
      </div>
      <BlueprintCanvas v-reveal="140" />
    </div>
  </section>
</template>

<style scoped>
.ihero {
  position: relative;
  padding-block: clamp(32px, 5vw, 72px) clamp(56px, 7vw, 104px);
  isolation: isolate;
  overflow: hidden;
}
.ihero__bg {
  position: absolute;
  inset: calc(var(--sm-header-h) * -1) 0 0;
  z-index: -1;
  background:
    radial-gradient(50% 60% at 82% 38%, var(--sm-glow), transparent 70%),
    radial-gradient(30% 40% at 6% 92%, rgba(2, 200, 250, 0.08), transparent 70%),
    linear-gradient(180deg, var(--sm-page), var(--sm-surface-subtle));
}
.ihero__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: clamp(32px, 5vw, 80px);
  align-items: center;
}
.ihero__copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 22px;
}
.ihero__title {
  font-size: clamp(38px, 4.9vw, 64px);
}
.ihero__ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 6px;
}
@media (max-width: 980px) {
  .ihero__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
@media (max-width: 560px) {
  .ihero__ctas {
    width: 100%;
    flex-direction: column;
  }
  .ihero__ctas .sm-btn {
    width: 100%;
  }
}
</style>
