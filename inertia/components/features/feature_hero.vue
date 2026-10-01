<script setup lang="ts">
import SiteBreadcrumbs from '~/components/site/breadcrumbs.vue'
import { computed } from 'vue'
import { vReveal } from '~/composables/reveal'
import NetworkOrb from '~/components/site/network_orb.vue'
import MarketingWhatsappCta from '~/components/site/marketing_whatsapp_cta.vue'
import { featureTrackingPage, type FeatureKey } from '@shared/features'
import { featureIcons } from '~/content/features'
import { useCopy } from '~/i18n'

const props = defineProps<{ feature: FeatureKey }>()

const t = useCopy('features')
const common = useCopy('common')
const hero = computed(() => t.value.pages[props.feature].hero)
</script>

<template>
  <section class="fhero">
    <div class="fhero__bg" aria-hidden="true" />
    <div class="sm-container fhero__grid">
      <div class="fhero__copy">
        <SiteBreadcrumbs v-reveal />
        <h1 v-reveal="80" class="sm-h1 fhero__title">
          {{ hero.title }} <span class="sm-grad">{{ hero.highlight }}</span>
        </h1>
        <p v-reveal="140" class="sm-lead">{{ hero.lead }}</p>
        <div v-reveal="200" class="fhero__ctas">
          <MarketingWhatsappCta
            :context="feature"
            :page="featureTrackingPage(feature)"
            section="hero"
            variant="primary"
            size="lg"
            :label="hero.ctaLabel"
          />
          <a href="#demo" class="sm-btn sm-btn--light sm-btn--lg">{{ common.cta.bookDemo }}</a>
        </div>
      </div>

      <div v-reveal="160" class="fhero__visual">
        <div class="fhero__orb" aria-hidden="true"><NetworkOrb :nodes="100" /></div>
        <span class="fhero__icon" aria-hidden="true">
          <component :is="featureIcons[feature]" :size="30" />
        </span>
        <ul class="fhero__chips" :aria-label="t.shared.signalsLabel">
          <li
            v-for="(chip, i) in hero.chips"
            :key="chip"
            class="fhero__chip"
            :class="`fhero__chip--${i}`"
          >
            {{ chip }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fhero {
  position: relative;
  padding-block: clamp(32px, 5vw, 72px) clamp(56px, 7vw, 104px);
  isolation: isolate;
  overflow: hidden;
}
.fhero__bg {
  position: absolute;
  inset: calc(var(--sm-header-h) * -1) 0 0;
  z-index: -1;
  background:
    radial-gradient(50% 60% at 80% 35%, var(--sm-glow), transparent 70%),
    radial-gradient(30% 40% at 8% 90%, rgba(2, 200, 250, 0.08), transparent 70%),
    linear-gradient(180deg, var(--sm-page), var(--sm-surface-subtle));
}
.fhero__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
  gap: clamp(32px, 5vw, 80px);
  align-items: center;
}
.fhero__copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 22px;
}
.fhero__title {
  font-size: clamp(40px, 5.2vw, 68px);
}
.fhero__ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 6px;
}
.fhero__visual {
  position: relative;
  aspect-ratio: 1;
  width: 100%;
  max-width: 520px;
  justify-self: center;
}
.fhero__orb {
  position: absolute;
  inset: 4%;
}
.fhero__icon {
  position: absolute;
  top: 50%;
  left: 50%;
  display: grid;
  place-items: center;
  width: 72px;
  height: 72px;
  margin: -36px 0 0 -36px;
  border-radius: 22px;
  color: #fff;
  background: linear-gradient(135deg, var(--sm-primary), var(--sm-accent));
  box-shadow:
    0 0 0 8px var(--sm-surface-glass),
    var(--sm-shadow-float);
}
.fhero__chips {
  list-style: none;
}
.fhero__chip {
  position: absolute;
  max-width: 240px;
  padding: 12px 16px;
  border-radius: 18px 18px 18px 6px;
  border: 1px solid var(--sm-border);
  background: var(--sm-surface-glass);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: var(--sm-shadow-float);
  font-size: 14.5px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--sm-text);
}
.fhero__chip--0 {
  top: 6%;
  left: 0;
}
.fhero__chip--1 {
  top: 44%;
  right: -2%;
  border-radius: 18px 18px 6px 18px;
}
.fhero__chip--2 {
  bottom: 6%;
  left: 8%;
}
@media (prefers-reduced-motion: no-preference) {
  .fhero__chip--0 {
    animation: sm-float 9s ease-in-out infinite;
  }
  .fhero__chip--1 {
    animation: sm-float 10s ease-in-out -3s infinite;
  }
  .fhero__chip--2 {
    animation: sm-float 8s ease-in-out -5s infinite;
  }
}
@media (max-width: 980px) {
  .fhero__grid {
    grid-template-columns: minmax(0, 1fr);
  }
  .fhero__visual {
    max-width: 440px;
  }
}
@media (max-width: 560px) {
  .fhero__ctas {
    width: 100%;
    flex-direction: column;
  }
  .fhero__ctas .sm-btn {
    width: 100%;
  }
  .fhero__visual {
    aspect-ratio: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-top: 150px;
  }
  .fhero__orb {
    inset: -10px auto auto 50%;
    width: 180px;
    height: 180px;
    margin-left: -90px;
  }
  .fhero__icon {
    top: 80px;
    width: 56px;
    height: 56px;
    margin: -28px 0 0 -28px;
    border-radius: 18px;
  }
  .fhero__chips {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .fhero__chip {
    position: static;
    max-width: 88%;
    animation: none !important;
    font-size: 14px;
  }
  .fhero__chip--1 {
    align-self: flex-end;
  }
}
</style>
