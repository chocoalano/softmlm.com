<script setup lang="ts">
import { ArrowRight, BadgeCheck, Check, Trophy } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import { useCopy } from '~/i18n'
import NetworkOrb from '~/components/site/network_orb.vue'
import VisualNote from '~/components/site/visual_note.vue'
import MarketingWhatsappCta from '~/components/site/marketing_whatsapp_cta.vue'
import ScaledFrame from '~/components/site/scaled_frame.vue'
import HeroDashboard from '~/components/home/hero_dashboard.vue'

const t = useCopy('homeIntro')
const common = useCopy('common')
</script>

<template>
  <section class="hero">
    <div class="hero__bg" aria-hidden="true" />

    <div class="sm-container hero__copy">
      <a v-reveal href="#built-for" class="hero__pill">
        <span class="hero__pill-tag">mlmsoft</span>
        <span
          >{{ t.hero.pill.before }}<span class="hero__pill-long">{{ t.hero.pill.long }}</span
          >{{ t.hero.pill.after }}</span
        >
        <ArrowRight :size="15" />
      </a>

      <h1 v-reveal="80" class="sm-h1 hero__title">
        {{ t.hero.title.lead }} <span class="sm-grad">{{ t.hero.title.highlight }}</span>
      </h1>

      <p v-reveal="160" class="sm-lead hero__lead">
        {{ t.hero.lead }}
      </p>

      <div v-reveal="240" class="hero__ctas">
        <MarketingWhatsappCta page="homepage" section="hero" variant="primary" size="lg" />
        <a href="#demo" class="sm-btn sm-btn--light sm-btn--lg">{{ common.cta.bookDemo }}</a>
      </div>
      <a v-reveal="280" href="#platform" class="sm-link hero__more">
        {{ common.cta.seeHow }} <ArrowRight :size="16" />
      </a>

      <ul v-reveal="320" class="hero__proof">
        <li v-for="item in t.hero.proof" :key="item"><Check :size="16" /> {{ item }}</li>
      </ul>
    </div>

    <div v-reveal="200" class="sm-container hero__visual">
      <div class="hero__orb"><NetworkOrb /></div>
      <div class="hero__glow" aria-hidden="true" />

      <div class="hero__float">
        <ScaledFrame :width="1200" :height="800" :min-scale="0.56">
          <HeroDashboard />
        </ScaledFrame>
      </div>
      <VisualNote />

      <div class="ui hero__card hero__card--left" aria-hidden="true">
        <span class="hero__card-icon hero__card-icon--mint"><BadgeCheck :size="18" /></span>
        <div>
          <div class="ui-label">{{ t.hero.bonusCard.label }}</div>
          <div class="ui-title">{{ t.hero.bonusCard.title }}</div>
          <div class="hero__card-meta">{{ t.hero.bonusCard.meta }}</div>
        </div>
      </div>

      <div class="ui hero__card hero__card--right" aria-hidden="true">
        <span class="hero__card-icon"><Trophy :size="18" /></span>
        <div class="hero__card-body">
          <div class="ui-label">{{ t.hero.rankCard.label }}</div>
          <div class="ui-title">{{ t.hero.rankCard.title }}</div>
          <div class="ui-progress"><span style="width: 100%" /></div>
          <div class="hero__card-meta">{{ t.hero.rankCard.meta }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  padding-top: clamp(40px, 6vw, 88px);
  padding-bottom: clamp(56px, 7vw, 104px);
  isolation: isolate;
}
.hero__bg {
  position: absolute;
  inset: calc(var(--sm-header-h) * -1) 0 0;
  z-index: -1;
  background:
    radial-gradient(60% 50% at 50% 0%, rgba(0, 93, 251, 0.1), transparent 70%),
    radial-gradient(30% 30% at 88% 40%, rgba(2, 200, 250, 0.1), transparent 70%),
    linear-gradient(180deg, var(--sm-page) 0%, var(--sm-surface-subtle) 100%);
}
.hero__bg::after {
  --hero-grid-line: color-mix(in srgb, var(--sm-text) 4.5%, transparent);
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, var(--hero-grid-line) 1px, transparent 1px),
    linear-gradient(to bottom, var(--hero-grid-line) 1px, transparent 1px);
  background-size: 64px 64px;
  -webkit-mask-image: radial-gradient(70% 55% at 50% 20%, #000 30%, transparent 75%);
  mask-image: radial-gradient(70% 55% at 50% 20%, #000 30%, transparent 75%);
}
.hero__copy {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.hero__pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 36px;
  padding: 0 14px 0 5px;
  border-radius: 999px;
  border: 1px solid var(--sm-border);
  background: var(--sm-surface-glass);
  font-size: 14px;
  font-weight: 500;
  color: var(--sm-text-2);
  box-shadow: var(--sm-shadow-soft);
  transition: border-color 0.2s;
}
.hero__pill:hover {
  border-color: var(--sm-primary-200);
}
.hero__pill svg {
  color: var(--sm-primary-ink);
}
.hero__pill-tag {
  height: 26px;
  display: inline-flex;
  align-items: center;
  padding: 0 10px;
  border-radius: 999px;
  background: var(--sm-primary);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
}
.hero__title {
  max-width: 980px;
  margin-top: 28px;
}
.hero__lead {
  margin-top: 24px;
  max-width: 620px;
}
.hero__ctas {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 36px;
}
.hero__more {
  margin-top: 18px;
}
.hero__proof {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px 28px;
  margin-top: 28px;
  font-size: 14.5px;
  color: var(--sm-muted);
}
.hero__proof li {
  display: inline-flex;
  align-items: center;
  gap: 7px;
}
.hero__proof svg {
  color: var(--sm-tech-ink);
}

.hero__visual {
  position: relative;
  margin-top: clamp(48px, 6vw, 80px);
  max-width: calc(1200px + var(--sm-gutter) * 2);
}
.hero__orb {
  position: absolute;
  z-index: -1;
  width: min(620px, 70vw);
  top: -230px;
  right: -200px;
}
.hero__glow {
  position: absolute;
  z-index: -1;
  left: 10%;
  right: 10%;
  bottom: -40px;
  height: 60%;
  border-radius: 50%;
  background: radial-gradient(closest-side, rgba(0, 93, 251, 0.22), transparent);
  filter: blur(40px);
}
@media (prefers-reduced-motion: no-preference) {
  .hero__float {
    animation: sm-float 10s ease-in-out infinite;
  }
  .hero__card--left {
    animation: sm-float 8s ease-in-out -2s infinite;
  }
  .hero__card--right {
    animation: sm-float 9s ease-in-out -5s infinite;
  }
}
.hero__card {
  position: absolute;
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 14px 16px;
  border-radius: 16px;
  background: var(--sm-surface-glass);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--sm-border);
  box-shadow: var(--sm-shadow-float);
}
.hero__card--left {
  left: calc(var(--sm-gutter) - 56px);
  bottom: -36px;
  width: 280px;
}
.hero__card--right {
  right: calc(var(--sm-gutter) - 48px);
  top: -44px;
  width: 260px;
}
.hero__card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.hero__card-body .ui-progress {
  margin-top: 6px;
  height: 6px;
}
.hero__card-icon {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  flex: none;
  border-radius: 10px;
  background: var(--sm-primary-50);
  color: var(--sm-primary-ink);
}
.hero__card-icon--mint {
  background: color-mix(in srgb, var(--sm-tech) 18%, transparent);
  color: var(--sm-tech-ink);
}
.hero__card-meta {
  margin-top: 2px;
  font-size: 11.5px;
  color: var(--sm-subtle);
}

@media (max-width: 1100px) {
  .hero__card {
    display: none;
  }
}
@media (max-width: 520px) {
  .hero__pill {
    font-size: 13px;
  }
  .hero__pill-long {
    display: none;
  }
}
@media (max-width: 720px) {
  .hero__orb {
    top: -120px;
    right: -120px;
  }
  .hero__ctas {
    width: 100%;
    flex-direction: column;
  }
  .hero__ctas .sm-btn {
    width: 100%;
  }
  .hero__more {
    margin-top: 18px;
  }
  .hero__proof {
    flex-direction: column;
    align-items: center;
  }
}
</style>
