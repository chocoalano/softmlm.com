<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import NetworkOrb from '~/components/site/network_orb.vue'
import PatternDiagram from '~/components/compensation/pattern_diagram.vue'
import MarketingWhatsappCta from '~/components/site/marketing_whatsapp_cta.vue'
import { useCopy } from '~/i18n'

const t = useCopy('compensation')
const common = useCopy('common')
</script>

<template>
  <section class="chero">
    <div class="chero__bg" aria-hidden="true" />
    <div class="sm-container chero__grid">
      <div class="chero__copy">
        <span v-reveal class="sm-eyebrow">{{ t.hero.eyebrow }}</span>
        <h1 v-reveal="60" class="sm-h1 chero__title">
          {{ t.hero.titleLead }} <span class="sm-grad">{{ t.hero.titleAccent }}</span>
        </h1>
        <p v-reveal="120" class="sm-lead">{{ t.hero.lead }}</p>
        <div v-reveal="180" class="chero__ctas">
          <MarketingWhatsappCta
            context="compensation"
            page="compensation"
            section="hero"
            variant="primary"
            size="lg"
            :label="t.hero.whatsapp"
          />
          <a href="#demo" class="sm-btn sm-btn--light sm-btn--lg">{{ common.cta.bookDemo }}</a>
        </div>
        <a v-reveal="220" href="#engine" class="sm-link">
          {{ t.hero.approach }} <ArrowRight :size="16" />
        </a>
      </div>

      <div v-reveal="160" class="chero__visual" aria-hidden="true">
        <div class="chero__orb"><NetworkOrb /></div>
        <div class="chero__card chero__card--a">
          <PatternDiagram type="binary" />
          <span>{{ t.hero.cards.binary }}</span>
        </div>
        <div class="chero__card chero__card--b">
          <PatternDiagram type="generation" />
          <span>{{ t.hero.cards.override }}</span>
        </div>
        <div class="chero__card chero__card--c">
          <PatternDiagram type="stairstep" />
          <span>{{ t.hero.cards.rank }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.chero {
  position: relative;
  padding-block: clamp(48px, 7vw, 104px) clamp(56px, 8vw, 120px);
  isolation: isolate;
  overflow: hidden;
}
.chero__bg {
  position: absolute;
  inset: calc(var(--sm-header-h) * -1) 0 0;
  z-index: -1;
  background:
    radial-gradient(50% 60% at 80% 30%, rgba(0, 93, 251, 0.12), transparent 70%),
    radial-gradient(30% 40% at 10% 90%, rgba(2, 200, 250, 0.08), transparent 70%),
    linear-gradient(180deg, var(--sm-page), var(--sm-surface-subtle));
}
.chero__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: clamp(32px, 5vw, 80px);
  align-items: center;
}
.chero__copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
}
.chero__title {
  font-size: clamp(42px, 5.6vw, 72px);
}
.chero__ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;
}
.chero__visual {
  position: relative;
  aspect-ratio: 1;
  max-width: 560px;
  width: 100%;
  justify-self: center;
}
.chero__orb {
  position: absolute;
  inset: 0;
}
.chero__card {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 172px;
  padding: 14px 14px 12px;
  border-radius: 18px;
  border: 1px solid var(--sm-border);
  background: var(--sm-surface-glass);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: var(--sm-shadow-float);
  font-size: 13px;
  font-weight: 650;
  color: var(--sm-text);
}
.chero__card--a {
  top: 8%;
  left: 0;
}
.chero__card--b {
  top: 38%;
  right: -2%;
}
.chero__card--c {
  bottom: 6%;
  left: 12%;
}
@media (prefers-reduced-motion: no-preference) {
  .chero__card--a {
    animation: sm-float 9s ease-in-out infinite;
  }
  .chero__card--b {
    animation: sm-float 10s ease-in-out -3s infinite;
  }
  .chero__card--c {
    animation: sm-float 8s ease-in-out -5s infinite;
  }
}
@media (max-width: 980px) {
  .chero__grid {
    grid-template-columns: minmax(0, 1fr);
  }
  .chero__visual {
    max-width: 420px;
  }
}
@media (max-width: 560px) {
  .chero__ctas {
    width: 100%;
    flex-direction: column;
  }
  .chero__ctas .sm-btn {
    width: 100%;
  }
  .chero__card {
    width: 136px;
    padding: 10px;
    font-size: 12px;
  }
}
</style>
