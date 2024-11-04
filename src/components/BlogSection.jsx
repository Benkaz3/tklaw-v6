import useContentful from '../useContentful';
import { useTranslation } from 'react-i18next'; // Use i18n's useTranslation hook
import { Link } from 'react-router-dom';
import LoadingDots from './LoadingDots';

// Utility function to convert Rich Text to string recursively
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

const BlogSection = () => {
  const { t, i18n } = useTranslation(); // Use i18n's useTranslation hook
  const language = i18n.language; // Get current language

  const { data, loading, error } = useContentful([
    {
      content_type: 'blogPage',
      order: '-sys.createdAt',
      limit: 3, // Limit to the latest 3 blog posts
      locale: language,
    },
  ]);

  // Handle loading and error states
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

  const blogPosts = data.blogPage || [];

  return (
    <section className='py-16'>
      <div className='container mx-auto px-4'>
        <h2 className='font-primary text-start text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-text'>
          {t('homepage.blog_section.title')}
        </h2>
        <div className='space-y-8'>
          {blogPosts.map((post) => {
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
                <Link
                  to={
                    language === 'vi'
                      ? `/vi/blog/${post.fields.slug}`
                      : `/en/blog/${post.fields.slug}`
                  }
                  className='flex items-center hover:underline'
                >
               
                <h3 className='text-2xl font-semibold mb-2'>
                  {post.fields.title}
                </h3>
                </Link>
                <div className='flex items-center text-sm text-gray-500 mb-4 space-x-2'>
                  {/* Author Section */}
                  {Array.isArray(post.fields.author) && post.fields.author.length > 0 ? (
                    <span className='flex items-center space-x-2'>
                      {post.fields.author.map((author, index) => {
                        const authorProfilePhoto = author.fields?.profilePhoto?.fields?.file?.url;
                        const authorSlug = author.fields?.slug; // Get slug safely
                        const authorName = author.fields?.name; // Get name safely

                        return (
                          <span
                            key={author.sys.id}
                            className='flex items-center space-x-2'
                          >
                            {authorProfilePhoto ? (
                              <img
                                src={authorProfilePhoto}
                                alt={authorName}
                                className='w-6 h-6 rounded-full object-cover'
                              />
                            ) : (
                              <span className='w-6 h-6 rounded-full bg-gray-300'></span> // Placeholder for missing profile photo
                            )}
                            {authorSlug ? ( // Check if slug exists before rendering Link
                              <Link
                                to={
                                  language === 'vi'
                                    ? `/vi/luat-su/${authorSlug}`
                                    : `/en/attorneys/${authorSlug}`
                                }
                                className='text-primary font-bold uppercase hover:underline'
                              >
                                {authorName}
                              </Link>
                            ) : (
                              <span className='text-gray-500'></span> // Fallback for missing slug
                            )}
                            {index < post.fields.author.length - 1 && ', '}
                          </span>
                        );
                      })}
                    </span>
                  ) : (
                    <span>N/A</span> // Fallback message if no authors
                  )}
                  {Array.isArray(post.fields.author) && post.fields.author.length > 0 && (
                    <span className='mx-2'>|</span>
                  )}
                  <span>
                    {new Date(post.sys.createdAt).toLocaleDateString()}
                  </span>
                  {/* Date Published */}
                </div>
                
                <p className='mb-4'>{previewText}</p>
              
                <Link
                  to={
                    language === 'vi'
                      ? `/vi/blog/${post.fields.slug}`
                      : `/en/blog/${post.fields.slug}`
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

export default BlogSection;
