import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const generatePath = (language, segments) => {
  return `/${[language, ...segments].join('/')}`;
};

const BreadcrumbItem = React.memo(({ to, label, isLast, position }) => {
  return (
    <li
      className="flex items-center"
      itemProp="itemListElement"
      itemScope
      itemType="https://schema.org/ListItem"
    >
      <FiChevronRight className="mx-2 text-gray-500" aria-hidden="true" />
      {isLast ? (
        <span
          className="text-gray-700 text-base capitalize"
          aria-current="page"
          itemProp="name"
        >
          {label}
        </span>
      ) : (
        <Link
          to={to}
          className="text-primary text-base capitalize hover:underline"
          itemProp="item"
        >
          <span itemProp="name">{label}</span>
        </Link>
      )}
      <meta itemProp="position" content={position} />
    </li>
  );
});

const Breadcrumb = ({ postTitle, attorneyName }) => {
  const location = useLocation();
  const { t } = useTranslation();
  
  const pathnames = useMemo(() => location.pathname.split('/').filter(Boolean), [location.pathname]);

  if (location.pathname === '/' || pathnames.length === 0) {
    return null;
  }

  const lang = pathnames[0] || 'en';

  const filteredPathnames = pathnames.slice(1); 

  const breadcrumbItems = useMemo(() => {
    const items = [
      {
        to: `/${lang}`,
        label: t('global.labels.breadcrumb_labels.home') || 'Home',
        position: 1,
      },
    ];

    filteredPathnames.forEach((name, index) => {
      const routeTo = generatePath(lang, pathnames.slice(1, index + 2));

      let labelKey = `global.labels.breadcrumb_labels.${name}`;
      let label = t(labelKey);
      if (label === labelKey || !label) {
        label = name.replace(/-/g, ' ');
      }
      if (index === filteredPathnames.length - 1) {
        label = postTitle || attorneyName || label;
      }

      items.push({
        to: index === filteredPathnames.length - 1 ? null : routeTo,
        label,
        isLast: index === filteredPathnames.length - 1,
        position: items.length + 1,
      });
    });

    return items;
  }, [filteredPathnames, lang, t, pathnames, postTitle, attorneyName]);

  return (
    <nav
      aria-label="breadcrumb"
      className="bg-section_background py-3"
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      <ol className="flex items-center space-x-2 text-body max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-500">
        {breadcrumbItems.map((item, index) => (
          <BreadcrumbItem
            key={index}
            to={item.to}
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