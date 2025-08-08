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
      <div className='w-full p-5 xs:p-10 sm:p-12 md:p-16 lg:p-20 border-b-2 border-solid border-dark dark:border-light text-dark dark:text-light'>
        <div className='h-[60vh] sm:h-[85vh] flex items-center justify-center border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-3xl'>
          <div className='text-center'>
            <h1 className='font-bold text-2xl md:text-4xl mb-4'>No Featured Post Available</h1>
            <p className='text-gray-600 dark:text-gray-400'>Check back soon for featured content!</p>
          </div>
        </div>
      </div>
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
      {/* Hero Cover Article */}
      <article className='relative h-[60vh] sm:h-[85vh] rounded-3xl overflow-hidden border-2 border-solid border-dark dark:border-light bg-light dark:bg-dark group'>
        
        {/* Header Bar Overlay */}
        <div className='absolute top-0 left-0 right-0 z-30 bg-gray-900/90 backdrop-blur-sm p-4 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <span className='text-white text-sm font-medium'>Hero Article</span>
            {blog.readingTime.text && (
              <span className='px-3 py-1 bg-yellow-500 text-black rounded text-xs font-medium'>
                {blog.readingTime.text} min read
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

        {/* Background Image */}
        <div className='absolute inset-0'>
          <Image 
            src={blog.image?.src || '/placeholder-hero.jpg'}
            placeholder={blog.image?.blurDataURL ? 'blur' : 'empty'}
            blurDataURL={blog.image?.blurDataURL}
            alt={blog.title || 'Featured post'}
            fill
            className='w-full h-full object-center object-cover group-hover:scale-105 transition-all duration-700 ease-out'
            sizes='100vw'
            priority
          />
        </div>

        {/* Gradient Overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10' />

        {/* Content Overlay */}
        <div className='absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-12 lg:p-16 z-20 text-white'>
          <div className='max-w-4xl'>
            
            {/* Tag and Metadata */}
            <div className='flex items-center gap-4 mb-6'>
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
              <p className='text-gray-200 text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl mb-6 line-clamp-3'>
                {blog.description}
              </p>
            )}

            {/* Author and Stats */}
            <div className='flex items-center gap-6 text-sm text-gray-300'>
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
              <span>Hero Post</span>
            </div>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className='absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-4 z-25 border-t border-white/20'>
          <div className='flex items-center justify-between text-xs text-gray-300'>
            <div className='flex items-center gap-4'>
              <span>Featured Article</span>
              <span>•</span>
              <span>Latest Content</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='w-2 h-2 bg-red-500 rounded-full animate-pulse'></span>
              <span>Live</span>
            </div>
          </div>
        </div>
      </article>

      {/* Section Description */}
      <div className='mt-8 text-center'>
        <p className='text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl mx-auto'>
          Dive into the latest insights, tutorials, and innovations in technology and development.
        </p>
      </div>
    </section>
  );
};

export default HomeCoverSection;