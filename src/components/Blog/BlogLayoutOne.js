import React from "react";
import Tag from "../Elements/Tag";
import Link from "next/link";
import Image from "next/image";
import { slug } from "github-slugger";
import formatDate from "@/src/utils/formatdate";

const BlogLayoutOne = ({ blog }) => {
  if (!blog) {
    return null;
  }

  // Safe access to readingTime
  const readingTime = blog.readingTime?.text || blog.readingTime || null;

  return (
    <div className="border-2 border-solid border-dark dark:border-light rounded-lg overflow-hidden bg-light dark:bg-dark hover:scale-105 transition-all duration-300 group h-full flex flex-col">
      
      {/* Main Content Area - Takes remaining height */}
      <div className="relative flex-1 overflow-hidden">
        {/* Background Image */}
        <Image
          src={blog.image?.src || '/placeholder-blog.jpg'}
          placeholder={blog.image?.blurDataURL ? "blur" : "empty"}
          blurDataURL={blog.image?.blurDataURL}
          alt={blog.title || 'Blog post'}
          width={blog.image?.width || 800}
          height={blog.image?.height || 600}
          className="w-full h-full object-center object-cover group-hover:scale-110 transition-all ease duration-500"
          sizes="(max-width: 1180px) 100vw, 50vw"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        
        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 xs:p-6 sm:p-8 text-white">
          {/* Tag */}
          {blog.tags && blog.tags.length > 0 && (
            <Tag 
              link={`/categories/${slug(blog.tags[0])}`} 
              name={blog.tags[0]}
              className="px-3 py-1 text-xs sm:text-sm border border-white/30 rounded-full backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-200 text-white mb-4 inline-block"
            />
          )}
          
          {/* Title */}
          <Link href={blog.url || '#'} className="block">
            <h2 className="font-bold text-lg xs:text-xl sm:text-2xl md:text-3xl text-white mb-3 group-hover:text-accent dark:group-hover:text-accentDark transition-colors duration-300 line-clamp-3">
              {blog.title || 'Untitled Post'}
            </h2>
          </Link>
          
          {/* Description */}
          {blog.description && (
            <p className="text-gray-200 text-sm sm:text-base leading-relaxed line-clamp-2 mb-4">
              {blog.description}
            </p>
          )}
          
          {/* Metadata */}
          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-300">
            <div className="flex items-center gap-3">
              {blog.publishedAt && (
                <span>{formatDate(blog.publishedAt)}</span>
              )}
              {blog.author && (
                <>
                  <span>•</span>
                  <span>{blog.author}</span>
                </>
              )}
            </div>
            <span className="group-hover:translate-x-2 transition-transform duration-200">→</span>
          </div>
        </div>
      </div>
      
      {/* Bottom Stats Bar - Fixed height */}
      <div className="border-t border-gray-300 dark:border-gray-600 p-3 bg-gray-50 dark:bg-gray-800 flex-shrink-0">
        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-4">
            {blog.tags && (
              <span>{blog.tags.length} Topics</span>
            )}
            {readingTime && (
              <>
                <span>•</span>
                <span>{readingTime}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Published</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogLayoutOne;