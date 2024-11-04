import useContentful from '../useContentful';
import Breadcrumb from '../components/Breadcrumb';
import heroBg from '../assets/practices_hero_bg.webp';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LoadingDots from '../components/LoadingDots';

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

const BlogPage = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const { data, loading, error } = useContentful([
    {
      content_type: 'blogPage',
      order: '-sys.createdAt',
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
  console.log('Blog Posts:', blogPosts);

  return (
    <div className='container mx-auto'>
      {/* Hero Section */}
      <section
        className='relative h-[25vh] bg-cover bg-center flex items-center justify-center'
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      >
        <div className='absolute inset-0 bg-black opacity-50'></div>
        <div className='relative z-10 max-w-4xl text-center text-white'></div>
      </section>

      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Blog Posts Section */}
      <div className='space-y-8'>
        {blogPosts.map((post) => {
          const bodyText = convertRichTextToString(post.fields.body);
          const previewText =
            bodyText.length > 300
              ? bodyText.substring(0, 300) + '...'
              : bodyText;

          console.log('Current Post:', post); // Log current post for debugging

          return (
            <div key={post.sys.id} className='p-6'>
              <h2 className='text-2xl font-semibold mb-2'>
                {post.fields.title}
              </h2>
              {/* Date and Author Section */}
              <div className='flex items-center text-sm text-gray-500 mb-4 space-x-2'>
                {/* Check if post.fields.author exists and is an array */}
                {Array.isArray(post.fields.author) && post.fields.author.length > 0 && (
                  <span className='flex items-center space-x-2'>
                    {post.fields.author.map((author, index) => {
                      console.log('Current Author:', author); // Log current author for debugging

                      // Ensure author and author.fields exist
                      const authorFields = author.fields || {};
                      const profilePhoto = authorFields.profilePhoto || {};
                      const authorProfilePhotoUrl = profilePhoto.fields?.file?.url;

                      return (
                        <span key={author.sys.id} className='flex items-center space-x-2'>
                          {authorProfilePhotoUrl ? (
                            <img
                              src={authorProfilePhotoUrl}
                              alt={authorFields.name}
                              className='w-6 h-6 rounded-full object-cover bg-buttonBg'
                            />
                          ) : (
                            <span>No Profile Photo</span> // Add a fallback if photo is missing
                          )}
                          <Link
                            to={`/${
                              language === 'vi' ? 'vi/luat-su/' : 'en/attorneys/'
                            }${authorFields.slug}`}
                            className='text-buttonBg font-bold uppercase hover:underline'
                          >
                            {authorFields.name}
                          </Link>
                          {index < post.fields.author.length - 1 && ', '}
                        </span>
                      );
                    })}
                  </span>
                )}
                {Array.isArray(post.fields.author) && post.fields.author.length > 0 && (
                  <span className='mx-2'>|</span>
                )}
                <span>{new Date(post.sys.createdAt).toLocaleDateString()}</span>{' '}
                {/* Date Published */}
              </div>
              <p className='mb-4'>{previewText}</p>
              {/* Display the preview text */}
              <Link
                to={`/${language}/blog/${post.fields.slug}`}
                className='flex items-center text-buttonBg hover:underline'
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
  );
};

export default BlogPage;
