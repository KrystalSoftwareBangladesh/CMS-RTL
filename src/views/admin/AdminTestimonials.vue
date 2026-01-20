<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import DataTable from '@/components/admin/DataTable.vue'
import AdminPagination from '@/components/admin/AdminPagination.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import testimonialService, { type Testimonial, type TestimonialInput } from '@/services/testimonial'
import { useToast } from '@/composables/useToast'

const { t } = useI18n()
const toast = useToast()

const testimonials = ref<Testimonial[]>([])
const loading = ref(false)
const showModal = ref(false)
const editingTestimonial = ref<Testimonial | null>(null)
const saving = ref(false)
const currentPage = ref(1)
const totalCount = ref(0)
const hasNextPage = ref(false)
const hasPrevPage = ref(false)

const form = ref<TestimonialInput>({
  name: '',
  designation: '',
  company: '',
  message: '',
  avatar: '',
  rating: 5,
  is_featured: false,
  order: 1
})
const avatarFile = ref<File | null>(null)
const avatarPreview = ref<string>('')

function handleAvatarChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    avatarFile.value = file
    avatarPreview.value = URL.createObjectURL(file)
  }
}

const columns = computed(() => [
  { key: 'name', label: t('admin.testimonials.columns.name') },
  { key: 'company', label: t('admin.testimonials.columns.company') },
  { key: 'rating', label: t('admin.testimonials.columns.rating') },
  { key: 'status', label: t('admin.testimonials.columns.status') },
  { key: 'createdAt', label: t('admin.testimonials.columns.createdAt') }
])

const tableData = computed(() =>
  testimonials.value.map((item) => ({
    id: item.id,
    name: item.name,
    company: item.company || '-',
    rating: item.rating,
    status: item.is_active ? t('admin.testimonials.published') : t('admin.testimonials.pending'),
    createdAt: new Date(item.created_at).toLocaleDateString()
  }))
)

const modalTitle = computed(() =>
  editingTestimonial.value ? t('admin.testimonials.editTestimonial') : t('admin.testimonials.addTestimonial')
)

const showPagination = computed(() => hasNextPage.value || hasPrevPage.value)

async function fetchTestimonials(page = 1) {
  loading.value = true
  try {
    const response = await testimonialService.list({ page })
    testimonials.value = response.results
    totalCount.value = response.count
    hasNextPage.value = !!response.next
    hasPrevPage.value = !!response.previous
    currentPage.value = page
  } catch (err) {
    console.error('Failed to fetch testimonials:', err)
    toast.error(t('common.error'))
  } finally {
    loading.value = false
  }
}

function goToPage(page: number) {
  fetchTestimonials(page)
}

function openAddModal() {
  editingTestimonial.value = null
  form.value = {
    name: '',
    designation: '',
    company: '',
    message: '',
    avatar: '',
    rating: 5,
    is_featured: false,
    order: 1
  }
  avatarFile.value = null
  avatarPreview.value = ''
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  editingTestimonial.value = null
}

function handleEdit(item: Record<string, unknown>) {
  const testimonial = testimonials.value.find((t) => t.id === item.id)
  if (testimonial) {
    editingTestimonial.value = testimonial
    form.value = {
      name: testimonial.name,
      designation: testimonial.designation,
      company: testimonial.company,
      message: testimonial.message,
      avatar: testimonial.avatar,
      rating: testimonial.rating,
      is_featured: testimonial.is_featured,
      order: testimonial.order
    }
    avatarFile.value = null
    avatarPreview.value = testimonial.avatar || ''
    showModal.value = true
  }
}

async function handleDelete(item: Record<string, unknown>) {
  if (!confirm(t('admin.testimonials.confirmDelete'))) return
  try {
    await testimonialService.delete(item.id as number)
    toast.success(t('common.deleted'))
    await fetchTestimonials(currentPage.value)
  } catch (err) {
    console.error('Failed to delete testimonial:', err)
    toast.error(t('common.error'))
  }
}

async function handleSubmit() {
  if (!form.value.name.trim() || !form.value.message?.trim()) return
  saving.value = true
  try {
    const payload: TestimonialInput = {
      name: form.value.name,
      message: form.value.message,
      rating: form.value.rating,
      is_featured: form.value.is_featured,
      order: form.value.order
    }
    if (form.value.designation) payload.designation = form.value.designation
    if (form.value.company) payload.company = form.value.company

    if (editingTestimonial.value) {
      await testimonialService.update(editingTestimonial.value.id, payload, avatarFile.value || undefined)
    } else {
      await testimonialService.create(payload, avatarFile.value || undefined)
    }
    closeModal()
    toast.success(t('common.saved'))
    await fetchTestimonials(currentPage.value)
  } catch (err) {
    console.error('Failed to save testimonial:', err)
    toast.error(t('common.error'))
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  fetchTestimonials()
})
</script>

<template>
  <AdminLayout :title="t('admin.testimonials.title')" :subtitle="t('admin.testimonials.subtitle')">
    <div class="flex items-center justify-end mb-6">
      <BaseButton variant="secondary" size="sm" @click="openAddModal">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        {{ t('admin.testimonials.addNew') }}
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
      <template #cell-rating="{ value }">
        <div class="flex items-center gap-1">
          <svg v-for="i in 5" :key="i" class="w-4 h-4" :class="i <= (value as number) ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
      </template>
      <template #cell-status="{ value }">
        <span 
          :class="[
            'px-3 py-1 rounded-full text-xs font-medium',
            (value as string) === t('admin.testimonials.published') ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          ]"
        >
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
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        @click.self="closeModal"
      >
        <div class="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between p-4 border-b">
            <h3 class="text-lg font-semibold text-gray-900">{{ modalTitle }}</h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form @submit.prevent="handleSubmit" class="p-4 space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('admin.testimonials.form.name') }} *</label>
              <input
                v-model="form.name"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('admin.testimonials.form.designation') }}</label>
              <input
                v-model="form.designation"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('admin.testimonials.form.company') }}</label>
              <input
                v-model="form.company"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('admin.testimonials.form.message') }} *</label>
              <textarea
                v-model="form.message"
                rows="4"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none"
              ></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('admin.testimonials.form.avatar') }}</label>
              <div v-if="avatarPreview" class="mb-2 flex items-center gap-3">
                <img :src="avatarPreview" alt="Avatar preview" class="w-16 h-16 rounded-full object-cover" />
                <span class="text-sm text-gray-500">{{ t('admin.testimonials.form.currentAvatar') }}</span>
              </div>
              <input
                type="file"
                accept="image/*"
                @change="handleAvatarChange"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('admin.testimonials.form.rating') }}</label>
                <select
                  v-model.number="form.rating"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                >
                  <option v-for="n in 5" :key="n" :value="n">{{ n }} {{ n === 1 ? t('admin.testimonials.form.star') : t('admin.testimonials.form.stars') }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('admin.testimonials.form.order') }}</label>
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
                v-model="form.is_featured"
                type="checkbox"
                id="is_featured"
                class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <label for="is_featured" class="text-sm text-gray-700">{{ t('admin.testimonials.form.isFeatured') }}</label>
            </div>
            <div class="flex justify-end gap-3 pt-4 border-t">
              <BaseButton variant="outline" size="sm" type="button" @click="closeModal">
                {{ t('common.cancel') }}
              </BaseButton>
              <BaseButton variant="secondary" size="sm" type="submit" :disabled="saving">
                {{ saving ? t('common.saving') : t('common.save') }}
              </BaseButton>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </AdminLayout>
</template>
