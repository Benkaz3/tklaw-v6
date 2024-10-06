import { useParams } from 'react-router-dom';
import useContentful from '../useContentful';
import LoadingDots from '../components/LoadingDots';
import heroBg from '../assets/practices_hero_bg.webp';

const Author = () => {
  const { authorId } = useParams(); // Get the author ID from the URL

  // Fetch the author details by ID
  const { data, loading, error } = useContentful([
    {
      content_type: 'author', // Adjust this to your Contentful content type ID
      'sys.id': authorId, // Filter by author ID
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
      

<div className="max-w-4xl mx-auto p-6 bg-background  z-10">
  
  <h1 className=" text-2xl font-bold">
    {author.fields.name}
  </h1>
  <h2 className="text-xl text-gray-800 mb-4">
    {author.fields.title}
  </h2>
  
  <div className="mb-6">
    <h3 className="font-semibold text-lg text-gray-700 mb-2">
      Areas of Practice:
    </h3>
    <p className="text-gray-600">{author.fields.areasOfPractice}</p>
  </div>

  <div className="mb-6">
    <h3 className="font-semibold text-lg text-gray-700 mb-2">
      Education:
    </h3>
    <p className="text-gray-600">{author.fields.education}</p>
  </div>

  <div className="mb-6">
    <h3 className="font-semibold text-lg text-gray-700 mb-2">
      Work Experience:
    </h3>
    <p className="text-gray-600">{author.fields.workExperience}</p>
  </div>

  <div className="mb-6">
    <h3 className="font-semibold text-lg text-gray-700 mb-2">
      Introduction:
    </h3>
    <p className="text-gray-600">{author.fields.introduction}</p>
  </div>

  <div className="mb-6">
    <h3 className="font-semibold text-lg text-gray-700 mb-2">
      Professional Associations:
    </h3>
    <p className="text-gray-600">{author.fields.profesionalAssociatations}</p>
  </div>
</div>

    </div>
  );
};

export default Author;
