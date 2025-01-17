// src/seo/useSeo.js

import { useContext } from 'react';
import { SeoContext } from './SeoContext';
import { useTranslation } from 'react-i18next';

const useSeo = (pageKey) => {
  const seoData = useContext(SeoContext);
  const { i18n } = useTranslation();
  const language = i18n.language === 'vi' ? 'Vi' : 'En'; 
  const key = `${pageKey}${language}`;
  return seoData[key] || {};
};

export default useSeo;