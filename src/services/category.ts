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
  description?: string
  parent?: number | null
}

const categoryService = {
  async list(page = 1): Promise<CategoryListResponse> {
    const response = await api.get<CategoryListResponse>(`/categories/?page=${page}`)
    return response.data
  },

  async listAll(): Promise<Category[]> {
    const categories: Category[] = []
    let page = 1
    let hasNext = true
    while (hasNext) {
      const response = await api.get<CategoryListResponse>(`/categories/?page=${page}`)
      categories.push(...response.data.results)
      hasNext = !!response.data.next
      page++
    }
    return categories
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
