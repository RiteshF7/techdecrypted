"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { DribbbleIcon, GithubIcon, LinkedinIcon, PhoneIcon, PortfolioIcon, TwitterIcon } from "../Icons";
import Link from "next/link";
import siteMetadata from "@/src/utils/siteMetaData";

const Footer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <footer className="mt-16 rounded-2xl bg-dark dark:bg-accentDark/90 m-2 sm:m-10 flex flex-col items-center text-light dark:text-dark">
      <h3 className="mt-16 font-medium dark:font-bold text-center capitalize text-2xl sm:text-3xl lg:text-4xl px-4">
        Interesting Stories | Updates | Guides
      </h3>
      <p className="mt-5 px-4 text-center w-full sm:w-3/5 font-light dark:font-medium text-sm sm:text-base">
      
      I’m Android architect, Electronics enthusiast, and startup builder.
      Always up for swapping ideas on clean code, smart design, and products that actually matter.
      Let’s connect and build cool stuff.
      
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 w-fit sm:min-w-[384px] flex items-stretch bg-light dark:bg-dark p-1 sm:p-2 rounded mx04"
      >
        <input
          type="email"
          placeholder="Enter your email"
          {...register("email", { required: true, maxLength: 80 })}
          className="w-full bg-transparent pl-2 sm:pl-0 text-dark focus:border-dark focus:ring-0 border-0 border-b mr-2 pb-1"
        />

        <input
          type="submit"
          className="bg-dark text-light dark:text-dark dark:bg-light cursor-pointer font-medium rounded px-3 sm:px-5 py-1"
        />
      </form>
      <div className="flex items-center mt-8">
        <a
          href={siteMetadata.linkedin}
          className="inline-block w-6 h-6 mr-4"
          aria-label="Reach out to me via LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedinIcon className="hover:scale-125 transition-all ease duration-200" />
        </a>
        <a
          href={siteMetadata.phone}
          className="inline-block w-6 h-6 mr-4"
          aria-label="Reach out to me via Twitter"
          target="_blank"
          rel="noopener noreferrer"
        >
          <PhoneIcon className="hover:scale-125 transition-all ease duration-200" />
        </a>
        <a
          href={siteMetadata.github}
          className="inline-block w-6 h-6 mr-4 fill-light"
          aria-label="Check my profile on Github"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon className="fill-light dark:fill-dark  hover:scale-125 transition-all ease duration-200" />
        </a>
        <a
          href={siteMetadata.portfolio}
          className="inline-block w-6 h-6 mr-4"
          aria-label="Check my profile on Dribbble"
          target="_blank"
          rel="noopener noreferrer"
        >
          <PortfolioIcon className="hover:scale-125 transition-all ease duration-200" />
        </a>
      </div>

    <div className="w-full mt-8 md:mt-12 relative font-medium border-t border-white/30 py-6 px-8 flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-yellow-400/10 via-orange-300/10 to-yellow-400/10 overflow-hidden">
  <div className="text-center relative group">
    <div className="mb-2">
      <span className="text-amber-900 text-lg font-medium">Made with </span>
      <span className="text-red-500 text-xl inline-block transform hover:scale-110 transition-transform duration-500 animate-pulse">
        ♥
      </span>
      <span className="text-amber-900 text-lg font-medium"> by</span>
    </div>
    <a 
      href="" 
      className="text-amber-800 text-xl font-bold hover:text-amber-700 transition-all duration-500 hover:scale-105 transform inline-block relative group/name" 
      target="_blank"
    >
      Ritesh Singh Sohlot
      <div className="absolute inset-0 opacity-0 group-hover/name:opacity-100 transition-opacity duration-700 pointer-events-none">
        <span className="absolute top-0 left-2 text-yellow-400 text-xs opacity-60 animate-ping">✨</span>
        <span className="absolute top-1 right-4 text-amber-400 text-xs opacity-40 animate-ping" style={{animationDelay: '0.8s'}}>✨</span>
        <span className="absolute -top-1 left-1/2 text-orange-400 text-xs opacity-50 animate-ping" style={{animationDelay: '1.6s'}}>✨</span>
      </div>
      <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 w-0 group-hover/name:w-full transition-all duration-500"></div>
    </a>
    <div className="mt-3 flex justify-center space-x-2 opacity-40">
      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce"></div>
      <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
    </div>
  </div>
</div>

    
    </footer>
  );
};

export default Footer;
