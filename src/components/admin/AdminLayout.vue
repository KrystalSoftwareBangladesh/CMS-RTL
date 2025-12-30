<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminSidebar from './AdminSidebar.vue'
import AdminHeader from './AdminHeader.vue'

interface Props {
  title: string
  subtitle?: string
}

defineProps<Props>()

const STORAGE_KEY = 'admin-sidebar-collapsed'

const sidebarCollapsed = ref(localStorage.getItem(STORAGE_KEY) === 'true')

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
  localStorage.setItem(STORAGE_KEY, String(sidebarCollapsed.value))
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
