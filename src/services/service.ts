import api from './api'

export interface Service {
  id: number
  title: string
  slug: string
  description: string
  is_active: boolean
  is_featured: boolean
  order: number
  created_by: number
  updated_by: number
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface ServiceListResponse {
  count: number
  next: string | null
  previous: string | null
  results: Service[]
}

export interface ServiceInput {
  title: string
  description: string
  is_active?: boolean
  is_featured?: boolean
  order?: number
}

export interface ServiceListParams {
  page?: number
  page_size?: number
}

const serviceService = {
  async list(params: ServiceListParams = {}): Promise<ServiceListResponse> {
    const { page = 1, page_size } = params
    const queryParams = new URLSearchParams()
    queryParams.append('page', String(page))
    if (page_size) {
      queryParams.append('page_size', String(page_size))
    }
    const response = await api.get<ServiceListResponse>(`/service/?${queryParams.toString()}`)
    return response.data
  },

  async get(id: number): Promise<Service> {
    const response = await api.get<Service>(`/service/${id}/`)
    return response.data
  },

  async create(data: ServiceInput): Promise<Service> {
    const response = await api.post<Service>('/service/', data)
    return response.data
  },

  async update(id: number, data: Partial<ServiceInput>): Promise<Service> {
    const response = await api.patch<Service>(`/service/${id}/`, data)
    return response.data
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/service/${id}/`)
  },
}

export default serviceService
