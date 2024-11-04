import { useParams } from 'react-router-dom';
import useContentful from '../useContentful';
import Breadcrumb from '../components/Breadcrumb';
import heroBg from '../assets/practices_hero_bg.webp';
import { useTranslation } from 'react-i18next'; // Import useTranslation from i18next
import LoadingDots from '../components/LoadingDots';
import { Link } from 'react-router-dom';
import { MdWarning } from 'react-icons/md';
import imgPlaceholder from '../assets/img_placeholder.svg'; // Add a placeholder image import
import { MdWarning } from 'react-icons/md';
import imgPlaceholder from '../assets/img_placeholder.svg'; // Add a placeholder image import

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
      case 'heading-1':
        return (
          <h1 key={index} className='text-3xl font-bold mb-4'>
            {renderRichText(node)}
          </h1>
        );
      case 'heading-2':
        return (
          <h2 key={index} className='text-2xl font-semibold mb-3'>
            {renderRichText(node)}
          </h2>
        );
      case 'heading-3':
        return (
          <h3 key={index} className='text-xl font-semibold mb-2'>
            {renderRichText(node)}
          </h3>
        );
      case 'heading-1':
        return (
          <h1 key={index} className='text-3xl font-bold mb-4'>
            {renderRichText(node)}
          </h1>
        );
      case 'heading-2':
        return (
          <h2 key={index} className='text-2xl font-semibold mb-3'>
            {renderRichText(node)}
          </h2>
        );
      case 'heading-3':
        return (
          <h3 key={index} className='text-xl font-semibold mb-2'>
            {renderRichText(node)}
          </h3>
        );
      case 'text':
        const hasCodeMark =
          node.marks && node.marks.some((mark) => mark.type === 'code');
        if (hasCodeMark) {
          return (
            <div className='p-4 border-0 border-gray-300 bg-gray-100 rounded'>
              <code
                key={index}
                className='text-gray-800 px-2 rounded text-sm font-mono'
              >
                {node.value}
              </code>
            </div>
          );
        }
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
      case 'ordered-list':
        return (
          <ol key={index} className='list-decimal list-inside mb-4'>
            {node.content.map((listItem, itemIndex) => (
              <li key={itemIndex} className='mb-2 flex items-start'>
                {renderRichText(listItem)}
              </li>
            ))}
          </ol>
        );

      case 'unordered-list':
        return (
          <ul key={index} className='list-disc list-inside mb-4'>
            {node.content.map((listItem, itemIndex) => (
              <li key={itemIndex} className='mb-2 inline'>
                {' '}
                {/* Use 'inline' to keep items on the same line */}
                {renderRichText(listItem)}
              </li>
            ))}
          </ul>
        );
      case 'blockquote':
        return (
          <blockquote
            key={index}
            className='border-l-4 border-gray-300 pl-4 italic text-gray-700 mb-4'
          >
            {renderRichText(node)}
          </blockquote>
        );
      case 'hr':
        return <hr key={index} className='my-4 border-t border-gray-300' />;
      case 'embedded-asset-block':
        const { title, file } = node.data.target.fields;
        return (
          <div key={index} className='my-4'>
            <img
              src={file.url}
              alt={title}
              className='w-full h-auto rounded-lg'
            />
            {title && (
              <p className='text-center text-sm text-gray-600'>{title}</p>
            )}
          </div>
        );

      case 'embedded-entry-block':
        const entryBlock = node.data.target.fields;
        return (
          <div key={index} className='my-4'>
            <a href={`/vi/blog/${entryBlock.slug}`}>
              <div className='flex items-center p-4 bg-gray-200 border rounded-sm hover:bg-section_background transition'>
                <h3 className='text-lg font-bold mb-2'>{entryBlock.title}</h3>
                {entryBlock.image && entryBlock.image.fields.file && (
                  <img
                    src={entryBlock.image.fields.file.url}
                    alt={entryBlock.title}
                    className='w-16 h-16 object-cover rounded ml-4'
                  />
                )}
                {entryBlock.introduction && (
                  <p className='text-gray-700'>
                    {entryBlock.introduction.slice(0, 100)}...
                  </p>
                )}
              </div>
            </a>
          </div>
        );

      case 'embedded-entry-inline':
        const inlineEntry = node.data.target.fields;
        return (
          <a
            key={index}
            href={`/vi/luat-su/${inlineEntry.slug}`}
            className='text-blue-600 hover:underline inline-block'
          >
            {inlineEntry.name || inlineEntry.title}
          </a>
        );
      case 'code':
        return (
          <pre
            key={index}
            className='bg-gray-800 text-sm text-white p-4 rounded-lg overflow-x-auto'
          >
            <code>{node.content[0].value}</code>
          </pre>
        );
      default:
        console.warn(`Unsupported node type: ${node.nodeType}`);
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
  // console.log(`data: ${JSON.stringify(data.blogPage)}`);

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

      <div className='flex justify-center items-center mt-4 space-x-2'>
        <MdWarning color='orange' size={18} />
        <span className='text-xs'>Available in Vietnamese only</span>
      </div>

      {/* Post Content */}
      <div className='py-10 max-w-3xl px-4 mx-auto'>
        <div className='relative z-10 max-w-4xl text-start text-white mb-4'>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold'>
            {post.fields.title}
          </h1>
        </div>

        {/* Category, Author, and Date Section */}
        <div className='flex items-center text-sm text-gray-500 mb-4 space-x-2'>
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
            <h3 className='text-xl font-bold text-gray-800 mb-4'>
              {t('global.blog.about_the_author')}
            </h3>
            <div className='grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
              {post.fields.author.map((author) => (
                <div
                  key={author.sys.id}
                  className='card flex flex-col items-start bg-card_background rounded-lg shadow-sm p-6 transition-all duration-300 hover:shadow-lg'
                >
                  {/* Photo */}
                  <div className='flex items-start mb-4'>
                    <div className='w-16 h-16 rounded-full border border-text flex items-center justify-center bg-primary'>
                      <img
                        src={
                          author.fields.profilePhoto?.fields?.file?.url ||
                          imgPlaceholder
                        }
                        alt={author.fields.name}
                        className='w-full h-full rounded-full object-cover'
                      />
                    </div>
                    <div className='flex flex-col ml-4'>
                      <p className='font-semibold text-text text-lg'>
                        {author.fields.name}
                      </p>
                      <p className='text-text text-base'>
                        {author.fields.title}
                      </p>
                    </div>
                  </div>

                  {/* Introduction */}
                  <p className='text-gray-600 mb-4 text-base leading-relaxed'>
                    {author.fields.introduction}
                  </p>

                  {/* View Profile */}
                  <div className='mt-2'>
                    <Link
                      to={`/attorneys/${author.fields.slug}`} // Use dynamic link for author profile
                      className='underline-animation text-primary font-medium'
                    >
                      {t('practice_details_page.view_profile')}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className='w-full border-t border-gray-300 my-6'></div>
          </div>
        )}

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
