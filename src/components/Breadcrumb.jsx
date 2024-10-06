import { Link, useLocation } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { useLanguage } from './LanguageProvider'; // Import the language context

const Breadcrumb = ({postTitle, attorneyName}) => {
  const location = useLocation();
  const { content } = useLanguage(); // Get the content from your language provider
  const pathnames = location.pathname.split('/').filter(Boolean);

  // Don't render the breadcrumb if the user is on the homepage
  if (location.pathname === "/") {
    return null;
  }

  return (
    <nav aria-label="breadcrumb" className="bg-secondary py-3">
      <ol className="flex items-center space-x-2 text-body max-w-container-desktop mx-auto px-4 sm:px-6 lg:px-8 text-muted">
        {/* Home Link */}
        <li className="breadcrumb-item">
          <Link to="/" className="text-gray-500 text-base font-semibold  hover:underline">
            {content.global.labels.breadcrumb_labels.home} {/* Use translated label for "Home" */}
          </Link>
        </li>

        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const formattedName = name.replace(/-/g, ' ');

          // Translate each path name if necessary
          const translatedName = content.global.labels.breadcrumb_labels[formattedName] || formattedName; // Fallback to formatted name if translation is not found

          return (
            <li key={name} className="flex items-center capitalize">
              {/* Icon separator */}
              <FiChevronRight className="mx-2 text-accent" />
              {isLast ? (
                <span className="text-gray-500 text-base overflow-hidden whitespace-nowrap text-ellipsis max-w-[150px] sm:max-w-full">{postTitle || attorneyName || translatedName}</span>
              ) : (
                <Link to={routeTo} className="text-buttonBg hover:underline">
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
