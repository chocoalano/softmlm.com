<script setup lang="ts">
/**
 * The trail at the top of a nested page's hero (Home › Services › SEO &
 * Content). It reads the page's `seo` prop: the same list the server
 * publishes as BreadcrumbList structured data (config/seo.ts), so what a
 * visitor sees and what search engines read always match. Links use the
 * path only, so they stay on the host the page was opened on.
 */
import { computed } from 'vue'
import { usePage } from '@inertiajs/vue3'
import { ChevronRight } from 'lucide-vue-next'
import type { SeoMeta } from '#config/seo'
import { useCopy } from '~/i18n'

const page = usePage()
const t = useCopy('common')
const crumbs = computed(() =>
  ((page.props.seo as SeoMeta | undefined)?.breadcrumbs ?? []).map((item) => ({
    name: item.name,
    href: new URL(item.url).pathname,
  }))
)
</script>

<template>
  <nav v-if="crumbs.length" :aria-label="t.breadcrumb" class="crumbs">
    <ol>
      <li v-for="(crumb, index) in crumbs" :key="crumb.href">
        <template v-if="index < crumbs.length - 1">
          <a :href="crumb.href">{{ crumb.name }}</a>
          <ChevronRight :size="14" aria-hidden="true" />
        </template>
        <span v-else aria-current="page">{{ crumb.name }}</span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.crumbs ol {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: var(--sm-muted);
}
.crumbs li {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.crumbs a {
  font-weight: 500;
  color: var(--sm-text-2);
}
.crumbs a:hover {
  color: var(--sm-primary-ink);
}
.crumbs [aria-current] {
  font-weight: 600;
  color: var(--sm-text);
}
</style>
