<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BaseCard from '@/components/base/BaseCard.vue'

interface Column {
  key: string
  label: string
  sortable?: boolean
}

interface Props {
  columns: Column[]
  data: Record<string, unknown>[]
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  loading: false
})

const { t } = useI18n()

defineEmits<{
  (e: 'edit', item: Record<string, unknown>): void
  (e: 'delete', item: Record<string, unknown>): void
}>()
</script>

<template>
  <BaseCard padding="none">
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th 
              v-for="column in columns" 
              :key="column.key"
              class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
            >
              {{ column.label }}
            </th>
            <th class="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {{ t('admin.table.actions') }}
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-if="loading" class="animate-pulse">
            <td :colspan="columns.length + 1" class="px-6 py-8 text-center text-gray-500">
              {{ t('admin.table.loading') }}
            </td>
          </tr>
          <tr v-else-if="data.length === 0">
            <td :colspan="columns.length + 1" class="px-6 py-8 text-center text-gray-500">
              {{ t('admin.table.noData') }}
            </td>
          </tr>
          <tr 
            v-else
            v-for="(item, index) in data" 
            :key="index"
            class="hover:bg-gray-50 transition-colors"
          >
            <td 
              v-for="column in columns" 
              :key="column.key"
              class="px-6 py-4 text-sm text-gray-900"
            >
              <slot :name="`cell-${column.key}`" :item="item" :value="item[column.key]">
                {{ item[column.key] }}
              </slot>
            </td>
            <td class="px-6 py-4 text-right">
              <div class="flex items-center justify-end gap-2">
                <button 
                  @click="$emit('edit', item)"
                  class="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button 
                  @click="$emit('delete', item)"
                  class="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </BaseCard>
</template>
