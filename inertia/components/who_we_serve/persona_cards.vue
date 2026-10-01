<script setup lang="ts">
/**
 * The role selector on /who-we-serve: one card per role, each a plain link
 * to that role's page, so it works with a keyboard and without script.
 */
import { ArrowRight } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import PersonaMini from '~/components/who_we_serve/persona_mini.vue'
import { personaPath, personas } from '@shared/personas'
import { personaIcons } from '~/content/personas'
import { useCopy, useI18n } from '~/i18n'

const t = useCopy('personas')
const common = useCopy('common')
const { lp } = useI18n()
</script>

<template>
  <section
    id="roles"
    class="sm-section sm-section--compact sm-section--tint pk"
    aria-labelledby="roles-title"
  >
    <div class="sm-container">
      <div class="sm-heading pk__head">
        <span v-reveal class="sm-eyebrow">{{ t.landing.cards.eyebrow }}</span>
        <h2 id="roles-title" v-reveal="60" class="sm-h2">{{ t.landing.cards.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.landing.cards.lead }}</p>
      </div>

      <ul class="pk__grid">
        <li
          v-for="(persona, i) in personas"
          :key="persona.key"
          v-reveal="(i % 3) * 60"
          :class="{ 'pk__item--wide': i === 0 }"
        >
          <a :href="lp(personaPath(persona))" class="pk__card">
            <PersonaMini :persona="persona.key" />
            <span class="pk__role">
              <span class="sm-icon-tile sm-icon-tile--sm"
                ><component :is="personaIcons[persona.key]" :size="18"
              /></span>
              {{ common.roles[persona.key].short }}
            </span>
            <span class="pk__problem">“{{ t.personas[persona.key].card.problem }}”</span>
            <span class="pk__outcome">{{ t.personas[persona.key].card.outcome }}</span>
            <span class="sm-link pk__more"
              >{{ t.shared.learnMore }}
              <span class="sr-only">{{
                t.shared.learnMoreAbout(common.roles[persona.key].short)
              }}</span>
              <ArrowRight :size="16"
            /></span>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.pk__head {
  margin-bottom: clamp(32px, 4vw, 56px);
}
.pk__grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}
.pk__item--wide {
  grid-column: span 2;
}
.pk__card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
  padding: 18px 18px 24px;
  border-radius: var(--sm-r-card);
  background: var(--sm-surface);
  border: 1px solid var(--sm-border);
  transition:
    border-color 0.2s var(--sm-ease),
    box-shadow 0.2s var(--sm-ease),
    transform 0.2s var(--sm-ease);
}
.pk__card:hover {
  border-color: var(--sm-primary-200);
  box-shadow: var(--sm-shadow-soft);
  transform: translateY(-2px);
}
.pk__role {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 6px;
  padding-inline: 6px;
  font-weight: 650;
}
.pk__problem {
  padding-inline: 6px;
  font-family: var(--sm-display);
  font-size: 20px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.02em;
  text-wrap: balance;
}
.pk__outcome {
  padding-inline: 6px;
  font-size: 15px;
  line-height: 1.6;
  color: var(--sm-muted);
}
.pk__more {
  margin-top: auto;
  padding: 6px 6px 0;
  font-size: 15px;
}
@media (min-width: 1081px) {
  .pk__item--wide .pk__card {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
    grid-template-rows: auto auto auto 1fr;
    column-gap: 28px;
    padding: 18px 18px 18px 24px;
  }
  .pk__item--wide .pk__card :deep(.mini) {
    grid-column: 2;
    grid-row: 1 / -1;
    height: 100%;
    min-height: 220px;
  }
  .pk__item--wide .pk__role {
    margin-top: 12px;
  }
  .pk__item--wide .pk__problem {
    font-size: 24px;
  }
  .pk__item--wide .pk__more {
    align-self: end;
    padding-bottom: 6px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .pk__card:hover {
    transform: none;
  }
}
@media (max-width: 1080px) {
  .pk__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 640px) {
  .pk__grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 12px;
  }
  .pk__item--wide {
    grid-column: auto;
  }
  .pk__card {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 8px;
    padding: 18px;
  }
  .pk__card :deep(.mini) {
    display: none;
  }
  .pk__role {
    margin-top: 0;
    padding-inline: 0;
  }
  .pk__problem,
  .pk__outcome,
  .pk__more {
    padding-inline: 0;
  }
  .pk__problem {
    font-size: 18px;
  }
}
</style>
