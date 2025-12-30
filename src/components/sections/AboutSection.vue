<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import SectionHeader from '@/components/base/SectionHeader.vue'
import BaseButton from '@/components/base/BaseButton.vue'

const { t } = useI18n()
</script>

<template>
  <section class="py-20 bg-white">
    <div class="container mx-auto px-6">
      <SectionHeader
        :label="t('nav.about')"
        :title="t('about.sectionTitle')"
        :subtitle="t('about.sectionSubtitle')"
        :centered="true"
      />

      <div class="flex justify-center mb-16">
        <BaseButton variant="secondary">
          {{ t('hero.learnMore') }}
        </BaseButton>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <div class="text-center group">
          <div class="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden group-hover:shadow-lg transition-shadow">
            <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center">
              <svg class="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h3 class="text-gray-900 font-medium">{{ t('about.worldwideService') }}</h3>
        </div>
        <div class="text-center group">
          <div class="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden group-hover:shadow-lg transition-shadow">
            <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center">
              <svg class="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <h3 class="text-gray-900 font-medium">{{ t('about.centralizeDocuments') }}</h3>
        </div>
        <div class="text-center group">
          <div class="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden group-hover:shadow-lg transition-shadow">
            <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center">
              <svg class="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
          <h3 class="text-gray-900 font-medium">{{ t('about.trustworthy') }}</h3>
        </div>
      </div>
    </div>
  </section>
</template>
