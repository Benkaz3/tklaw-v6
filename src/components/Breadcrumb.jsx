import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const generatePath = (language, segments) =>
  `/${[language, ...segments].join('/')}`;

const BreadcrumbItem = React.memo(({ to, label, isLast, position }) => (
  <li
    className="flex items-center"
    itemProp="itemListElement"
    itemScope
    itemType="https://schema.org/ListItem"
  >
    {position > 1 && (
      <FiChevronRight className="mx-2 text-gray-500" aria-hidden="true" />
    )}
    {isLast ? (
      <span
        className="text-gray-700 capitalize"
        aria-current="page"
        itemProp="name"
      >
        {label}
      </span>
    ) : (
      <Link
        to={to}
        className="text-primary capitalize hover:underline"
        itemProp="item"
      >
        <span itemProp="name">{label}</span>
      </Link>
    )}
    <meta itemProp="position" content={position} />
  </li>
));

const Breadcrumb = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length < 2) return null;

  const [lang, ...rest] = parts;
  const parent = rest[0];
  if (!parent) return null;

  const items = [
    {
      to: `/${lang}`,
      label: t('global.labels.breadcrumb_labels.home') || 'Home',
      isLast: false,
      position: 1,
    },
    {
      to: generatePath(lang, [parent]),
      label:
        t(`global.labels.breadcrumb_labels.${parent}`) !==
        `global.labels.breadcrumb_labels.${parent}`
          ? t(`global.labels.breadcrumb_labels.${parent}`)
          : parent.replace(/-/g, ' '),
      isLast: true,
      position: 2,
    },
  ];

  return (
    <nav
      aria-label="breadcrumb"
      className="bg-section_background py-3"
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      <ol className="flex items-center space-x-2 text-body max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-500">
        {items.map((item) => (
          <BreadcrumbItem
            key={item.position}
            to={item.isLast ? null : item.to}
            label={item.label}
            isLast={item.isLast}
            position={item.position}
          />
        ))}
      </ol>
    </nav>
  );
};

export default React.memo(Breadcrumb);
