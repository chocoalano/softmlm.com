<script setup lang="ts">
/**
 * The mlmsofts logo: the hexagon mark and the wordmark, from the brand
 * files in inertia/assets/brand. The wordmark has a version for dark
 * surfaces (light "mlm"), shown when the marketing site or the admin is in
 * dark mode. Pass `tagline` to add "Software House" under the wordmark.
 */
import { Link } from '@adonisjs/inertia/vue'
import markUrl from '~/assets/brand/mlmsofts-mark.png'
import wordmarkUrl from '~/assets/brand/mlmsofts-wordmark.png'
import wordmarkDarkUrl from '~/assets/brand/mlmsofts-wordmark-dark.png'

withDefaults(
  defineProps<{
    /** Height of the mark in pixels. */
    size?: number
    wordmark?: boolean
    tagline?: boolean
    /** A plain link target (marketing pages link to their localized home). */
    href?: string
    label?: string
  }>(),
  { size: 26, wordmark: false, tagline: false, href: undefined, label: 'mlmsoft home' }
)
</script>

<template>
  <component
    :is="href ? 'a' : Link"
    v-bind="href ? { href } : { route: 'home' }"
    :aria-label="label"
    class="logo"
    :class="{ 'logo--tagline': tagline }"
    :style="{ '--logo-size': `${size}px` }"
  >
    <img :src="markUrl" alt="" class="logo__mark" width="288" height="320" />
    <span v-if="wordmark" class="logo__word">
      <img
        :src="wordmarkUrl"
        alt=""
        class="logo__wordmark logo__wordmark--light"
        width="658"
        height="120"
      />
      <img
        :src="wordmarkDarkUrl"
        alt=""
        class="logo__wordmark logo__wordmark--dark"
        width="658"
        height="120"
      />
      <span v-if="tagline" class="logo__tagline" aria-hidden="true">Software House</span>
    </span>
  </component>
</template>
