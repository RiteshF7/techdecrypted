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
      return "Recent";
    }
  };

  return (
    <div className="border-2 border-solid border-dark dark:border-light rounded-lg overflow-hidden bg-light dark:bg-dark hover:scale-105 transition-all duration-300 group">
      {/* Main Content */}
      <div className="grid grid-cols-12 items-center text-dark dark:text-light">
        {/* Image Section */}
        <div className="col-span-12 lg:col-span-5 h-full  overflow-hidden lg:border-r lg:border-white dark:lg:border-gray-300 ">
          <Link href={blog.url || "#"} className="block h-full">
            <div className="relative w-auto h-full min-h-[250px]">
              <Image
                src={blog.image?.src || "/placeholder-blog.jpg"}
                placeholder={blog.image?.blurDataURL ? "blur" : "empty"}
                blurDataURL={blog.image?.blurDataURL}
                alt={blog.title || "Blog post"}
                fill
                className="object-cover object-center group-hover:scale-110 transition-all ease duration-300"
                sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
              />
            </div>
          </Link>
        </div>

        {/* Content Section */}
        <div className="col-span-12 mt-4 lg:col-span-7 w-full space-y-3 lg:border-r lg:border-white dark:lg:border-gray-300 lg:pr-6 px-4 lg:px-6">
          {/* Tag */}
          {blog.tags?.length > 0 && (
            <span className="inline-block uppercase text-accent dark:text-accentDark font-semibold text-xs sm:text-sm px-3 py-1 border border-accent dark:border-accentDark rounded-full">
              {blog.tags[0]}
            </span>
          )}

          {/* Title */}
          <Link href={blog.url || "#"} className="block">
            <h2 className="font-semibold text-base sm:text-lg group-hover:text-accent dark:group-hover:text-accentDark transition-colors duration-300 line-clamp-2">
              {blog.title || "Untitled Post"}
            </h2>
          </Link>

          {/* Description */}
          {blog.description && (
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">
              {blog.description}
            </p>
          )}

          {/* Metadata */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            
            {blog.author && (
              <>
                <span>•</span>
                <span>{blog.author}</span>
              </>
            )}
            {blog.readingTime?.text && (
              <>
                <span>•</span>
                <span>{blog.readingTime.text} min read</span>
              </>
            )}
          </div>

          {/* Bottom Stats Bar */}
          <div className="border-t border-gray-300 dark:border-gray-600 pt-3 pb-3 bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-3">
              <span>•</span>
                {blog.publishedAt && (
              <span className="font-medium">{formatDate(blog.publishedAt)}</span>
            )}
            <span>•</span>
                {blog.tags && <span>{blog.tags.length} Topics</span>}
              
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogLayoutTwo;