import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useContentful from '../useContentful';
import LoadingDots from '../components/LoadingDots';

const CategoryPage = () => {
  const { categorySlug } = useParams(); // Get the slug from URL params
  const [categoryData, setCategoryData] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching category data based on the slug
  const {
    data: categoryDataResult,
    loading: categoryLoading,
    error: categoryError,
  } = useContentful([
    {
      content_type: 'category',
      'fields.slug': categorySlug,
      locale: 'en',
    },
  ]);

  // Fetch blog posts that are linked to the category using the "categories" reference field
  const {
    data: blogPostsData,
    loading: blogLoading,
    error: blogError,
  } = useContentful([
    {
      content_type: 'blogPage',
      'fields.categories.sys.id[in]': categoryData?.sys.id, // Using the "in" operator to check if the category ID is part of the categories array
      locale: 'en',
    },
  ]);

  useEffect(() => {
    if (
      categoryDataResult &&
      Array.isArray(categoryDataResult.category) &&
      categoryDataResult.category.length > 0
    ) {
      setCategoryData(categoryDataResult.category[0]); // Set the category
      console.log('Category ID:', categoryDataResult.category[0].sys.id); // Log category ID
    }
    if (categoryError) {
      setError(categoryError);
    }
  }, [categoryDataResult, categoryError]);

  useEffect(() => {
    if (blogPostsData) {
      console.log('Blog Posts Data:', blogPostsData); // Log blog posts data
      blogPostsData.blogPage.forEach((post) => {
        console.log('Categories for Post:', post.fields.categories); // Log categories for each post
      });
    }
    if (blogPostsData && Array.isArray(blogPostsData.blogPage)) {
      setBlogPosts(blogPostsData.blogPage); // Set the blog posts
      setLoading(false);
    }
    if (blogError) {
      setError(blogError);
    }
  }, [blogPostsData, blogError]);

  if (categoryLoading || blogLoading || loading) {
    return (
      <div className='flex bg-background items-center justify-center h-screen text-center py-10'>
        <LoadingDots />
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-red-500 text-center py-10'>
        Error loading category or blog posts: {error.message}
      </div>
    );
  }

  if (!categoryData) {
    return <div className='text-center py-10'>No category found</div>;
  }

  return (
    <div className='container mx-auto mt-32'>
      <h1 className='text-4xl font-bold mb-8'>
        Category: {categoryData.fields.name}
      </h1>
      <div className='space-y-8'>
        {blogPosts.length > 0 ? (
          blogPosts.map((post) => (
            <div key={post.sys.id} className='p-6 border-b border-gray-300'>
              <h2 className='text-2xl font-semibold mb-2'>
                {post.fields.title}
              </h2>
              <p>
                {post.fields.body?.content?.[0]?.content?.[0]?.value ||
                  'No content available'}
              </p>
              <a
                href={`/blog/${post.fields.slug}`}
                className='text-blue-500 hover:underline'
              >
                Read more
              </a>
            </div>
          ))
        ) : (
          <div>No blog posts found for this category.</div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
