"use client";
import Link from "next/link";
import Logo from "./Logo";
import { DribbbleIcon, GithubIcon, LinkedinIcon, MoonIcon, PhoneIcon, PortfolioIcon, SunIcon, TwitterIcon } from "../Icons";
import siteMetadata from "@/src/utils/siteMetaData";
import { useThemeSwitch } from "../Hooks/useThemeSwitch";
import { useState, useEffect } from "react";
import { cx } from "@/src/utils";
import { createClient } from "@/src/utils/supabase/client";

// Minimal decorative icons as SVG components
const SparkleIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L13.09 8.26L19 7L13.09 15.74L12 22L10.91 15.74L5 17L10.91 8.26L12 2Z" 
          fill="currentColor" opacity="0.6"/>
  </svg>
);

const DiamondIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 3H18L22 9L12 21L2 9L6 3Z" fill="currentColor" opacity="0.4"/>
  </svg>
);

const Header = () => {
  const [mode, setMode] = useThemeSwitch();
  const [click, setClick] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
  }, [supabase.auth]);

  // Add scroll effect for enhanced transparency
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggle = () => {
    setClick(!click)
  }

  return (
    <header className="w-full p-4 px-5 sm:px-10 flex items-center justify-between relative">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <SparkleIcon className="absolute top-2 left-1/4 w-3 h-3 text-indigo-400 animate-pulse" />
        <DiamondIcon className="absolute top-4 right-1/3 w-2 h-2 text-pink-400 animate-bounce" />
        <SparkleIcon className="absolute bottom-2 right-1/4 w-4 h-4 text-purple-400 animate-pulse delay-1000" />
      </div>

      <Logo />

      {/* Enhanced hamburger menu */}
      <button 
        className="inline-block sm:hidden z-50 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300" 
        onClick={toggle} 
        aria-label="Hamburger Menu"
      >
        <div className="w-6 cursor-pointer transition-all ease duration-300">
          <div className="relative">
            <span className="absolute top-0 inline-block w-full h-0.5 bg-dark dark:bg-light rounded transition-all ease duration-300" 
              style={{
                transform: click ? "rotate(-45deg) translateY(0)" : "rotate(0deg) translateY(6px)"
              }}
            >&nbsp;</span>
            <span className="absolute top-0 inline-block w-full h-0.5 bg-dark dark:bg-light rounded transition-all ease duration-300"
              style={{
                opacity: click ? 0 : 1
              }}
            >&nbsp;</span>
            <span className="absolute top-0 inline-block w-full h-0.5 bg-dark dark:bg-light rounded transition-all ease duration-300"
              style={{
                transform: click ? "rotate(45deg) translateY(0)" : "rotate(0deg) translateY(-6px)"
              }}
            >&nbsp;</span>
          </div>
        </div>
      </button>

      {/* Mobile Navigation - Enhanced */}
      <nav
        className={cx(
          "w-max py-4 px-8 border border-white/20 rounded-2xl font-medium capitalize items-center flex sm:hidden",
          "fixed top-6 right-1/2 translate-x-1/2 z-50 text-dark dark:text-light",
          "bg-white/10 dark:bg-black/10 backdrop-blur-xl",
          "shadow-2xl shadow-black/10 dark:shadow-white/5",
          "transition-all ease-out duration-500",
          "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-indigo-500/20 before:via-purple-500/20 before:to-pink-500/20 before:-z-10",
          scrolled ? "bg-white/15 dark:bg-black/15" : ""
        )}
        style={{
          top: click ? "1.5rem" : "-6rem"
        }}
      >
        <SparkleIcon className="w-3 h-3 mr-3 text-indigo-400" />
        <Link href="/" className="mx-3 hover:text-indigo-500 transition-colors duration-200 relative group">
          Home
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link href="/about" className="mx-3 hover:text-purple-500 transition-colors duration-200 relative group">
          About
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link href="/experience" className="mx-3 hover:text-pink-500 transition-colors duration-200 relative group">
          Experience
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-indigo-500 transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link href="/contact" className="ml-3 hover:text-indigo-500 transition-colors duration-200 relative group">
          Contact
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
        </Link>
        {user && (
          <Link href="/admin/upload" className="ml-3 hover:text-indigo-500 transition-colors duration-200 relative group">
            Dashboard
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        )}
        <DiamondIcon className="w-3 h-3 ml-3 text-pink-400" />
      </nav>

      {/* Desktop Navigation - Enhanced */}
      <nav className={cx(
        "w-max py-4 px-10 border border-white/20 dark:border-white/10 rounded-2xl font-medium capitalize items-center hidden sm:flex",
        "fixed top-6 right-1/2 translate-x-1/2 z-50",
        "bg-white/10 dark:bg-black/10 backdrop-blur-xl",
        "shadow-2xl shadow-black/10 dark:shadow-white/5",
        "transition-all duration-500 ease-out",
        "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-indigo-500/10 before:via-purple-500/10 before:to-pink-500/10 before:-z-10",
        "after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-r after:from-transparent after:via-white/5 after:to-transparent after:-z-10",
        scrolled ? "bg-white/15 dark:bg-black/15 shadow-3xl" : ""
      )}>
        {/* Decorative elements */}
        <SparkleIcon className="w-4 h-4 mr-4 text-indigo-400 animate-pulse" />
        
        <Link href="/" className="mx-4 hover:text-indigo-500 transition-all duration-300 relative group">
          Home
          <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
        </Link>
        
        <div className="w-px h-4 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-2"></div>
        
        <Link href="/about" className="mx-4 hover:text-purple-500 transition-all duration-300 relative group">
          About
          <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
        </Link>
        
        <div className="w-px h-4 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-2"></div>
        
        <Link href="/experience" className="mx-4 hover:text-pink-500 transition-all duration-300 relative group">
          Experience
          <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-red-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
        </Link>
        
        <div className="w-px h-4 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-2"></div>
        
        <Link href="/projects" className="mx-4 hover:text-red-500 transition-all duration-300 relative group">
          Projects
          <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
        </Link>
        
        <div className="w-px h-4 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-2"></div>
        
        <Link href="/contact" className="mx-4 hover:text-orange-500 transition-all duration-300 relative group">
          Contact
          <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-indigo-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
        </Link>
        
        {user && (
          <Link href="/admin/upload" className="mx-4 hover:text-orange-500 transition-all duration-300 relative group">
            Dashboard
            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-indigo-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
          </Link>
        )}

        <DiamondIcon className="w-4 h-4 ml-4 text-pink-400 animate-pulse delay-500" />
      </nav>

      {/* Social Links - Enhanced */}
      <div className="hidden sm:flex items-center space-x-4">
        <div className="flex items-center space-x-3 p-3 rounded-2xl bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg">
          {user ? (
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                window.location.href = "/";
              }}
              className="inline-block px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          ) : (
            <Link href="/login">
              <button className="inline-block px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                Login
              </button>
            </Link>
          )}
          <a 
            href={siteMetadata.linkedin} 
            rel="noopener noreferrer" 
            className="inline-block w-6 h-6 p-1 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 transition-all duration-300 hover:scale-110 hover:rotate-12" 
            aria-label="Reach out to me via LinkedIn" 
            target="_blank"
          >
            <LinkedinIcon className="w-full h-full text-blue-400 hover:text-blue-300 transition-colors duration-200" />
          </a>
          
          <a 
            href={siteMetadata.github} 
            rel="noopener noreferrer" 
            className="inline-block w-6 h-6 p-1 rounded-lg bg-gray-500/20 hover:bg-gray-500/30 transition-all duration-300 hover:scale-110 hover:rotate-12" 
            aria-label="Check my profile on Github" 
            target="_blank"
          >
            <GithubIcon className="w-full h-full text-gray-400 hover:text-gray-300 transition-colors duration-200 dark:fill-light" />
          </a>
          
          <a 
            href={siteMetadata.portfolio} 
            rel="noopener noreferrer" 
            className="inline-block w-6 h-6 p-1 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 transition-all duration-300 hover:scale-110 hover:rotate-12" 
            aria-label="Check my portfolio" 
            target="_blank"
          >
            <PortfolioIcon className="w-full h-full text-purple-400 hover:text-purple-300 transition-colors duration-200" />
          </a>

          {/* Theme toggle button */}
          <button
            onClick={() => setMode(mode === "light" ? "dark" : "light")}
            className="inline-block w-6 h-6 p-1 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/30 transition-all duration-300 hover:scale-110 hover:rotate-180"
            aria-label="Toggle theme"
          >
            {mode === "light" ? 
              <MoonIcon className="w-full h-full text-yellow-400 hover:text-yellow-300 transition-colors duration-200" /> :
              <SunIcon className="w-full h-full text-yellow-400 hover:text-yellow-300 transition-colors duration-200" />
            }
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header;