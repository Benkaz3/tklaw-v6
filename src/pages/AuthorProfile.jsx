import { useParams } from 'react-router-dom';
import useContentful from '../useContentful';
import LoadingDots from '../components/LoadingDots';
import heroBg from '../assets/practices_hero_bg.webp';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '../components/Breadcrumb';

const AuthorProfile = () => {
  const { slug } = useParams(); // Get the author slug from the URL
  const { t, i18n } = useTranslation(); // Use i18n for language and translations
  const language = i18n.language; // Get the current language from i18n

  // Fetch the author details by slug
  const { data, loading, error } = useContentful([
    {
      content_type: 'author',
      'fields.slug': slug,
      locale: language,
    },
  ]);

  // Handle loading and error states
  if (loading) {
    return <LoadingDots />;
  }

  if (error) {
    console.error(error);
    return (
      <div className='text-red-500 text-center py-10'>
        Error: {error.message}
      </div>
    );
  }

  const author = data.author ? data.author[0] : null;

  if (!author) {
    return <div className='text-center py-10'>Author not found.</div>;
  }

  // Helper function to render a list of items or split by new lines
  const renderList = (items) => {
    if (typeof items === 'string') {
      return items.split('\n').map((item, index) => <p key={index}>{item}</p>);
    } else if (Array.isArray(items)) {
      return items.map((item, index) => <p key={index}>{item}</p>);
    }
    return <p>{items}</p>; // Fallback for non-list and non-string values
  };

  return (
    <div className='py-10 max-w-4xl mx-auto'>
      {/* Hero Section */}
      <section
        className='relative h-[25vh] bg-cover bg-center flex items-center justify-center mb-6'
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      >
        <div className='absolute inset-0 bg-black opacity-40'></div>
      </section>

      <Breadcrumb attorneyName={author.fields.name} />

      <div className='p-6 bg-white border border-gray-200 z-10'>
        <h1 className='text-3xl font-bold text-gray-800'>
          {author.fields.name}
        </h1>
        <h2 className='text-xl text-gray-600 mb-4 italic'>
          {author.fields.title}
        </h2>

        <div className='mb-6'>
          <h3 className='font-semibold text-lg text-gray-700 mb-2'>
            {t('global.attorney_profile.areas_of_practice')}
          </h3>
          <div className='text-gray-600'>
            {renderList(author.fields.areasOfPractice)}
          </div>
        </div>

        <div className='mb-6'>
          <h3 className='font-semibold text-lg text-gray-700 mb-2'>
            {t('global.attorney_profile.education')}
          </h3>
          <div className='text-gray-600'>
            {renderList(author.fields.education)}
          </div>
        </div>

        <div className='mb-6'>
          <h3 className='font-semibold text-lg text-gray-700 mb-2'>
            {t('global.attorney_profile.work_experience')}
          </h3>
          <div className='text-gray-600'>
            {renderList(author.fields.workExperience)}
          </div>
        </div>

        <div className='mb-6'>
          <h3 className='font-semibold text-lg text-gray-700 mb-2'>
            {t('global.attorney_profile.introduction')}
          </h3>
          <p className='text-gray-600'>{author.fields.introduction}</p>
        </div>

        <div className='mb-6'>
          <h3 className='font-semibold text-lg text-gray-700 mb-2'>
            {t('global.attorney_profile.professional_associations')}
          </h3>
          <div className='text-gray-600'>
            {renderList(author.fields.profesionalAssociatations)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorProfile;
