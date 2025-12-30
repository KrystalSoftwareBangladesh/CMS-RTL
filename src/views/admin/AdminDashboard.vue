<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import StatCard from '@/components/admin/StatCard.vue'
import BaseCard from '@/components/base/BaseCard.vue'

const { t } = useI18n()

const stats = [
  { title: 'admin.dashboard.totalServices', value: '12', change: '+2 this month', changeType: 'positive' as const, icon: 'services' },
  { title: 'admin.dashboard.totalProjects', value: '48', change: '+5 this month', changeType: 'positive' as const, icon: 'projects' },
  { title: 'admin.dashboard.newsArticles', value: '24', change: '+3 this week', changeType: 'positive' as const, icon: 'news' },
  { title: 'admin.dashboard.pageViews', value: '12.5K', change: '+12% vs last month', changeType: 'positive' as const, icon: 'views' }
]

const recentActivity = [
  { action: 'New project added', item: 'Global Supply Chain Optimization', time: '2 hours ago' },
  { action: 'News article published', item: 'The Future of Sustainable Logistics', time: '5 hours ago' },
  { action: 'Testimonial updated', item: 'Michael Chen review', time: '1 day ago' },
  { action: 'Service modified', item: 'Ocean Freight', time: '2 days ago' },
  { action: 'FAQ added', item: 'What shipping methods...', time: '3 days ago' }
]
</script>

<template>
  <AdminLayout :title="t('admin.dashboard.title')" :subtitle="t('admin.dashboard.subtitle')">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        v-for="stat in stats"
        :key="stat.title"
        :title="t(stat.title)"
        :value="stat.value"
        :change="stat.change"
        :change-type="stat.changeType"
        :icon="stat.icon"
      />
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <BaseCard padding="lg" class="lg:col-span-2">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900">{{ t('admin.dashboard.recentActivity') }}</h3>
          <button class="text-sm text-secondary hover:text-secondary-dark font-medium">
            {{ t('admin.dashboard.viewAll') }}
          </button>
        </div>
        <div class="space-y-4">
          <div 
            v-for="(activity, index) in recentActivity" 
            :key="index"
            class="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">{{ activity.action }}</p>
              <p class="text-sm text-gray-500">{{ activity.item }}</p>
            </div>
            <span class="text-xs text-gray-400">{{ activity.time }}</span>
          </div>
        </div>
      </BaseCard>
      
      <BaseCard padding="lg">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">{{ t('admin.dashboard.quickActions') }}</h3>
        <div class="space-y-3">
          <button class="w-full flex items-center gap-3 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors text-left">
            <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span class="text-sm font-medium text-gray-700">{{ t('admin.dashboard.addService') }}</span>
          </button>
          <button class="w-full flex items-center gap-3 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors text-left">
            <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span class="text-sm font-medium text-gray-700">{{ t('admin.dashboard.addNews') }}</span>
          </button>
          <button class="w-full flex items-center gap-3 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors text-left">
            <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span class="text-sm font-medium text-gray-700">{{ t('admin.dashboard.addProject') }}</span>
          </button>
          <button class="w-full flex items-center gap-3 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors text-left">
            <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span class="text-sm font-medium text-gray-700">{{ t('admin.dashboard.settings') }}</span>
          </button>
        </div>
      </BaseCard>
    </div>
  </AdminLayout>
</template>
