import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

/**
 * Tracks whether an element is on screen, so animations (the network orb,
 * auto-playing flows) can pause while scrolled away.
 */
export function useInView(target: Ref<HTMLElement | null | undefined>, rootMargin = '0px') {
  const inView = ref(false)
  let observer: IntersectionObserver | undefined

  onMounted(() => {
    if (!target.value || typeof IntersectionObserver === 'undefined') {
      inView.value = true
      return
    }
    observer = new IntersectionObserver(([entry]) => (inView.value = entry.isIntersecting), {
      rootMargin,
    })
    observer.observe(target.value)
  })

  onBeforeUnmount(() => observer?.disconnect())

  return inView
}

export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}
