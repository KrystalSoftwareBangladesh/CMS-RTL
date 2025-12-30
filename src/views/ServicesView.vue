<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import SectionHeader from '@/components/base/SectionHeader.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseCard from '@/components/base/BaseCard.vue'
import FAQSection from '@/components/sections/FAQSection.vue'
import CTASection from '@/components/sections/CTASection.vue'
import truckImage from '@/assets/images/yellow_truck_transpo_661ef152.jpg'
import cargoImage from '@/assets/images/cargo_ship_container_77664e3d.jpg'

const { t } = useI18n()
</script>

<template>
  <main>
    <section class="relative py-32 bg-primary">
      <div
        class="absolute inset-0 bg-cover bg-center bg-no-repeat"
        :style="{ backgroundImage: `url(${truckImage})` }"
      >
        <div class="absolute inset-0 bg-primary-dark/80"></div>
      </div>
      <div class="relative z-10 container mx-auto px-6 text-center">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">{{ t('services.pageTitle') }}</h1>
        <p class="text-white/70 text-lg max-w-2xl mx-auto">
          {{ t('services.pageSubtitle') }}
        </p>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="container mx-auto px-6">
        <SectionHeader
          :label="t('services.label')"
          :title="t('services.title')"
          :subtitle="t('services.subtitle')"
        />
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <BaseCard :hover="true">
            <div class="text-secondary text-4xl font-bold mb-4">01</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ t('services.roadFreight') }}</h3>
            <p class="text-gray-600 text-sm">{{ t('services.roadFreightDesc') }}</p>
          </BaseCard>
          <BaseCard :hover="true">
            <div class="text-secondary text-4xl font-bold mb-4">02</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ t('services.airFreight') }}</h3>
            <p class="text-gray-600 text-sm">{{ t('services.airFreightDesc') }}</p>
          </BaseCard>
          <BaseCard :hover="true">
            <div class="text-secondary text-4xl font-bold mb-4">03</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ t('services.seaFreight') }}</h3>
            <p class="text-gray-600 text-sm">{{ t('services.seaFreightDesc') }}</p>
          </BaseCard>
          <BaseCard :hover="true">
            <div class="text-secondary text-4xl font-bold mb-4">04</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ t('services.railFreight') }}</h3>
            <p class="text-gray-600 text-sm">{{ t('services.railFreightDesc') }}</p>
          </BaseCard>
          <BaseCard :hover="true">
            <div class="text-secondary text-4xl font-bold mb-4">05</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ t('services.warehousing') }}</h3>
            <p class="text-gray-600 text-sm">{{ t('services.warehousingDesc') }}</p>
          </BaseCard>
          <BaseCard :hover="true">
            <div class="text-secondary text-4xl font-bold mb-4">06</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ t('services.supplyChain') }}</h3>
            <p class="text-gray-600 text-sm">{{ t('services.supplyChainDesc') }}</p>
          </BaseCard>
        </div>
      </div>
    </section>

    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="relative">
            <img
              :src="cargoImage"
              alt="Cargo shipping"
              class="rounded-2xl shadow-xl w-full h-[450px] object-cover"
            />
          </div>
          <div>
            <span class="text-sm font-medium tracking-wider uppercase text-secondary mb-2 block">{{ t('services.whyChooseUs') }}</span>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {{ t('services.benefitsTitle') }}
            </h2>
            <div class="space-y-6">
              <div class="flex gap-4">
                <div class="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ t('services.onTimeDelivery') }}</h3>
                  <p class="text-gray-600 text-sm">{{ t('services.onTimeDeliveryDesc') }}</p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ t('services.cargoInsurance') }}</h3>
                  <p class="text-gray-600 text-sm">{{ t('services.cargoInsuranceDesc') }}</p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ t('services.globalNetwork') }}</h3>
                  <p class="text-gray-600 text-sm">{{ t('services.globalNetworkDesc') }}</p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ t('services.costOptimization') }}</h3>
                  <p class="text-gray-600 text-sm">{{ t('services.costOptimizationDesc') }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-primary">
      <div class="container mx-auto px-6">
        <SectionHeader
          :label="t('services.processLabel')"
          :title="t('services.processTitle')"
          :subtitle="t('services.processSubtitle')"
          :light="true"
        />
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="relative text-center">
            <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center text-white text-2xl font-bold">01</div>
            <h3 class="text-white font-semibold text-lg mb-2">{{ t('services.requestQuote') }}</h3>
            <p class="text-gray-400 text-sm">{{ t('services.requestQuoteDesc') }}</p>
            <div class="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-secondary/30"></div>
          </div>
          <div class="relative text-center">
            <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center text-white text-2xl font-bold">02</div>
            <h3 class="text-white font-semibold text-lg mb-2">{{ t('services.bookShipment') }}</h3>
            <p class="text-gray-400 text-sm">{{ t('services.bookShipmentDesc') }}</p>
            <div class="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-secondary/30"></div>
          </div>
          <div class="relative text-center">
            <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center text-white text-2xl font-bold">03</div>
            <h3 class="text-white font-semibold text-lg mb-2">{{ t('services.trackMonitor') }}</h3>
            <p class="text-gray-400 text-sm">{{ t('services.trackMonitorDesc') }}</p>
            <div class="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-secondary/30"></div>
          </div>
          <div class="relative text-center">
            <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center text-white text-2xl font-bold">04</div>
            <h3 class="text-white font-semibold text-lg mb-2">{{ t('services.safeDelivery') }}</h3>
            <p class="text-gray-400 text-sm">{{ t('services.safeDeliveryDesc') }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="container mx-auto px-6 text-center">
        <SectionHeader
          :label="t('services.getStartedLabel')"
          :title="t('services.getStartedTitle')"
          :subtitle="t('services.getStartedSubtitle')"
        />
        <div class="flex flex-wrap justify-center gap-4">
          <BaseButton variant="secondary" size="lg">
            {{ t('hero.getQuote') }}
          </BaseButton>
          <BaseButton variant="primary" size="lg">
            {{ t('cta.button') }}
          </BaseButton>
        </div>
      </div>
    </section>

    <FAQSection />

    <CTASection />
  </main>
</template>
