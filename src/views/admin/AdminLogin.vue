<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'
import BaseButton from '@/components/base/BaseButton.vue'

const { t } = useI18n()
const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const localError = ref('')

onMounted(() => {
  authStore.clearError()
})

const handleLogin = async () => {
  localError.value = ''

  if (!email.value || !password.value) {
    localError.value = t('admin.login.errorRequired')
    return
  }

  const success = await authStore.login(email.value, password.value)

  if (success) {
    router.push('/admin')
  }
}
</script>

<template>
  <div class="min-h-screen bg-primary flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <img src="/logo-black.png" alt="Rising Trading Ltd." class="h-16 mx-auto mb-4" />
        <h1 class="text-2xl font-bold text-white">{{ t('admin.login.title') }}</h1>
        <p class="text-white/70 mt-2">{{ t('admin.login.subtitle') }}</p>
      </div>

      <div class="bg-white rounded-xl shadow-2xl p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ t('admin.login.email') }}
            </label>
            <input
              v-model="email"
              type="email"
              :placeholder="t('admin.login.emailPlaceholder')"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors"
              autocomplete="email"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ t('admin.login.password') }}
            </label>
            <input
              v-model="password"
              type="password"
              :placeholder="t('admin.login.passwordPlaceholder')"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors"
              autocomplete="current-password"
            />
          </div>

          <div v-if="localError || authStore.error" class="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-sm text-red-600">{{ localError || authStore.error }}</p>
          </div>

          <BaseButton
            type="submit"
            variant="primary"
            class="w-full justify-center"
            :disabled="authStore.loading"
          >
            <svg v-if="authStore.loading" class="w-5 h-5 animate-spin mr-2" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ authStore.loading ? t('admin.login.signingIn') : t('admin.login.signIn') }}
          </BaseButton>
        </form>
      </div>

      <div class="mt-8 text-center">
        <RouterLink to="/" class="text-white/70 hover:text-white text-sm transition-colors">
          {{ t('admin.backToSite') }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>
