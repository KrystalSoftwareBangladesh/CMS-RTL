<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseButton from '@/components/base/BaseButton.vue'
import contactData from '@/data/contact.json'
import socialService, { type SocialLink } from '@/services/social'

const { t } = useI18n()

const socialLinks = ref<SocialLink[]>([])

interface ContactInfo {
  phones: string[]
  emails: string[]
}

const contactInfo = contactData as ContactInfo

async function fetchSocialLinks() {
  try {
    const response = await socialService.list()
    socialLinks.value = response.results
  } catch (err) {
    console.error('Failed to fetch social links:', err)
  }
}

onMounted(() => {
  fetchSocialLinks()
})
</script>

<template>
  <footer class="border-t border-slate-200 bg-slate-50">
    <div class="border-b border-slate-200 bg-primary text-white">
      <div class="container mx-auto px-6 py-10">
        <div class="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div class="max-w-2xl">
            <p class="mb-2 text-sm font-semibold uppercase tracking-[0.32em] text-white/70">Ready To Move Forward</p>
            <h3 class="text-3xl font-bold">Need pricing, booking, or a custom trade solution?</h3>
            <p class="mt-3 text-white/80">
              Choose your next step and let our team help you ship faster, plan better, and scale with confidence.
            </p>
          </div>
          <div class="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <BaseButton to="/contact" variant="secondary">
              Get Quotation
            </BaseButton>
            <BaseButton to="/services" variant="outline">
              Book Service
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
    <div class="container mx-auto px-6 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <div class="flex items-center mb-6">
            <img src="/logo-black.png" alt="Rising Trading Ltd." class="h-12" />
          </div>
          <p class="text-gray-700 text-sm mb-6">
            {{ t('footer.tagline') }}
          </p>
          <div class="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_16px_40px_-34px_rgba(15,23,42,0.3)]">
            <input
              type="email"
              placeholder="E-mail"
              class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-secondary focus:outline-none"
            />
            <button class="bg-secondary text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-secondary-light transition-colors w-full">
              {{ t('footer.subscribe') }}
            </button>
          </div>

          <div class="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col">
            <BaseButton to="/contact" variant="secondary" size="sm">
              Contact Us
            </BaseButton>
            <BaseButton to="/services" variant="white" size="sm">
              Learn More
            </BaseButton>
          </div>
        </div>

        <div>
          <h4 class="font-semibold text-gray-900 mb-4">{{ t('footer.services') }}</h4>
          <ul class="space-y-3">
            <li><a href="#" class="text-gray-700 hover:text-secondary transition-colors text-sm">{{ t('footer.importExport') }}</a></li>
            <li><a href="#" class="text-gray-700 hover:text-secondary transition-colors text-sm">{{ t('footer.wholesaleTrade') }}</a></li>
            <li><a href="#" class="text-gray-700 hover:text-secondary transition-colors text-sm">{{ t('footer.supplyChain') }}</a></li>
            <li><a href="#" class="text-gray-700 hover:text-secondary transition-colors text-sm">{{ t('footer.distribution') }}</a></li>
            <li><a href="#" class="text-gray-700 hover:text-secondary transition-colors text-sm">{{ t('footer.logistics') }}</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold text-gray-900 mb-4">{{ t('footer.resources') }}</h4>
          <ul class="space-y-3">
            <li><a href="#" class="text-gray-700 hover:text-secondary transition-colors text-sm">{{ t('footer.documentation') }}</a></li>
            <li><a href="#" class="text-gray-700 hover:text-secondary transition-colors text-sm">{{ t('footer.aboutUs') }}</a></li>
            <li><a href="#" class="text-gray-700 hover:text-secondary transition-colors text-sm">{{ t('footer.newsUpdates') }}</a></li>
            <li><a href="#" class="text-gray-700 hover:text-secondary transition-colors text-sm">{{ t('footer.contact') }}</a></li>
            <li><a href="#" class="text-gray-700 hover:text-secondary transition-colors text-sm">{{ t('footer.partnerWithUs') }}</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold text-gray-900 mb-4">{{ t('footer.contactUs') }}</h4>
          <ul class="space-y-3">
            <li v-for="phone in contactInfo.phones" :key="phone">
              <a
                :href="`tel:${phone}`"
                class="text-gray-700 hover:text-secondary transition-colors text-sm"
              >
                {{ phone }}
              </a>
            </li>
            <li v-for="email in contactInfo.emails" :key="email">
              <a
                :href="`mailto:${email}`"
                class="text-gray-700 hover:text-secondary transition-colors text-sm break-all"
              >
                {{ email }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="border-t border-slate-200">
      <div class="container mx-auto px-6 py-6">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="text-center md:text-left">
            <!-- <p class="text-gray-500 text-sm">
              © 2026
              <a
                href="https://github.com/KrystalSoftwareBangladesh/"
                target="_blank"
                rel="noopener noreferrer"
                class="text-secondary hover:underline"
              >Krystal Software Bangladesh</a>. {{ t('footer.allRightsReserved') }}
            </p> -->
          </div>
          <div class="flex items-center gap-4">
            <a
              v-for="link in socialLinks"
              :key="link.id"
              :href="link.base_url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-600 hover:text-secondary transition-colors"
              :title="link.name"
            >
              <svg v-if="link.icon_svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path :d="link.icon_svg" />
              </svg>
              <span v-else class="text-xs">{{ link.name }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
