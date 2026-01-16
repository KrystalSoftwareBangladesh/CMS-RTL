import api from './api'

export interface NewsCategory {
  id: number
  name: string
  slug: string
  description: string
  parent: number | null
  created_at: string
  updated_at: string
}

export interface News {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image: string
  author_name: string
  read_time: number
  category: NewsCategory | null
  is_active: boolean
  is_featured: boolean
  status: boolean
  order: number
  created_by: number
  updated_by: number
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface NewsListResponse {
  count: number
  next: string | null
  previous: string | null
  results: News[]
}

export interface NewsInput {
  title: string
  excerpt: string
  content: string
  cover_image?: string
  author_name?: string
  read_time?: number
  category_id?: number
  is_active?: boolean
  is_featured?: boolean
  status?: boolean
  order?: number
}

export interface NewsListParams {
  page?: number
  page_size?: number
  is_featured?: boolean
}

const newsService = {
  async list(params: NewsListParams = {}): Promise<NewsListResponse> {
    const { page = 1, page_size, is_featured } = params
    const queryParams = new URLSearchParams()
    queryParams.append('page', String(page))
    if (page_size) {
      queryParams.append('page_size', String(page_size))
    }
    if (is_featured !== undefined) {
      queryParams.append('is_featured', String(is_featured))
    }
    const response = await api.get<NewsListResponse>(`/news/?${queryParams.toString()}`)
    return response.data
  },

  async get(id: number): Promise<News> {
    const response = await api.get<News>(`/news/${id}/`)
    return response.data
  },

  async create(data: NewsInput, coverImage?: File): Promise<News> {
    if (coverImage) {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value))
        }
      })
      formData.append('cover_image', coverImage)
      const response = await api.post<News>('/news/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return response.data
    }
    const response = await api.post<News>('/news/', data)
    return response.data
  },

  async update(id: number, data: Partial<NewsInput>, coverImage?: File): Promise<News> {
    if (coverImage) {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value))
        }
      })
      formData.append('cover_image', coverImage)
      const response = await api.patch<News>(`/news/${id}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return response.data
    }
    const response = await api.patch<News>(`/news/${id}/`, data)
    return response.data
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/news/${id}/`)
  },
}

export default newsService
