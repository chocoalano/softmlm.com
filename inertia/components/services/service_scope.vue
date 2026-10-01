<script setup lang="ts">
/**
 * What a service can cover: areas to agree on, never a package promise.
 * On the maklon page they are topics to discuss, so they carry a
 * conversation mark instead of a check.
 */
import { computed } from 'vue'
import { Check, Info, MessagesSquare } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import type { ServiceKey } from '@shared/services'
import { useCopy } from '~/i18n'

const props = defineProps<{ service: ServiceKey }>()
const t = useCopy('services')
const scope = computed(() => t.value.pages[props.service].scope)
const mark = computed(() => (props.service === 'product_maklon' ? MessagesSquare : Check))
</script>

<template>
  <section class="sm-section sm-section--compact ssc" aria-labelledby="ssc-title">
    <div class="sm-container">
      <div class="sm-heading">
        <span v-reveal class="sm-eyebrow">{{ t.shared.scopeEyebrow }}</span>
        <h2 id="ssc-title" v-reveal="60" class="sm-h2">{{ scope.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ scope.lead }}</p>
      </div>
      <ul class="ssc__grid">
        <li
          v-for="(item, i) in scope.items"
          :key="item.title"
          v-reveal="(i % 3) * 50"
          class="ssc__item"
        >
          <span class="ssc__check" aria-hidden="true"><component :is="mark" :size="16" /></span>
          <div>
            <h3 class="ssc__title">{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </div>
        </li>
      </ul>
      <p v-reveal class="ssc__note">
        <Info :size="17" aria-hidden="true" />
        <span>{{ t.shared.scopeNote }} {{ t.shared.pricingNote }}</span>
      </p>
    </div>
  </section>
</template>

<style scoped>
.ssc__grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}
.ssc__item {
  display: flex;
  gap: 14px;
  padding: 20px;
  border-radius: 20px;
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
}
.ssc__check {
  display: grid;
  place-items: center;
  flex: none;
  width: 30px;
  height: 30px;
  border-radius: 9px;
  background: var(--sm-primary-50);
  color: var(--sm-primary-ink);
}
.ssc__title {
  margin-bottom: 4px;
  font-size: 16px;
  font-weight: 650;
  letter-spacing: -0.01em;
}
.ssc__item p {
  font-size: 14.5px;
  line-height: 1.5;
  color: var(--sm-muted);
}
.ssc__note {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 16px;
  padding: 14px 18px;
  border-radius: 14px;
  background: var(--sm-info-bg);
  font-size: 15px;
  line-height: 1.5;
  color: var(--sm-text-2);
}
.ssc__note svg {
  flex: none;
  margin-top: 2px;
  color: var(--sm-info);
}
@media (max-width: 1024px) {
  .ssc__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 600px) {
  .ssc__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
