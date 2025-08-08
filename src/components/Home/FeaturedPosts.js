import { sortBlogs } from "@/src/utils";
import React from "react";
import BlogLayoutOne from "../Blog/BlogLayoutOne";
import BlogLayoutTwo from "../Blog/BlogLayoutTwo";

const FeaturedPosts = ({ blogs }) => {
  // Safety check and sorting
  let sortedBlogs = [];
  try {
    if (blogs && Array.isArray(blogs)) {
      sortedBlogs = sortBlogs(blogs);
    }
  } catch (error) {
    console.warn('Error sorting blogs:', error);
    // Fallback sorting if sortBlogs fails
    if (blogs && Array.isArray(blogs)) {
      sortedBlogs = blogs
        .filter(blog => blog && blog.isPublished)
        .sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0));
    }
  }

  // Ensure we have enough blogs for the layout
  if (!sortedBlogs || sortedBlogs.length < 3) {
    return (
      <section className="w-full p-5 xs:p-10 sm:p-12 md:p-16 lg:p-20 border-b-2 border-solid border-dark dark:border-light text-dark dark:text-light">
        <h2 className="font-bold text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl capitalize mb-6">
          Featured Posts
        </h2>
        <p className="font-medium text-lg xs:text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl">
          No featured posts available at the moment. Check back soon for latest insights!
        </p>
      </section>
    );
  }

  return (
    <section className="w-full p-5 xs:p-10 sm:p-12 md:p-16 lg:p-20 border-b-2 border-solid border-dark dark:border-light text-dark dark:text-light">
      {/* Section Header */}
      <div className="mb-12">
        <h2 className="font-bold text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl capitalize mb-6">
          Featured Posts
        </h2>
        <p className="font-medium text-lg xs:text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl">
          Dive into my latest insights on Android development, hardware programming, and innovative tech solutions.
        </p>

        {/* Blog Statistics */}
        <div className="flex items-center gap-6 mt-6 text-sm text-gray-500 dark:text-gray-500">
          <span>{Math.min(sortedBlogs.length, 3)} Featured {Math.min(sortedBlogs.length, 3) === 1 ? 'Article' : 'Articles'}</span>
          <span>•</span>
          <span>Latest Updates</span>
          <span>•</span>
          <span>Handpicked Content</span>
        </div>
      </div>

      {/* Featured Posts Grid - Your original layout */}
      <div className="grid grid-cols-2 grid-rows-2 gap-6 mt-10 sm:mt-16">
        {/* Main Featured Post - Large (BlogLayoutOne) */}
        <article className="col-span-2 sxl:col-span-1 row-span-2 relative">
          {sortedBlogs[0] && <BlogLayoutOne blog={sortedBlogs[0]} />}
        </article>
        
        {/* Secondary Featured Posts - Smaller (BlogLayoutTwo) */}
        <article className="col-span-2 sm:col-span-1 row-span-1 relative">
          {sortedBlogs[1] && <BlogLayoutTwo blog={sortedBlogs[1]} />}
        </article>
        
        <article className="col-span-2 sm:col-span-1 row-span-1 relative">
          {sortedBlogs[2] && <BlogLayoutTwo blog={sortedBlogs[2]} />}
        </article>
      </div>

      {/* View All Posts Button */}
      <div className="text-center mt-12">
        <a 
          href="/categories/all" 
          className="inline-block border-2 border-solid border-dark dark:border-light px-8 py-3 rounded hover:bg-dark hover:text-light dark:hover:bg-light dark:hover:text-dark transition-all duration-200 font-medium"
        >
          View All Posts →
        </a>
      </div>
    </section>
  );
};

export default FeaturedPosts;