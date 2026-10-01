import { computed, inject, provide, type InjectionKey } from 'vue'
import { useCopy, useI18n } from '~/i18n'

/**
 * Which lead form a marketing page carries: "Book a Demo" on software
 * pages, "Request a Consultation" on the services pages. The layout
 * provides it; the header, drawer, FAQ, CTA bands and the WhatsApp fallback
 * read it, so every secondary CTA points at the form that is on the page.
 * `home` is for pages without a form (the 404 and error pages): their CTAs
 * open the demo form on the home page.
 */
export type LeadMode = 'demo' | 'consultation' | 'home'

const LEAD_MODE: InjectionKey<LeadMode> = Symbol('lead-mode')

export function provideLeadMode(mode: LeadMode) {
  provide(LEAD_MODE, mode)
}

export function useLeadTarget() {
  const mode = inject(LEAD_MODE, 'demo')
  const t = useCopy('common')
  const { lp } = useI18n()
  return {
    mode,
    /** The form's anchor on this page, or the home page's form. */
    href: mode === 'consultation' ? '#consultation' : mode === 'home' ? lp('/#demo') : '#demo',
    /** "Book a Demo" or "Request a Consultation", in the page language. */
    label: computed(() =>
      mode === 'consultation' ? t.value.cta.requestConsultation : t.value.cta.bookDemo
    ),
  }
}
