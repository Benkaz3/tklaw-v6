import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CTASection = () => {
  const { t, i18n } = useTranslation(); // Use i18n's useTranslation hook
  const language = i18n.language;

  return (
    <section className='py-16'>
      <div className='container mx-auto px-4 text-start'>
        <h2 className='font-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4'>
          {t('homepage.cta_section.title')}{' '}
          <span className='bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text'>
            {t('homepage.cta_section.highlight_title')}
          </span>
        </h2>
        <p className='text-text mb-8'>{t('homepage.cta_section.subtitle')}</p>

        <Link
          to={language === 'vi' ? '/vi/lien-he' : '/en/contact'}
          className='relative inline-flex items-center justify-center uppercase text-white font-medium py-3 px-6 text-lg w-full transition duration-300 bg-primary rounded shadow-md hover:shadow-lg transform hover:translate-y-[-2px]'
          aria-label={t('homepage.cta_section.button_text')}
        >
          <span className='capitalize'>
            {t('homepage.cta_section.button_text')}
          </span>
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
