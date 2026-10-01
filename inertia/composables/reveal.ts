import type { Directive } from 'vue'

/**
 * `v-reveal` fades an element up the first time it scrolls into view. Pass a
 * number to stagger it: `v-reveal="120"` waits 120ms. Content stays fully
 * visible when JS observers are unavailable or the visitor prefers reduced
 * motion.
 */
let observer: IntersectionObserver | undefined

function getObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-in')
        observer!.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  )
  return observer
}

export const vReveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    if (typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    el.classList.add('sm-reveal')
    if (binding.value) el.style.setProperty('--d', `${binding.value}ms`)
    getObserver().observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
