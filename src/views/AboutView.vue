<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionHeader from '@/components/base/SectionHeader.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseCard from '@/components/base/BaseCard.vue'
import TestimonialsSection from '@/components/sections/TestimonialsSection.vue'
import CTASection from '@/components/sections/CTASection.vue'
import teamService, { type TeamMember } from '@/services/team'
import warehouseImage from '@/assets/images/warehouse_worker_wit_259b881f.jpg'
import cargoImage from '@/assets/images/cargo_ship_container_77664e3d.jpg'

const { t } = useI18n()

const teamMembers = ref<TeamMember[]>([])
const loadingTeam = ref(false)

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

async function fetchTeamMembers() {
  loadingTeam.value = true
  try {
    const response = await teamService.list({ page_size: 8 })
    teamMembers.value = response.results
  } catch (err) {
    console.error('Failed to fetch team members:', err)
  } finally {
    loadingTeam.value = false
  }
}

onMounted(() => {
  fetchTeamMembers()
})
</script>

<template>
  <main>
    <section class="relative py-32 bg-primary">
      <div
        class="absolute inset-0 bg-cover bg-center bg-no-repeat"
        :style="{ backgroundImage: `url(${cargoImage})` }"
      >
        <div class="absolute inset-0 bg-primary-dark/80"></div>
      </div>
      <div class="relative z-10 container mx-auto px-6 text-center">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">{{ t('about.pageTitle') }}</h1>
        <p class="text-white/70 text-lg max-w-2xl mx-auto">
          {{ t('about.pageSubtitle') }}
        </p>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="container mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span class="text-sm font-medium tracking-wider uppercase text-secondary mb-2 block">{{ t('about.label') }}</span>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {{ t('about.title') }}
            </h2>
            <p class="text-gray-600 mb-4">
              {{ t('about.description1') }}
            </p>
            <p class="text-gray-600 mb-6">
              {{ t('about.description2') }}
            </p>
            <BaseButton variant="primary">
              {{ t('hero.ourServices') }}
            </BaseButton>
          </div>
          <div class="relative">
            <img
              :src="warehouseImage"
              alt="Warehouse operations"
              class="rounded-2xl shadow-xl w-full h-[400px] object-cover"
            />
            <div class="absolute -bottom-6 -left-6 bg-secondary text-white p-6 rounded-2xl shadow-lg">
              <div class="text-4xl font-bold">25+</div>
              <div class="text-sm">{{ t('about.yearsExcellence') }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-secondary mb-2">25+</div>
            <div class="text-gray-600">{{ t('about.yearsExperience') }}</div>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-secondary mb-2">500+</div>
            <div class="text-gray-600">{{ t('about.projectsCompleted') }}</div>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-secondary mb-2">150+</div>
            <div class="text-gray-600">{{ t('about.teamMembers') }}</div>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-secondary mb-2">50+</div>
            <div class="text-gray-600">{{ t('about.countriesServed') }}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="container mx-auto px-6">
        <SectionHeader
          :label="t('about.valuesLabel')"
          :title="t('about.valuesTitle')"
          :subtitle="t('about.valuesSubtitle')"
        />
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <BaseCard :hover="true">
            <div class="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
              <svg class="w-7 h-7 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ t('about.reliability') }}</h3>
            <p class="text-gray-600 text-sm">{{ t('about.reliabilityDesc') }}</p>
          </BaseCard>
          <BaseCard :hover="true">
            <div class="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
              <svg class="w-7 h-7 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ t('about.customerFocus') }}</h3>
            <p class="text-gray-600 text-sm">{{ t('about.customerFocusDesc') }}</p>
          </BaseCard>
          <BaseCard :hover="true">
            <div class="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
              <svg class="w-7 h-7 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ t('about.globalReach') }}</h3>
            <p class="text-gray-600 text-sm">{{ t('about.globalReachDesc') }}</p>
          </BaseCard>
          <BaseCard :hover="true">
            <div class="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
              <svg class="w-7 h-7 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ t('about.sustainability') }}</h3>
            <p class="text-gray-600 text-sm">{{ t('about.sustainabilityDesc') }}</p>
          </BaseCard>
        </div>
      </div>
    </section>

    <section class="py-20 bg-primary">
      <div class="container mx-auto px-6">
        <SectionHeader
          :label="t('about.teamLabel')"
          :title="t('about.teamTitle')"
          :subtitle="t('about.teamSubtitle')"
          :light="true"
        />
        
        <div v-if="loadingTeam" class="text-center py-8 text-white/70">
          {{ t('common.loading') }}
        </div>
        
        <div v-else-if="teamMembers.length === 0" class="text-center py-8 text-white/70">
          {{ t('common.noData') }}
        </div>
        
        <div v-else class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          <div
            v-for="member in teamMembers"
            :key="member.id"
            class="text-center group"
          >
            <div v-if="member.profile_image" class="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden group-hover:scale-105 transition-transform">
              <img :src="member.profile_image" :alt="member.name" class="w-full h-full object-cover" />
            </div>
            <div v-else class="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-secondary to-secondary-dark flex items-center justify-center text-white text-3xl font-bold group-hover:scale-105 transition-transform">
              {{ getInitials(member.name) }}
            </div>
            <h3 class="text-white font-semibold text-lg">{{ member.name }}</h3>
            <p class="text-gray-400 mb-3">{{ member.designation }}</p>
            <div v-if="member.social_profiles.length > 0" class="flex items-center justify-center gap-3">
              <a
                v-for="profile in member.social_profiles"
                :key="profile.platform"
                :href="profile.profile_url"
                target="_blank"
                rel="noopener noreferrer"
                class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-secondary hover:text-white transition-colors"
                :title="profile.platform_name"
              >
                <svg v-if="profile.platform_icon" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path :d="profile.platform_icon" />
                </svg>
                <span v-else class="text-xs">{{ profile.platform_name?.charAt(0) }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <TestimonialsSection />

    <CTASection />
  </main>
</template>
