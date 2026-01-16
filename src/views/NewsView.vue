<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionHeader from '@/components/base/SectionHeader.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseCard from '@/components/base/BaseCard.vue'
import CTASection from '@/components/sections/CTASection.vue'
import newsService, { type News } from '@/services/news'
import { useToast } from '@/composables/useToast'
import truckImage from '@/assets/images/semi_truck_on_highwa_08289769.jpg'

const { t } = useI18n()
const toast = useToast()

const articles = ref<News[]>([])
const featuredArticle = ref<News | null>(null)
const loading = ref(false)
const loadingMore = ref(false)
const currentPage = ref(1)
const hasMore = ref(false)


async function fetchFeatured() {
  try {
    featuredArticle.value = await newsService.getFeatured()
  } catch (err) {
    console.error('Failed to fetch featured news:', err)
  }
}

async function fetchNews(page = 1, append = false) {
  if (page === 1) {
    loading.value = true
  } else {
    loadingMore.value = true
  }
  try {
    const response = await newsService.list({ page, page_size: 6, is_featured: false })
    if (append) {
      articles.value = [...articles.value, ...response.results]
    } else {
      articles.value = response.results
    }
    hasMore.value = !!response.next
    currentPage.value = page
  } catch (err) {
    console.error('Failed to fetch news:', err)
    toast.error(t('common.error'))
  } finally {
    loading.value = false
    loadingMore.value = false
  }
}

function loadMore() {
  if (!loadingMore.value && hasMore.value) {
    fetchNews(currentPage.value + 1, true)
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(() => {
  fetchFeatured()
  fetchNews()
})
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
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">{{ t('news.pageTitle') }}</h1>
        <p class="text-white/70 text-lg max-w-2xl mx-auto">
          {{ t('news.pageSubtitle') }}
        </p>
      </div>
    </section>

    <div v-if="loading" class="py-20 text-center">
      <div class="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p class="mt-4 text-gray-600">{{ t('common.loading') }}</p>
    </div>

    <template v-else-if="articles.length > 0">
      <section v-if="featuredArticle" class="py-20 bg-white">
        <div class="container mx-auto px-6">
          <BaseCard :padding="'none'" :hover="true">
            <div class="grid lg:grid-cols-2">
              <div class="relative h-64 lg:h-auto">
                <img
                  v-if="featuredArticle.cover_image"
                  :src="featuredArticle.cover_image"
                  :alt="featuredArticle.title"
                  class="w-full h-full object-cover rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none"
                />
                <div v-else class="w-full h-full bg-gray-200 rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none flex items-center justify-center">
                  <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <div v-if="featuredArticle.is_featured" class="absolute top-4 left-4">
                  <span class="bg-secondary text-white text-xs px-3 py-1 rounded-full">
                    {{ t('news.featured') }}
                  </span>
                </div>
              </div>
              <div class="p-8 lg:p-12 flex flex-col justify-center">
                <span v-if="featuredArticle.category" class="text-secondary text-sm font-medium mb-2">
                  {{ featuredArticle.category.name }}
                </span>
                <h2 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">{{ featuredArticle.title }}</h2>
                <p class="text-gray-600 mb-6">{{ featuredArticle.excerpt }}</p>
                <div class="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <span v-if="featuredArticle.author_name">{{ featuredArticle.author_name }}</span>
                  <span v-if="featuredArticle.author_name">•</span>
                  <span>{{ formatDate(featuredArticle.created_at) }}</span>
                  <span v-if="featuredArticle.read_time">•</span>
                  <span v-if="featuredArticle.read_time">{{ featuredArticle.read_time }} min read</span>
                </div>
                <div>
                  <BaseButton variant="secondary">
                    {{ t('news.readArticle') }}
                  </BaseButton>
                </div>
              </div>
            </div>
          </BaseCard>
        </div>
      </section>

      <section class="py-20 bg-gray-50">
        <div class="container mx-auto px-6">
          <SectionHeader
            :label="t('news.latestArticles')"
            :title="t('news.industryNews')"
            :subtitle="t('news.industrySubtitle')"
          />

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <BaseCard
              v-for="article in articles"
              :key="article.id"
              :padding="'none'"
              :hover="true"
            >
              <div class="relative h-48 overflow-hidden rounded-t-2xl">
                <img
                  v-if="article.cover_image"
                  :src="article.cover_image"
                  :alt="article.title"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
                  <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <div v-if="article.category" class="absolute top-4 left-4">
                  <span class="bg-primary/80 text-white text-xs px-3 py-1 rounded-full">
                    {{ article.category.name }}
                  </span>
                </div>
              </div>
              <div class="p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{{ article.title }}</h3>
                <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ article.excerpt }}</p>
                <div class="flex items-center justify-between text-sm text-gray-500">
                  <span>{{ article.author_name || '-' }}</span>
                  <span v-if="article.read_time">{{ article.read_time }} min</span>
                </div>
              </div>
            </BaseCard>
          </div>

          <div v-if="hasMore" class="text-center mt-12">
            <BaseButton variant="secondary" size="lg" :disabled="loadingMore" @click="loadMore">
              <span v-if="loadingMore">{{ t('common.loadingMore') }}</span>
              <span v-else>{{ t('news.loadMore') }}</span>
            </BaseButton>
          </div>
        </div>
      </section>
    </template>

    <div v-else class="py-20 text-center">
      <p class="text-gray-600">{{ t('news.noArticles') }}</p>
    </div>

    <section class="py-20 bg-primary">
      <div class="container mx-auto px-6">
        <div class="max-w-2xl mx-auto text-center">
          <SectionHeader
            :label="t('news.newsletter')"
            :title="t('news.stayInformed')"
            :subtitle="t('news.newsletterSubtitle')"
            :light="true"
          />
          <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              :placeholder="t('news.enterEmail')"
              class="flex-1 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-secondary"
            />
            <BaseButton variant="secondary">
              {{ t('footer.subscribe') }}
            </BaseButton>
          </div>
        </div>
      </div>
    </section>

    <CTASection />
  </main>
</template>
