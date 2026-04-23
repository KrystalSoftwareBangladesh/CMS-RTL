<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import FAQAccordion from '@/components/base/FAQAccordion.vue'
import faqsData from '@/data/faqs.json'

const { t } = useI18n()

interface PublicFAQ {
  id: string
  category: string
  question: string
  answer: string
  keywords: string[]
}

const faqs = faqsData as PublicFAQ[]
</script>

<template>
  <main>
    <section class="relative py-32 bg-primary">
      <div class="relative z-10 container mx-auto px-6 text-center">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          {{ t('faq.pageTitle') || 'Frequently Asked Questions' }}
        </h1>
        <p class="text-white/70 text-lg max-w-2xl mx-auto">
          {{ t('faq.pageSubtitle') || 'Find answers to common questions about our services' }}
        </p>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="container mx-auto px-6">
        <div class="max-w-3xl mx-auto">
          <FAQAccordion v-if="faqs.length > 0" :faqs="faqs" :initial-open-index="0" />

          <div v-else class="text-center py-8 text-gray-500">
            {{ t('faq.empty') || 'No FAQs available' }}
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
