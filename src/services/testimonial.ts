import api from './api'

export interface Testimonial {
  id: number
  name: string
  designation: string
  company: string
  message: string
  avatar: string
  rating: number
  is_featured: boolean
  order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface TestimonialListResponse {
  count: number
  next: string | null
  previous: string | null
  results: Testimonial[]
}

export interface TestimonialInput {
  name: string
  designation?: string
  company?: string
  message?: string
  avatar?: string
  rating?: number
  is_featured?: boolean
  order?: number
}

export interface TestimonialListParams {
  page?: number
  page_size?: number
}

const testimonialService = {
  async list(params: TestimonialListParams = {}): Promise<TestimonialListResponse> {
    const { page = 1, page_size } = params
    const queryParams = new URLSearchParams()
    queryParams.append('page', String(page))
    if (page_size) {
      queryParams.append('page_size', String(page_size))
    }
    const response = await api.get<TestimonialListResponse>(`/testimonial/?${queryParams.toString()}`)
    return response.data
  },

  async get(id: number): Promise<Testimonial> {
    const response = await api.get<Testimonial>(`/testimonial/${id}/`)
    return response.data
  },

  async create(data: TestimonialInput, avatarFile?: File): Promise<Testimonial> {
    if (avatarFile) {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value))
        }
      })
      formData.append('avatar', avatarFile)
      const response = await api.post<Testimonial>('/testimonial/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return response.data
    }
    const response = await api.post<Testimonial>('/testimonial/', data)
    return response.data
  },

  async update(id: number, data: Partial<TestimonialInput>, avatarFile?: File): Promise<Testimonial> {
    if (avatarFile) {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value))
        }
      })
      formData.append('avatar', avatarFile)
      const response = await api.patch<Testimonial>(`/testimonial/${id}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return response.data
    }
    const response = await api.patch<Testimonial>(`/testimonial/${id}/`, data)
    return response.data
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/testimonial/${id}/`)
  },
}

export default testimonialService
