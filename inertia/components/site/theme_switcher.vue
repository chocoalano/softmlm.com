<script setup lang="ts">
/**
 * Light / Dark / System. In the header it is a small button that opens the
 * three options; in the mobile drawer the options are shown inline. Either
 * way the options are a radio group: arrow keys move between them, and the
 * choice applies at once and is remembered.
 */
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId } from 'vue'
import { Monitor, Moon, Sun } from 'lucide-vue-next'
import { THEMES, type ThemePreference } from '@shared/locales'
import { useCopy } from '~/i18n'
import { useSiteTheme } from '~/composables/site_theme'

const props = withDefaults(defineProps<{ variant?: 'popover' | 'inline' }>(), {
  variant: 'popover',
})

const t = useCopy('common')
const { preference, scheme, setSiteTheme } = useSiteTheme()
const icons = { light: Sun, dark: Moon, system: Monitor }
const labelOf = (mode: ThemePreference) => t.value.theme[mode]

const id = useId()
const open = ref(false)
const root = ref<HTMLElement>()
const button = ref<HTMLButtonElement>()

const buttonIcon = computed(() => (preference.value === 'system' ? Monitor : icons[scheme.value]))

function focusChecked() {
  root.value?.querySelector<HTMLElement>('[role="radio"][aria-checked="true"]')?.focus()
}

async function toggle() {
  open.value = !open.value
  if (open.value) {
    await nextTick()
    focusChecked()
  }
}

function close(returnFocus = false) {
  open.value = false
  if (returnFocus) button.value?.focus()
}

function choose(mode: ThemePreference) {
  setSiteTheme(mode)
}

function onKeydown(event: KeyboardEvent, index: number) {
  const step =
    event.key === 'ArrowRight' || event.key === 'ArrowDown'
      ? 1
      : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
        ? -1
        : 0
  if (step) {
    event.preventDefault()
    const next = THEMES[(index + step + THEMES.length) % THEMES.length]
    choose(next)
    nextTick(focusChecked)
  } else if (event.key === 'Escape' && props.variant === 'popover') {
    event.stopPropagation()
    close(true)
  }
}

function onFocusOut(event: FocusEvent) {
  if (props.variant === 'popover' && !root.value?.contains(event.relatedTarget as Node)) close()
}

function onPointerDown(event: PointerEvent) {
  if (open.value && !root.value?.contains(event.target as Node)) close()
}

onMounted(() => window.addEventListener('pointerdown', onPointerDown))
onBeforeUnmount(() => window.removeEventListener('pointerdown', onPointerDown))
</script>

<template>
  <div ref="root" class="tsw" :class="`tsw--${variant}`" @focusout="onFocusOut">
    <button
      v-if="variant === 'popover'"
      ref="button"
      type="button"
      class="tsw__button"
      :aria-label="`${t.theme.button}: ${labelOf(preference)}`"
      :title="t.theme.button"
      :aria-expanded="open"
      :aria-controls="`${id}-options`"
      @click="toggle"
    >
      <component :is="buttonIcon" :size="18" aria-hidden="true" />
    </button>

    <div
      v-show="variant === 'inline' || open"
      :id="`${id}-options`"
      class="tsw__options"
      role="radiogroup"
      :aria-label="t.theme.label"
    >
      <button
        v-for="(mode, i) in THEMES"
        :key="mode"
        type="button"
        role="radio"
        class="tsw__option"
        :aria-checked="preference === mode"
        :tabindex="preference === mode ? 0 : -1"
        @click="choose(mode)"
        @keydown="onKeydown($event, i)"
      >
        <component :is="icons[mode]" :size="16" aria-hidden="true" />
        <span>{{ labelOf(mode) }}</span>
        <small v-if="mode === 'system' && variant === 'popover'">{{ t.theme.systemHint }}</small>
      </button>
    </div>
  </div>
</template>

<style scoped>
.tsw {
  position: relative;
}
.tsw__button {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 11px;
  color: var(--sm-text-2);
  transition:
    background 0.15s,
    color 0.15s;
}
.tsw__button:hover,
.tsw__button[aria-expanded='true'] {
  background: var(--sm-surface-hover);
  color: var(--sm-text);
}
.tsw--popover .tsw__options {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  z-index: 60;
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 220px;
  padding: 6px;
  border-radius: 16px;
  background: var(--sm-surface);
  border: 1px solid var(--sm-border);
  box-shadow: var(--sm-shadow-float);
}
.tsw--popover .tsw__option {
  display: grid;
  grid-template-columns: 18px 1fr;
  align-items: center;
  gap: 2px 10px;
  padding: 9px 10px;
  border-radius: 10px;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  color: var(--sm-text-2);
}
.tsw--popover .tsw__option small {
  grid-column: 2;
  font-size: 12px;
  font-weight: 500;
  color: var(--sm-muted);
}
.tsw--popover .tsw__option:hover {
  background: var(--sm-surface-hover);
}
.tsw--popover .tsw__option[aria-checked='true'] {
  background: var(--sm-primary-50);
  color: var(--sm-primary-ink);
}
.tsw--inline .tsw__options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 3px;
  border-radius: 12px;
  background: var(--sm-surface-hover);
}
.tsw--inline .tsw__option {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 44px;
  border-radius: 9px;
  font-size: 14.5px;
  font-weight: 600;
  color: var(--sm-muted);
}
.tsw--inline .tsw__option[aria-checked='true'] {
  background: var(--sm-surface);
  color: var(--sm-text);
  box-shadow: 0 1px 2px rgba(4, 24, 54, 0.12);
}
</style>
