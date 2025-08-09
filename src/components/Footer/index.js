"use client";
import React, { useState } from 'react';
import { LinkedinIcon, GithubIcon, PortfolioIcon, TwitterIcon } from "../Icons";
import siteMetadata from "@/src/utils/siteMetaData";

// Decorative icons
const SparkleIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L13.09 8.26L19 7L13.09 15.74L12 22L10.91 15.74L5 17L10.91 8.26L12 2Z" 
          fill="currentColor" opacity="0.6"/>
  </svg>
);

const HeartIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
          fill="currentColor"/>
  </svg>
);

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailSubmit = async () => {
    if (!email) {
      alert('Please enter an email address');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission delay
    setTimeout(() => {
      console.log('Email submitted:', email);
      alert('Thanks for subscribing! (Note: This is currently a demo - implement actual email handling)');
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEmailSubmit();
    }
  };

  return (
    <footer className="relative w-full overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-purple-900/50 to-slate-900/80 dark:from-black dark:via-purple-950/50 dark:to-black/80"></div>
      
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-0 left-1/2 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-12 py-8 sm:py-12 md:py-16">
        {/* Glassmorphism container */}
        <div className="max-w-6xl mx-auto bg-white/5 dark:bg-black/10 backdrop-blur-xl rounded-3xl border border-white/10 dark:border-white/5 shadow-2xl p-6 sm:p-8 md:p-12">
          
          {/* Decorative top border */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full p-0.5">
              <div className="w-full h-full bg-white/10 dark:bg-black/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <SparkleIcon className="w-6 h-6 text-purple-400 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Top Section - Enhanced Layout */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8 mb-8 pt-6">
            
            {/* Social Links - Enhanced */}
            <div className="flex-1 flex justify-start items-center gap-6">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-0 hidden sm:block">Connect</h3>
              
              <div className="flex items-center gap-4">
                <a 
                  href={siteMetadata.linkedin} 
                  rel="noopener noreferrer" 
                  className="group relative p-3 rounded-2xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-110 hover:-translate-y-1" 
                  aria-label="Reach out to me via LinkedIn" 
                  target="_blank"
                >
                  <LinkedinIcon className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-200" />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
                
                <a 
                  href={siteMetadata.github} 
                  rel="noopener noreferrer" 
                  className="group relative p-3 rounded-2xl bg-gray-500/10 hover:bg-gray-500/20 border border-gray-500/20 hover:border-gray-500/40 transition-all duration-300 hover:scale-110 hover:-translate-y-1" 
                  aria-label="Check my profile on Github" 
                  target="_blank"
                >
                  <GithubIcon className="w-5 h-5 text-gray-400 group-hover:text-gray-300 transition-colors duration-200 dark:fill-light" />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gray-500/0 to-gray-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
                
                <a 
                  href={siteMetadata.portfolio} 
                  rel="noopener noreferrer" 
                  className="group relative p-3 rounded-2xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-110 hover:-translate-y-1" 
                  aria-label="Check my portfolio" 
                  target="_blank"
                >
                  <PortfolioIcon className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors duration-200" />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              </div>
            </div>

            {/* Email Subscription - Enhanced */}
            <div className="flex-1 w-full md:w-auto max-w-md">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 text-center">Stay Updated</h3>
              
              <div className="relative group">
                {/* Glowing border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-full h-full bg-white/10 dark:bg-black/20 rounded-2xl"></div>
                </div>
                
                {/* Main input container */}
                <div className="relative flex items-stretch bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-2xl overflow-hidden group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-transparent border-0 outline-none focus:ring-0 text-dark dark:text-light placeholder:text-gray-500 dark:placeholder:text-gray-400 text-sm"
                    disabled={isSubmitting}
                  />
                  <button
                    onClick={handleEmailSubmit}
                    disabled={isSubmitting}
                    className="relative bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-3 font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      'Subscribe'
                    )}
                  </button>
                </div>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
                ✨ For updates and collaboration opportunities
              </p>
            </div>

            {/* Made By Section - Enhanced */}
            <div className="flex-1 text-center md:text-end">
              <div className="mb-4 flex items-center justify-center md:justify-end gap-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Made with</span>
                <div className="relative group">
                  <HeartIcon className="w-5 h-5 text-red-500 group-hover:scale-125 transition-all duration-300 animate-pulse" />
                  <div className="absolute inset-0 bg-red-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">by</span>
              </div>

              <a 
                href="https://github.com/RiteshF7" 
                className="group relative inline-block font-bold text-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ritesh Singh Sohlot
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 group-hover:w-full transition-all duration-500 rounded-full"></div>
                
                {/* Floating sparkles */}
                <SparkleIcon className="absolute -top-2 -right-2 w-3 h-3 text-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-bounce" />
                <SparkleIcon className="absolute -bottom-1 -left-2 w-2 h-2 text-indigo-400 opacity-0 group-hover:opacity-100 transition-all duration-700 animate-bounce delay-200" />
              </a>

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                © 2025 All rights reserved
              </p>
            </div>
          </div>

          {/* Bottom decorative line */}
          <div className="relative mt-8 pt-6 border-t border-white/10 dark:border-white/5">
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
              <span>Built with passion</span>
              <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
              <span>Designed for impact</span>
              <div className="w-1 h-1 bg-indigo-400 rounded-full animate-pulse delay-500"></div>
              <span>Crafted for you</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;