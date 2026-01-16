<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import DataTable from '@/components/admin/DataTable.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import SearchableSelect from '@/components/base/SearchableSelect.vue'
import newsService, { type News, type NewsInput } from '@/services/news'
import categoryService, { type Category } from '@/services/category'
import { useToast } from '@/composables/useToast'

const { t } = useI18n()
const toast = useToast()

const articles = ref<News[]>([])
const categories = ref<Category[]>([])
const categoryLoading = ref(false)
const loading = ref(false)
const showModal = ref(false)
const editingNews = ref<News | null>(null)
const saving = ref(false)
const currentPage = ref(1)
const totalCount = ref(0)
const hasNextPage = ref(false)
const hasPrevPage = ref(false)

const form = ref<NewsInput>({
  title: '',
  excerpt: '',
  content: '',
  cover_image: '',
  author_name: '',
  read_time: 5,
  category_id: undefined,
  is_active: true,
  is_featured: false,
  is_highlighted: false,
  status: true,
  order: 1
})

const columns = computed(() => [
  { key: 'title', label: t('admin.news.columns.title') },
  { key: 'category_name', label: t('admin.news.columns.category') },
  { key: 'author_name', label: t('admin.news.columns.author') },
  { key: 'is_highlighted', label: t('admin.news.columns.highlighted') },
  { key: 'status', label: t('admin.news.columns.status') }
])

const tableData = computed(() =>
  articles.value.map((article) => ({
    id: article.id,
    title: article.title.length > 50 ? article.title.substring(0, 50) + '...' : article.title,
    category_name: article.category?.name || '-',
    author_name: article.author_name || '-',
    is_highlighted: article.is_highlighted,
    status: article.status
  }))
)

const modalTitle = computed(() =>
  editingNews.value ? t('admin.news.editArticle') : t('admin.news.addArticle')
)

const showPagination = computed(() => hasNextPage.value || hasPrevPage.value)

async function fetchNews(page = 1) {
  loading.value = true
  try {
    const response = await newsService.list({ page })
    articles.value = response.results
    totalCount.value = response.count
    hasNextPage.value = !!response.next
    hasPrevPage.value = !!response.previous
    currentPage.value = page
  } catch (err) {
    console.error('Failed to fetch news:', err)
    toast.error(t('common.error'))
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

async function searchCategories(query: string) {
  categoryLoading.value = true
  try {
    if (query.trim()) {
      categories.value = await categoryService.search(query)
    } else {
      categories.value = await categoryService.listAll()
    }
  } catch (err) {
    console.error('Failed to search categories:', err)
  } finally {
    categoryLoading.value = false
  }
}

function goToPage(page: number) {
  fetchNews(page)
}

function openAddModal() {
  editingNews.value = null
  form.value = {
    title: '',
    excerpt: '',
    content: '',
    cover_image: '',
    author_name: '',
    read_time: 5,
    category_id: undefined,
    is_active: true,
    is_featured: false,
    is_highlighted: false,
    status: true,
    order: 1
  }
  showModal.value = true
}

function handleEdit(item: Record<string, unknown>) {
  const article = articles.value.find((a) => a.id === item.id)
  if (article) {
    editingNews.value = article
    form.value = {
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      cover_image: article.cover_image,
      author_name: article.author_name,
      read_time: article.read_time,
      category_id: article.category?.id,
      is_active: article.is_active,
      is_featured: article.is_featured,
      is_highlighted: article.is_highlighted,
      status: article.status,
      order: article.order
    }
    showModal.value = true
  }
}

const selectedFile = ref<File | null>(null)

function handleImageChange(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0]
  }
}

async function handleDelete(item: Record<string, unknown>) {
  if (!confirm(t('admin.news.confirmDelete'))) return
  try {
    await newsService.delete(item.id as number)
    toast.success(t('common.deleted'))
    await fetchNews(currentPage.value)
  } catch (err) {
    console.error('Failed to delete news:', err)
    toast.error(t('common.error'))
  }
}

async function handleSubmit() {
  if (!form.value.title.trim() || !form.value.content.trim()) return
  saving.value = true
  try {
    const payload: NewsInput = {
      title: form.value.title,
      excerpt: form.value.excerpt,
      content: form.value.content,
      author_name: form.value.author_name,
      read_time: form.value.read_time,
      is_active: form.value.is_active,
      is_featured: form.value.is_featured,
      is_highlighted: form.value.is_highlighted,
      status: form.value.status,
      order: form.value.order
    }
    if (form.value.category_id) {
      payload.category_id = form.value.category_id
    }
    if (editingNews.value) {
      await newsService.update(editingNews.value.id, payload, selectedFile.value || undefined)
    } else {
      await newsService.create(payload, selectedFile.value || undefined)
    }
    showModal.value = false
    selectedFile.value = null
    toast.success(t('common.saved'))
    await fetchNews(currentPage.value)
  } catch (err) {
    console.error('Failed to save news:', err)
    toast.error(t('common.error'))
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  fetchNews()
  fetchCategories()
})
</script>

<template>
  <AdminLayout :title="t('admin.news.title')" :subtitle="t('admin.news.subtitle')">
    <div class="flex items-center justify-end mb-6">
      <BaseButton variant="secondary" size="sm" @click="openAddModal">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        {{ t('admin.news.addNew') }}
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
      <template #cell-title="{ value }">
        <span class="font-medium">{{ value }}</span>
      </template>
      <template #cell-category_name="{ value }">
        <span v-if="value !== '-'" class="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
          {{ value }}
        </span>
        <span v-else class="text-gray-400">{{ value }}</span>
      </template>
      <template #cell-is_highlighted="{ value }">
        <span :class="[
          'px-3 py-1 rounded-full text-xs font-medium',
          value ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'
        ]">
          {{ value ? t('common.yes') : t('common.no') }}
        </span>
      </template>
      <template #cell-status="{ value }">
        <span :class="[
          'px-3 py-1 rounded-full text-xs font-medium',
          value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
        ]">
          {{ value ? t('admin.news.published') : t('admin.news.draft') }}
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
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        @click.self="showModal = false"
      >
        <div class="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ modalTitle }}</h3>
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ t('admin.news.form.title') }} *
              </label>
              <input
                v-model="form.title"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ t('admin.news.form.excerpt') }}
              </label>
              <textarea
                v-model="form.excerpt"
                rows="2"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none"
              ></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ t('admin.news.form.content') }} *
              </label>
              <textarea
                v-model="form.content"
                rows="6"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none"
              ></textarea>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t('admin.news.form.category') }}
                </label>
                <SearchableSelect
                  v-model="form.category_id"
                  :options="categories"
                  :placeholder="t('admin.news.form.searchCategory')"
                  :no-option-label="t('admin.news.form.noCategory')"
                  :loading="categoryLoading"
                  @search="searchCategories"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t('admin.news.form.authorName') }}
                </label>
                <input
                  v-model="form.author_name"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t('admin.news.form.coverImage') }}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  @change="handleImageChange"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
                <p v-if="form.cover_image" class="mt-1 text-xs text-gray-500 truncate">
                  {{ t('admin.news.form.currentImage') }}: {{ form.cover_image }}
                </p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t('admin.news.form.readTime') }}
                </label>
                <input
                  v-model.number="form.read_time"
                  type="number"
                  min="1"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t('admin.news.form.order') }}
                </label>
                <input
                  v-model.number="form.order"
                  type="number"
                  min="1"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                />
              </div>
              <div class="flex items-end gap-6 pb-2">
                <div class="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="status"
                    v-model="form.status"
                    class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label for="status" class="text-sm font-medium text-gray-700">
                    {{ t('admin.news.form.published') }}
                  </label>
                </div>
                <div class="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_featured"
                    v-model="form.is_featured"
                    class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label for="is_featured" class="text-sm font-medium text-gray-700">
                    {{ t('admin.news.form.featured') }}
                  </label>
                </div>
                <div class="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_highlighted"
                    v-model="form.is_highlighted"
                    class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label for="is_highlighted" class="text-sm font-medium text-gray-700">
                    {{ t('admin.news.form.highlighted') }}
                  </label>
                </div>
              </div>
            </div>
            <div class="flex justify-end gap-3 pt-4">
              <BaseButton type="button" variant="outline" size="sm" @click="showModal = false">
                {{ t('admin.news.form.cancel') }}
              </BaseButton>
              <BaseButton type="submit" variant="secondary" size="sm" :disabled="saving">
                {{ saving ? t('admin.news.form.saving') : t('admin.news.form.save') }}
              </BaseButton>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </AdminLayout>
</template>
