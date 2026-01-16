import api from './api'

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

export interface FAQListResponse {
  count: number
  next: string | null
  previous: string | null
  results: FAQ[]
}

export interface FAQInput {
  question: string
  answer: string
  category?: number
  order?: number
  status?: boolean
}

export interface FAQListParams {
  page?: number
  page_size?: number
}

const faqService = {
  async list(params: FAQListParams = {}): Promise<FAQListResponse> {
    const { page = 1, page_size } = params
    const queryParams = new URLSearchParams()
    queryParams.append('page', String(page))
    if (page_size) {
      queryParams.append('page_size', String(page_size))
    }
    const response = await api.get<FAQListResponse>(`/faqs/?${queryParams.toString()}`)
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
