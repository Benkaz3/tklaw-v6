// src/pages/ContactPage.jsx

import { useTranslation } from 'react-i18next'
import Breadcrumb from '../components/Breadcrumb'
import LoadingDots from '../components/LoadingDots'
import heroBg from '../assets/practices_hero_bg.webp'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import useSeo from '../seo/useSeo'
import generateMetaTags from '../seo/generateMetaTags'

const ContactPage = () => {
  const { t, i18n } = useTranslation()
  const language = i18n.language
  const [mapLoading, setMapLoading] = useState(true)

  const seo = useSeo('ContactPage')
  const metaTags = generateMetaTags(seo)
  const homeUrl = language === 'vi'
    ? 'https://www.tklaw.vn/'
    : 'https://www.tklaw.vn/en'

  const mapEmbedUrl = t('businessInfo.mapEmbedUrl')
  const officeAddress = t('global.office_address')
  const phone = t('global.phone')
  const email = t('global.email')

  const handleMapLoad = () => setMapLoading(false)

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: seo.Title,
    url: seo.ogUrl,
    telephone: phone,
    email: email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: officeAddress,
      addressLocality: 'Ho Chi Minh City',
      addressRegion: 'Ho Chi Minh City',
      postalCode: '70000',
      addressCountry: 'VN'
    },
    sameAs: [
      'https://www.facebook.com/tklaw.vn/'
    ]
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t('global.labels.breadcrumb_labels.home'),
        item: homeUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('global.labels.breadcrumb_labels.contact'),
        item: seo.ogUrl
      }
    ]
  }

  return (
    <div>
      <Helmet>
        <title>{seo.Title}</title>
        <link rel="canonical" href={seo.ogUrl} />
        <link rel="alternate" href={homeUrl} hreflang="vi" />
        <link rel="alternate" href={`${homeUrl}en`} hreflang="en" />
        <meta name="robots" content="index, follow" />
        {metaTags.map((tag, i) =>
          tag.name
            ? <meta key={i} name={tag.name} content={tag.content} />
            : <meta key={i} property={tag.property} content={tag.content} />
        )}
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      {/* Hero */}
      <section
        className="relative h-80 bg-cover bg-center flex items-center justify-center"
        role="img"
        aria-label={t('global.labels.contact_hero_alt')}
        style={{ backgroundImage: `url(${heroBg})` }}
      />
  <Breadcrumb />

      <div className="container mx-auto max-w-desktop px-4">
        {/* Main heading */}
        <h1 className="text-3xl font-bold mt-8">
          {t('global.labels.contact_us_label')}
        </h1>

      
        {/* Map */}
        {mapEmbedUrl && (
          <figure className="flex justify-center mt-8 relative">
            {mapLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <LoadingDots />
              </div>
            )}
            <iframe
              title={t('global.labels.map_iframe_title')}
              src={mapEmbedUrl}
              className={`w-full h-96 transition-opacity duration-500 ${
                mapLoading ? 'opacity-0' : 'opacity-100'
              }`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={handleMapLoad}
            />
          </figure>
        )}

        {/* Contact info always stacked */}
        <address className="flex flex-col space-y-4 mb-12 mt-12 not-italic">
          {officeAddress && <p>{officeAddress}</p>}

          {phone && (
            <p className="font-bold">
              {t('global.labels.phone_label')}:&nbsp;
              <a href={`tel:${phone}`} className="hover:underline">
                {phone}
              </a>
            </p>
          )}

          {email && (
            <p>
              {t('global.labels.email_label')}:&nbsp;
              <a href={`mailto:${email}`} className="hover:underline">
                {email}
              </a>
            </p>
          )}
        </address>
      </div>
    </div>
  )
}

export default ContactPage
