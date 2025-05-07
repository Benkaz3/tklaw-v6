import React from 'react';
import { Helmet } from 'react-helmet-async';
import useSeo from '../seo/useSeo';
import generateMetaTags from '../seo/generateMetaTags';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useContentful from '../useContentful';
import LoadingDots from '../components/LoadingDots';
import Breadcrumb from '../components/Breadcrumb';
import heroBg from '../assets/practices_hero_bg.webp';
import imgPlaceholder from '../assets/img_placeholder.svg';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';

const renderOptions = {
  renderMark: {
    [MARKS.BOLD]: (text) => <strong>{text}</strong>,
    [MARKS.ITALIC]: (text) => <em>{text}</em>,
    [MARKS.UNDERLINE]: (text) => <u>{text}</u>,
    [MARKS.CODE]: (text) => (
      <code className='bg-gray-100 p-1 rounded font-mono'>{text}</code>
    ),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node, children) => (
      <p className='mb-4 leading-relaxed'>{children}</p>
    ),
    [BLOCKS.HEADING_2]: (_node, children) => (
      <h2 className='font-semibold mb-4'>{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_node, children) => (
      <h3 className='font-semibold mb-3'>{children}</h3>
    ),
    [BLOCKS.UL_LIST]: (_node, children) => (
      <ul className='list-disc list-inside mb-4 space-y-2'>{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_node, children) => (
      <ol className='list-decimal list-inside mb-4 space-y-2'>{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (_node, children) => {
      const first = React.Children.toArray(children)[0];
      const content =
        React.isValidElement(first) && first.props.children
          ? first.props.children
          : children;
      return <li className='ml-5'>{content}</li>;
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
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { title, file } = node.data.target.fields || {};
      if (!file?.url) return null;
      return (
        <figure className='mb-6'>
          <img
            src={file.url}
            alt={title || ''}
            className='w-full h-auto rounded'
          />
          {title && (
            <figcaption className='text-center text-gray-500 mt-2'>
              {title}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

const BlogPost = () => {
  const seo = useSeo('BlogPost');
  const metaTags = generateMetaTags(seo);
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const { slug } = useParams();
  const { data, loading, error } = useContentful([
    { content_type: 'blogPage', 'fields.slug': slug, locale: language },
  ]);

  if (loading) return <LoadingDots />;

  if (error) {
    return (
      <main className='py-10 text-center'>
        <p className='text-red-500'>Error: {error.message}</p>
      </main>
    );
  }

  const entry = data?.blogPage?.[0];
  const post = entry?.fields;

  if (!post) {
    return (
      <main className='py-10 text-center'>
        <p>{t('global.labels.post_not_found')}</p>
      </main>
    );
  }

  const { title, body, author } = post;
  const date = entry.sys.createdAt;
  const authors = Array.isArray(author) ? author.filter((a) => a?.fields) : [];

  return (
    <>
      <Helmet>
        <title>{seo.Title}</title>
        <link rel='canonical' href={seo.ogUrl} />
        {metaTags.map((tag, i) =>
          tag.name ? (
            <meta key={i} name={tag.name} content={tag.content} />
          ) : (
            <meta key={i} property={tag.property} content={tag.content} />
          )
        )}
      </Helmet>

      <main className='px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto py-10'>
        <section
          className='relative w-full h-56 sm:h-64 md:h-72 lg:h-80 bg-cover bg-center'
          style={{ backgroundImage: `url(${heroBg})` }}
          aria-label={t('practice_details_page.hero_background')}
        >
          <div className='absolute inset-0 bg-black opacity-40' />
        </section>

        <Breadcrumb postTitle={title} />

        <article>
          <header className='text-center sm:text-left my-8'>
            <h1 className='font-semibold mb-2'>{title}</h1>
            {date && (
              <time
                dateTime={new Date(date).toISOString()}
                className='text-gray-500 text-sm'
              >
                {new Date(date).toLocaleDateString()}
              </time>
            )}
          </header>

          <section className='prose'>
            {body ? (
              documentToReactComponents(body, renderOptions)
            ) : (
              <p>Content unavailable.</p>
            )}
          </section>

          {authors.length === 1 &&
            (() => {
              const { fields } = authors[0];
              const {
                name,
                title: authorTitle,
                introduction,
                slug: authorSlug,
                profilePhoto,
              } = fields;
              const photoUrl =
                profilePhoto?.fields?.file?.url || imgPlaceholder;

              return (
                <aside className='flex flex-col sm:flex-row items-center bg-card_background rounded-lg shadow p-6'>
                  <figure className='w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-4 sm:mb-0'>
                    <img
                      src={photoUrl}
                      alt={name}
                      className='w-full h-full object-cover'
                    />
                  </figure>
                  <div className='sm:ml-6 text-center sm:text-left'>
                    <p className='font-semibold'>{name}</p>
                    <p className='text-gray-600 italic mb-4'>{authorTitle}</p>
                    <p className='text-gray-700 leading-relaxed mb-4'>
                      {introduction}
                    </p>
                    <Link
                      to={
                        language === 'vi'
                          ? `/vi/luat-su/${authorSlug}`
                          : `/en/attorneys/${authorSlug}`
                      }
                      className='underline-animation text-primary font-medium'
                    >
                      {t('practice_details_page.view_profile')}
                    </Link>
                  </div>
                </aside>
              );
            })()}
        </article>
      </main>
    </>
  );
};

export default BlogPost;
