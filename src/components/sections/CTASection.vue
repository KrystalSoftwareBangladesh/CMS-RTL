<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BaseButton from '@/components/base/BaseButton.vue'
import heroImage from '@/assets/images/semi_truck_on_highwa_08289769.jpg'

const { t } = useI18n()
</script>

<template>
  <section class="relative py-24">
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      :style="{ backgroundImage: `url(${heroImage})` }"
    >
      <div class="absolute inset-0 bg-primary-dark/92"></div>
    </div>

    <div class="relative z-10 container mx-auto px-6">
      <div class="max-w-2xl">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
          {{ t('cta.title') }}
        </h2>
        <p class="text-white/85 mb-8">
          {{ t('cta.description') }}
        </p>
        <BaseButton variant="outline" size="md">
          {{ t('cta.button') }}
        </BaseButton>
      </div>
    </div>
  </section>
</template>
