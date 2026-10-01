<script setup lang="ts">
/**
 * Renders a product mockup at its design width and scales it down to fit,
 * like a live screenshot. Below `minScale` the mock is cropped instead of
 * shrinking further, so text stays legible on phones.
 */
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = withDefaults(defineProps<{ width: number; height: number; minScale?: number }>(), {
  minScale: 0.5,
})

const wrap = ref<HTMLElement>()
const scale = ref(1)
const cropped = ref(false)
let observer: ResizeObserver | undefined

function measure() {
  if (!wrap.value) return
  const fit = wrap.value.clientWidth / props.width
  scale.value = Math.min(1, Math.max(props.minScale, fit))
  cropped.value = fit < props.minScale
}

onMounted(() => {
  measure()
  observer = new ResizeObserver(measure)
  if (wrap.value) observer.observe(wrap.value)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div
    ref="wrap"
    class="sf"
    :class="{ 'sf--cropped': cropped }"
    :style="{ height: `${height * scale}px` }"
  >
    <div
      class="sf__inner"
      :style="{ width: `${width}px`, height: `${height}px`, transform: `scale(${scale})` }"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.sf {
  position: relative;
  width: 100%;
}
.sf__inner {
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: top left;
}
.sf--cropped {
  overflow: hidden;
  border-radius: 20px;
  -webkit-mask-image: linear-gradient(90deg, #000 78%, transparent);
  mask-image: linear-gradient(90deg, #000 78%, transparent);
}
</style>
