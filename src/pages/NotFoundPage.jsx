import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();

  const title = t('not_found_page.title');
  const linkText = t('not_found_page.link_text');

  if (!title || !linkText) return null;

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <h2 className="text-3xl mt-4">{title}</h2>
      <Link to="/" className="mt-4 text-blue-500 hover:underline">
        {linkText}
      </Link>
    </div>
  );
};

export default NotFoundPage;