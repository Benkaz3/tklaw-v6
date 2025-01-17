import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LoadingDots from './LoadingDots'
import useContentful from '../useContentful'

const PracticesSection = () => {
  const { t, i18n } = useTranslation()
  const language = i18n.language
  const practicePath =
    language === 'vi'
      ? '/vi/linh-vuc-va-nganh-nghe/:slug'
      : '/en/practices-and-sectors/:slug'

  const { data, loading, error } = useContentful([
    {
      content_type: 'practice',
      order: 'fields.title',
      locale: language,
    },
  ])

  if (loading) {
    return (
      <div className='flex bg-background items-center justify-center h-screen text-center py-10'>
        <LoadingDots />
      </div>
    )
  }

  if (error) {
    return (
      <div className='text-error text-center py-10'>
        {t('homepage.practices_section.error_message')}
      </div>
    )
  }

  const practices = (data?.practice || []).filter(
    (entry) => entry.fields.isPractice === true
  )

  if (practices.length === 0) {
    return (
      <section className='py-10 bg-background'>
        <div className='max-w-container-desktop mx-auto px-4 text-center'>
          <h1 className='font-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-text'>
            {t('homepage.practices_section.title')}
          </h1>
          <div className='text-text text-lg'>
            {t('homepage.practices_section.no_practices')}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className='py-10 bg-background'>
      <div className='max-w-container-desktop mx-auto px-4'>
        <h1 className='font-primary text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-text'>
          {t('homepage.practices_section.title')}
        </h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {practices.map(({ sys, fields }) => {
            const { id } = sys
            const { slug, title, homepageDescription, icon } = fields
            const practiceUrl = practicePath.replace(':slug', slug)
            const iconUrl = icon?.fields?.file?.url || 'https://via.placeholder.com/64'

            return (
              <Link
                key={id}
                to={practiceUrl}
                className='flex flex-col items-start border-2 rounded-lg shadow-sm p-8 group transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5'
              >
                <img
                  src={iconUrl}
                  alt={title}
                  className='w-16 h-16 mb-4 object-cover rounded'
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = 'https://via.placeholder.com/64'
                  }}
                />
                <div className='relative inline-flex items-start justify-start capitalize text-text transition duration-300 group'>
                  <h3 className='relative z-10 text-h3 text-left font-semibold mb-2'>
                    {title}
                  </h3>
                  <div className='absolute left-0 bottom-[14px] z-0 w-full h-[10px] bg-secondary transition-transform duration-300 scale-y-0 group-hover:scale-y-150'></div>
                </div>
                <p className='text-left text-text mb-2'>
                  {homepageDescription}
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default PracticesSection