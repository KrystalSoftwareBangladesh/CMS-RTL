<script setup lang="ts">
import AdminSidebar from './AdminSidebar.vue'
import AdminHeader from './AdminHeader.vue'

interface Props {
  title: string
  subtitle?: string
}

defineProps<Props>()
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <AdminSidebar />
    <div class="ml-64">
      <AdminHeader :title="title" :subtitle="subtitle" />
      <main class="p-8">
        <slot />
      </main>
    </div>
  </div>
</template>
