<script setup lang="ts">
import { ref } from 'vue'
import AdminSidebar from './AdminSidebar.vue'
import AdminHeader from './AdminHeader.vue'

interface Props {
  title: string
  subtitle?: string
}

defineProps<Props>()

const STORAGE_KEY = 'admin-sidebar-collapsed'

const sidebarCollapsed = ref(localStorage.getItem(STORAGE_KEY) === 'true')
const mobileSidebarOpen = ref(false)

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
  localStorage.setItem(STORAGE_KEY, String(sidebarCollapsed.value))
}

const openMobileSidebar = () => {
  mobileSidebarOpen.value = true
}

const closeMobileSidebar = () => {
  mobileSidebarOpen.value = false
}
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <AdminSidebar
      :collapsed="sidebarCollapsed"
      :mobile-open="mobileSidebarOpen"
      @toggle="toggleSidebar"
      @close-mobile="closeMobileSidebar"
    />
    <div
      v-if="mobileSidebarOpen"
      class="fixed inset-0 z-30 bg-slate-950/50 lg:hidden"
      @click="closeMobileSidebar"
    ></div>
    <div :class="['transition-all duration-300', sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64']">
      <AdminHeader
        :title="title"
        :subtitle="subtitle"
        @toggle-mobile-nav="openMobileSidebar"
      />
      <main class="p-4 sm:p-6 md:p-8">
        <slot />
      </main>
    </div>
  </div>
</template>
