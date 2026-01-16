import api from './api'

export interface ProjectCategory {
  id: number
  name: string
  slug: string
  description: string
  parent: number | null
  created_at: string
  updated_at: string
}

export interface Project {
  id: number
  title: string
  slug: string
  short_description: string
  description: string
  cover_image: string
  deliveries_count: string
  countries_count: number
  on_time_rate: number
  category: ProjectCategory | null
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

export interface ProjectListResponse {
  count: number
  next: string | null
  previous: string | null
  results: Project[]
}

export interface ProjectInput {
  title: string
  short_description?: string
  description?: string
  cover_image?: string
  deliveries_count?: string
  countries_count?: number
  on_time_rate?: number
  category_id?: number
  is_active?: boolean
  is_featured?: boolean
  status?: boolean
  order?: number
}

export interface ProjectListParams {
  page?: number
  page_size?: number
  is_featured?: boolean
}

const projectService = {
  async list(params: ProjectListParams = {}): Promise<ProjectListResponse> {
    const { page = 1, page_size, is_featured } = params
    const queryParams = new URLSearchParams()
    queryParams.append('page', String(page))
    if (page_size) {
      queryParams.append('page_size', String(page_size))
    }
    if (is_featured !== undefined) {
      queryParams.append('is_featured', String(is_featured))
    }
    const response = await api.get<ProjectListResponse>(`/project/?${queryParams.toString()}`)
    return response.data
  },

  async get(id: number): Promise<Project> {
    const response = await api.get<Project>(`/project/${id}/`)
    return response.data
  },

  async create(data: ProjectInput, coverImage?: File): Promise<Project> {
    if (coverImage) {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value))
        }
      })
      formData.append('cover_image', coverImage)
      const response = await api.post<Project>('/project/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return response.data
    }
    const response = await api.post<Project>('/project/', data)
    return response.data
  },

  async update(id: number, data: ProjectInput, coverImage?: File): Promise<Project> {
    if (coverImage) {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value))
        }
      })
      formData.append('cover_image', coverImage)
      const response = await api.patch<Project>(`/project/${id}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return response.data
    }
    const response = await api.patch<Project>(`/project/${id}/`, data)
    return response.data
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/project/${id}/`)
  }
}

export default projectService
