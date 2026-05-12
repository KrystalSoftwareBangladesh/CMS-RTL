<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionHeader from '@/components/base/SectionHeader.vue'
import ServiceCard from '@/components/base/ServiceCard.vue'
import serviceService, { type Service } from '@/services/service'
import truckImage from '@/assets/images/yellow_truck_transpo_661ef152.jpg'

const { t } = useI18n()

const services = ref<Service[]>([])
const loading = ref(false)

async function fetchFeaturedServices() {
  loading.value = true
  try {
    const response = await serviceService.list({ is_featured: true, page_size: 10 })
    services.value = response.results.filter(s => s.is_active)
  } catch (err) {
    console.error('Failed to fetch services:', err)
  } finally {
    loading.value = false
  }
}

function formatNumber(index: number): string {
  return String(index + 1).padStart(2, '0')
}

onMounted(() => {
  fetchFeaturedServices()
})
</script>

<template>
  <section class="py-20 bg-gray-50">
    <div class="container mx-auto px-6">
      <div class="grid items-start gap-16 lg:grid-cols-2">
        <div class="relative">
          <div class="overflow-hidden rounded-[2rem] border border-white/60 bg-white p-3 shadow-[0_28px_80px_-40px_rgba(15,23,42,0.38)]">
            <img
              :src="truckImage"
              alt="Yellow truck"
              class="h-80 w-full rounded-[1.4rem] object-cover"
            />
          </div>
          <div class="absolute -bottom-6 right-3 rounded-2xl border border-white/15 bg-secondary text-white shadow-[0_24px_55px_-30px_rgba(15,23,42,0.45)] md:-bottom-8 md:-right-8">
            <div class="p-5 md:p-6">
            <div class="flex items-center gap-3">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <div>
                <div class="text-2xl font-bold">2.5K+</div>
                <div class="text-sm text-white/95">{{ t('portfolio.happyClients') }}</div>
              </div>
            </div>
            </div>
          </div>
        </div>

        <div>
          <SectionHeader
            :label="t('services.sectionLabel')"
            :title="t('services.sectionTitle')"
            :subtitle="t('services.sectionSubtitle')"
            :centered="false"
          />

          <div v-if="loading" class="text-center py-8 text-gray-500">
            {{ t('common.loading') }}
          </div>

          <div v-else-if="services.length === 0" class="text-center py-8 text-gray-500">
            {{ t('services.noServices') }}
          </div>

          <div v-else class="space-y-8">
            <ServiceCard
              v-for="(service, index) in services"
              :key="service.id"
              :number="formatNumber(index)"
              :title="service.title"
              :description="service.description"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
