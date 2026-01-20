import { createBaseService, type PaginatedResponse } from './baseService'

export interface SocialProfileInput {
  platform: number
  profile_url: string
  order: number
}

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

export interface TeamMemberInput {
  name: string
  slug?: string
  designation?: string
  short_bio?: string
  bio?: string
  profile_image?: string
  social_profiles?: SocialProfileInput[]
  is_featured?: boolean
  order?: number
}

export type TeamMemberListResponse = PaginatedResponse<TeamMember>

const teamService = createBaseService<TeamMember, TeamMemberInput>('/team/')

export default teamService
