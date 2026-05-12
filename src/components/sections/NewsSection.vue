<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SectionHeader from '@/components/base/SectionHeader.vue'
import newsService, { type News } from '@/services/news'

const articles = ref<News[]>([])
const loading = ref(false)

async function fetchHighlightedNews() {
  loading.value = true
  try {
    const response = await newsService.list({ page_size: 3, is_highlighted: true })
    articles.value = response.results
  } catch (err) {
    console.error('Failed to fetch highlighted news:', err)
  } finally {
    loading.value = false
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

onMounted(() => {
  fetchHighlightedNews()
})
</script>

<template>
  <section class="py-20 bg-white">
    <div class="container mx-auto px-6">
      <SectionHeader
        label="Our Blog"
        title="News Highlights"
        :centered="true"
      />

      <div v-if="loading" class="flex justify-center py-12">
        <div class="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>

      <div v-else-if="articles.length > 0" class="grid gap-8 md:grid-cols-3">
        <article
          v-for="article in articles"
          :key="article.id"
          class="group cursor-pointer rounded-3xl border border-slate-200 bg-white p-3 shadow-[0_20px_55px_-38px_rgba(15,23,42,0.32)] transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_26px_70px_-42px_rgba(15,23,42,0.36)]"
        >
          <div class="mb-5 overflow-hidden rounded-[1.4rem]">
            <img
              v-if="article.cover_image"
              :src="article.cover_image"
              :alt="article.title"
              class="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div v-else class="w-full h-48 bg-gray-200 flex items-center justify-center">
              <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
          </div>
          <h3 class="mb-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-secondary">
            {{ article.title }}
          </h3>
          <div class="flex items-center gap-4 text-sm text-gray-600">
            <span v-if="article.author_name" class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {{ article.author_name }}
            </span>
            <span class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ formatDate(article.created_at) }}
            </span>
          </div>
        </article>
      </div>

      <div v-else class="py-12 text-center text-gray-600">
        No news available
      </div>
    </div>
  </section>
</template>
