<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import DataTable from '@/components/admin/DataTable.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import serviceService, { type Service, type ServiceInput } from '@/services/service'

const { t } = useI18n()

const services = ref<Service[]>([])
const loading = ref(false)
const showModal = ref(false)
const editingService = ref<Service | null>(null)
const saving = ref(false)
const currentPage = ref(1)
const totalCount = ref(0)
const hasNextPage = ref(false)
const hasPrevPage = ref(false)

const form = ref<ServiceInput>({
  title: '',
  description: '',
  is_active: true,
  is_featured: false,
  order: 1
})

const columns = computed(() => [
  { key: 'title', label: t('admin.services.columns.name') },
  { key: 'description', label: t('admin.services.columns.description') },
  { key: 'is_featured', label: t('admin.services.columns.featured') },
  { key: 'is_active', label: t('admin.services.columns.status') }
])

const tableData = computed(() =>
  services.value.map((service) => ({
    id: service.id,
    title: service.title,
    description: service.description.length > 60 
      ? service.description.substring(0, 60) + '...' 
      : service.description,
    is_featured: service.is_featured,
    is_active: service.is_active
  }))
)

const modalTitle = computed(() =>
  editingService.value ? t('admin.services.editService') : t('admin.services.addService')
)

const showPagination = computed(() => hasNextPage.value || hasPrevPage.value)

async function fetchServices(page = 1) {
  loading.value = true
  try {
    const response = await serviceService.list({ page })
    services.value = response.results
    totalCount.value = response.count
    hasNextPage.value = !!response.next
    hasPrevPage.value = !!response.previous
    currentPage.value = page
  } catch (err) {
    console.error('Failed to fetch services:', err)
  } finally {
    loading.value = false
  }
}

function goToPage(page: number) {
  fetchServices(page)
}

function openAddModal() {
  editingService.value = null
  form.value = { title: '', description: '', is_active: true, is_featured: false, order: 1 }
  showModal.value = true
}

function handleEdit(item: Record<string, unknown>) {
  const service = services.value.find((s) => s.id === item.id)
  if (service) {
    editingService.value = service
    form.value = {
      title: service.title,
      description: service.description,
      is_active: service.is_active,
      is_featured: service.is_featured,
      order: service.order
    }
    showModal.value = true
  }
}

async function handleDelete(item: Record<string, unknown>) {
  if (!confirm(t('admin.services.confirmDelete'))) return
  try {
    await serviceService.delete(item.id as number)
    await fetchServices(currentPage.value)
  } catch (err) {
    console.error('Failed to delete service:', err)
  }
}

async function handleSubmit() {
  if (!form.value.title.trim() || !form.value.description.trim()) return
  saving.value = true
  try {
    const payload: ServiceInput = {
      title: form.value.title,
      description: form.value.description,
      is_active: form.value.is_active,
      is_featured: form.value.is_featured,
      order: form.value.order
    }
    if (editingService.value) {
      await serviceService.update(editingService.value.id, payload)
    } else {
      await serviceService.create(payload)
    }
    showModal.value = false
    await fetchServices(currentPage.value)
  } catch (err) {
    console.error('Failed to save service:', err)
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  fetchServices()
})
</script>

<template>
  <AdminLayout :title="t('admin.services.title')" :subtitle="t('admin.services.subtitle')">
    <div class="flex items-center justify-end mb-6">
      <BaseButton variant="secondary" size="sm" @click="openAddModal">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        {{ t('admin.services.addNew') }}
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
      <template #cell-is_featured="{ value }">
        <span v-if="value" class="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          {{ t('admin.services.featured') }}
        </span>
        <span v-else class="text-gray-400">-</span>
      </template>
      <template #cell-is_active="{ value }">
        <span :class="[
          'px-3 py-1 rounded-full text-xs font-medium',
          value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
        ]">
          {{ value ? t('admin.services.active') : t('admin.services.inactive') }}
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
                {{ t('admin.services.form.title') }} *
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
                {{ t('admin.services.form.description') }} *
              </label>
              <textarea
                v-model="form.description"
                rows="4"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none"
              ></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ t('admin.services.form.order') }}
              </label>
              <input
                v-model.number="form.order"
                type="number"
                min="1"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
            </div>
            <div class="flex items-center gap-6">
              <div class="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_active"
                  v-model="form.is_active"
                  class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label for="is_active" class="text-sm font-medium text-gray-700">
                  {{ t('admin.services.form.active') }}
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
                  {{ t('admin.services.form.featured') }}
                </label>
              </div>
            </div>
            <div class="flex justify-end gap-3 pt-4">
              <BaseButton type="button" variant="outline" size="sm" @click="showModal = false">
                {{ t('admin.services.form.cancel') }}
              </BaseButton>
              <BaseButton type="submit" variant="secondary" size="sm" :disabled="saving">
                {{ saving ? t('admin.services.form.saving') : t('admin.services.form.save') }}
              </BaseButton>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </AdminLayout>
</template>
