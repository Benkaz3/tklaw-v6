import React, { useState, useEffect } from 'react';  // Import React along with useState and useEffect
import enContent from '../assets/content/en.json';
import viContent from '../assets/content/vi.json';

const LanguageContext = React.createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('vi');
  const [content, setContent] = useState(enContent);

  useEffect(() => {
    setContent(language === 'en' ? enContent : viContent);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, content }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return React.useContext(LanguageContext);
}
