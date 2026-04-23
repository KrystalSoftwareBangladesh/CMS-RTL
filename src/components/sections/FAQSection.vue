<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import SectionHeader from '@/components/base/SectionHeader.vue'
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

const allFaqs = faqsData as PublicFAQ[]
const faqs = computed(() => allFaqs.slice(0, 5))
const showSeeAll = computed(() => allFaqs.length > 5)
</script>

<template>
  <section class="py-20 bg-white">
    <div class="container mx-auto px-6">
      <SectionHeader
        :title="t('faq.title')"
        :centered="true"
      />

      <div class="max-w-3xl mx-auto">
        <FAQAccordion :faqs="faqs" :initial-open-index="0" />

        <div v-if="showSeeAll" class="text-center mt-8">
          <RouterLink
            to="/faqs"
            class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
          >
            {{ t('faq.seeAll') || 'See All FAQs' }}
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </RouterLink>
        </div>

        <div v-if="faqs.length === 0" class="text-center py-8 text-gray-500">
          {{ t('faq.empty') || 'No FAQs available' }}
        </div>
      </div>
    </div>
  </section>
</template>
