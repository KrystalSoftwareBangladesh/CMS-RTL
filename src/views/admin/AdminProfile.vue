<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import BaseCard from '@/components/base/BaseCard.vue'
import { useAuthStore } from '@/stores/auth'

const { t } = useI18n()
const authStore = useAuthStore()
const loading = ref(true)

onMounted(async () => {
  await authStore.fetchProfile()
  loading.value = false
})
</script>

<template>
  <AdminLayout :title="t('admin.profile.title')" :subtitle="t('admin.profile.subtitle')">
    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>

    <div v-else-if="authStore.user" class="max-w-4xl">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <BaseCard padding="lg" class="lg:col-span-1">
          <div class="flex flex-col items-center text-center">
            <div class="w-24 h-24 bg-primary rounded-full flex items-center justify-center mb-4">
              <span class="text-3xl font-bold text-white">
                {{ authStore.user.full_name?.charAt(0) || authStore.user.username?.charAt(0) || 'U' }}
              </span>
            </div>
            <h2 class="text-xl font-semibold text-gray-900">
              {{ authStore.user.full_name || authStore.user.username }}
            </h2>
            <p class="text-gray-500">@{{ authStore.user.username }}</p>
            <div v-if="authStore.user.groups && authStore.user.groups.length > 0" class="mt-3 flex flex-wrap gap-2 justify-center">
              <span 
                v-for="group in authStore.user.groups" 
                :key="group"
                class="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
              >
                {{ group }}
              </span>
            </div>
            <div v-else class="mt-3">
              <span class="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                {{ t('admin.profile.noGroups') }}
              </span>
            </div>
          </div>
        </BaseCard>

        <BaseCard padding="lg" class="lg:col-span-2">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">{{ t('admin.profile.accountInfo') }}</h3>
          
          <div class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-500 mb-1">
                  {{ t('admin.profile.userId') }}
                </label>
                <p class="text-gray-900 font-medium">{{ authStore.user.id }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-500 mb-1">
                  {{ t('admin.profile.username') }}
                </label>
                <p class="text-gray-900 font-medium">{{ authStore.user.username }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-500 mb-1">
                  {{ t('admin.profile.fullName') }}
                </label>
                <p class="text-gray-900 font-medium">
                  {{ authStore.user.full_name || t('admin.profile.notProvided') }}
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-500 mb-1">
                  {{ t('admin.profile.email') }}
                </label>
                <p class="text-gray-900 font-medium">{{ authStore.user.email }}</p>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-500 mb-1">
                {{ t('admin.profile.groups') }}
              </label>
              <div v-if="authStore.user.groups && authStore.user.groups.length > 0" class="flex flex-wrap gap-2">
                <span 
                  v-for="group in authStore.user.groups" 
                  :key="group"
                  class="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                >
                  {{ group }}
                </span>
              </div>
              <p v-else class="text-gray-400">{{ t('admin.profile.noGroups') }}</p>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>

    <div v-else class="text-center py-20">
      <p class="text-gray-500">{{ t('admin.profile.loadError') }}</p>
    </div>
  </AdminLayout>
</template>
