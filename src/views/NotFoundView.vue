<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BaseButton from '@/components/base/BaseButton.vue'

const { t } = useI18n()
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="text-center max-w-lg">
      <h1 class="text-9xl font-bold text-primary">404</h1>
      <h2 class="text-3xl font-bold text-gray-900 mt-4">{{ t('notFound.title') }}</h2>
      <p class="text-gray-600 mt-4 text-lg">{{ t('notFound.description') }}</p>
      
      <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <BaseButton to="/" variant="primary">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          {{ t('notFound.backHome') }}
        </BaseButton>
        <BaseButton to="/contact" variant="outline">
          {{ t('notFound.contactUs') }}
        </BaseButton>
      </div>
      
      <div class="mt-12">
        <p class="text-gray-500 text-sm">{{ t('notFound.helpLinks') }}</p>
        <div class="mt-4 flex flex-wrap gap-4 justify-center">
          <RouterLink to="/services" class="text-secondary hover:underline">{{ t('nav.services') }}</RouterLink>
          <RouterLink to="/we-are" class="text-secondary hover:underline">{{ t('nav.about') }}</RouterLink>
          <RouterLink to="/portfolio" class="text-secondary hover:underline">{{ t('nav.portfolio') }}</RouterLink>
          <RouterLink to="/news" class="text-secondary hover:underline">{{ t('nav.news') }}</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
