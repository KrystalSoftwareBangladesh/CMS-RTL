<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import DataTable from '@/components/admin/DataTable.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import faqService, { type FAQ, type FAQInput } from '@/services/faq'
import categoryService, { type Category } from '@/services/category'

const { t } = useI18n()

const faqs = ref<FAQ[]>([])
const categories = ref<Category[]>([])
const loading = ref(false)
const showModal = ref(false)
const editingFaq = ref<FAQ | null>(null)
const saving = ref(false)
const currentPage = ref(1)
const totalCount = ref(0)
const hasNextPage = ref(false)
const hasPrevPage = ref(false)

const form = ref<FAQInput>({
  question: '',
  answer: '',
  category: undefined,
  order: 1,
  status: true
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
  editingFaq.value ? t('admin.faq.editQuestion') : t('admin.faq.addQuestion')
)

const showPagination = computed(() => hasNextPage.value || hasPrevPage.value)

async function fetchFaqs(page = 1) {
  loading.value = true
  try {
    const response = await faqService.list({ page })
    faqs.value = response.results
    totalCount.value = response.count
    hasNextPage.value = !!response.next
    hasPrevPage.value = !!response.previous
    currentPage.value = page
  } catch (err) {
    console.error('Failed to fetch FAQs:', err)
  } finally {
    loading.value = false
  }
}

async function fetchCategories() {
  try {
    categories.value = await categoryService.listAll()
  } catch (err) {
    console.error('Failed to fetch categories:', err)
  }
}

function goToPage(page: number) {
  fetchFaqs(page)
}

function openAddModal() {
  editingFaq.value = null
  form.value = { question: '', answer: '', category: undefined, order: 1, status: true }
  showModal.value = true
}

function handleEdit(item: Record<string, unknown>) {
  const faq = faqs.value.find((f) => f.id === item.id)
  if (faq) {
    editingFaq.value = faq
    form.value = {
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      order: faq.order,
      status: faq.status
    }
    showModal.value = true
  }
}

async function handleDelete(item: Record<string, unknown>) {
  if (!confirm(t('admin.faq.confirmDelete'))) return
  try {
    await faqService.delete(item.id as number)
    await fetchFaqs(currentPage.value)
  } catch (err) {
    console.error('Failed to delete FAQ:', err)
  }
}

async function handleSubmit() {
  if (!form.value.question.trim() || !form.value.answer.trim()) return
  saving.value = true
  try {
    const payload: FAQInput = {
      question: form.value.question,
      answer: form.value.answer,
      order: form.value.order,
      status: form.value.status
    }
    if (form.value.category) {
      payload.category = form.value.category
    }
    if (editingFaq.value) {
      await faqService.update(editingFaq.value.id, payload)
    } else {
      await faqService.create(payload)
    }
    showModal.value = false
    await fetchFaqs(currentPage.value)
  } catch (err) {
    console.error('Failed to save FAQ:', err)
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  fetchFaqs()
  fetchCategories()
})
</script>

<template>
  <AdminLayout :title="t('admin.faq.title')" :subtitle="t('admin.faq.subtitle')">
    <div class="flex items-center justify-end mb-6">
      <BaseButton variant="secondary" size="sm" @click="openAddModal">
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
      @edit="handleEdit"
      @delete="handleDelete"
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

    <div v-if="!loading && showPagination" class="flex items-center justify-between mt-6 px-2">
      <p class="text-sm text-gray-600">
        {{ t('admin.pagination.total', { count: totalCount }) }}
      </p>
      <div class="flex items-center gap-2">
        <button
          @click="goToPage(currentPage - 1)"
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
          @click="goToPage(currentPage + 1)"
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

    <Teleport to="body">
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        @click.self="showModal = false"
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
              <BaseButton type="button" variant="outline" size="sm" @click="showModal = false">
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
