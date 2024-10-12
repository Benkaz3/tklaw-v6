import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import useContentful from '../useContentful'; // Custom hook for fetching Contentful data
import { useTranslation } from 'react-i18next'; // i18n for language switching
import { Link } from 'react-router-dom';
import LoadingDots from '../components/LoadingDots';

const convertRichTextToString = (richTextNode) => {
  if (!richTextNode || !Array.isArray(richTextNode.content)) return '';

  return richTextNode.content
    .map((node) => {
      switch (node.nodeType) {
        case 'paragraph':
          return convertRichTextToString(node);
        case 'text':
          return node.value;
        case 'hyperlink':
          return node.content.map((linkNode) => linkNode.value).join('');
        default:
          return '';
      }
    })
    .join('');
};

const BlogCategoryPage = () => {
  const { t, i18n } = useTranslation();
  const { categorySlug } = useParams(); // Extract categorySlug from URL
  const language = i18n.language;
  const location = useLocation();

  // Fetch data from Contentful
  const { data, loading, error } = useContentful([
    {
      content_type: 'blogPage',
      locale: language,
    },
    {
      content_type: 'category',
      locale: language,
    },
  ]);

  const [filteredPosts, setFilteredPosts] = useState([]);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    if (data) {
      // Extract categories and blog posts from data
      const categories = data.category || [];
      const blogPosts = data.blogPage || [];

      // Find the category by categorySlug
      const category = categories.find(
        (cat) => cat.fields.slug === categorySlug
      );
      if (category) {
        setCategoryName(category.fields.name);
      }

      // Filter blog posts belonging to the selected category
      const categoryPosts = blogPosts.filter(
        (post) =>
          Array.isArray(post.fields.categories) && // Check if categories is an array
          post.fields.categories.some(
            (category) => category.fields.slug === categorySlug
          )
      );

      setFilteredPosts(categoryPosts);
    }
  }, [data, categorySlug]);

  if (loading) {
    return (
      <div className='flex bg-background items-center justify-center h-screen text-center py-10'>
        <LoadingDots />
      </div>
    );
  }

  if (error) {
    console.error(error);
    return (
      <div className='text-red-500 text-center py-10'>
        Error: {error.message}
      </div>
    );
  }

  if (!filteredPosts.length) {
    return (
      <div className='text-center py-10'>
        <h2>{t('global.messages.no_blog_posts')}</h2>
      </div>
    );
  }

  return (
    <section className='py-16'>
      <div className='container mx-auto px-4'>
        <h2 className='font-primary text-3xl sm:text-4xl font-bold text-text mb-6'>
          {t('blog.category_title', { category: categoryName })}
        </h2>

        <div className='space-y-8'>
          {filteredPosts.map((post) => {
            const bodyText = convertRichTextToString(post.fields.body);
            const previewText =
              bodyText.length > 300
                ? bodyText.substring(0, 300) + '...'
                : bodyText;

            return (
              <div
                key={post.sys.id}
                className='p-6 bg-section_background border rounded-md'
              >
                <h3 className='text-2xl font-semibold mb-2'>
                  {post.fields.title}
                </h3>

                <div className='flex items-center text-sm text-gray-500 mb-4 space-x-2'>
                  {Array.isArray(post.fields.author) && (
                    <span className='flex items-center space-x-2'>
                      {post.fields.author.map((author, index) => (
                        <span
                          key={author.sys.id}
                          className='flex items-center space-x-2'
                        >
                          {author.fields.profilePhoto?.fields?.file?.url && (
                            <img
                              src={author.fields.profilePhoto.fields.file.url}
                              alt={author.fields.name}
                              className='w-6 h-6 rounded-full object-cover'
                            />
                          )}
                          <Link
                            to={
                              language === 'vi'
                                ? `/vi/luat-su/${author.fields.slug}`
                                : `/en/attorneys/${author.fields.slug}`
                            }
                            className='text-primary font-bold uppercase hover:underline'
                          >
                            {author.fields.name}
                          </Link>
                          {index < post.fields.author.length - 1 && ', '}
                        </span>
                      ))}
                    </span>
                  )}
                  <span className='mx-2'>|</span>
                  <span>
                    {new Date(post.sys.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className='mb-4'>{previewText}</p>

                <Link
                  to={
                    language === 'vi'
                      ? `/vi/blog/chu-de/${post.fields.slug}`
                      : `/en/blog/category/${post.fields.slug}`
                  }
                  className='flex items-center text-primary hover:underline'
                >
                  <span className='mr-1 text-sm font-bold'>
                    {t('global.labels.read_more_label')}
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BlogCategoryPage;
