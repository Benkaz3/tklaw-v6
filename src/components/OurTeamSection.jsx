import useContentful from '../useContentful';
import LoadingDots from './LoadingDots';
import { Link } from 'react-router-dom';

const OurTeamSection = () => {
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
      {/* Team Section */}
      <div className="bg-background py-10 max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Meet Our Attorneys</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {authors.map((author) => (
            <div key={author.sys.id} className="flex items-center">
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

export default OurTeamSection;
