<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import DataTable from '@/components/admin/DataTable.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import SearchableSelect from '@/components/base/SearchableSelect.vue'
import projectService, { type Project, type ProjectInput } from '@/services/project'
import serviceService, { type Service } from '@/services/service'
import { useToast } from '@/composables/useToast'

const { t } = useI18n()
const toast = useToast()

const projects = ref<Project[]>([])
const services = ref<Service[]>([])
const serviceLoading = ref(false)
const loading = ref(false)
const showModal = ref(false)
const editingProject = ref<Project | null>(null)
const saving = ref(false)
const currentPage = ref(1)
const totalCount = ref(0)
const hasNextPage = ref(false)
const hasPrevPage = ref(false)

const form = ref<ProjectInput>({
  title: '',
  short_description: '',
  description: '',
  cover_image: '',
  deliveries_count: '',
  countries_count: 0,
  on_time_rate: 0,
  service_id: undefined,
  is_active: true,
  is_featured: false,
  status: true,
  order: 1
})

const serviceOptions = computed(() =>
  services.value.map((s) => ({ id: s.id, name: s.title }))
)

const columns = computed(() => [
  { key: 'title', label: t('admin.projects.columns.title') },
  { key: 'service_name', label: t('admin.projects.columns.service') },
  { key: 'deliveries_count', label: t('admin.projects.columns.deliveries') },
  { key: 'countries_count', label: t('admin.projects.columns.countries') },
  { key: 'status', label: t('admin.projects.columns.status') }
])

const tableData = computed(() =>
  projects.value.map((project) => ({
    id: project.id,
    title: project.title.length > 50 ? project.title.substring(0, 50) + '...' : project.title,
    service_name: project.service?.title || '-',
    deliveries_count: project.deliveries_count || '-',
    countries_count: project.countries_count || 0,
    status: project.status
  }))
)

const modalTitle = computed(() =>
  editingProject.value ? t('admin.projects.editProject') : t('admin.projects.addProject')
)

const showPagination = computed(() => hasNextPage.value || hasPrevPage.value)

async function fetchProjects(page = 1) {
  loading.value = true
  try {
    const response = await projectService.list({ page })
    projects.value = response.results
    totalCount.value = response.count
    hasNextPage.value = !!response.next
    hasPrevPage.value = !!response.previous
    currentPage.value = page
  } catch (err) {
    console.error('Failed to fetch projects:', err)
    toast.error(t('common.error'))
  } finally {
    loading.value = false
  }
}

async function fetchServices() {
  try {
    services.value = await serviceService.listAll()
  } catch (err) {
    console.error('Failed to fetch services:', err)
  }
}

async function searchServices(query: string) {
  serviceLoading.value = true
  try {
    if (query.trim()) {
      services.value = await serviceService.search(query)
    } else {
      services.value = await serviceService.listAll()
    }
  } catch (err) {
    console.error('Failed to search services:', err)
  } finally {
    serviceLoading.value = false
  }
}

function goToPage(page: number) {
  fetchProjects(page)
}

function openAddModal() {
  editingProject.value = null
  form.value = {
    title: '',
    short_description: '',
    description: '',
    cover_image: '',
    deliveries_count: '',
    countries_count: 0,
    on_time_rate: 0,
    service_id: undefined,
    is_active: true,
    is_featured: false,
    status: true,
    order: 1
  }
  showModal.value = true
}

function handleEdit(item: Record<string, unknown>) {
  const project = projects.value.find((p) => p.id === item.id)
  if (project) {
    editingProject.value = project
    form.value = {
      title: project.title,
      short_description: project.short_description,
      description: project.description,
      cover_image: project.cover_image,
      deliveries_count: project.deliveries_count,
      countries_count: project.countries_count,
      on_time_rate: project.on_time_rate,
      service_id: project.service?.id,
      is_active: project.is_active,
      is_featured: project.is_featured,
      status: project.status,
      order: project.order
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
  if (!confirm(t('admin.projects.confirmDelete'))) return
  try {
    await projectService.delete(item.id as number)
    toast.success(t('common.deleted'))
    await fetchProjects(currentPage.value)
  } catch (err) {
    console.error('Failed to delete project:', err)
    toast.error(t('common.error'))
  }
}

async function handleSubmit() {
  if (!form.value.title.trim()) return
  saving.value = true
  try {
    const payload: ProjectInput = {
      title: form.value.title,
      short_description: form.value.short_description,
      description: form.value.description,
      deliveries_count: form.value.deliveries_count,
      countries_count: form.value.countries_count,
      on_time_rate: form.value.on_time_rate,
      is_active: form.value.is_active,
      is_featured: form.value.is_featured,
      status: form.value.status,
      order: form.value.order
    }
    if (form.value.service_id) {
      payload.service_id = form.value.service_id
    }
    if (editingProject.value) {
      await projectService.update(editingProject.value.id, payload, selectedFile.value || undefined)
    } else {
      await projectService.create(payload, selectedFile.value || undefined)
    }
    showModal.value = false
    selectedFile.value = null
    toast.success(t('common.saved'))
    await fetchProjects(currentPage.value)
  } catch (err) {
    console.error('Failed to save project:', err)
    toast.error(t('common.error'))
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  fetchProjects()
  fetchServices()
})
</script>

<template>
  <AdminLayout :title="t('admin.projects.title')" :subtitle="t('admin.projects.subtitle')">
    <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
      <BaseButton variant="secondary" size="sm" @click="openAddModal">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        {{ t('admin.projects.addNew') }}
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
      <template #cell-service_name="{ value }">
        <span v-if="value !== '-'" class="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
          {{ value }}
        </span>
        <span v-else class="text-gray-400">{{ value }}</span>
      </template>
      <template #cell-status="{ value }">
        <span :class="[
          'px-3 py-1 rounded-full text-xs font-medium',
          value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
        ]">
          {{ value ? t('admin.projects.active') : t('admin.projects.inactive') }}
        </span>
      </template>
    </DataTable>

    <div v-if="!loading && showPagination" class="mt-6 flex flex-col gap-3 px-2 sm:flex-row sm:items-center sm:justify-between">
      <p class="text-sm text-gray-600">
        {{ t('admin.pagination.total', { count: totalCount }) }}
      </p>
      <div class="flex flex-wrap items-center gap-2">
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
        <div class="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-4 shadow-xl sm:p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ modalTitle }}</h3>
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ t('admin.projects.form.title') }} *
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
                {{ t('admin.projects.form.shortDescription') }}
              </label>
              <textarea
                v-model="form.short_description"
                rows="2"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none"
              ></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ t('admin.projects.form.description') }}
              </label>
              <textarea
                v-model="form.description"
                rows="4"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none"
              ></textarea>
            </div>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t('admin.projects.form.service') }}
                </label>
                <SearchableSelect
                  v-model="form.service_id"
                  :options="serviceOptions"
                  :placeholder="t('admin.projects.form.searchService')"
                  :no-option-label="t('admin.projects.form.noService')"
                  :loading="serviceLoading"
                  @search="searchServices"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t('admin.projects.form.coverImage') }}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  @change="handleImageChange"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
                <p v-if="form.cover_image" class="mt-1 text-xs text-gray-500 truncate">
                  {{ t('admin.projects.form.currentImage') }}: {{ form.cover_image }}
                </p>
              </div>
            </div>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t('admin.projects.form.deliveriesCount') }}
                </label>
                <input
                  v-model="form.deliveries_count"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t('admin.projects.form.countriesCount') }}
                </label>
                <input
                  v-model.number="form.countries_count"
                  type="number"
                  min="0"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t('admin.projects.form.onTimeRate') }}
                </label>
                <input
                  v-model.number="form.on_time_rate"
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  placeholder="98.5"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                />
              </div>
            </div>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t('admin.projects.form.order') }}
                </label>
                <input
                  v-model.number="form.order"
                  type="number"
                  min="1"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                />
              </div>
              <div class="flex flex-col gap-3 pb-2 sm:justify-end">
                <div class="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="status"
                    v-model="form.status"
                    class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label for="status" class="text-sm font-medium text-gray-700">
                    {{ t('admin.projects.form.active') }}
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
                    {{ t('admin.projects.form.featured') }}
                  </label>
                </div>
              </div>
            </div>
            <div class="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
              <BaseButton type="button" variant="outline" size="sm" @click="showModal = false">
                {{ t('admin.projects.form.cancel') }}
              </BaseButton>
              <BaseButton type="submit" variant="secondary" size="sm" :disabled="saving">
                {{ saving ? t('admin.projects.form.saving') : t('admin.projects.form.save') }}
              </BaseButton>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </AdminLayout>
</template>
