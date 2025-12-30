<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import DataTable from '@/components/admin/DataTable.vue'
import BaseButton from '@/components/base/BaseButton.vue'

const { t } = useI18n()

const columns = computed(() => [
  { key: 'title', label: t('admin.projects.columns.title') },
  { key: 'category', label: t('admin.projects.columns.category') },
  { key: 'deliveries', label: t('admin.projects.columns.deliveries') },
  { key: 'countries', label: t('admin.projects.columns.countries') },
  { key: 'status', label: t('admin.projects.columns.status') }
])

const projects = ref([
  { id: 1, title: 'Global Supply Chain Optimization', category: 'Logistics', deliveries: '50,000+', countries: 12, status: 'Active' },
  { id: 2, title: 'E-commerce Fulfillment Network', category: 'E-commerce', deliveries: '100,000+', countries: 8, status: 'Active' },
  { id: 3, title: 'Cold Chain Distribution', category: 'Food & Beverage', deliveries: '25,000+', countries: 5, status: 'Active' },
  { id: 4, title: 'Automotive Parts Logistics', category: 'Automotive', deliveries: '75,000+', countries: 15, status: 'Active' },
  { id: 5, title: 'Pharmaceutical Distribution', category: 'Healthcare', deliveries: '30,000+', countries: 10, status: 'Completed' },
  { id: 6, title: 'Textile Import Operations', category: 'Textiles', deliveries: '40,000+', countries: 6, status: 'Active' }
])

const handleEdit = (item: Record<string, unknown>) => {
  console.log('Edit:', item)
}

const handleDelete = (item: Record<string, unknown>) => {
  console.log('Delete:', item)
}
</script>

<template>
  <AdminLayout :title="t('admin.projects.title')" :subtitle="t('admin.projects.subtitle')">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-4">
        <div class="relative">
          <input 
            type="text" 
            :placeholder="t('admin.projects.searchPlaceholder')"
            class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none w-64"
          />
          <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <select class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none">
          <option value="">{{ t('admin.projects.allCategories') }}</option>
          <option value="logistics">Logistics</option>
          <option value="ecommerce">E-commerce</option>
          <option value="food">Food & Beverage</option>
          <option value="automotive">Automotive</option>
        </select>
      </div>
      <BaseButton variant="secondary" size="sm">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        {{ t('admin.projects.addNew') }}
      </BaseButton>
    </div>
    
    <DataTable 
      :columns="columns" 
      :data="projects"
      @edit="handleEdit"
      @delete="handleDelete"
    >
      <template #cell-status="{ value }">
        <span 
          :class="[
            'px-3 py-1 rounded-full text-xs font-medium',
            value === 'Active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
          ]"
        >
          {{ value }}
        </span>
      </template>
    </DataTable>
  </AdminLayout>
</template>
