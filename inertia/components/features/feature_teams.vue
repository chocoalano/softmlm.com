<script setup lang="ts">
import { computed } from 'vue'
import { ArrowRight } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import type { FeatureKey } from '@shared/features'
import { findPersona, personaPath } from '@shared/personas'
import { featureStructure } from '~/content/features'
import { personaIcons } from '~/content/personas'
import { useCopy, useI18n } from '~/i18n'

const props = defineProps<{ feature: FeatureKey }>()
const t = useCopy('features')
const common = useCopy('common')
const { lp } = useI18n()
const teams = computed(() => t.value.pages[props.feature].teams)
const items = computed(() =>
  featureStructure[props.feature].teams.map((key, i) => ({
    key,
    label: common.value.roles[key].label,
    text: teams.value.items[i],
    href: lp(personaPath(findPersona(key))),
    icon: personaIcons[key],
  }))
)
</script>

<template>
  <section class="sm-section sm-section--compact sm-section--tint ft" aria-labelledby="teams-title">
    <div class="sm-container">
      <div class="sm-heading ft__head">
        <span v-reveal class="sm-eyebrow">{{ t.shared.teamsEyebrow }}</span>
        <h2 id="teams-title" v-reveal="60" class="sm-h2">{{ teams.title }}</h2>
      </div>
      <ul class="ft__grid">
        <li v-for="(item, i) in items" :key="item.key" v-reveal="i * 70">
          <a :href="item.href" class="ft__card">
            <span class="ft__role">
              <span class="sm-icon-tile sm-icon-tile--sm"
                ><component :is="item.icon" :size="18"
              /></span>
              {{ item.label }}
            </span>
            <span class="ft__text">{{ item.text }}</span>
            <span class="sm-link ft__more"
              >{{ t.shared.moreFor(item.label) }} <ArrowRight :size="16"
            /></span>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.ft__head {
  margin-bottom: clamp(32px, 4vw, 56px);
}
.ft__grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}
.ft__card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  padding: 28px;
  border-radius: var(--sm-r-card);
  background: var(--sm-surface);
  border: 1px solid var(--sm-border);
  transition:
    border-color 0.2s var(--sm-ease),
    box-shadow 0.2s var(--sm-ease);
}
.ft__card:hover {
  border-color: var(--sm-primary-200);
  box-shadow: var(--sm-shadow-soft);
}
.ft__role {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 650;
}
.ft__text {
  font-family: var(--sm-display);
  font-size: 19px;
  font-weight: 700;
  line-height: 1.35;
  letter-spacing: -0.018em;
}
.ft__more {
  margin-top: auto;
  font-size: 15px;
}
@media (max-width: 980px) {
  .ft__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
