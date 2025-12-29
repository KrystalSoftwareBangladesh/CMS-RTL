<script setup lang="ts">
import SectionHeader from '@/components/base/SectionHeader.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseCard from '@/components/base/BaseCard.vue'
import CTASection from '@/components/sections/CTASection.vue'
import cargoImage from '@/assets/images/cargo_ship_container_77664e3d.jpg'
import truckImage from '@/assets/images/semi_truck_on_highwa_08289769.jpg'
import warehouseImage from '@/assets/images/warehouse_worker_wit_259b881f.jpg'
import yellowTruckImage from '@/assets/images/yellow_truck_transpo_661ef152.jpg'

const featuredArticle = {
  title: 'The Future of Sustainable Logistics: Green Transportation Solutions',
  excerpt: 'Discover how the logistics industry is transforming with eco-friendly practices, electric vehicles, and carbon-neutral shipping options that are reshaping global trade.',
  author: 'Sarah Mitchell',
  date: 'December 28, 2024',
  category: 'Sustainability',
  image: cargoImage,
  readTime: '8 min read'
}

const articles = [
  {
    id: 1,
    title: 'New Design for Cargo and Warehouse Optimization',
    excerpt: 'Innovative warehouse layouts are revolutionizing storage efficiency and reducing operational costs.',
    author: 'Hamish Slavit',
    date: 'December 24, 2024',
    category: 'Warehousing',
    image: warehouseImage,
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'Outports Launches 10 New Charter Flights',
    excerpt: 'Expanding air freight capacity to meet growing demand for time-sensitive deliveries.',
    author: 'Kylie Brown',
    date: 'December 22, 2024',
    category: 'Air Freight',
    image: yellowTruckImage,
    readTime: '4 min read'
  },
  {
    id: 3,
    title: 'How to Guarantee Transport Transit Time',
    excerpt: 'Best practices for ensuring on-time deliveries and managing customer expectations.',
    author: 'Zayn Ghani',
    date: 'December 20, 2024',
    category: 'Operations',
    image: truckImage,
    readTime: '6 min read'
  },
  {
    id: 4,
    title: 'Digital Transformation in Supply Chain Management',
    excerpt: 'How AI and IoT are revolutionizing logistics tracking and inventory management.',
    author: 'Emma Watson',
    date: 'December 18, 2024',
    category: 'Technology',
    image: cargoImage,
    readTime: '7 min read'
  },
  {
    id: 5,
    title: 'Global Shipping Trends for 2025',
    excerpt: 'Key predictions and market insights for the upcoming year in international logistics.',
    author: 'Michael Chen',
    date: 'December 15, 2024',
    category: 'Industry',
    image: warehouseImage,
    readTime: '5 min read'
  },
  {
    id: 6,
    title: 'Last-Mile Delivery Innovations',
    excerpt: 'New technologies and strategies improving the final leg of the delivery journey.',
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
    <section class="relative py-32 bg-slate-800">
      <div
        class="absolute inset-0 bg-cover bg-center bg-no-repeat"
        :style="{ backgroundImage: `url(${truckImage})` }"
      >
        <div class="absolute inset-0 bg-slate-900/80"></div>
      </div>
      <div class="relative z-10 container mx-auto px-6 text-center">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">News & Insights</h1>
        <p class="text-white/70 text-lg max-w-2xl mx-auto">
          Stay updated with the latest trends, insights, and updates from the logistics industry
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
                :alt="featuredArticle.title"
                class="w-full h-full object-cover rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none"
              />
              <div class="absolute top-4 left-4">
                <span class="bg-teal-500 text-white text-xs px-3 py-1 rounded-full">
                  Featured
                </span>
              </div>
            </div>
            <div class="p-8 lg:p-12 flex flex-col justify-center">
              <span class="text-teal-500 text-sm font-medium mb-2">{{ featuredArticle.category }}</span>
              <h2 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">{{ featuredArticle.title }}</h2>
              <p class="text-gray-600 mb-6">{{ featuredArticle.excerpt }}</p>
              <div class="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <span>{{ featuredArticle.author }}</span>
                <span>•</span>
                <span>{{ featuredArticle.date }}</span>
                <span>•</span>
                <span>{{ featuredArticle.readTime }}</span>
              </div>
              <div>
                <BaseButton variant="secondary">
                  Read Article
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
          label="Latest Articles"
          title="Industry News & Updates"
          subtitle="Explore our latest insights on logistics, technology, and industry trends."
        />

        <div class="flex flex-wrap justify-center gap-3 mb-12">
          <button
            v-for="category in categories"
            :key="category"
            class="px-6 py-2 rounded-full text-sm font-medium transition-all bg-white text-gray-600 hover:bg-teal-500 hover:text-white shadow-sm"
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
                :alt="article.title"
                class="w-full h-full object-cover"
              />
              <div class="absolute top-4 left-4">
                <span class="bg-slate-800/80 text-white text-xs px-3 py-1 rounded-full">
                  {{ article.category }}
                </span>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{{ article.title }}</h3>
              <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ article.excerpt }}</p>
              <div class="flex items-center justify-between text-sm text-gray-500">
                <span>{{ article.author }}</span>
                <span>{{ article.readTime }}</span>
              </div>
            </div>
          </BaseCard>
        </div>

        <div class="text-center mt-12">
          <BaseButton variant="secondary" size="lg">
            Load More Articles
          </BaseButton>
        </div>
      </div>
    </section>

    <section class="py-20 bg-slate-800">
      <div class="container mx-auto px-6">
        <div class="max-w-2xl mx-auto text-center">
          <SectionHeader
            label="Newsletter"
            title="Stay Informed"
            subtitle="Subscribe to our newsletter for the latest logistics news and insights delivered to your inbox."
            :light="true"
          />
          <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              class="flex-1 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-teal-500"
            />
            <BaseButton variant="secondary">
              Subscribe
            </BaseButton>
          </div>
        </div>
      </div>
    </section>

    <CTASection />
  </main>
</template>
