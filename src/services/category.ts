import api from './api'

export interface Category {
  id: number
  name: string
  slug: string
  description: string | null
  parent: number | null
  created_at: string
  updated_at: string
}

export interface CategoryListResponse {
  count: number
  next: string | null
  previous: string | null
  results: Category[]
}

export interface CategoryInput {
  name: string
  slug?: string
  description?: string
  parent?: number | null
}

const categoryService = {
  async list(): Promise<CategoryListResponse> {
    const response = await api.get<CategoryListResponse>('/categories/')
    return response.data
  },

  async get(id: number): Promise<Category> {
    const response = await api.get<Category>(`/categories/${id}/`)
    return response.data
  },

  async create(data: CategoryInput): Promise<Category> {
    const response = await api.post<Category>('/categories/', data)
    return response.data
  },

  async update(id: number, data: Partial<CategoryInput>): Promise<Category> {
    const response = await api.patch<Category>(`/categories/${id}/`, data)
    return response.data
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/categories/${id}/`)
  },
}

export default categoryService
