<script setup lang="ts">
/**
 * Source of truth: every data domain needs one authoritative system,
 * agreed before development. The owner column is deliberately open: the
 * MLM system is not assumed to own everything.
 */
import { CircleHelp } from 'lucide-vue-next'
import { vReveal } from '~/composables/reveal'
import { useCopy } from '~/i18n'

const t = useCopy('integrations')
</script>

<template>
  <section
    class="sm-section sm-section--compact sm-section--tint ntruth"
    aria-labelledby="ntruth-title"
  >
    <div class="sm-container ntruth__grid">
      <div class="ntruth__copy">
        <span v-reveal class="sm-eyebrow">{{ t.truth.eyebrow }}</span>
        <h2 id="ntruth-title" v-reveal="60" class="sm-h2">{{ t.truth.title }}</h2>
        <p v-reveal="120" class="sm-lead">{{ t.truth.lead }}</p>
        <p v-reveal="160" class="ntruth__note">{{ t.truth.note }}</p>
      </div>

      <div v-reveal="120" class="ntruth__table" role="table" :aria-label="t.truth.title">
        <div class="ntruth__row ntruth__row--head" role="row">
          <span role="columnheader">{{ t.truth.domainLabel }}</span>
          <span role="columnheader">{{ t.truth.ownerLabel }}</span>
        </div>
        <div v-for="domain in t.truth.domains" :key="domain" class="ntruth__row" role="row">
          <span role="cell" class="ntruth__domain">{{ domain }}</span>
          <span role="cell" class="ntruth__owner">
            <CircleHelp :size="15" aria-hidden="true" /> {{ t.truth.unknown }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ntruth__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(32px, 5vw, 72px);
  align-items: center;
}
.ntruth__copy {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.ntruth__note {
  font-size: 15px;
  font-weight: 600;
  color: var(--sm-primary-ink);
}
.ntruth__table {
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: var(--sm-r-shell);
  border: 1px solid var(--sm-border);
  background: var(--sm-surface);
  box-shadow: var(--sm-shadow-soft);
}
.ntruth__row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 12px;
  padding: 13px 14px;
  border-radius: 12px;
}
.ntruth__row + .ntruth__row {
  border-top: 1px solid var(--sm-border);
}
.ntruth__row--head {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--sm-muted);
}
.ntruth__row--head + .ntruth__row {
  border-top: 0;
}
.ntruth__domain {
  font-size: 15.5px;
  font-weight: 600;
}
.ntruth__owner {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px dashed var(--sm-primary-200);
  background: var(--sm-primary-50);
  font-size: 13.5px;
  font-weight: 600;
  color: var(--sm-primary-ink);
  white-space: nowrap;
}
@media (max-width: 960px) {
  .ntruth__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
