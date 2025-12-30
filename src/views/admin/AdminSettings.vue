<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import BaseCard from '@/components/base/BaseCard.vue'
import BaseButton from '@/components/base/BaseButton.vue'

const { t } = useI18n()

const companyName = ref('Rising Trading Ltd.')
const companyEmail = ref('info@risingtrading.com')
const companyPhone = ref('+880 1234 567890')
const companyAddress = ref('123 Trade Center, Dhaka, Bangladesh')

const socialLinks = ref({
  facebook: 'https://facebook.com/risingtrading',
  twitter: 'https://twitter.com/risingtrading',
  linkedin: 'https://linkedin.com/company/risingtrading',
  instagram: 'https://instagram.com/risingtrading'
})
</script>

<template>
  <AdminLayout :title="t('admin.settings.title')" :subtitle="t('admin.settings.subtitle')">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <BaseCard padding="lg">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">{{ t('admin.settings.companyInfo') }}</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('admin.settings.companyName') }}</label>
            <input 
              v-model="companyName"
              type="text" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('admin.settings.email') }}</label>
            <input 
              v-model="companyEmail"
              type="email" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('admin.settings.phone') }}</label>
            <input 
              v-model="companyPhone"
              type="tel" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('admin.settings.address') }}</label>
            <textarea 
              v-model="companyAddress"
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none"
            ></textarea>
          </div>
          <BaseButton variant="secondary" size="sm">
            {{ t('admin.settings.saveChanges') }}
          </BaseButton>
        </div>
      </BaseCard>
      
      <BaseCard padding="lg">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">{{ t('admin.settings.socialLinks') }}</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
            <input 
              v-model="socialLinks.facebook"
              type="url" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
            <input 
              v-model="socialLinks.twitter"
              type="url" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
            <input 
              v-model="socialLinks.linkedin"
              type="url" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
            <input 
              v-model="socialLinks.instagram"
              type="url" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
          </div>
          <BaseButton variant="secondary" size="sm">
            {{ t('admin.settings.saveChanges') }}
          </BaseButton>
        </div>
      </BaseCard>
      
      <BaseCard padding="lg">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">{{ t('admin.settings.seoSettings') }}</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('admin.settings.metaTitle') }}</label>
            <input 
              type="text" 
              value="Rising Trading Ltd. - Global Trading & Logistics"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('admin.settings.metaDescription') }}</label>
            <textarea 
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none"
            >Leading global trading and logistics company based in Bangladesh, providing reliable import, export, and distribution services worldwide.</textarea>
          </div>
          <BaseButton variant="secondary" size="sm">
            {{ t('admin.settings.saveChanges') }}
          </BaseButton>
        </div>
      </BaseCard>
      
      <BaseCard padding="lg">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">{{ t('admin.settings.dangerZone') }}</h3>
        <div class="space-y-4">
          <div class="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 class="text-sm font-medium text-red-800 mb-2">{{ t('admin.settings.clearCache') }}</h4>
            <p class="text-sm text-red-600 mb-3">{{ t('admin.settings.clearCacheDesc') }}</p>
            <button class="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors">
              {{ t('admin.settings.clearCacheBtn') }}
            </button>
          </div>
        </div>
      </BaseCard>
    </div>
  </AdminLayout>
</template>
