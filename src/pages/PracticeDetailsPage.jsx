import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import useTranslation from react-i18next
import LoadingDots from '../components/LoadingDots';
import useContentful from '../useContentful';
import imgPlaceholder from '../assets/img_placeholder.svg'; // Import the fallback image
import Breadcrumb from '../components/Breadcrumb';
import heroBg from '../assets/practices_hero_bg.webp';
const PracticeDetailsPage = () => {
  const { slug } = useParams(); // Get the slug from the URL parameters
  const { t, i18n } = useTranslation(); // Access the i18n instance to get the current language

  // Fetch data from Contentful based on the slug
  const { data, loading, error } = useContentful([
    {
      content_type: 'practice',
      'fields.slug': slug, // Filter by slug
      locale: i18n.language, // Use i18n.language for the locale
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

  const practice = data.practice ? data.practice[0] : null; // Access the practice data

  if (!practice) {
    return (
      <div className='text-red-500 text-center py-10'>Practice not found.</div>
    );
  }

  // Split the casesHandled string into an array by line breaks
  const casesHandledArray = practice.fields.casesHandled
    ? practice.fields.casesHandled.split('\n') // Assuming cases are separated by new lines
    : [];

  // Fetch specialized attorneys information
  const specializedAttorneys = practice.fields.specializedAttorney || [];

  return (
    <section className=' bg-background mt-16'>
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
      <div className='max-w-container-desktop mx-auto px-4 mt-4'>
        <h1 className='font-primary text-start text-4xl font-bold mb-6 text-text'>
          {practice.fields.title}
        </h1>

        <div className='mt-6'>
          <p className='text-start text-text mb-4 text-lg leading-relaxed'>
            {practice.fields.introduction}
          </p>

          <h2 className='font-primary text-2xl font-semibold text-text mb-2'>
            {i18n.language === 'vi' ? 'Vụ việc liên quan' : 'Cases handled'}
          </h2>
          <ul className='list-disc list-inside mb-4 pl-5'>
            {casesHandledArray.map((caseItem, index) => (
              <li
                key={index}
                className='text-start text-text text-lg leading-relaxed'
              >
                {caseItem}
              </li>
            ))}
          </ul>
          <hr className='border-gray-300 mb-4 w-full' />

          <h2 className='font-primary text-2xl font-semibold text-text mb-4'>
            {i18n.language === 'vi'
              ? 'Luật sư phụ trách'
              : 'Specialized attorney'}
          </h2>
          <div className='grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
            {specializedAttorneys.map((attorney) => {
              const attorneySlug = attorney.fields.slug;
              // Build the dynamic URL for the attorney profile based on the language
              const attorneyLink =
                i18n.language === 'vi'
                  ? `/vi/luat-su/${attorneySlug}`
                  : `/en/attorneys/${attorneySlug}`;

              return (
                <div
                  key={attorney.sys.id}
                  className='card flex flex-col items-start bg-card_background rounded-lg shadow-sm p-6 transition-all duration-300 hover:shadow-lg'
                >
                  {/* Photo */}
                  <div className='flex items-start mb-4'>
                    <div className='w-16 h-16 rounded-full border border-text flex items-center justify-center bg-primary'>
                      <img
                        src={
                          attorney.fields.profilePhoto?.fields?.file?.url ||
                          imgPlaceholder // Use placeholder if photo is not available
                        }
                        alt={attorney.fields.name}
                        className='w-full h-full rounded-full object-cover'
                      />
                    </div>
                    <div className='flex flex-col ml-4'>
                      <p className='font-semibold text-text text-lg'>
                        {attorney.fields.name}
                      </p>
                      <p className='text-text text-base'>
                        {attorney.fields.title}
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <hr className='border-gray-300 mb-4 w-full' />

                  {/* Introduction */}
                  <p className='text-gray-600 mb-4 text-base leading-relaxed'>
                    {attorney.fields.introduction}
                  </p>

                  {/* View Profile */}
                  <div className='mt-2'>
                    <Link
                      to={attorneyLink} // Use dynamic link based on language
                      className='underline-animation text-primary font-medium'
                    >
                      {t('practice_details_page.view_profile')}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PracticeDetailsPage;
