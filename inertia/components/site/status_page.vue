<script setup lang="ts">
/**
 * The body of the marketing 404 and error pages: a clear message, a few
 * useful next steps and the WhatsApp consultation.
 */
import { ArrowRight } from 'lucide-vue-next'
import NetworkOrb from '~/components/site/network_orb.vue'
import MarketingWhatsappCta from '~/components/site/marketing_whatsapp_cta.vue'

defineProps<{
  eyebrow: string
  heading: string
  text: string
  links: { label: string; href: string }[]
  page: string
}>()
</script>

<template>
  <section class="status">
    <div class="status__orb" aria-hidden="true"><NetworkOrb :nodes="90" /></div>
    <div class="sm-container status__inner">
      <span class="sm-eyebrow">{{ eyebrow }}</span>
      <h1 class="sm-h2 status__title">{{ heading }}</h1>
      <p class="sm-lead">{{ text }}</p>
      <ul class="status__links">
        <li v-for="link in links" :key="link.href">
          <a :href="link.href" class="sm-link">{{ link.label }} <ArrowRight :size="16" /></a>
        </li>
      </ul>
      <MarketingWhatsappCta :page="page" section="status" variant="primary" size="lg" />
    </div>
  </section>
</template>

<style scoped>
.status {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  padding-block: clamp(72px, 12vw, 160px);
}
.status__orb {
  position: absolute;
  z-index: -1;
  width: min(560px, 80vw);
  aspect-ratio: 1;
  right: -120px;
  top: 40px;
  opacity: 0.55;
}
.status__inner {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}
.status__title {
  max-width: 760px;
}
.status__links {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 12px 28px;
  margin: 8px 0 12px;
}
</style>
