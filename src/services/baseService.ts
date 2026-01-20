import api from './api'

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface ListParams {
  page?: number
  page_size?: number
  [key: string]: unknown
}

export function createBaseService<T, TInput>(endpoint: string, useSlug = false) {
  const normalizedEndpoint = endpoint.endsWith('/') ? endpoint : `${endpoint}/`

  return {
    async list(params: ListParams = {}): Promise<PaginatedResponse<T>> {
      const { page = 1, page_size, ...rest } = params
      const queryParams = new URLSearchParams()
      queryParams.append('page', String(page))
      if (page_size) {
        queryParams.append('page_size', String(page_size))
      }
      Object.entries(rest).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value))
        }
      })
      const response = await api.get<PaginatedResponse<T>>(`${normalizedEndpoint}?${queryParams.toString()}`)
      return response.data
    },

    async listAll(): Promise<T[]> {
      const items: T[] = []
      let page = 1
      let hasNext = true
      while (hasNext) {
        const response = await api.get<PaginatedResponse<T>>(`${normalizedEndpoint}?page=${page}`)
        items.push(...response.data.results)
        hasNext = !!response.data.next
        page++
      }
      return items
    },

    async get(id: number | string): Promise<T> {
      const response = await api.get<T>(`${normalizedEndpoint}${id}/`)
      return response.data
    },

    async create(data: TInput): Promise<T> {
      const response = await api.post<T>(normalizedEndpoint, data)
      return response.data
    },

    async update(id: number | string, data: Partial<TInput>): Promise<T> {
      const response = await api.patch<T>(`${normalizedEndpoint}${id}/`, data)
      return response.data
    },

    async delete(id: number | string): Promise<void> {
      await api.delete(`${normalizedEndpoint}${id}/`)
    },

    async createWithFile(data: TInput, fileField: string, file: File): Promise<T> {
      const formData = new FormData()
      Object.entries(data as Record<string, unknown>).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value))
        }
      })
      formData.append(fileField, file)
      const response = await api.post<T>(normalizedEndpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return response.data
    },

    async updateWithFile(id: number | string, data: Partial<TInput>, fileField: string, file: File): Promise<T> {
      const formData = new FormData()
      Object.entries(data as Record<string, unknown>).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value))
        }
      })
      formData.append(fileField, file)
      const response = await api.patch<T>(`${normalizedEndpoint}${id}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return response.data
    }
  }
}
