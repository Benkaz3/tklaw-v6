import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LoadingDots from '../components/LoadingDots';
import useContentful from '../useContentful';
import heroBg from '../assets/practices_hero_bg.webp';
import Breadcrumb from '../components/Breadcrumb';

const PracticesAndSectorsSection = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const location = useLocation(); // Get the current location
  const pagePath =
    language === 'vi'
      ? '/vi/linh-vuc-va-nganh-nghe/:slug'
      : '/en/practices-and-sectors/:slug';

  // Fetch data from Contentful
  const { data, loading, error } = useContentful([
    {
      content_type: 'practice',
      order: 'fields.title',
      locale: language,
    },
  ]);

  // States for tab selection and row expansion
  const [selectedTab, setSelectedTab] = useState('practices'); // Default to 'practices'
  const [expandedRow, setExpandedRow] = useState(null); // Store expanded row ID

  // Effect to check URL query or state for tab selection
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    let tabFromURL = searchParams.get('tab'); // Get the tab parameter from the URL

    // Adjust the tab value based on the language
    if (language === 'vi') {
      if (tabFromURL === 'sectors') {
        tabFromURL = 'nganh-nghe'; // Change 'sectors' to 'nganh-nghe' for Vietnamese
      } else if (tabFromURL === 'practices') {
        tabFromURL = 'linh-vuc'; // Change 'practices' to 'linh-vuc' for Vietnamese
      }
    }

    // Set the tab based on the URL parameter
    if (tabFromURL === 'nganh-nghe' || tabFromURL === 'sectors') {
      setSelectedTab('sectors');
    } else if (tabFromURL === 'linh-vuc' || tabFromURL === 'practices') {
      setSelectedTab('practices');
    }
  }, [location.search, language]);

  // Handle loading and error states
  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen text-center py-10'>
        <LoadingDots />
      </div>
    );
  }

  if (error) {
    console.error(error);
    return (
      <div className='text-red-500 text-center py-10'>
        Error: {error.message}
      </div>
    );
  }

  const entries = data.practice || [];
  const practices = entries.filter((entry) => entry.fields.isPractice);
  const sectors = entries.filter((entry) => !entry.fields.isPractice);

  // Toggle expand/collapse for rows
  const toggleRow = (id) => {
    setExpandedRow((prev) => (prev === id ? null : id)); // Collapse if the same row is clicked
  };

  // Render table-like layout with expandable rows
  const renderList = (list) =>
    list.map((item) => {
      const isExpanded = expandedRow === item.sys.id;
      return (
        <div key={item.sys.id} className='border-b border-gray-300'>
          {/* Row header for title and expand/collapse action */}
          <div
            className={`flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100 transition-all ${
              isExpanded ? 'bg-gray-100' : 'bg-white'
            }`}
            onClick={() => toggleRow(item.sys.id)}
          >
            <h3 className='font-primary text-lg font-semibold text-left'>
              {item.fields.title}
            </h3>
            <span className='text-xl font-bold'>
              {isExpanded ? '-' : '+'} {/* Icon to indicate collapse/expand */}
            </span>
          </div>

          {/* Expanded content section (only shows when expanded) */}
          {isExpanded && (
            <div className='p-4 bg-gray-50 border-gray-300'>
              <p className='text-text mb-2'>{item.fields.introduction}</p>
              <Link to={pagePath.replace(':slug', item.fields.slug)}>
                <button className='mt-2 text-primary hover:text-secondary font-semibold'>
                  {t('homepage.link_text')}
                </button>
              </Link>
            </div>
          )}
        </div>
      );
    });

  return (
    <section className='py-10 bg-transparent'>
      {/* Hero Section */}
      <section
        className='relative h-[25vh] bg-cover bg-center flex items-center justify-center'
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      >
        <div className='absolute inset-0 bg-black opacity-50'></div>
      </section>
      <Breadcrumb />

      <div className='max-w-container-desktop mx-auto px-4 mt-8'>
        <h1 className='font-primary text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-text'>
          {t('homepage.practices_and_sectors_title')}
        </h1>

        {/* Tab Navigation */}
        <div className='flex justify-center mb-8'>
          <button
            className={`px-6 py-2 rounded-t-md font-semibold ${
              selectedTab === 'practices'
                ? 'bg-primary text-white'
                : 'bg-gray-200'
            }`}
            onClick={() => setSelectedTab('practices')}
          >
            {t('homepage.practices')}
          </button>
          <button
            className={`ml-2 px-6 py-2 rounded-t-md font-semibold ${
              selectedTab === 'sectors'
                ? 'bg-primary text-white'
                : 'bg-gray-200'
            }`}
            onClick={() => setSelectedTab('sectors')}
          >
            {t('homepage.client_sectors')}
          </button>
        </div>

        {/* Tab Content (dashboard-style table) */}
        <div className='space-y-1 overflow-hidden'>
          {selectedTab === 'practices'
            ? renderList(practices)
            : renderList(sectors)}
        </div>
      </div>
    </section>
  );
};

export default PracticesAndSectorsSection;
