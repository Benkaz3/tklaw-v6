import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en.json';
import translationVI from './locales/vi.json';

const resources = {
  en: { translation: translationEN },
  vi: { translation: translationVI },
};

i18n.use(initReactI18next).init({
  resources,
  lng:
    window.location.pathname === '/' || window.location.pathname.includes('/vi')
      ? 'vi'
      : 'en', // Set 'vi' as default for root and detect from URL
  fallbackLng: 'vi', // Fallback to Vietnamese
  interpolation: { escapeValue: false },
});

export default i18n;
