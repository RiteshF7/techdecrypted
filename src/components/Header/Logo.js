import Image from "next/image"
import Link from "next/link"
import profileImg from "@/public/profile-img.jpg"

const Logo = () => {
  return (
    <Link 
      href="/" 
      className="flex items-center text-dark dark:text-light group transition-all duration-500 hover:scale-105"
    >
      {/* Enhanced Profile Image Container */}
      <div className="relative w-12 md:w-16 h-12 md:h-16 mr-3 md:mr-4">
        {/* Animated gradient border */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-0.5 animate-spin-slow">
          <div className="w-full h-full rounded-full bg-white dark:bg-black"></div>
        </div>
        
        {/* Glowing backdrop */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 blur-md group-hover:blur-lg transition-all duration-500 animate-pulse"></div>
        
        {/* Main image container */}
        <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/20 dark:border-white/10 backdrop-blur-sm bg-white/10 dark:bg-black/10 shadow-2xl group-hover:shadow-purple-500/25 transition-all duration-500">
          {/* Inner glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-transparent to-black/20 pointer-events-none"></div>
          
          {/* Profile Image */}
          <Image 
            src={profileImg} 
            alt="Ritesh Singh logo" 
            className="w-full h-full object-cover rounded-full transition-all duration-500 group-hover:scale-110 group-hover:brightness-110" 
            sizes="20vw" 
            priority 
          />
          
          {/* Hover overlay */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 transition-all duration-500"></div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-bounce"></div>
        <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 animate-bounce delay-200"></div>
        <div className="absolute top-1/2 -right-2 w-1 h-1 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-600 animate-bounce delay-100"></div>
      </div>
      
      {/* Enhanced Name Text */}
      <div className="relative">
        {/* Text glow effect */}
        <div className="absolute inset-0 font-bold text-lg md:text-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent opacity-0 group-hover:opacity-30 transition-all duration-500 blur-sm">
          Ritesh Sohlot
        </div>
        
        {/* Main text */}
        <span className="relative font-bold dark:font-semibold text-lg md:text-xl bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent group-hover:from-indigo-600 group-hover:via-purple-600 group-hover:to-pink-600 dark:group-hover:from-indigo-400 dark:group-hover:via-purple-400 dark:group-hover:to-pink-400 transition-all duration-500">
          Ritesh Sohlot
        </span>
        
        {/* Underline effect */}
        <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 group-hover:w-full transition-all duration-500 rounded-full"></div>
        
        {/* Sparkle effects */}
        <div className="absolute -top-2 left-1/4 w-1 h-1 bg-indigo-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-ping"></div>
        <div className="absolute -top-1 right-1/4 w-0.5 h-0.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 animate-ping delay-300"></div>
      </div>
    </Link>
  )
}

export default Logo

// Add this to your global CSS file for the slow spin animation
/* 
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 3s linear infinite;
}
*/