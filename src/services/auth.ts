import api, { setTokens, clearTokens } from './api'

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  access: string
  refresh: string
}

export interface UserProfile {
  id: number
  email: string
  name?: string
  first_name?: string
  last_name?: string
  role?: string
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login/', credentials)
    const { access, refresh } = response.data
    setTokens(access, refresh)
    return response.data
  },

  async getProfile(): Promise<UserProfile> {
    const response = await api.get<UserProfile>('/user/profile/')
    return response.data
  },

  logout(): void {
    clearTokens()
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token')
  },
}

export default authService
