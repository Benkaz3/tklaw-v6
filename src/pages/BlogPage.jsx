import useContentful from '../useContentful';
import Breadcrumb from '../components/Breadcrumb';
import heroBg from '../assets/practices_hero_bg.webp';
import { useLanguage } from '../components/LanguageProvider';
import { Link } from 'react-router-dom';


// Utility function to convert Rich Text to string recursively
const convertRichTextToString = (richTextNode) => {
  if (!richTextNode || !Array.isArray(richTextNode.content)) return '';

  return richTextNode.content.map((node) => {
    switch (node.nodeType) {
      case 'paragraph':
        // Recursively extract content from paragraph nodes
        return convertRichTextToString(node);
      case 'text':
        // Handle plain text nodes
        return node.value;
      case 'hyperlink':
        // Extract the text from the hyperlink and append it
        return node.content.map((linkNode) => linkNode.value).join('');
      default:
        return ''; // Return empty string for unsupported node types
    }
  }).join(''); // Join the array of strings into a single string
};


const BlogPage = () => {

  const { content } = useLanguage()

  const { data, loading, error } = useContentful([
    {
      content_type: 'blogPage',
      order: '-sys.createdAt',
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

  const blogPosts = data.blogPage || [];

  return (
    <div className="container mx-auto">
       {/* Hero Section */}
      <section
        className="relative h-[20vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 max-w-4xl text-center text-white">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Blog</h1>
        </div>
      </section>

      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Top Section */}
      <div className="text-center my-10">
        <h1 className="text-3xl font-bold">Truyền Thông</h1>
        <p className="text-lg mt-1">
          Liên hệ báo chí tại: <a href={`mailto:${content.global.email}`} className="text-blue-600 hover:underline">{content.global.email}</a>
        </p>
      </div>

     

      {/* Blog Posts Section */}
      <div className="space-y-8">
        {blogPosts.map((post) => {
          // Check the body content
          const bodyText = convertRichTextToString(post.fields.body);
          const previewText = bodyText.length > 300 ? bodyText.substring(0, 300) + '...' : bodyText;

          return (
            <div key={post.sys.id} className="p-6">
              <h2 className="text-2xl font-semibold mb-2">{post.fields.title}</h2>
              <p className="text-sm text-gray-500 mb-4">{new Date(post.sys.createdAt).toLocaleDateString()}</p> {/* Date Published */}
              <p className="mb-4">{previewText}</p> {/* Display the preview text */}
              <Link to={`/blog/${post.fields.slug}`} className="flex items-center text-blue-600 hover:underline">
                <span className="mr-1 text-sm">Read More</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M10.293 15.293a1 1 0 001.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 00-1.414 1.414L14.586 10H3a1 1 0 100 2h11.586l-4.293 4.293a1 1 0 000 1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlogPage;
