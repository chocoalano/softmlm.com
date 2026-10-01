<script setup lang="ts">
/**
 * The mlmsoft signature object: a slowly turning sphere of connected nodes
 * inside a glass orb, with mint "hub" nodes and data packets travelling
 * along the connections. Drawn on canvas; pauses off-screen and renders a
 * single still frame for visitors who prefer reduced motion.
 *
 * `tone="dark"` is for orbs placed on dark panels. A light-toned orb follows
 * the site theme: on a dark page it switches to the dark palette.
 */
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { prefersReducedMotion, useInView } from '~/composables/in_view'
import { useSiteTheme } from '~/composables/site_theme'

const props = withDefaults(defineProps<{ tone?: 'light' | 'dark'; nodes?: number }>(), {
  tone: 'light',
  nodes: 120,
})

type Node = { x: number; y: number; z: number; hub: boolean; phase: number }
type Packet = { edge: number; t: number; speed: number }

const { scheme } = useSiteTheme()
const tone = computed(() => (props.tone === 'dark' || scheme.value === 'dark' ? 'dark' : 'light'))

const root = ref<HTMLElement>()
const canvas = ref<HTMLCanvasElement>()
const inView = useInView(root, '120px')

let ctx: CanvasRenderingContext2D | null = null
let points: Node[] = []
let edges: [number, number][] = []
let packets: Packet[] = []
let frame = 0
let width = 0
let height = 0
let reduced = false
let resizeObserver: ResizeObserver | undefined

const palette = {
  light: {
    edge: '0, 93, 251',
    node: '0, 93, 251',
    ring: '0, 154, 249',
    packet: '2, 212, 252',
  },
  dark: {
    edge: '110, 180, 255',
    node: '214, 234, 255',
    ring: '0, 154, 249',
    packet: '2, 212, 252',
  },
}

function random(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function build() {
  const rand = random(7)
  const golden = Math.PI * (3 - Math.sqrt(5))
  points = Array.from({ length: props.nodes }, (_, i) => {
    const y = 1 - (i / (props.nodes - 1)) * 2
    const radius = Math.sqrt(1 - y * y)
    const theta = golden * i
    const r = 0.9 + rand() * 0.1
    return {
      x: Math.cos(theta) * radius * r,
      y: y * r,
      z: Math.sin(theta) * radius * r,
      hub: i % 11 === 5,
      phase: rand() * Math.PI * 2,
    }
  })

  const seen = new Set<string>()
  edges = []
  points.forEach((a, i) => {
    points
      .map((b, j) => ({ j, d: (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2 }))
      .filter(({ j }) => j !== i)
      .sort((p, q) => p.d - q.d)
      .slice(0, 3)
      .forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`
        if (seen.has(key)) return
        seen.add(key)
        edges.push([i, j])
      })
  })

  packets = Array.from({ length: 14 }, () => ({
    edge: Math.floor(rand() * edges.length),
    t: rand(),
    speed: 0.004 + rand() * 0.008,
  }))
}

function resize() {
  if (!canvas.value || !root.value) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  width = root.value.clientWidth
  height = root.value.clientHeight
  canvas.value.width = Math.round(width * dpr)
  canvas.value.height = Math.round(height * dpr)
  ctx = canvas.value.getContext('2d')
  ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)
  if (reduced || !inView.value) draw(0)
}

function draw(time: number) {
  if (!ctx || !width) return
  const c = palette[tone.value]
  const cx = width / 2
  const cy = height / 2
  const R = Math.min(width, height) * 0.36
  const rotY = reduced ? 0.7 : time * 0.00011
  const rotX = -0.42
  const [sinY, cosY, sinX, cosX] = [Math.sin(rotY), Math.cos(rotY), Math.sin(rotX), Math.cos(rotX)]

  ctx.clearRect(0, 0, width, height)

  // orbit rings
  ctx.lineWidth = 1
  for (const [rx, ry, rot, alpha] of [
    [1.32, 0.36, -0.32, 0.34],
    [1.18, 0.5, 0.52, 0.2],
  ]) {
    ctx.beginPath()
    ctx.ellipse(cx, cy, R * rx, R * ry, rot, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(${c.ring}, ${alpha})`
    ctx.stroke()
  }

  const projected = points.map((n) => {
    const x1 = n.x * cosY - n.z * sinY
    const z1 = n.x * sinY + n.z * cosY
    const y2 = n.y * cosX - z1 * sinX
    const z2 = n.y * sinX + z1 * cosX
    const scale = 3.2 / (3.2 - z2)
    return { sx: cx + x1 * R * scale, sy: cy + y2 * R * scale, depth: (z2 + 1) / 2, scale, n }
  })

  // connections
  for (const [a, b] of edges) {
    const p = projected[a]
    const q = projected[b]
    const depth = (p.depth + q.depth) / 2
    ctx.beginPath()
    ctx.moveTo(p.sx, p.sy)
    ctx.lineTo(q.sx, q.sy)
    ctx.strokeStyle = `rgba(${c.edge}, ${0.05 + depth * 0.3})`
    ctx.lineWidth = 0.6 + depth * 0.6
    ctx.stroke()
  }

  // packets travelling along connections
  for (const packet of packets) {
    if (!reduced) {
      packet.t += packet.speed
      if (packet.t >= 1) {
        packet.t = 0
        packet.edge = (packet.edge * 7 + 13) % edges.length
      }
    }
    const [a, b] = edges[packet.edge]
    const p = projected[a]
    const q = projected[b]
    const depth = p.depth + (q.depth - p.depth) * packet.t
    const x = p.sx + (q.sx - p.sx) * packet.t
    const y = p.sy + (q.sy - p.sy) * packet.t
    ctx.beginPath()
    ctx.arc(x, y, 1.6 + depth * 1.4, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${c.packet}, ${0.35 + depth * 0.65})`
    ctx.fill()
  }

  // nodes, back to front
  projected.sort((p, q) => p.depth - q.depth)
  for (const p of projected) {
    const base = p.n.hub ? 3.4 : 1.7
    const r = base * p.scale * (0.75 + p.depth * 0.45)
    if (p.n.hub) {
      const pulse = reduced ? 0.5 : (Math.sin(time * 0.0025 + p.n.phase) + 1) / 2
      ctx.beginPath()
      ctx.arc(p.sx, p.sy, r + 3 + pulse * 6, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${c.packet}, ${(0.1 + p.depth * 0.14) * (1 - pulse * 0.6)})`
      ctx.fill()
      ctx.beginPath()
      ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${c.packet}, ${0.55 + p.depth * 0.45})`
      ctx.fill()
    } else {
      ctx.beginPath()
      ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${c.node}, ${0.22 + p.depth * 0.7})`
      ctx.fill()
    }
  }
}

function loop(time: number) {
  draw(time)
  frame = requestAnimationFrame(loop)
}

function start() {
  if (reduced || frame) return
  frame = requestAnimationFrame(loop)
}

function stop() {
  cancelAnimationFrame(frame)
  frame = 0
}

onMounted(() => {
  reduced = prefersReducedMotion()
  build()
  resize()
  resizeObserver = new ResizeObserver(resize)
  if (root.value) resizeObserver.observe(root.value)
})

watch(inView, (visible) => (visible ? start() : stop()))
watch(tone, () => {
  if (reduced || !inView.value) draw(0)
})

onBeforeUnmount(() => {
  stop()
  resizeObserver?.disconnect()
})
</script>

<template>
  <div ref="root" class="orb" :class="`orb--${tone}`" aria-hidden="true">
    <div class="orb__glow" />
    <div class="orb__glass" />
    <canvas ref="canvas" class="orb__canvas" />
  </div>
</template>

<style scoped>
.orb {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  pointer-events: none;
}
.orb__glow {
  position: absolute;
  inset: 12%;
  border-radius: 50%;
  background:
    radial-gradient(circle at 70% 70%, rgba(2, 200, 250, 0.35), transparent 55%),
    radial-gradient(circle at 35% 35%, rgba(0, 93, 251, 0.45), transparent 60%);
  filter: blur(48px);
  opacity: 0.55;
}
.orb--dark .orb__glow {
  opacity: 0.9;
}
.orb__glass {
  position: absolute;
  inset: 16%;
  border-radius: 50%;
  background:
    radial-gradient(circle at 32% 26%, rgba(255, 255, 255, 0.95) 0 5%, transparent 22%),
    radial-gradient(
      circle at 50% 50%,
      rgba(235, 244, 255, 0.1) 0 45%,
      rgba(166, 210, 255, 0.34) 64%,
      rgba(0, 154, 249, 0.4) 70.5%,
      transparent 71%
    );
  box-shadow:
    inset -18px -24px 60px rgba(0, 93, 251, 0.16),
    inset 12px 16px 40px rgba(255, 255, 255, 0.7);
}
.orb--dark .orb__glass {
  background:
    radial-gradient(circle at 32% 26%, rgba(255, 255, 255, 0.35) 0 4%, transparent 20%),
    radial-gradient(
      circle at 50% 50%,
      rgba(0, 93, 251, 0.06) 0 45%,
      rgba(0, 154, 249, 0.16) 64%,
      rgba(0, 154, 249, 0.3) 70.5%,
      transparent 71%
    );
  box-shadow:
    inset -18px -24px 60px rgba(2, 200, 250, 0.08),
    inset 12px 16px 40px rgba(255, 255, 255, 0.06);
}
.orb__canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
</style>
