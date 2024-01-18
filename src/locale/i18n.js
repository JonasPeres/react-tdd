import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './translations/en.json'
import es from './translations/es.json'
import pt from './translations/pt.json'

const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
  ptBr: {
    translation: pt,
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',

  interpolation: {
    escapeValue: false,
  },
})

export default i18n
