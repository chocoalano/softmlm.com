<script setup lang="ts">
/**
 * "We start with the data flow": the five questions every connection
 * answers on its way from System A to System B, drawn as a path with a
 * packet travelling down it (still for reduced motion).
 */
import { vReveal } from '~/composables/reveal'
import { useCopy } from '~/i18n'

const t = useCopy('integrations')
</script>

<template>
  <section class="sm-section sm-section--compact ndisc" aria-labelledby="ndisc-title">
    <div class="sm-container ndisc__grid">
      <div class="ndisc__copy">
        <span v-reveal class="sm-eyebrow">{{ t.discovery.eyebrow }}</span>
        <h2 id="ndisc-title" v-reveal="60" class="sm-h2">{{ t.discovery.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.discovery.lead }}</p>
      </div>

      <div v-reveal="120" class="ndisc__flow">
        <span class="ndisc__system">{{ t.discovery.from }}</span>
        <ol class="ndisc__steps" :aria-label="t.discovery.label">
          <li v-for="(step, i) in t.discovery.steps" :key="step.title" class="ndisc__step">
            <span class="ndisc__num" aria-hidden="true">{{ i + 1 }}</span>
            <div>
              <b>{{ step.title }}</b>
              <span>{{ step.text }}</span>
            </div>
          </li>
        </ol>
        <span class="ndisc__system ndisc__system--to">{{ t.discovery.to }}</span>
        <span class="ndisc__packet" aria-hidden="true" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.ndisc__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: clamp(32px, 5vw, 72px);
  align-items: center;
}
.ndisc__copy {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.ndisc__flow {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  padding: clamp(22px, 3vw, 32px);
  border-radius: var(--sm-r-shell);
  background: var(--sm-surface-inverse);
  color: var(--sm-on-inverse);
  box-shadow: var(--sm-shadow-product);
  overflow: hidden;
  isolation: isolate;
}
/* the path every step sits on */
.ndisc__flow::before {
  content: '';
  position: absolute;
  top: 44px;
  bottom: 44px;
  left: calc(clamp(22px, 3vw, 32px) + 17px);
  width: 2px;
  z-index: -1;
  background: linear-gradient(180deg, var(--sm-tech), rgba(6, 200, 245, 0.15));
}
.ndisc__system {
  display: inline-flex;
  align-items: center;
  height: 36px;
  padding: 0 16px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 650;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: #ffffff;
  color: #041836;
}
.ndisc__system--to {
  background: var(--sm-tech);
}
.ndisc__steps {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}
.ndisc__step {
  display: grid;
  grid-template-columns: 36px minmax(0, 1fr);
  gap: 14px;
  align-items: start;
}
.ndisc__num {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 14px;
  font-weight: 700;
  background: var(--sm-deep-2);
  border: 1px solid var(--sm-inverse-edge);
  color: var(--sm-tech);
}
.ndisc__step > div {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 10px 14px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--sm-inverse-edge);
}
.ndisc__step b {
  font-size: 15.5px;
  font-weight: 650;
}
.ndisc__step span {
  font-size: 14px;
  line-height: 1.5;
  color: var(--sm-on-inverse-muted);
}
.ndisc__packet {
  position: absolute;
  left: calc(clamp(22px, 3vw, 32px) + 13px);
  top: 44px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--sm-tech);
  box-shadow: 0 0 0 4px rgba(6, 200, 245, 0.22);
  animation: ndisc-packet 6s var(--sm-ease) infinite;
}
@keyframes ndisc-packet {
  0% {
    top: 44px;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    top: calc(100% - 54px);
    opacity: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .ndisc__packet {
    display: none;
  }
}
@media (max-width: 960px) {
  .ndisc__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
