<script setup lang="ts">
/**
 * One touch (how a visit arrived): a readable source ("Instagram Ads",
 * "google.com", "Direct", "Internal") with its kind, the campaign, the
 * landing page, and the raw UTM tags on request.
 */
import type { TouchView } from '@shared/journey'
import { formatDateTime } from '~/components/admin/lead_format'

defineProps<{ touch: TouchView | null; empty?: string; showDate?: boolean }>()
</script>

<template>
  <dl v-if="touch" class="detail-list">
    <dt>Source</dt>
    <dd>
      {{ touch.source }}
      <small v-if="touch.channel !== touch.source" class="touch__channel">{{
        touch.channel
      }}</small>
    </dd>
    <dt>Campaign</dt>
    <dd>{{ touch.campaign || '—' }}</dd>
    <dt>Landing page</dt>
    <dd>{{ touch.landingPage || '—' }}</dd>
    <template v-if="touch.referrerHost">
      <dt>Referrer</dt>
      <dd>{{ touch.referrerHost }}</dd>
    </template>
    <template v-if="showDate && touch.at">
      <dt>When</dt>
      <dd>{{ formatDateTime(touch.at) }}</dd>
    </template>
    <template v-if="touch.utm.length">
      <dt>UTM</dt>
      <dd class="touch__utm">
        <span v-for="item in touch.utm" :key="item.label">{{ item.label }}={{ item.value }}</span>
      </dd>
    </template>
  </dl>
  <p v-else class="section__description">{{ empty ?? 'Not recorded.' }}</p>
</template>

<style scoped>
.touch__channel {
  margin-left: 6px;
  font-size: 12px;
  color: var(--muted);
}
.touch__utm {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 12px;
  font-family: var(--mono);
  font-size: 12.5px;
  overflow-wrap: anywhere;
}
</style>
