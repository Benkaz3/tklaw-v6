import useContentful from '../useContentful';
import LoadingDots from './LoadingDots';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const OurTeamSection = () => {
  const { t, i18n } = useTranslation();

  // Get the current language from i18n
  const language = i18n.language;

  // Fetch all authors from Contentful
  const { data, loading, error } = useContentful([
    {
      content_type: 'author', // Replace with your actual content type ID for authors
      locale: language, // Specify the locale or you can dynamically determine it
    },
  ]);

  // Handle loading and error states
  if (loading) {
    return <LoadingDots />;
  }

  if (error) {
    console.error(error);
    return (
      <div className='text-error text-center py-10'>Error: {error.message}</div>
    );
  }

  const authors = data.author || [];

  return (
    <section className='py-10 bg-background'>
      <div className='max-w-container-desktop mx-auto px-4'>
        {/* Team Section Heading */}
        <h2 className='font-primary text-start sm:text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-2 text-text'>
          {t('homepage.our_team_section.title')}{' '}
        </h2>

        <p className='text-start sm:text-center text-lg md:text-xl text-text mb-6'>
          {t('homepage.our_team_section.subtitle')}{' '}
        </p>

        {/* Team Members Grid */}
        <div className='grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
          {authors.map((author) => (
            <div
              key={author.sys.id}
              className='card flex flex-col items-start bg-card_background rounded-lg shadow-sm p-6 transition-all duration-300 hover:shadow-lg'
            >
              {/* Photo */}
              <div className='flex items-start mb-4'>
                <div className='w-16 h-16 rounded-full border border-text flex items-center justify-center bg-primary'>
                  <img
                    src={
                      author.fields.profilePhoto?.fields?.file?.url ||
                      'path-to-placeholder-image'
                    }
                    alt={author.fields.name}
                    className='w-full h-full rounded-full object-cover'
                  />
                </div>
                <div className='flex flex-col ml-4'>
                  <p className='font-semibold text-text text-lg'>
                    {author.fields.name}
                  </p>
                  <p className='text-text text-sm'>{author.fields.title}</p>
                </div>
              </div>

              {/* Divider */}
              <hr className='border-gray-300 mb-4 w-full' />

              {/* Introduction */}
              <p className='text-gray-600 mb-4 text-sm'>
                {author.fields.introduction}
              </p>

              {/* View Profile */}
              <div className='mt-2'>
                <Link
                  to={
                    language === 'vi'
                      ? `/vi/luat-su/${author.fields.slug}`
                      : `/en/attorneys/${author.fields.slug}`
                  }
                  className='underline-animation text-primary font-medium'
                >
                  {t('homepage.our_team_section.link_text')}{' '}
                  {/* Dynamic link text using i18n */}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeamSection;
