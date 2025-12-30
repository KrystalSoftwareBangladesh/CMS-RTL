<script setup lang="ts">
import { ref } from 'vue'
import AdminSidebar from './AdminSidebar.vue'
import AdminHeader from './AdminHeader.vue'

interface Props {
  title: string
  subtitle?: string
}

defineProps<Props>()

const sidebarCollapsed = ref(false)

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <AdminSidebar :collapsed="sidebarCollapsed" @toggle="toggleSidebar" />
    <div :class="['transition-all duration-300', sidebarCollapsed ? 'ml-20' : 'ml-64']">
      <AdminHeader :title="title" :subtitle="subtitle" />
      <main class="p-8">
        <slot />
      </main>
    </div>
  </div>
</template>
