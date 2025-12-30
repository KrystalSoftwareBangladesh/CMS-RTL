<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import BaseButton from '@/components/base/BaseButton.vue'

const { t } = useI18n()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  error.value = ''
  
  if (!email.value || !password.value) {
    error.value = t('admin.login.errorRequired')
    return
  }
  
  isLoading.value = true
  
  await new Promise(resolve => setTimeout(resolve, 800))
  
  if (email.value === 'admin@risingtrading.com' && password.value === 'admin123') {
    localStorage.setItem('admin-auth', 'true')
    localStorage.setItem('admin-user', JSON.stringify({ email: email.value, name: 'Admin' }))
    router.push('/admin')
  } else {
    error.value = t('admin.login.errorInvalid')
  }
  
  isLoading.value = false
}
</script>

<template>
  <div class="min-h-screen bg-primary flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <img src="/logo.png" alt="Rising Trading Ltd." class="h-16 mx-auto mb-4" />
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
            />
          </div>
          
          <div v-if="error" class="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-sm text-red-600">{{ error }}</p>
          </div>
          
          <BaseButton 
            type="submit" 
            variant="primary" 
            class="w-full justify-center"
            :disabled="isLoading"
          >
            <svg v-if="isLoading" class="w-5 h-5 animate-spin mr-2" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isLoading ? t('admin.login.signingIn') : t('admin.login.signIn') }}
          </BaseButton>
        </form>
        
        <div class="mt-6 pt-6 border-t border-gray-200">
          <p class="text-sm text-gray-500 text-center">
            {{ t('admin.login.hint') }}
          </p>
          <p class="text-xs text-gray-400 text-center mt-2">
            admin@risingtrading.com / admin123
          </p>
        </div>
      </div>
      
      <div class="mt-8 text-center">
        <RouterLink to="/" class="text-white/70 hover:text-white text-sm transition-colors">
          {{ t('admin.backToSite') }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>
