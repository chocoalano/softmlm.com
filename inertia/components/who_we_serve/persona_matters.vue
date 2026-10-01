<script setup lang="ts">
import { computed } from 'vue'
import { vReveal } from '~/composables/reveal'
import { personaStructure } from '~/content/personas'
import { useCopy } from '~/i18n'
import type { PersonaKey } from '@shared/personas'

const props = defineProps<{ persona: PersonaKey }>()

const t = useCopy('personas')
const matters = computed(() => t.value.personas[props.persona].matters)
const items = computed(() =>
  matters.value.items.map((item, i) => ({
    ...item,
    icon: personaStructure[props.persona].matters[i],
  }))
)
</script>

<template>
  <section class="sm-section sm-section--compact pm" aria-labelledby="matters-title">
    <div class="sm-container pm__grid">
      <div class="pm__head">
        <span v-reveal class="sm-eyebrow">{{ t.shared.whatMatters }}</span>
        <h2 id="matters-title" v-reveal="60" class="sm-h2">{{ matters.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ matters.lead }}</p>
      </div>
      <ul class="pm__list">
        <li v-for="(item, i) in items" :key="item.title" v-reveal="i * 50">
          <span class="sm-icon-tile"><component :is="item.icon" :size="20" /></span>
          <span>
            <b>{{ item.title }}</b>
            <span>{{ item.text }}</span>
          </span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.pm__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
  gap: clamp(40px, 6vw, 96px);
  align-items: start;
}
.pm__head {
  position: sticky;
  top: calc(var(--sm-header-h) + 40px);
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.pm__list {
  list-style: none;
  border-top: 1px solid var(--sm-border);
}
.pm__list li {
  display: flex;
  gap: 18px;
  align-items: flex-start;
  padding: 22px 0;
  border-bottom: 1px solid var(--sm-border);
}
.pm__list li > span:last-child {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.pm__list b {
  font-family: var(--sm-display);
  font-size: 19px;
  font-weight: 700;
  letter-spacing: -0.018em;
}
.pm__list li > span:last-child > span {
  font-size: 16px;
  line-height: 1.6;
  color: var(--sm-muted);
}
@media (max-width: 980px) {
  .pm__grid {
    grid-template-columns: minmax(0, 1fr);
  }
  .pm__head {
    position: static;
  }
}
</style>
