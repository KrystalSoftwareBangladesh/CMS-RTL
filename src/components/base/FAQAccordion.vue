<script setup lang="ts">
import { ref } from 'vue'

interface FAQItem {
  id: string | number
  question: string
  answer: string
}

interface Props {
  faqs: FAQItem[]
  initialOpenIndex?: number | null
}

const props = withDefaults(defineProps<Props>(), {
  initialOpenIndex: null
})

const openIndex = ref<number | null>(props.initialOpenIndex)

const toggleFAQ = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <div class="space-y-4">
    <div
      v-for="(faq, index) in faqs"
      :key="faq.id"
      class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_40px_-32px_rgba(15,23,42,0.3)] transition-shadow duration-300 hover:shadow-[0_22px_55px_-36px_rgba(15,23,42,0.32)]"
    >
      <button
        class="flex w-full items-center justify-between bg-white p-6 text-left transition-colors hover:bg-slate-50"
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
        class="px-6 pb-6 text-gray-700"
      >
        {{ faq.answer }}
      </div>
    </div>
  </div>
</template>
