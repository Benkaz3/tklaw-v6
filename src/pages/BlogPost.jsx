import { useParams } from 'react-router-dom';
import useContentful from '../useContentful';
import Breadcrumb from '../components/Breadcrumb';
import heroBg from '../assets/practices_hero_bg.webp';
import { useTranslation } from 'react-i18next'; // Import useTranslation from i18next
import LoadingDots from '../components/LoadingDots';
import { Link } from 'react-router-dom';

// Utility function to convert Rich Text to JSX recursively
const renderRichText = (richTextNode) => {
  if (!richTextNode || !Array.isArray(richTextNode.content)) return '';

  return richTextNode.content.map((node, index) => {
    switch (node.nodeType) {
      case 'paragraph':
        return (
          <p key={index} className='mb-4 leading-relaxed text-gray-800'>
            {renderRichText(node)}
          </p>
        );
      case 'text':
        return node.value;
      case 'hyperlink':
        return (
          <a
            key={index}
            href={node.data.uri}
            className='text-blue-600 hover:underline'
          >
            {node.content.map((linkNode) => linkNode.value).join('')}
          </a>
        );
      default:
        return null;
    }
  });
};

const BlogPost = () => {
  const { t } = useTranslation(); // Get the t function for translation
  const { slug } = useParams();

  // Fetch the individual blog post by slug
  const { data, loading, error } = useContentful([
    {
      content_type: 'blogPage',
      'fields.slug': slug, // Filter by slug
    },
  ]);

  // Handle loading and error states
  if (loading) {
    return <LoadingDots />;
  }

  if (error) {
    console.error(error);
    return (
      <div className='text-red-500 text-center py-10'>
        Error: {error.message}
      </div>
    );
  }

  const post = data.blogPage ? data.blogPage[0] : null;

  if (!post) {
    return (
      <div className='text-center py-10'>
        {t('global.labels.post_not_found')}
      </div>
    ); // Use translation for not found message
  }

  return (
    <div className='container mx-auto lg:px-8'>
      {/* Hero Section */}
      <section
        className='relative h-[25vh] bg-cover bg-center flex items-center justify-center'
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      >
        <div className='absolute inset-0 bg-black opacity-50'></div>
      </section>

      {/* Breadcrumb */}
      <Breadcrumb postTitle={post.fields.title} />

      {/* Post Content */}
      <div className='py-10 max-w-3xl px-4 mx-auto'>
        <div className='relative z-10 max-w-4xl text-start text-white mb-4'>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold'>
            {post.fields.title}
          </h1>
        </div>

        {/* Category, Author, and Date Section */}
        <div className='flex items-center text-sm text-gray-500 mb-4 space-x-2'>
          {/* Author Section */}
          {Array.isArray(post.fields.author) && (
            <span className='flex items-center space-x-2'>
              {post.fields.author.map((author, index) => (
                <span
                  key={author.sys.id}
                  className='flex items-center space-x-2'
                >
                  {/* Author's photo */}
                  {author.fields.profilePhoto?.fields?.file?.url && (
                    <img
                      src={author.fields.profilePhoto.fields.file.url}
                      alt={author.fields.name}
                      className='w-6 h-6 rounded-full object-cover bg-buttonBg'
                    />
                  )}
                  {/* Author's name */}
                  <Link
                    to={`/attorneys/${author.fields.slug}`}
                    className='text-buttonBg font-bold uppercase hover:underline'
                  >
                    {author.fields.name}
                  </Link>
                  {/* Add comma between authors, but not after the last one */}
                  {index < post.fields.author.length - 1 && ', '}
                </span>
              ))}
            </span>
          )}

          {/* Separator between authors and date */}
          {Array.isArray(post.fields.author) && <span className='mx-2'>|</span>}

          {/* Date Published */}
          <span>{new Date(post.sys.createdAt).toLocaleDateString()}</span>
        </div>

        {/* Post Body */}
        <div className='mb-8 text-lg leading-relaxed text-gray-800'>
          {renderRichText(post.fields.body)} {/* Render Rich Text content */}
        </div>
        <div className='w-full border-t border-gray-300 my-6'></div>

        {/* Author Introduction Section */}
        {Array.isArray(post.fields.author) && (
          <div className='mt-8'>
            {post.fields.author.map((author) => (
              <div key={author.sys.id} className='mb-6'>
                <h3 className='text-xl font-bold text-gray-800 mb-2'>
                  {t('global.blog.about_the_author')}{' '}
                  {/* Translate the heading */}
                </h3>
                <p className='text-base text-gray-700'>
                  {author.fields.introduction}
                </p>
              </div>
            ))}
          </div>
        )}
        <div className='w-full border-t border-gray-300 my-6'></div>

        <p className='text-lg mt-4'>
          {t('global.blog.for_media_inquiries')}{' '}
          <a
            href={`mailto:${t('global.email')}`} // Use translation for email
            className='text-blue-600 hover:underline'
          >
            {t('global.email')}
          </a>
        </p>
      </div>
    </div>
  );
};

export default BlogPost;
