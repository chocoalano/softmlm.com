<script setup lang="ts">
/**
 * 404 for any unknown address under /en or /id, in that language.
 */
import { computed } from 'vue'
import { Head } from '@inertiajs/vue3'
import MarketingLayout from '~/layouts/marketing.vue'
import StatusPage from '~/components/site/status_page.vue'
import { WHO_WE_SERVE_PATH } from '@shared/personas'
import { useCopy, useI18n } from '~/i18n'
import type { Locale } from '@shared/locales'

/** The language comes from the address (/id/… → Indonesian). */
defineProps<{ locale?: Locale }>()

const t = useCopy('common')
const { lp } = useI18n()

const links = computed(() => [
  { label: t.value.notFound.links.home, href: lp('/') },
  { label: t.value.notFound.links.whoWeServe, href: lp(WHO_WE_SERVE_PATH) },
  { label: t.value.notFound.links.compensation, href: lp('/compensation-plans') },
  { label: t.value.notFound.links.pricing, href: lp('/pricing') },
])
</script>

<template>
  <MarketingLayout page="not_found" context="general" lead-mode="home">
    <Head :title="t.notFound.title">
      <meta head-key="robots" name="robots" content="noindex" />
    </Head>
    <StatusPage
      :eyebrow="t.notFound.eyebrow"
      :heading="t.notFound.heading"
      :text="t.notFound.text"
      :links="links"
      page="not_found"
    />
  </MarketingLayout>
</template>
