// src/seo/SeoContext.jsx

import React, { createContext } from 'react';
import seoData from './seo_content.json';

export const SeoContext = createContext();

export const SeoProvider = ({ children }) => {
  return (
    <SeoContext.Provider value={seoData}>
      {children}
    </SeoContext.Provider>
  );
};