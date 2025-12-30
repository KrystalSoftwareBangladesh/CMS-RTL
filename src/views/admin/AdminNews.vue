<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import DataTable from '@/components/admin/DataTable.vue'
import BaseButton from '@/components/base/BaseButton.vue'

const { t } = useI18n()

const columns = computed(() => [
  { key: 'title', label: t('admin.news.columns.title') },
  { key: 'category', label: t('admin.news.columns.category') },
  { key: 'author', label: t('admin.news.columns.author') },
  { key: 'status', label: t('admin.news.columns.status') },
  { key: 'publishedAt', label: t('admin.news.columns.publishedAt') }
])

const articles = ref([
  { id: 1, title: 'The Future of Sustainable Logistics', category: 'Sustainability', author: 'Admin', status: 'Published', publishedAt: '2024-12-20' },
  { id: 2, title: 'Digital Transformation in Supply Chain', category: 'Technology', author: 'Admin', status: 'Published', publishedAt: '2024-12-18' },
  { id: 3, title: 'Global Trade Trends 2025', category: 'Industry', author: 'Admin', status: 'Published', publishedAt: '2024-12-15' },
  { id: 4, title: 'Rising Trading Expands Operations', category: 'Company', author: 'Admin', status: 'Draft', publishedAt: '-' },
  { id: 5, title: 'Best Practices for Cold Chain Logistics', category: 'Operations', author: 'Admin', status: 'Published', publishedAt: '2024-12-10' }
])

const handleEdit = (item: Record<string, unknown>) => {
  console.log('Edit:', item)
}

const handleDelete = (item: Record<string, unknown>) => {
  console.log('Delete:', item)
}
</script>

<template>
  <AdminLayout :title="t('admin.news.title')" :subtitle="t('admin.news.subtitle')">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-4">
        <div class="relative">
          <input 
            type="text" 
            :placeholder="t('admin.news.searchPlaceholder')"
            class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none w-64"
          />
          <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <select class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none">
          <option value="">{{ t('admin.news.allCategories') }}</option>
          <option value="sustainability">Sustainability</option>
          <option value="technology">Technology</option>
          <option value="industry">Industry</option>
          <option value="company">Company</option>
        </select>
      </div>
      <BaseButton variant="secondary" size="sm">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        {{ t('admin.news.addNew') }}
      </BaseButton>
    </div>
    
    <DataTable 
      :columns="columns" 
      :data="articles"
      @edit="handleEdit"
      @delete="handleDelete"
    >
      <template #cell-status="{ value }">
        <span 
          :class="[
            'px-3 py-1 rounded-full text-xs font-medium',
            (value as string) === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          ]"
        >
          {{ value }}
        </span>
      </template>
    </DataTable>
  </AdminLayout>
</template>
