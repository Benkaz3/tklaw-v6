import { useParams } from 'react-router-dom';
import useContentful from '../useContentful';
import Breadcrumb from '../components/Breadcrumb';
import heroBg from '../assets/practices_hero_bg.png';
import { useLanguage } from '../components/LanguageProvider';

// Utility function to convert Rich Text to JSX recursively
const renderRichText = (richTextNode) => {
  if (!richTextNode || !Array.isArray(richTextNode.content)) return '';

  return richTextNode.content.map((node, index) => {
    switch (node.nodeType) {
      case 'paragraph':
        return <p key={index} className="mb-4 leading-relaxed text-gray-800">{renderRichText(node)}</p>;
      case 'text':
        return node.value;
      case 'hyperlink':
        return (
          <a key={index} href={node.data.uri} className="text-blue-600 hover:underline">
            {node.content.map((linkNode) => linkNode.value).join('')}
          </a>
        );
      default:
        return null;
    }
  });
};

const BlogPost = () => {
  const { content } = useLanguage();
  const { id } = useParams(); // Get the blog post ID from the URL

  // Fetch the individual blog post by ID
  const { data, loading, error } = useContentful([
    {
      content_type: 'blogPage',
      'sys.id': id, // Filter by post ID
    },
  ]);

  // Handle loading and error states
  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    console.error(error);
    return <div className="text-red-500 text-center py-10">Error: {error.message}</div>;
  }

  const post = data.blogPage ? data.blogPage[0] : null;

  if (!post) {
    return <div className="text-center py-10">Post not found.</div>;
  }

  return (
    <div className="container mx-auto lg:px-8">
      {/* Hero Section */}
      <section
        className="relative h-[30vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        
      </section>

      {/* Breadcrumb */}
     
        <Breadcrumb />
      

      {/* Post Content */}
      <div className="py-10 max-w-3xl px-4 mx-auto">
        <div className="relative z-10 max-w-4xl text-start text-white mb-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">{post.fields.title}</h1>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          {new Date(post.sys.createdAt).toLocaleDateString()} {/* Date Published */}
        </p>
        <div className="mb-8 text-lg leading-relaxed text-gray-800">
          {renderRichText(post.fields.body)} {/* Render Rich Text content */}
        </div>

        <p className="text-lg mt-4">
          Liên hệ báo chí tại:{' '}
          <a href={`mailto:${content.global.email}`} className="text-blue-600 hover:underline">
            {content.global.email}
          </a>
        </p>
      </div>
    </div>
  );
};

export default BlogPost;
