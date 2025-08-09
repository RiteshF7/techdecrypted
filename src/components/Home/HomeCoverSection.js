import { sortBlogs } from '@/src/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Tag from '../Elements/Tag';
import { slug } from 'github-slugger';

const HomeCoverSection = ({ blogs }) => {
  // Safety check and sorting
  let sortedBlogs = [];
  let blog = null;

  try {
    if (blogs && Array.isArray(blogs) && blogs.length > 0) {
      // First, try to find a homeCover blog
      const homeCoverBlog = blogs.find(b => b.homeCover && b.isPublished);
      if (homeCoverBlog) {
        blog = homeCoverBlog;
      } else {
        // Fallback to most recent published blog
        sortedBlogs = sortBlogs(blogs);
        blog = sortedBlogs[0];
      }
    }
  } catch (error) {
    console.warn('Error sorting blogs:', error);
    // Fallback sorting if sortBlogs fails
    if (blogs && Array.isArray(blogs) && blogs.length > 0) {
      // First try to find a homeCover blog
      const homeCoverBlog = blogs.find(b => b.homeCover && b.isPublished);
      if (homeCoverBlog) {
        blog = homeCoverBlog;
      } else {
        // Fallback to most recent published blog
        sortedBlogs = blogs
          .filter(b => b && b.isPublished)
          .sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0));
        blog = sortedBlogs[0];
      }
    }
  }

  // Handle case when no blog is available
  if (!blog) {
    return (
      <section className='w-full p-5 xs:p-10 sm:p-12 md:p-16 lg:p-20 border-b-2 border-solid border-dark dark:border-light text-dark dark:text-light'>
        <div className='h-[60vh] sm:h-[85vh] flex items-center justify-center border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-lg'>
          <div className='text-center'>
            <h1 className='font-bold text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl capitalize mb-6'>No Featured Post Available</h1>
            <p className='font-medium text-lg xs:text-xl sm:text-2xl text-gray-600 dark:text-gray-400'>Check back soon for featured content!</p>
          </div>
        </div>
      </section>
    );
  }

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Recent';
    }
  };

  return (
    <section className='w-full p-5 xs:p-10 sm:p-12 md:p-16 lg:p-20 border-b-2 border-solid border-dark dark:border-light text-dark dark:text-light'>
      {/* Section Header */}
      <div className="mb-12">
        <h2 className="font-bold text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl capitalize mb-6">
          Home Cover Story
        </h2>
        <p className="font-medium text-lg xs:text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl">
          Dive into the latest insights, tutorials, and innovations in technology and development.
        </p>
      </div>

      {/* Hero Cover Article - Challenge Style */}
      <article className='border-2 border-solid border-dark dark:border-light rounded-lg overflow-hidden bg-light dark:bg-dark hover:scale-105 transition-all duration-300 group'>
        
        

        {/* Main Content Area - Full Height Image */}
        <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] overflow-hidden">
          
          {/* Full Screen Image */}
          <Image 
            src={blog.image?.src || '/placeholder-hero.jpg'}
            placeholder={blog.image?.blurDataURL ? 'blur' : 'empty'}
            blurDataURL={blog.image?.blurDataURL}
            alt={blog.title || 'Featured post'}
            fill
            className='w-full h-full object-center object-cover group-hover:scale-110 transition-all duration-700 ease-out'
            sizes='100vw'
            priority
          />
          
          {/* Gradient Overlay */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent' />

          {/* Content Overlay - Positioned at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-12 lg:p-16 text-white z-10">
            <div className='max-w-4xl'>
              
              {/* Tag and Metadata */}
              <div className='flex flex-wrap items-center gap-4 mb-6'>
                {blog.tags && blog.tags.length > 0 && (
                  <Tag 
                    link={`/categories/${slug(blog.tags[0])}`} 
                    name={blog.tags[0]}
                    className='px-4 py-2 text-sm border border-white/30 rounded-full backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-200 text-white font-medium'
                  />
                )}
                {blog.publishedAt && (
                  <span className='text-gray-300 text-sm'>
                    {formatDate(blog.publishedAt)}
                  </span>
                )}
              </div>

              {/* Title */}
              <Link href={blog.url || '#'} className='block mb-6'>
                <h1 className='font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight group-hover:text-accent dark:group-hover:text-accentDark transition-colors duration-300'>
                  {blog.title || 'Untitled Post'}
                </h1>
              </Link>

              {/* Description */}
              {blog.description && (
                <p className='text-gray-200 text-base md:text-lg lg:text-xl leading-relaxed mb-6 line-clamp-3 max-w-3xl'>
                  {blog.description}
                </p>
              )}

              {/* Author and Stats */}
              <div className='flex flex-wrap items-center gap-4 text-sm text-gray-300'>
                {blog.author && (
                  <span className='font-medium'>By {blog.author}</span>
                )}
                {blog.tags && blog.tags.length > 1 && (
                  <>
                    <span>•</span>
                    <span>{blog.tags.length} Topics</span>
                  </>
                )}
                <span>•</span>
                <span>Home Cover Story</span>
                {blog.readingTime?.text && (
                  <>
                    <span>•</span>
                    <span>{blog.readingTime.text} Read</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className='border-t border-gray-300 dark:border-gray-600 p-4 bg-gray-50 dark:bg-gray-800'>
          <div className='flex items-center justify-between text-xs text-gray-600 dark:text-gray-400'>
            <div className='flex items-center gap-4'>
              <span>•</span>
              <span>Latest Home Cover Content</span>
              <span>•</span>
              <span>Full Screen Experience</span>
              <span>•</span>
              <span>{blog.readingTime.text}</span>
              <span>•</span>
              <span>Home Cover</span>
            
            </div>

          </div>

        </div>
      </article>

      
    </section>
  );
};

export default HomeCoverSection;