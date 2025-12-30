<script setup lang="ts">
import SectionHeader from '@/components/base/SectionHeader.vue'
import ServiceCard from '@/components/base/ServiceCard.vue'
import { services } from '@/data/services'
import truckImage from '@/assets/images/yellow_truck_transpo_661ef152.jpg'
</script>

<template>
  <section class="py-20 bg-gray-50">
    <div class="container mx-auto px-6">
      <div class="grid lg:grid-cols-2 gap-16 items-start">
        <div class="relative">
          <div class="rounded-3xl overflow-hidden shadow-2xl">
            <img
              :src="truckImage"
              alt="Yellow truck"
              class="w-full h-80 object-cover"
            />
          </div>
          <div class="absolute -bottom-8 -right-8 bg-secondary text-white p-6 rounded-2xl shadow-xl">
            <div class="flex items-center gap-3">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <div>
                <div class="text-2xl font-bold">2.5K+</div>
                <div class="text-sm text-white/80">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <SectionHeader
            label="Our Services"
            title="Your Time Is Saved Via Logistic And Transportation Solutions."
            subtitle="Speed Supply has various services and can be chosen according to our client's requirement."
            :centered="false"
          />

          <div class="space-y-8">
            <ServiceCard
              v-for="service in services"
              :key="service.number"
              :number="service.number"
              :title="service.title"
              :description="service.description"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
