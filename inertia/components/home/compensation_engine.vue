<script setup lang="ts">
import { ArrowRight, Check } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import RuleBuilderPreview from '~/components/compensation/rule_builder_preview.vue'
import MarketingWhatsappCta from '~/components/site/marketing_whatsapp_cta.vue'
import { useCopy, useI18n } from '~/i18n'

const t = useCopy('homePlatform')
const { lp } = useI18n()

/** Plan architectures by their industry names (the same in every language). */
const architectures = ['Binary', 'Unilevel', 'Matrix', 'Generation', 'Hybrid', 'Custom']
</script>

<template>
  <section id="compensation" class="sm-section sm-section--tint ce">
    <div class="sm-container ce__grid">
      <div class="ce__copy">
        <span v-reveal class="sm-eyebrow">{{ t.compensation.eyebrow }}</span>
        <h2 v-reveal="60" class="sm-h2">{{ t.compensation.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.compensation.lead }}</p>
        <ul v-reveal="180" class="ce__points">
          <li v-for="point in t.compensation.points" :key="point" class="sm-check">
            <Check :size="18" /> {{ point }}
          </li>
        </ul>
        <div v-reveal="240" class="ce__plans">
          <p class="ce__plans-label">{{ t.compensation.architecturesLabel }}</p>
          <ul>
            <li v-for="plan in architectures" :key="plan" class="sm-chip">{{ plan }}</li>
          </ul>
        </div>
        <div v-reveal="280" class="ce__links">
          <MarketingWhatsappCta
            context="compensation"
            page="homepage"
            section="compensation"
            variant="contextual"
            appearance="link"
            :label="t.compensation.discuss"
          />
          <a :href="lp('/compensation-plans')" class="sm-link ce__secondary">
            {{ t.compensation.explore }} <ArrowRight :size="16" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div v-reveal="120" class="ce__builder">
        <RuleBuilderPreview />
      </div>
    </div>
  </section>
</template>

<style scoped>
.ce__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 560px);
  gap: clamp(40px, 6vw, 96px);
  align-items: center;
}
.ce__copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 22px;
}
.ce__points {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 6px;
}
.ce__plans {
  margin-top: 10px;
}
.ce__plans-label {
  margin-bottom: 12px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--sm-subtle);
}
.ce__plans ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.ce__links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 28px;
  margin-top: 6px;
}
.ce__secondary {
  color: var(--sm-text-2);
}
.ce__plans .sm-chip {
  height: 34px;
  font-size: 14px;
}
@media (max-width: 1080px) {
  .ce__grid {
    grid-template-columns: minmax(0, 1fr);
  }
  .ce__builder {
    max-width: 620px;
  }
}
</style>
