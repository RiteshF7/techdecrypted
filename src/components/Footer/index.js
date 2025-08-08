"use client";
import React, { useState } from 'react';
import { LinkedinIcon, GithubIcon, PortfolioIcon, TwitterIcon } from "../Icons";
import siteMetadata from "@/src/utils/siteMetaData";

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleEmailSubmit = () => {
    if (!email) {
      alert('Please enter an email address');
      return;
    }

    console.log('Email submitted:', email);
    alert('Thanks for subscribing! (Note: This is currently a demo - implement actual email handling)');
    setEmail('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEmailSubmit();
    }
  };

  return (
    <footer className="w-full border-t-2 border-solid border-dark dark:border-light bg-light dark:bg-dark text-dark dark:text-light">
      <div className="w-full px-4 sm:px-6 md:px-12 py-6 sm:py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Top Section - Balanced Layout */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6 mb-8">
            
            {/* Social Links */}
            <div className="flex-1 flex justify-start items-center gap-4">
              <a href={siteMetadata.linkedin} rel="noopener noreferrer" className="inline-block w-6 h-6" aria-label="Reach out to me via LinkedIn" target="_blank">
                <LinkedinIcon className="hover:scale-125 transition-all ease duration-200" />
              </a>
              <a href={siteMetadata.github} rel="noopener noreferrer" className="inline-block w-6 h-6" aria-label="Check my profile on Github" target="_blank">
                <GithubIcon className="hover:scale-125 transition-all ease duration-200 dark:fill-light" />
              </a>
              <a href={siteMetadata.portfolio} rel="noopener noreferrer" className="inline-block w-6 h-6" aria-label="Check my portfolio" target="_blank">
                <PortfolioIcon className="hover:scale-125 transition-all ease duration-200" />
              </a>
              
            </div>


            {/* Email Subscription */}
            <div className="flex-1 w-full md:w-auto">
              <div className="flex items-stretch border-2 border-solid border-dark dark:border-light rounded overflow-hidden max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-transparent border-0 outline-none focus:ring-0 text-dark dark:text-light placeholder:text-gray-500 dark:placeholder:text-gray-400 text-sm"
                />
                <button
                  onClick={handleEmailSubmit}
                  className="bg-dark dark:bg-light text-light dark:text-dark px-4 py-2 font-medium hover:bg-gray-700 dark:hover:bg-gray-200 transition-all duration-200 text-sm"
                >
                  Subscribe
                </button>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                For updates and collaboration opportunities
              </p>
            </div>



            
            {/* Made By Section */}
            <div className="flex-1 text-center md:text-end">
              <div className="mb-3">
                <span className="text-sm font-medium">Made with </span>
                <span className="text-red-500 text-lg inline-block hover:scale-110 transition-transform duration-300">
                  ♥
                </span>
                <span className="text-sm font-medium"> by</span>
              </div>

              <a 
                href="https://github.com/RiteshF7" 
                className="font-bold text-lg hover:underline transition-all duration-300 hover:scale-105 inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ritesh Singh Sohlot
              </a>

              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                © 2025 All rights reserved
              </p>
            </div>



            



          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;