<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue'
import { partners } from '@/data/navigation'
import heroImage from '@/assets/images/semi_truck_on_highwa_08289769.jpg'

const slides = ['01', '02', '03']
const currentSlide = 1
</script>

<template>
  <section class="relative min-h-screen bg-primary overflow-hidden">
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      :style="{ backgroundImage: `url(${heroImage})` }"
    >
      <div class="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary/80 to-primary-light/40"></div>
    </div>

    <div class="relative z-10 container mx-auto px-6 pt-32 pb-20">
      <div class="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
        <div>
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            <span class="italic">Elevate Trade</span><br />
            Worldwide
          </h1>
          <p class="text-white/70 text-lg mb-8 max-w-md">
            Your trusted partner for global trading solutions. We deliver excellence in import, export, and distribution services.
          </p>
          <BaseButton variant="primary" size="md">
            Learn More
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </BaseButton>
        </div>

        <div class="hidden lg:flex justify-end items-center">
          <div class="flex flex-col items-end gap-2">
            <template v-for="(slide, index) in slides" :key="slide">
              <div
                :class="[
                  'text-right transition-all',
                  index === currentSlide ? 'text-white text-3xl font-bold' : 'text-white/40 text-xl'
                ]"
              >
                {{ slide }}
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="relative z-10 bg-white">
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
