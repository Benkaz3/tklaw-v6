import React, { useMemo } from 'react';
import useContentful from '../useContentful';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LoadingDots from './LoadingDots';

// Helper function to convert rich text to string
const convertRichTextToString = (richTextNode) => {
  if (!richTextNode?.content?.length) return '';

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
    .join(' ');
};

// Helper function to generate localized paths
const generatePath = (language, type, slug) => {
  const basePath = language === 'vi' ? `/vi` : `/en`;
  switch (type) {
    case 'blog':
      return `${basePath}/blog/${slug}`;
    case 'attorney':
      return language === 'vi' ? `${basePath}/luat-su/${slug}` : `${basePath}/attorneys/${slug}`;
    default:
      return '#';
  }
};

// BlogPost Component
const BlogPost = React.memo(({ post, language, previewLength }) => {
  const { t } = useTranslation();
  const { fields, sys } = post;
  const bodyText = convertRichTextToString(fields.body);
  const previewText = bodyText.length > previewLength ? `${bodyText.substring(0, previewLength)}...` : bodyText;

  const authors = useMemo(() => {
    if (Array.isArray(fields.author)) {
      return fields.author.filter((author) => author?.fields);
    }
    return [];
  }, [fields.author]);

  const formattedDate = useMemo(() => {
    const date = new Date(sys?.createdAt);
    return isNaN(date) ? t('global.unknown_date') : new Intl.DateTimeFormat(language, { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
  }, [sys?.createdAt, language, t]);

  return (
    <div className="p-6 bg-section_background border rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
      <Link to={generatePath(language, 'blog', fields?.slug)} className="hover:underline">
        <h4 className="font-semibold mb-2 text-primary">{fields?.title || t('global.untitled')}</h4>
      </Link>
      <div className="flex flex-wrap items-center text-gray-500 mb-4">
        {authors.length > 0 && (
          <>
            <span className="flex items-center space-x-2">
              {authors.map((author, index) => {
                const { profilePhoto, slug, name, sys: authorSys } = author.fields || {};
                const authorPhoto = profilePhoto?.fields?.file?.url;
                return (
                  <span key={authorSys?.id || index} className="flex items-center space-x-1">
                    {authorPhoto ? (
                      <img
                        src={authorPhoto}
                        alt={name || t('global.unknown_author')}
                        className="w-6 h-6 rounded-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <span className="w-6 h-6 rounded-full bg-gray-300" aria-hidden="true"></span>
                    )}
                    {slug ? (
                      <Link
                        to={generatePath(language, 'attorney', slug)}
                        className="text-gray-500 font-bold uppercase hover:underline"
                      >
                        <span className='text-sm'>{name || t('global.unknown_author')}</span>
                      </Link>
                    ) : (
                      <span className="text-gray-500">{name || t('global.unknown_author')}</span>
                    )}
                    {index < authors.length - 1 && <span>,</span>}
                  </span>
                );
              })}
            </span>
            <span className="mx-2">|</span>
          </>
        )}
        <span>{formattedDate}</span>
      </div>
      <p className="mb-4 text-gray-700">{previewText}</p>
      <Link to={generatePath(language, 'blog', fields?.slug)} className="flex items-center text-primary hover:underline">
        <p className="mr-1">{t('global.labels.read_more')}</p>
      </Link>
    </div>
  );
});

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
      <div className="flex bg-background items-center justify-center min-h-screen text-center py-10">
        <LoadingDots />
      </div>
    );
  }

  if (error) {
    console.error(error);
    return (
      <div className="text-red-500 text-center py-10">
        {t('global.errors.load_error', { message: error.message })}
      </div>
    );
  }

  const blogPosts = data?.blogPage || [];

  if (blogPosts.length === 0) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-primary text-start font-bold leading-tight mb-6 text-text">
            {t('homepage.blog_section.title')}
          </h2>
          <div className="text-center text-gray-500">{t('homepage.blog_section.no_posts')}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="font-primary text-start font-bold leading-tight mb-6 text-text">
          {t('homepage.blog_section.title')}
        </h2>
        <div className="space-y-8">
          {blogPosts.map((post) => (
            <BlogPost key={post.sys.id} post={post} language={language} previewLength={300} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;