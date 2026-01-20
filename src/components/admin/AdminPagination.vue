<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps<{
  currentPage: number
  totalCount: number
  hasNextPage: boolean
  hasPrevPage: boolean
}>()

const emit = defineEmits<{
  (e: 'page-change', page: number): void
}>()

const { t } = useI18n()
</script>

<template>
  <div class="flex items-center justify-between mt-6 px-2">
    <p class="text-sm text-gray-600">
      {{ t('admin.pagination.total', { count: totalCount }) }}
    </p>
    <div class="flex items-center gap-2">
      <button
        @click="emit('page-change', currentPage - 1)"
        :disabled="!hasPrevPage"
        :class="[
          'px-3 py-1.5 text-sm rounded-lg border transition-colors',
          hasPrevPage 
            ? 'border-gray-300 hover:bg-gray-50 text-gray-700' 
            : 'border-gray-200 text-gray-400 cursor-not-allowed'
        ]"
      >
        {{ t('admin.pagination.previous') }}
      </button>
      <span class="text-sm text-gray-600 px-2">
        {{ t('admin.pagination.pageNum', { page: currentPage }) }}
      </span>
      <button
        @click="emit('page-change', currentPage + 1)"
        :disabled="!hasNextPage"
        :class="[
          'px-3 py-1.5 text-sm rounded-lg border transition-colors',
          hasNextPage 
            ? 'border-gray-300 hover:bg-gray-50 text-gray-700' 
            : 'border-gray-200 text-gray-400 cursor-not-allowed'
        ]"
      >
        {{ t('admin.pagination.next') }}
      </button>
    </div>
  </div>
</template>
