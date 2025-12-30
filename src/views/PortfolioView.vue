<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionHeader from '@/components/base/SectionHeader.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseCard from '@/components/base/BaseCard.vue'
import TestimonialsSection from '@/components/sections/TestimonialsSection.vue'
import CTASection from '@/components/sections/CTASection.vue'
import truckImage from '@/assets/images/semi_truck_on_highwa_08289769.jpg'
import cargoImage from '@/assets/images/cargo_ship_container_77664e3d.jpg'
import warehouseImage from '@/assets/images/warehouse_worker_wit_259b881f.jpg'
import yellowTruckImage from '@/assets/images/yellow_truck_transpo_661ef152.jpg'

const { t } = useI18n()

const categories = computed(() => [
  t('portfolio.all'), 
  t('services.roadFreight'), 
  t('services.seaFreight'), 
  t('services.airFreight'), 
  t('services.warehousing')
])
const activeCategory = ref(0)

const projects = [
  {
    id: 1,
    titleKey: 'portfolio.project1Title',
    categoryIndex: 2,
    descriptionKey: 'portfolio.project1Desc',
    image: cargoImage,
    stats: { deliveries: '50K+', countries: '12', onTime: '99.5%' }
  },
  {
    id: 2,
    titleKey: 'portfolio.project2Title',
    categoryIndex: 1,
    descriptionKey: 'portfolio.project2Desc',
    image: truckImage,
    stats: { deliveries: '25K+', countries: '8', onTime: '99.8%' }
  },
  {
    id: 3,
    titleKey: 'portfolio.project3Title',
    categoryIndex: 4,
    descriptionKey: 'portfolio.project3Desc',
    image: warehouseImage,
    stats: { deliveries: '3.6M', countries: '1', onTime: '99.9%' }
  },
  {
    id: 4,
    titleKey: 'portfolio.project4Title',
    categoryIndex: 3,
    descriptionKey: 'portfolio.project4Desc',
    image: yellowTruckImage,
    stats: { deliveries: '15K+', countries: '20', onTime: '100%' }
  },
  {
    id: 5,
    titleKey: 'portfolio.project5Title',
    categoryIndex: 1,
    descriptionKey: 'portfolio.project5Desc',
    image: truckImage,
    stats: { deliveries: '180K+', countries: '3', onTime: '99.7%' }
  },
  {
    id: 6,
    titleKey: 'portfolio.project6Title',
    categoryIndex: 2,
    descriptionKey: 'portfolio.project6Desc',
    image: cargoImage,
    stats: { deliveries: '2K+', countries: '15', onTime: '99.2%' }
  }
]

const filteredProjects = computed(() => {
  if (activeCategory.value === 0) {
    return projects
  }
  return projects.filter(p => p.categoryIndex === activeCategory.value)
})

const filterProjects = (index: number) => {
  activeCategory.value = index
}
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
            v-for="(category, index) in categories"
            :key="index"
            :class="[
              'px-6 py-2 rounded-full text-sm font-medium transition-all',
              activeCategory === index
                ? 'bg-secondary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            ]"
            @click="filterProjects(index)"
          >
            {{ category }}
          </button>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <BaseCard
            v-for="project in filteredProjects"
            :key="project.id"
            :padding="'none'"
            :hover="true"
          >
            <div class="relative h-48 overflow-hidden rounded-t-2xl">
              <img
                :src="project.image"
                :alt="t(project.titleKey)"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div class="absolute top-4 left-4">
                <span class="bg-secondary text-white text-xs px-3 py-1 rounded-full">
                  {{ categories[project.categoryIndex] }}
                </span>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ t(project.titleKey) }}</h3>
              <p class="text-gray-600 text-sm mb-4">{{ t(project.descriptionKey) }}</p>
              <div class="flex justify-between text-center border-t pt-4">
                <div>
                  <div class="text-secondary font-bold">{{ project.stats.deliveries }}</div>
                  <div class="text-xs text-gray-500">{{ t('portfolio.deliveries') }}</div>
                </div>
                <div>
                  <div class="text-secondary font-bold">{{ project.stats.countries }}</div>
                  <div class="text-xs text-gray-500">{{ t('portfolio.countries') }}</div>
                </div>
                <div>
                  <div class="text-secondary font-bold">{{ project.stats.onTime }}</div>
                  <div class="text-xs text-gray-500">{{ t('portfolio.onTime') }}</div>
                </div>
              </div>
            </div>
          </BaseCard>
        </div>
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
