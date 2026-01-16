<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import ToastContainer from '@/components/base/ToastContainer.vue'

const route = useRoute()
const isAdminRoute = computed(() => route.path.startsWith('/admin'))
</script>

<template>
  <div class="min-h-screen">
    <AppNavbar v-if="!isAdminRoute" />
    <RouterView />
    <AppFooter v-if="!isAdminRoute" />
    <ToastContainer />
  </div>
</template>
