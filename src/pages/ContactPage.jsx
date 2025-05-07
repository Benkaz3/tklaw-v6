import { useTranslation } from 'react-i18next'
import Breadcrumb from '../components/Breadcrumb'
import LoadingDots from '../components/LoadingDots'
import heroBg from '../assets/practices_hero_bg.webp'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async';
import useSeo from '../seo/useSeo';
import generateMetaTags from '../seo/generateMetaTags';

const ContactPage = () => {
  const { t } = useTranslation()
  const [mapLoading, setMapLoading] = useState(true)

  const mapEmbedUrl = t('businessInfo.mapEmbedUrl')
  const officeAddress = t('global.office_address')
  const phone = t('global.phone')
  const email = t('global.email')

  const handleMapLoad = () => {
    setMapLoading(false)
  }

  const seo = useSeo('ContactPage')
  const metaTags = generateMetaTags(seo);

  return (
    <div>
        <Helmet>
        <title>{seo.Title}</title>
        <link rel="canonical" href={seo.ogUrl} />
        {metaTags.map((tag, index) =>
          tag.name ? (
            <meta key={index} name={tag.name} content={tag.content} />
          ) : (
            <meta key={index} property={tag.property} content={tag.content} />
          )
        )}
      </Helmet>
      {heroBg && (
        <section
          className="relative h-64 bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </section>
      )}
      <Breadcrumb />
      <section className="bg-background mt-16">
        <div className="container mx-auto max-w-desktop px-4">
          {mapEmbedUrl && (
            <div className="flex justify-center mt-8 relative">
              {mapLoading && (
                <div className="absolute inset-0 flex justify-center items-center">
                  <LoadingDots />
                </div>
              )}
              <iframe
                src={mapEmbedUrl}
                className={`w-full h-96 transition-opacity duration-500 ${mapLoading ? 'opacity-0' : 'opacity-100'}`}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={handleMapLoad}
              />
            </div>
          )}
          {(officeAddress || phone || email) && (
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
              <div className="w-full md:w-1/2 lg:w-1/3 p-6">
                {officeAddress && (
                  <p className="text-text">{officeAddress}</p>
                )}
                {phone && (
                  <p className="text-text font-bold">
                    {t('global.labels.phone_label')}:{' '}
                    <a href={`tel:${phone}`} className="text-blue-600 font-bold hover:underline">
                      {phone}
                    </a>
                  </p>
                )}
                {email && (
                  <p className="text-text">
                    {t('global.labels.email_label')}:{' '}
                    <a href={`mailto:${email}`} className="hover:underline">
                      {email}
                    </a>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default ContactPage