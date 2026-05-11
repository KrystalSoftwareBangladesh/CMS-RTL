<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import DataTable from '@/components/admin/DataTable.vue'
import AdminPagination from '@/components/admin/AdminPagination.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import teamService, { type TeamMember, type TeamMemberInput, type SocialProfileInput } from '@/services/team'
import socialService, { type SocialLink } from '@/services/social'
import { useToast } from '@/composables/useToast'

const { t } = useI18n()
const toast = useToast()

const teamMembers = ref<TeamMember[]>([])
const socialLinks = ref<SocialLink[]>([])
const loading = ref(false)
const showModal = ref(false)
const editingMember = ref<TeamMember | null>(null)
const originalPlatformIds = ref<Set<number>>(new Set())
const saving = ref(false)
const currentPage = ref(1)
const totalCount = ref(0)
const hasNextPage = ref(false)
const hasPrevPage = ref(false)

interface FormData {
  name: string
  designation: string
  short_bio: string
  bio: string
  profile_image: string
  social_profiles: SocialProfileInput[]
  is_featured: boolean
  order: number
}

const form = ref<FormData>({
  name: '',
  designation: '',
  short_bio: '',
  bio: '',
  profile_image: '',
  social_profiles: [],
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

async function fetchSocialLinks() {
  try {
    const response = await socialService.list({ page_size: 100 })
    socialLinks.value = response.results
  } catch (err) {
    console.error('Failed to fetch social links:', err)
  }
}

function goToPage(page: number) {
  fetchTeamMembers(page)
}

function openAddModal() {
  editingMember.value = null
  originalPlatformIds.value = new Set()
  form.value = {
    name: '',
    designation: '',
    short_bio: '',
    bio: '',
    profile_image: '',
    social_profiles: [],
    is_featured: false,
    order: 0
  }
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  editingMember.value = null
}

function handleEdit(item: Record<string, unknown>) {
  const member = teamMembers.value.find((m) => m.id === item.id)
  if (member) {
    editingMember.value = member
    originalPlatformIds.value = new Set(member.social_profiles.map((sp) => sp.platform))
    form.value = {
      name: member.name,
      designation: member.designation || '',
      short_bio: member.short_bio || '',
      bio: member.bio || '',
      profile_image: member.profile_image || '',
      social_profiles: member.social_profiles.map((sp) => ({
        platform: sp.platform,
        profile_url: sp.profile_url,
        order: sp.order
      })),
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

function addSocialProfile() {
  form.value.social_profiles.push({
    platform: 0,
    profile_url: '',
    order: form.value.social_profiles.length
  })
}

function removeSocialProfile(index: number) {
  form.value.social_profiles.splice(index, 1)
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
      const newProfiles = form.value.social_profiles.filter(
        (sp) => sp.platform > 0 && sp.profile_url.trim() && !originalPlatformIds.value.has(sp.platform)
      )
      if (newProfiles.length > 0) {
        payload.social_profiles = newProfiles
      }
    } else {
      const validProfiles = form.value.social_profiles.filter(
        (sp) => sp.platform > 0 && sp.profile_url.trim()
      )
      if (validProfiles.length > 0) {
        payload.social_profiles = validProfiles
      }
    }

    if (editingMember.value) {
      await teamService.update(editingMember.value.slug, payload)
    } else {
      await teamService.create(payload)
    }
    closeModal()
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
  fetchSocialLinks()
})
</script>

<template>
  <AdminLayout :title="t('admin.team.title')" :subtitle="t('admin.team.subtitle')">
    <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
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
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        @click.self="closeModal"
      >
        <div class="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-4 shadow-xl sm:p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ modalTitle }}</h3>
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
            
            <div>
              <div class="flex items-center justify-between mb-2">
                <label class="block text-sm font-medium text-gray-700">
                  {{ t('admin.team.form.socialProfiles') }}
                </label>
                <button
                  type="button"
                  @click="addSocialProfile"
                class="flex items-center gap-1 text-sm text-secondary hover:text-secondary-dark"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  {{ t('admin.team.form.addSocialProfile') }}
                </button>
              </div>
              <div v-if="form.social_profiles.length === 0" class="text-sm text-gray-500 italic py-2">
                {{ t('admin.team.form.noSocialProfiles') }}
              </div>
              <div v-else class="space-y-3">
                <div
                  v-for="(profile, index) in form.social_profiles"
                  :key="index"
                  class="rounded-lg bg-gray-50 p-3"
                >
                  <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <select
                      v-model.number="profile.platform"
                      class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
                    >
                      <option :value="0" disabled>{{ t('admin.team.form.selectPlatform') }}</option>
                      <option v-for="link in socialLinks" :key="link.id" :value="link.id">
                        {{ link.name }}
                      </option>
                    </select>
                    <input
                      v-model="profile.profile_url"
                      type="url"
                      class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
                      :placeholder="t('admin.team.form.profileUrlPlaceholder')"
                    />
                    <input
                      v-model.number="profile.order"
                      type="number"
                      min="0"
                      class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
                      :placeholder="t('admin.team.form.order')"
                    />
                  </div>
                  <button
                    type="button"
                    @click="removeSocialProfile(index)"
                    class="mt-3 rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50 hover:text-red-700 sm:mt-0"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
              <div class="flex items-center sm:pt-6">
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
            <div class="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
              <BaseButton type="button" variant="outline" size="sm" @click="closeModal">
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
