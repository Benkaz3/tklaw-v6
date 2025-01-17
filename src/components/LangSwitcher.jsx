import { useState, useCallback, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import CountryFlag from 'react-country-flag';
import SLUG_MAPPING from '../config/slugMapping';

const LANGUAGES = {
  en: { countryCode: 'US', label: 'English' },
  vi: { countryCode: 'VN', label: 'Tiếng Việt' },
};

const LangSwitcher = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const storedLang = localStorage.getItem('preferredLanguage');
    if (storedLang && storedLang !== i18n.language) {
      handleLanguageChange(storedLang);
    }
  }, []);

  const isBlogPost = useMemo(() => {
    const path = location.pathname.toLowerCase();
    return path.startsWith('/vi/blog') || path.startsWith('/en/blog');
  }, [location.pathname]);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  const getMappedPath = useCallback(
    (lang, currentPath) => {
      const pathSegments = currentPath.split('/').filter(Boolean);
      if (pathSegments.length === 0) return `/${lang}`;

      const [currentLang, ...rest] = pathSegments;
      let newPath = `/${lang}`;

      rest.forEach((segment) => {
        // Attempt to map the segment; fallback to the original if no mapping exists
        const mappedSegment =
          (SLUG_MAPPING[lang] && SLUG_MAPPING[lang][segment]) || segment;
        newPath += `/${mappedSegment}`;
      });

      return newPath || `/${lang}`;
    },
    []
  );

  const handleLanguageChange = useCallback(
    (lang) => {
      if (lang === i18n.language) {
        setIsDropdownOpen(false);
        return;
      }

      i18n.changeLanguage(lang);
      localStorage.setItem('preferredLanguage', lang);

      const newPath = getMappedPath(lang, location.pathname);
      navigate(newPath, { replace: true });
      setIsDropdownOpen(false);
    },
    [i18n, location.pathname, navigate, getMappedPath]
  );

  if (isBlogPost) {
    return null;
  }

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="flex items-center px-3 py-2 focus:outline-none text-black bg-white hover:bg-background rounded-sm transition duration-200"
        aria-haspopup="true"
        aria-expanded={isDropdownOpen}
      >
        <CountryFlag
          countryCode={LANGUAGES[i18n.language]?.countryCode || 'US'}
          svg
          style={{ width: '1.5em', height: '1.5em' }}
        />
        <FaChevronDown className="ml-2" />
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-white border rounded-md shadow-sm z-50">
          {Object.entries(LANGUAGES).map(([lang, { label }]) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className="block px-4 py-2 w-full text-left text-black hover:bg-gray-100 transition duration-200"
              aria-label={label}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LangSwitcher;