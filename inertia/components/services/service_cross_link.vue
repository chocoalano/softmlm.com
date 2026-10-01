<script setup lang="ts">
/**
 * A single, quiet pointer from one page to another, used only where it
 * fits the page (docs/services-marketing-strategy.md, cross-links). Opening
 * a service or a feature (e.g. Integrations) this way is an explicit
 * interest.
 */
import { ArrowRight } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import { track } from '@shared/analytics'
import type { ServiceKey } from '@shared/services'
import { exploreFeature } from '~/composables/interest'
import { useI18n } from '~/i18n'

const props = withDefaults(
  defineProps<{
    text: string
    label: string
    href: string
    page: string
    service?: ServiceKey
    feature?: string
  }>(),
  { service: undefined, feature: undefined }
)
const { locale } = useI18n()

function explore() {
  if (props.service) {
    track('service_interest', { service: props.service, page: props.page, locale: locale.value })
  }
  if (props.feature) exploreFeature(props.feature, props.page, locale.value)
}
</script>

<template>
  <aside class="scl">
    <div v-reveal class="sm-container scl__inner">
      <p>{{ text }}</p>
      <a :href="href" class="sm-link" @click="explore">{{ label }} <ArrowRight :size="16" /></a>
    </div>
  </aside>
</template>

<style scoped>
.scl {
  padding-block: 8px clamp(24px, 3vw, 40px);
}
.scl__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8px 16px;
  text-align: center;
}
.scl__inner p {
  font-size: 15.5px;
  color: var(--sm-muted);
}
</style>
