<script setup lang="ts">
import { Check } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import RuleBuilderPreview from '~/components/compensation/rule_builder_preview.vue'
import MarketingWhatsappCta from '~/components/site/marketing_whatsapp_cta.vue'
import VisualNote from '~/components/site/visual_note.vue'
import { useCopy } from '~/i18n'

const t = useCopy('compensation')
</script>

<template>
  <section id="rule-builder" class="sm-section sm-section--tint cb">
    <div class="sm-container cb__grid">
      <div class="cb__copy">
        <span v-reveal class="sm-eyebrow">{{ t.builder.eyebrow }}</span>
        <h2 v-reveal="60" class="sm-h2">{{ t.builder.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.builder.lead }}</p>
        <p v-reveal="150" class="cb__label">{{ t.builder.fieldsLabel }}</p>
        <ul v-reveal="180" class="cb__fields">
          <li v-for="field in t.builder.fields" :key="field" class="sm-check">
            <Check :size="18" /> {{ field }}
          </li>
        </ul>
        <div v-reveal="220" class="cb__ask">
          <p>{{ t.builder.ask }}</p>
          <MarketingWhatsappCta
            context="compensation"
            page="compensation"
            section="rule_builder"
            variant="contextual"
            appearance="link"
            :label="t.builder.askLink"
          />
        </div>
      </div>
      <div v-reveal="120" class="cb__builder">
        <RuleBuilderPreview />
        <VisualNote :label="t.builder.caption" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.cb__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 560px);
  gap: clamp(40px, 6vw, 96px);
  align-items: center;
}
.cb__copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
}
.cb__ask {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 8px;
  padding: 16px 18px;
  border-radius: 16px;
  background: var(--sm-surface);
  border: 1px solid var(--sm-border);
}
.cb__ask p {
  font-weight: 650;
}
.cb__label {
  margin-top: 6px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--sm-subtle);
}
.cb__fields {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
@media (max-width: 1080px) {
  .cb__grid {
    grid-template-columns: minmax(0, 1fr);
  }
  .cb__builder {
    max-width: 620px;
  }
}
</style>
