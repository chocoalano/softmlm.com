<script setup lang="ts">
/**
 * The disclosure for product mockups: one small caption under a group of
 * visuals, saying they show an interface concept with sample data. One per
 * visual group, never a badge on each card or widget.
 */
import { useCopy } from '~/i18n'

withDefaults(
  defineProps<{
    /** Defaults to "Interface concept · sample data" in the page language. */
    label?: string
    tone?: 'light' | 'dark'
    align?: 'start' | 'center'
  }>(),
  { label: undefined, tone: 'light', align: 'center' }
)

const t = useCopy('common')
</script>

<template>
  <p class="vnote" :class="[`vnote--${tone}`, `vnote--${align}`]">
    {{ label ?? t.visualNote.interface }}
  </p>
</template>

<style scoped>
.vnote {
  margin-top: 16px;
  font-size: 12.5px;
  line-height: 1.4;
  letter-spacing: 0.01em;
  color: var(--sm-muted);
}
.vnote--center {
  text-align: center;
}
.vnote--dark {
  color: var(--sm-on-inverse-muted);
}
</style>
