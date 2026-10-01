import { computed, inject, provide, type InjectionKey } from 'vue'
import { useCopy } from '~/i18n'

/**
 * Which lead form a marketing page carries: "Book a Demo" on software
 * pages, "Request a Consultation" on the services pages. The layout
 * provides it; the header, drawer, FAQ, CTA bands and the WhatsApp fallback
 * read it, so every secondary CTA points at the form that is on the page.
 */
export type LeadMode = 'demo' | 'consultation'

const LEAD_MODE: InjectionKey<LeadMode> = Symbol('lead-mode')

export function provideLeadMode(mode: LeadMode) {
  provide(LEAD_MODE, mode)
}

export function useLeadTarget() {
  const mode = inject(LEAD_MODE, 'demo')
  const t = useCopy('common')
  return {
    mode,
    /** The form's anchor on this page. */
    href: mode === 'consultation' ? '#consultation' : '#demo',
    /** "Book a Demo" or "Request a Consultation", in the page language. */
    label: computed(() =>
      mode === 'consultation' ? t.value.cta.requestConsultation : t.value.cta.bookDemo
    ),
  }
}
