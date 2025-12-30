<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import DataTable from '@/components/admin/DataTable.vue'
import BaseButton from '@/components/base/BaseButton.vue'

const { t } = useI18n()

const columns = [
  { key: 'name', label: t('admin.testimonials.columns.name') },
  { key: 'company', label: t('admin.testimonials.columns.company') },
  { key: 'rating', label: t('admin.testimonials.columns.rating') },
  { key: 'status', label: t('admin.testimonials.columns.status') },
  { key: 'createdAt', label: t('admin.testimonials.columns.createdAt') }
]

const testimonials = ref([
  { id: 1, name: 'Michael Chen', company: 'Tech Innovations Ltd.', rating: 5, status: 'Published', createdAt: '2024-12-18' },
  { id: 2, name: 'Sarah Johnson', company: 'Global Retail Inc.', rating: 5, status: 'Published', createdAt: '2024-12-15' },
  { id: 3, name: 'Ahmed Hassan', company: 'Middle East Trading', rating: 4, status: 'Published', createdAt: '2024-12-10' },
  { id: 4, name: 'Lisa Wang', company: 'Pacific Imports', rating: 5, status: 'Pending', createdAt: '2024-12-08' },
  { id: 5, name: 'Roberto Silva', company: 'South American Exports', rating: 4, status: 'Published', createdAt: '2024-12-05' }
])

const handleEdit = (item: Record<string, unknown>) => {
  console.log('Edit:', item)
}

const handleDelete = (item: Record<string, unknown>) => {
  console.log('Delete:', item)
}
</script>

<template>
  <AdminLayout :title="t('admin.testimonials.title')" :subtitle="t('admin.testimonials.subtitle')">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-4">
        <div class="relative">
          <input 
            type="text" 
            :placeholder="t('admin.testimonials.searchPlaceholder')"
            class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none w-64"
          />
          <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      <BaseButton variant="secondary" size="sm">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        {{ t('admin.testimonials.addNew') }}
      </BaseButton>
    </div>
    
    <DataTable 
      :columns="columns" 
      :data="testimonials"
      @edit="handleEdit"
      @delete="handleDelete"
    >
      <template #cell-rating="{ value }">
        <div class="flex items-center gap-1">
          <svg v-for="i in 5" :key="i" class="w-4 h-4" :class="i <= value ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
      </template>
      <template #cell-status="{ value }">
        <span 
          :class="[
            'px-3 py-1 rounded-full text-xs font-medium',
            value === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          ]"
        >
          {{ value }}
        </span>
      </template>
    </DataTable>
  </AdminLayout>
</template>
