<script setup lang="ts">
import { computed } from 'vue'
import { usePage } from '@inertiajs/vue3'
import { ChartColumn, House, Inbox, LogOut, MessageCircle, Search } from 'lucide-vue-next'
import { Form } from '@adonisjs/inertia/vue'
import Logo from '~/components/logo.vue'
import FlashToasts from '~/components/flash_toasts.vue'
import ThemeToggle from '~/components/theme_toggle.vue'
import NavLink, { type NavItem } from '~/components/nav_link.vue'
import { urlFor } from '~/client'

/**
 * Top-level app navigation. Add an entry here for every new area of your
 * app, and it shows up in the navigation bar with its active state handled.
 */
const page = usePage()
const nav = computed(
  () =>
    [
      { label: 'Dashboard', route: 'dashboard', icon: House },
      ...(page.props.permissions?.manageLeads
        ? [{ label: 'Leads', route: 'admin.demo_requests.index', icon: Inbox } as NavItem]
        : []),
      ...(page.props.permissions?.viewMarketing
        ? [
            { label: 'WhatsApp', route: 'admin.marketing.whatsapp.index', icon: MessageCircle },
            {
              label: 'Marketing',
              route: 'admin.marketing.overview',
              icon: ChartColumn,
              except: 'admin.marketing.whatsapp.index',
            },
          ]
        : []),
    ] as NavItem[]
)

/** One search box: a WhatsApp reference opens its intent, anything else searches leads. */
const canSearch = computed(() => Boolean(page.props.permissions?.viewMarketing))
const searchUrl = urlFor('admin.search')
</script>

<template>
  <header class="header header--bar">
    <div class="header__inner">
      <Logo :size="28" />
      <div class="header__right">
        <form
          v-if="canSearch"
          :action="searchUrl"
          method="get"
          role="search"
          class="header__search"
        >
          <label class="sr-only" for="admin-search">Search leads or a WhatsApp reference</label>
          <Search :size="15" aria-hidden="true" />
          <input
            id="admin-search"
            name="q"
            type="search"
            class="field__input"
            placeholder="Search or Ref: M7K4P2"
            autocomplete="off"
          />
        </form>
        <ThemeToggle />
        <Form route="session.destroy">
          <button type="submit" class="btn btn--secondary btn--sm">
            <LogOut :size="15" /> Log out
          </button>
        </Form>
      </div>
    </div>
  </header>

  <nav class="subnav">
    <div class="subnav__inner">
      <NavLink
        v-for="item in nav"
        :key="item.label"
        :route="item.route"
        :except="item.except"
        class="subnav__item"
      >
        <component :is="item.icon" v-if="item.icon" :size="14" />
        {{ item.label }}
      </NavLink>
    </div>
  </nav>

  <div class="app-main">
    <slot />
  </div>
  <FlashToasts />
</template>

<style scoped>
.header__search {
  position: relative;
  display: flex;
  align-items: center;
}
.header__search svg {
  position: absolute;
  left: 10px;
  color: var(--muted);
  pointer-events: none;
}
.header__search input {
  width: 220px;
  height: 32px;
  padding-left: 32px;
  font-size: 13.5px;
}
/* phones: the header has no room; the list pages keep their own search */
@media (max-width: 720px) {
  .header__search {
    display: none;
  }
}
</style>
