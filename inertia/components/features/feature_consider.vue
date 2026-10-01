<script setup lang="ts">
import { computed } from 'vue'
import { ListChecks } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import MarketingWhatsappCta from '~/components/site/marketing_whatsapp_cta.vue'
import { featureTrackingPage, type FeatureKey } from '@shared/features'
import { useCopy } from '~/i18n'

const props = defineProps<{ feature: FeatureKey }>()
const t = useCopy('features')
const items = computed(() => t.value.pages[props.feature].consider)
</script>

<template>
  <section class="sm-section sm-section--compact fk" aria-labelledby="consider-title">
    <div class="sm-container fk__grid">
      <div class="fk__head">
        <span v-reveal class="sm-eyebrow">{{ t.shared.considerEyebrow }}</span>
        <h2 id="consider-title" v-reveal="60" class="sm-h2">{{ t.shared.considerTitle }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.shared.considerLead }}</p>
        <div v-reveal="160" class="fk__ask">
          <MarketingWhatsappCta
            :context="feature"
            :page="featureTrackingPage(feature)"
            section="considerations"
            variant="contextual"
            :label="t.shared.askWhatsapp"
          />
          <a href="#demo" class="sm-link">{{ t.shared.orBookDemo }}</a>
        </div>
      </div>
      <ol class="fk__list">
        <li v-for="(item, i) in items" :key="item" v-reveal="i * 50">
          <ListChecks :size="20" aria-hidden="true" />
          <span>{{ item }}</span>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.fk__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
  gap: clamp(40px, 6vw, 96px);
  align-items: center;
}
.fk__head {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
}
.fk__ask {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 24px;
  margin-top: 8px;
}
.fk__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.fk__list li {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 18px 20px;
  border-radius: 16px;
  background: var(--sm-surface-subtle);
  font-size: 16px;
  font-weight: 600;
  line-height: 1.45;
}
.fk__list svg {
  flex: none;
  margin-top: 1px;
  color: var(--sm-primary-ink);
}
@media (max-width: 980px) {
  .fk__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
@media (max-width: 560px) {
  .fk__ask {
    width: 100%;
  }
  .fk__ask > .sm-btn {
    width: 100%;
  }
  .fk__list li {
    padding: 16px;
    font-size: 15.5px;
  }
}
</style>
