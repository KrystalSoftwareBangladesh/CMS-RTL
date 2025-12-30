<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const route = useRoute()

defineProps<{
  collapsed: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle'): void
}>()

const menuItems = [
  { path: '/admin', icon: 'dashboard', key: 'admin.nav.dashboard', exact: true },
  { path: '/admin/services', icon: 'services', key: 'admin.nav.services' },
  { path: '/admin/news', icon: 'news', key: 'admin.nav.news' },
  { path: '/admin/projects', icon: 'projects', key: 'admin.nav.projects' },
  { path: '/admin/testimonials', icon: 'testimonials', key: 'admin.nav.testimonials' },
  { path: '/admin/faq', icon: 'faq', key: 'admin.nav.faq' },
  { path: '/admin/settings', icon: 'settings', key: 'admin.nav.settings' }
]

const isActive = (item: typeof menuItems[0]) => {
  if (item.exact) {
    return route.path === item.path
  }
  return route.path.startsWith(item.path)
}

const iconPaths = computed(() => ({
  dashboard: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  services: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
  news: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z',
  projects: 'M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2',
  testimonials: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
  faq: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  settings: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z'
}))
</script>

<template>
  <aside 
    :class="[
      'bg-primary min-h-screen fixed left-0 top-0 z-40 transition-all duration-300',
      collapsed ? 'w-20' : 'w-64'
    ]"
  >
    <div class="p-4 border-b border-white/10 flex items-center justify-between">
      <RouterLink to="/" class="flex items-center gap-3 overflow-hidden">
        <img src="/logo.png" alt="Rising Trading Ltd." :class="['h-10 flex-shrink-0', collapsed ? 'mx-auto' : '']" />
      </RouterLink>
      <button 
        @click="emit('toggle')"
        class="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        :class="collapsed ? 'absolute right-2 top-4' : ''"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            :d="collapsed ? 'M13 5l7 7-7 7M5 5l7 7-7 7' : 'M11 19l-7-7 7-7m8 14l-7-7 7-7'" 
          />
        </svg>
      </button>
    </div>
    
    <nav class="p-2">
      <ul class="space-y-1">
        <li v-for="item in menuItems" :key="item.path">
          <RouterLink
            :to="item.path"
            :class="[
              'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
              isActive(item) 
                ? 'bg-secondary text-white' 
                : 'text-white/70 hover:bg-white/10 hover:text-white',
              collapsed ? 'justify-center' : ''
            ]"
            :title="collapsed ? t(item.key) : undefined"
          >
            <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="iconPaths[item.icon as keyof typeof iconPaths]" />
            </svg>
            <span v-if="!collapsed" class="font-medium">{{ t(item.key) }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>
    
    <div class="absolute bottom-0 left-0 right-0 p-2 border-t border-white/10">
      <RouterLink 
        to="/" 
        :class="[
          'flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white transition-colors rounded-lg',
          collapsed ? 'justify-center' : ''
        ]"
        :title="collapsed ? t('admin.backToSite') : undefined"
      >
        <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
        </svg>
        <span v-if="!collapsed" class="font-medium">{{ t('admin.backToSite') }}</span>
      </RouterLink>
    </div>
  </aside>
</template>
