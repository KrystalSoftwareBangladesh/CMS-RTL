<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import DataTable from '@/components/admin/DataTable.vue'
import AdminPagination from '@/components/admin/AdminPagination.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import faqService, { type FAQ, type FAQInput } from '@/services/faq'
import categoryService, { type Category } from '@/services/category'
import { useAdminResource } from '@/composables/useAdminResource'

const { t } = useI18n()

const categories = ref<Category[]>([])

const {
  items: faqs,
  loading,
  saving,
  showModal,
  form,
  currentPage,
  totalCount,
  hasNextPage,
  hasPrevPage,
  isEditing,
  showPagination,
  fetchItems: fetchFaqs,
  goToPage,
  openCreate,
  openEdit,
  closeModal,
  handleSave,
  handleDelete
} = useAdminResource<FAQ, FAQInput>({
  service: faqService,
  getItemId: (item) => item.id,
  getDefaultForm: () => ({ question: '', answer: '', category: undefined, order: 1, status: true }),
  itemToForm: (item) => ({
    question: item.question,
    answer: item.answer,
    category: item.category,
    order: item.order,
    status: item.status
  }),
  confirmDeleteKey: 'admin.faq.confirmDelete'
})

const columns = computed(() => [
  { key: 'question', label: t('admin.faq.columns.question') },
  { key: 'category_name', label: t('admin.faq.columns.category') },
  { key: 'order', label: t('admin.faq.columns.order') },
  { key: 'status', label: t('admin.faq.columns.status') }
])

const tableData = computed(() =>
  faqs.value.map((faq) => {
    const category = categories.value.find(c => c.id === faq.category)
    return {
      id: faq.id,
      question: faq.question,
      category_name: category?.name || '-',
      order: faq.order,
      status: faq.status ? t('admin.faq.published') : t('admin.faq.draft')
    }
  })
)

const modalTitle = computed(() =>
  isEditing.value ? t('admin.faq.editQuestion') : t('admin.faq.addQuestion')
)

async function fetchCategories() {
  try {
    categories.value = await categoryService.listAll()
  } catch (err) {
    console.error('Failed to fetch categories:', err)
  }
}

function handleEditRow(item: Record<string, unknown>) {
  const faq = faqs.value.find((f) => f.id === item.id)
  if (faq) openEdit(faq)
}

async function handleDeleteRow(item: Record<string, unknown>) {
  const faq = faqs.value.find((f) => f.id === item.id)
  if (faq) await handleDelete(faq)
}

async function handleSubmit() {
  if (!form.value.question.trim() || !form.value.answer.trim()) return
  await handleSave()
}

onMounted(() => {
  fetchFaqs()
  fetchCategories()
})
</script>

<template>
  <AdminLayout :title="t('admin.faq.title')" :subtitle="t('admin.faq.subtitle')">
    <div class="flex items-center justify-end mb-6">
      <BaseButton variant="secondary" size="sm" @click="openCreate">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        {{ t('admin.faq.addNew') }}
      </BaseButton>
    </div>

    <div v-if="loading" class="text-center py-8 text-gray-500">
      {{ t('admin.table.loading') }}
    </div>

    <DataTable
      v-else
      :columns="columns"
      :data="tableData"
      @edit="handleEditRow"
      @delete="handleDeleteRow"
    >
      <template #cell-question="{ value }">
        <span class="font-medium">{{ value }}</span>
      </template>
      <template #cell-category_name="{ value }">
        <span v-if="value !== '-'" class="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
          {{ value }}
        </span>
        <span v-else class="text-gray-400">{{ value }}</span>
      </template>
      <template #cell-status="{ value }">
        <span :class="[
          'px-3 py-1 rounded-full text-xs font-medium',
          value === t('admin.faq.published') ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
        ]">
          {{ value }}
        </span>
      </template>
    </DataTable>

    <AdminPagination
      v-if="!loading && showPagination"
      :current-page="currentPage"
      :total-count="totalCount"
      :has-next-page="hasNextPage"
      :has-prev-page="hasPrevPage"
      @page-change="goToPage"
    />

    <Teleport to="body">
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        @click.self="closeModal"
      >
        <div class="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ modalTitle }}</h3>
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ t('admin.faq.form.question') }} *
              </label>
              <input
                v-model="form.question"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ t('admin.faq.form.answer') }} *
              </label>
              <textarea
                v-model="form.answer"
                rows="4"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none"
              ></textarea>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t('admin.faq.form.category') }}
                </label>
                <select
                  v-model="form.category"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                >
                  <option :value="undefined">{{ t('admin.faq.form.noCategory') }}</option>
                  <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                    {{ cat.name }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t('admin.faq.form.order') }}
                </label>
                <input
                  v-model.number="form.order"
                  type="number"
                  min="1"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                />
              </div>
            </div>
            <div class="flex items-center gap-2">
              <input
                type="checkbox"
                id="status"
                v-model="form.status"
                class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <label for="status" class="text-sm font-medium text-gray-700">
                {{ t('admin.faq.form.published') }}
              </label>
            </div>
            <div class="flex justify-end gap-3 pt-4">
              <BaseButton type="button" variant="outline" size="sm" @click="closeModal">
                {{ t('admin.faq.form.cancel') }}
              </BaseButton>
              <BaseButton type="submit" variant="secondary" size="sm" :disabled="saving">
                {{ saving ? t('admin.faq.form.saving') : t('admin.faq.form.save') }}
              </BaseButton>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </AdminLayout>
</template>
