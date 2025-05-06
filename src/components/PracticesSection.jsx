// PracticesSection.tsx
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import LoadingDots from './LoadingDots'
import useContentful from '../useContentful'

const FALLBACK_ICON = '/images/placeholder-64.png'

const PracticeCard = ({ id, slug, title, description, iconUrl, url }) => (
  <Link
    key={id}
    to={url}
    className='flex flex-col items-start border-2 rounded-lg shadow-sm p-8 group transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5'
  >
    <img
  src={iconUrl}
  alt={title}
  className="w-16 h-16 mb-4 object-cover rounded"
  onError={({ currentTarget }) => {
    if (currentTarget.src !== FALLBACK_ICON) {
      currentTarget.src = FALLBACK_ICON
    }
  }}
/>


    <div className='relative inline-flex items-start justify-start capitalize text-text transition duration-300 group'>
      <h3 className='relative z-10 text-h3 text-left font-semibold mb-2'>
        {title}
      </h3>
      <div className='absolute left-0 bottom-[14px] z-0 w-full h-[10px] bg-secondary transition-transform duration-300 scale-y-0 group-hover:scale-y-150' />
    </div>

    <p className='text-left text-text mb-2'>{description}</p>
  </Link>
)

const PracticesSection = () => {
  const { t, i18n } = useTranslation()
  const language = i18n.language

  const practicePath = useMemo(
    () =>
      language === 'vi'
        ? '/vi/linh-vuc-va-nganh-nghe/:slug'
        : '/en/practices-and-sectors/:slug',
    [language]
  )

  const { data, loading, error } = useContentful([
    {
      content_type: 'practice',
      order: 'fields.title',
      locale: language,
    },
  ])

  if (loading)
    return (
      <div className='flex bg-background items-center justify-center h-screen py-10'>
        <LoadingDots />
      </div>
    )

  if (error)
    return (
      <div className='text-error text-center py-10'>
        {t('homepage.practices_section.error_message')}
      </div>
    )

  const practices =
    data?.practice?.filter((e) => e.fields.isPractice) ?? []

  const noneFound = practices.length === 0

  return (
    <section className='py-10 bg-background'>
      <div className='max-w-container-desktop mx-auto px-4'>
        <h1 className='font-primary text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-text'>
          {t('homepage.practices_section.title')}
        </h1>

        {noneFound ? (
          <p className='text-text text-lg text-center'>
            {t('homepage.practices_section.no_practices')}
          </p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {practices.map(({ sys: { id }, fields }) => {
              const { slug, title, homepageDescription, icon } = fields
              const iconUrl = icon?.fields?.file?.url ?? FALLBACK_ICON
              const url = practicePath.replace(':slug', slug)

              return (
                <PracticeCard
                  key={id}
                  id={id}
                  slug={slug}
                  title={title}
                  description={homepageDescription}
                  iconUrl={iconUrl}
                  url={url}
                />
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

export default PracticesSection
