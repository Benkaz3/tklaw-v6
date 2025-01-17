import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LoadingDots from '../components/LoadingDots';
import useContentful from '../useContentful';
import imgPlaceholder from '../assets/img_placeholder.svg';
import Breadcrumb from '../components/Breadcrumb';
import heroBg from '../assets/practices_hero_bg.webp';
import { useState, useEffect } from 'react';

const PracticeDetailsPage = () => {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const [retry, setRetry] = useState(0); // State to trigger re-fetching

  const { data, loading, error } = useContentful(
    [
      {
        content_type: 'practice',
        'fields.slug': slug,
        locale: i18n.language,
      },
    ],
    retry // Pass retry as a dependency to refetch on retry
  );

  useEffect(() => {
    // Reset retry count when language changes or slug changes
    setRetry(0);
  }, [i18n.language, slug]);

  const handleRetry = () => {
    setRetry((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div
        className='flex bg-background items-center justify-center h-screen text-center py-10'
        role="status"
        aria-live="polite"
      >
        <LoadingDots />
        <span className="sr-only">{t('loading')}</span>
      </div>
    );
  }

  if (error) {
    console.error('Contentful Fetch Error:', error);
    return (
      <div className='flex flex-col items-center justify-center text-center py-10 px-4'>
        <p className='text-red-500 mb-4 text-lg'>
          {t('errors.fetchFailed', { message: error.message })}
        </p>
        <button
          onClick={handleRetry}
          className='px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary'
        >
          {t('errors.retry')}
        </button>
      </div>
    );
  }

  const practice = data?.practice?.[0];

  if (!practice) {
    return (
      <div className='flex flex-col items-center justify-center text-center py-10 px-4'>
        <p className='text-red-500 mb-4 text-lg'>
          {t('errors.practiceNotFound')}
        </p>
        <Link
          to='/'
          className='px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary'
        >
          {t('errors.goHome')}
        </Link>
      </div>
    );
  }

  const casesHandledArray = practice.fields.casesHandled
    ? practice.fields.casesHandled.split('\n')
    : [];

  const specializedAttorneys = practice.fields.specializedAttorney || [];

  // Filter out attorneys without fields, slug, or sys.id
  const validAttorneys = specializedAttorneys.filter(
    (attorney) => attorney?.fields?.slug && attorney?.sys?.id
  );

  // Optionally, log warnings for invalid attorneys
  const invalidAttorneys = specializedAttorneys.filter(
    (attorney) => !attorney?.fields?.slug || !attorney?.sys?.id
  );

  if (invalidAttorneys.length > 0) {
    console.warn(
      `${invalidAttorneys.length} attorney(s) are missing 'fields.slug' or 'sys.id':`,
      invalidAttorneys
    );
  }

  return (
    <section className='bg-background mt-16'>
      {/* Hero Section */}
      <section
        className='relative h-[25vh] bg-cover bg-center flex items-center justify-center'
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
        aria-label={t('practice_details_page.hero_background')}
      >
        <div className='absolute inset-0 bg-black opacity-50' aria-hidden="true"></div>
        <h2 className='sr-only'>{t('practice_details_page.hero_title')}</h2>
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
            {t('practice_details_page.cases_handled')}
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

          {/* Conditional Rendering of Specialized Attorneys Section */}
          {validAttorneys.length > 0 && (
            <>
              <h2 className='font-primary text-2xl font-semibold text-text mb-4'>
                {t('practice_details_page.specialized_attorney')}
              </h2>
              <div className='grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
                {validAttorneys.map((attorney) => {
                  const attorneySlug = attorney.fields.slug;
                  const attorneyLink =
                    i18n.language === 'vi'
                      ? `/vi/luat-su/${attorneySlug}`
                      : `/en/attorneys/${attorneySlug}`;

                  return (
                    <div
                      key={attorney.sys.id}
                      className='card flex flex-col items-start bg-card_background rounded-lg shadow-sm p-6 transition-shadow duration-300 hover:shadow-lg'
                    >
                      {/* Photo */}
                      <div className='flex items-center mb-4 w-full'>
                        <div className='w-16 h-16 rounded-full border border-text flex-shrink-0'>
                          <img
                            src={
                              attorney.fields.profilePhoto?.fields?.file?.url ||
                              imgPlaceholder
                            }
                            alt={attorney.fields.name || t('attorney.alt_photo')}
                            className='w-full h-full rounded-full object-cover'
                          />
                        </div>
                        <div className='flex flex-col ml-4 flex-grow'>
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
                      <div className='mt-auto'>
                        <Link
                          to={attorneyLink}
                          className='underline-animation text-primary font-medium'
                        >
                          {t('practice_details_page.view_profile')}
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default PracticeDetailsPage;