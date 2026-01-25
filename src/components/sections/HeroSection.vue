<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { partners } from '@/data/navigation'

const videoRef = ref<HTMLVideoElement | null>(null)
const isMuted = ref(true)

function toggleSound() {
  if (videoRef.value) {
    videoRef.value.muted = !videoRef.value.muted
    isMuted.value = videoRef.value.muted
  }
}

onMounted(() => {
  if (videoRef.value) {
    videoRef.value.addEventListener('canplay', () => {
      if (videoRef.value) {
        videoRef.value.muted = false
        isMuted.value = false
      }
    }, { once: true })
  }
})
</script>

<template>
  <section class="relative min-h-screen bg-primary overflow-hidden flex flex-col">
    <div class="absolute inset-0">
      <video
        ref="videoRef"
        autoplay
        loop
        muted
        playsinline
        preload="auto"
        class="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero-background.mp4" type="video/mp4" />
      </video>
    </div>

    <div class="flex-1 flex items-end justify-end p-6">
      <button
        @click="toggleSound"
        class="relative z-20 bg-secondary hover:bg-secondary-dark text-white p-4 rounded-full shadow-lg transition-all"
        :title="isMuted ? 'Click to unmute' : 'Click to mute'"
      >
        <svg v-if="isMuted" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      </button>
    </div>

    <div class="relative z-10 bg-white mt-auto">
      <div class="container mx-auto px-6 py-8">
        <div class="flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-4">
          <span
            v-for="partner in partners"
            :key="partner"
            class="text-gray-400 text-lg md:text-xl font-semibold tracking-wider"
          >
            {{ partner }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
