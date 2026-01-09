import api from './api'

export interface FAQ {
  id: number
  question: string
  answer: string
  category: number | null
  order: number
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface FAQListResponse {
  count: number
  next: string | null
  previous: string | null
  results: FAQ[]
}

export interface FAQInput {
  question: string
  answer: string
  category?: number | null
  order?: number
  is_published?: boolean
}

const faqService = {
  async list(page = 1): Promise<FAQListResponse> {
    const response = await api.get<FAQListResponse>(`/faqs/?page=${page}`)
    return response.data
  },

  async get(id: number): Promise<FAQ> {
    const response = await api.get<FAQ>(`/faqs/${id}/`)
    return response.data
  },

  async create(data: FAQInput): Promise<FAQ> {
    const response = await api.post<FAQ>('/faqs/', data)
    return response.data
  },

  async update(id: number, data: Partial<FAQInput>): Promise<FAQ> {
    const response = await api.patch<FAQ>(`/faqs/${id}/`, data)
    return response.data
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/faqs/${id}/`)
  },
}

export default faqService
