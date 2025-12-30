<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionHeader from '@/components/base/SectionHeader.vue'

const { t } = useI18n()

const openIndex = ref<number | null>(0)

const faqs = computed(() => [
  {
    question: t('faq.question1'),
    answer: t('faq.answer1')
  },
  {
    question: t('faq.question2'),
    answer: t('faq.answer2')
  },
  {
    question: t('faq.question3'),
    answer: t('faq.answer3')
  },
  {
    question: t('faq.question4'),
    answer: t('faq.answer4')
  },
  {
    question: t('faq.question5'),
    answer: t('faq.answer5')
  }
])

const toggleFAQ = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <section class="py-20 bg-white">
    <div class="container mx-auto px-6">
      <SectionHeader
        :title="t('faq.title')"
        :centered="true"
      />

      <div class="max-w-3xl mx-auto space-y-4">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="border border-gray-200 rounded-xl overflow-hidden"
        >
          <button
            class="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors"
            @click="toggleFAQ(index)"
          >
            <span class="font-medium text-gray-900">{{ faq.question }}</span>
            <svg
              :class="[
                'w-5 h-5 text-gray-500 transition-transform',
                openIndex === index ? 'rotate-180' : ''
              ]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            v-if="openIndex === index"
            class="px-6 pb-6 text-gray-600"
          >
            {{ faq.answer }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
