<script setup lang="ts">
/**
 * One or two related services, suggested in context. Never "take all of
 * them": each page picks the services that naturally come next.
 */
import { computed } from 'vue'
import { ArrowRight } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import { findService, servicePath, type ServiceKey } from '@shared/services'
import { track } from '@shared/analytics'
import { serviceIcons } from '~/content/services'
import { useCopy, useI18n } from '~/i18n'

const props = defineProps<{ service: ServiceKey; page: string }>()
const t = useCopy('services')
const common = useCopy('common')
const { lp, locale } = useI18n()

const related = computed(() => t.value.pages[props.service].related)
const links = computed(() =>
  (related.value.keys as readonly ServiceKey[]).map((key) => ({
    key,
    label: common.value.nav.serviceLinks[key].label,
    text: common.value.nav.serviceLinks[key].text,
    href: lp(servicePath(findService(key))),
    icon: serviceIcons[key],
  }))
)

function explore(service: ServiceKey) {
  track('service_interest', { service, page: props.page, locale: locale.value })
}
</script>

<template>
  <section class="sm-section sm-section--compact srl" aria-labelledby="srl-title">
    <div class="sm-container srl__grid">
      <div class="srl__copy">
        <span v-reveal class="sm-eyebrow">{{ t.shared.relatedEyebrow }}</span>
        <h2 id="srl-title" v-reveal="60" class="sm-h3">{{ related.text }}</h2>
      </div>
      <ul class="srl__links">
        <li v-for="(link, i) in links" :key="link.key" v-reveal="i * 60">
          <a :href="link.href" class="srl__link" @click="explore(link.key)">
            <span class="sm-icon-tile sm-icon-tile--sm" aria-hidden="true"
              ><component :is="link.icon" :size="17"
            /></span>
            <span class="srl__text">
              <b>{{ link.label }}</b>
              <span>{{ link.text }}</span>
            </span>
            <ArrowRight :size="16" aria-hidden="true" class="srl__arrow" />
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.srl__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
  gap: clamp(32px, 5vw, 72px);
  align-items: center;
}
.srl__copy {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.srl__links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.srl__link {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  border-radius: 18px;
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
  transition:
    border-color 0.15s,
    box-shadow 0.15s;
}
.srl__link:hover {
  border-color: var(--sm-primary-200);
  box-shadow: var(--sm-shadow-soft);
}
.srl__text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.srl__text b {
  font-size: 15.5px;
  font-weight: 650;
}
.srl__text span {
  font-size: 14px;
  color: var(--sm-muted);
}
.srl__arrow {
  flex: none;
  color: var(--sm-primary-ink);
}
@media (max-width: 860px) {
  .srl__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
