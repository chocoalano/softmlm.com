<script setup lang="ts">
/**
 * Data protection, then the four principles financial workflows are
 * designed around. Principles for scoping, not a description of an
 * existing commission or payout engine (the note says so).
 */
import { computed } from 'vue'
import {
  Archive,
  CircleUserRound,
  FileDown,
  Layers,
  Scale,
  IdCard,
  UserCheck,
  Landmark,
  History,
  ListChecks,
} from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import { useCopy } from '~/i18n'

const t = useCopy('security')
const icons = [Layers, UserCheck, CircleUserRound, Archive, FileDown, IdCard]
const principleIcons = [Landmark, History, ListChecks, Scale]
const items = computed(() => t.value.data.items.map((item, i) => ({ ...item, icon: icons[i] })))
const principles = computed(() =>
  t.value.data.financial.principles.map((item, i) => ({ ...item, icon: principleIcons[i] }))
)
</script>

<template>
  <section class="sm-section sm-section--compact sdata" aria-labelledby="sdata-title">
    <div class="sm-container">
      <div class="sdata__head">
        <span v-reveal class="sm-eyebrow">{{ t.data.eyebrow }}</span>
        <h2 id="sdata-title" v-reveal="60" class="sm-h2">{{ t.data.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.data.lead }}</p>
      </div>
      <ul class="sdata__grid">
        <li
          v-for="(item, i) in items"
          :key="item.title"
          v-reveal="(i % 3) * 50"
          class="sdata__item"
        >
          <component :is="item.icon" :size="20" aria-hidden="true" />
          <b>{{ item.title }}</b>
          <span>{{ item.text }}</span>
        </li>
      </ul>

      <div v-reveal class="sdata__money">
        <div class="sdata__money-head">
          <h3 id="sdata-money-title" class="sm-h3">{{ t.data.financial.title }}</h3>
          <p>{{ t.data.financial.lead }}</p>
        </div>
        <ol class="sdata__principles">
          <li v-for="item in principles" :key="item.title">
            <span class="sdata__principle-icon"><component :is="item.icon" :size="18" /></span>
            <b>{{ item.title }}</b>
            <span>{{ item.text }}</span>
          </li>
        </ol>
        <p class="sdata__note">{{ t.data.financial.note }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sdata__head {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 760px;
  margin-bottom: clamp(28px, 4vw, 44px);
}
.sdata__grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}
.sdata__item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 20px;
  border-radius: var(--sm-r-card);
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
}
.sdata__item svg {
  margin-bottom: 6px;
  color: var(--sm-primary-ink);
}
.sdata__item b {
  font-size: 15.5px;
  font-weight: 650;
}
.sdata__item span {
  font-size: 14.5px;
  line-height: 1.5;
  color: var(--sm-muted);
}
.sdata__money {
  display: flex;
  flex-direction: column;
  gap: 22px;
  margin-top: clamp(28px, 4vw, 44px);
  padding: clamp(24px, 3.4vw, 40px);
  border-radius: var(--sm-r-shell);
  color: var(--sm-on-inverse);
  background:
    radial-gradient(60% 90% at 0% 0%, rgba(0, 93, 251, 0.4), transparent 60%),
    radial-gradient(40% 60% at 100% 100%, rgba(6, 200, 245, 0.12), transparent 70%),
    var(--sm-surface-inverse);
  border: 1px solid var(--sm-inverse-edge);
}
.sdata__money-head {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 720px;
}
.sdata__money-head p {
  font-size: 16px;
  line-height: 1.6;
  color: var(--sm-on-inverse-muted);
}
.sdata__principles {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}
.sdata__principles li {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 18px;
  border-radius: var(--sm-r-card);
  border: 1px solid var(--sm-inverse-edge);
  background: rgba(255, 255, 255, 0.04);
}
.sdata__principle-icon {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  margin-bottom: 6px;
  border-radius: 10px;
  color: var(--sm-tech);
  background: rgba(6, 200, 245, 0.1);
}
.sdata__principles b {
  font-size: 15.5px;
  font-weight: 650;
}
.sdata__principles li > span:last-child {
  font-size: 14.5px;
  line-height: 1.5;
  color: var(--sm-on-inverse-muted);
}
.sdata__note {
  font-size: 13.5px;
  color: var(--sm-on-inverse-muted);
}
@media (max-width: 1000px) {
  .sdata__grid,
  .sdata__principles {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 560px) {
  .sdata__grid,
  .sdata__principles {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
