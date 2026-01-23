<script setup lang="ts">
import { partners } from '@/data/navigation'
</script>

<template>
  <section class="relative min-h-screen bg-primary overflow-hidden flex flex-col">
    <div class="absolute inset-0">
      <video
        autoplay
        loop
        playsinline
        preload="auto"
        class="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero-background.mp4" type="video/mp4" />
      </video>
    </div>

    <div class="flex-1"></div>

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
