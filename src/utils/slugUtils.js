// Utility function to generate a URL-friendly slug from a given string (e.g., title)
export const generateSlug = (title) => {
  return title
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/-+/g, "-") // Replace multiple dashes with a single dash
    .trim(); // Remove leading/trailing spaces
};

// Function to create a slug from a Contentful blog post title
export const createSlugFromPost = (post) => {
  if (!post || !post.fields || !post.fields.title) {
    throw new Error("Invalid post object");
  }
  return generateSlug(post.fields.title);
};
