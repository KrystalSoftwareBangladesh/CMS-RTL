import api from './api'

export interface SocialLink {
  id: number
  name: string
  key: string
  icon: string
  icon_svg: string
  base_url: string
  created_at: string
  updated_at: string
}

export interface SocialLinkListResponse {
  count: number
  next: string | null
  previous: string | null
  results: SocialLink[]
}

export interface SocialLinkInput {
  name: string
  key: string
  icon?: string
  icon_svg?: string
  base_url?: string
}

export interface SocialLinkListParams {
  page?: number
  page_size?: number
}

const socialService = {
  async list(params: SocialLinkListParams = {}): Promise<SocialLinkListResponse> {
    const { page = 1, page_size } = params
    const queryParams = new URLSearchParams()
    queryParams.append('page', String(page))
    if (page_size) {
      queryParams.append('page_size', String(page_size))
    }
    const response = await api.get<SocialLinkListResponse>(`/social/?${queryParams.toString()}`)
    return response.data
  },

  async get(id: number): Promise<SocialLink> {
    const response = await api.get<SocialLink>(`/social/${id}/`)
    return response.data
  },

  async create(data: SocialLinkInput): Promise<SocialLink> {
    const response = await api.post<SocialLink>('/social/', data)
    return response.data
  },

  async update(id: number, data: Partial<SocialLinkInput>): Promise<SocialLink> {
    const response = await api.patch<SocialLink>(`/social/${id}/`, data)
    return response.data
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/social/${id}/`)
  },
}

export default socialService
