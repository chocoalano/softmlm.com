/**
 * Builds WhatsApp "click to chat" links for marketing CTAs.
 *
 * Kept free of browser and framework imports so it can be unit tested.
 * The message is always one of the configured context messages: visitor
 * input is never accepted here, so no personal data can end up in a URL.
 */

import type { WhatsappContext } from '#config/marketing'

export type { WhatsappContext }

export type WhatsappSettings = {
  enabled: boolean
  number: string | null
  messages: Record<WhatsappContext, string>
}

export function whatsappUrl(settings: WhatsappSettings | undefined, context: WhatsappContext) {
  if (!settings?.enabled || !settings.number) return null
  const message = settings.messages[context] ?? settings.messages.general
  return `https://wa.me/${settings.number}?text=${encodeURIComponent(message)}`
}
