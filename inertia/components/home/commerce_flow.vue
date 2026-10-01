<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import {
  BadgePercent,
  Coins,
  CreditCard,
  RotateCcw,
  ShoppingCart,
  Trophy,
  Wallet,
} from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import { prefersReducedMotion, useInView } from '~/composables/in_view'
import VisualNote from '~/components/site/visual_note.vue'
import { useCopy } from '~/i18n'

const t = useCopy('homePlatform')
const common = useCopy('common')

const stepIcons = [ShoppingCart, CreditCard, Coins, BadgePercent, Trophy, Wallet]
const steps = computed(() =>
  t.value.commerce.steps.map((step, i) => ({ ...step, icon: stepIcons[i] }))
)

const root = ref<HTMLElement>()
const inView = useInView(root)
const current = ref(0)
const paused = ref(false)
let timer: ReturnType<typeof setInterval> | undefined

function play() {
  clearInterval(timer)
  if (prefersReducedMotion()) return
  timer = setInterval(() => {
    if (!paused.value) current.value = (current.value + 1) % steps.value.length
  }, 1700)
}

watch(inView, (visible) => (visible ? play() : clearInterval(timer)))
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <section id="commerce" ref="root" class="sm-section sm-section--tint cf">
    <div class="sm-container">
      <div class="cf__head">
        <div class="cf__intro">
          <span v-reveal class="sm-eyebrow">{{ t.commerce.eyebrow }}</span>
          <h2 v-reveal="60" class="sm-h2">{{ t.commerce.title }}</h2>
          <p v-reveal="120" class="sm-lead">{{ t.commerce.lead }}</p>
        </div>
        <ul v-reveal="160" class="cf__caps" :aria-label="t.commerce.capabilitiesLabel">
          <li v-for="item in t.commerce.capabilities" :key="item" class="sm-chip">{{ item }}</li>
        </ul>
      </div>

      <ol
        v-reveal
        class="cf__flow"
        :aria-label="t.commerce.flowLabel"
        @mouseenter="paused = true"
        @mouseleave="paused = false"
      >
        <li
          v-for="(step, i) in steps"
          :key="i"
          class="cf__step"
          :class="{ 'is-active': current === i, 'is-done': i < current }"
          @mouseenter="current = i"
          @focusin="current = i"
        >
          <span class="cf__marker" aria-hidden="true">
            <component :is="step.icon" :size="20" />
          </span>
          <span class="cf__label">{{ String(i + 1).padStart(2, '0') }} · {{ step.label }}</span>
          <span class="cf__title">{{ step.title }}</span>
          <span class="cf__text">{{ step.text }}</span>
        </li>
      </ol>
      <VisualNote :label="common.visualNote.illustration" />

      <p v-reveal class="cf__note">
        <span class="sm-icon-tile sm-icon-tile--sm"
          ><RotateCcw :size="17" aria-hidden="true"
        /></span>
        <span>
          <b>{{ t.commerce.refundTitle }}</b> {{ t.commerce.refundText }}
        </span>
      </p>
    </div>
  </section>
</template>

<style scoped>
.cf__head {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: 32px 64px;
  align-items: end;
  margin-bottom: clamp(40px, 5vw, 64px);
}
.cf__intro {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.cf__caps {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.cf__flow {
  list-style: none;
  position: relative;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;
}
.cf__step {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 22px 20px 24px;
  border-radius: 20px;
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
  transition:
    border-color 0.3s var(--sm-ease),
    box-shadow 0.3s var(--sm-ease),
    transform 0.3s var(--sm-ease);
}
.cf__step:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 44px;
  right: -13px;
  width: 14px;
  height: 2px;
  background: var(--sm-border-2);
  transition: background 0.3s;
}
.cf__step.is-done:not(:last-child)::after,
.cf__step.is-active:not(:last-child)::after {
  background: var(--sm-primary);
}
.cf__step.is-active {
  border-color: var(--sm-primary-200);
  box-shadow: 0 18px 40px -22px rgba(0, 93, 251, 0.55);
  transform: translateY(-4px);
}
.cf__marker {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  margin-bottom: 10px;
  border-radius: 12px;
  background: var(--sm-surface-subtle);
  color: var(--sm-muted);
  transition:
    background 0.3s,
    color 0.3s;
}
.cf__step.is-done .cf__marker {
  background: var(--sm-primary-50);
  color: var(--sm-primary-ink);
}
.cf__step.is-active .cf__marker {
  background: var(--sm-primary);
  color: #fff;
}
.cf__label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--sm-subtle);
}
.cf__step.is-active .cf__label {
  color: var(--sm-primary-ink);
}
.cf__title {
  font-size: 15.5px;
  font-weight: 650;
  letter-spacing: -0.01em;
  line-height: 1.35;
}
.cf__text {
  font-size: 14px;
  line-height: 1.5;
  color: var(--sm-muted);
}
.cf__note {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 28px;
  font-size: 15.5px;
  color: var(--sm-text-2);
}
.cf__note b {
  color: var(--sm-text);
}

@media (max-width: 1180px) {
  .cf__flow {
    grid-template-columns: repeat(3, 1fr);
  }
  .cf__step:nth-child(3)::after {
    display: none;
  }
}
@media (max-width: 880px) {
  .cf__head {
    grid-template-columns: minmax(0, 1fr);
  }
}
@media (max-width: 620px) {
  .cf__flow {
    grid-template-columns: minmax(0, 1fr);
    gap: 10px;
  }
  .cf__step {
    display: grid;
    grid-template-columns: 44px 1fr;
    column-gap: 14px;
    row-gap: 2px;
    padding: 16px;
  }
  .cf__marker {
    grid-row: span 3;
    margin: 0;
  }
  .cf__step:not(:last-child)::after {
    display: block;
    top: auto;
    bottom: -11px;
    left: 37px;
    right: auto;
    width: 2px;
    height: 10px;
  }
  .cf__step.is-active {
    transform: none;
  }
  .cf__note {
    align-items: flex-start;
  }
}
</style>
