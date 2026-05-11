<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import DataTable from '@/components/admin/DataTable.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import socialService, { type SocialLink, type SocialLinkInput } from '@/services/social'
import { useToast } from '@/composables/useToast'

const { t } = useI18n()
const toast = useToast()

const socialLinks = ref<SocialLink[]>([])
const loading = ref(false)
const showModal = ref(false)
const editingLink = ref<SocialLink | null>(null)
const saving = ref(false)
const currentPage = ref(1)
const totalCount = ref(0)
const hasNextPage = ref(false)
const hasPrevPage = ref(false)

const form = ref<SocialLinkInput>({
  name: '',
  key: '',
  icon: '',
  icon_svg: '',
  base_url: ''
})

const columns = computed(() => [
  { key: 'icon_svg', label: t('admin.socialLinks.columns.icon') },
  { key: 'name', label: t('admin.socialLinks.columns.name') },
  { key: 'key', label: t('admin.socialLinks.columns.key') },
  { key: 'base_url', label: t('admin.socialLinks.columns.baseUrl') }
])

const tableData = computed(() =>
  socialLinks.value.map((link) => ({
    id: link.id,
    icon_svg: link.icon_svg || '',
    name: link.name,
    key: link.key,
    base_url: link.base_url || '-'
  }))
)

const modalTitle = computed(() =>
  editingLink.value ? t('admin.socialLinks.editLink') : t('admin.socialLinks.addLink')
)

const showPagination = computed(() => hasNextPage.value || hasPrevPage.value)

async function fetchSocialLinks(page = 1) {
  loading.value = true
  try {
    const response = await socialService.list({ page })
    socialLinks.value = response.results
    totalCount.value = response.count
    hasNextPage.value = !!response.next
    hasPrevPage.value = !!response.previous
    currentPage.value = page
  } catch (err) {
    console.error('Failed to fetch social links:', err)
    toast.error(t('common.error'))
  } finally {
    loading.value = false
  }
}

function goToPage(page: number) {
  fetchSocialLinks(page)
}

function openAddModal() {
  editingLink.value = null
  form.value = { name: '', key: '', icon: '', icon_svg: '', base_url: '' }
  showModal.value = true
}

function handleEdit(item: Record<string, unknown>) {
  const link = socialLinks.value.find((l) => l.id === item.id)
  if (link) {
    editingLink.value = link
    form.value = {
      name: link.name,
      key: link.key,
      icon: link.icon || '',
      icon_svg: link.icon_svg || '',
      base_url: link.base_url || ''
    }
    showModal.value = true
  }
}

async function handleDelete(item: Record<string, unknown>) {
  if (!confirm(t('admin.socialLinks.confirmDelete'))) return
  try {
    await socialService.delete(item.id as number)
    toast.success(t('common.deleted'))
    await fetchSocialLinks(currentPage.value)
  } catch (err) {
    console.error('Failed to delete social link:', err)
    toast.error(t('common.error'))
  }
}

async function handleSubmit() {
  if (!form.value.name.trim() || !form.value.key.trim()) return
  saving.value = true
  try {
    const payload: SocialLinkInput = {
      name: form.value.name,
      key: form.value.key
    }
    if (form.value.icon) payload.icon = form.value.icon
    if (form.value.icon_svg) payload.icon_svg = form.value.icon_svg
    if (form.value.base_url) payload.base_url = form.value.base_url

    if (editingLink.value) {
      await socialService.update(editingLink.value.id, payload)
    } else {
      await socialService.create(payload)
    }
    showModal.value = false
    toast.success(t('common.saved'))
    await fetchSocialLinks(currentPage.value)
  } catch (err) {
    console.error('Failed to save social link:', err)
    toast.error(t('common.error'))
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  fetchSocialLinks()
})
</script>

<template>
  <AdminLayout :title="t('admin.socialLinks.title')" :subtitle="t('admin.socialLinks.subtitle')">
    <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
      <BaseButton variant="secondary" size="sm" @click="openAddModal">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        {{ t('admin.socialLinks.addNew') }}
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
      <template #cell-icon_svg="{ value }">
        <div v-if="value" class="w-6 h-6 text-gray-600">
          <svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="String(value)" />
          </svg>
        </div>
        <span v-else class="text-gray-400">-</span>
      </template>
      <template #cell-name="{ value }">
        <span class="font-medium">{{ value }}</span>
      </template>
      <template #cell-key="{ value }">
        <span class="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
          {{ value }}
        </span>
      </template>
      <template #cell-base_url="{ value }">
        <span v-if="value !== '-'" class="text-gray-600 truncate max-w-xs block">{{ value }}</span>
        <span v-else class="text-gray-400">{{ value }}</span>
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
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        @click.self="showModal = false"
      >
        <div class="w-full max-w-lg rounded-xl bg-white p-4 shadow-xl sm:p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ modalTitle }}</h3>
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t('admin.socialLinks.form.name') }} *
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  :placeholder="t('admin.socialLinks.form.namePlaceholder')"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t('admin.socialLinks.form.key') }} *
                </label>
                <input
                  v-model="form.key"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  :placeholder="t('admin.socialLinks.form.keyPlaceholder')"
                />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ t('admin.socialLinks.form.baseUrl') }}
              </label>
              <input
                v-model="form.base_url"
                type="url"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                :placeholder="t('admin.socialLinks.form.baseUrlPlaceholder')"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ t('admin.socialLinks.form.icon') }}
              </label>
              <input
                v-model="form.icon"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                :placeholder="t('admin.socialLinks.form.iconPlaceholder')"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ t('admin.socialLinks.form.iconSvg') }}
              </label>
              <textarea
                v-model="form.icon_svg"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none font-mono text-sm"
                :placeholder="t('admin.socialLinks.form.iconSvgPlaceholder')"
              ></textarea>
            </div>
            <div class="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
              <BaseButton type="button" variant="outline" size="sm" @click="showModal = false">
                {{ t('admin.socialLinks.form.cancel') }}
              </BaseButton>
              <BaseButton type="submit" variant="secondary" size="sm" :disabled="saving">
                {{ saving ? t('admin.socialLinks.form.saving') : t('admin.socialLinks.form.save') }}
              </BaseButton>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </AdminLayout>
</template>
