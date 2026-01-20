<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionHeader from '@/components/base/SectionHeader.vue'
import testimonialService, { type Testimonial } from '@/services/testimonial'

const { t } = useI18n()

const testimonials = ref<Testimonial[]>([])
const currentIndex = ref(0)
const loading = ref(false)
let autoSlideInterval: ReturnType<typeof setInterval> | null = null

const currentTestimonial = computed(() => testimonials.value[currentIndex.value])

function nextSlide() {
  if (testimonials.value.length === 0) return
  currentIndex.value = (currentIndex.value + 1) % testimonials.value.length
}

function prevSlide() {
  if (testimonials.value.length === 0) return
  currentIndex.value = currentIndex.value === 0 
    ? testimonials.value.length - 1 
    : currentIndex.value - 1
}

function startAutoSlide() {
  if (autoSlideInterval) return
  autoSlideInterval = setInterval(nextSlide, 3000)
}

function stopAutoSlide() {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval)
    autoSlideInterval = null
  }
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

async function fetchTestimonials() {
  loading.value = true
  try {
    const response = await testimonialService.list({ page_size: 20 })
    testimonials.value = response.results.filter(t => t.is_active)
    if (testimonials.value.length > 1) {
      startAutoSlide()
    }
  } catch (err) {
    console.error('Failed to fetch testimonials:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchTestimonials()
})

onUnmounted(() => {
  stopAutoSlide()
})
</script>

<template>
  <section class="py-20 bg-gray-50">
    <div class="container mx-auto px-6">
      <SectionHeader
        :label="t('testimonials.label')"
        :title="t('testimonials.title')"
        :centered="true"
      />

      <div v-if="loading" class="text-center py-8 text-gray-500">
        {{ t('common.loading') }}
      </div>

      <div v-else-if="testimonials.length === 0" class="text-center py-8 text-gray-500">
        {{ t('common.noData') }}
      </div>

      <div v-else class="max-w-3xl mx-auto">
        <div class="relative bg-white rounded-3xl p-8 md:p-12 shadow-lg">
          <div class="absolute top-8 left-8 text-8xl text-secondary/20 font-serif leading-none">
            "
          </div>

          <div class="relative z-10">
            <p class="text-gray-600 text-lg leading-relaxed mb-8">
              {{ currentTestimonial?.message }}
            </p>

            <div class="flex items-center gap-4">
              <img
                v-if="currentTestimonial?.avatar"
                :src="currentTestimonial.avatar"
                :alt="currentTestimonial.name"
                class="w-14 h-14 rounded-full object-cover"
              />
              <div v-else class="w-14 h-14 rounded-full bg-gradient-to-br from-secondary to-secondary-dark flex items-center justify-center text-white text-lg font-bold">
                {{ getInitials(currentTestimonial?.name || '') }}
              </div>
              <div>
                <div class="font-semibold text-gray-900">{{ currentTestimonial?.name }}</div>
                <div class="text-sm text-gray-500">
                  {{ currentTestimonial?.designation }}
                  <span v-if="currentTestimonial?.company"> - {{ currentTestimonial.company }}</span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="testimonials.length > 1" class="absolute right-8 top-1/2 -translate-y-1/2 flex gap-2">
            <button 
              @click="prevSlide"
              class="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              @click="nextSlide"
              class="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div v-if="testimonials.length > 1" class="flex justify-center gap-2 mt-6">
            <button
              v-for="(_, index) in testimonials"
              :key="index"
              @click="currentIndex = index"
              class="w-2 h-2 rounded-full transition-colors"
              :class="index === currentIndex ? 'bg-secondary' : 'bg-gray-300'"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
