import { Link, useLocation } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { useTranslation } from 'react-i18next'; // Import useTranslation from i18next

const Breadcrumb = ({ postTitle, attorneyName }) => {
  const location = useLocation();
  const { t } = useTranslation(); // Get the t function for translation
  const pathnames = location.pathname.split('/').filter(Boolean);

  // Don't render the breadcrumb if the user is on the homepage
  if (location.pathname === '/' || pathnames.length === 0) {
    return null;
  }

  // Keep track of the language path ('vi' or 'en')
  const lang = pathnames[0];

  // Filter out the language part from the pathnames for rendering
  const filteredPathnames = pathnames.slice(1); // Skip the language code

  return (
    <nav aria-label='breadcrumb' className='bg-section_background py-3'>
      <ol className='flex items-center space-x-2 text-body max-w-container-desktop mx-auto px-4 sm:px-6 lg:px-8 text-muted'>
        {/* Home Link */}
        <li className='breadcrumb-item'>
          <Link
            to={`/${lang}`} // Adjusted to include the language path
            className='text-gray-500 text-base font-semibold hover:underline'
          >
            {t('global.labels.breadcrumb_labels.home')}
            {/* Use translated label for "Home" */}
          </Link>
        </li>

        {/* Display the breadcrumb */}
        {filteredPathnames.length > 0 &&
          filteredPathnames.map((name, index) => {
            const routeTo = `/${[lang, ...pathnames.slice(1, index + 2)].join(
              '/'
            )}`; // Include the language path in the breadcrumb links
            const isLast = index === filteredPathnames.length - 1;

            // Don't replace hyphens, use the original name
            const translatedName =
              t(`global.labels.breadcrumb_labels.${name}`) || name; // Fallback to the original name if translation is not found

            return (
              <li key={name} className='flex items-center capitalize'>
                {/* Icon separator */}
                <FiChevronRight className='mx-2 text-grey-500' />
                {isLast ? (
                  <span className='text-gray-500 text-base overflow-hidden whitespace-nowrap text-ellipsis max-w-[150px] sm:max-w-full'>
                    {postTitle || attorneyName || translatedName}
                  </span>
                ) : (
                  <Link to={routeTo} className='text-buttonBg hover:underline'>
                    {translatedName}
                  </Link>
                )}
              </li>
            );
          })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
