import { useParams } from 'react-router-dom';
import useContentful from '../useContentful';
import Breadcrumb from '../components/Breadcrumb';
import heroBg from '../assets/practices_hero_bg.webp';
import { useTranslation } from 'react-i18next';
import LoadingDots from '../components/LoadingDots';
import { Link } from 'react-router-dom';
import { MdWarning } from 'react-icons/md';
import imgPlaceholder from '../assets/img_placeholder.svg';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';

const renderOptions = {
  renderMark: {
    [MARKS.BOLD]: (text) => <strong>{text}</strong>,
    [MARKS.ITALIC]: (text) => <em>{text}</em>,
    [MARKS.UNDERLINE]: (text) => <u>{text}</u>,
    [MARKS.CODE]: (text) => (
      <code className='p-1 bg-gray-100 rounded text-sm font-mono'>{text}</code>
    ),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p className='mb-4 leading-relaxed text-gray-800'>{children}</p>
    ),
    [BLOCKS.HEADING_1]: (node, children) => (
      <h1 className='text-3xl font-bold mb-4'>{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2 className='text-2xl font-semibold mb-3'>{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <h3 className='text-xl font-semibold mb-2'>{children}</h3>
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
    [BLOCKS.LIST_ITEM]: (node, children) => {
      // Check if the child is a paragraph and render text directly in <li>
      return (
        <li className='mb-2'>
          {children.map((child) =>
            child.type === 'p' ? child.props.children : child
          )}
        </li>
      );
    },
    [BLOCKS.HR]: () => <hr className='my-4 border-t border-gray-300' />,
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { title, file } = node.data.target.fields;
      return (
        <div className='my-4'>
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
};

const BlogPost = () => {
  const { t } = useTranslation();
  const { slug } = useParams();

  const { data, loading, error } = useContentful([
    {
      content_type: 'blogPage',
      'fields.slug': slug,
    },
  ]);

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
    );
  }

  return (
    <div className='container mx-auto lg:px-8'>
      {/* Hero Section */}
      <section
        className='relative h-[25vh] bg-cover bg-center flex items-center justify-center'
        style={{ backgroundImage: `url(${heroBg})` }}
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

        {/* Date Published */}
        <div className='flex items-center text-sm text-gray-500 mb-4 space-x-2'>
          <span>{new Date(post.sys.createdAt).toLocaleDateString()}</span>
        </div>

        {/* Render Rich Text Content */}
        <div className='mb-8 text-lg leading-relaxed text-gray-800'>
          {documentToReactComponents(post.fields.body, renderOptions)}
        </div>

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
                  className='card flex flex-col items-start bg-card_background rounded-lg shadow-sm p-6 hover:shadow-lg transition'
                >
                  <div className='flex items-start mb-4'>
                    <div className='w-16 h-16 rounded-full border flex items-center justify-center bg-primary'>
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
                  <p className='text-gray-600 mb-4 text-base leading-relaxed'>
                    {author.fields.introduction}
                  </p>
                  <Link
                    to={`/attorneys/${author.fields.slug}`}
                    className='underline-animation text-primary font-medium'
                  >
                    {t('practice_details_page.view_profile')}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className='text-lg mt-4'>
          {t('global.blog.for_media_inquiries')}{' '}
          <a
            href={`mailto:${t('global.email')}`}
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
