import { useLanguage } from '../components/LanguageProvider';
import Breadcrumb from '../components/Breadcrumb';
import LoadingDots from '../components/LoadingDots';
import heroBg from '../assets/practices_hero_bg.webp';
import { useState } from 'react';

const ContactPage = () => {
  const { content } = useLanguage();
  const [mapLoading, setMapLoading] = useState(true); // Track map loading state

  const handleMapLoad = () => {
    setMapLoading(false); // Hide loading dots once map is fully loaded
  };

  return (
   
    <div>
      {/* Hero Section */}
      <section
        className="relative h-[25vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </section>

      <Breadcrumb />

      <section className="bg-background mt-16">
        <div className="container mx-auto max-w-container-desktop px-4">
          {/* Embedded Google Map */}
          <div className="flex justify-center mt-8 relative">
            {/* Show loading dots while the map is loading */}
            {mapLoading && (
              <div className="absolute inset-0 flex justify-center items-center">
                <LoadingDots />
              </div>
            )}

            <iframe
              src={content.businessInfo.mapEmbedUrl}
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className={`w-full h-96 ${mapLoading ? 'opacity-0' : 'opacity-100'}`}
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={handleMapLoad} // Trigger map load handler
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="w-full md:w-1/2 lg:w-1/3 p-card-padding">
              <h3 className="text-h2 font-semibold mb-4 text-primary">
                {content.global.labels.office_address_label}
              </h3>
              <div>
                <p className="text-text">
                  {content.global.office_address}
                </p>
                <p className="text-text text-xl font-bold">
                  {content.global.labels.phone_label}:{' '}
                  <a href={`tel:${content.global.phone}`} className="text-blue-600 font-bold hover:underline">
                    {content.global.phone}
                  </a>
                </p>
                <p className="text-text">
                  {content.global.labels.email_label}:{' '}
                  <a href={`mailto:${content.global.email}`} className="hover:underline">
                    {content.global.email}
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
