import { useTranslation } from 'react-i18next';
import Breadcrumb from '../components/Breadcrumb';
import LoadingDots from '../components/LoadingDots';
import heroBg from '../assets/practices_hero_bg.webp';
import { useState } from 'react';

const ContactPage = () => {
  const { t } = useTranslation();
  const [mapLoading, setMapLoading] = useState(true); // Track map loading state

  const handleMapLoad = () => {
    setMapLoading(false); // Hide loading dots once map is fully loaded
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        className='relative h-[25vh] bg-cover bg-center flex items-center justify-center'
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className='absolute inset-0 bg-black opacity-50'></div>
      </section>

      <Breadcrumb />

      <section className='bg-background mt-16'>
        <div className='container mx-auto max-w-container-desktop px-4'>
          {/* Embedded Google Map */}
          <div className='flex justify-center mt-8 relative'>
            {/* Show loading dots while the map is loading */}
            {mapLoading && (
              <div className='absolute inset-0 flex justify-center items-center'>
                <LoadingDots />
              </div>
            )}

            <iframe
              src={t('businessInfo.mapEmbedUrl')} // Use i18n for the map URL
              style={{ border: 0 }}
              allowFullScreen=''
              loading='lazy'
              className={`w-full h-96 ${
                mapLoading ? 'opacity-0' : 'opacity-100'
              }`}
              referrerPolicy='no-referrer-when-downgrade'
              onLoad={handleMapLoad} // Trigger map load handler
            />
          </div>

          <div className='flex flex-col md:flex-row justify-between items-center mb-12'>
            <div className='w-full md:w-1/2 lg:w-1/3 p-card-padding'>
              <h3 className='text-h2 font-semibold mb-4 text-primary'>
                {t('global.labels.office_address_label')}
              </h3>
              <div>
                <p className='text-text'>{t('global.office_address')}</p>
                <p className='text-text text-xl font-bold'>
                  {t('global.labels.phone_label')}:{' '}
                  <a
                    href={`tel:${t('global.phone')}`}
                    className='text-blue-600 font-bold hover:underline'
                  >
                    {t('global.phone')}
                  </a>
                </p>
                <p className='text-text'>
                  {t('global.labels.email_label')}:{' '}
                  <a
                    href={`mailto:${t('global.email')}`}
                    className='hover:underline'
                  >
                    {t('global.email')}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
