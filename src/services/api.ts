import axios, { type AxiosInstance, type AxiosError, type InternalAxiosRequestConfig } from 'axios'

interface TokenResponse {
  access: string
  refresh?: string
}

interface QueuedRequest {
  resolve: (token: string) => void
  reject: (error: Error) => void
}

let isRefreshing = false
let failedQueue: QueuedRequest[] = []

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else if (token) {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
})

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem('access_token')
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

const AUTH_ENDPOINTS = ['/auth/login/', '/auth/refresh/']

const isAuthEndpoint = (url: string | undefined): boolean => {
  if (!url) return false
  return AUTH_ENDPOINTS.some(endpoint => url.includes(endpoint))
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }
    
    if (isAuthEndpoint(originalRequest.url)) {
      return Promise.reject(error)
    }
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`
            }
            return api(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      const refreshToken = localStorage.getItem('refresh_token')

      if (!refreshToken) {
        isRefreshing = false
        processQueue(new Error('No refresh token'), null)
        clearTokens()
        window.location.href = '/admin/login'
        return Promise.reject(error)
      }

      try {
        const response = await axios.post<TokenResponse>(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh/`,
          { refresh: refreshToken }
        )

        const { access } = response.data
        localStorage.setItem('access_token', access)

        if (response.data.refresh) {
          localStorage.setItem('refresh_token', response.data.refresh)
        }

        processQueue(null, access)

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${access}`
        }

        return api(originalRequest)
      } catch (refreshError) {
        processQueue(new Error('Refresh failed'), null)
        clearTokens()
        window.location.href = '/admin/login'
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export const setTokens = (access: string, refresh: string) => {
  localStorage.setItem('access_token', access)
  localStorage.setItem('refresh_token', refresh)
}

export const clearTokens = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}

export const getAccessToken = () => localStorage.getItem('access_token')
export const getRefreshToken = () => localStorage.getItem('refresh_token')

export default api
