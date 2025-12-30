<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import DataTable from '@/components/admin/DataTable.vue'
import BaseButton from '@/components/base/BaseButton.vue'

const { t } = useI18n()

const columns = computed(() => [
  { key: 'question', label: t('admin.faq.columns.question') },
  { key: 'category', label: t('admin.faq.columns.category') },
  { key: 'order', label: t('admin.faq.columns.order') },
  { key: 'status', label: t('admin.faq.columns.status') }
])

const faqs = ref([
  { id: 1, question: 'What shipping methods do you offer?', category: 'Shipping', order: 1, status: 'Published' },
  { id: 2, question: 'How can I track my shipment?', category: 'Tracking', order: 2, status: 'Published' },
  { id: 3, question: 'What countries do you ship to?', category: 'Shipping', order: 3, status: 'Published' },
  { id: 4, question: 'How are shipping costs calculated?', category: 'Pricing', order: 4, status: 'Published' },
  { id: 5, question: 'What if my shipment is delayed or damaged?', category: 'Support', order: 5, status: 'Published' }
])

const handleEdit = (item: Record<string, unknown>) => {
  console.log('Edit:', item)
}

const handleDelete = (item: Record<string, unknown>) => {
  console.log('Delete:', item)
}
</script>

<template>
  <AdminLayout :title="t('admin.faq.title')" :subtitle="t('admin.faq.subtitle')">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-4">
        <div class="relative">
          <input 
            type="text" 
            :placeholder="t('admin.faq.searchPlaceholder')"
            class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none w-64"
          />
          <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <select class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none">
          <option value="">{{ t('admin.faq.allCategories') }}</option>
          <option value="shipping">Shipping</option>
          <option value="tracking">Tracking</option>
          <option value="pricing">Pricing</option>
          <option value="support">Support</option>
        </select>
      </div>
      <BaseButton variant="secondary" size="sm">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        {{ t('admin.faq.addNew') }}
      </BaseButton>
    </div>
    
    <DataTable 
      :columns="columns" 
      :data="faqs"
      @edit="handleEdit"
      @delete="handleDelete"
    >
      <template #cell-question="{ value }">
        <span class="font-medium">{{ value }}</span>
      </template>
      <template #cell-category="{ value }">
        <span class="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
          {{ value }}
        </span>
      </template>
      <template #cell-status="{ value }">
        <span class="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {{ value }}
        </span>
      </template>
    </DataTable>
  </AdminLayout>
</template>
