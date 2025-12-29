<script setup lang="ts">
import SectionHeader from '@/components/base/SectionHeader.vue'
import { testimonials } from '@/data/testimonials'
import avatarImage from '@/assets/images/professional_busines_c8bc027d.jpg'
</script>

<template>
  <section class="py-20 bg-gray-50">
    <div class="container mx-auto px-6">
      <SectionHeader
        label="Testimonials"
        title="What Our Customer Say"
        :centered="true"
      />

      <div class="max-w-3xl mx-auto">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="relative bg-white rounded-3xl p-8 md:p-12 shadow-lg"
        >
          <div class="absolute top-8 left-8 text-8xl text-teal-500/20 font-serif leading-none">
            "
          </div>

          <div class="relative z-10">
            <p class="text-gray-600 text-lg leading-relaxed mb-8">
              {{ testimonial.quote }}
            </p>

            <div class="flex items-center gap-4">
              <img
                :src="avatarImage"
                :alt="testimonial.author"
                class="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <div class="font-semibold text-gray-900">{{ testimonial.author }}</div>
                <div class="text-sm text-gray-500">{{ testimonial.role }}</div>
              </div>
            </div>
          </div>

          <div class="absolute right-8 top-1/2 -translate-y-1/2 flex gap-2">
            <button class="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button class="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
