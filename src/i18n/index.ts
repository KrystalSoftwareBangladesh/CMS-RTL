import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
// Multi-language support is temporarily disabled.
// Keep the non-English locale imports here commented for quick restore later.
// import fr from './locales/fr.json'
// import no from './locales/no.json'
// import hi from './locales/hi.json'
// import zh from './locales/zh.json'
// import bn from './locales/bn.json'

export const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', countries: ['USA', 'UK', 'Canada', 'Australia'] },
]

// Full multi-language list kept for later re-enable.
// export const languages = [
//   { code: 'en', name: 'English', flag: '🇺🇸', countries: ['USA', 'UK', 'Canada', 'Australia'] },
//   { code: 'fr', name: 'Français', flag: '🇨🇦', countries: ['Canada'] },
//   { code: 'no', name: 'Norsk', flag: '🇳🇴', countries: ['Norway'] },
//   { code: 'hi', name: 'हिन्दी', flag: '🇮🇳', countries: ['India'] },
//   { code: 'zh', name: '中文', flag: '🇨🇳', countries: ['China'] },
//   { code: 'bn', name: 'বাংলা', flag: '🇧🇩', countries: ['Bangladesh'] }
// ]

const i18n = createI18n({
  legacy: false,
  // Locale switching is temporarily disabled; keep the app pinned to English.
  // locale: localStorage.getItem('locale') || 'en',
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    // Non-English messages are temporarily disabled.
    // fr,
    // no,
    // hi,
    // zh,
    // bn
  }
})

export default i18n
