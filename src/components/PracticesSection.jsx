import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LoadingDots from './LoadingDots';
import useContentful from '../useContentful';

const PracticesSection = () => {
  // Use i18n's useTranslation hook
  const { t, i18n } = useTranslation();
  const practicePath =
    i18n.language === 'vi'
      ? '/vi/linh-vuc-va-nganh-nghe/:slug'
      : '/en/practices-and-sectors/:slug';

  // Get the current language from i18n
  const language = i18n.language;

  // Fetch data from Contentful
  const { data, loading, error } = useContentful([
    {
      content_type: 'practice',
      order: 'fields.title', // Adjust as needed for sorting
      locale: language, // Use current language for locale
    },
  ]);

  // Handle loading and error states
  if (loading) {
    return (
      <div className='flex bg-background items-center justify-center h-screen text-center py-10'>
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

  // Filter the data to include only practices (where isPractice is true)
  const practices = (data.practice || []).filter(
    (entry) => entry.fields.isPractice === true
  );

  return (
    <section className='py-10 bg-background'>
      <div className='max-w-container-desktop mx-auto px-4'>
        <h1 className='font-primary text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-text'>
          {t('homepage.practices')}
          {/* Dynamic section title using i18n translation */}
        </h1>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {practices.map((practice) => (
            <Link
              key={practice.sys.id}
              to={practicePath.replace(':slug', practice.fields.slug)} // Use the slug for the URL
              className='flex flex-col items-start border-2 rounded-lg shadow-sm p-8 group transition-all duration-300 hover:shadow-lg hover:transform hover:translate-y-[-2px]' // Change items-center to items-start
            >
              {/* Uncomment the img section if you want to include images */}
              {/* <img
                src={practice.fields.icon?.fields?.file?.url || imgPlaceholder} // Use fallback image if icon is missing
                alt={practice.fields.title}
                className='w-16 h-16 mb-4'
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop
                  e.target.src = imgPlaceholder; // Fallback image
                }}
              /> */}
              <div className='relative inline-flex items-start justify-start capitalize text-text transition duration-300 group'>
                {' '}
                {/* Change items-center to items-start */}
                <h3 className='relative z-10 text-h3 text-left font-semibold mb-2'>
                  {practice.fields.title}
                </h3>
                <div className='absolute left-0 bottom-[14px] z-0 w-full h-[10px] bg-secondary transition-transform duration-300 scale-y-0 group-hover:scale-y-150'></div>
              </div>

              <p className='text-left text-text mb-2'>
                {' '}
                {/* Change text-start to text-left */}
                {practice.fields.homepageDescription}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticesSection;
