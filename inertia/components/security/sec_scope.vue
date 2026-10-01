<script setup lang="ts">
/**
 * Shared responsibility: the six areas a deployment's security depends on,
 * each with who is responsible. Ownership, not blame.
 */
import { computed } from 'vue'
import { AppWindow, Cable, Server, UserCog, Users, Workflow } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import { useCopy } from '~/i18n'

const t = useCopy('security')
const icons = [AppWindow, Server, UserCog, Users, Cable, Workflow]
const items = computed(() => t.value.scope.items.map((item, i) => ({ ...item, icon: icons[i] })))
</script>

<template>
  <section class="sm-section sm-section--compact sscope" aria-labelledby="sscope-title">
    <div class="sm-container">
      <div class="sscope__head">
        <span v-reveal class="sm-eyebrow">{{ t.scope.eyebrow }}</span>
        <h2 id="sscope-title" v-reveal="60" class="sm-h2">{{ t.scope.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.scope.lead }}</p>
      </div>
      <ul class="sscope__grid">
        <li
          v-for="(item, i) in items"
          :key="item.title"
          v-reveal="(i % 3) * 60"
          class="sscope__card"
        >
          <span class="sm-icon-tile"><component :is="item.icon" :size="20" /></span>
          <h3 class="sm-h4">{{ item.title }}</h3>
          <p>{{ item.text }}</p>
          <p class="sscope__owner">
            <span>{{ t.scope.ownerLabel }}</span>
            {{ item.owner }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.sscope__head {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 760px;
  margin-bottom: clamp(32px, 4vw, 52px);
}
.sscope__grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}
.sscope__card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 24px;
  border-radius: var(--sm-r-card);
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
}
.sscope__card .sm-icon-tile {
  margin-bottom: 6px;
}
.sscope__card > p {
  font-size: 15px;
  line-height: 1.55;
  color: var(--sm-muted);
}
.sscope__card > p.sscope__owner {
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid var(--sm-border);
  font-size: 14px;
  color: var(--sm-text);
}
.sscope__owner span {
  display: block;
  margin-bottom: 2px;
  font-size: 11.5px;
  font-weight: 650;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--sm-primary-ink);
}
@media (max-width: 900px) {
  .sscope__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 560px) {
  .sscope__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
