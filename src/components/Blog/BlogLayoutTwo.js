import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogLayoutTwo = ({ blog }) => {
  // Safety check for blog data
  if (!blog) {
    return null;
  }

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMMM dd, yyyy");
    } catch (error) {
      return 'Recent';
    }
  };

  return (
    <div className="border-2 border-solid border-dark dark:border-light rounded-lg overflow-hidden bg-light dark:bg-dark hover:scale-105 transition-all duration-300 group">
      {/* Header Bar */}
      <div className="bg-gray-800 dark:bg-gray-900 p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-white text-sm font-medium">Article</span>
          {blog.readingTime.text && (
            <span className="px-2 py-1 rounded text-xs text-white bg-green-500">
              {blog.readingTime.text} min
            </span>
          )}
        </div>
        <Link href={blog.url || '#'}>
          <button className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors duration-200">
            Read
          </button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-4 items-center p-4 text-dark dark:text-light">
        {/* Image Section */}
        <Link
          href={blog.url || '#'}
          className="col-span-12 lg:col-span-4 h-full rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600"
        >
          <Image
            src={blog.image?.src || '/placeholder-blog.jpg'}
            placeholder={blog.image?.blurDataURL ? "blur" : "empty"}
            blurDataURL={blog.image?.blurDataURL}
            alt={blog.title || 'Blog post'}
            width={blog.image?.width || 400}
            height={blog.image?.height || 300}
            className="aspect-square w-full h-full object-cover object-center group-hover:scale-110 transition-all ease duration-300"
            sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
          />
        </Link>

        {/* Content Section */}
        <div className="col-span-12 lg:col-span-8 w-full space-y-3">
          {/* Tag */}
          {blog.tags && blog.tags.length > 0 && (
            <span className="inline-block uppercase text-accent dark:text-accentDark font-semibold text-xs sm:text-sm px-3 py-1 border border-accent dark:border-accentDark rounded-full">
              {blog.tags[0]}
            </span>
          )}

          {/* Title */}
          <Link href={blog.url || '#'} className="block">
            <h2 className="font-semibold text-base sm:text-lg group-hover:text-accent dark:group-hover:text-accentDark transition-colors duration-300 line-clamp-2">
              {blog.title || 'Untitled Post'}
            </h2>
          </Link>

          {/* Description */}
          {blog.description && (
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">
              {blog.description}
            </p>
          )}

          {/* Metadata */}
          <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            {blog.publishedAt && (
              <span className="font-medium">
                {formatDate(blog.publishedAt)}
              </span>
            )}
            {blog.author && (
              <>
                <span>•</span>
                <span>{blog.author}</span>
              </>
            )}
            {blog.readingTime.text && (
              <>
                <span>•</span>
                <span>{blog.readingTime.text} min read</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Stats Bar */}
      <div className="border-t border-gray-300 dark:border-gray-600 p-3 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-3">
            {blog.tags && (
              <span>{blog.tags.length} Topics</span>
            )}
            <span>•</span>
            <span>Medium Read</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span>Available</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogLayoutTwo;