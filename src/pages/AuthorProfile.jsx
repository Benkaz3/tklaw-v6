import { useParams } from 'react-router-dom';
import useContentful from '../useContentful';
import LoadingDots from '../components/LoadingDots';
import heroBg from '../assets/practices_hero_bg.webp';
import { useLanguage } from '../components/LanguageProvider';
import Breadcrumb from '../components/Breadcrumb';

const AuthorProfile = () => {
  const { slug } = useParams(); // Get the author slug from the URL
  const { language, content } = useLanguage(); // Get the current language from the LanguageProvider

  // Fetch the author details by slug and include the locale for the selected language
  const { data, loading, error } = useContentful([
    {
      content_type: 'author', // Adjust this to your Contentful content type ID
      'fields.slug': slug, // Filter by author slug
      locale: language, // Include locale based on the selected language
    },
  ]);

  // Handle loading and error states
  if (loading) {
    return <LoadingDots />;
  }

  if (error) {
    console.error(error);
    return <div className="text-red-500 text-center py-10">Error: {error.message}</div>;
  }

  const author = data.author ? data.author[0] : null;

  if (!author) {
    return <div className="text-center py-10">Author not found.</div>;
  }

  // Helper function to render a list of items or split by new lines
  const renderList = (items) => {
    if (typeof items === 'string') {
      return items.split('\n').map((item, index) => <p key={index}>{item}</p>);
    } else if (Array.isArray(items)) {
      return items.map((item, index) => <p key={index}>{item}</p>);
    }
    return <p>{items}</p>; // Fallback for non-list and non-string values
  };

  return (
    <div className="py-10 max-w-3xl mx-auto">
      {/* Hero Section */}
      <section
        className="relative h-[25vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </section>
    <Breadcrumb attorneyName={author.fields.name}/>
      <div className="max-w-4xl mx-auto p-6 bg-background z-10">
        <h1 className="text-2xl font-bold">{author.fields.name}</h1>
        <h2 className="text-xl text-gray-800 mb-4">{author.fields.title}</h2>

        <div className="mb-6">
          <h3 className="font-semibold text-lg text-gray-700 mb-2">
            {content.global.attorney_profile.areas_of_practice}
          </h3>
          <div className="text-gray-600">{renderList(author.fields.areasOfPractice)}</div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-lg text-gray-700 mb-2">
            {content.global.attorney_profile.education}
          </h3>
          <div className="text-gray-600">{renderList(author.fields.education)}</div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-lg text-gray-700 mb-2">
            {content.global.attorney_profile.work_experience}
          </h3>
          <div className="text-gray-600">{renderList(author.fields.workExperience)}</div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-lg text-gray-700 mb-2">
            {content.global.attorney_profile.introduction}
          </h3>
          <p className="text-gray-600">{author.fields.introduction}</p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-lg text-gray-700 mb-2">
            {content.global.attorney_profile.professional_associations}
          </h3>
          <div className="text-gray-600">{renderList(author.fields.profesionalAssociatations)}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthorProfile;
