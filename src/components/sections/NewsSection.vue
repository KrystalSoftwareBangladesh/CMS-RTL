<script setup lang="ts">
import SectionHeader from '@/components/base/SectionHeader.vue'
import { newsItems } from '@/data/news'
import portImage from '@/assets/images/cargo_ship_container_77664e3d.jpg'
import truckImage from '@/assets/images/yellow_truck_transpo_661ef152.jpg'

const newsWithImages = newsItems.map((item, index) => ({
  ...item,
  image: index % 2 === 0 ? portImage : truckImage
}))
</script>

<template>
  <section class="py-20 bg-white">
    <div class="container mx-auto px-6">
      <SectionHeader
        label="Our Blog"
        title="News Highlights"
        :centered="true"
      />

      <div class="grid md:grid-cols-3 gap-8">
        <article
          v-for="item in newsWithImages"
          :key="item.title"
          class="group cursor-pointer"
        >
          <div class="rounded-2xl overflow-hidden mb-4">
            <img
              :src="item.image"
              :alt="item.title"
              class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h3 class="font-semibold text-gray-900 mb-2 group-hover:text-teal-500 transition-colors">
            {{ item.title }}
          </h3>
          <div class="flex items-center gap-4 text-sm text-gray-500">
            <span class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {{ item.author }}
            </span>
            <span class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ item.date }}
            </span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
