import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import fr from './locales/fr.json'
import no from './locales/no.json'
import hi from './locales/hi.json'
import zh from './locales/zh.json'
import bn from './locales/bn.json'

export const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', countries: ['USA', 'UK', 'Canada', 'Australia'] },
  { code: 'fr', name: 'Français', flag: '🇨🇦', countries: ['Canada'] },
  { code: 'no', name: 'Norsk', flag: '🇳🇴', countries: ['Norway'] },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳', countries: ['India'] },
  { code: 'zh', name: '中文', flag: '🇨🇳', countries: ['China'] },
  { code: 'bn', name: 'বাংলা', flag: '🇧🇩', countries: ['Bangladesh'] }
]

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    fr,
    no,
    hi,
    zh,
    bn
  }
})

export default i18n
