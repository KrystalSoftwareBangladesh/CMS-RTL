<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import DataTable from '@/components/admin/DataTable.vue'
import AdminPagination from '@/components/admin/AdminPagination.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import categoryService, { type Category, type CategoryInput } from '@/services/category'
import { useAdminResource } from '@/composables/useAdminResource'

const { t } = useI18n()

const allCategories = ref<Category[]>([])

const {
  items: categories,
  loading,
  saving,
  showModal,
  editingItem: editingCategory,
  form,
  currentPage,
  totalCount,
  hasNextPage,
  hasPrevPage,
  isEditing,
  showPagination,
  fetchItems: fetchCategories,
  goToPage,
  openCreate: baseOpenCreate,
  openEdit: baseOpenEdit,
  closeModal,
  handleSave: baseHandleSave,
  handleDelete: baseHandleDelete
} = useAdminResource<Category, CategoryInput>({
  service: categoryService,
  getItemId: (item) => item.id,
  getDefaultForm: () => ({ name: '', description: '', parent: null }),
  itemToForm: (item) => ({
    name: item.name,
    description: item.description || '',
    parent: item.parent
  }),
  confirmDeleteKey: 'admin.categories.confirmDelete'
})

async function fetchAllCategories() {
  try {
    allCategories.value = await categoryService.listAll()
  } catch (err) {
    console.error('Failed to fetch all categories:', err)
  }
}

function openCreate() {
  baseOpenCreate()
}

function openEdit(category: Category) {
  baseOpenEdit(category)
}

async function handleSave() {
  const success = await baseHandleSave()
  if (success) {
    await fetchAllCategories()
  }
}

async function handleDelete(category: Category) {
  const success = await baseHandleDelete(category)
  if (success) {
    await fetchAllCategories()
  }
}

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
  isEditing.value ? t('admin.categories.editCategory') : t('admin.categories.addCategory')
)

function handleEditRow(item: Record<string, unknown>) {
  const category = categories.value.find((c) => c.id === item.id)
  if (category) openEdit(category)
}

async function handleDeleteRow(item: Record<string, unknown>) {
  const category = categories.value.find((c) => c.id === item.id)
  if (category) await handleDelete(category)
}

async function handleSubmit() {
  if (!form.value.name.trim()) return
  await handleSave()
}

onMounted(() => {
  fetchCategories()
  fetchAllCategories()
})
</script>

<template>
  <AdminLayout :title="t('admin.categories.title')" :subtitle="t('admin.categories.subtitle')">
    <div class="flex items-center justify-end mb-6">
      <BaseButton variant="secondary" size="sm" @click="openCreate">
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
      @edit="handleEditRow"
      @delete="handleDeleteRow"
    />

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
              <BaseButton type="button" variant="outline" size="sm" @click="closeModal">
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
