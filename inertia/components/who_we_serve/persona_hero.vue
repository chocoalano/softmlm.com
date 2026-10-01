<script setup lang="ts">
import SiteBreadcrumbs from '~/components/site/breadcrumbs.vue'
import { computed } from 'vue'
import { vReveal } from '~/composables/reveal'
import NetworkOrb from '~/components/site/network_orb.vue'
import MarketingWhatsappCta from '~/components/site/marketing_whatsapp_cta.vue'
import { personaTrackingPage, type PersonaKey } from '@shared/personas'
import { personaIcons } from '~/content/personas'
import { useCopy } from '~/i18n'

const props = defineProps<{ persona: PersonaKey }>()

const t = useCopy('personas')
const common = useCopy('common')
const hero = computed(() => t.value.personas[props.persona].hero)
</script>

<template>
  <section class="phero">
    <div class="phero__bg" aria-hidden="true" />
    <div class="sm-container phero__grid">
      <div class="phero__copy">
        <SiteBreadcrumbs v-reveal />
        <span v-reveal="40" class="sm-eyebrow">{{ hero.eyebrow }}</span>
        <h1 v-reveal="80" class="sm-h1 phero__title">
          {{ hero.title }} <span class="sm-grad">{{ hero.highlight }}</span>
        </h1>
        <p v-reveal="140" class="sm-lead">{{ hero.lead }}</p>
        <div v-reveal="200" class="phero__ctas">
          <MarketingWhatsappCta
            :context="persona"
            :page="personaTrackingPage(persona)"
            section="hero"
            variant="primary"
            size="lg"
            :label="hero.ctaLabel"
          />
          <a href="#demo" class="sm-btn sm-btn--light sm-btn--lg">{{ common.cta.bookDemo }}</a>
        </div>
      </div>

      <div v-reveal="160" class="phero__visual">
        <div class="phero__orb" aria-hidden="true"><NetworkOrb :nodes="100" /></div>
        <span class="phero__icon" aria-hidden="true">
          <component :is="personaIcons[persona]" :size="30" />
        </span>
        <ul class="phero__bubbles" :aria-label="t.shared.concernsLabel">
          <li
            v-for="(question, i) in hero.concerns"
            :key="question"
            class="phero__bubble"
            :class="`phero__bubble--${i}`"
          >
            {{ question }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.phero {
  position: relative;
  padding-block: clamp(32px, 5vw, 72px) clamp(56px, 7vw, 104px);
  isolation: isolate;
  overflow: hidden;
}
.phero__bg {
  position: absolute;
  inset: calc(var(--sm-header-h) * -1) 0 0;
  z-index: -1;
  background:
    radial-gradient(50% 60% at 80% 35%, rgba(0, 93, 251, 0.12), transparent 70%),
    radial-gradient(30% 40% at 8% 90%, rgba(2, 200, 250, 0.08), transparent 70%),
    linear-gradient(180deg, var(--sm-page), var(--sm-surface-subtle));
}
.phero__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
  gap: clamp(32px, 5vw, 80px);
  align-items: center;
}
.phero__copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 22px;
}
.phero__title {
  font-size: clamp(40px, 5.2vw, 68px);
}
.phero__ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 6px;
}

.phero__visual {
  position: relative;
  aspect-ratio: 1;
  width: 100%;
  max-width: 540px;
  justify-self: center;
}
.phero__orb {
  position: absolute;
  inset: 4%;
}
.phero__icon {
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
.phero__bubbles {
  list-style: none;
}
.phero__bubble {
  position: absolute;
  max-width: 230px;
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
.phero__bubble--0 {
  top: 6%;
  left: 0;
}
.phero__bubble--1 {
  top: 42%;
  right: -2%;
  border-radius: 18px 18px 6px 18px;
}
.phero__bubble--2 {
  bottom: 6%;
  left: 8%;
}
@media (prefers-reduced-motion: no-preference) {
  .phero__bubble--0 {
    animation: sm-float 9s ease-in-out infinite;
  }
  .phero__bubble--1 {
    animation: sm-float 10s ease-in-out -3s infinite;
  }
  .phero__bubble--2 {
    animation: sm-float 8s ease-in-out -5s infinite;
  }
}

@media (max-width: 980px) {
  .phero__grid {
    grid-template-columns: minmax(0, 1fr);
  }
  .phero__visual {
    max-width: 440px;
  }
}
@media (max-width: 560px) {
  .phero__ctas {
    width: 100%;
    flex-direction: column;
  }
  .phero__ctas .sm-btn {
    width: 100%;
  }
  .phero__visual {
    aspect-ratio: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-top: 150px;
  }
  .phero__orb {
    inset: 0 auto auto 50%;
    width: 180px;
    height: 180px;
    margin-left: -90px;
    top: -10px;
  }
  .phero__icon {
    top: 80px;
    width: 56px;
    height: 56px;
    margin: -28px 0 0 -28px;
    border-radius: 18px;
  }
  .phero__bubbles {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .phero__bubble {
    position: static;
    max-width: 88%;
    animation: none !important;
    font-size: 14px;
  }
  .phero__bubble--1 {
    align-self: flex-end;
  }
}
</style>
