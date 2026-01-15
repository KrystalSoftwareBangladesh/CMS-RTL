<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionHeader from '@/components/base/SectionHeader.vue'
import FAQAccordion from '@/components/base/FAQAccordion.vue'
import faqService, { type FAQ } from '@/services/faq'

const { t } = useI18n()

const faqs = ref<FAQ[]>([])
const loading = ref(true)
const loadingMore = ref(false)
const currentPage = ref(1)
const hasMore = ref(false)

const PAGE_SIZE = 10

async function fetchFaqs(page = 1, append = false) {
  if (page === 1) {
    loading.value = true
  } else {
    loadingMore.value = true
  }
  
  try {
    const response = await faqService.list({ page, page_size: PAGE_SIZE })
    if (append) {
      faqs.value = [...faqs.value, ...response.results]
    } else {
      faqs.value = response.results
    }
    currentPage.value = page
    hasMore.value = !!response.next
  } catch (err) {
    console.error('Failed to fetch FAQs:', err)
  } finally {
    loading.value = false
    loadingMore.value = false
  }
}

function handleScroll() {
  if (loadingMore.value || !hasMore.value) return
  
  const scrollHeight = document.documentElement.scrollHeight
  const scrollTop = document.documentElement.scrollTop
  const clientHeight = document.documentElement.clientHeight
  
  if (scrollTop + clientHeight >= scrollHeight - 200) {
    fetchFaqs(currentPage.value + 1, true)
  }
}

onMounted(() => {
  fetchFaqs()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
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
        <div v-if="loading" class="text-center py-8 text-gray-500">
          {{ t('common.loading') || 'Loading...' }}
        </div>

        <template v-else>
          <div class="max-w-3xl mx-auto">
            <FAQAccordion :faqs="faqs" :initial-open-index="0" />
            
            <div v-if="loadingMore" class="text-center py-8 text-gray-500">
              {{ t('common.loadingMore') || 'Loading more...' }}
            </div>
            
            <div v-if="!hasMore && faqs.length > 0" class="text-center py-8 text-gray-400 text-sm">
              {{ t('faq.noMore') || 'No more FAQs to load' }}
            </div>
            
            <div v-if="!loading && faqs.length === 0" class="text-center py-8 text-gray-500">
              {{ t('faq.empty') || 'No FAQs available' }}
            </div>
          </div>
        </template>
      </div>
    </section>
  </main>
</template>
