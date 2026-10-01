<script setup lang="ts">
/**
 * The recurring brand idea: we start from how the business works, not
 * from a package. Used once, on /who-we-serve.
 */
import { Check } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import MarketingWhatsappCta from '~/components/site/marketing_whatsapp_cta.vue'
import { useCopy } from '~/i18n'

const t = useCopy('personas')
const common = useCopy('common')
</script>

<template>
  <section class="sm-section sm-section--compact sm-section--dark bf" aria-labelledby="bf-title">
    <div class="bf__glow" aria-hidden="true" />
    <div class="sm-container bf__grid">
      <div class="bf__copy">
        <span v-reveal class="sm-eyebrow">{{ t.landing.businessFirst.eyebrow }}</span>
        <h2 id="bf-title" v-reveal="60" class="sm-h2">{{ t.landing.businessFirst.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.landing.businessFirst.lead }}</p>
        <ul v-reveal="160" class="bf__topics">
          <li v-for="topic in t.landing.businessFirst.topics" :key="topic" class="sm-check">
            <Check :size="18" /> {{ topic }}
          </li>
        </ul>
        <div v-reveal="200" class="bf__ctas">
          <MarketingWhatsappCta
            page="who_we_serve"
            section="business_first"
            variant="primary"
            size="lg"
            :label="t.landing.businessFirst.cta"
          />
          <a href="#demo" class="sm-btn sm-btn--on-dark sm-btn--lg">{{ common.cta.bookDemo }}</a>
        </div>
      </div>

      <div v-reveal="120" class="bf__compare">
        <figure class="bf__card bf__card--muted">
          <figcaption>{{ t.landing.businessFirst.theirsLabel }}</figcaption>
          <blockquote>“{{ t.landing.businessFirst.theirs }}”</blockquote>
        </figure>
        <figure class="bf__card bf__card--ours">
          <figcaption>{{ t.landing.businessFirst.oursLabel }}</figcaption>
          <blockquote>“{{ t.landing.businessFirst.ours }}”</blockquote>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bf {
  overflow: hidden;
  isolation: isolate;
}
.bf__glow {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(45% 70% at 100% 20%, rgba(2, 200, 250, 0.14), transparent 70%),
    radial-gradient(50% 70% at 0% 100%, rgba(0, 93, 251, 0.4), transparent 70%);
}
.bf__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: clamp(40px, 6vw, 96px);
  align-items: center;
}
.bf__copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}
.bf__topics {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.bf__ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;
}
.bf__compare {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.bf__card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: clamp(22px, 3vw, 32px);
  border-radius: var(--sm-r-card);
}
.bf__card figcaption {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.bf__card blockquote {
  font-family: var(--sm-display);
  font-size: clamp(24px, 2.6vw, 32px);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.025em;
}
.bf__card--muted {
  border: 1px dashed rgba(255, 255, 255, 0.2);
  color: var(--sm-on-inverse-muted);
}
.bf__card--muted blockquote {
  text-decoration: line-through;
  text-decoration-color: rgba(255, 255, 255, 0.35);
  text-decoration-thickness: 2px;
}
.bf__card--ours {
  margin-left: clamp(0px, 4vw, 48px);
  border: 1px solid var(--sm-inverse-edge);
  background: var(--sm-surface);
  color: var(--sm-text);
  box-shadow: 0 40px 80px -40px rgba(0, 0, 0, 0.6);
}
.bf__card--ours figcaption {
  color: var(--sm-primary-ink);
}
@media (max-width: 980px) {
  .bf__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
@media (max-width: 560px) {
  .bf__ctas {
    width: 100%;
    flex-direction: column;
  }
  .bf__ctas .sm-btn {
    width: 100%;
  }
  .bf__card--ours {
    margin-left: 0;
  }
}
</style>
