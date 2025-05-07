import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import useContentful from '../useContentful'
import LoadingDots from '../components/LoadingDots'
import Breadcrumb from '../components/Breadcrumb'
import heroBg from '../assets/practices_hero_bg.webp'
import imgPlaceholder from '../assets/img_placeholder.svg'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'

const renderOptions = {/* ... your existing renderOptions ... */}

const BlogPost = () => {
  const { t } = useTranslation()
  const { slug } = useParams()
  const { data, loading, error } = useContentful([
    { content_type: 'blogPage', 'fields.slug': slug },
  ])

  if (loading) return <LoadingDots />
  if (error)
    return (
      <div className="text-red-500 text-center py-10">
        Error: {error.message || 'An unknown error occurred.'}
      </div>
    )

  const post = data?.blogPage?.[0]?.fields
  if (!post)
    return (
      <div className="text-center py-10">
        {t('global.labels.post_not_found')}
      </div>
    )

  const { title, body, author } = post
  const authors = Array.isArray(author) ? author.filter(a => a?.fields) : []

  return (
    <div className="container mx-auto lg:px-8">
      <section
        className="relative h-80 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${heroBg})` }}
        aria-label={t('practice_details_page.hero_background')}
      >
        <div className="absolute inset-0 bg-black opacity-50" />
      </section>

      <Breadcrumb postTitle={title || 'Untitled Post'} />

      <div className="py-10 max-w-3xl px-4 mx-auto">
        <h1 className="font-semibold text-2xl lg:text-3xl mb-4">
          {title || 'Untitled Post'}
        </h1>

        <div className="flex items-center text-gray-500 mb-6 space-x-2">
          <span>
            {post.sys?.createdAt
              ? new Date(post.sys.createdAt).toLocaleDateString()
              : 'Unknown Date'}
          </span>
        </div>

        <div className="mb-8 leading-relaxed text-gray-800">
          {body
            ? documentToReactComponents(body, renderOptions)
            : 'Content unavailable.'}
        </div>

{authors.length === 1 && (() => {
  const { sys, fields } = authors[0]
  const { name, title: authorTitle, introduction, slug: authorSlug, profilePhoto } = fields
  const photoUrl = profilePhoto?.fields?.file?.url || imgPlaceholder

  return (
    <div className="mt-12 flex flex-col sm:flex-row items-center bg-card_background rounded-lg shadow-sm p-6">
      {/* Avatar */}
      <div className="w-24 h-24 rounded-full overflow-hidden border flex-shrink-0">
        <img
          src={photoUrl}
          alt={name || 'Author'}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left flex-1">
        <p className="font-semibold text-text text-xl">{name}</p>
        <p className="text-text text-sm mb-4">{authorTitle}</p>
        <p className="text-gray-600 leading-relaxed mb-4">
          {introduction}
        </p>
        <Link
          to={`/attorneys/${authorSlug}`}
          className="underline-animation text-primary font-medium"
        >
          {t('practice_details_page.view_profile')}
        </Link>
      </div>
    </div>
  )
})()}

      </div>
    </div>
  )
}

export default BlogPost
