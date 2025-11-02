// src/pages/PoliciesPage.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import useContentful from '../useContentful';
import LoadingDots from '../components/LoadingDots';
import Breadcrumb from '../components/Breadcrumb';
import generateMetaTags from '../seo/generateMetaTags';
import useSeo from '../seo/useSeo';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';

// Replace with your Content Type ID (Copy ID in Contentful)
const CONTENT_TYPE_ID = 'policiesPage';

// Tailwind mapping for Rich Text
const RICHTEXT_OPTIONS = {
  renderNode: {
    [BLOCKS.HEADING_1]: (_node, children) => (
      <h1 className='text-3xl sm:text-4xl font-bold mt-6 mb-4'>{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (_node, children) => (
      <h2 className='text-2xl sm:text-3xl font-semibold mt-6 mb-3'>
        {children}
      </h2>
    ),
    [BLOCKS.HEADING_3]: (_node, children) => (
      <h3 className='text-xl sm:text-2xl font-semibold mt-5 mb-2'>
        {children}
      </h3>
    ),
    [BLOCKS.PARAGRAPH]: (_node, children) => (
      <p className='leading-relaxed my-3'>{children}</p>
    ),
    [BLOCKS.UL_LIST]: (_node, children) => (
      <ul className='list-disc ml-6 space-y-1 my-3'>{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_node, children) => (
      <ol className='list-decimal ml-6 space-y-1 my-3'>{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (_node, children) => <li>{children}</li>,
    [INLINES.HYPERLINK]: (node, children) => (
      <a
        href={node.data.uri}
        className='underline hover:no-underline break-words'
        rel='noopener noreferrer'
        target='_blank'
      >
        {children}
      </a>
    ),
  },
};

const PoliciesPage = () => {
  const seo = useSeo('PolicyPage');
  const metaTags = generateMetaTags(seo);
  const { t, i18n } = useTranslation();

  // Your locales are 'vi' and 'en'
  const locale = i18n.language === 'vi' ? 'vi' : 'en';
  const slug = locale === 'vi' ? 'chinh-sach' : 'policies';

  const { data, loading, error } = useContentful([
    {
      content_type: CONTENT_TYPE_ID,
      'fields.slug': slug,
      locale,
    },
  ]);

  if (loading) return <LoadingDots />;

  if (error) {
    return (
      <main className='px-4 sm:px-6 lg:px-8 py-10 text-center'>
        <p className='text-red-500'>
          {(t('global.error_message') || 'Error') + ': '}
          {error.message}
        </p>
      </main>
    );
  }

  // Support either shape returned by your hook
  const entry = data?.[CONTENT_TYPE_ID]?.[0] || data?.items?.[0] || null;
  if (!entry?.fields) {
    return (
      <main className='px-4 sm:px-6 lg:px-8 py-10 text-center'>
        <p className='text-gray-700'>
          {t('global.policy_not_found') || 'Policy not found'}
        </p>
      </main>
    );
  }

  const { title, body } = entry.fields;
  const updated = entry.sys?.updatedAt;

  return (
    <main className='px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto'>
      <Helmet>
        <title>{seo?.Title || title}</title>
        {Array.isArray(metaTags) &&
          metaTags.map((m, i) =>
            m && typeof m === 'object' ? <meta key={i} {...m} /> : null
          )}
        {seo?.ogUrl && <link rel='canonical' href={seo.ogUrl} />}
      </Helmet>

      {/* Reuse your Breadcrumb prop to avoid refactoring now */}
      <Breadcrumb attorneyName={title} />

      <article
        className='bg-white border border-gray-200 rounded-lg shadow'
        itemScope
        itemType='https://schema.org/WebPage'
      >
        <header className='px-6 pt-8 pb-2'>
          <h1
            className='font-bold text-3xl sm:text-4xl leading-snug'
            itemProp='name'
          >
            {title}
          </h1>

          {updated && (
            <div className='text-gray-500 text-sm mt-2'>
              <time dateTime={new Date(updated).toISOString()}>
                {new Date(updated).toLocaleDateString()}
              </time>
            </div>
          )}
        </header>

        <div className='px-6 pb-8 prose max-w-none'>
          {body ? documentToReactComponents(body, RICHTEXT_OPTIONS) : null}
        </div>
      </article>
    </main>
  );
};

export default PoliciesPage;
