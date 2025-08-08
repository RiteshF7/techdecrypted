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
      sortedBlogs = sortBlogs(blogs);
      blog = sortedBlogs[0];
    }
  } catch (error) {
    console.warn('Error sorting blogs:', error);
    // Fallback sorting if sortBlogs fails
    if (blogs && Array.isArray(blogs) && blogs.length > 0) {
      sortedBlogs = blogs
        .filter(b => b && b.isPublished)
        .sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0));
      blog = sortedBlogs[0];
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
          Featured Story
        </h2>
        <p className="font-medium text-lg xs:text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl">
          Dive into the latest insights, tutorials, and innovations in technology and development.
        </p>
      </div>

      {/* Hero Cover Article - Challenge Style */}
      <article className='border-2 border-solid border-dark dark:border-light rounded-lg overflow-hidden bg-light dark:bg-dark hover:scale-105 transition-all duration-300 group'>
        
        {/* Header Bar */}
        <div className='bg-gray-800 dark:bg-gray-900 p-4 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <span className='text-white text-sm font-medium'>Hero Article</span>
            {blog.readingTime?.text && (
              <span className='px-3 py-1 bg-yellow-500 text-black rounded text-xs font-medium'>
                {blog.readingTime.text}
              </span>
            )}
            <span className='px-3 py-1 bg-red-500 text-white rounded text-xs font-medium'>
              Featured
            </span>
          </div>
          <Link href={blog.url || '#'}>
            <button className='px-4 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors duration-200 font-medium'>
              Read Full Article
            </button>
          </Link>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh] sm:min-h-[70vh]">
          
          {/* Left Side - Image */}
          <div className="relative overflow-hidden border-r border-gray-300 dark:border-gray-600">
            <Image 
              src={blog.image?.src || '/placeholder-hero.jpg'}
              placeholder={blog.image?.blurDataURL ? 'blur' : 'empty'}
              blurDataURL={blog.image?.blurDataURL}
              alt={blog.title || 'Featured post'}
              fill
              className='w-full h-full object-center object-cover group-hover:scale-110 transition-all duration-700 ease-out'
              sizes='(max-width: 1024px) 100vw, 50vw'
              priority
            />
            
            {/* Image Overlay for Mobile */}
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:hidden' />
          </div>

          {/* Right Side - Content */}
          <div className="p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-gray-50 dark:bg-gray-800 relative lg:static absolute bottom-0 left-0 right-0 lg:bg-transparent lg:dark:bg-transparent">
            
            {/* Tag and Metadata */}
            <div className='flex flex-wrap items-center gap-4 mb-6'>
              {blog.tags && blog.tags.length > 0 && (
                <Tag 
                  link={`/categories/${slug(blog.tags[0])}`} 
                  name={blog.tags[0]}
                  className='px-3 py-1 text-xs sm:text-sm border border-accent dark:border-accentDark rounded-full text-accent dark:text-accentDark hover:bg-accent hover:text-white dark:hover:bg-accentDark dark:hover:text-dark transition-all duration-200 font-medium'
                />
              )}
              {blog.publishedAt && (
                <span className='text-gray-600 dark:text-gray-400 text-sm lg:text-gray-600 lg:dark:text-gray-400'>
                  {formatDate(blog.publishedAt)}
                </span>
              )}
            </div>

            {/* Title */}
            <Link href={blog.url || '#'} className='block mb-6'>
              <h1 className='font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight group-hover:text-accent dark:group-hover:text-accentDark transition-colors duration-300 text-white lg:text-dark lg:dark:text-light'>
                {blog.title || 'Untitled Post'}
              </h1>
            </Link>

            {/* Description */}
            {blog.description && (
              <p className='text-gray-200 lg:text-gray-600 lg:dark:text-gray-400 text-base md:text-lg leading-relaxed mb-6 line-clamp-4'>
                {blog.description}
              </p>
            )}

            {/* Author and Stats */}
            <div className='flex flex-wrap items-center gap-4 text-sm text-gray-300 lg:text-gray-500 lg:dark:text-gray-400'>
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
              <span>Featured Story</span>
            </div>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className='border-t border-gray-300 dark:border-gray-600 p-4 bg-gray-50 dark:bg-gray-800'>
          <div className='flex items-center justify-between text-xs text-gray-600 dark:text-gray-400'>
            <div className='flex items-center gap-4'>
              <span>Hero Article</span>
              <span>•</span>
              <span>Latest Featured Content</span>
              {blog.readingTime?.text && (
                <>
                  <span>•</span>
                  <span>{blog.readingTime.text} Read</span>
                </>
              )}
            </div>
            <div className='flex items-center gap-2'>
              <span className='w-2 h-2 bg-red-500 rounded-full animate-pulse'></span>
              <span>Live</span>
            </div>
          </div>
        </div>
      </article>

      {/* Additional Stats */}
      <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-500">
        <span>Featured Content</span>
        <span>•</span>
        <span>Latest Updates</span>
        <span>•</span>
        <span>Technology Insights</span>
      </div>
    </section>
  );
};

export default HomeCoverSection;