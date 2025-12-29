<script setup lang="ts">
import { ref } from 'vue'
import SectionHeader from '@/components/base/SectionHeader.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseCard from '@/components/base/BaseCard.vue'
import TestimonialsSection from '@/components/sections/TestimonialsSection.vue'
import CTASection from '@/components/sections/CTASection.vue'
import truckImage from '@/assets/images/semi_truck_on_highwa_08289769.jpg'
import cargoImage from '@/assets/images/cargo_ship_container_77664e3d.jpg'
import warehouseImage from '@/assets/images/warehouse_worker_wit_259b881f.jpg'
import yellowTruckImage from '@/assets/images/yellow_truck_transpo_661ef152.jpg'

const categories = ['All', 'Road Freight', 'Sea Freight', 'Air Freight', 'Warehousing']
const activeCategory = ref('All')

const projects = [
  {
    id: 1,
    title: 'Global Electronics Distribution',
    category: 'Sea Freight',
    description: 'Managed the international shipping of 50,000+ electronic units across 12 countries.',
    image: cargoImage,
    stats: { deliveries: '50K+', countries: '12', onTime: '99.5%' }
  },
  {
    id: 2,
    title: 'Automotive Parts Supply Chain',
    category: 'Road Freight',
    description: 'End-to-end logistics solution for a major automotive manufacturer.',
    image: truckImage,
    stats: { deliveries: '25K+', countries: '8', onTime: '99.8%' }
  },
  {
    id: 3,
    title: 'E-commerce Fulfillment Center',
    category: 'Warehousing',
    description: 'Built and operated a 100,000 sq ft fulfillment center processing 10,000 orders daily.',
    image: warehouseImage,
    stats: { deliveries: '3.6M', countries: '1', onTime: '99.9%' }
  },
  {
    id: 4,
    title: 'Pharmaceutical Cold Chain',
    category: 'Air Freight',
    description: 'Temperature-controlled logistics for sensitive medical supplies.',
    image: yellowTruckImage,
    stats: { deliveries: '15K+', countries: '20', onTime: '100%' }
  },
  {
    id: 5,
    title: 'Retail Chain Distribution',
    category: 'Road Freight',
    description: 'Daily deliveries to 500+ retail locations with just-in-time inventory management.',
    image: truckImage,
    stats: { deliveries: '180K+', countries: '3', onTime: '99.7%' }
  },
  {
    id: 6,
    title: 'Industrial Equipment Export',
    category: 'Sea Freight',
    description: 'Oversized cargo handling and international shipping for heavy machinery.',
    image: cargoImage,
    stats: { deliveries: '2K+', countries: '15', onTime: '99.2%' }
  }
]

const filteredProjects = ref(projects)

const filterProjects = (category: string) => {
  activeCategory.value = category
  if (category === 'All') {
    filteredProjects.value = projects
  } else {
    filteredProjects.value = projects.filter(p => p.category === category)
  }
}

const stats = [
  { value: '500+', label: 'Projects Completed' },
  { value: '50+', label: 'Countries Served' },
  { value: '99.5%', label: 'On-Time Delivery' },
  { value: '150+', label: 'Happy Clients' }
]
</script>

<template>
  <main>
    <section class="relative py-32 bg-slate-800">
      <div
        class="absolute inset-0 bg-cover bg-center bg-no-repeat"
        :style="{ backgroundImage: `url(${warehouseImage})` }"
      >
        <div class="absolute inset-0 bg-slate-900/80"></div>
      </div>
      <div class="relative z-10 container mx-auto px-6 text-center">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Our Portfolio</h1>
        <p class="text-white/70 text-lg max-w-2xl mx-auto">
          Discover how we've helped businesses transform their logistics operations
        </p>
      </div>
    </section>

    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="text-center"
          >
            <div class="text-4xl md:text-5xl font-bold text-teal-500 mb-2">{{ stat.value }}</div>
            <div class="text-gray-600">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="container mx-auto px-6">
        <SectionHeader
          label="Our Work"
          title="Featured Projects"
          subtitle="Explore our successful logistics partnerships across industries."
        />

        <div class="flex flex-wrap justify-center gap-3 mb-12">
          <button
            v-for="category in categories"
            :key="category"
            :class="[
              'px-6 py-2 rounded-full text-sm font-medium transition-all',
              activeCategory === category
                ? 'bg-teal-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            ]"
            @click="filterProjects(category)"
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
                :alt="project.title"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div class="absolute top-4 left-4">
                <span class="bg-teal-500 text-white text-xs px-3 py-1 rounded-full">
                  {{ project.category }}
                </span>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ project.title }}</h3>
              <p class="text-gray-600 text-sm mb-4">{{ project.description }}</p>
              <div class="flex justify-between text-center border-t pt-4">
                <div>
                  <div class="text-teal-500 font-bold">{{ project.stats.deliveries }}</div>
                  <div class="text-xs text-gray-500">Deliveries</div>
                </div>
                <div>
                  <div class="text-teal-500 font-bold">{{ project.stats.countries }}</div>
                  <div class="text-xs text-gray-500">Countries</div>
                </div>
                <div>
                  <div class="text-teal-500 font-bold">{{ project.stats.onTime }}</div>
                  <div class="text-xs text-gray-500">On-Time</div>
                </div>
              </div>
            </div>
          </BaseCard>
        </div>
      </div>
    </section>

    <section class="py-20 bg-slate-800">
      <div class="container mx-auto px-6 text-center">
        <SectionHeader
          label="Partner With Us"
          title="Ready to Start Your Project?"
          subtitle="Let's discuss how we can help optimize your logistics operations."
          :light="true"
        />
        <div class="flex flex-wrap justify-center gap-4">
          <BaseButton variant="secondary" size="lg">
            Get a Quote
          </BaseButton>
          <BaseButton variant="outline" size="lg">
            View Case Studies
          </BaseButton>
        </div>
      </div>
    </section>

    <TestimonialsSection />

    <CTASection />
  </main>
</template>
