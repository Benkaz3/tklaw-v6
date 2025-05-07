import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './i18n.js';
import { HelmetProvider } from 'react-helmet-async';
import { SeoProvider } from './seo/SeoContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <SeoProvider>
        <App />
      </SeoProvider>
    </HelmetProvider>
  </StrictMode>
);
