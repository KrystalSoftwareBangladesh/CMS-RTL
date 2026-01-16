<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionHeader from '@/components/base/SectionHeader.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseCard from '@/components/base/BaseCard.vue'
import TestimonialsSection from '@/components/sections/TestimonialsSection.vue'
import CTASection from '@/components/sections/CTASection.vue'
import projectService, { type Project } from '@/services/project'
import serviceService, { type Service } from '@/services/service'
import warehouseImage from '@/assets/images/warehouse_worker_wit_259b881f.jpg'

const { t } = useI18n()

const projects = ref<Project[]>([])
const services = ref<Service[]>([])
const loading = ref(false)
const loadingMore = ref(false)
const activeServiceId = ref<number | null>(null)
const currentPage = ref(1)
const hasMore = ref(false)
const totalCount = ref(0)

const PAGE_SIZE = 6

const serviceFilters = computed(() => {
  const allOption = { id: null, title: t('portfolio.all') }
  return [allOption, ...services.value.map(s => ({ id: s.id, title: s.title }))]
})

async function fetchServices() {
  try {
    services.value = await serviceService.listAll()
  } catch (err) {
    console.error('Failed to fetch services:', err)
  }
}

async function fetchProjects(page = 1, append = false) {
  if (page === 1) {
    loading.value = true
  } else {
    loadingMore.value = true
  }
  try {
    const params: { page: number; page_size: number; service_id?: number } = {
      page,
      page_size: PAGE_SIZE
    }
    if (activeServiceId.value !== null) {
      params.service_id = activeServiceId.value
    }
    const response = await projectService.list(params)
    if (append) {
      projects.value = [...projects.value, ...response.results]
    } else {
      projects.value = response.results
    }
    totalCount.value = response.count
    currentPage.value = page
    hasMore.value = projects.value.length < totalCount.value
  } catch (err) {
    console.error('Failed to fetch projects:', err)
  } finally {
    loading.value = false
    loadingMore.value = false
  }
}

function filterByService(serviceId: number | null) {
  activeServiceId.value = serviceId
  currentPage.value = 1
  fetchProjects(1)
}

function loadMore() {
  if (!loadingMore.value && hasMore.value) {
    fetchProjects(currentPage.value + 1, true)
  }
}

watch(activeServiceId, () => {
  currentPage.value = 1
})

onMounted(() => {
  fetchServices()
  fetchProjects()
})
</script>

<template>
  <main>
    <section class="relative py-32 bg-primary">
      <div
        class="absolute inset-0 bg-cover bg-center bg-no-repeat"
        :style="{ backgroundImage: `url(${warehouseImage})` }"
      >
        <div class="absolute inset-0 bg-primary-dark/80"></div>
      </div>
      <div class="relative z-10 container mx-auto px-6 text-center">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">{{ t('portfolio.pageTitle') }}</h1>
        <p class="text-white/70 text-lg max-w-2xl mx-auto">
          {{ t('portfolio.pageSubtitle') }}
        </p>
      </div>
    </section>

    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-secondary mb-2">500+</div>
            <div class="text-gray-600">{{ t('about.projectsCompleted') }}</div>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-secondary mb-2">50+</div>
            <div class="text-gray-600">{{ t('about.countriesServed') }}</div>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-secondary mb-2">99.5%</div>
            <div class="text-gray-600">{{ t('services.onTimeDelivery') }}</div>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-secondary mb-2">150+</div>
            <div class="text-gray-600">{{ t('portfolio.happyClients') }}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="container mx-auto px-6">
        <SectionHeader
          :label="t('portfolio.ourWork')"
          :title="t('portfolio.featuredProjects')"
          :subtitle="t('portfolio.featuredSubtitle')"
        />

        <div class="flex flex-wrap justify-center gap-3 mb-12">
          <button
            v-for="filter in serviceFilters"
            :key="filter.id ?? 'all'"
            :class="[
              'px-6 py-2 rounded-full text-sm font-medium transition-all',
              activeServiceId === filter.id
                ? 'bg-secondary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            ]"
            @click="filterByService(filter.id)"
          >
            {{ filter.title }}
          </button>
        </div>

        <div v-if="loading" class="text-center py-12">
          <div class="inline-block w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
          <p class="mt-4 text-gray-500">{{ t('common.loading') }}</p>
        </div>

        <template v-else>
          <div v-if="projects.length === 0" class="text-center py-12">
            <p class="text-gray-500">{{ t('portfolio.noProjects') }}</p>
          </div>

          <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <BaseCard
              v-for="project in projects"
              :key="project.id"
              :padding="'none'"
              :hover="true"
            >
              <div class="relative h-48 overflow-hidden rounded-t-2xl">
                <img
                  v-if="project.cover_image"
                  :src="project.cover_image"
                  :alt="project.title"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
                  <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div v-if="project.service" class="absolute top-4 left-4">
                  <span class="bg-secondary text-white text-xs px-3 py-1 rounded-full">
                    {{ project.service.title }}
                  </span>
                </div>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ project.title }}</h3>
                <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ project.short_description }}</p>
                <div class="flex justify-between text-center border-t pt-4">
                  <div>
                    <div class="text-secondary font-bold">{{ project.deliveries_count || '-' }}</div>
                    <div class="text-xs text-gray-500">{{ t('portfolio.deliveries') }}</div>
                  </div>
                  <div>
                    <div class="text-secondary font-bold">{{ project.countries_count || 0 }}</div>
                    <div class="text-xs text-gray-500">{{ t('portfolio.countries') }}</div>
                  </div>
                  <div>
                    <div class="text-secondary font-bold">{{ project.on_time_rate ? project.on_time_rate + '%' : '-' }}</div>
                    <div class="text-xs text-gray-500">{{ t('portfolio.onTime') }}</div>
                  </div>
                </div>
              </div>
            </BaseCard>
          </div>

          <div v-if="hasMore" class="text-center mt-12">
            <BaseButton 
              variant="outline" 
              size="lg" 
              @click="loadMore"
              :disabled="loadingMore"
            >
              <span v-if="loadingMore" class="flex items-center gap-2">
                <span class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                {{ t('common.loading') }}
              </span>
              <span v-else>{{ t('portfolio.loadMore') }}</span>
            </BaseButton>
          </div>
        </template>
      </div>
    </section>

    <section class="py-20 bg-primary">
      <div class="container mx-auto px-6 text-center">
        <SectionHeader
          :label="t('portfolio.partnerWithUs')"
          :title="t('portfolio.readyToStart')"
          :subtitle="t('portfolio.readySubtitle')"
          :light="true"
        />
        <div class="flex flex-wrap justify-center gap-4">
          <BaseButton variant="secondary" size="lg">
            {{ t('hero.getQuote') }}
          </BaseButton>
          <BaseButton variant="outline" size="lg">
            {{ t('portfolio.viewCaseStudies') }}
          </BaseButton>
        </div>
      </div>
    </section>

    <TestimonialsSection />

    <CTASection />
  </main>
</template>
