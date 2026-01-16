<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import DataTable from '@/components/admin/DataTable.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import categoryService, { type Category, type CategoryInput } from '@/services/category'
import { useToast } from '@/composables/useToast'

const { t } = useI18n()
const toast = useToast()

const categories = ref<Category[]>([])
const allCategories = ref<Category[]>([])
const loading = ref(false)
const showModal = ref(false)
const editingCategory = ref<Category | null>(null)
const saving = ref(false)
const currentPage = ref(1)
const totalCount = ref(0)
const hasNextPage = ref(false)
const hasPrevPage = ref(false)

const form = ref<CategoryInput>({
  name: '',
  description: '',
  parent: null
})

const columns = computed(() => [
  { key: 'name', label: t('admin.categories.columns.name') },
  { key: 'slug', label: t('admin.categories.columns.slug') },
  { key: 'description', label: t('admin.categories.columns.description') },
  { key: 'updated_at', label: t('admin.categories.columns.updatedAt') }
])

const tableData = computed(() =>
  categories.value.map((cat) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    description: cat.description || '-',
    updated_at: new Date(cat.updated_at).toLocaleDateString()
  }))
)

const modalTitle = computed(() =>
  editingCategory.value ? t('admin.categories.editCategory') : t('admin.categories.addCategory')
)

async function fetchCategories(page = 1) {
  loading.value = true
  try {
    const response = await categoryService.list(page)
    categories.value = response.results
    totalCount.value = response.count
    hasNextPage.value = !!response.next
    hasPrevPage.value = !!response.previous
    currentPage.value = page
  } catch (err) {
    console.error('Failed to fetch categories:', err)
    toast.error(t('common.error'))
  } finally {
    loading.value = false
  }
}

async function fetchAllCategories() {
  try {
    allCategories.value = await categoryService.listAll()
  } catch (err) {
    console.error('Failed to fetch all categories:', err)
  }
}

function goToPage(page: number) {
  fetchCategories(page)
}

const showPagination = computed(() => hasNextPage.value || hasPrevPage.value)

function openAddModal() {
  editingCategory.value = null
  form.value = { name: '', description: '', parent: null }
  showModal.value = true
}

function handleEdit(item: Record<string, unknown>) {
  const category = categories.value.find((c) => c.id === item.id)
  if (category) {
    editingCategory.value = category
    form.value = {
      name: category.name,
      description: category.description || '',
      parent: category.parent
    }
    showModal.value = true
  }
}

async function handleDelete(item: Record<string, unknown>) {
  if (!confirm(t('admin.categories.confirmDelete'))) return
  try {
    await categoryService.delete(item.id as number)
    toast.success(t('common.deleted'))
    await fetchCategories(currentPage.value)
    await fetchAllCategories()
  } catch (err) {
    console.error('Failed to delete category:', err)
    toast.error(t('common.error'))
  }
}

async function handleSubmit() {
  if (!form.value.name.trim()) return
  saving.value = true
  try {
    if (editingCategory.value) {
      await categoryService.update(editingCategory.value.id, form.value)
    } else {
      await categoryService.create(form.value)
    }
    showModal.value = false
    toast.success(t('common.saved'))
    await fetchCategories(currentPage.value)
    await fetchAllCategories()
  } catch (err) {
    console.error('Failed to save category:', err)
    toast.error(t('common.error'))
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  fetchCategories()
  fetchAllCategories()
})
</script>

<template>
  <AdminLayout :title="t('admin.categories.title')" :subtitle="t('admin.categories.subtitle')">
    <div class="flex items-center justify-end mb-6">
      <BaseButton variant="secondary" size="sm" @click="openAddModal">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        {{ t('admin.categories.addNew') }}
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
    />

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
        <div class="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ modalTitle }}</h3>
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ t('admin.categories.form.name') }} *
              </label>
              <input
                v-model="form.name"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ t('admin.categories.form.parent') }}
              </label>
              <select
                v-model="form.parent"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              >
                <option :value="null">{{ t('admin.categories.form.noParent') }}</option>
                <option
                  v-for="cat in allCategories.filter(c => c.id !== editingCategory?.id)"
                  :key="cat.id"
                  :value="cat.id"
                >
                  {{ cat.name }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ t('admin.categories.form.description') }}
              </label>
              <textarea
                v-model="form.description"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none"
              ></textarea>
            </div>
            <div class="flex justify-end gap-3 pt-4">
              <BaseButton type="button" variant="outline" size="sm" @click="showModal = false">
                {{ t('admin.categories.form.cancel') }}
              </BaseButton>
              <BaseButton type="submit" variant="secondary" size="sm" :disabled="saving">
                {{ saving ? t('admin.categories.form.saving') : t('admin.categories.form.save') }}
              </BaseButton>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </AdminLayout>
</template>
