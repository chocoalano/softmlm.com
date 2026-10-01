<script setup lang="ts">
import { ArrowDown } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import MarketingWhatsappCta from '~/components/site/marketing_whatsapp_cta.vue'
import { useCopy } from '~/i18n'

const t = useCopy('pricing')
</script>

<template>
  <section class="phero">
    <div class="phero__bg" aria-hidden="true" />
    <div class="sm-container phero__inner">
      <span v-reveal class="sm-eyebrow">{{ t.hero.eyebrow }}</span>
      <h1 v-reveal="60" class="sm-h1 phero__title">
        {{ t.hero.title }} <span class="sm-grad">{{ t.hero.titleAccent }}</span>
      </h1>
      <p v-reveal="120" class="sm-lead">{{ t.hero.lead }}</p>
      <div v-reveal="180" class="phero__ctas">
        <MarketingWhatsappCta
          context="pricing"
          page="pricing"
          section="hero"
          variant="primary"
          size="lg"
          :label="t.hero.whatsapp"
        />
        <a href="#estimate" class="sm-btn sm-btn--light sm-btn--lg">
          {{ t.hero.estimate }} <ArrowDown :size="18" aria-hidden="true" />
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.phero {
  position: relative;
  padding-block: clamp(48px, 7vw, 104px) clamp(32px, 4vw, 56px);
  isolation: isolate;
  text-align: center;
}
.phero__bg {
  position: absolute;
  inset: calc(var(--sm-header-h) * -1) 0 0;
  z-index: -1;
  background:
    radial-gradient(50% 60% at 50% 0%, rgba(0, 93, 251, 0.1), transparent 70%),
    linear-gradient(180deg, var(--sm-surface), var(--sm-surface-subtle));
}
.phero__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
}
.phero__title {
  max-width: 900px;
  font-size: clamp(40px, 5.4vw, 70px);
}
.phero__ctas {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 8px;
}
@media (max-width: 560px) {
  .phero__ctas {
    width: 100%;
    flex-direction: column;
  }
  .phero__ctas > * {
    width: 100%;
  }
}
</style>
