<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionHeader from '@/components/base/SectionHeader.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseCard from '@/components/base/BaseCard.vue'
import CTASection from '@/components/sections/CTASection.vue'
import teamMembersData from '@/data/team.json'
import warehouseImage from '@/assets/images/warehouse_worker_wit_259b881f.jpg'
import cargoImage from '@/assets/images/cargo_ship_container_77664e3d.jpg'

const { t } = useI18n()

interface TeamMember {
  id: number
  name: string
  designation: string
  image?: string
  phone: string
  email: string
}

const teamImages = import.meta.glob('../assets/images/*', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const teamMembers = ref<TeamMember[]>(teamMembersData as TeamMember[])
const featuredManagement = computed(() => teamMembers.value[0] ?? null)
const leadershipMembers = computed(() => teamMembers.value.slice(1))

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function getMemberImage(imageName?: string): string | null {
  if (!imageName) return null
  return teamImages[`../assets/images/${imageName}`] ?? null
}
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

        <div v-if="teamMembers.length === 0" class="text-center py-8 text-white/70">
          {{ t('common.noData') }}
        </div>

        <div v-else class="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.95fr)]">
          <BaseCard
            v-if="featuredManagement"
            padding="lg"
            :shadow="false"
            class="min-h-[30rem] overflow-hidden border border-white/10 bg-white/8 text-white backdrop-blur-sm xl:min-h-[34rem]"
          >
            <div class="flex h-full flex-col gap-10 lg:flex-row lg:items-center">
              <div class="flex flex-col items-center text-center lg:w-64 lg:flex-shrink-0">
                <div class="mb-6 flex h-44 w-44 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-gradient-to-br from-secondary to-secondary-dark text-4xl font-bold shadow-lg shadow-secondary/20 xl:h-52 xl:w-52">
                  <img
                    v-if="getMemberImage(featuredManagement.image)"
                    :src="getMemberImage(featuredManagement.image) ?? undefined"
                    :alt="featuredManagement.name"
                    class="h-full w-full object-cover"
                  />
                  <span v-else>{{ getInitials(featuredManagement.name) }}</span>
                </div>
                <span class="rounded-full border border-secondary/40 bg-secondary/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-secondary-light">
                  {{ featuredManagement.designation }}
                </span>
              </div>

              <div class="flex-1">
                <p class="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-white/50">
                  {{ t('about.teamLabel') }}
                </p>
                <h3 class="mb-3 text-3xl font-bold text-white xl:text-4xl">
                  {{ featuredManagement.name }}
                </h3>
                <p class="mb-8 max-w-2xl text-base leading-7 text-white/70 xl:text-lg">
                  {{ t('about.teamSubtitle') }}
                </p>
                <div class="grid gap-5 sm:grid-cols-2">
                  <a
                    :href="`tel:${featuredManagement.phone}`"
                    class="rounded-2xl border border-white/10 bg-white/6 px-6 py-5 transition-colors hover:border-secondary/50 hover:bg-white/10"
                  >
                    <p class="mb-1 text-xs uppercase tracking-[0.24em] text-white/50">{{ t('contact.phone') }}</p>
                    <p class="text-base font-medium text-white">{{ featuredManagement.phone }}</p>
                  </a>
                  <a
                    :href="`mailto:${featuredManagement.email}`"
                    class="rounded-2xl border border-white/10 bg-white/6 px-6 py-5 transition-colors hover:border-secondary/50 hover:bg-white/10"
                  >
                    <p class="mb-1 text-xs uppercase tracking-[0.24em] text-white/50">{{ t('contact.email') }}</p>
                    <p class="break-all text-base font-medium text-white">{{ featuredManagement.email }}</p>
                  </a>
                </div>
              </div>
            </div>
          </BaseCard>

          <div class="grid gap-8">
            <BaseCard
              v-for="member in leadershipMembers"
              :key="member.id"
              padding="lg"
              :shadow="false"
              class="min-h-[14rem] border border-white/10 bg-white/8 text-white backdrop-blur-sm xl:min-h-[16rem]"
            >
              <div class="flex h-full items-start gap-5">
                <div class="flex h-24 w-24 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-secondary to-secondary-dark text-2xl font-bold text-white xl:h-28 xl:w-28">
                  <img
                    v-if="getMemberImage(member.image)"
                    :src="getMemberImage(member.image) ?? undefined"
                    :alt="member.name"
                    class="h-full w-full object-cover"
                  />
                  <span v-else>{{ getInitials(member.name) }}</span>
                </div>
                <div class="min-w-0 flex-1">
                  <p class="mb-1 text-xs uppercase tracking-[0.24em] text-secondary-light">
                    {{ member.designation }}
                  </p>
                  <h3 class="mb-5 text-2xl font-semibold text-white">{{ member.name }}</h3>
                  <div class="space-y-4 text-base">
                    <a
                      :href="`tel:${member.phone}`"
                      class="block text-white/75 transition-colors hover:text-white"
                    >
                      {{ member.phone }}
                    </a>
                    <a
                      :href="`mailto:${member.email}`"
                      class="block break-all text-white/75 transition-colors hover:text-white"
                    >
                      {{ member.email }}
                    </a>
                  </div>
                </div>
              </div>
            </BaseCard>
          </div>
        </div>
      </div>
    </section>
    <CTASection />
  </main>
</template>
