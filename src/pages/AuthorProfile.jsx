import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import useContentful from '../useContentful'
import LoadingDots from '../components/LoadingDots'
import Breadcrumb from '../components/Breadcrumb'
import heroBg from '../assets/practices_hero_bg.webp'
import generateMetaTags from '../seo/generateMetaTags';
import { Helmet } from 'react-helmet-async';
import useSeo from '../seo/useSeo';

const AuthorProfile = () => {

  const seo = useSeo('AuthorProfilePage');

  const metaTags = generateMetaTags(seo);
  const { slug } = useParams()
  const { t, i18n } = useTranslation()
  const language = i18n.language
  const { data, loading, error } = useContentful([
    {
      content_type: 'author',
      'fields.slug': slug,
      locale: language,
    },
  ])

  if (loading) return <LoadingDots />
  if (error)
    return (
      <div className='text-error text-center py-10'>
        {t('global.error_message', { message: error.message })}
      </div>
    )

  const author = data?.author?.[0]
  if (!author)
    return (
      <div className='text-center py-10 text-text'>
        {t('global.author_not_found')}
      </div>
    )

  const { name, title, areasOfPractice, education, workExperience, introduction, professionalAssociations } = author.fields

  const renderList = (items) => {
    if (typeof items === 'string') {
      return items.split('\n').map((item, index) => (
        <p key={index} className='mb-2'>
          {item}
        </p>
      ))
    }
    if (Array.isArray(items)) {
      return items.map((item, index) => (
        <p key={index} className='mb-2'>
          {item}
        </p>
      ))
    }
    return items ? <p>{items}</p> : null
  }

  return (
    <div className='py-10 max-w-4xl mx-auto'>
       <Helmet>
  <title>{seo?.Title || 'Default Title'}</title>
  
  {Array.isArray(metaTags) &&
    metaTags.map((meta, index) => {
      if (meta && typeof meta === 'object') {
        return <meta key={index} {...meta} />;
      }
      console.warn(`Invalid meta tag at index ${index}:`, meta);
      return null; 
    })}

  {seo?.ogUrl && typeof seo.ogUrl === 'string' && (
    <link rel="canonical" href={seo.ogUrl} />
  )}
</Helmet>
      <section
        className='relative h-64 bg-cover bg-center flex items-center justify-center mb-6'
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className='absolute inset-0 bg-black opacity-40' />
      </section>
      <Breadcrumb attorneyName={name} />
      <div className='p-6 bg-white border border-gray-200 rounded-lg shadow'>
        {name && <h1 className='text-3xl font-bold text-gray-800 mb-2'>{name}</h1>}
        {title && <h2 className='text-xl text-gray-600 mb-4 italic'>{title}</h2>}
        {areasOfPractice && (
          <div className='mb-6'>
            <h3 className='font-semibold text-lg text-gray-700 mb-2'>
              {t('global.attorney_profile.areas_of_practice')}
            </h3>
            <div className='text-gray-600'>{renderList(areasOfPractice)}</div>
          </div>
        )}
        {education && (
          <div className='mb-6'>
            <h3 className='font-semibold text-lg text-gray-700 mb-2'>
              {t('global.attorney_profile.education')}
            </h3>
            <div className='text-gray-600'>{renderList(education)}</div>
          </div>
        )}
        {workExperience && (
          <div className='mb-6'>
            <h3 className='font-semibold text-lg text-gray-700 mb-2'>
              {t('global.attorney_profile.work_experience')}
            </h3>
            <div className='text-gray-600'>{renderList(workExperience)}</div>
          </div>
        )}
        {introduction && (
          <div className='mb-6'>
            <h3 className='font-semibold text-lg text-gray-700 mb-2'>
              {t('global.attorney_profile.introduction')}
            </h3>
            <p className='text-gray-600'>{introduction}</p>
          </div>
        )}
        {professionalAssociations && (
          <div className='mb-6'>
            <h3 className='font-semibold text-lg text-gray-700 mb-2'>
              {t('global.attorney_profile.professional_associations')}
            </h3>
            <div className='text-gray-600'>{renderList(professionalAssociations)}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AuthorProfile