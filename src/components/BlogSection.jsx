import useContentful from '../useContentful';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LoadingDots from './LoadingDots';

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
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  const { data, loading, error } = useContentful([
    {
      content_type: 'blogPage',
      order: '-sys.createdAt',
      limit: 3,
      locale: language,
    },
  ]);

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

  const blogPosts = data?.blogPage || [];

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

            const authors = Array.isArray(post.fields.author)
              ? post.fields.author.filter((author) => author?.fields)
              : [];

            return (
              <div
                key={post?.sys?.id || Math.random()}
                className='p-6 bg-section_background border rounded-md'
              >
                <Link
                  to={
                    language === 'vi'
                      ? `/vi/blog/${post.fields?.slug}`
                      : `/en/blog/${post.fields?.slug}`
                  }
                  className='hover:underline'
                >
                  <h3 className='text-2xl font-semibold mb-2'>
                    {post.fields?.title || 'Untitled'}
                  </h3>
                </Link>
                <div className='flex items-center text-sm text-gray-500 mb-4'>
                  {authors.length > 0 ? (
                    <span className='flex items-center space-x-2'>
                      {authors.map((author, index) => {
                        const authorPhoto =
                          author.fields?.profilePhoto?.fields?.file?.url;
                        const authorSlug = author.fields?.slug;
                        const authorName = author.fields?.name;

                        return (
                          <span
                            key={author?.sys?.id || index}
                            className='flex items-center space-x-2'
                          >
                            {authorPhoto ? (
                              <img
                                src={authorPhoto}
                                alt={authorName || 'Author'}
                                className='w-6 h-6 rounded-full object-cover'
                              />
                            ) : (
                              <span className='w-6 h-6 rounded-full bg-gray-300'></span>
                            )}
                            {authorSlug ? (
                              <Link
                                to={
                                  language === 'vi'
                                    ? `/vi/luat-su/${authorSlug}`
                                    : `/en/attorneys/${authorSlug}`
                                }
                                className='text-primary font-bold uppercase hover:underline'
                              >
                                {authorName || 'Unknown'}
                              </Link>
                            ) : (
                              <span className='text-gray-500'>
                                {authorName || 'Unknown'}
                              </span>
                            )}
                            {index < authors.length - 1 && ', '}
                          </span>
                        );
                      })}
                    </span>
                  ) : null}

                  {authors.length > 0 && <span className='mx-2'>|</span>}
                  <span>
                    {new Date(post?.sys?.createdAt).toLocaleDateString() ||
                      'Unknown Date'}
                  </span>
                </div>
                <p className='mb-4'>{previewText}</p>
                <Link
                  to={
                    language === 'vi'
                      ? `/vi/blog/${post.fields?.slug}`
                      : `/en/blog/${post.fields?.slug}`
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
