<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import SectionHeader from '@/components/base/SectionHeader.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseCard from '@/components/base/BaseCard.vue'
import CTASection from '@/components/sections/CTASection.vue'
import cargoImage from '@/assets/images/cargo_ship_container_77664e3d.jpg'
import truckImage from '@/assets/images/semi_truck_on_highwa_08289769.jpg'
import warehouseImage from '@/assets/images/warehouse_worker_wit_259b881f.jpg'
import yellowTruckImage from '@/assets/images/yellow_truck_transpo_661ef152.jpg'

const { t } = useI18n()

const featuredArticle = {
  titleKey: 'news.featuredTitle',
  excerptKey: 'news.featuredExcerpt',
  author: 'Sarah Mitchell',
  date: 'December 28, 2024',
  category: 'Sustainability',
  image: cargoImage,
  readTime: '8 min read'
}

const articles = [
  {
    id: 1,
    titleKey: 'news.article1Title',
    excerptKey: 'news.article1Excerpt',
    author: 'Hamish Slavit',
    date: 'December 24, 2024',
    category: 'Warehousing',
    image: warehouseImage,
    readTime: '5 min read'
  },
  {
    id: 2,
    titleKey: 'news.article2Title',
    excerptKey: 'news.article2Excerpt',
    author: 'Kylie Brown',
    date: 'December 22, 2024',
    category: 'Air Freight',
    image: yellowTruckImage,
    readTime: '4 min read'
  },
  {
    id: 3,
    titleKey: 'news.article3Title',
    excerptKey: 'news.article3Excerpt',
    author: 'Zayn Ghani',
    date: 'December 20, 2024',
    category: 'Operations',
    image: truckImage,
    readTime: '6 min read'
  },
  {
    id: 4,
    titleKey: 'news.article4Title',
    excerptKey: 'news.article4Excerpt',
    author: 'Emma Watson',
    date: 'December 18, 2024',
    category: 'Technology',
    image: cargoImage,
    readTime: '7 min read'
  },
  {
    id: 5,
    titleKey: 'news.article5Title',
    excerptKey: 'news.article5Excerpt',
    author: 'Michael Chen',
    date: 'December 15, 2024',
    category: 'Industry',
    image: warehouseImage,
    readTime: '5 min read'
  },
  {
    id: 6,
    titleKey: 'news.article6Title',
    excerptKey: 'news.article6Excerpt',
    author: 'Lisa Park',
    date: 'December 12, 2024',
    category: 'Technology',
    image: yellowTruckImage,
    readTime: '4 min read'
  }
]

const categories = ['All', 'Technology', 'Sustainability', 'Operations', 'Industry', 'Warehousing']
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

    <section class="py-20 bg-white">
      <div class="container mx-auto px-6">
        <BaseCard :padding="'none'" :hover="true">
          <div class="grid lg:grid-cols-2">
            <div class="relative h-64 lg:h-auto">
              <img
                :src="featuredArticle.image"
                :alt="t(featuredArticle.titleKey)"
                class="w-full h-full object-cover rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none"
              />
              <div class="absolute top-4 left-4">
                <span class="bg-secondary text-white text-xs px-3 py-1 rounded-full">
                  {{ t('news.featured') }}
                </span>
              </div>
            </div>
            <div class="p-8 lg:p-12 flex flex-col justify-center">
              <span class="text-secondary text-sm font-medium mb-2">{{ featuredArticle.category }}</span>
              <h2 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">{{ t(featuredArticle.titleKey) }}</h2>
              <p class="text-gray-600 mb-6">{{ t(featuredArticle.excerptKey) }}</p>
              <div class="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <span>{{ featuredArticle.author }}</span>
                <span>•</span>
                <span>{{ featuredArticle.date }}</span>
                <span>•</span>
                <span>{{ featuredArticle.readTime }}</span>
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

        <div class="flex flex-wrap justify-center gap-3 mb-12">
          <button
            v-for="category in categories"
            :key="category"
            class="px-6 py-2 rounded-full text-sm font-medium transition-all bg-white text-gray-600 hover:bg-secondary hover:text-white shadow-sm"
          >
            {{ category }}
          </button>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <BaseCard
            v-for="article in articles"
            :key="article.id"
            :padding="'none'"
            :hover="true"
          >
            <div class="relative h-48 overflow-hidden rounded-t-2xl">
              <img
                :src="article.image"
                :alt="t(article.titleKey)"
                class="w-full h-full object-cover"
              />
              <div class="absolute top-4 left-4">
                <span class="bg-primary/80 text-white text-xs px-3 py-1 rounded-full">
                  {{ article.category }}
                </span>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{{ t(article.titleKey) }}</h3>
              <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ t(article.excerptKey) }}</p>
              <div class="flex items-center justify-between text-sm text-gray-500">
                <span>{{ article.author }}</span>
                <span>{{ article.readTime }}</span>
              </div>
            </div>
          </BaseCard>
        </div>

        <div class="text-center mt-12">
          <BaseButton variant="secondary" size="lg">
            {{ t('news.loadMore') }}
          </BaseButton>
        </div>
      </div>
    </section>

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
