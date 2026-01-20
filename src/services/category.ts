import { createBaseService, type PaginatedResponse } from './baseService'
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

export interface CategoryInput {
  name: string
  description?: string
  parent?: number | null
}

export type CategoryListResponse = PaginatedResponse<Category>

const baseService = createBaseService<Category, CategoryInput>('/categories/')

const categoryService = {
  ...baseService,

  async search(query: string): Promise<Category[]> {
    const response = await api.get<CategoryListResponse>(`/categories/?search=${encodeURIComponent(query)}`)
    return response.data.results
  }
}

export default categoryService
