import { createBaseService, type PaginatedResponse } from './baseService'

export interface FAQ {
  id: number
  question: string
  answer: string
  category: number
  order: number
  status: boolean
  created_at: string
  updated_at: string
}

export interface FAQInput {
  question: string
  answer: string
  category?: number
  order?: number
  status?: boolean
}

export type FAQListResponse = PaginatedResponse<FAQ>

const faqService = createBaseService<FAQ, FAQInput>('/faqs/')

export default faqService
