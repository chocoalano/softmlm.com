<script setup lang="ts">
/**
 * Small abstract illustration per role for the /who-we-serve cards. No
 * numbers or names: it hints at the topic, it is not a product screen.
 * SVG colours come from theme tokens (classes below), so it follows the
 * light and dark scheme.
 */
import { Check, UserRound } from 'lucide-vue-next'
import type { PersonaKey } from '@shared/personas'
import { useCopy } from '~/i18n'

defineProps<{ persona: PersonaKey }>()

const t = useCopy('personas')
</script>

<template>
  <div class="mini" :class="`mini--${persona}`" aria-hidden="true">
    <!-- Owners: a trend and its drivers -->
    <svg v-if="persona === 'executives'" viewBox="0 0 240 110" class="mini__svg">
      <defs>
        <linearGradient id="mini-exec" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" class="mini__stop" stop-opacity=".22" />
          <stop offset="1" class="mini__stop" stop-opacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M4 88 L40 76 L76 80 L112 58 L148 62 L184 38 L220 24 L236 18 L236 108 L4 108 Z"
        fill="url(#mini-exec)"
      />
      <path
        d="M4 88 L40 76 L76 80 L112 58 L148 62 L184 38 L220 24 L236 18"
        class="mini__line"
        fill="none"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle cx="236" cy="18" r="5" class="mini__dot" stroke-width="2" />
    </svg>

    <!-- Finance: an amount moving through its steps -->
    <div v-else-if="persona === 'finance'" class="mini__steps">
      <span class="mini__step is-done"><Check :size="12" /> {{ t.mini.calculated }}</span>
      <span class="mini__step is-done"><Check :size="12" /> {{ t.mini.approved }}</span>
      <span class="mini__step is-next">{{ t.mini.readyToPay }}</span>
    </div>

    <!-- Operations: one member, one status -->
    <div v-else-if="persona === 'operations'" class="mini__member">
      <span class="mini__avatar"><UserRound :size="18" /></span>
      <span class="mini__lines"><i /><i /></span>
      <span class="mini__pill">{{ t.mini.verified }}</span>
    </div>

    <!-- IT: systems connected to one core -->
    <svg v-else-if="persona === 'it'" viewBox="0 0 240 110" class="mini__svg">
      <g class="mini__links" stroke-width="2" stroke-dasharray="4 5">
        <line x1="120" y1="55" x2="36" y2="22" />
        <line x1="120" y1="55" x2="36" y2="88" />
        <line x1="120" y1="55" x2="204" y2="22" />
        <line x1="120" y1="55" x2="204" y2="88" />
      </g>
      <g class="mini__box" stroke-width="1.5">
        <rect x="12" y="10" width="48" height="24" rx="7" />
        <rect x="12" y="76" width="48" height="24" rx="7" />
        <rect x="180" y="10" width="48" height="24" rx="7" />
        <rect x="180" y="76" width="48" height="24" rx="7" />
      </g>
      <rect x="92" y="36" width="56" height="38" rx="11" class="mini__core" />
      <circle cx="120" cy="55" r="6" class="mini__tech" />
    </svg>

    <!-- Distributors: progress toward the next rank -->
    <div v-else class="mini__progress">
      <svg viewBox="0 0 80 80" class="mini__ring">
        <circle cx="40" cy="40" r="32" fill="none" class="mini__track" stroke-width="9" />
        <circle
          cx="40"
          cy="40"
          r="32"
          fill="none"
          class="mini__line"
          stroke-width="9"
          stroke-linecap="round"
          stroke-dasharray="171 201"
          transform="rotate(-90 40 40)"
        />
      </svg>
      <span class="mini__lines"><i /><i /></span>
    </div>
  </div>
</template>

<style scoped>
.mini {
  display: grid;
  place-items: center;
  height: 128px;
  padding: 14px;
  border-radius: 16px;
  background:
    radial-gradient(70% 80% at 100% 0%, rgba(2, 200, 250, 0.12), transparent 70%), var(--sm-canvas);
  overflow: hidden;
}
.mini__svg {
  width: 100%;
  max-width: 260px;
  height: 100%;
}
.mini__stop {
  stop-color: var(--sm-primary);
}
.mini__line {
  stroke: var(--sm-primary);
}
.mini__dot {
  fill: var(--sm-tech);
  stroke: var(--sm-surface);
}
.mini__links {
  stroke: var(--sm-primary-200);
}
.mini__box {
  fill: var(--sm-surface);
  stroke: var(--sm-border);
}
.mini__core {
  fill: var(--sm-primary);
}
.mini__tech {
  fill: var(--sm-tech);
}
.mini__track {
  stroke: var(--sm-primary-100);
}
.mini__steps {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px;
}
.mini__step {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  background: var(--sm-surface);
  color: var(--sm-muted);
  border: 1px solid var(--sm-border);
}
.mini__step.is-done {
  color: var(--sm-ok);
  background: var(--sm-ok-bg);
  border-color: transparent;
}
.mini__step.is-next {
  color: var(--sm-primary-ink);
  border-color: var(--sm-primary-200);
}
.mini__member {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 240px;
  padding: 14px;
  border-radius: 14px;
  background: var(--sm-surface);
  box-shadow: var(--sm-shadow-soft);
}
.mini__avatar {
  display: grid;
  place-items: center;
  flex: none;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  color: #fff;
  background: linear-gradient(135deg, var(--sm-primary), var(--sm-accent));
}
.mini__lines {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 7px;
}
.mini__lines i {
  display: block;
  height: 8px;
  border-radius: 999px;
  background: var(--sm-border);
}
.mini__lines i:last-child {
  width: 60%;
}
.mini__pill {
  flex: none;
  padding: 3px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  color: var(--sm-ok);
  background: var(--sm-ok-bg);
}
.mini__progress {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width: 220px;
}
.mini__ring {
  flex: none;
  width: 72px;
  height: 72px;
}
</style>
