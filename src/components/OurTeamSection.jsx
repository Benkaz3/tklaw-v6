import useContentful from '../useContentful';
import LoadingDots from './LoadingDots';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const OurTeamSection = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  const { data, loading, error } = useContentful([
    {
      content_type: 'author',
      locale: language,
    },
  ]);

  if (loading) {
    return <LoadingDots />;
  }

  if (error) {
    return (
      <div className='text-error text-center py-10'>
        {t('homepage.our_team_section.error_message')}
      </div>
    );
  }

  const authors = data?.author || [];

  if (authors.length === 0) {
    return (
      <section className='py-10 bg-background'>
        <div className='max-w-container-desktop mx-auto px-4 text-center'>
          <h2 className='font-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-2 text-text'>
            {t('homepage.our_team_section.title')}
          </h2>
          <p className='text-lg md:text-xl text-text mb-6'>
            {t('homepage.our_team_section.subtitle')}
          </p>
          <div className='text-text text-lg'>
            {t('homepage.our_team_section.no_authors')}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className='py-10 bg-background'>
      <div className='max-w-container-desktop mx-auto px-4'>
        <h2 className='font-primary text-start sm:text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-2 text-text'>
          {t('homepage.our_team_section.title')}
        </h2>
        <p className='text-start sm:text-center text-lg md:text-xl text-text mb-6'>
          {t('homepage.our_team_section.subtitle')}
        </p>
        <div className='grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
          {authors.map(({ sys, fields }) => {
            const { id } = sys;
            const { name, title, profilePhoto, introduction, slug } = fields;
            const photoUrl = profilePhoto?.fields?.file?.url || 'https://via.placeholder.com/150';

            return (
              <div
                key={id}
                className='card flex flex-col items-start bg-card_background rounded-lg shadow-sm p-6 transition-all duration-300 hover:shadow-lg'
              >
                <div className='flex items-start mb-4'>
                  <div className='w-16 h-16 object-cover aspect-square rounded-full border border-text flex items-center justify-center bg-primary'>
                    <img
                      src={photoUrl}
                      alt={name}
                      className='w-full h-full rounded-full'
                    />
                  </div>
                  <div className='flex flex-col ml-4'>
                    <p className='font-semibold text-text text-lg'>{name}</p>
                    <p className='text-text text-sm'>{title}</p>
                  </div>
                </div>
                <hr className='border-gray-300 mb-4 w-full' />
                <p className='text-gray-600 mb-4 text-sm'>{introduction}</p>
                <div className='mt-2'>
                  <Link
                    to={
                      language === 'vi'
                        ? `/vi/luat-su/${slug}`
                        : `/en/attorneys/${slug}`
                    }
                    className='underline-animation text-primary font-medium'
                  >
                    {t('homepage.our_team_section.link_text')}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurTeamSection;