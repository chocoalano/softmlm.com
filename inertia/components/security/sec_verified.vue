<script setup lang="ts">
/**
 * "What we can verify today": controls of mlmsoft's own marketing site and
 * back office, read from shared/security.ts, where each one cites its
 * VERIFIED evidence (docs/security-evidence.md; a unit test checks). The
 * caption keeps them apart from customer platform controls.
 */
import { computed } from 'vue'
import { BadgeCheck } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import { verifiedControls } from '@shared/security'
import { useCopy, useI18n } from '~/i18n'

const t = useCopy('security')
const { locale } = useI18n()
const controls = computed(() =>
  verifiedControls.map((control) => ({ key: control.key, ...control.copy[locale.value] }))
)
</script>

<template>
  <section class="sm-section sm-section--compact sver" aria-labelledby="sver-title">
    <div class="sm-container">
      <div class="sver__head">
        <span v-reveal class="sm-eyebrow">{{ t.verified.eyebrow }}</span>
        <h2 id="sver-title" v-reveal="60" class="sm-h2">{{ t.verified.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.verified.lead }}</p>
      </div>
      <ul class="sver__grid">
        <li
          v-for="(item, i) in controls"
          :key="item.key"
          v-reveal="(i % 4) * 40"
          class="sver__item"
        >
          <BadgeCheck :size="19" aria-hidden="true" />
          <b>{{ item.title }}</b>
          <span>{{ item.text }}</span>
        </li>
      </ul>
      <p v-reveal class="sver__caption">{{ t.verified.caption }}</p>
    </div>
  </section>
</template>

<style scoped>
.sver__head {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 760px;
  margin-bottom: clamp(28px, 4vw, 44px);
}
.sver__grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}
.sver__item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 20px;
  border-radius: var(--sm-r-card);
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
}
.sver__item svg {
  margin-bottom: 6px;
  color: var(--sm-primary-ink);
}
.sver__item b {
  font-size: 15.5px;
  font-weight: 650;
}
.sver__item span {
  font-size: 14.5px;
  line-height: 1.5;
  color: var(--sm-muted);
}
.sver__caption {
  margin-top: 20px;
  padding: 14px 18px;
  max-width: 860px;
  border-left: 3px solid var(--sm-primary);
  border-radius: 0 var(--sm-r-md) var(--sm-r-md) 0;
  background: var(--sm-surface-subtle);
  font-size: 14.5px;
  line-height: 1.55;
}
@media (max-width: 1100px) {
  .sver__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 520px) {
  .sver__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
