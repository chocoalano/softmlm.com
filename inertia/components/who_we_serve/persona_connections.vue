<script setup lang="ts">
import { computed } from 'vue'
import { ArrowRight } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import { WHO_WE_SERVE_PATH, findPersona, personaPath, type PersonaKey } from '@shared/personas'
import { personaIcons, personaStructure } from '~/content/personas'
import { useCopy, useI18n } from '~/i18n'

const props = defineProps<{ persona: PersonaKey }>()

const t = useCopy('personas')
const common = useCopy('common')
const { lp } = useI18n()
const connections = computed(() => t.value.personas[props.persona].connections)
const items = computed(() =>
  personaStructure[props.persona].connections.map((key, i) => ({
    key,
    icon: personaIcons[key],
    href: lp(personaPath(findPersona(key))),
    label: common.value.roles[key].label,
    more: t.value.shared.moreFor(common.value.roles[key].short),
    text: connections.value.items[i],
  }))
)
</script>

<template>
  <section
    class="sm-section sm-section--compact sm-section--tint pn"
    aria-labelledby="connections-title"
  >
    <div class="sm-container">
      <div class="pn__head">
        <div class="pn__intro">
          <span v-reveal class="sm-eyebrow">{{ t.shared.acrossBusiness }}</span>
          <h2 id="connections-title" v-reveal="60" class="sm-h2">{{ connections.title }}</h2>
          <p v-reveal="120" class="sm-lead">{{ connections.lead }}</p>
        </div>
        <a v-reveal="160" :href="lp(WHO_WE_SERVE_PATH)" class="sm-link">
          {{ t.shared.seeAllTeams }} <ArrowRight :size="16" />
        </a>
      </div>

      <ul class="pn__grid">
        <li v-for="(item, i) in items" :key="item.key" v-reveal="i * 70">
          <a :href="item.href" class="pn__card">
            <span class="pn__role">
              <span class="sm-icon-tile sm-icon-tile--sm"
                ><component :is="item.icon" :size="18"
              /></span>
              {{ item.label }}
            </span>
            <span class="pn__text">{{ item.text }}</span>
            <span class="sm-link pn__more">{{ item.more }} <ArrowRight :size="16" /></span>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.pn__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px 48px;
  flex-wrap: wrap;
  margin-bottom: clamp(32px, 4vw, 56px);
}
.pn__intro {
  display: flex;
  flex-direction: column;
  gap: 18px;
  max-width: 760px;
}
.pn__grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}
.pn__card {
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
.pn__card:hover {
  border-color: var(--sm-primary-200);
  box-shadow: var(--sm-shadow-soft);
}
.pn__role {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 650;
}
.pn__text {
  font-family: var(--sm-display);
  font-size: 19px;
  font-weight: 700;
  line-height: 1.35;
  letter-spacing: -0.018em;
}
.pn__more {
  margin-top: auto;
  font-size: 15px;
}
@media (max-width: 980px) {
  .pn__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
@media (max-width: 560px) {
  .pn__card {
    padding: 22px;
  }
}
</style>
