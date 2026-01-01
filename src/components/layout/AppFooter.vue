<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const contactInfo = {
  phone: '+880 1XXX-XXXXXX',
  email: 'info@risingtradingltd.com'
}
</script>

<template>
  <footer class="bg-white border-t border-gray-100">
    <div class="container mx-auto px-6 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <div class="flex items-center mb-6">
            <img src="/logo-black.png" alt="Rising Trading Ltd." class="h-12" />
          </div>
          <p class="text-gray-600 text-sm mb-6">
            {{ t('footer.tagline') }}
          </p>
          <div class="flex flex-col gap-2">
            <input
              type="email"
              placeholder="E-mail"
              class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-secondary"
            />
            <button class="bg-secondary text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-secondary-light transition-colors w-full">
              {{ t('footer.subscribe') }}
            </button>
          </div>
        </div>

        <div>
          <h4 class="font-semibold text-gray-900 mb-4">{{ t('footer.services') }}</h4>
          <ul class="space-y-3">
            <li><a href="#" class="text-gray-600 hover:text-secondary transition-colors text-sm">{{ t('footer.importExport') }}</a></li>
            <li><a href="#" class="text-gray-600 hover:text-secondary transition-colors text-sm">{{ t('footer.wholesaleTrade') }}</a></li>
            <li><a href="#" class="text-gray-600 hover:text-secondary transition-colors text-sm">{{ t('footer.supplyChain') }}</a></li>
            <li><a href="#" class="text-gray-600 hover:text-secondary transition-colors text-sm">{{ t('footer.distribution') }}</a></li>
            <li><a href="#" class="text-gray-600 hover:text-secondary transition-colors text-sm">{{ t('footer.logistics') }}</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold text-gray-900 mb-4">{{ t('footer.resources') }}</h4>
          <ul class="space-y-3">
            <li><a href="#" class="text-gray-600 hover:text-secondary transition-colors text-sm">{{ t('footer.documentation') }}</a></li>
            <li><a href="#" class="text-gray-600 hover:text-secondary transition-colors text-sm">{{ t('footer.aboutUs') }}</a></li>
            <li><a href="#" class="text-gray-600 hover:text-secondary transition-colors text-sm">{{ t('footer.newsUpdates') }}</a></li>
            <li><a href="#" class="text-gray-600 hover:text-secondary transition-colors text-sm">{{ t('footer.contact') }}</a></li>
            <li><a href="#" class="text-gray-600 hover:text-secondary transition-colors text-sm">{{ t('footer.partnerWithUs') }}</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold text-gray-900 mb-4">{{ t('footer.contactUs') }}</h4>
          <ul class="space-y-3">
            <li class="text-gray-600 text-sm">{{ contactInfo.phone }}</li>
            <li class="text-gray-600 text-sm">{{ contactInfo.email }}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="border-t border-gray-100">
      <div class="container mx-auto px-6 py-6">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="text-center md:text-left">
            <p class="text-gray-500 text-sm">
              © 2026 
              <a 
                href="https://github.com/KrystalSoftwareBangladesh/" 
                target="_blank" 
                rel="noopener noreferrer"
                class="text-secondary hover:underline"
              >Krystal Software Bangladesh</a>. {{ t('footer.allRightsReserved') }}
            </p>
          </div>
          <div class="flex items-center gap-4">
            <a href="#" class="text-gray-400 hover:text-secondary transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-secondary transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/></svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-secondary transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
