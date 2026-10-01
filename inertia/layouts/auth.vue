<script setup lang="ts">
import Logo from '~/components/logo.vue'
import FlashToasts from '~/components/flash_toasts.vue'
import ThemeToggle from '~/components/theme_toggle.vue'
</script>

<template>
  <div class="auth">
    <div class="auth__form-col">
      <Logo :size="28" />
      <div class="auth__form-wrap">
        <slot />
      </div>
      <div :style="{ height: '20px' }" />
    </div>

    <aside class="auth__aside">
      <div class="auth__aside-top">
        <ThemeToggle />
      </div>

      <p class="auth__quote">Back office for leads, conversations and marketing insight.</p>

      <div>
        <div class="pitch__t">Staff accounts only</div>
        <p class="pitch__p">
          Accounts are created by an administrator. Ask yours if you need access.
        </p>
      </div>
    </aside>
  </div>
  <FlashToasts />
</template>
