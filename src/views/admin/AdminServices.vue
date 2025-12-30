<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import DataTable from '@/components/admin/DataTable.vue'
import BaseButton from '@/components/base/BaseButton.vue'

const { t } = useI18n()

const columns = [
  { key: 'name', label: t('admin.services.columns.name') },
  { key: 'description', label: t('admin.services.columns.description') },
  { key: 'status', label: t('admin.services.columns.status') },
  { key: 'updatedAt', label: t('admin.services.columns.updatedAt') }
]

const services = ref([
  { id: 1, name: 'Road Freight', description: 'Reliable ground transportation across borders', status: 'Active', updatedAt: '2024-12-20' },
  { id: 2, name: 'Ocean Freight', description: 'Cost-effective sea shipping solutions', status: 'Active', updatedAt: '2024-12-18' },
  { id: 3, name: 'Air Freight', description: 'Express air cargo services worldwide', status: 'Active', updatedAt: '2024-12-15' },
  { id: 4, name: 'Rail Freight', description: 'Efficient rail transport for bulk cargo', status: 'Active', updatedAt: '2024-12-10' },
  { id: 5, name: 'Warehousing', description: 'Secure storage and distribution centers', status: 'Active', updatedAt: '2024-12-08' },
  { id: 6, name: 'Custom Clearance', description: 'Expert customs brokerage services', status: 'Draft', updatedAt: '2024-12-05' }
])

const handleEdit = (item: Record<string, unknown>) => {
  console.log('Edit:', item)
}

const handleDelete = (item: Record<string, unknown>) => {
  console.log('Delete:', item)
}
</script>

<template>
  <AdminLayout :title="t('admin.services.title')" :subtitle="t('admin.services.subtitle')">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-4">
        <div class="relative">
          <input 
            type="text" 
            :placeholder="t('admin.services.searchPlaceholder')"
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
        {{ t('admin.services.addNew') }}
      </BaseButton>
    </div>
    
    <DataTable 
      :columns="columns" 
      :data="services"
      @edit="handleEdit"
      @delete="handleDelete"
    >
      <template #cell-status="{ value }">
        <span 
          :class="[
            'px-3 py-1 rounded-full text-xs font-medium',
            value === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          ]"
        >
          {{ value }}
        </span>
      </template>
    </DataTable>
  </AdminLayout>
</template>
