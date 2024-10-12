import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const NotFoundPage = () => {
  const { t } = useTranslation(); // Initialize i18n translation

  return (
    <div className='flex flex-col items-center justify-center h-screen text-center bg-gray-100'>
      <h1 className='text-6xl font-bold text-red-600'>404</h1>
      <h2 className='text-3xl mt-4'>{t('not_found_page.title')}</h2>{' '}
      {/* Use i18n for translation */}
      <Link to='/' className='mt-4 text-blue-500 hover:underline'>
        {t('not_found_page.link_text')} {/* Translated link text */}
      </Link>
    </div>
  );
};

export default NotFoundPage;
