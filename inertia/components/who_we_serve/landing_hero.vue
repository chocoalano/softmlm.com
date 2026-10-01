<script setup lang="ts">
import { vReveal } from '~/composables/reveal'
import NetworkOrb from '~/components/site/network_orb.vue'
import MarketingWhatsappCta from '~/components/site/marketing_whatsapp_cta.vue'
import { personaPath, personas } from '@shared/personas'
import { personaIcons } from '~/content/personas'
import { useCopy, useI18n } from '~/i18n'

const t = useCopy('personas')
const common = useCopy('common')
const { lp } = useI18n()
</script>

<template>
  <section class="lhero">
    <div class="lhero__bg" aria-hidden="true" />
    <div class="sm-container lhero__grid">
      <div class="lhero__copy">
        <span v-reveal class="sm-eyebrow">{{ t.landing.hero.eyebrow }}</span>
        <h1 v-reveal="60" class="sm-h1 lhero__title">
          {{ t.landing.hero.title }} <span class="sm-grad">{{ t.landing.hero.highlight }}</span>
        </h1>
        <p v-reveal="120" class="sm-lead">{{ t.landing.hero.lead }}</p>
        <div v-reveal="180" class="lhero__ctas">
          <MarketingWhatsappCta page="who_we_serve" section="hero" variant="primary" size="lg" />
          <a href="#demo" class="sm-btn sm-btn--light sm-btn--lg">{{ common.cta.bookDemo }}</a>
        </div>

        <nav v-reveal="240" class="lhero__jump" :aria-label="t.landing.hero.jumpNav">
          <span class="lhero__jump-label">{{ t.landing.hero.jumpLabel }}</span>
          <ul>
            <li v-for="persona in personas" :key="persona.key">
              <a :href="lp(personaPath(persona))" class="sm-chip lhero__chip">
                <component :is="personaIcons[persona.key]" :size="16" aria-hidden="true" />
                {{ common.roles[persona.key].short }}
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div v-reveal="160" class="lhero__visual" aria-hidden="true">
        <div class="lhero__orb"><NetworkOrb /></div>
        <span class="lhero__center">{{ t.landing.hero.center }}</span>
        <span
          v-for="(persona, i) in personas"
          :key="persona.key"
          class="lhero__node"
          :class="`lhero__node--${i}`"
        >
          <span class="sm-icon-tile sm-icon-tile--sm"
            ><component :is="personaIcons[persona.key]" :size="17"
          /></span>
          {{ common.roles[persona.key].short }}
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.lhero {
  position: relative;
  padding-block: clamp(40px, 6vw, 88px) clamp(56px, 7vw, 104px);
  isolation: isolate;
  overflow: hidden;
}
.lhero__bg {
  position: absolute;
  inset: calc(var(--sm-header-h) * -1) 0 0;
  z-index: -1;
  background:
    radial-gradient(50% 60% at 78% 35%, rgba(0, 93, 251, 0.13), transparent 70%),
    radial-gradient(30% 40% at 8% 90%, rgba(2, 200, 250, 0.08), transparent 70%),
    linear-gradient(180deg, var(--sm-page), var(--sm-surface-subtle));
}
.lhero__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
  gap: clamp(32px, 5vw, 80px);
  align-items: center;
}
.lhero__copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 22px;
}
.lhero__title {
  font-size: clamp(40px, 5.4vw, 70px);
}
.lhero__ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 6px;
}
.lhero__jump {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 100%;
  margin-top: 10px;
}
.lhero__jump-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--sm-muted);
}
.lhero__jump ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.lhero__chip {
  height: 40px;
  font-size: 14px;
  transition:
    border-color 0.15s,
    color 0.15s;
}
.lhero__chip:hover {
  border-color: var(--sm-primary-200);
  color: var(--sm-primary-ink);
}
.lhero__chip svg {
  color: var(--sm-primary-ink);
}

.lhero__visual {
  position: relative;
  aspect-ratio: 1;
  width: 100%;
  max-width: 540px;
  justify-self: center;
}
.lhero__orb {
  position: absolute;
  inset: 8%;
}
.lhero__center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 16px;
  border-radius: 999px;
  border: 1px solid var(--sm-inverse-edge);
  background: var(--sm-surface-inverse);
  color: var(--sm-on-inverse);
  font-size: 14px;
  font-weight: 650;
  white-space: nowrap;
  box-shadow:
    0 0 0 8px var(--sm-surface-glass),
    var(--sm-shadow-float);
}
.lhero__node {
  position: absolute;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px 8px 8px;
  border-radius: 16px;
  border: 1px solid var(--sm-border);
  background: var(--sm-surface-glass);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: var(--sm-shadow-float);
  color: var(--sm-text);
  font-size: 14px;
  font-weight: 650;
  white-space: nowrap;
}
.lhero__node--0 {
  top: 4%;
  left: 30%;
}
.lhero__node--1 {
  top: 28%;
  right: -2%;
}
.lhero__node--2 {
  bottom: 18%;
  right: 2%;
}
.lhero__node--3 {
  bottom: 2%;
  left: 18%;
}
.lhero__node--4 {
  top: 34%;
  left: -2%;
}
@media (prefers-reduced-motion: no-preference) {
  .lhero__node {
    animation: sm-float 9s ease-in-out infinite;
  }
  .lhero__node--1 {
    animation-delay: -2s;
  }
  .lhero__node--2 {
    animation-delay: -4s;
  }
  .lhero__node--3 {
    animation-delay: -6s;
  }
  .lhero__node--4 {
    animation-delay: -8s;
  }
}
@media (max-width: 980px) {
  .lhero__grid {
    grid-template-columns: minmax(0, 1fr);
  }
  .lhero__visual {
    display: none;
  }
}
@media (max-width: 560px) {
  .lhero__ctas {
    width: 100%;
    flex-direction: column;
  }
  .lhero__ctas .sm-btn {
    width: 100%;
  }
  .lhero__jump {
    width: calc(100% + var(--sm-gutter));
  }
  .lhero__jump ul {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-right: var(--sm-gutter);
    scrollbar-width: none;
    scroll-snap-type: x proximity;
  }
  .lhero__jump ul::-webkit-scrollbar {
    display: none;
  }
  .lhero__jump li {
    flex: none;
    scroll-snap-align: start;
  }
}
</style>
