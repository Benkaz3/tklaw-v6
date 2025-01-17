import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const bgColors = ['bg-primary', 'bg-secondary', 'bg-text', 'bg-accent']

const WhyUsSection = () => {
  const { t, i18n } = useTranslation()
  const currentLanguage = i18n.language

  const whyChooseUs = t('homepage.why_choose_us', { returnObjects: true })

  if (!Array.isArray(whyChooseUs) || whyChooseUs.length === 0) {
    return (
      <section className='w-full py-12 bg-background'>
        <div className='container mx-auto px-4 text-center'>
          <h1 className='font-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-text'>
            {t('homepage.why_choose_us_section_title')}
          </h1>
          <p className='text-lg md:text-xl text-text'>
            {t('homepage.why_choose_us_section.no_points')}
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className='w-full py-12 bg-background'>
      <div className='container mx-auto px-4'>
        <h1 className='font-primary text-start sm:text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-text'>
          {t('homepage.why_choose_us_section_title')}
        </h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6'>
          {whyChooseUs.map((point, index) => {
            const bgColor = bgColors[index % bgColors.length]
            const textColor =
              bgColor === 'bg-primary' || bgColor === 'bg-text' ? 'text-white' : 'text-text'
            return (
              <div
                key={index}
                className={`card ${bgColor} py-16 px-8 lg:px-28 rounded-lg shadow-sm hover:shadow-lg transition-shadow`}
              >
                <h3 className={`text-4xl font-medium ${textColor} mb-4`}>
                  {point.title}
                </h3>
                <div className='border-t border-background pt-4'>
                  <p className={`${textColor} mb-6`}>
                    {point.description.map((part, i) => {
                      if (part.type === 'text') {
                        return <span key={i}>{part.value}</span>
                      }
                      if (part.type === 'link') {
                        const linkTo = part.to.startsWith('#')
                          ? part.to
                          : `/${currentLanguage}/${part.to}`
                        return (
                          <span key={i} className='font-bold underline-animation'>
                            {part.to.startsWith('#') ? (
                              <a href={linkTo}>{part.value}</a>
                            ) : (
                              <Link to={linkTo}>{part.value}</Link>
                            )}
                          </span>
                        )
                      }
                      return null
                    })}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyUsSection