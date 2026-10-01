<script setup lang="ts">
/**
 * The primary conversion on the marketing site: a WhatsApp consultation
 * link with a context-specific pre-filled message and a tracking event.
 *
 * When WhatsApp isn't configured (no or invalid number), it falls back to
 * the demo form on the page instead of rendering a broken link.
 */
import { computed } from 'vue'
import { usePage } from '@inertiajs/vue3'
import { ArrowRight, MessageCircle } from 'lucide-vue-next'
import { whatsappUrl, type WhatsappContext } from '@shared/whatsapp'
import { track } from '@shared/analytics'
import { useCopy, useI18n } from '~/i18n'
import { useSiteTheme } from '~/composables/site_theme'
import { useLeadTarget } from '~/composables/lead_target'

const props = withDefaults(
  defineProps<{
    context?: WhatsappContext
    page: string
    section: string
    variant?: string
    /** Defaults to "Consult via WhatsApp" in the page language. */
    label?: string
    fallbackLabel?: string
    appearance?: 'primary' | 'light' | 'dark' | 'on-dark' | 'link'
    size?: 'sm' | 'md' | 'lg'
    block?: boolean
  }>(),
  {
    context: 'general',
    variant: 'primary',
    label: undefined,
    fallbackLabel: undefined,
    appearance: 'primary',
    size: 'md',
    block: false,
  }
)

const t = useCopy('common')
const { locale } = useI18n()
const { scheme } = useSiteTheme()
const inertiaPage = usePage()
const leadTarget = useLeadTarget()
/**
 * WhatsApp opens through /r/whatsapp/<context>: the server records the
 * click (first-party tracking), then redirects to wa.me with the context's
 * message from the configuration. Only enumerated values and the page path
 * travel in the link; never anything the visitor typed.
 */
const href = computed(() => {
  if (!whatsappUrl(inertiaPage.props.marketing?.whatsapp, props.context)) return null
  const query = new URLSearchParams({
    locale: locale.value,
    path: inertiaPage.url.split(/[?#]/)[0],
    section: props.section,
    variant: props.variant,
    theme: scheme.value,
  })
  return `/r/whatsapp/${props.context}?${query}`
})

const classes = computed(() =>
  props.appearance === 'link'
    ? ['sm-link']
    : [
        'sm-btn',
        `sm-btn--${props.appearance}`,
        props.size !== 'md' ? `sm-btn--${props.size}` : '',
        props.block ? 'sm-btn--block' : '',
      ]
)

function onClick() {
  track('whatsapp_marketing_click', {
    page: props.page,
    section: props.section,
    variant: props.variant,
    locale: locale.value,
    theme: scheme.value,
  })
}
</script>

<template>
  <a
    v-if="href"
    :href="href"
    target="_blank"
    rel="noopener noreferrer nofollow"
    :class="classes"
    data-cta="whatsapp"
    @click="onClick"
  >
    <MessageCircle
      v-if="appearance !== 'link'"
      :size="size === 'sm' ? 16 : 18"
      aria-hidden="true"
    />
    {{ label ?? t.cta.whatsapp }}
    <span class="sr-only">{{ t.cta.opensWhatsapp }}</span>
    <ArrowRight v-if="appearance === 'link'" :size="16" aria-hidden="true" />
  </a>
  <a v-else :href="leadTarget.href" :class="classes" data-cta="whatsapp-fallback">
    {{ fallbackLabel ?? t.cta.fallback }}
    <ArrowRight :size="size === 'sm' ? 15 : 17" class="sm-btn__arrow" aria-hidden="true" />
  </a>
</template>
