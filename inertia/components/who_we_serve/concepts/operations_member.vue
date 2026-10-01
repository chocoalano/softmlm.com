<script setup lang="ts">
/**
 * Operations concept for /who-we-serve/operations: one member, with the
 * context support needs to answer a question. Sample data only.
 */
import { computed } from 'vue'
import { MapPin, MessageSquareText, PackageCheck, Trophy, UserRoundPen } from 'lucide-vue-next'
import { useCopy } from '~/i18n'

const t = useCopy('personas')
const copy = computed(() => t.value.concepts.operations)

const activityIcons = [PackageCheck, Trophy, UserRoundPen]
const activity = computed(() =>
  copy.value.activity.map((item, i) => ({ ...item, icon: activityIcons[i] }))
)
</script>

<template>
  <div class="ui om" :aria-label="copy.label" role="img">
    <div class="om__profile">
      <span class="ui-avatar om__avatar">AP</span>
      <div class="om__who">
        <div class="om__name">Ayu Pratiwi</div>
        <div class="ui-label">{{ copy.memberMeta }}</div>
        <div class="om__badges">
          <span class="ui-badge ui-badge--ok">{{ copy.badges.active }}</span>
          <span class="ui-badge ui-badge--ok">{{ copy.badges.verified }}</span>
          <span class="ui-badge ui-badge--plain">Gold</span>
        </div>
      </div>
    </div>

    <div class="om__grid">
      <div class="om__panel">
        <div class="ui-title">{{ copy.networkTitle }}</div>
        <dl class="om__dl">
          <div>
            <dt>{{ copy.sponsor }}</dt>
            <dd>Budi Santoso</dd>
          </div>
          <div>
            <dt>{{ copy.placement }}</dt>
            <dd>{{ copy.placementValue }}</dd>
          </div>
          <div>
            <dt>{{ copy.teamSize }}</dt>
            <dd>{{ copy.teamSizeValue }}</dd>
          </div>
          <div>
            <dt>{{ copy.region }}</dt>
            <dd><MapPin :size="12" /> Surabaya</dd>
          </div>
        </dl>
      </div>

      <div class="om__panel">
        <div class="ui-title">{{ copy.activityTitle }}</div>
        <ul class="om__feed">
          <li v-for="item in activity" :key="item.title">
            <span class="om__feed-icon"><component :is="item.icon" :size="14" /></span>
            <span class="om__feed-body">
              <b>{{ item.title }}</b>
              <span class="ui-label">{{ item.meta }}</span>
            </span>
            <span class="ui-label om__time">{{ item.time }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="om__note">
      <MessageSquareText :size="15" />
      <div>
        <div class="ui-title">{{ copy.noteTitle }}</div>
        <p>{{ copy.note }}</p>
        <div class="ui-label">{{ copy.noteMeta }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.om {
  width: 100%;
  max-width: 820px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: clamp(16px, 2.4vw, 28px);
  border-radius: var(--sm-r-shell);
  background: var(--sm-surface);
  border: 1px solid var(--sm-border);
  box-shadow: var(--sm-shadow-product);
}
.om__profile {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--sm-border);
}
.om__avatar {
  width: 52px;
  height: 52px;
  font-size: 15px;
}
.om__name {
  font-size: 18px;
  font-weight: 650;
  letter-spacing: -0.02em;
}
.om__badges {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
}
.om__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.3fr);
  gap: 12px;
}
.om__panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border-radius: 14px;
  border: 1px solid var(--sm-border);
}
.om__dl {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.om__dl div {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 12.5px;
}
.om__dl dt {
  color: var(--sm-muted);
}
.om__dl dd {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-weight: 600;
}
.om__feed {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.om__feed li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}
.om__feed-icon {
  display: grid;
  place-items: center;
  flex: none;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: var(--sm-primary-50);
  color: var(--sm-primary-ink);
}
.om__feed-body {
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
}
.om__feed-body b {
  font-size: 12.5px;
  font-weight: 600;
}
.om__time {
  flex: none;
  white-space: nowrap;
}
.om__note {
  display: flex;
  gap: 10px;
  padding: 14px 16px;
  border-radius: 14px;
  background: var(--sm-warn-bg);
}
.om__note > svg {
  flex: none;
  margin-top: 2px;
  color: var(--sm-warn);
}
.om__note p {
  margin: 2px 0 4px;
  font-size: 12.5px;
}
@media (max-width: 700px) {
  .om__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
@media (max-width: 420px) {
  .om__time {
    display: none;
  }
}
</style>
