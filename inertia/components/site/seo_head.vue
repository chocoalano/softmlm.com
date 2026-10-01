<script setup lang="ts">
/**
 * Title, description, canonical link and hreflang alternates for a
 * marketing page. The values come from config/seo.ts through the page's
 * `seo` prop, the same source the server uses to render these tags into
 * the HTML.
 */
import { Head } from '@inertiajs/vue3'
import type { SeoMeta } from '#config/seo'

defineProps<{ seo: SeoMeta }>()
</script>

<template>
  <Head :title="seo.title">
    <meta head-key="description" name="description" :content="seo.description" />
    <link head-key="canonical" rel="canonical" :href="seo.canonical" />
    <link
      v-for="alternate in seo.alternates"
      :key="alternate.hreflang"
      :head-key="`alternate-${alternate.hreflang}`"
      rel="alternate"
      :hreflang="alternate.hreflang"
      :href="alternate.href"
    />
  </Head>
</template>
