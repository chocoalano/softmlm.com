<script setup lang="ts">
import { computed } from 'vue'
import { Head } from '@inertiajs/vue3'
import MarketingLayout from '~/layouts/marketing.vue'
import StatusPage from '~/components/site/status_page.vue'
import { useCopy, useI18n } from '~/i18n'

const t = useCopy('common')
const { lp } = useI18n()
const links = computed(() => [{ label: t.value.serverError.home, href: lp('/') }])
</script>

<template>
  <MarketingLayout page="server_error" context="general" lead-mode="home">
    <Head :title="t.serverError.title">
      <meta head-key="robots" name="robots" content="noindex" />
    </Head>
    <StatusPage
      :eyebrow="t.serverError.eyebrow"
      :heading="t.serverError.heading"
      :text="t.serverError.text"
      :links="links"
      page="server_error"
    />
  </MarketingLayout>
</template>
