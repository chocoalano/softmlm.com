<script setup lang="ts">
/**
 * The analytics switch on the Privacy Notice. It shows this browser's
 * actual state from the server (on, turned off, Global Privacy Control,
 * switched off for everyone) and, when the visitor can change it, posts the
 * choice: the server sets or clears the opt-out cookie and the page
 * reloads with the new state. Nothing is pre-selected for the visitor and
 * the site works the same either way.
 */
import { computed, ref } from 'vue'
import { router } from '@inertiajs/vue3'
import { TRACKING_PREFERENCE_PATH, type TrackingPreference } from '@shared/legal'
import { useCopy, useI18n } from '~/i18n'

const props = defineProps<{ preference: TrackingPreference }>()

const t = useCopy('legal')
const { locale } = useI18n()
const saving = ref(false)

const active = computed(() => props.preference === 'on')
/** GPC and the global switch are not the visitor's to override here. */
const changeable = computed(() => props.preference === 'on' || props.preference === 'off')

function toggle() {
  router.post(
    TRACKING_PREFERENCE_PATH,
    { tracking: active.value ? 'off' : 'on', locale: locale.value },
    {
      preserveScroll: true,
      onStart: () => {
        saving.value = true
      },
      onFinish: () => {
        saving.value = false
      },
    }
  )
}
</script>

<template>
  <div class="tps" role="group" aria-labelledby="tps-title">
    <div class="tps__state">
      <span class="tps__dot" :class="{ 'is-on': active }" aria-hidden="true" />
      <div>
        <p id="tps-title" class="tps__title">{{ t.preference.title }}</p>
        <p class="tps__status" aria-live="polite">{{ t.preference.status[preference] }}</p>
      </div>
    </div>
    <button
      v-if="changeable"
      type="button"
      class="sm-btn sm-btn--sm tps__button"
      :class="active ? 'tps__button--off' : 'sm-btn--dark'"
      :disabled="saving"
      @click="toggle"
    >
      {{ saving ? t.preference.saving : active ? t.preference.turnOff : t.preference.turnOn }}
    </button>
  </div>
</template>

<style scoped>
.tps {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px 24px;
  padding: 20px 22px;
  border: 1px solid var(--sm-border);
  border-radius: var(--sm-r-md);
  background: var(--sm-surface-subtle);
}
.tps__state {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  min-width: 0;
  flex: 1 1 280px;
}
.tps__dot {
  flex: none;
  width: 12px;
  height: 12px;
  margin-top: 6px;
  border-radius: 50%;
  background: var(--sm-subtle);
  box-shadow: 0 0 0 4px var(--sm-surface-hover);
}
.tps__dot.is-on {
  background: var(--sm-ok);
  box-shadow: 0 0 0 4px var(--sm-ok-bg);
}
.tps__title {
  font-size: 15.5px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--sm-text);
}
.tps__status {
  margin-top: 2px;
  font-size: 15px;
  line-height: 1.55;
  color: var(--sm-muted);
}
.tps__button--off {
  background: var(--sm-surface);
  color: var(--sm-text);
  border: 1px solid var(--sm-border-2);
}
.tps__button--off:hover:not(:disabled) {
  border-color: var(--sm-text-2);
}
</style>
