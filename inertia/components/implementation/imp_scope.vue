<script setup lang="ts">
import {
  ArrowRight,
  Boxes,
  Building2,
  Cable,
  Clock,
  Coins,
  Database,
  FlaskConical,
  Sparkles,
  Users,
  Wrench,
} from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import { useCopy, useI18n } from '~/i18n'

const t = useCopy('implementation')
const { lp } = useI18n()
const icons = [Building2, Coins, Boxes, Cable, Database, Sparkles, Wrench, FlaskConical, Users]
</script>

<template>
  <section id="scope" class="sm-section sm-section--compact isc" aria-labelledby="isc-title">
    <div class="sm-container isc__grid">
      <div class="isc__side">
        <span v-reveal class="sm-eyebrow">{{ t.scope.eyebrow }}</span>
        <h2 id="isc-title" v-reveal="60" class="sm-h2">{{ t.scope.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.scope.lead }}</p>
        <a v-reveal="160" :href="lp('/pricing')" class="sm-link"
          >{{ t.scope.pricingLink }} <ArrowRight :size="16"
        /></a>
        <div v-reveal="200" class="isc__timeline">
          <span class="sm-icon-tile sm-icon-tile--sm" aria-hidden="true"><Clock :size="18" /></span>
          <div>
            <h3 class="isc__timeline-title">{{ t.scope.timeline.title }}</h3>
            <p>{{ t.scope.timeline.text }}</p>
          </div>
        </div>
      </div>
      <ul class="isc__factors">
        <li
          v-for="(factor, i) in t.scope.factors"
          :key="factor.title"
          v-reveal="(i % 3) * 50"
          class="isc__factor"
        >
          <span class="isc__icon" aria-hidden="true"><component :is="icons[i]" :size="18" /></span>
          <h3 class="isc__factor-title">{{ factor.title }}</h3>
          <p>{{ factor.text }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.isc__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.4fr);
  gap: clamp(40px, 6vw, 88px);
  align-items: start;
}
.isc__side {
  position: sticky;
  top: calc(var(--sm-header-h) + 40px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}
.isc__timeline {
  display: flex;
  gap: 14px;
  margin-top: 8px;
  padding: 18px;
  border-radius: 18px;
  border: 1px solid var(--sm-border);
  background: var(--sm-surface-subtle);
}
.isc__timeline-title {
  margin-bottom: 4px;
  font-size: 16px;
  font-weight: 650;
}
.isc__timeline p {
  font-size: 14.5px;
  line-height: 1.55;
  color: var(--sm-muted);
}
.isc__factors {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}
.isc__factor {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px;
  border-radius: 18px;
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
}
.isc__icon {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  margin-bottom: 4px;
  border-radius: 10px;
  background: var(--sm-primary-50);
  color: var(--sm-primary-ink);
}
.isc__factor-title {
  font-size: 15.5px;
  font-weight: 650;
  letter-spacing: -0.01em;
}
.isc__factor p {
  font-size: 14px;
  line-height: 1.5;
  color: var(--sm-muted);
}
@media (max-width: 1080px) {
  .isc__grid {
    grid-template-columns: minmax(0, 1fr);
  }
  .isc__side {
    position: static;
  }
}
@media (max-width: 760px) {
  .isc__factors {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 440px) {
  .isc__factors {
    gap: 8px;
  }
  .isc__factor {
    padding: 16px 14px;
  }
}
</style>
