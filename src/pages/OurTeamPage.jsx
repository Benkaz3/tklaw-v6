import useContentful from '../useContentful';
import LoadingDots from '../components/LoadingDots';
import heroBg from '../assets/practices_hero_bg.webp';
import { Link } from 'react-router-dom';

const OurTeamPage = () => {
  // Fetch all authors from Contentful
  const { data, loading, error } = useContentful([
    {
      content_type: 'author', // Replace with your actual content type ID for authors
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

  const authors = data.author || [];

  return (
    <div className="container mx-auto lg:px-8">
      {/* Hero Section */}
      <section
        className="relative h-[25vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h1 className="relative text-white text-3xl font-bold z-10">Our Team</h1>
      </section>

      {/* Team Section */}
      <div className="py-10 max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Meet Our Attorneys</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {authors.map((author) => (
            <div key={author.sys.id} className="bg-white p-6 rounded-lg flex items-center">
              {/* Photo (Left) */}
              <div className="flex-shrink-0 mr-4">
                <img
                  src={author.fields.profilePhoto?.fields?.file?.url || 'path-to-placeholder-image'} // Use correct path for the image
                  alt={author.fields.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>

              {/* Name, Title, View Profile (Right) */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-1">{author.fields.name}</h3>
                <p className="text-gray-700 mb-2">{author.fields.title}</p>
                <Link
                  to={`/attorneys/${author.fields.slug}`}
                  className="text-blue-600 hover:underline"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurTeamPage;
