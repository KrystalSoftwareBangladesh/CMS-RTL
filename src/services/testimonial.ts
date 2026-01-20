import { createBaseService, type PaginatedResponse } from './baseService'
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

export type TestimonialListResponse = PaginatedResponse<Testimonial>

const baseService = createBaseService<Testimonial, TestimonialInput>('/testimonial/')

const testimonialService = {
  ...baseService,

  async create(data: TestimonialInput, avatarFile?: File): Promise<Testimonial> {
    if (avatarFile) {
      return baseService.createWithFile(data, 'avatar', avatarFile)
    }
    return baseService.create(data)
  },

  async update(id: number, data: Partial<TestimonialInput>, avatarFile?: File): Promise<Testimonial> {
    if (avatarFile) {
      return baseService.updateWithFile(id, data, 'avatar', avatarFile)
    }
    return baseService.update(id, data)
  }
}

export default testimonialService
