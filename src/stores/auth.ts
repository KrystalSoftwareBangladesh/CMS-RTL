import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import authService, { type UserProfile } from '@/services/auth'
import { getAccessToken } from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserProfile | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const initialized = ref(false)

  const isAuthenticated = computed(() => !!getAccessToken())
  const userName = computed(() => {
    if (!user.value) return 'Admin'
    if (user.value.full_name) return user.value.full_name
    if (user.value.name) return user.value.name
    if (user.value.username) return user.value.username
    return user.value.email
  })

  async function login(credential: string, password: string): Promise<boolean> {
    loading.value = true
    error.value = null

    try {
      const response = await authService.login({ credential, password })
      user.value = {
        id: response.user_id,
        email: response.email,
        username: response.username,
      }
      return true
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as { response?: { data?: { detail?: string; message?: string } } }
        error.value = axiosError.response?.data?.detail || 
                      axiosError.response?.data?.message || 
                      'Invalid email or password'
      } else {
        error.value = 'An error occurred. Please try again.'
      }
      return false
    } finally {
      loading.value = false
    }
  }

  async function fetchProfile(): Promise<void> {
    if (!getAccessToken()) return

    try {
      user.value = await authService.getProfile()
    } catch (err) {
      console.error('Failed to fetch profile:', err)
      user.value = null
    }
  }

  async function initialize(): Promise<void> {
    if (initialized.value) return

    if (getAccessToken()) {
      await fetchProfile()
    }
    
    initialized.value = true
  }

  function logout(): void {
    authService.logout()
    user.value = null
    error.value = null
  }

  function clearError(): void {
    error.value = null
  }

  return {
    user,
    loading,
    error,
    initialized,
    isAuthenticated,
    userName,
    login,
    logout,
    fetchProfile,
    initialize,
    clearError,
  }
})
