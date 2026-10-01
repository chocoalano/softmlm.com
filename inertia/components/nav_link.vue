<script lang="ts">
import { type Component } from 'vue'
import { urlFor } from '~/client'

export type NavRoute = Parameters<typeof urlFor>[0]

export type NavItem = {
  label: string
  route: NavRoute
  icon?: Component
  /** A nested area that has its own navigation item. */
  except?: NavRoute
}
</script>

<script setup lang="ts">
/**
 * A link that marks itself with `aria-current="page"` when the current URL
 * matches its route. By default nested URLs count as a match, so a
 * "Settings" link stays active on "/settings/security". Pass `exact` to
 * only match the route itself, or `except` for a nested area that has its
 * own link.
 */
import { computed } from 'vue'
import { usePage } from '@inertiajs/vue3'
import { Link } from '@adonisjs/inertia/vue'

const props = withDefaults(defineProps<{ route: NavRoute; exact?: boolean; except?: NavRoute }>(), {
  exact: false,
  except: undefined,
})

const page = usePage()
const href = computed(() => urlFor(props.route))
const within = (path: string, base: string) => path === base || path.startsWith(`${base}/`)
const isActive = computed(() => {
  const path = page.url.split('?')[0]
  if (props.except && within(path, urlFor(props.except))) return false
  return props.exact ? path === href.value : within(path, href.value)
})
</script>

<template>
  <Link :href="href" :aria-current="isActive ? 'page' : undefined">
    <slot />
  </Link>
</template>
