import { format, parseISO } from "date-fns";
import Link from "next/link";
import React from "react";
import { slug } from "github-slugger";

// Reading-focused icons
const CalendarIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
    <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
    <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
    <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const ClockIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TagIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" stroke="currentColor" strokeWidth="2"/>
    <line x1="7" y1="7" x2="7.01" y2="7" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const BlogDetails = ({ blog, slug: blogSlug }) => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      {/* Main details container */}
      <div className="relative bg-white/5 dark:bg-black/10 backdrop-blur-xl rounded-2xl border border-white/10 dark:border-white/5 shadow-lg overflow-hidden">
        
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5"></div>
        
        {/* Content */}
        <div className="relative z-10 p-6 sm:p-8">
          {/* Header section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            
            {/* Date and reading time - Left side */}
            <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400">
              {/* Publication date */}
              <div className="flex items-center gap-3 group">
                <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-900/50 transition-colors duration-300">
                  <CalendarIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wide">
                    Published
                  </span>
                  <time className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {format(parseISO(blog.publishedAt), "LLLL d, yyyy")}
                  </time>
                </div>
              </div>

              {/* Reading time */}
              <div className="flex items-center gap-3 group">
                <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/30 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors duration-300">
                  <ClockIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wide">
                    Reading Time
                  </span>
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {blog.readingTime.text}
                  </span>
                </div>
              </div>
            </div>

            {/* Category tag - Right side */}
            <div className="flex items-center justify-start sm:justify-end">
              <Link 
                href={`/categories/${slug(blog.tags[0])}`}
                className="group inline-flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 hover:from-pink-200 hover:to-rose-200 dark:hover:from-pink-900/50 dark:hover:to-rose-900/50 rounded-xl border border-pink-200/50 dark:border-pink-800/30 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className="p-1 rounded-lg bg-pink-200 dark:bg-pink-800/50 group-hover:bg-pink-300 dark:group-hover:bg-pink-800/70 transition-colors duration-300">
                  <TagIcon className="w-3 h-3 text-pink-600 dark:text-pink-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-pink-600/80 dark:text-pink-400/80 uppercase tracking-wide">
                    Category
                  </span>
                  <span className="text-sm font-semibold text-pink-700 dark:text-pink-300 capitalize">
                    {blog.tags[0]}
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* Separator line with gradient */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="px-4 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
                <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Additional metadata row */}
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                Article
              </span>
              {blog.tags && blog.tags.length > 1 && (
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                  +{blog.tags.length - 1} more {blog.tags.length - 1 === 1 ? 'tag' : 'tags'}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Published</span>
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      </div>
    </div>
  );
};

export default BlogDetails;