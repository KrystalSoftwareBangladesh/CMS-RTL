<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'

interface Props {
  title: string
  subtitle?: string
}

defineProps<Props>()

defineEmits<{
  (e: 'toggle-mobile-nav'): void
}>()

const router = useRouter()
const { t } = useI18n()
const authStore = useAuthStore()
const isProfileOpen = ref(false)

const userInitial = computed(() => {
  const name = authStore.userName
  return name.charAt(0).toUpperCase()
})
// Multi-language switching is temporarily disabled.
// const isLangOpen = ref(false)
// const currentLang = computed(() => {
//   const found = languages.find(l => l.code === locale.value)
//   return found ?? { code: 'en', name: 'English', flag: '🇺🇸' }
// })
// const changeLanguage = (code: string) => {
//   locale.value = code
//   localStorage.setItem('locale', code)
//   isLangOpen.value = false
// }

const handleLogout = () => {
  authStore.logout()
  router.push('/admin/login')
}
</script>

<template>
  <header class="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-4 sm:px-6 md:px-8">
    <div class="flex flex-wrap items-start justify-between gap-4">
      <div class="flex min-w-0 items-start gap-3">
        <button
          class="mt-1 rounded-lg border border-gray-200 p-2 text-gray-600 transition-colors hover:bg-gray-100 lg:hidden"
          @click="$emit('toggle-mobile-nav')"
          aria-label="Open navigation menu"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div class="min-w-0">
        <h1 class="text-xl font-bold text-gray-900 sm:text-2xl">{{ title }}</h1>
        <p v-if="subtitle" class="text-gray-500 mt-1">{{ subtitle }}</p>
        </div>
      </div>
      
      <div class="flex items-center gap-2 sm:gap-4">
        <!-- Multi-language dropdown temporarily disabled. -->
        <!-- <div class="relative">
          <button 
            @click="isLangOpen = !isLangOpen"
            class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span class="text-lg">{{ currentLang.flag }}</span>
            <span class="text-sm font-medium text-gray-700">{{ currentLang.code.toUpperCase() }}</span>
          </button>
          
          <div 
            v-if="isLangOpen"
            class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100"
          >
            <button
              v-for="lang in languages"
              :key="lang.code"
              @click="changeLanguage(lang.code)"
              :class="[
                'w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-3',
                locale === lang.code ? 'bg-gray-50 text-secondary font-medium' : 'text-gray-700'
              ]"
            >
              <span class="text-lg">{{ lang.flag }}</span>
              <span>{{ lang.name }}</span>
            </button>
          </div>
        </div> -->
        
          <button class="relative rounded-lg p-2 transition-colors hover:bg-gray-100">
          <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span class="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full"></span>
        </button>
        
        <div class="relative">
          <button 
            @click="isProfileOpen = !isProfileOpen"
            class="flex items-center gap-2 rounded-lg px-2 py-2 transition-colors hover:bg-gray-100 sm:gap-3 sm:px-3"
          >
            <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span class="text-white text-sm font-medium">{{ userInitial }}</span>
            </div>
            <span class="hidden text-sm font-medium text-gray-700 sm:inline">{{ authStore.userName }}</span>
          </button>
          
          <div 
            v-if="isProfileOpen"
            class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100"
          >
            <router-link 
              to="/admin/profile"
              @click="isProfileOpen = false"
              class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {{ t('admin.profile.viewProfile') }}
            </router-link>
            <button 
              @click="handleLogout"
              class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              {{ t('admin.profile.logout') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
