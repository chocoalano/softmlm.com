<script setup lang="ts">
/**
 * Single-series area chart for product mockups: 2px line, 10% wash, hairline
 * grid starting at zero, and a crosshair + tooltip on hover.
 */
import { computed, ref, useId } from 'vue'

const props = withDefaults(
  defineProps<{
    data: number[]
    labels: string[]
    format?: (value: number) => string
    height?: number
    axis?: boolean
    interactive?: boolean
    tone?: 'light' | 'dark'
  }>(),
  {
    format: (value: number) => value.toLocaleString('en-US'),
    height: 200,
    axis: true,
    interactive: true,
    tone: 'light',
  }
)

const W = 600
const gradientId = `sm-area-${useId()}`
const plot = ref<HTMLElement>()
const hover = ref<number | null>(null)

function niceCeil(value: number) {
  const power = 10 ** Math.floor(Math.log10(value))
  const n = value / power
  const step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10
  return step * power
}

const max = computed(() => niceCeil(Math.max(...props.data) * 1.06))
const points = computed(() =>
  props.data.map((value, i) => ({
    x: (i / (props.data.length - 1)) * W,
    y: props.height - (value / max.value) * props.height,
    value,
  }))
)
const line = computed(() => 'M' + points.value.map((p) => `${p.x},${p.y}`).join('L'))
const area = computed(() => `${line.value}L${W},${props.height}L0,${props.height}Z`)
const ticks = computed(() => [max.value, max.value / 2, 0])
const xStep = computed(() => Math.ceil(props.labels.length / 6))

/** Evenly spaced x labels, always ending on the latest point. */
function showLabel(i: number) {
  const last = props.labels.length - 1
  return i === last || (i % xStep.value === 0 && last - i >= xStep.value)
}

const active = computed(() => points.value[hover.value ?? points.value.length - 1])
const activeLeft = computed(() => (active.value.x / W) * 100)
const activeTop = computed(() => (active.value.y / props.height) * 100)

function onMove(event: PointerEvent) {
  if (!props.interactive || !plot.value) return
  const rect = plot.value.getBoundingClientRect()
  const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))
  hover.value = Math.round(ratio * (props.data.length - 1))
}
</script>

<template>
  <div class="ac" :class="`ac--${tone}`">
    <div
      ref="plot"
      class="ac__plot"
      :style="{ height: `${height}px` }"
      @pointermove="onMove"
      @pointerleave="hover = null"
    >
      <svg :viewBox="`0 0 ${W} ${height}`" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient :id="gradientId" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#005dfb" stop-opacity=".16" />
            <stop offset="1" stop-color="#005dfb" stop-opacity="0" />
          </linearGradient>
        </defs>
        <line
          v-for="tick in ticks"
          :key="tick"
          class="ac__grid"
          x1="0"
          :x2="W"
          :y1="height - (tick / max) * height"
          :y2="height - (tick / max) * height"
          vector-effect="non-scaling-stroke"
        />
        <path :d="area" :fill="`url(#${gradientId})`" />
        <path
          :d="line"
          class="ac__line"
          fill="none"
          vector-effect="non-scaling-stroke"
          stroke-linejoin="round"
          stroke-linecap="round"
        />
        <line
          v-if="hover !== null"
          class="ac__cross"
          :x1="active.x"
          :x2="active.x"
          y1="0"
          :y2="height"
          vector-effect="non-scaling-stroke"
        />
      </svg>

      <template v-if="axis">
        <span
          v-for="tick in ticks.slice(0, 2)"
          :key="tick"
          class="ac__tick"
          :style="{ top: `${100 - (tick / max) * 100}%` }"
        >
          {{ format(tick) }}
        </span>
      </template>

      <span class="ac__dot" :style="{ left: `${activeLeft}%`, top: `${activeTop}%` }" />

      <div
        v-if="hover !== null"
        class="ac__tip"
        :style="{ left: `${Math.min(86, Math.max(14, activeLeft))}%`, top: `${activeTop}%` }"
      >
        <span class="ac__tip-label">{{ labels[hover] }}</span>
        <span class="ac__tip-value">{{ format(active.value) }}</span>
      </div>
    </div>

    <div v-if="axis" class="ac__x" aria-hidden="true">
      <span
        v-for="(label, i) in labels"
        v-show="showLabel(i)"
        :key="label + i"
        :style="{ left: `${(i / (labels.length - 1)) * 100}%` }"
      >
        {{ label }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.ac {
  --ac-grid: var(--sm-border);
  --ac-text: var(--sm-muted);
  --ac-surface: var(--sm-surface);
  --ac-line: var(--sm-primary-ink);
  position: relative;
  width: 100%;
}
.ac--dark {
  --ac-grid: rgba(255, 255, 255, 0.08);
  --ac-text: rgba(255, 255, 255, 0.5);
  --ac-surface: #0a2350;
}
.ac__plot {
  position: relative;
  width: 100%;
  margin-top: 18px;
  touch-action: pan-y;
}
.ac__plot svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}
.ac__grid {
  stroke: var(--ac-grid);
  stroke-width: 1;
}
.ac__line {
  stroke: var(--ac-line);
  stroke-width: 2;
}
.ac--dark .ac__line {
  stroke: #5cb0ff;
}
.ac__cross {
  stroke: #a6ccff;
  stroke-width: 1;
}
.ac__tick {
  position: absolute;
  left: 0;
  transform: translateY(calc(-100% - 4px));
  font-size: 10.5px;
  color: var(--ac-text);
  font-variant-numeric: tabular-nums;
  pointer-events: none;
}
.ac__dot {
  position: absolute;
  width: 10px;
  height: 10px;
  margin: -5px 0 0 -5px;
  border-radius: 50%;
  background: #005dfb;
  box-shadow: 0 0 0 2px var(--ac-surface);
  pointer-events: none;
  transition:
    left 0.12s ease-out,
    top 0.12s ease-out;
}
.ac--dark .ac__dot {
  background: #06c8f5;
}
.ac__tip {
  position: absolute;
  z-index: 2;
  transform: translate(-50%, calc(-100% - 14px));
  display: flex;
  flex-direction: column;
  gap: 1px;
  padding: 7px 10px;
  border-radius: 9px;
  background: #041836;
  color: #fff;
  white-space: nowrap;
  pointer-events: none;
  box-shadow: 0 10px 24px -10px rgba(4, 24, 54, 0.5);
}
.ac__tip-label {
  font-size: 10.5px;
  color: rgba(255, 255, 255, 0.6);
}
.ac__tip-value {
  font-size: 12.5px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.ac__x {
  position: relative;
  height: 22px;
  margin-top: 8px;
}
.ac__x span {
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  font-size: 10.5px;
  color: var(--ac-text);
  white-space: nowrap;
}
.ac__x span:first-child {
  transform: none;
}
.ac__x span:last-child {
  transform: translateX(-100%);
}
</style>
