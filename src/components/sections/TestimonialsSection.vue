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

      <div v-else class="mx-auto max-w-3xl">
        <div class="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_28px_75px_-44px_rgba(15,23,42,0.34)] md:p-12">
          <div class="absolute left-8 top-8 font-serif text-8xl leading-none text-secondary/15">
            "
          </div>

          <Transition name="fade-slide" mode="out-in">
            <div :key="currentIndex" class="relative z-10">
              <p class="mb-8 text-lg leading-relaxed text-gray-700">
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
                  <div class="text-sm text-gray-600">
                    {{ currentTestimonial?.designation }}
                    <span v-if="currentTestimonial?.company"> - {{ currentTestimonial.company }}</span>
                  </div>
                </div>
              </div>
            </div>
          </Transition>

          <div v-if="testimonials.length > 1" class="flex justify-center gap-2 mt-6">
            <button
              v-for="(_, index) in testimonials"
              :key="index"
              @click="currentIndex = index"
              class="w-2 h-2 rounded-full transition-colors duration-300"
              :class="index === currentIndex ? 'bg-secondary scale-125' : 'bg-gray-300'"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
