import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CookiesPage from './pages/CookiesPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsOfUsePage from './pages/TermsOfUsePage';
import AboutUsPage from './pages/AboutUsPage';
import ContactPage from './pages/ContactPage';
import ExpertisePage from './pages/ExpertisePage';
import NotFoundPage from './pages/NotFoundPage'; // Import NotFoundPage
import BlogPage from './pages/BlogPage';
import PoliciesPage from './pages/PoliciesPage';
import BlogPost from './pages/BlogPost';
import OurTeamPage from './pages/OurTeamPage';

import { LanguageProvider } from './components/LanguageProvider';
import AuthorProfile from './pages/AuthorProfile';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/cookies-policy" element={<CookiesPage />} />
            <Route path="/privacy-policy" element={<PrivacyPage />} />
            <Route path="/terms-of-use" element={<TermsOfUsePage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/expertise" element={<ExpertisePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/policies" element={<PoliciesPage />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/attorneys/:slug" element={<AuthorProfile />} />
            <Route path="/attorneys" element={<OurTeamPage />} />

            {/* 404 Page */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
