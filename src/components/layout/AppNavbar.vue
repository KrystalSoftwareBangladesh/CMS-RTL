<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { navLinks } from '@/data/navigation'

const isMenuOpen = ref(false)
const isScrolled = ref(false)

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
      isScrolled ? 'bg-primary/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    ]"
  >
    <div class="container mx-auto px-6">
      <div class="flex items-center justify-between">
        <RouterLink to="/" class="flex items-center">
          <img src="/logo.png" alt="Rising Trading Ltd." class="h-10 md:h-12" />
        </RouterLink>

        <div class="hidden md:flex items-center gap-8">
          <RouterLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            :class="[
              'relative text-white/70 hover:text-white transition-colors text-sm font-medium py-2',
              isScrolled ? 'router-link-active-styled' : ''
            ]"
          >
            {{ link.name }}
          </RouterLink>
        </div>

        <div class="hidden md:flex items-center gap-4">
          <button class="text-white/80 hover:text-white transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button class="text-white/80 hover:text-white transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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
            'block py-2 text-white/70 hover:text-white transition-colors',
            isScrolled ? 'router-link-active-styled-mobile' : ''
          ]"
          @click="isMenuOpen = false"
        >
          {{ link.name }}
        </RouterLink>
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
