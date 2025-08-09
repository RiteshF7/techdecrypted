import { sortBlogs } from "@/src/utils";
import React from "react";
import { BlogLayoutOne, BlogLayoutThree, BlogLayoutTwo } from "../Blog/BlogLayoutsAll";

// Decorative icons
const SparkleIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L13.09 8.26L19 7L13.09 15.74L12 22L10.91 15.74L5 17L10.91 8.26L12 2Z" 
          fill="currentColor" opacity="0.6"/>
  </svg>
);

const FeaturedPosts = ({ blogs, maxPosts = 6 }) => {
  // Safety check and sorting
  let sortedBlogs = [];
  try {
    if (blogs && Array.isArray(blogs)) {
      sortedBlogs = sortBlogs(blogs);
      // Ensure we don't exceed the maxPosts limit
      if (sortedBlogs.length > maxPosts) {
        sortedBlogs = sortedBlogs.slice(0, maxPosts);
      }
    }
  } catch (error) {
    console.warn('Error sorting blogs:', error);
    // Fallback sorting if sortBlogs fails
    if (blogs && Array.isArray(blogs)) {
      sortedBlogs = blogs
        .filter(blog => blog && blog.isPublished)
        .sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0))
        .slice(0, maxPosts); // Apply maxPosts limit here too
    }
  }

  // Ensure we have enough blogs for the layout
  if (!sortedBlogs || sortedBlogs.length < 1) {
    return (
      <section className="relative w-full overflow-hidden">
        {/* Enhanced background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-purple-900/30 to-slate-900/50 dark:from-black/50 dark:via-purple-950/30 dark:to-black/50"></div>
        
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 p-5 xs:p-10 sm:p-12 md:p-16 lg:p-20 text-dark dark:text-light">
          <div className="bg-white/10 dark:bg-black/20 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl p-8 sm:p-12 text-center">
            <h2 className="font-bold text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl capitalize mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Featured Posts
            </h2>
            <p className="font-medium text-lg xs:text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              No featured posts available at the moment. Check back soon for latest insights!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full overflow-hidden">
      {/* Enhanced background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-purple-900/30 to-slate-900/50 dark:from-black/50 dark:via-purple-950/30 dark:to-black/50"></div>
      
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px] opacity-30"></div>
      </div>

      <div className="relative z-10 p-5 xs:p-10 sm:p-12 md:p-16 lg:p-20 text-dark dark:text-light">
        
        {/* Enhanced Section Header */}
        <div className="mb-16">
          <div className="bg-white/10 dark:bg-black/20 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl p-8 sm:p-12">
            {/* Decorative top element */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full p-0.5">
                <div className="w-full h-full bg-white/10 dark:bg-black/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <SparkleIcon className="w-6 h-6 text-purple-400 animate-pulse" />
                </div>
              </div>
            </div>

            <h2 className="font-bold text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl capitalize mb-6 text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Featured Posts
            </h2>
            <p className="font-medium text-lg xs:text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto text-center leading-relaxed">
              Dive into my latest insights on Android development, hardware programming, and innovative tech solutions.
            </p>

            {/* Enhanced Blog Statistics */}
            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-2 px-3 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full">
                <SparkleIcon className="w-3 h-3" />
                {sortedBlogs.length} Featured {sortedBlogs.length === 1 ? 'Article' : 'Articles'}
              </span>
              <span className="text-gray-400">•</span>
              <span className="px-3 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full">
                Latest Updates
              </span>
              <span className="text-gray-400">•</span>
              <span className="px-3 py-2 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-full">
                Handpicked Content
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced Featured Posts Grid Layout */}
        <div className="space-y-12 mt-16">
          
          {/* Hero Section - Main Featured Post
          {sortedBlogs[0] && (
            <div className="w-full max-w-4xl mx-auto">
              <article>
                <BlogLayoutOne blog={sortedBlogs[0]} />
              </article>
            </div>
          )} */}

          {/* Secondary Posts Grid */}
          {sortedBlogs.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedBlogs.slice(1, 7).map((blog, index) => (
                <article key={index + 1}>
                  <BlogLayoutThree blog={blog} />
                </article>
              ))}
            </div>
          )}

          {/* Additional Posts Row */}
          {sortedBlogs.length > 7 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sortedBlogs.slice(7, 9).map((blog, index) => (
                <article key={index + 7}>
                  <BlogLayoutTwo blog={blog} />
                </article>
              ))}
            </div>
          )}

          {/* Final Row - More Posts */}
          {sortedBlogs.length > 9 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sortedBlogs.slice(9, 13).map((blog, index) => (
                <article key={index + 9}>
                  <BlogLayoutThree blog={blog} />
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Enhanced View All Posts Button */}
        <div className="text-center mt-16">
          <div className="inline-block">
            <a
              href="/categories/all"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white rounded-2xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 overflow-hidden"
            >
              {/* Button background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Button content */}
              <span className="relative z-10">View All Posts</span>
              <div className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                <SparkleIcon className="w-5 h-5" />
              </div>
              
              {/* Floating particles */}
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-bounce"></div>
              <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 animate-bounce delay-200"></div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;