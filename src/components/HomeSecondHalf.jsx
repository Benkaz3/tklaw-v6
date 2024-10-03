import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageProvider';

function HomeSecondHalf({ isHomepage }) { // Accepting a prop to determine if it is the homepage
  const { content } = useLanguage();

  return (
    <div id="home-second-half" className="py-16 px-4 lg:px-12">
      <div className="flex flex-col items-start">
        {/* Divider above News & Insights */}
        <div className={`w-full border-t ${isHomepage ? 'border-gray-300' : 'border-black'} mb-6`}></div>

        {/* News & Insights Section */}
        <Link to="/news" className="w-full text-left">
          <h2 className={`text-2xl ${isHomepage ? 'text-white' : 'text-black'} uppercase hover:text-linkActive`}>
            {content.global.labels.news_label}
          </h2>
        </Link>

        {/* Divider below News & Insights */}
        <div className={`w-full border-t ${isHomepage ? 'border-gray-300' : 'border-black'} my-6`}></div>

        {/* Blog Section */}
        <Link to="/blog" className="w-full text-left">
          <h2 className={`text-2xl ${isHomepage ? 'text-white' : 'text-black'} mb-12 uppercase hover:text-linkActive`}>
            {content.global.labels.blog_label}
          </h2>
        </Link>
      </div>
    </div>
  );
}

export default HomeSecondHalf;
