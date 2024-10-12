import { useTranslation } from 'react-i18next'; // Use i18n's useTranslation hook
import { Link } from 'react-router-dom';

const ContactSection = () => {
  const { t, i18n } = useTranslation(); // Use i18n's useTranslation hook
  const language = i18n.language;
  return (
    <section className='py-12 md:py-16 bg-background'>
      <div className='container mx-auto max-w-container-desktop px-4'>
        <h2 className='font-primary text-start sm:text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-text'>
          {t('global.labels.contact_us_label')} {/* Translated text */}
        </h2>

        <div className='flex flex-col md:flex-row justify-center items-start space-y-6 md:space-y-0 md:space-x-8'>
          <div className='w-full md:w-3/4 lg:w-2/3 bg-card_background p-4 md:p-6 rounded-lg mx-auto transition-transform transform hover:scale-105'>
            <h3 className='text-lg md:text-xl font-semibold mb-3 md:mb-4 text-text'>
              {t('global.labels.office_address_label')}
            </h3>
            <p className='text-base md:text-lg text-text mb-4'>
              {t('global.office_address')}
            </p>

            <p className='text-base md:text-lg font-bold text-text mb-2'>
              {t('global.labels.phone_label')}:
              <a
                href={`tel:${t('global.phone')}`}
                className='text-primary font-bold hover:underline ml-1'
              >
                {t('global.phone')}
              </a>
            </p>

            <p className='text-base md:text-lg text-text'>
              {t('global.labels.email_label')}:
              <a
                href={`mailto:${t('global.email')}`}
                className='text-primary hover:underline ml-1'
              >
                {t('global.email')}
              </a>
            </p>

            {/* Map Link */}
            <div className='mt-6 md:mt-8 text-center'>
              <Link
                to={language === 'vi' ? `/vi/lien-he` : `/en/contact`}
                className='bg-primary text-white py-2 px-4 rounded-full font-bold hover:bg-primary-dark transition-colors'
              >
                {t('global.labels.view_on_map_label')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
