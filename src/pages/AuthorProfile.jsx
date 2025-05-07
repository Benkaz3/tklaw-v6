import React from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import useContentful from '../useContentful'
import LoadingDots from '../components/LoadingDots'
import Breadcrumb from '../components/Breadcrumb'
import generateMetaTags from '../seo/generateMetaTags'
import useSeo from '../seo/useSeo'
import heroBg from '../assets/practices_hero_bg.webp'

const AuthorProfile = () => {
  const seo = useSeo('AuthorProfilePage')
  const metaTags = generateMetaTags(seo)
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

  if (error) {
    return (
      <main className="px-4 sm:px-6 lg:px-8 py-10 text-center">
        <p className="text-red-500">
          {t('global.error_message', { message: error.message })}
        </p>
      </main>
    )
  }

  const entry = data?.author?.[0]
  if (!entry?.fields) {
    return (
      <main className="px-4 sm:px-6 lg:px-8 py-10 text-center">
        <p className="text-gray-700">{t('global.author_not_found')}</p>
      </main>
    )
  }

  const {
    name,
    title,
    profilePhoto,
    areasOfPractice,
    education,
    workExperience,
    introduction,
    professionalAssociations,
  } = entry.fields
  const photoUrl = profilePhoto?.fields?.file?.url
  const date = entry.sys.createdAt

  const listItems = items =>
    (typeof items === 'string' ? items.split('\n') : items || []).map(
      (item, i) => <li key={i} className="mb-2">{item}</li>
    )

  return (
    <main className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <Helmet>
        <title>{seo?.Title || name}</title>
        {Array.isArray(metaTags) &&
          metaTags.map((meta, i) =>
            meta && typeof meta === 'object' ? <meta key={i} {...meta} /> : null
          )}
        {seo?.ogUrl && <link rel="canonical" href={seo.ogUrl} />}
      </Helmet>

      <header
        className="relative w-full h-56 sm:h-64 md:h-72 lg:h-80 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
        aria-label={t('practice_details_page.hero_background')}
      >
        <div className="absolute inset-0 bg-black opacity-40" />
        <h1 className="sr-only">{name}</h1>
      </header>

      <Breadcrumb attorneyName={name} />

      <article
        className="bg-white border border-gray-200 rounded-lg shadow divide-y divide-gray-200 overflow-hidden"
        itemScope
        itemType="http://schema.org/Person"
      >
        {/* Profile header */}
        <div className="flex flex-col items-center text-center px-6 py-8 sm:flex-row sm:items-center sm:text-left">
  {photoUrl && (
    <figure className="flex-shrink-0 mb-6 sm:mb-0">
      <img
        src={photoUrl}
        alt={name}
        className="
          w-32 h-32
          sm:w-36 sm:h-36
          md:w-40 md:h-40
          rounded-full border-4 border-white shadow-md
          object-cover
          mx-auto sm:mx-0
        "
      />
    </figure>
  )}
  <div className="sm:ml-6">
    <h1 itemProp="name" className="font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight">
      {name}
    </h1>
    <p itemProp="jobTitle" className="text-gray-600 italic text-base sm:text-lg mt-1">
      {title}
    </p>
    
  </div>
</div>


        {/* Content sections */}
        <div className="px-6 py-8 space-y-8">
          {areasOfPractice && (
            <section aria-labelledby="areas-heading">
              <h2 id="areas-heading" className="font-semibold text-2xl sm:text-3xl text-gray-800 mb-4">
                {t('global.attorney_profile.areas_of_practice')}
              </h2>
              <ul className="list-disc list-inside ml-5 text-base sm:text-lg leading-relaxed space-y-2">
                {listItems(areasOfPractice)}
              </ul>
            </section>
          )}
          {education && (
            <section aria-labelledby="education-heading">
              <h2 id="education-heading" className="font-semibold text-2xl sm:text-3xl text-gray-800 mb-4">
                {t('global.attorney_profile.education')}
              </h2>
              <ul className="list-disc list-inside ml-5 text-base sm:text-lg leading-relaxed space-y-2">
                {listItems(education)}
              </ul>
            </section>
          )}
          {workExperience && (
            <section aria-labelledby="experience-heading">
              <h2 id="experience-heading" className="font-semibold text-2xl sm:text-3xl text-gray-800 mb-4">
                {t('global.attorney_profile.work_experience')}
              </h2>
              <ul className="list-disc list-inside ml-5 text-base sm:text-lg leading-relaxed space-y-2">
                {listItems(workExperience)}
              </ul>
            </section>
          )}
          {introduction && (
            <section aria-labelledby="intro-heading">
              <h2 id="intro-heading" className="font-semibold text-2xl sm:text-3xl text-gray-800 mb-4">
                {t('global.attorney_profile.introduction')}
              </h2>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                {introduction}
              </p>
            </section>
          )}
          {professionalAssociations && (
            <section aria-labelledby="associations-heading">
              <h2 id="associations-heading" className="font-semibold text-2xl sm:text-3xl text-gray-800 mb-4">
                {t('global.attorney_profile.professional_associations')}
              </h2>
              <ul className="list-disc list-inside ml-5 text-base sm:text-lg leading-relaxed space-y-2">
                {listItems(professionalAssociations)}
              </ul>
            </section>
          )}
        </div>
      </article>
    </main>
  )
}

export default AuthorProfile
