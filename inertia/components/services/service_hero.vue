<script setup lang="ts">
/**
 * Hero of the services hub and of each service page: WhatsApp first, the
 * page's consultation form second, and the page's concept visual.
 */
import { ChevronRight } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import MarketingWhatsappCta from '~/components/site/marketing_whatsapp_cta.vue'
import type { WhatsappContext } from '@shared/whatsapp'
import { SERVICES_PATH } from '@shared/services'
import { useLeadTarget } from '~/composables/lead_target'
import { useCopy, useI18n } from '~/i18n'

withDefaults(
  defineProps<{
    eyebrow: string
    title: string
    highlight: string
    lead: string
    ctaLabel: string
    context: WhatsappContext
    page: string
    /** Service pages show a breadcrumb back to the hub. */
    breadcrumb?: boolean
    secondaryHref?: string
    secondaryLabel?: string
  }>(),
  { breadcrumb: false, secondaryHref: undefined, secondaryLabel: undefined }
)

const t = useCopy('services')
const common = useCopy('common')
const { lp } = useI18n()
const leadTarget = useLeadTarget()
</script>

<template>
  <section class="shero" aria-labelledby="shero-title">
    <div class="shero__bg" aria-hidden="true" />
    <div class="sm-container shero__grid">
      <div class="shero__copy">
        <nav v-if="breadcrumb" v-reveal :aria-label="common.breadcrumb" class="shero__crumbs">
          <ol>
            <li>
              <a :href="lp(SERVICES_PATH)">{{ t.shared.breadcrumbRoot }}</a>
              <ChevronRight :size="14" aria-hidden="true" />
            </li>
            <li aria-current="page">{{ eyebrow }}</li>
          </ol>
        </nav>
        <span v-else v-reveal class="sm-eyebrow">{{ eyebrow }}</span>
        <h1 id="shero-title" v-reveal="60" class="sm-h1 shero__title">
          {{ title }} <span class="sm-grad">{{ highlight }}</span>
        </h1>
        <p v-reveal="120" class="sm-lead">{{ lead }}</p>
        <div v-reveal="180" class="shero__ctas">
          <MarketingWhatsappCta
            :context="context"
            :page="page"
            section="hero"
            variant="primary"
            size="lg"
            :label="ctaLabel"
          />
          <a :href="secondaryHref ?? leadTarget.href" class="sm-btn sm-btn--light sm-btn--lg">{{
            secondaryLabel ?? leadTarget.label.value
          }}</a>
        </div>
        <slot name="after" />
      </div>
      <div v-reveal="140" class="shero__visual">
        <slot />
      </div>
    </div>
  </section>
</template>

<style scoped>
.shero {
  position: relative;
  padding-block: clamp(32px, 5vw, 72px) clamp(56px, 7vw, 104px);
  isolation: isolate;
  overflow: hidden;
}
.shero__bg {
  position: absolute;
  inset: calc(var(--sm-header-h) * -1) 0 0;
  z-index: -1;
  background:
    radial-gradient(50% 60% at 82% 38%, var(--sm-glow), transparent 70%),
    radial-gradient(30% 40% at 6% 92%, rgba(2, 200, 250, 0.08), transparent 70%),
    linear-gradient(180deg, var(--sm-page), var(--sm-surface-subtle));
}
.shero__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
  gap: clamp(32px, 5vw, 80px);
  align-items: center;
}
.shero__copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 22px;
}
.shero__crumbs ol {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: var(--sm-muted);
}
.shero__crumbs li {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.shero__crumbs a {
  font-weight: 500;
  color: var(--sm-text-2);
}
.shero__crumbs a:hover {
  color: var(--sm-primary-ink);
}
.shero__crumbs [aria-current] {
  font-weight: 600;
  color: var(--sm-text);
}
.shero__title {
  font-size: clamp(36px, 4.7vw, 62px);
}
.shero__ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 6px;
}
.shero__visual {
  width: 100%;
  min-width: 0;
}
@media (max-width: 980px) {
  .shero__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
@media (max-width: 560px) {
  .shero__ctas {
    width: 100%;
    flex-direction: column;
  }
  .shero__ctas .sm-btn {
    width: 100%;
  }
}
</style>
