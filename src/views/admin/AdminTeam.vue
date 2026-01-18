<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import DataTable from '@/components/admin/DataTable.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import teamService, { type TeamMember, type TeamMemberInput } from '@/services/team'
import { useToast } from '@/composables/useToast'

const { t } = useI18n()
const toast = useToast()

const teamMembers = ref<TeamMember[]>([])
const loading = ref(false)
const showModal = ref(false)
const editingMember = ref<TeamMember | null>(null)
const saving = ref(false)
const currentPage = ref(1)
const totalCount = ref(0)
const hasNextPage = ref(false)
const hasPrevPage = ref(false)

const form = ref<TeamMemberInput>({
  name: '',
  designation: '',
  short_bio: '',
  bio: '',
  profile_image: '',
  is_featured: false,
  order: 0
})

const columns = computed(() => [
  { key: 'profile_image', label: t('admin.team.columns.image') },
  { key: 'name', label: t('admin.team.columns.name') },
  { key: 'designation', label: t('admin.team.columns.designation') },
  { key: 'is_featured', label: t('admin.team.columns.featured') },
  { key: 'order', label: t('admin.team.columns.order') }
])

const tableData = computed(() =>
  teamMembers.value.map((member) => ({
    id: member.id,
    slug: member.slug,
    profile_image: member.profile_image || '',
    name: member.name,
    designation: member.designation || '-',
    is_featured: member.is_featured,
    order: member.order
  }))
)

const modalTitle = computed(() =>
  editingMember.value ? t('admin.team.editMember') : t('admin.team.addMember')
)

const showPagination = computed(() => hasNextPage.value || hasPrevPage.value)

async function fetchTeamMembers(page = 1) {
  loading.value = true
  try {
    const response = await teamService.list({ page })
    teamMembers.value = response.results
    totalCount.value = response.count
    hasNextPage.value = !!response.next
    hasPrevPage.value = !!response.previous
    currentPage.value = page
  } catch (err) {
    console.error('Failed to fetch team members:', err)
    toast.error(t('common.error'))
  } finally {
    loading.value = false
  }
}

function goToPage(page: number) {
  fetchTeamMembers(page)
}

function openAddModal() {
  editingMember.value = null
  form.value = {
    name: '',
    designation: '',
    short_bio: '',
    bio: '',
    profile_image: '',
    is_featured: false,
    order: 0
  }
  showModal.value = true
}

function handleEdit(item: Record<string, unknown>) {
  const member = teamMembers.value.find((m) => m.id === item.id)
  if (member) {
    editingMember.value = member
    form.value = {
      name: member.name,
      designation: member.designation || '',
      short_bio: member.short_bio || '',
      bio: member.bio || '',
      profile_image: member.profile_image || '',
      is_featured: member.is_featured,
      order: member.order
    }
    showModal.value = true
  }
}

async function handleDelete(item: Record<string, unknown>) {
  if (!confirm(t('admin.team.confirmDelete'))) return
  try {
    await teamService.delete(item.slug as string)
    toast.success(t('common.deleted'))
    await fetchTeamMembers(currentPage.value)
  } catch (err) {
    console.error('Failed to delete team member:', err)
    toast.error(t('common.error'))
  }
}

async function handleSubmit() {
  if (!form.value.name.trim()) return
  saving.value = true
  try {
    const payload: TeamMemberInput = {
      name: form.value.name
    }
    if (form.value.designation) payload.designation = form.value.designation
    if (form.value.short_bio) payload.short_bio = form.value.short_bio
    if (form.value.bio) payload.bio = form.value.bio
    if (form.value.profile_image) payload.profile_image = form.value.profile_image
    payload.is_featured = form.value.is_featured
    payload.order = form.value.order

    if (editingMember.value) {
      await teamService.update(editingMember.value.slug, payload)
    } else {
      await teamService.create(payload)
    }
    showModal.value = false
    toast.success(t('common.saved'))
    await fetchTeamMembers(currentPage.value)
  } catch (err) {
    console.error('Failed to save team member:', err)
    toast.error(t('common.error'))
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  fetchTeamMembers()
})
</script>

<template>
  <AdminLayout :title="t('admin.team.title')" :subtitle="t('admin.team.subtitle')">
    <div class="flex items-center justify-end mb-6">
      <BaseButton variant="secondary" size="sm" @click="openAddModal">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        {{ t('admin.team.addNew') }}
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
      <template #cell-profile_image="{ value }">
        <div v-if="value" class="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
          <img :src="String(value)" alt="" class="w-full h-full object-cover" />
        </div>
        <div v-else class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      </template>
      <template #cell-name="{ value }">
        <span class="font-medium">{{ value }}</span>
      </template>
      <template #cell-designation="{ value }">
        <span v-if="value !== '-'" class="text-gray-600">{{ value }}</span>
        <span v-else class="text-gray-400">{{ value }}</span>
      </template>
      <template #cell-is_featured="{ value }">
        <span v-if="value" class="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
          {{ t('common.yes') }}
        </span>
        <span v-else class="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
          {{ t('common.no') }}
        </span>
      </template>
      <template #cell-order="{ value }">
        <span class="text-gray-600">{{ value }}</span>
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
        <div class="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ modalTitle }}</h3>
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t('admin.team.form.name') }} *
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  :placeholder="t('admin.team.form.namePlaceholder')"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t('admin.team.form.designation') }}
                </label>
                <input
                  v-model="form.designation"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  :placeholder="t('admin.team.form.designationPlaceholder')"
                />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ t('admin.team.form.shortBio') }}
              </label>
              <input
                v-model="form.short_bio"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                :placeholder="t('admin.team.form.shortBioPlaceholder')"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ t('admin.team.form.bio') }}
              </label>
              <textarea
                v-model="form.bio"
                rows="4"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none"
                :placeholder="t('admin.team.form.bioPlaceholder')"
              ></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ t('admin.team.form.profileImage') }}
              </label>
              <input
                v-model="form.profile_image"
                type="url"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                :placeholder="t('admin.team.form.profileImagePlaceholder')"
              />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t('admin.team.form.order') }}
                </label>
                <input
                  v-model.number="form.order"
                  type="number"
                  min="0"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                />
              </div>
              <div class="flex items-center pt-6">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    v-model="form.is_featured"
                    type="checkbox"
                    class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span class="text-sm font-medium text-gray-700">
                    {{ t('admin.team.form.isFeatured') }}
                  </span>
                </label>
              </div>
            </div>
            <div class="flex justify-end gap-3 pt-4">
              <BaseButton type="button" variant="outline" size="sm" @click="showModal = false">
                {{ t('admin.team.form.cancel') }}
              </BaseButton>
              <BaseButton type="submit" variant="secondary" size="sm" :disabled="saving">
                {{ saving ? t('admin.team.form.saving') : t('admin.team.form.save') }}
              </BaseButton>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </AdminLayout>
</template>
