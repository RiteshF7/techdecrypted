import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogLayoutThree = ({ blog }) => {
  if (!blog) return null;

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMMM dd, yyyy");
    } catch {
      return "Recent";
    }
  };

  return (
    <div className="border-2 border-solid border-dark dark:border-light rounded-lg overflow-hidden bg-light dark:bg-dark hover:scale-105 transition-all duration-300 group h-full flex flex-col">
      
      {/* Image Section */}
      <div className="p-0 border-b-4 border-white dark:border-white">
        <Link href={blog.url || "#"} className="block">
          <Image
            src={blog.image?.src || "/placeholder-blog.jpg"}
            placeholder={blog.image?.blurDataURL ? "blur" : "empty"}
            blurDataURL={blog.image?.blurDataURL}
            alt={blog.title || "Blog post"}
            width={blog.image?.width || 400}
            height={blog.image?.height || 300}
            className="aspect-[4/3] w-full h-full object-cover object-center group-hover:scale-110 transition-all ease duration-300"
            sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
          />
        </Link>
      </div>

      {/* Content Section */}
      <div className="flex flex-col w-full p-4 pt-6 flex-grow">
        {/* Tag */}
        {blog.tags?.length > 0 && (
          <span className="uppercase text-accent dark:text-accentDark font-semibold text-xs sm:text-sm px-3 py-1 border border-accent dark:border-accentDark rounded-full self-start mb-3">
            {blog.tags[0]}
          </span>
        )}

        {/* Title */}
        <Link href={blog.url || "#"} className="block mb-3 flex-grow">
          <h2 className="font-semibold text-base sm:text-lg group-hover:text-accent dark:group-hover:text-accentDark transition-colors duration-300 line-clamp-3">
            {blog.title || "Untitled Post"}
          </h2>
        </Link>

        {/* Description */}
        {blog.description && (
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2 mb-3">
            {blog.description}
          </p>
        )}

        {/* Metadata */}
        <div className="mt-auto">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2">
            {blog.publishedAt && (
              <span className="font-medium">{formatDate(blog.publishedAt)}</span>
            )}
            {blog.author && (
              <>
                <span>•</span>
                <span>{blog.author}</span>
                <span>•</span>
                {blog.readingTime?.text && (
              <span className="px-2 py-1 bg-green-500 text-white rounded text-xs">
                {blog.readingTime.text} min
              </span>
            )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Stats Bar */}
      <div className="border-t border-gray-300 dark:border-gray-600 p-3 bg-gray-50 dark:bg-gray-800 mt-auto">
        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-3">
          <span>•</span>
            {blog.tags && <span>{blog.tags.length} Topics</span>}
            <span>•</span>
            <span>Quick Read</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogLayoutThree;