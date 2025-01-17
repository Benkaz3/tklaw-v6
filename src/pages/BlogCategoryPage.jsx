import { useParams } from 'react-router-dom'
import useContentful from '../useContentful'
import LoadingDots from '../components/LoadingDots'
import { Helmet } from 'react-helmet-async';
import useSeo from '../seo/useSeo';

const CategoryPage = () => {
  const seo = useSeo('BlogCategoryPage')

  const { categorySlug } = useParams()
  const {
    data: categoryDataResult,
    loading: categoryLoading,
    error: categoryError,
  } = useContentful([
    {
      content_type: 'category',
      'fields.slug': categorySlug,
      locale: 'en',
    },
  ])
  const category = categoryDataResult?.category?.[0] || null
  const {
    data: blogPostsData,
    loading: blogLoading,
    error: blogError,
  } = useContentful(
    category
      ? [
          {
            content_type: 'blogPage',
            'fields.categories.sys.id[in]': category.sys.id,
            locale: 'en',
          },
        ]
      : []
  )
  const blogPosts = blogPostsData?.blogPage || []
  const loading = categoryLoading || blogLoading
  const error = categoryError || blogError

  if (loading)
    return (
      <div className='flex bg-background items-center justify-center h-screen text-center py-10'>
        <LoadingDots />
      </div>
    )
  if (error)
    return (
      <div className='text-red-500 text-center py-10'>
        Error loading category or blog posts: {error.message}
      </div>
    )
  if (!category)
    return <div className='text-center py-10'>No category found</div>

  return (
    <div className='container mx-auto mt-32'>
      <Helmet>
        <title>{seo.Title}</title>
        <meta name="description" content={seo.Description} />
        <meta name="keywords" content={seo.Keywords.join(', ')} />
      </Helmet>
      <h1 className='text-4xl font-bold mb-8'>Category: {category.fields.name}</h1>
      <div className='space-y-8'>
        {blogPosts.length > 0 ? (
          blogPosts.map(({ sys, fields }) => (
            <div key={sys.id} className='p-6 border-b border-gray-300'>
              <h2 className='text-2xl font-semibold mb-2'>{fields.title}</h2>
              <p>
                {fields.body?.content?.[0]?.content?.[0]?.value || 'No content available'}
              </p>
              <a href={`/blog/${fields.slug}`} className='text-blue-500 hover:underline'>
                Read more
              </a>
            </div>
          ))
        ) : (
          <div>No blog posts found for this category.</div>
        )}
      </div>
    </div>
  )
}

export default CategoryPage