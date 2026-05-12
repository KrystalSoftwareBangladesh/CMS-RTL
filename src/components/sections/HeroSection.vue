<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseButton from '@/components/base/BaseButton.vue'
import { partners } from '@/data/navigation'

const videoRef = ref<HTMLVideoElement | null>(null)
const isMuted = ref(true)
const { t } = useI18n()

function toggleSound() {
  if (videoRef.value) {
    videoRef.value.muted = !videoRef.value.muted
    isMuted.value = videoRef.value.muted
  }
}
</script>

<template>
  <section class="relative min-h-screen bg-primary overflow-hidden flex flex-col">
    <div class="absolute inset-0">
      <video ref="videoRef" autoplay loop muted playsinline preload="auto"
        class="absolute inset-0 w-full h-full object-cover">
        <source src="/hero-background.mp4" type="video/mp4" />
      </video>
      <div class="absolute inset-0 bg-gradient-to-b from-primary-dark/78 via-primary-dark/60 to-primary-dark/86"></div>
    </div>

    <div class="relative z-10 flex-1">
      <div class="container mx-auto flex min-h-screen flex-col justify-center px-6 pb-24 pt-32">
        <div class="max-w-3xl">
          <p class="mb-5 text-sm font-semibold uppercase tracking-[0.35em] text-white/80">
            {{ t('hero.subtitle') }}
          </p>
          <h1 class="mb-6 text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
            {{ t('hero.title') }}
          </h1>
          <p class="max-w-2xl text-lg leading-8 text-white/85 md:text-xl">
            {{ t('hero.description') }}
          </p>
          <div class="mt-10 flex flex-col gap-4 sm:flex-row">
            <BaseButton to="/contact" variant="secondary" size="lg">
              Get Quotation
            </BaseButton>
            <BaseButton to="/services" variant="outline" size="lg">
              Learn More
            </BaseButton>
          </div>
        </div>
      </div>
    </div>

    <div class="flex items-end justify-end p-6">
      <button @click="toggleSound"
        class="relative z-20 rounded-full border border-white/15 bg-secondary p-4 text-white shadow-[0_24px_60px_-28px_rgba(15,23,42,0.55)] transition-all hover:-translate-y-0.5 hover:bg-secondary-dark"
        :title="isMuted ? 'Click to unmute' : 'Click to mute'">
        <svg v-if="isMuted" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      </button>
    </div>

    <div class="relative z-10 mt-auto border-t border-white/10 bg-white/95 backdrop-blur-md">
      <div class="container mx-auto px-6 py-8">
        <div class="flex flex-wrap items-center justify-center gap-6 md:justify-between md:gap-4">
          <span v-for="partner in partners" :key="partner"
            class="text-base font-semibold tracking-[0.18em] text-slate-500 md:text-lg">
            {{ partner }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
