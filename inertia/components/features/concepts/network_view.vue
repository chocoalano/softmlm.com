<script setup lang="ts">
/**
 * Network concept for /features/network-management: one branch drawn as a
 * clean cluster around its leader (not a pyramid), with the branch
 * figures and the signals that need attention. Sample data only.
 */
import { computed } from 'vue'
import { TriangleAlert } from 'lucide-vue-next'
import { useCopy } from '~/i18n'
import { useFormat } from '~/composables/format'

const t = useCopy('features')
const mock = computed(() => t.value.pages.network.concept.mock)
const { num, percent, rupiahShort } = useFormat()

type Status = 'active' | 'inactive' | 'new'
type Node = { x: number; y: number; r: number; status: Status; parent?: number }

/**
 * Deterministic layout: the leader in the middle, two legs as arcs, and
 * each leg's members fanning out behind it.
 */
const nodes = computed<Node[]>(() => {
  const list: Node[] = [{ x: 200, y: 150, r: 11, status: 'active' }]
  const legs = [
    { angle: Math.PI * 0.92, count: 7 },
    { angle: Math.PI * 0.08, count: 9 },
  ]
  const statuses: Status[] = [
    'active',
    'active',
    'new',
    'active',
    'inactive',
    'active',
    'new',
    'inactive',
    'active',
  ]
  legs.forEach((leg, l) => {
    const head =
      list.push({
        x: 200 + Math.cos(leg.angle) * 72,
        y: 150 - Math.sin(leg.angle) * 40 + 20,
        r: 8,
        status: 'active',
        parent: 0,
      }) - 1
    for (let i = 0; i < leg.count; i++) {
      const spread = (i / (leg.count - 1) - 0.5) * 1.5
      const angle = leg.angle + spread
      const radius = 132 + (i % 2) * 18
      list.push({
        x: 200 + Math.cos(angle) * radius,
        y: 150 + Math.sin(angle) * radius * 0.62,
        r: 5,
        status: statuses[(i + l * 3) % statuses.length],
        parent: head,
      })
    }
  })
  return list
})

const stats = computed(() => [
  { label: mock.value.members, value: num(1284) },
  { label: mock.value.active, value: percent(62.4) },
  { label: mock.value.newMembers, value: num(86) },
  { label: mock.value.volume, value: rupiahShort(412_600_000) },
])
</script>

<template>
  <div class="ui nv" role="img" :aria-label="mock.ariaLabel">
    <div class="nv__head">
      <div>
        <div class="ui-label">{{ mock.period }}</div>
        <div class="nv__title">{{ mock.title }}</div>
      </div>
      <span class="ui-badge ui-badge--plain">{{ mock.branch }}</span>
    </div>

    <div class="nv__body">
      <div class="nv__graph">
        <svg viewBox="40 80 320 170" aria-hidden="true">
          <line
            v-for="(node, i) in nodes.filter((n) => n.parent !== undefined)"
            :key="`e${i}`"
            :x1="nodes[node.parent!].x"
            :y1="nodes[node.parent!].y"
            :x2="node.x"
            :y2="node.y"
            class="nv__edge"
          />
          <circle
            v-for="(node, i) in nodes"
            :key="`n${i}`"
            :cx="node.x"
            :cy="node.y"
            :r="node.r"
            :class="[`nv__node--${node.status}`, { 'nv__node--leader': i === 0 }]"
          />
        </svg>
        <ul class="nv__legend">
          <li><i class="nv__dot nv__dot--active" /> {{ mock.legend[0] }}</li>
          <li><i class="nv__dot nv__dot--inactive" /> {{ mock.legend[1] }}</li>
          <li><i class="nv__dot nv__dot--new" /> {{ mock.legend[2] }}</li>
        </ul>
      </div>

      <div class="nv__side">
        <div class="nv__leader">
          <span class="ui-avatar">ML</span>
          <div>
            <div class="ui-label">{{ mock.leader }}</div>
            <div class="ui-title">Maya Lestari · Gold</div>
          </div>
        </div>
        <dl class="nv__stats">
          <div v-for="stat in stats" :key="stat.label">
            <dt>{{ stat.label }}</dt>
            <dd class="sm-num">{{ stat.value }}</dd>
          </div>
        </dl>
        <div class="nv__legs">
          <div class="ui-label">{{ mock.legs }}</div>
          <div class="nv__legs-bar"><span style="width: 44%" /><span style="width: 56%" /></div>
          <div class="nv__legs-labels">
            <span>{{ mock.left }} · {{ percent(44, 0) }}</span>
            <span>{{ mock.right }} · {{ percent(56, 0) }}</span>
          </div>
        </div>
        <div class="nv__signals">
          <div class="ui-title">{{ mock.signals }}</div>
          <ul>
            <li v-for="signal in mock.signalItems" :key="signal">
              <TriangleAlert :size="14" /> {{ signal }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nv {
  width: 100%;
  max-width: 1040px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: clamp(16px, 2.4vw, 28px);
  border-radius: var(--sm-r-shell);
  background: var(--sm-surface);
  border: 1px solid var(--sm-border);
  box-shadow: var(--sm-shadow-product);
}
.nv__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.nv__title {
  font-size: 18px;
  font-weight: 650;
  letter-spacing: -0.02em;
}
.nv__body {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
  gap: 16px;
}
.nv__graph {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  padding: 12px;
  border-radius: 16px;
  background: var(--sm-canvas);
}
.nv__graph svg {
  width: 100%;
  height: auto;
}
.nv__edge {
  stroke: var(--sm-primary-200);
  stroke-width: 1.2;
}
.nv__node--active {
  fill: var(--sm-primary);
}
.nv__node--inactive {
  fill: var(--sm-surface);
  stroke: var(--sm-border-2);
  stroke-width: 1.5;
}
.nv__node--new {
  fill: var(--sm-tech);
}
.nv__node--leader {
  stroke: var(--sm-surface);
  stroke-width: 3;
}
.nv__legend {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 6px 16px;
  font-size: 12px;
  color: var(--sm-muted);
}
.nv__legend li {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.nv__dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
}
.nv__dot--active {
  background: var(--sm-primary);
}
.nv__dot--inactive {
  background: var(--sm-surface);
  border: 1.5px solid var(--sm-border-2);
}
.nv__dot--new {
  background: var(--sm-tech);
}
.nv__side {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.nv__leader {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--sm-border);
}
.nv__stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.nv__stats div {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 12px;
  border-radius: 12px;
  background: var(--sm-surface-subtle);
}
.nv__stats dt {
  font-size: 11.5px;
  color: var(--sm-muted);
}
.nv__stats dd {
  font-size: 18px;
  font-weight: 650;
  letter-spacing: -0.02em;
}
.nv__legs {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.nv__legs-bar {
  display: flex;
  gap: 3px;
  height: 8px;
}
.nv__legs-bar span {
  border-radius: 999px;
  background: var(--sm-accent);
}
.nv__legs-bar span:last-child {
  background: var(--sm-primary);
}
.nv__legs-labels {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--sm-muted);
}
.nv__signals {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 14px;
  border-radius: 12px;
  background: var(--sm-warn-bg);
}
.nv__signals ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.nv__signals li {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  font-size: 12.5px;
  line-height: 1.45;
}
.nv__signals svg {
  flex: none;
  margin-top: 2px;
  color: var(--sm-warn);
}
@media (max-width: 860px) {
  .nv__body {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
