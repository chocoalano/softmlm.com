<script setup lang="ts">
/**
 * Small, clean structure diagrams for each compensation pattern.
 * Decorative: the pattern name and description carry the meaning.
 */
defineProps<{
  type: 'binary' | 'unilevel' | 'matrix' | 'generation' | 'stairstep' | 'hybrid' | 'custom'
}>()
</script>

<template>
  <svg viewBox="0 0 160 96" class="pd" aria-hidden="true">
    <g v-if="type === 'binary'">
      <path
        d="M80 18 L44 50 M80 18 L116 50 M44 50 L26 80 M44 50 L62 80 M116 50 L98 80 M116 50 L134 80"
      />
      <circle cx="80" cy="18" r="8" class="pd__root" />
      <circle cx="44" cy="50" r="7" class="pd__left" />
      <circle cx="116" cy="50" r="7" class="pd__right" />
      <circle cx="26" cy="80" r="5" class="pd__left" />
      <circle cx="62" cy="80" r="5" class="pd__left" />
      <circle cx="98" cy="80" r="5" class="pd__right" />
      <circle cx="134" cy="80" r="5" class="pd__right" />
    </g>
    <g v-else-if="type === 'unilevel'">
      <path
        d="M80 18 L20 64 M80 18 L44 64 M80 18 L68 64 M80 18 L92 64 M80 18 L116 64 M80 18 L140 64"
      />
      <circle cx="80" cy="18" r="8" class="pd__root" />
      <circle v-for="x in [20, 44, 68, 92, 116, 140]" :key="x" :cx="x" cy="64" r="6" />
      <path d="M20 84 H140" class="pd__rule" />
    </g>
    <g v-else-if="type === 'matrix'">
      <path
        d="M80 16 L40 48 M80 16 L80 48 M80 16 L120 48 M40 48 L28 80 M40 48 L40 80 M40 48 L52 80 M80 48 L68 80 M80 48 L80 80 M80 48 L92 80 M120 48 L108 80 M120 48 L120 80 M120 48 L132 80"
      />
      <circle cx="80" cy="16" r="8" class="pd__root" />
      <circle v-for="x in [40, 80, 120]" :key="x" :cx="x" cy="48" r="6" />
      <circle
        v-for="x in [28, 40, 52, 68, 80, 92, 108, 120]"
        :key="`b${x}`"
        :cx="x"
        cy="80"
        r="4"
      />
      <circle cx="132" cy="80" r="4" class="pd__empty" />
    </g>
    <g v-else-if="type === 'generation'">
      <path d="M24 48 H136" />
      <circle cx="24" cy="48" r="8" class="pd__root" />
      <circle v-for="x in [46, 68, 112]" :key="x" :cx="x" cy="48" r="5" />
      <circle cx="90" cy="48" r="8" class="pd__right" />
      <circle cx="136" cy="48" r="8" class="pd__right" />
      <text x="90" y="76" class="pd__label">G1</text>
      <text x="136" y="76" class="pd__label">G2</text>
    </g>
    <g v-else-if="type === 'stairstep'">
      <path d="M20 84 H52 V64 H84 V44 H116 V24 H140" class="pd__step" />
      <circle cx="36" cy="84" r="5" />
      <circle cx="68" cy="64" r="5" />
      <circle cx="100" cy="44" r="5" />
      <circle cx="128" cy="24" r="7" class="pd__root" />
    </g>
    <g v-else-if="type === 'hybrid'">
      <path d="M52 20 L32 52 M52 20 L72 52 M108 20 L88 56 M108 20 L108 56 M108 20 L128 56" />
      <circle cx="52" cy="20" r="7" class="pd__root" />
      <circle cx="32" cy="52" r="6" class="pd__left" />
      <circle cx="72" cy="52" r="6" class="pd__right" />
      <circle cx="108" cy="20" r="7" class="pd__root" />
      <circle v-for="x in [88, 108, 128]" :key="x" :cx="x" cy="56" r="5" />
      <path d="M52 76 H108" class="pd__rule" />
      <text x="80" y="92" class="pd__label">+</text>
    </g>
    <g v-else>
      <rect x="24" y="22" width="34" height="22" rx="6" class="pd__block" />
      <rect x="64" y="22" width="34" height="22" rx="6" class="pd__block pd__block--alt" />
      <rect x="104" y="22" width="34" height="22" rx="6" class="pd__block" />
      <rect x="44" y="54" width="34" height="22" rx="6" class="pd__block pd__block--alt" />
      <rect x="84" y="54" width="34" height="22" rx="6" class="pd__block" />
    </g>
  </svg>
</template>

<style scoped>
/*
 * Theme-aware: every colour is a token. Nodes are opaque (mixed from the
 * surface) so the connecting lines never show through them in dark mode.
 */
.pd {
  width: 100%;
  height: auto;
  overflow: visible;
}
.pd path {
  fill: none;
  stroke: var(--sm-primary-200);
  stroke-width: 1.5;
  stroke-linecap: round;
}
.pd circle {
  fill: color-mix(in srgb, var(--sm-primary-ink) 20%, var(--sm-surface));
  stroke: var(--sm-surface);
  stroke-width: 2;
}
.pd .pd__root {
  fill: var(--sm-primary);
}
.pd .pd__left {
  fill: var(--sm-accent);
}
.pd .pd__right {
  fill: var(--sm-tech);
}
.pd .pd__empty {
  fill: var(--sm-surface);
  stroke: var(--sm-primary-200);
  stroke-dasharray: 2 2;
}
.pd .pd__rule {
  stroke-dasharray: 3 4;
}
.pd .pd__step {
  stroke: var(--sm-primary-200);
  stroke-width: 2;
}
.pd__label {
  font: 600 10px var(--sm-sans);
  fill: var(--sm-muted);
  text-anchor: middle;
}
.pd__block {
  fill: var(--sm-primary-50);
  stroke: var(--sm-primary-200);
  stroke-width: 1.5;
}
.pd__block--alt {
  fill: rgba(2, 200, 250, 0.18);
  stroke: rgba(2, 200, 250, 0.55);
}
</style>
