<script setup lang="ts">
/**
 * 12-point trend line for stat tiles: de-emphasised line, current value in
 * the accent.
 */
import { computed } from 'vue'

const props = withDefaults(defineProps<{ data: number[]; width?: number; height?: number }>(), {
  width: 72,
  height: 24,
})

const coords = computed(() => {
  const min = Math.min(...props.data)
  const range = Math.max(...props.data) - min || 1
  return props.data.map((value, i) => ({
    x: 2 + (i / (props.data.length - 1)) * (props.width - 4),
    y: 2 + (1 - (value - min) / range) * (props.height - 4),
  }))
})
const path = computed(() => 'M' + coords.value.map((p) => `${p.x},${p.y}`).join('L'))
const last = computed(() => coords.value[coords.value.length - 1])
</script>

<template>
  <svg :width="width" :height="height" :viewBox="`0 0 ${width} ${height}`" aria-hidden="true">
    <path
      :d="path"
      fill="none"
      class="spark__line"
      stroke-width="1.5"
      stroke-linejoin="round"
      stroke-linecap="round"
    />
    <circle :cx="last.x" :cy="last.y" r="2.5" class="spark__dot" />
  </svg>
</template>

<style scoped>
.spark__line {
  stroke: var(--sm-primary-200);
}
.spark__dot {
  fill: var(--sm-primary-ink);
}
</style>
