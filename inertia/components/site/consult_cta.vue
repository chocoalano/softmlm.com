<script setup lang="ts">
/**
 * A conversion band: WhatsApp consultation first, Book a Demo second.
 */
import { vReveal } from '~/composables/reveal'
import type { WhatsappContext } from '@shared/whatsapp'
import MarketingWhatsappCta from '~/components/site/marketing_whatsapp_cta.vue'
import { useLeadTarget } from '~/composables/lead_target'

withDefaults(
  defineProps<{
    title: string
    text: string
    eyebrow?: string
    context?: WhatsappContext
    page: string
    section: string
    whatsappLabel?: string
    demoHref?: string
    /** The second button; "Book a Demo" unless another page is the better next step. */
    secondaryLabel?: string
  }>(),
  {
    eyebrow: undefined,
    context: 'general',
    whatsappLabel: undefined,
    demoHref: undefined,
    secondaryLabel: undefined,
  }
)

const leadTarget = useLeadTarget()
</script>

<template>
  <section class="cta-band" :aria-labelledby="`${section}-cta-title`">
    <div class="sm-container">
      <div v-reveal class="cta-band__panel">
        <div class="cta-band__copy">
          <span v-if="eyebrow" class="sm-eyebrow">{{ eyebrow }}</span>
          <h2 :id="`${section}-cta-title`" class="sm-h3">{{ title }}</h2>
          <p>{{ text }}</p>
        </div>
        <div class="cta-band__actions">
          <MarketingWhatsappCta
            :context="context"
            :page="page"
            :section="section"
            variant="primary"
            :label="whatsappLabel"
            size="lg"
          />
          <a :href="demoHref ?? leadTarget.href" class="sm-btn sm-btn--on-dark sm-btn--lg">{{
            secondaryLabel ?? leadTarget.label.value
          }}</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-band {
  padding-block: clamp(40px, 5vw, 64px);
}
.cta-band__panel {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) auto;
  gap: 24px 48px;
  align-items: center;
  padding: clamp(28px, 4vw, 48px);
  border-radius: var(--sm-r-shell);
  color: #fff;
  background:
    radial-gradient(60% 120% at 100% 0%, rgba(2, 200, 250, 0.18), transparent 60%),
    radial-gradient(60% 120% at 0% 100%, rgba(0, 93, 251, 0.5), transparent 60%),
    var(--sm-surface-inverse);
  border: 1px solid var(--sm-inverse-edge);
}
.cta-band__copy {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.cta-band__copy .sm-eyebrow {
  color: var(--sm-tech);
}
.cta-band__copy p {
  max-width: 620px;
  font-size: 17px;
  line-height: 1.6;
  color: var(--sm-on-inverse-muted);
}
.cta-band__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
@media (max-width: 900px) {
  .cta-band__panel {
    grid-template-columns: minmax(0, 1fr);
  }
}
@media (max-width: 520px) {
  .cta-band__actions {
    flex-direction: column;
  }
  .cta-band__actions > * {
    width: 100%;
  }
}
</style>
