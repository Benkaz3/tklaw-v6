import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function HeroSection() {
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  return (
    <header className='bg-card_background flex flex-col items-center justify-center mt-14 py-16'>
      <div className='relative z-10 max-w-2xl text-center px-6 md:px-12 lg:px-16 transition duration-300 fade-in'>
        <h1 className='font-primary capitalize text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 text-text'>
          {t('homepage.hero.title')}
        </h1>
        <p className='text-lg md:text-xl lg:text-2xl text-text mb-8'>
          {t('homepage.hero.subtitle')}
        </p>

        {/* Buttons Container */}
        <div className='flex flex-col md:flex-row justify-center gap-4'>
          {/* Primary Button */}
          <Link
            to={language === 'vi' ? `/vi/lien-he` : `/en/contact`}
            className='relative inline-flex items-center justify-center uppercase text-white font-medium py-3 px-6 text-lg transition duration-300 bg-primary rounded hover:shadow-lg transform hover:translate-y-[-2px]'
            aria-label={t('homepage.hero.button_text')}
          >
            <span className='capitalize'>{t('homepage.hero.button_text')}</span>
          </Link>

          {/* Secondary Button */}
          <Link
            to={language === 'vi' ? `/vi/luat-su` : `/en/attorneys`}
            className='relative inline-flex items-center justify-center uppercase text-primary font-medium py-3 px-6 text-lg transition duration-300 bg-transparent border border-primary rounded hover:bg-primary hover:text-white hover:shadow-lg transform hover:translate-y-[-2px]'
            aria-label={t('homepage.hero.meet_team_text')} // Ensure you add this translation key in your i18next configuration
          >
            <span className='capitalize'>
              {t('homepage.hero.meet_the_team', {
                defaultValue: 'Meet the Team',
              })}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default HeroSection;
