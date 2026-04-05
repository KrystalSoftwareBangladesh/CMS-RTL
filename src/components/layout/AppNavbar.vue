<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { navLinks } from '@/data/navigation'

const { t } = useI18n()
const isMenuOpen = ref(false)
const isScrolled = ref(false)

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

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav
    :class="[
      'fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300',
      isScrolled ? 'bg-secondary-light/30 backdrop-blur-md shadow-lg' : 'bg-transparent'
    ]"
  >
    <div class="container mx-auto px-6">
      <div class="flex items-center justify-between">
        <RouterLink to="/" class="flex items-center">
          <img src="/logo-white.png" alt="Rising Trading Ltd." class="h-10 md:h-12" />
        </RouterLink>

        <div class="hidden md:flex items-center gap-8">
          <RouterLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            :class="[
              'relative text-white/70 hover:text-white transition-colors text-sm font-bold py-2',
              isScrolled ? 'router-link-active-styled' : ''
            ]"
          >
            {{ t(link.key) }}
          </RouterLink>
        </div>

        <div class="hidden md:flex items-center gap-4">
          <!-- Multi-language dropdown temporarily disabled. -->
          <!-- <div class="relative">
            <button
              @click="isLangOpen = !isLangOpen"
              class="flex items-center gap-2 text-white/80 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/10"
            >
              <span class="text-lg">{{ currentLang.flag }}</span>
              <span class="text-sm font-medium">{{ currentLang.code.toUpperCase() }}</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              v-if="isLangOpen"
              class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50"
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
          <button class="text-white/80 hover:text-white transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        <button
          class="md:hidden text-white"
          @click="isMenuOpen = !isMenuOpen"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div
        v-if="isMenuOpen"
        class="md:hidden mt-4 bg-primary/90 backdrop-blur-sm rounded-lg p-4"
      >
        <RouterLink
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          :class="[
            'block py-2 text-white/70 hover:text-white transition-colors font-bold',
            isScrolled ? 'router-link-active-styled-mobile' : ''
          ]"
          @click="isMenuOpen = false"
        >
          {{ t(link.key) }}
        </RouterLink>
        <!-- Multi-language mobile controls temporarily disabled. -->
        <!-- <div class="border-t border-white/20 mt-3 pt-3">
          <p class="text-white/50 text-xs mb-2">Language</p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="lang in languages"
              :key="lang.code"
              @click="changeLanguage(lang.code)"
              :class="[
                'px-3 py-1.5 rounded-lg text-sm flex items-center gap-2',
                locale === lang.code ? 'bg-secondary text-white' : 'bg-white/10 text-white/80'
              ]"
            >
              <span>{{ lang.flag }}</span>
              <span>{{ lang.code.toUpperCase() }}</span>
            </button>
          </div>
        </div> -->
      </div>
    </div>
  </nav>
</template>

<style scoped>
.router-link-active-styled.router-link-active {
  color: var(--color-secondary);
}

.router-link-active-styled.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--color-secondary);
  border-radius: 9999px;
}

.router-link-active-styled-mobile.router-link-active {
  color: var(--color-secondary);
  border-left: 2px solid var(--color-secondary);
  padding-left: 0.75rem;
}
</style>
