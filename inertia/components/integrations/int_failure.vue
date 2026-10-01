<script setup lang="ts">
/**
 * The failure path and observability, as design questions. Nothing here
 * says mlmsoft already has a queue, retries or alerting: the durable queue
 * is still a production blocker (docs/production-blockers.md).
 */
import { CircleDot } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import { useCopy } from '~/i18n'

const t = useCopy('integrations')
</script>

<template>
  <section class="sm-section sm-section--dark nfail" aria-labelledby="nfail-title">
    <div class="sm-container nfail__grid">
      <div class="nfail__copy">
        <span v-reveal class="sm-eyebrow">{{ t.failure.eyebrow }}</span>
        <h2 id="nfail-title" v-reveal="60" class="sm-h2">{{ t.failure.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.failure.lead }}</p>

        <div v-reveal="160" class="nfail__observe">
          <h3 class="sm-h4">{{ t.failure.observability.title }}</h3>
          <p>{{ t.failure.observability.lead }}</p>
          <ul>
            <li v-for="item in t.failure.observability.items" :key="item" class="sm-check">
              <CircleDot :size="17" aria-hidden="true" /> {{ item }}
            </li>
          </ul>
        </div>
      </div>

      <ol v-reveal="120" class="nfail__flow" :aria-label="t.failure.label">
        <li v-for="(step, i) in t.failure.flow" :key="step" :class="{ nfail__start: i === 0 }">
          {{ step }}
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.nfail__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: clamp(32px, 5vw, 72px);
  align-items: center;
}
.nfail__copy {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.nfail__observe {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 12px;
  padding: 22px;
  border-radius: var(--sm-r-card);
  border: 1px solid var(--sm-inverse-edge);
  background: rgba(255, 255, 255, 0.03);
}
.nfail__observe p {
  font-size: 15px;
  color: var(--sm-on-inverse-muted);
}
.nfail__observe ul {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px 16px;
}
.nfail__flow {
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 14px;
}
.nfail__flow li {
  position: relative;
  padding: 14px 18px;
  border-radius: 14px;
  border: 1px solid var(--sm-inverse-edge);
  background: var(--sm-deep-2);
  font-size: 15.5px;
  font-weight: 600;
  text-align: center;
}
.nfail__flow li + li::before {
  content: '';
  position: absolute;
  top: -15px;
  left: 50%;
  width: 2px;
  height: 14px;
  background: var(--sm-tech);
  opacity: 0.6;
}
.nfail__flow .nfail__start {
  border-style: dashed;
  border-color: var(--sm-tech);
  background: transparent;
}
@media (max-width: 960px) {
  .nfail__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
@media (max-width: 560px) {
  .nfail__observe ul {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
