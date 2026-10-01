<script setup lang="ts">
/**
 * How to reach the team from a legal page: WhatsApp (or, without a
 * configured number, the form) and the form at the bottom of the page.
 * There is no dedicated privacy address yet (docs/legal-review.md).
 */
import { ArrowRight } from 'lucide-vue-next'
import MarketingWhatsappCta from '~/components/site/marketing_whatsapp_cta.vue'
import { useLeadTarget } from '~/composables/lead_target'
import { useCopy } from '~/i18n'

defineProps<{ page: string }>()

const t = useCopy('legal')
const leadTarget = useLeadTarget()
</script>

<template>
  <div class="lgc">
    <MarketingWhatsappCta :page="page" section="legal_contact" variant="contextual" size="sm" />
    <a :href="leadTarget.href" class="sm-link">{{ t.contact.form }} <ArrowRight :size="16" /></a>
  </div>
</template>

<style scoped>
.lgc {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 22px;
}
</style>
