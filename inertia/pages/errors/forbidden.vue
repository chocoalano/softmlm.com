<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import { Link } from '@adonisjs/inertia/vue'
import { ShieldAlert } from 'lucide-vue-next'
</script>

<template>
  <Head title="Access denied" />
  <div class="empty" :style="{ minHeight: '100vh' }">
    <div class="empty__mark">
      <ShieldAlert :size="22" />
    </div>
    <h1>You don't have access to this page</h1>
    <p>
      Your account doesn't have permission to view this area. If you think this is a mistake, ask an
      administrator to update your role.
    </p>
    <Link route="home" class="btn btn--secondary">Back to the homepage</Link>
  </div>
</template>
