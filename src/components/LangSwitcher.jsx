import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';

// Define slug mappings between Vietnamese and English practice sector slugs
const slugMapping = {
  'luat-bat-dong-san': 'real-estate-law',
  'luat-gia-dinh': 'family-law',
  'luat-doanh-nghiep': 'corporate-law',
  'luat-lao-dong': 'employment-law',
  'ban-le': 'retail',
  'dich-vu-tai-chinh': 'financial-services',
  'cong-nghe': 'technology',
  'nganh-bat-dong-san': 'real-estate-sector',
  'cham-soc-suc-khoe': 'healthcare',
};

const LangSwitcher = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Check if the current route is a blog post
  const isBlogPost =
    location.pathname.startsWith('/vi/blog') ||
    location.pathname.startsWith('/en/blog');

  // If it's a blog post, return a message instead of the language switcher
  if (isBlogPost) {
    return (
      <div className='text-center py-2'>
        <p className='text-sm'>Available in Vietnamese only</p>
      </div>
    );
  }

  // Handle language change and navigate to the correct URL based on language and slug
  const handleLanguageChange = (lang) => {
    // If the selected language is the same as the current language, just close the dropdown
    if (lang === i18n.language) {
      setIsDropdownOpen(false);
      return;
    }

    i18n.changeLanguage(lang); // Change the current language in i18next

    const currentPath = location.pathname;
    let newPath = '';

    // Handle Vietnamese -> English route conversion for practices and sectors
    if (lang === 'en' && currentPath.startsWith('/vi/linh-vuc-va-nganh-nghe')) {
      const vietnameseSlug = currentPath.split('/').pop(); // Extract the Vietnamese slug
      const englishSlug = slugMapping[vietnameseSlug]; // Map to the English slug

      newPath = englishSlug
        ? `/en/practices-and-sectors/${englishSlug}`
        : `/en/practices-and-sectors`;
    }

    // Handle English -> Vietnamese route conversion for practices and sectors
    else if (
      lang === 'vi' &&
      currentPath.startsWith('/en/practices-and-sectors')
    ) {
      const englishSlug = currentPath.split('/').pop(); // Extract the English slug
      const vietnameseSlug = Object.keys(slugMapping).find(
        (key) => slugMapping[key] === englishSlug
      );

      newPath = vietnameseSlug
        ? `/vi/linh-vuc-va-nganh-nghe/${vietnameseSlug}`
        : `/vi/linh-vuc-va-nganh-nghe`;
    }

    // Handle Vietnamese -> English route conversion for attorneys
    else if (lang === 'en' && currentPath.startsWith('/vi/luat-su')) {
      const vietnameseSlug = currentPath.split('/').pop();
      newPath =
        vietnameseSlug !== 'luat-su'
          ? `/en/attorneys/${vietnameseSlug}`
          : `/en/attorneys`;
    }

    // Handle English -> Vietnamese route conversion for attorneys
    else if (lang === 'vi' && currentPath.startsWith('/en/attorneys')) {
      const englishSlug = currentPath.split('/').pop();
      newPath =
        englishSlug !== 'attorneys'
          ? `/vi/luat-su/${englishSlug}`
          : `/vi/luat-su`;
    }
    // Handle Vietnamese -> English route conversion for policies
    else if (lang === 'en' && currentPath.startsWith('/vi/chinh-sach')) {
      const vietnameseSlug = currentPath.split('/').pop();
      newPath =
        vietnameseSlug !== 'chinh-sach'
          ? `/en/policies/${vietnameseSlug}`
          : `/en/policies`;
    }

    // Handle English -> Vietnamese route conversion for policies
    else if (lang === 'vi' && currentPath.startsWith('/en/policies')) {
      const englishSlug = currentPath.split('/').pop();
      newPath =
        englishSlug !== 'policies'
          ? `/vi/chinh-sach/${englishSlug}`
          : `/vi/chinh-sach`;
    }
    // Handle Vietnamese -> English route conversion for blog category
    else if (lang === 'en' && currentPath.startsWith('/vi/blog/chu-de')) {
      const vietnameseSlug = currentPath.split('/').pop();
      newPath =
        vietnameseSlug !== 'chu-de'
          ? `/en/blog/category/${vietnameseSlug}`
          : `/en/blog/category`;
    }

    // Handle English -> Vietnamese route conversion for blog category
    else if (lang === 'vi' && currentPath.startsWith('/en/blog/category')) {
      const englishSlug = currentPath.split('/').pop();
      newPath =
        englishSlug !== 'category' ? `/vi/chu-de/${englishSlug}` : `/vi/chu-de`;
    }

    // Handle other cases or non-matching routes (e.g., homepage)
    else {
      newPath = lang === 'en' ? '/en' : '/vi';
    }

    // Navigate to the new path and close the dropdown
    navigate(newPath, { replace: true });
    setIsDropdownOpen(false);
  };

  return (
    <div className='relative inline-block text-left'>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className='flex items-center px-3 py-2 focus:outline-none text-black bg-white hover:bg-background transition duration-200'
      >
        {i18n.language === 'en' ? 'English' : 'Tiếng Việt'}
        <FaChevronDown className='ml-2' />
      </button>

      {isDropdownOpen && (
        <div className='absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-50'>
          <button
            onClick={() => handleLanguageChange('en')}
            className='block px-4 py-2 w-full text-left text-black hover:bg-gray-200 transition duration-200'
          >
            English
          </button>
          <button
            onClick={() => handleLanguageChange('vi')}
            className='block px-4 py-2 w-full text-left text-black hover:bg-gray-200 transition duration-200'
          >
            Tiếng Việt
          </button>
        </div>
      )}
    </div>
  );
};

export default LangSwitcher;
