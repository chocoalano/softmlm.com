<script setup lang="ts">
import { Building2, Check } from 'lucide-vue-next'
import markUrl from '~/assets/brand/mlmsofts-mark.png'
import { vReveal } from '~/composables/reveal'
import { useCopy } from '~/i18n'

const t = useCopy('implementation')
</script>

<template>
  <section class="sm-section sm-section--compact irs" aria-labelledby="irs-title">
    <div class="sm-container">
      <div class="sm-heading sm-heading--center">
        <span v-reveal class="sm-eyebrow">{{ t.responsibilities.eyebrow }}</span>
        <h2 id="irs-title" v-reveal="60" class="sm-h2">{{ t.responsibilities.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.responsibilities.lead }}</p>
      </div>
      <div class="irs__grid">
        <div v-reveal class="irs__col">
          <div class="irs__head">
            <img :src="markUrl" alt="" class="irs__mark" width="288" height="320" />
            <h3 class="sm-h4">{{ t.responsibilities.ours.title }}</h3>
          </div>
          <ul>
            <li v-for="item in t.responsibilities.ours.items" :key="item" class="sm-check">
              <Check :size="18" aria-hidden="true" /> {{ item }}
            </li>
          </ul>
        </div>
        <span class="irs__join" aria-hidden="true">+</span>
        <div v-reveal="80" class="irs__col irs__col--yours">
          <div class="irs__head">
            <span class="sm-icon-tile sm-icon-tile--sm" aria-hidden="true"
              ><Building2 :size="18"
            /></span>
            <h3 class="sm-h4">{{ t.responsibilities.yours.title }}</h3>
          </div>
          <ul>
            <li v-for="item in t.responsibilities.yours.items" :key="item" class="sm-check">
              <Check :size="18" aria-hidden="true" /> {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.irs__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  gap: 20px;
  align-items: center;
}
.irs__col {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  padding: clamp(24px, 3vw, 36px);
  border-radius: var(--sm-r-card);
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
}
.irs__col--yours {
  background: var(--sm-surface-subtle);
}
.irs__head {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 36px;
}
.irs__mark {
  width: auto;
  height: 34px;
}
.irs__col ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.irs__join {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--sm-primary), var(--sm-accent));
  color: #fff;
  font-family: var(--sm-display);
  font-size: 24px;
  font-weight: 700;
}
@media (max-width: 860px) {
  .irs__grid {
    grid-template-columns: minmax(0, 1fr);
    justify-items: center;
  }
  .irs__col {
    width: 100%;
  }
}
</style>
