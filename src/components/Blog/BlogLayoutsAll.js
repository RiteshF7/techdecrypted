import React from "react";
import Tag from "../Elements/Tag";
import Link from "next/link";
import Image from "next/image";
import { slug } from "github-slugger";
import formatDate from "@/src/utils/formatdate";
import { format } from "date-fns";

// Decorative icons
const SparkleIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L13.09 8.26L19 7L13.09 15.74L12 22L10.91 15.74L5 17L10.91 8.26L12 2Z" 
          fill="currentColor" opacity="0.8"/>
  </svg>
);

const ArrowIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ClockIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// BlogLayoutOne - Enhanced
const BlogLayoutOne = ({ blog }) => {
  if (!blog) {
    return null;
  }

  const readingTime = blog.readingTime?.text || blog.readingTime || null;

  return (
    <div className="group relative h-full flex flex-col overflow-hidden">
      {/* Glassmorphism container */}
      <div className="relative h-full bg-white/10 dark:bg-black/20 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl shadow-black/10 dark:shadow-white/5 overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-3xl hover:shadow-purple-500/25">
        
        {/* Gradient border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
        
        {/* Main Content Area */}
        <div className="relative flex-1 overflow-hidden">
          {/* Background Image */}
          <div className="relative w-full h-full min-h-[400px]">
            <Image
              src={blog.image?.src || '/placeholder-blog.jpg'}
              placeholder={blog.image?.blurDataURL ? "blur" : "empty"}
              blurDataURL={blog.image?.blurDataURL}
              alt={blog.title || 'Blog post'}
              fill
              className="object-center object-cover group-hover:scale-110 transition-all ease duration-700"
              sizes="(max-width: 1180px) 100vw, 50vw"
            />
          </div>
          
          {/* Enhanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent group-hover:from-black/90 transition-all duration-500"></div>
          
          {/* Floating decorative elements */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <SparkleIcon className="w-4 h-4 text-purple-400 animate-pulse" />
          </div>
          
          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
            {/* Enhanced Tag */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mb-4">
                <Tag 
                  link={`/categories/${slug(blog.tags[0])}`} 
                  name={blog.tags[0]}
                  className="relative px-4 py-2 text-xs sm:text-sm border border-white/30 rounded-full backdrop-blur-sm bg-gradient-to-r from-indigo-500/20 to-purple-500/20 hover:from-indigo-500/30 hover:to-purple-500/30 transition-all duration-300 text-white inline-flex items-center gap-2 group/tag"
                />
              </div>
            )}
            
            {/* Enhanced Title */}
            <Link href={blog.url || '#'} className="block group/title">
              <h2 className="font-bold text-xl xs:text-2xl sm:text-3xl md:text-4xl text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:via-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-500 line-clamp-3">
                {blog.title || 'Untitled Post'}
              </h2>
            </Link>
            
            {/* Enhanced Description */}
            {blog.description && (
              <p className="text-gray-200 text-sm sm:text-base leading-relaxed line-clamp-2 mb-6 group-hover:text-gray-100 transition-colors duration-300">
                {blog.description}
              </p>
            )}
            
            {/* Enhanced Metadata */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-300">
                {blog.publishedAt && (
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                    {formatDate(blog.publishedAt)}
                  </span>
                )}
                {blog.author && (
                  <span className="px-2 py-1 bg-white/10 rounded-full backdrop-blur-sm">
                    {blog.author}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 group-hover:translate-x-2 transition-transform duration-300">
                <span className="text-sm text-gray-300">Read more</span>
                <ArrowIcon className="w-4 h-4 text-purple-400" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Bottom Stats Bar */}
        <div className="relative border-t border-white/20 p-4 bg-black/20 backdrop-blur-sm flex-shrink-0">
          <div className="flex items-center justify-between text-xs text-gray-300">
            <div className="flex items-center gap-4">
              {blog.tags && (
                <span className="flex items-center gap-2">
                  <SparkleIcon className="w-3 h-3 text-indigo-400" />
                  {blog.tags.length} Topics
                </span>
              )}
              {readingTime && (
                <span className="flex items-center gap-2">
                  <ClockIcon className="w-3 h-3 text-purple-400" />
                  {readingTime}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse"></span>
              <span>Published</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// BlogLayoutTwo - Enhanced
const BlogLayoutTwo = ({ blog }) => {
  if (!blog) {
    return null;
  }

  const formatDateHelper = (dateString) => {
    try {
      return format(new Date(dateString), "MMMM dd, yyyy");
    } catch (error) {
      return "Recent";
    }
  };

  return (
    <div className="group relative overflow-hidden">
      {/* Glassmorphism container */}
      <div className="relative bg-white/10 dark:bg-black/20 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl shadow-black/10 dark:shadow-white/5 overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-3xl hover:shadow-indigo-500/25">
        
        {/* Gradient border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
        
        {/* Main Content */}
        <div className="grid grid-cols-12 items-stretch text-dark dark:text-light min-h-[300px]">
          {/* Enhanced Image Section */}
          <div className="col-span-12 lg:col-span-5 relative overflow-hidden">
            <Link href={blog.url || "#"} className="block h-full min-h-[250px] group/image">
              <div className="relative w-full h-full">
                <Image
                  src={blog.image?.src || "/placeholder-blog.jpg"}
                  placeholder={blog.image?.blurDataURL ? "blur" : "empty"}
                  blurDataURL={blog.image?.blurDataURL}
                  alt={blog.title || "Blog post"}
                  fill
                  className="object-cover object-center group-hover:scale-110 transition-all ease duration-700"
                  sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
                />
                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Floating sparkle on image */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <SparkleIcon className="w-4 h-4 text-blue-400 animate-bounce" />
                </div>
              </div>
            </Link>
          </div>

          {/* Enhanced Content Section */}
          <div className="col-span-12 lg:col-span-7 flex flex-col justify-between p-6 lg:p-8 space-y-4">
            {/* Enhanced Tag */}
            {blog.tags?.length > 0 && (
              <span className="inline-block uppercase font-semibold text-xs sm:text-sm px-4 py-2 border-2 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400 hover:from-blue-500/20 hover:to-indigo-500/20 transition-all duration-300 self-start">
                {blog.tags[0]}
              </span>
            )}

            {/* Enhanced Title */}
            <Link href={blog.url || "#"} className="block group/title">
              <h2 className="font-bold text-lg sm:text-xl lg:text-2xl group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 dark:group-hover:from-blue-400 dark:group-hover:to-indigo-400 group-hover:bg-clip-text transition-all duration-500 line-clamp-2 leading-tight">
                {blog.title || "Untitled Post"}
              </h2>
            </Link>

            {/* Enhanced Description */}
            {blog.description && (
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed line-clamp-3 group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-colors duration-300">
                {blog.description}
              </p>
            )}

            {/* Enhanced Metadata */}
            <div className="flex items-center flex-wrap gap-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {blog.publishedAt && (
                <span className="flex items-center gap-2 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  {formatDateHelper(blog.publishedAt)}
                </span>
              )}
              {blog.author && (
                <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full">
                  {blog.author}
                </span>
              )}
              {blog.readingTime?.text && (
                <span className="flex items-center gap-1 px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full">
                  <ClockIcon className="w-3 h-3" />
                  {blog.readingTime.text} min
                </span>
              )}
            </div>

            {/* Enhanced Bottom Stats Bar */}
            <div className="border-t border-white/20 dark:border-white/10 pt-4 mt-auto">
              <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-4">
                  {blog.tags && (
                    <span className="flex items-center gap-2">
                      <SparkleIcon className="w-3 h-3 text-blue-400" />
                      {blog.tags.length} Topics
                    </span>
                  )}
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs">
                    Featured
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full animate-pulse"></span>
                  <span>Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// BlogLayoutThree - Enhanced
const BlogLayoutThree = ({ blog }) => {
  if (!blog) return null;

  const formatDateHelper = (dateString) => {
    try {
      return format(new Date(dateString), "MMMM dd, yyyy");
    } catch {
      return "Recent";
    }
  };

  return (
    <div className="group relative h-full">
      {/* Glassmorphism container */}
      <div className="relative h-full bg-white/10 dark:bg-black/20 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl shadow-black/10 dark:shadow-white/5 overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-3xl hover:shadow-pink-500/25 flex flex-col">
        
        {/* Gradient border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
        
        {/* Enhanced Image Section */}
        <div className="relative overflow-hidden rounded-t-3xl">
          <Link href={blog.url || "#"} className="block group/image">
            <div className="relative">
              <Image
                src={blog.image?.src || "/placeholder-blog.jpg"}
                placeholder={blog.image?.blurDataURL ? "blur" : "empty"}
                blurDataURL={blog.image?.blurDataURL}
                alt={blog.title || "Blog post"}
                width={blog.image?.width || 400}
                height={blog.image?.height || 300}
                className="aspect-[4/3] w-full object-cover object-center group-hover:scale-110 transition-all ease duration-700"
                sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
              />
              {/* Image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Floating elements */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <SparkleIcon className="w-4 h-4 text-pink-400 animate-pulse" />
              </div>
            </div>
          </Link>
        </div>

        {/* Enhanced Content Section */}
        <div className="flex flex-col flex-grow p-6">
          {/* Enhanced Tag */}
          {blog.tags?.length > 0 && (
            <span className="uppercase font-semibold text-xs sm:text-sm px-4 py-2 border-2 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 border-pink-500/30 text-pink-600 dark:text-pink-400 hover:from-pink-500/20 hover:to-purple-500/20 transition-all duration-300 self-start mb-4">
              {blog.tags[0]}
            </span>
          )}

          {/* Enhanced Title */}
          <Link href={blog.url || "#"} className="block mb-4 flex-grow group/title">
            <h2 className="font-bold text-lg sm:text-xl group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-600 group-hover:to-purple-600 dark:group-hover:from-pink-400 dark:group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-500 line-clamp-3 leading-tight">
              {blog.title || "Untitled Post"}
            </h2>
          </Link>

          {/* Enhanced Description */}
          {blog.description && (
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4 group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-colors duration-300">
              {blog.description}
            </p>
          )}

          {/* Enhanced Metadata */}
          <div className="mt-auto">
            <div className="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-4">
              {blog.publishedAt && (
                <span className="flex items-center gap-2 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  {formatDateHelper(blog.publishedAt)}
                </span>
              )}
              {blog.author && (
                <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full">
                  {blog.author}
                </span>
              )}
              {blog.readingTime?.text && (
                <span className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-green-400 to-emerald-400 text-white rounded-full text-xs font-medium shadow-lg">
                  <ClockIcon className="w-3 h-3" />
                  {blog.readingTime.text} min
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Stats Bar */}
        <div className="border-t border-white/20 dark:border-white/10 p-4 bg-black/5 dark:bg-white/5 backdrop-blur-sm mt-auto rounded-b-3xl">
          <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-4">
              {blog.tags && (
                <span className="flex items-center gap-2">
                  <SparkleIcon className="w-3 h-3 text-pink-400" />
                  {blog.tags.length} Topics
                </span>
              )}
              <span className="px-2 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-full text-xs">
                Quick Read
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse"></span>
              <span>Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { BlogLayoutOne, BlogLayoutTwo, BlogLayoutThree };