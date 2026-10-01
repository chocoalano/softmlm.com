<script setup lang="ts">
/**
 * EN / ID. Each option links to the same page in the other language (and
 * keeps the section the visitor is on), so it works without JavaScript;
 * with it, the choice is also remembered for the next visit to "/".
 */
import { usePage } from '@inertiajs/vue3'
import { LOCALES, LOCALE_NAMES, localizePath, type Locale } from '@shared/locales'
import { rememberLocale, useCopy, useI18n } from '~/i18n'
import { track } from '@shared/analytics'

withDefaults(defineProps<{ variant?: 'compact' | 'full' }>(), { variant: 'compact' })

const t = useCopy('common')
const { locale } = useI18n()
const page = usePage()

/** The same page in the other language; the section (#hash) is added on click. */
const hrefFor = (target: Locale) => localizePath(page.url.replace(/#.*$/, ''), target)

function choose(event: MouseEvent, target: Locale) {
  rememberLocale(target)
  if (target === locale.value) {
    event.preventDefault()
    return
  }
  track('language_changed', { from: locale.value, to: target })
  const hash = window.location.hash
  if (hash) {
    event.preventDefault()
    window.location.assign(`${hrefFor(target)}${hash}`)
  }
}
</script>

<template>
  <nav class="lsw" :class="`lsw--${variant}`" :aria-label="t.locale.label">
    <a
      v-for="code in LOCALES"
      :key="code"
      :href="hrefFor(code)"
      :hreflang="code"
      :lang="code"
      class="lsw__item"
      :aria-current="code === locale ? 'true' : undefined"
      @click="choose($event, code)"
    >
      <template v-if="variant === 'compact'">
        <span aria-hidden="true">{{ code.toUpperCase() }}</span>
        <span class="sr-only">{{ LOCALE_NAMES[code] }}</span>
      </template>
      <template v-else>{{ LOCALE_NAMES[code] }}</template>
    </a>
  </nav>
</template>

<style scoped>
.lsw {
  display: inline-flex;
  padding: 3px;
  border-radius: 11px;
  background: var(--sm-surface-hover);
}
.lsw__item {
  display: inline-grid;
  place-items: center;
  min-width: 36px;
  height: 32px;
  padding: 0 8px;
  border-radius: 8px;
  font-size: 12.5px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--sm-muted);
  transition:
    background 0.15s,
    color 0.15s;
}
.lsw__item:hover {
  color: var(--sm-text);
}
.lsw__item[aria-current='true'] {
  background: var(--sm-surface);
  color: var(--sm-text);
  box-shadow: 0 1px 2px rgba(4, 24, 54, 0.12);
}
.lsw--full {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
}
.lsw--full .lsw__item {
  height: 44px;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0;
}
</style>
