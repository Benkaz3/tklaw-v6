import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageProvider';

const NotFoundPage = () => {
  const { content } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <h2 className="text-3xl mt-4">{content.not_found_page.title}</h2>
      <p className="mt-2">{content.not_found_page.description}</p>
      <Link to="/" className="mt-4 text-blue-500 hover:underline">
        {content.not_found_page.link_text}
      </Link>
    </div>
  );
};

export default NotFoundPage;
