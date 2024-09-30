import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CookiesPage from './pages/CookiesPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsOfUsePage from './pages/TermsOfUsePage';
import AboutUsPage from './pages/AboutUsPage';
import PracticesPage from './pages/PracticesPage';
import ContactPage from './pages/ContactPage';
import { LanguageProvider } from './components/LanguageProvider';


function App() {
  return (
    <LanguageProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cookies-policy" element={<CookiesPage />} />
          <Route path="/privacy-policy" element={<PrivacyPage />} />
          <Route path="/terms-of-use" element={<TermsOfUsePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/practices" element={<PracticesPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
    </Router>
    </LanguageProvider>
    
  );
}

export default App;
