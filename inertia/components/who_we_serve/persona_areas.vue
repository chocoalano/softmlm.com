<script setup lang="ts">
import { computed } from 'vue'
import { ArrowRight } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import { personaStructure } from '~/content/personas'
import { useCopy, useI18n } from '~/i18n'
import { personaTrackingPage, type PersonaKey } from '@shared/personas'
import { INTEGRATIONS_PATH } from '@shared/integrations'
import { SECURITY_PATH } from '@shared/security'
import { exploreFeature } from '~/composables/interest'

const props = defineProps<{ persona: PersonaKey }>()

const t = useCopy('personas')
const { lp, locale } = useI18n()
const areas = computed(() => t.value.personas[props.persona].areas)
const items = computed(() =>
  areas.value.items.map((item, i) => {
    const { icon, href } = personaStructure[props.persona].areas[i]
    return {
      ...item,
      icon,
      href: href ? lp(href) : undefined,
      feature:
        href === INTEGRATIONS_PATH ? 'integrations' : href === SECURITY_PATH ? 'security' : null,
    }
  })
)
const related = computed(() =>
  (personaStructure[props.persona].related ?? []).map((href, i) => ({
    href: lp(href),
    label: areas.value.related?.[i] ?? '',
  }))
)

/**
 * Opening the Integrations or Security page from a role page is an explicit
 * interest; reading the role page is not.
 */
function onArea(item: { feature: string | null }) {
  if (item.feature) exploreFeature(item.feature, personaTrackingPage(props.persona), locale.value)
}
</script>

<template>
  <section class="sm-section sm-section--compact pr" aria-labelledby="areas-title">
    <div class="sm-container">
      <div class="sm-heading pr__head">
        <span v-reveal class="sm-eyebrow">{{ t.shared.relevantAreas }}</span>
        <h2 id="areas-title" v-reveal="60" class="sm-h2">{{ areas.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ areas.lead }}</p>
      </div>

      <ul class="pr__grid" :class="{ 'pr__grid--dense': items.length > 4 }">
        <li v-for="(item, i) in items" :key="item.title" v-reveal="(i % 4) * 50">
          <a
            v-if="item.href"
            :href="item.href"
            class="pr__card pr__card--link"
            @click="onArea(item)"
          >
            <span class="sm-icon-tile"><component :is="item.icon" :size="20" /></span>
            <b>{{ item.title }}</b>
            <span class="pr__text">{{ item.text }}</span>
            <span class="sm-link pr__more">{{ item.linkLabel }} <ArrowRight :size="16" /></span>
          </a>
          <div v-else class="pr__card">
            <span class="sm-icon-tile sm-icon-tile--sm"
              ><component :is="item.icon" :size="18"
            /></span>
            <b>{{ item.title }}</b>
            <span class="pr__text">{{ item.text }}</span>
          </div>
        </li>
      </ul>

      <ul v-if="related.length" class="pr__related">
        <li v-for="link in related" :key="link.href">
          <a :href="link.href" class="sm-link">{{ link.label }} <ArrowRight :size="16" /></a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.pr__head {
  margin-bottom: clamp(32px, 4vw, 56px);
}
.pr__grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}
.pr__card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  padding: 26px;
  border-radius: var(--sm-r-card);
  background: var(--sm-surface-subtle);
  border: 1px solid transparent;
  transition:
    background 0.2s var(--sm-ease),
    border-color 0.2s var(--sm-ease),
    transform 0.2s var(--sm-ease);
}
.pr__card b {
  margin-top: 8px;
  font-family: var(--sm-display);
  font-size: 19px;
  font-weight: 700;
  letter-spacing: -0.018em;
}
.pr__text {
  font-size: 15px;
  line-height: 1.6;
  color: var(--sm-muted);
}
.pr__more {
  margin-top: auto;
  padding-top: 8px;
  font-size: 15px;
}
.pr__card--link:hover {
  background: var(--sm-surface);
  border-color: var(--sm-border);
  transform: translateY(-2px);
}
.pr__grid--dense .pr__card {
  padding: 20px;
  gap: 6px;
}
.pr__grid--dense .pr__card b {
  font-size: 17px;
}
.pr__grid--dense .pr__text {
  font-size: 14.5px;
}
.pr__related {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 12px 32px;
  margin-top: 28px;
}
@media (prefers-reduced-motion: reduce) {
  .pr__card--link:hover {
    transform: none;
  }
}
@media (max-width: 1080px) {
  .pr__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 560px) {
  .pr__grid:not(.pr__grid--dense) {
    grid-template-columns: minmax(0, 1fr);
  }
  .pr__grid--dense {
    gap: 10px;
  }
  .pr__grid--dense .pr__card {
    padding: 16px;
  }
}
</style>
