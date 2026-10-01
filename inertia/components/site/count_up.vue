<script setup lang="ts">
/**
 * Counts a number up from zero the first time it scrolls into view.
 */
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { prefersReducedMotion } from '~/composables/in_view'
import { useFormat } from '~/composables/format'

const props = withDefaults(
  defineProps<{
    to: number
    decimals?: number
    prefix?: string
    suffix?: string
    duration?: number
  }>(),
  { decimals: 0, prefix: '', suffix: '', duration: 1600 }
)

const el = ref<HTMLElement>()
const canAnimate = typeof IntersectionObserver !== 'undefined' && !prefersReducedMotion()
const current = ref(canAnimate ? 0 : props.to)

const { num } = useFormat()

/** Digits grouped the way the page language writes them (18,420 / 18.420). */
function format(value: number) {
  return num(value, props.decimals)
}

let observer: IntersectionObserver | undefined
let frame = 0

function run() {
  const start = performance.now()
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / props.duration)
    const eased = 1 - Math.pow(1 - t, 4)
    current.value = props.to * eased
    if (t < 1) frame = requestAnimationFrame(tick)
  }
  frame = requestAnimationFrame(tick)
}

onMounted(() => {
  if (!canAnimate || !el.value) return
  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return
      observer?.disconnect()
      run()
    },
    { threshold: 0.4 }
  )
  observer.observe(el.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  cancelAnimationFrame(frame)
})
</script>

<template>
  <span ref="el">{{ prefix }}{{ format(current) }}{{ suffix }}</span>
</template>
