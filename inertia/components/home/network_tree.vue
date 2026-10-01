<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref } from 'vue'
import { Maximize2, Search, UserRound, ZoomIn, ZoomOut } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import { network, type NetworkMember, type Rank } from '~/content/network'
import NetworkNode from '~/components/home/network_node.vue'
import VisualNote from '~/components/site/visual_note.vue'
import { useCopy } from '~/i18n'

const t = useCopy('homePlatform')

/** Rank names are the same in every language; `null` shows every rank. */
const ranks: Rank[] = ['Diamond', 'Platinum', 'Gold', 'Silver']
const rankFilters = computed(() => [
  { value: null, label: t.value.network.allRanks },
  ...ranks.map((value) => ({ value, label: value })),
])

const query = ref('')
const rank = ref<Rank | null>(null)
const activeOnly = ref(false)
const zoom = ref(1)
const expanded = reactive(new Set<string>([network.id, 'SM-240118']))
const selectedId = ref('SM-240118')
const canvas = ref<HTMLElement>()

const all: { member: NetworkMember; sponsor?: NetworkMember }[] = []
;(function walk(member: NetworkMember, sponsor?: NetworkMember) {
  all.push({ member, sponsor })
  member.children?.forEach((child) => walk(child, member))
})(network)

const selected = computed(() => all.find((entry) => entry.member.id === selectedId.value)!)

const joined = computed(() => {
  const [year, month] = selected.value.member.joined.split('-')
  return `${t.value.network.months[Number(month) - 1]} ${year}`
})
const needle = computed(() => query.value.trim().toLowerCase())

function matched(member: NetworkMember) {
  return needle.value.length > 1 && member.name.toLowerCase().includes(needle.value)
}

function dimmed(member: NetworkMember) {
  if (needle.value.length > 1 && !matched(member)) return true
  if (rank.value && member.rank !== rank.value) return true
  if (activeOnly.value && !member.active) return true
  return false
}

const matchCount = computed(() => all.filter(({ member }) => matched(member)).length)

function onSearch() {
  if (needle.value.length < 2) return
  for (const { member, sponsor } of all) {
    if (!matched(member)) continue
    let parent = sponsor
    while (parent) {
      expanded.add(parent.id)
      parent = all.find((entry) => entry.member.id === parent!.id)?.sponsor
    }
  }
  const first = all.find(({ member }) => matched(member))
  if (first) selectedId.value = first.member.id
}

function toggle(id: string) {
  if (expanded.has(id)) expanded.delete(id)
  else expanded.add(id)
}

function setZoom(value: number) {
  zoom.value = Math.min(1.2, Math.max(0.6, Math.round(value * 10) / 10))
}

function center() {
  if (!canvas.value) return
  canvas.value.scrollLeft = (canvas.value.scrollWidth - canvas.value.clientWidth) / 2
}

/**
 * Zoom out just enough for the expanded tree to fit the canvas width,
 * down to 60%; below that the canvas scrolls instead.
 */
async function fit() {
  zoom.value = 1
  await nextTick()
  if (!canvas.value) return
  const fitted = canvas.value.clientWidth / canvas.value.scrollWidth
  zoom.value = Math.max(0.6, Math.min(1, Math.floor(fitted * 20) / 20))
  await nextTick()
  center()
}

// drag to pan
let drag: { x: number; y: number; left: number; top: number } | null = null
function onPointerDown(event: PointerEvent) {
  if (
    !canvas.value ||
    event.pointerType !== 'mouse' ||
    (event.target as HTMLElement).closest('button')
  )
    return
  drag = {
    x: event.clientX,
    y: event.clientY,
    left: canvas.value.scrollLeft,
    top: canvas.value.scrollTop,
  }
  canvas.value.setPointerCapture(event.pointerId)
}
function onPointerMove(event: PointerEvent) {
  if (!drag || !canvas.value) return
  canvas.value.scrollLeft = drag.left - (event.clientX - drag.x)
  canvas.value.scrollTop = drag.top - (event.clientY - drag.y)
}
function onPointerUp() {
  drag = null
}

onMounted(fit)
</script>

<template>
  <section id="network" class="sm-section nt">
    <div class="sm-container">
      <div class="sm-heading sm-heading--center">
        <span v-reveal class="sm-eyebrow">{{ t.network.eyebrow }}</span>
        <h2 v-reveal="60" class="sm-h2">{{ t.network.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.network.lead }}</p>
      </div>
      <div v-reveal class="ui nt__shell">
        <div class="nt__toolbar">
          <label class="nt__search">
            <Search :size="15" aria-hidden="true" />
            <input
              v-model="query"
              type="search"
              :placeholder="t.network.searchPlaceholder"
              :aria-label="t.network.searchLabel"
              @input="onSearch"
            />
            <span v-if="needle.length > 1" class="nt__count" aria-live="polite">{{
              t.network.found(matchCount)
            }}</span>
          </label>
          <div class="nt__filters" role="group" :aria-label="t.network.rankFilterLabel">
            <button
              v-for="item in rankFilters"
              :key="item.value ?? 'all'"
              type="button"
              class="nt__chip"
              :aria-pressed="rank === item.value"
              @click="rank = item.value"
            >
              {{ item.label }}
            </button>
          </div>
          <label class="nt__switch">
            <input v-model="activeOnly" type="checkbox" />
            <span class="nt__switch-ui" aria-hidden="true" />
            {{ t.network.activeOnly }}
          </label>
          <div class="nt__zoom" role="group" :aria-label="t.network.zoomLabel">
            <button type="button" :aria-label="t.network.zoomOut" @click="setZoom(zoom - 0.1)">
              <ZoomOut :size="16" aria-hidden="true" />
            </button>
            <span class="sm-num">{{ Math.round(zoom * 100) }}%</span>
            <button type="button" :aria-label="t.network.zoomIn" @click="setZoom(zoom + 0.1)">
              <ZoomIn :size="16" aria-hidden="true" />
            </button>
            <button type="button" :aria-label="t.network.fit" @click="fit">
              <Maximize2 :size="15" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div class="nt__body">
          <div
            ref="canvas"
            class="nt__canvas"
            @pointerdown="onPointerDown"
            @pointermove="onPointerMove"
            @pointerup="onPointerUp"
            @pointercancel="onPointerUp"
          >
            <ul class="nt-tree" :style="{ zoom }" :aria-label="t.network.treeLabel">
              <NetworkNode
                :member="network"
                :expanded="expanded"
                :selected-id="selectedId"
                :dimmed="dimmed"
                :matched="matched"
                @toggle="toggle"
                @select="(id: string) => (selectedId = id)"
              />
            </ul>
          </div>

          <aside class="nt__detail" aria-live="polite">
            <div class="nt__detail-head">
              <span class="ui-avatar nt__detail-avatar"><UserRound :size="20" /></span>
              <div>
                <div class="nt__detail-name">{{ selected.member.name }}</div>
                <div class="ui-label">{{ selected.member.id }} · {{ selected.member.city }}</div>
              </div>
            </div>
            <div class="nt__detail-badges">
              <span class="ui-badge ui-badge--info ui-badge--plain">{{
                selected.member.rank
              }}</span>
              <span
                class="ui-badge"
                :class="selected.member.active ? 'ui-badge--ok' : 'ui-badge--warn'"
              >
                {{ selected.member.active ? t.network.active : t.network.inactive }}
              </span>
            </div>
            <dl class="nt__stats">
              <div>
                <dt>{{ t.network.groupSales }}</dt>
                <dd>{{ selected.member.groupSales }}</dd>
              </div>
              <div>
                <dt>{{ t.network.detail.personalAp }}</dt>
                <dd>{{ selected.member.personalAp }}</dd>
              </div>
              <div>
                <dt>{{ t.network.detail.commission }}</dt>
                <dd>{{ selected.member.commission }}</dd>
              </div>
              <div>
                <dt>{{ t.network.detail.downline }}</dt>
                <dd>{{ t.network.detail.downlineCount(selected.member.members) }}</dd>
              </div>
            </dl>
            <dl class="nt__meta">
              <div>
                <dt>{{ t.network.detail.sponsor }}</dt>
                <dd>{{ selected.sponsor?.name ?? t.network.detail.company }}</dd>
              </div>
              <div>
                <dt>{{ t.network.detail.joined }}</dt>
                <dd>{{ joined }}</dd>
              </div>
            </dl>
            <span class="ui-btn ui-btn--light nt__open">{{ t.network.detail.openProfile }}</span>
          </aside>
        </div>
      </div>
      <VisualNote />
    </div>
  </section>
</template>

<style scoped>
.nt__shell {
  border-radius: var(--sm-r-shell);
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
  box-shadow: var(--sm-shadow-product);
  overflow: hidden;
}
.nt__toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 16px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--sm-border);
}
.nt__search {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1 1 260px;
  max-width: 340px;
  height: 40px;
  padding: 0 12px;
  border-radius: 10px;
  border: 1px solid var(--sm-border-2);
  color: var(--sm-muted);
}
.nt__search:focus-within {
  border-color: var(--sm-primary-ink);
  box-shadow: 0 0 0 3px var(--sm-primary-50);
}
.nt__search input {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  font: inherit;
  font-size: 14px;
  color: var(--sm-text);
}
.nt__count {
  font-size: 12px;
  font-weight: 600;
  color: var(--sm-primary-ink);
  white-space: nowrap;
}
.nt__filters {
  display: flex;
  gap: 4px;
  padding: 3px;
  border-radius: 10px;
  background: var(--sm-surface-hover);
}
.nt__chip {
  height: 32px;
  padding: 0 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  color: var(--sm-muted);
}
.nt__chip[aria-pressed='true'] {
  background: var(--sm-surface);
  color: var(--sm-text);
  box-shadow: 0 1px 2px rgba(4, 24, 54, 0.12);
}
.nt__switch {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  font-weight: 500;
  color: var(--sm-text-2);
  cursor: pointer;
}
.nt__switch input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}
.nt__switch-ui {
  position: relative;
  width: 34px;
  height: 20px;
  border-radius: 999px;
  background: var(--sm-border-2);
  transition: background 0.15s;
}
.nt__switch-ui::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  transition: left 0.15s var(--sm-ease);
}
.nt__switch input:checked + .nt__switch-ui {
  background: var(--sm-primary);
}
.nt__switch input:checked + .nt__switch-ui::after {
  left: 16px;
}
.nt__switch input:focus-visible + .nt__switch-ui {
  box-shadow: 0 0 0 3px var(--sm-primary-100);
}
.nt__zoom {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-left: auto;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--sm-muted);
}
.nt__zoom span {
  min-width: 44px;
  text-align: center;
}
.nt__zoom button {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 9px;
  color: var(--sm-text-2);
}
.nt__zoom button:hover {
  background: var(--sm-surface-hover);
}
.nt__body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
}
.nt__canvas {
  position: relative;
  height: 560px;
  overflow: auto;
  cursor: grab;
  background-color: var(--sm-surface-subtle);
  background-image: radial-gradient(rgba(0, 93, 251, 0.12) 1px, transparent 1px);
  background-size: 20px 20px;
  touch-action: pan-x pan-y;
}
.nt__canvas:active {
  cursor: grabbing;
}
.nt__detail {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  border-left: 1px solid var(--sm-border);
}
.nt__detail-head {
  display: flex;
  align-items: center;
  gap: 12px;
}
.nt__detail-avatar {
  width: 44px;
  height: 44px;
}
.nt__detail-name {
  font-size: 17px;
  font-weight: 650;
  letter-spacing: -0.02em;
}
.nt__detail-badges {
  display: flex;
  gap: 6px;
}
.nt__stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.nt__stats div {
  padding: 12px;
  border-radius: 12px;
  background: var(--sm-surface-subtle);
}
.nt__stats dt,
.nt__meta dt {
  font-size: 11.5px;
  color: var(--sm-muted);
}
.nt__stats dd {
  margin-top: 2px;
  font-size: 15px;
  font-weight: 650;
  letter-spacing: -0.01em;
  font-variant-numeric: tabular-nums;
}
.nt__meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 14px;
  border-top: 1px solid var(--sm-border);
}
.nt__meta div {
  display: flex;
  justify-content: space-between;
}
.nt__meta dd {
  font-size: 13px;
  font-weight: 600;
}
.nt__open {
  margin-top: auto;
}

@media (max-width: 1080px) {
  .nt__body {
    grid-template-columns: minmax(0, 1fr);
  }
  .nt__detail {
    border-left: 0;
    border-top: 1px solid var(--sm-border);
  }
  .nt__zoom {
    margin-left: 0;
  }
}
@media (max-width: 620px) {
  .nt__toolbar {
    padding: 14px;
  }
  .nt__search {
    max-width: none;
    flex-basis: 100%;
  }
  .nt__filters {
    overflow-x: auto;
    max-width: 100%;
  }
  .nt__canvas {
    height: 460px;
  }
  .nt__shell {
    border-radius: var(--sm-r-card);
  }
}
</style>

<style>
/* Tree connectors and nodes (shared by the recursive NetworkNode). */
.nt-tree,
.nt-tree ul {
  list-style: none;
  display: flex;
  justify-content: center;
  position: relative;
}
.nt-tree {
  width: max-content;
  min-width: 100%;
  padding: 40px 40px 56px;
}
.nt-tree ul {
  padding-top: 26px;
}
.nt-tree li {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 26px 10px 0;
}
.nt-tree > li {
  padding-top: 0;
}
.nt-tree li::before,
.nt-tree li::after {
  content: '';
  position: absolute;
  top: 0;
  right: 50%;
  width: 50%;
  height: 26px;
  border-top: 1.5px solid var(--sm-primary-200);
}
.nt-tree li::after {
  right: auto;
  left: 50%;
  border-left: 1.5px solid var(--sm-primary-200);
}
.nt-tree > li::before,
.nt-tree > li::after,
.nt-tree li:only-child::before {
  display: none;
}
.nt-tree li:only-child::after {
  border-top: 0;
}
.nt-tree li:first-child::before,
.nt-tree li:last-child::after {
  border: 0 none;
}
.nt-tree li:last-child::before {
  border-right: 1.5px solid var(--sm-primary-200);
  border-radius: 0 10px 0 0;
}
.nt-tree li:first-child::after {
  border-radius: 10px 0 0 0;
}
.nt-tree ul::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  height: 26px;
  border-left: 1.5px solid var(--sm-primary-200);
}

.nn {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: opacity 0.25s var(--sm-ease);
}
.nn--dim {
  opacity: 0.32;
}
.nn__card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 212px;
  padding: 14px;
  border-radius: 16px;
  background: var(--sm-surface);
  border: 1px solid var(--sm-border);
  box-shadow: 0 1px 2px rgba(4, 24, 54, 0.05);
  text-align: left;
  cursor: pointer;
  transition:
    border-color 0.18s,
    box-shadow 0.18s,
    transform 0.18s var(--sm-ease);
}
.nn__card:hover {
  border-color: var(--sm-primary-200);
  transform: translateY(-2px);
}
.nn--selected .nn__card {
  border-color: var(--sm-primary-ink);
  box-shadow: 0 0 0 4px var(--sm-primary-50);
}
.nn--match .nn__card {
  border-color: var(--sm-tech-ink);
  box-shadow: 0 0 0 4px rgba(2, 200, 250, 0.25);
}
.nn__head {
  display: flex;
  align-items: center;
  gap: 10px;
}
.nn__avatar--diamond {
  background: linear-gradient(135deg, #041836, #005dfb);
}
.nn__avatar--platinum {
  background: linear-gradient(135deg, #005dfb, #009af9);
}
.nn__avatar--gold {
  background: linear-gradient(135deg, #c98a14, #e9b949);
}
.nn__avatar--silver {
  background: linear-gradient(135deg, #7c8494, #aab1bd);
}
.nn__who {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.nn__name {
  font-size: 13.5px;
  font-weight: 650;
  letter-spacing: -0.01em;
  white-space: nowrap;
}
.nn__rank {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11.5px;
  color: var(--sm-muted);
}
.nn__status {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--sm-subtle);
}
.nn__status.is-active {
  background: var(--sm-ok);
}
.nn__metrics {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  padding-top: 10px;
  border-top: 1px solid var(--sm-border);
  font-size: 13px;
  font-weight: 650;
  font-variant-numeric: tabular-nums;
}
.nn__metrics small {
  display: block;
  font-size: 10.5px;
  font-weight: 500;
  color: var(--sm-muted);
}
.nn__toggle {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  margin-top: -12px;
  border-radius: 50%;
  background: var(--sm-surface);
  border: 1.5px solid var(--sm-primary-200);
  color: var(--sm-primary-ink);
}
.nn__toggle::after {
  content: '';
  position: absolute;
  inset: -10px;
}
.nn__toggle:hover {
  background: var(--sm-primary-50);
}
.nn + ul {
  margin-top: -12px;
}
.nn__more {
  display: inline-flex;
  align-items: center;
  height: 36px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1.5px dashed var(--sm-primary-200);
  background: var(--sm-surface);
  font-size: 12px;
  font-weight: 600;
  color: var(--sm-muted);
  white-space: nowrap;
}
</style>
