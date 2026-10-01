<script setup lang="ts">
/**
 * The nine implementation phases. Every phase is plain text in reading
 * order. On wide screens a sticky rail shows the whole journey and follows
 * the phase being read; on narrow screens the phases become a vertical
 * flow, one full-width step at a time.
 */
import { computed, onBeforeUnmount, onMounted, ref, type Component } from 'vue'
import {
  ArrowRight,
  Cable,
  Check,
  Database,
  DraftingCompass,
  FlaskConical,
  GraduationCap,
  Info,
  LifeBuoy,
  PackageCheck,
  Rocket,
  SearchCheck,
  SlidersHorizontal,
  Wrench,
} from 'lucide-vue-next'
import MarketingWhatsappCta from '~/components/site/marketing_whatsapp_cta.vue'
import MigrationReality from '~/components/implementation/migration_reality.vue'
import CompensationValidation from '~/components/implementation/compensation_validation.vue'
import {
  HOW_WE_DO_IT_TRACKING_PAGE,
  implementationPhases,
  phaseAnchor,
  type ImplementationPhase,
} from '@shared/implementation'
import { FEATURES_PATH } from '@shared/features'
import { INTEGRATIONS_PATH } from '@shared/integrations'
import { exploreFeature } from '~/composables/interest'
import { vReveal } from '~/composables/reveal'
import { useCopy, useI18n } from '~/i18n'

const t = useCopy('implementation')
const { lp, locale } = useI18n()

/** Opening the Integrations page from the Integrate phase is an explicit interest. */
function exploreIntegrations() {
  exploreFeature('integrations', HOW_WE_DO_IT_TRACKING_PAGE, locale.value)
}
const items = computed(() => t.value.phases.items)

const icons: Record<ImplementationPhase, Component> = {
  discover: SearchCheck,
  blueprint: DraftingCompass,
  configure: SlidersHorizontal,
  integrate: Cable,
  migrate: Database,
  test: FlaskConical,
  train: GraduationCap,
  launch: Rocket,
  support: LifeBuoy,
}
const splitIcons = [PackageCheck, SlidersHorizontal, Wrench]

/** The "what we look at" list of the phases that have one. */
function pointsOf(phase: ImplementationPhase): readonly string[] {
  const item = items.value[phase]
  return 'points' in item ? item.points : []
}

/** The scope sentence of the phases whose scope is agreed per project. */
function scopeOf(phase: ImplementationPhase): string | undefined {
  const item = items.value[phase]
  return 'scope' in item ? item.scope : undefined
}

const active = ref<ImplementationPhase>(implementationPhases[0])
const activeIndex = computed(() => implementationPhases.indexOf(active.value))
let observer: IntersectionObserver | undefined

onMounted(() => {
  if (typeof IntersectionObserver === 'undefined') return
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) active.value = entry.target.id.slice(6) as ImplementationPhase
      }
    },
    { rootMargin: '-40% 0px -55% 0px' }
  )
  for (const phase of implementationPhases) {
    const el = document.getElementById(phaseAnchor(phase))
    if (el) observer.observe(el)
  }
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <section id="phases" class="sm-section sm-section--tint iph" aria-labelledby="iph-title">
    <div class="sm-container">
      <div class="sm-heading">
        <span v-reveal class="sm-eyebrow">{{ t.phases.eyebrow }}</span>
        <h2 id="iph-title" v-reveal="60" class="sm-h2">{{ t.phases.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.phases.lead }}</p>
      </div>

      <div class="iph__layout">
        <nav class="iph__rail" :aria-label="t.phases.railLabel">
          <ol
            class="iph__rail-list"
            :style="{ '--progress': activeIndex / (implementationPhases.length - 1) }"
          >
            <li v-for="(phase, i) in implementationPhases" :key="phase">
              <a
                :href="`#${phaseAnchor(phase)}`"
                class="iph__rail-link"
                :class="{ 'is-past': i < activeIndex }"
                :aria-current="phase === active ? 'step' : undefined"
              >
                <span class="iph__rail-dot" aria-hidden="true">{{ i + 1 }}</span>
                <span>{{ items[phase].label }}</span>
              </a>
            </li>
          </ol>
        </nav>

        <ol class="iph__list">
          <li
            v-for="(phase, i) in implementationPhases"
            :id="phaseAnchor(phase)"
            :key="phase"
            class="iph__phase"
            :class="{ 'is-active': phase === active }"
          >
            <span class="iph__node" aria-hidden="true"
              ><component :is="icons[phase]" :size="18"
            /></span>
            <article class="iph__card" :aria-labelledby="`${phaseAnchor(phase)}-title`">
              <p class="iph__kicker">
                <span class="iph__kicker-icon" aria-hidden="true"
                  ><component :is="icons[phase]" :size="16"
                /></span>
                {{ t.phases.phase(i + 1) }} · {{ items[phase].label }}
              </p>
              <h3 :id="`${phaseAnchor(phase)}-title`" class="iph__title">
                {{ items[phase].title }}
              </h3>
              <p class="sm-body">{{ items[phase].text }}</p>

              <!-- Blueprint: what the blueprint covers, and a decision map -->
              <template v-if="phase === 'blueprint'">
                <div class="iph__block">
                  <h4 class="iph__label">{{ t.phases.lookAt }}</h4>
                  <ul class="iph__tags">
                    <li v-for="point in items.blueprint.points" :key="point">{{ point }}</li>
                  </ul>
                </div>
                <figure class="dmap" :aria-label="items.blueprint.map.label">
                  <figcaption class="iph__label">{{ items.blueprint.map.label }}</figcaption>
                  <div class="dmap__flow">
                    <span class="dmap__node dmap__node--start">{{
                      items.blueprint.map.trigger
                    }}</span>
                    <span class="dmap__line" aria-hidden="true" />
                    <span class="dmap__node dmap__node--check">{{
                      items.blueprint.map.check
                    }}</span>
                    <div class="dmap__branches">
                      <div class="dmap__branch dmap__branch--yes">
                        <span class="dmap__tag">{{ items.blueprint.map.yes }}</span>
                        <span class="dmap__node">{{ items.blueprint.map.yesResult }}</span>
                      </div>
                      <div class="dmap__branch dmap__branch--no">
                        <span class="dmap__tag">{{ items.blueprint.map.no }}</span>
                        <span class="dmap__node">{{ items.blueprint.map.noResult }}</span>
                      </div>
                    </div>
                  </div>
                  <p class="dmap__note">{{ items.blueprint.map.note }}</p>
                </figure>
              </template>

              <!-- Configure: the three groups every requirement falls into -->
              <template v-else-if="phase === 'configure'">
                <ul class="iph__split">
                  <li v-for="(group, g) in items.configure.split" :key="group.title">
                    <span class="sm-icon-tile sm-icon-tile--sm" aria-hidden="true"
                      ><component :is="splitIcons[g]" :size="17"
                    /></span>
                    <b>{{ group.title }}</b>
                    <span>{{ group.text }}</span>
                  </li>
                </ul>
                <p class="iph__scope">
                  <Info :size="16" aria-hidden="true" /> {{ items.configure.note }}
                </p>
                <a :href="lp(FEATURES_PATH)" class="sm-link"
                  >{{ items.configure.featuresLink }} <ArrowRight :size="16"
                /></a>
              </template>

              <!-- Integrate: potential areas, assessed per project -->
              <template v-else-if="phase === 'integrate'">
                <div class="iph__block">
                  <h4 class="iph__label">{{ items.integrate.areasLabel }}</h4>
                  <ul class="iph__tags">
                    <li v-for="area in items.integrate.areas" :key="area">{{ area }}</li>
                  </ul>
                  <p class="iph__scope">
                    <Info :size="16" aria-hidden="true" /> {{ items.integrate.areasNote }}
                  </p>
                  <a :href="lp(INTEGRATIONS_PATH)" class="sm-link" @click="exploreIntegrations"
                    >{{ items.integrate.pageLink }} <ArrowRight :size="16"
                  /></a>
                </div>
                <div class="iph__ask">
                  <div>
                    <b>{{ items.integrate.cta.title }}</b>
                    <span>{{ items.integrate.cta.text }}</span>
                  </div>
                  <MarketingWhatsappCta
                    context="integration_discovery"
                    :page="HOW_WE_DO_IT_TRACKING_PAGE"
                    section="phase_integrate"
                    variant="contextual"
                    appearance="light"
                    size="sm"
                    :label="items.integrate.cta.label"
                  />
                </div>
              </template>

              <!-- Migrate: the data commonly considered, and what decides the scope -->
              <template v-else-if="phase === 'migrate'">
                <div class="iph__block">
                  <h4 class="iph__label">{{ items.migrate.categoriesLabel }}</h4>
                  <ul class="iph__checks">
                    <li
                      v-for="category in items.migrate.categories"
                      :key="category"
                      class="sm-check"
                    >
                      <Check :size="17" aria-hidden="true" /> {{ category }}
                    </li>
                  </ul>
                </div>
                <p class="iph__scope">
                  <Info :size="16" aria-hidden="true" /> {{ items.migrate.scope }}
                </p>
              </template>

              <template v-else>
                <div class="iph__block">
                  <h4 class="iph__label">{{ t.phases.lookAt }}</h4>
                  <ul class="iph__checks">
                    <li v-for="point in pointsOf(phase)" :key="point" class="sm-check">
                      <Check :size="17" aria-hidden="true" /> {{ point }}
                    </li>
                  </ul>
                </div>
                <p v-if="scopeOf(phase)" class="iph__scope">
                  <Info :size="16" aria-hidden="true" /> {{ scopeOf(phase) }}
                </p>
              </template>

              <div class="iph__outcome">
                <span class="iph__outcome-label">{{ t.phases.outcome }}</span>
                <p>{{ items[phase].outcome }}</p>
              </div>
            </article>

            <MigrationReality v-if="phase === 'migrate'" />
            <CompensationValidation v-if="phase === 'test'" />
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped>
.iph__layout {
  display: grid;
  grid-template-columns: 232px minmax(0, 1fr);
  gap: clamp(32px, 4vw, 64px);
  align-items: start;
}

/* --- rail: the whole journey, following the phase being read --- */
.iph__rail {
  position: sticky;
  top: calc(var(--sm-header-h) + 32px);
}
.iph__rail-list {
  --progress: 0;
  position: relative;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.iph__rail-list::before,
.iph__rail-list::after {
  content: '';
  position: absolute;
  top: 22px;
  left: 21px;
  width: 2px;
  border-radius: 2px;
}
.iph__rail-list::before {
  bottom: 22px;
  background: var(--sm-border-2);
}
.iph__rail-list::after {
  height: calc((100% - 44px) * var(--progress));
  background: linear-gradient(180deg, var(--sm-primary), var(--sm-tech));
  transition: height 0.4s var(--sm-ease);
}
.iph__rail-link {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 44px;
  padding: 0 12px 0 8px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 500;
  color: var(--sm-muted);
  transition:
    background 0.2s,
    color 0.2s;
}
.iph__rail-link:hover {
  color: var(--sm-text);
  background: var(--sm-surface-hover);
}
.iph__rail-dot {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  flex: none;
  border-radius: 50%;
  border: 2px solid var(--sm-border-2);
  background: var(--sm-surface);
  font-size: 12px;
  font-weight: 700;
  color: var(--sm-muted);
  transition:
    background 0.2s,
    border-color 0.2s,
    color 0.2s;
}
.iph__rail-link.is-past .iph__rail-dot {
  border-color: var(--sm-primary);
  color: var(--sm-primary-ink);
}
.iph__rail-link[aria-current='step'] {
  background: var(--sm-surface);
  color: var(--sm-text);
  font-weight: 650;
  box-shadow: var(--sm-shadow-soft);
}
.iph__rail-link[aria-current='step'] .iph__rail-dot {
  border-color: var(--sm-primary);
  background: var(--sm-primary);
  color: #fff;
}

/* --- phases --- */
.iph__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.iph__phase {
  position: relative;
  scroll-margin-top: calc(var(--sm-header-h) + 24px);
}
.iph__node {
  display: none;
}
.iph__card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  padding: clamp(22px, 3vw, 36px);
  border-radius: var(--sm-r-card);
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
  transition:
    border-color 0.3s,
    box-shadow 0.3s;
}
.iph__phase.is-active .iph__card {
  border-color: var(--sm-primary-200);
  box-shadow: var(--sm-shadow-soft);
}
.iph__kicker {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--sm-primary-ink);
}
.iph__kicker-icon {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: var(--sm-primary-50);
}
.iph__title {
  font-family: var(--sm-display);
  font-size: clamp(23px, 2.3vw, 30px);
  font-weight: 700;
  line-height: 1.18;
  letter-spacing: -0.026em;
  text-wrap: balance;
}
.iph__block {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}
.iph__label {
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--sm-muted);
}
.iph__checks {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px 24px;
}
.iph__checks .sm-check {
  font-size: 15px;
}
.iph__tags {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.iph__tags li {
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid var(--sm-border);
  background: var(--sm-surface-subtle);
  font-size: 14px;
  font-weight: 500;
  color: var(--sm-text-2);
}
.iph__scope {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  padding: 12px 14px;
  border-radius: 12px;
  background: var(--sm-info-bg);
  font-size: 14.5px;
  line-height: 1.5;
  color: var(--sm-text-2);
}
.iph__scope svg {
  flex: none;
  margin-top: 2px;
  color: var(--sm-info);
}
.iph__outcome {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  padding-top: 16px;
  border-top: 1px solid var(--sm-border);
}
.iph__outcome-label {
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--sm-tech-ink);
}
.iph__outcome p {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  color: var(--sm-text);
}

/* configure */
.iph__split {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  width: 100%;
}
.iph__split li {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  border-radius: 16px;
  background: var(--sm-surface-subtle);
}
.iph__split b {
  font-size: 15px;
  font-weight: 650;
  color: var(--sm-text);
}
.iph__split li > span:last-child {
  font-size: 14px;
  line-height: 1.5;
  color: var(--sm-muted);
}

/* integrate */
.iph__ask {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px 20px;
  width: 100%;
  padding: 16px 18px;
  border-radius: 16px;
  border: 1px solid var(--sm-primary-200);
  background: var(--sm-primary-50);
}
.iph__ask > div {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.iph__ask b {
  font-size: 15.5px;
  font-weight: 650;
}
.iph__ask span {
  font-size: 14px;
  color: var(--sm-text-2);
}

/* blueprint: decision map */
.dmap {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  padding: 18px;
  border-radius: 18px;
  background: var(--sm-canvas);
}
.dmap__flow {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.dmap__node {
  display: inline-block;
  max-width: 320px;
  padding: 9px 14px;
  border-radius: 12px;
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
  box-shadow: var(--sm-shadow-soft);
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: var(--sm-text);
}
.dmap__node--start {
  border-color: var(--sm-primary);
  background: var(--sm-primary);
  color: #fff;
}
.dmap__node--check {
  border-style: dashed;
  border-color: var(--sm-primary-200);
}
.dmap__line {
  width: 2px;
  height: 18px;
  background: var(--sm-primary-200);
}
.dmap__branches {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  width: 100%;
  max-width: 520px;
  padding-top: 26px;
}
.dmap__branches::before {
  content: '';
  position: absolute;
  top: 0;
  left: 25%;
  right: 25%;
  height: 14px;
  border: 2px solid var(--sm-primary-200);
  border-bottom: 0;
  border-radius: 10px 10px 0 0;
}
.dmap__branch {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}
.dmap__tag {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.dmap__branch--yes .dmap__tag {
  color: var(--sm-ok);
}
.dmap__branch--no .dmap__tag {
  color: var(--sm-warn);
}
.dmap__note {
  font-size: 13px;
  color: var(--sm-muted);
  text-align: center;
}

@media (prefers-reduced-motion: reduce) {
  .iph__rail-list::after,
  .iph__card {
    transition: none;
  }
}

/* --- narrow screens: a vertical flow instead of the rail --- */
@media (max-width: 1023px) {
  .iph__layout {
    grid-template-columns: minmax(0, 1fr);
  }
  .iph__rail {
    display: none;
  }
  .iph__list {
    gap: 20px;
  }
  .iph__phase {
    padding-left: 52px;
  }
  .iph__phase::before {
    content: '';
    position: absolute;
    top: 44px;
    bottom: -20px;
    left: 18px;
    width: 2px;
    background: var(--sm-border-2);
  }
  .iph__phase:last-child::before {
    display: none;
  }
  .iph__node {
    position: absolute;
    top: 6px;
    left: 0;
    display: grid;
    place-items: center;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: 2px solid var(--sm-primary-200);
    background: var(--sm-surface);
    color: var(--sm-primary-ink);
  }
  .iph__phase.is-active .iph__node {
    border-color: var(--sm-primary);
    background: var(--sm-primary);
    color: #fff;
  }
  .iph__kicker-icon {
    display: none;
  }
}
@media (max-width: 720px) {
  .iph__checks,
  .iph__split {
    grid-template-columns: minmax(0, 1fr);
  }
}
@media (max-width: 480px) {
  .iph__phase {
    padding-left: 30px;
  }
  .iph__phase::before {
    top: 32px;
    left: 10px;
  }
  .iph__node {
    top: 8px;
    width: 22px;
    height: 22px;
    border-width: 2px;
  }
  .iph__node svg {
    width: 12px;
    height: 12px;
  }
  .dmap__branches {
    grid-template-columns: minmax(0, 1fr);
    padding-top: 12px;
  }
  .dmap__branches::before {
    display: none;
  }
}
</style>
