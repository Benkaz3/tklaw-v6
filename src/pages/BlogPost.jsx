import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import useContentful from '../useContentful'
import LoadingDots from '../components/LoadingDots'
import Breadcrumb from '../components/Breadcrumb'
import heroBg from '../assets/practices_hero_bg.webp'
import imgPlaceholder from '../assets/img_placeholder.svg'
import { MdWarning } from 'react-icons/md'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'

const renderOptions = {
  renderMark: {
    [MARKS.BOLD]: (text) => <strong>{text}</strong>,
    [MARKS.ITALIC]: (text) => <em>{text}</em>,
    [MARKS.UNDERLINE]: (text) => <u>{text}</u>,
    [MARKS.CODE]: (text) => (
      <code className='p-1 bg-gray-100 rounded font-mono'>{text}</code>
    ),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p className='mb-4 leading-relaxed text-gray-800'>{children}</p>
    ),
    [BLOCKS.HEADING_1]: (node, children) => (
      <h1 className='font-bold mb-4'>{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2 className='font-semibold mb-3'>{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <h3 className='font-semibold mb-2'>{children}</h3>
    ),
    [BLOCKS.QUOTE]: (node, children) => (
      <blockquote className='border-l-4 border-gray-300 pl-4 italic text-gray-700 mb-4'>
        {children}
      </blockquote>
    ),
    [BLOCKS.UL_LIST]: (node, children) => (
      <ul className='list-disc list-inside mb-4 space-y-2'>{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node, children) => (
      <ol className='list-decimal list-inside mb-4 space-y-2'>{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (node, children) => (
      <li className='mb-2'>{children}</li>
    ),
    [BLOCKS.HR]: () => <hr className='my-4 border-t border-gray-300' />,
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { title, file } = node.data.target.fields || {}
      if (!file?.url) return null
      return (
        <div className='my-4'>
          <img
            src={file.url}
            alt={title || 'Embedded Asset'}
            className='w-full h-auto rounded-lg'
          />
          {title && <p className='text-center text-gray-600'>{title}</p>}
        </div>
      )
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      const { title, slug } = node.data.target.fields || {}
      const thumbnail =
        node.data.target.fields?.thumbnail?.fields?.file?.url ||
        node.data.target.fields?.image?.fields?.file?.url ||
        imgPlaceholder
      if (!slug) return null
      return (
        <a
          href={`/vi/blog/${slug}`}
          className='my-4 p-4 bg-gray-200 rounded flex items-center hover:border hover:border-gray-300'
          target='_blank'
          rel='noopener noreferrer'
        >
          <div className='flex-grow font-bold'>{title || 'Untitled'}</div>
          {thumbnail && (
            <img
              src={thumbnail}
              alt={title || 'Thumbnail'}
              className='w-20 h-20 rounded ml-4 object-cover'
            />
          )}
        </a>
      )
    },
    [INLINES.EMBEDDED_ENTRY]: (node) => {
      const { name, slug } = node.data.target.fields || {}
      if (!name || !slug) return null
      return (
        <a
          href={`/vi/luat-su/${slug}`}
          className='inline-block bg-blue-50 px-2 py-1 rounded text-blue-600 hover:underline'
        >
          {name}
        </a>
      )
    },
    [INLINES.HYPERLINK]: (node, children) => (
      <a
        href={node.data.uri}
        className='text-blue-600 hover:underline'
        target='_blank'
        rel='noopener noreferrer'
      >
        {children}
      </a>
    ),
  },
}

const BlogPost = () => {
  const { t } = useTranslation()
  const { slug } = useParams()
  const { data, loading, error } = useContentful([
    {
      content_type: 'blogPage',
      'fields.slug': slug,
    },
  ])

  if (loading)
    return <LoadingDots />
  if (error)
    return (
      <div className='text-red-500 text-center py-10'>
        Error: {error.message || 'An unknown error occurred.'}
      </div>
    )

  const post = data?.blogPage?.[0]
  if (!post?.fields)
    return (
      <div className='text-center py-10'>
        {t('global.labels.post_not_found')}
      </div>
    )

  const { title, body, author } = post.fields
  const authors = Array.isArray(author) ? author.filter(a => a?.fields) : []

  return (
    <div className='container mx-auto lg:px-8'>
      <section
        className='relative h-[25vh] bg-cover bg-center flex items-center justify-center'
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className='absolute inset-0 bg-black opacity-50' />
      </section>
      <Breadcrumb postTitle={title || 'Untitled Post'} />
      <div className='flex justify-center items-center mt-4 space-x-2'>
        <MdWarning color='orange' size={18} />
        <span>Available in Vietnamese only</span>
      </div>
      <div className='py-10 max-w-3xl px-4 mx-auto'>
        <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold'>
          {title || 'Untitled Post'}
        </h1>
        <div className='flex items-center text-gray-500 mb-4 space-x-2'>
          <span>
            {post.sys?.createdAt
              ? new Date(post.sys.createdAt).toLocaleDateString()
              : 'Unknown Date'}
          </span>
        </div>
        <div className='mb-8 leading-relaxed text-gray-800'>
          {body
            ? documentToReactComponents(body, renderOptions)
            : 'Content unavailable.'}
        </div>
        {authors.length > 0 && (
          <div className='mt-8'>
            <h3 className='font-bold text-gray-800 mb-4'>
              {t('global.blog.about_the_author')}
            </h3>
            <div className='grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
              {authors.map((author) => {
                const { sys, fields } = author
                if (!fields) return null
                const { name, title, introduction, slug: authorSlug, profilePhoto } = fields
                const photoUrl = profilePhoto?.fields?.file?.url || imgPlaceholder
                return (
                  <div
                    key={sys?.id}
                    className='card flex flex-col items-start bg-card_background rounded-lg shadow-sm p-6 hover:shadow-lg transition'
                  >
                    <div className='flex items-start mb-4'>
                      <div className='w-16 h-16 rounded-full border flex items-center justify-center bg-primary'>
                        <img
                          src={photoUrl}
                          alt={name || 'Author'}
                          className='w-full h-full rounded-full object-cover'
                        />
                      </div>
                      <div className='flex flex-col ml-4'>
                        <p className='font-semibold text-text'>
                          {name || 'Unknown Author'}
                        </p>
                        <p className='text-text'>
                          {title || 'Unknown Title'}
                        </p>
                      </div>
                    </div>
                    <p className='text-gray-600 mb-4 leading-relaxed'>
                      {introduction || 'No introduction available.'}
                    </p>
                    <Link
                      to={`/attorneys/${authorSlug || '#'}`}
                      className='underline-animation text-primary font-medium'
                    >
                      {t('practice_details_page.view_profile')}
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogPost