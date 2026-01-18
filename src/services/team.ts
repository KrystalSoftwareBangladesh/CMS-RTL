import api from './api'

export interface SocialProfile {
  platform: number
  platform_name: string
  platform_icon: string
  profile_url: string
  order: number
}

export interface TeamMember {
  id: number
  name: string
  slug: string
  designation: string
  short_bio: string
  bio: string
  profile_image: string
  social_profiles: SocialProfile[]
  is_featured: boolean
  order: number
}

export interface TeamMemberListResponse {
  count: number
  next: string | null
  previous: string | null
  results: TeamMember[]
}

export interface TeamMemberInput {
  name: string
  designation?: string
  short_bio?: string
  bio?: string
  profile_image?: string
  is_featured?: boolean
  order?: number
}

export interface TeamMemberListParams {
  page?: number
  page_size?: number
}

const teamService = {
  async list(params: TeamMemberListParams = {}): Promise<TeamMemberListResponse> {
    const { page = 1, page_size } = params
    const queryParams = new URLSearchParams()
    queryParams.append('page', String(page))
    if (page_size) {
      queryParams.append('page_size', String(page_size))
    }
    const response = await api.get<TeamMemberListResponse>(`/team/?${queryParams.toString()}`)
    return response.data
  },

  async get(slug: string): Promise<TeamMember> {
    const response = await api.get<TeamMember>(`/team/${slug}/`)
    return response.data
  },

  async create(data: TeamMemberInput): Promise<TeamMember> {
    const response = await api.post<TeamMember>('/team/', data)
    return response.data
  },

  async update(slug: string, data: Partial<TeamMemberInput>): Promise<TeamMember> {
    const response = await api.patch<TeamMember>(`/team/${slug}/`, data)
    return response.data
  },

  async delete(slug: string): Promise<void> {
    await api.delete(`/team/${slug}/`)
  },
}

export default teamService
