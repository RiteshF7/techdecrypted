"use client";
import Image from 'next/image';
import React from 'react';

const HeroSection = () => {
  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = 'https://raw.githubusercontent.com/RiteshF7/riteshportfolio/master/ritesh_resume_2025.pdf';
    link.download = 'Ritesh_Singh_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className='w-full md:h-[75vh] border-b-2 border-solid border-dark dark:border-light flex flex-col md:flex-row items-center justify-center text-dark dark:text-light'>
      <div className='w-full md:w-1/2 h-full border-r-2 border-solid border-dark dark:border-light flex justify-center'>
        <Image
          src="/images/background_circles.svg" 
          alt="Ritesh Singh"
          className='w-4/5 xs:w-3/4 md:w-full h-full object-contain object-center'
        />
      </div>
      
      <div className='w-full md:w-1/2 flex flex-col text-left items-start justify-center px-5 xs:p-10 pb-10 lg:px-16'>
        <h2 className='font-bold capitalize text-4xl xs:text-5xl sxl:text-6xl text-center lg:text-left'>
        I want to be one of the greats.
        </h2>
        <p className="font-medium capitalize mt-4 text-base">
  I&apos;m deeply passionate about technology and the Android ecosystem.<br />
  Whether it&apos;s exploring the latest Jetpack Compose APIs, optimizing app performance,
  or experimenting with new tools and frameworks.<br /><br />
  I thrive on pushing boundaries and creating meaningful products.<br />
  I love building things especially when they make life smoother,<br />
  smarter, or just more delightful.<br /><br />
  Few are blessed to live their passion as their profession.<br />
  I consider it a privilege and one I refuse to waste.<br />
  I want to become one of the greats and I won&apos;t stop until I do.
</p>
        <button 
          onClick={handleResumeDownload}
          className="mt-6 bg-dark dark:bg-light text-light dark:text-dark px-6 py-3 rounded font-medium hover:bg-gray-700 dark:hover:bg-gray-200 transition-all duration-300"
        >
          Download Resume
        </button>
      </div>
    </section>
  );
};

export default HeroSection;