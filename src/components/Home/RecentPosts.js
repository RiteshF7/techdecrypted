import { sortBlogs } from "@/src/utils";
import Link from "next/link";
import React from "react";
import { BlogLayoutThree } from "../Blog/BlogLayoutsAll";


const RecentPosts = ({ blogs }) => {
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
        .filter(blog => blog && blog.is_published)
        .sort((a, b) => new Date(b.published_at || 0) - new Date(a.published_at || 0));
    }
  }

  // Get recent posts (skip first 4 for featured, take next 6)
  const recentPosts = sortedBlogs.slice(4, 10);

  // Handle case when no recent posts are available
  if (!recentPosts || recentPosts.length === 0) {
    return (
      <section className="w-full p-4 xs:p-6 sm:p-8 md:p-12 lg:p-16 border-b-2 border-solid border-dark dark:border-light text-dark dark:text-light">
        <div className="flex items-center justify-between mb-12">
          <h2 className="font-bold text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl capitalize">
            Recent Posts
          </h2>
          <Link
            href="/categories/all"
            className="font-medium text-accent dark:text-accentDark hover:underline underline-offset-2 text-base md:text-lg transition-all duration-200"
          >
            view all →
          </Link>
        </div>
        <p className="font-medium text-base xs:text-lg sm:text-xl text-gray-600 dark:text-gray-400">
          No recent posts available at the moment. Check back soon for more content!
        </p>
      </section>
    );
  }

  return (
    <section className="w-full p-4 xs:p-6 sm:p-8 md:p-12 lg:p-16 border-b-2 border-solid border-dark dark:border-light text-dark dark:text-light">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12">
        <div className="mb-6 sm:mb-0">
          <h2 className="font-bold text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl capitalize mb-4">
            Recent Posts
          </h2>
          <p className="font-medium text-base xs:text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
            Stay updated with my latest articles on technology, development, and innovation.
          </p>
          
          {/* Blog Statistics */}
          <div className="flex items-center gap-6 mt-4 text-sm text-gray-500 dark:text-gray-500">
            <span>{recentPosts.length} Recent {recentPosts.length === 1 ? 'Article' : 'Articles'}</span>
            <span>•</span>
            <span>Fresh Content</span>
            <span>•</span>
            <span>Weekly Updates</span>
          </div>
        </div>

        {/* View All Link */}
        <Link
          href="/categories/all"
          className="inline-block border-2 border-solid border-accent dark:border-accentDark text-accent dark:text-accentDark px-6 py-3 rounded hover:bg-accent hover:text-white dark:hover:bg-accentDark dark:hover:text-dark transition-all duration-200 font-medium self-start sm:self-end whitespace-nowrap"
        >
          View All Posts →
        </Link>
      </div>

      {/* Recent Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {recentPosts.map((blog, index) => {
          // Safety check for individual blog
          if (!blog) return null;
          
          return (
            <article key={blog.id || blog.slug || index} className="col-span-1 relative">
              <BlogLayoutThree blog={blog} />
            </article>
          );
        })}
      </div>

      {/* Load More Section */}
      {sortedBlogs.length > 10 && (
        <div className="text-center mt-12 pt-8 border-t border-gray-300 dark:border-gray-600">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Showing {recentPosts.length} of {sortedBlogs.length - 4} recent posts
          </p>
          <Link
            href="/categories/all"
            className="inline-block border-2 border-solid border-dark dark:border-light px-8 py-3 rounded hover:bg-dark hover:text-light dark:hover:bg-light dark:hover:text-dark transition-all duration-200 font-medium"
          >
            Load More Posts →
          </Link>
        </div>
      )}
    </section>
  );
};

export default RecentPosts;