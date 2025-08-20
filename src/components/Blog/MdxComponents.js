"use client"
import React from 'react'
import Image from 'next/image'

// Modern Callout Box Component
const Callout = ({ 
  children, 
  type = "info", 
  title, 
  className = "" 
}) => {
  const variants = {
    info: {
      bg: "from-blue-900/10 to-cyan-900/10",
      border: "border-blue-400/20",
      icon: "💡",
      iconBg: "from-purple-400 to-pink-400",
      titleColor: "text-blue-300"
    },
    warning: {
      bg: "from-amber-900/10 to-orange-900/10", 
      border: "border-amber-400/20",
      icon: "⚠️",
      iconBg: "from-amber-400 to-orange-400",
      titleColor: "text-amber-300"
    },
    success: {
      bg: "from-emerald-900/10 to-green-900/10",
      border: "border-emerald-400/20", 
      icon: "✅",
      iconBg: "from-yellow-400 to-pink-400",
      titleColor: "text-emerald-300"
    },
    error: {
      bg: "from-red-900/10 to-pink-900/10",
      border: "border-red-400/20",
      icon: "❌", 
      iconBg: "from-red-400 to-pink-400",
      titleColor: "text-red-300"
    },
    love: {
        bg: "from-red-900/10 to-pink-900/10",
        border: "border-red-400/20",
        icon: "💖", 
        iconBg: "from-purple-400 to-pink-400",
        titleColor: "text-red-300"
      }
  }

  const variant = variants[type]

  return (
    <div className={`
      bg-gradient-to-br ${variant.bg} 
      backdrop-blur-sm ${variant.border} 
      rounded-xl p-4 sm:p-6 mb-6 
      relative overflow-hidden group
      hover:shadow-lg transition-all duration-300
      ${className}
    `}>
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        {title && (
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-8 h-8 bg-gradient-to-r ${variant.iconBg} rounded-full flex items-center justify-center text-white text-sm font-bold`}>
              {variant.icon}
            </div>
            <span className={`font-semibold text-sm uppercase tracking-wider ${variant.titleColor}`}>
              {title}
            </span>
          </div>
        )}
        <div className="text-gray-200 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  )
}

// Modern Quote Component
const Quote = ({ 
  children, 
  author, 
  source,
  className = "" 
}) => {
  return (
    <div className={`
      bg-gradient-to-r from-gray-900/80 to-black/80 
      backdrop-blur-xl border-l-4 border-purple-400 
      rounded-r-xl p-6 my-8 relative overflow-hidden group
      hover:border-purple-300 transition-all duration-300
      ${className}
    `}>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="flex items-start gap-4">
          <div className="w-1 h-16 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full flex-shrink-0" />
          <blockquote className="text-lg sm:text-xl italic text-gray-200 leading-relaxed">
            &ldquo;{children}&rdquo;
          </blockquote>
        </div>
        {(author || source) && (
          <div className="mt-4 text-right">
            {author && <cite className="text-purple-300 font-medium">{author}</cite>}
            {source && <div className="text-gray-400 text-sm">{source}</div>}
          </div>
        )}
      </div>
    </div>
  )
}

// Modern Tag/Badge Component
const Tag = ({ 
  children, 
  variant = "default",
  className = "" 
}) => {
  const variants = {
    default: "from-gray-500/20 to-gray-600/20 border-gray-400/30 text-gray-200",
    primary: "from-blue-500/20 to-cyan-500/20 border-blue-400/30 text-blue-200",
    success: "from-emerald-500/20 to-green-500/20 border-emerald-400/30 text-emerald-200",
    warning: "from-amber-500/20 to-orange-500/20 border-amber-400/30 text-amber-200",
    danger: "from-red-500/20 to-pink-500/20 border-red-400/30 text-red-200",
    purple: "from-purple-500/20 to-pink-500/20 border-purple-400/30 text-purple-200"
  }

  return (
    <span className={`
      inline-flex items-center gap-2 px-3 py-1.5 
      bg-gradient-to-r ${variants[variant]}
      border rounded-full text-sm font-medium 
      backdrop-blur-sm hover:scale-105 transition-transform duration-200
      ${className}
    `}>
      {children}
    </span>
  )
}

// Modern Tag Group Component
const TagGroup = ({ 
  children, 
  className = "" 
}) => {
  return (
    <div className={`flex flex-wrap gap-2 sm:gap-3 my-6 ${className}`}>
      {children}
    </div>
  )
}

// Modern Stats Card Component
const StatsCard = ({ 
  title, 
  value, 
  description, 
  icon,
  variant = "default",
  className = "" 
}) => {
  const variants = {
    default: "from-gray-900/80 to-black/80 border-gray-400/30",
    primary: "from-blue-900/80 to-cyan-900/80 border-blue-400/30",
    success: "from-emerald-900/80 to-green-900/80 border-emerald-400/30",
    warning: "from-amber-900/80 to-orange-900/80 border-amber-400/30",
    purple: "from-purple-900/80 to-pink-900/80 border-purple-400/30"
  }

  return (
    <div className={`
      bg-gradient-to-br ${variants[variant]} 
      backdrop-blur-xl border-2 rounded-xl p-4 sm:p-6 
      group hover:border-opacity-60 transition-all duration-300
      ${className}
    `}>
      <div className="flex items-center gap-3 mb-3">
        {icon && (
          <div className="w-8 h-8 bg-gradient-to-r from-white/20 to-transparent rounded-full flex items-center justify-center text-lg">
            {icon}
          </div>
        )}
        <h4 className="font-bold text-white text-sm sm:text-base">{title}</h4>
      </div>
      <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{value}</div>
      {description && (
        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{description}</p>
      )}
    </div>
  )
}

// Modern Stats Grid Component
const StatsGrid = ({ 
  children, 
  cols = 2,
  className = "" 
}) => {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2", 
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
  }

  return (
    <div className={`grid ${gridCols[cols]} gap-4 sm:gap-6 my-8 ${className}`}>
      {children}
    </div>
  )
}

// Modern Table Component
const Table = ({ 
  children, 
  className = "" 
}) => {
  return (
    <div className={`
      bg-gradient-to-br from-gray-900/80 to-black/80 
      backdrop-blur-xl border-2 border-purple-400/30 
      rounded-xl overflow-hidden my-8 group
      ${className}
    `}>
      <div className="overflow-x-auto">
        <table className="w-full">
          {children}
        </table>
      </div>
    </div>
  )
}

const TableHeader = ({ children, className = "" }) => (
  <thead className={className}>
    <tr className="border-b border-gray-700">
      {children}
    </tr>
  </thead>
)

const TableHeaderCell = ({ children, className = "" }) => (
  <th className={`text-left p-4 font-semibold text-purple-300 text-sm uppercase tracking-wider ${className}`}>
    {children}
  </th>
)

const TableBody = ({ children, className = "" }) => (
  <tbody className={className}>
    {children}
  </tbody>
)

const TableRow = ({ children, className = "" }) => (
  <tr className={`border-b border-gray-800 hover:bg-purple-900/10 transition-colors duration-300 ${className}`}>
    {children}
  </tr>
)

const TableCell = ({ children, className = "" }) => (
  <td className={`p-4 ${className}`}>
    {children}
  </td>
)

// Modern Code Block Component
const CodeBlock = ({ 
  children, 
  language = "text",
  title,
  className = "" 
}) => {
  return (
    <div className={`
      bg-gradient-to-br from-gray-900/90 to-black/90 
      backdrop-blur-xl border-2 border-gray-700/50 
      rounded-xl overflow-hidden my-6 group
      ${className}
    `}>
      {title && (
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 px-4 py-2 border-b border-gray-700/50">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-red-400 rounded-full" />
              <div className="w-3 h-3 bg-yellow-400 rounded-full" />
              <div className="w-3 h-3 bg-green-400 rounded-full" />
            </div>
            <span className="text-gray-300 text-sm font-medium">{title}</span>
            {language && (
              <span className="ml-auto text-gray-400 text-xs">{language}</span>
            )}
          </div>
        </div>
      )}
      <div className="p-4 overflow-x-auto">
        <pre className="text-gray-200 text-sm leading-relaxed">
          <code>{children}</code>
        </pre>
      </div>
    </div>
  )
}

// Modern Divider Component
const Divider = ({ 
  text, 
  className = "" 
}) => {
  return (
    <div className={`flex items-center my-8 ${className}`}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
      {text && (
        <span className="px-4 text-gray-400 text-sm font-medium">{text}</span>
      )}
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
    </div>
  )
}

// Modern Image Component with Caption
const ImageWithCaption = ({ 
  src, 
  alt, 
  caption,
  className = "" 
}) => {
  return (
    <figure className={`my-8 ${className}`}>
      <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden">
        <Image 
          src={src} 
          alt={alt} 
          width={800}
          height={600}
          className="w-full h-auto object-cover"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-gray-400 text-sm italic">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

// Export all components
export {
  Callout,
  Quote,
  Tag,
  TagGroup,
  StatsCard,
  StatsGrid,
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  CodeBlock,
  Divider,
  ImageWithCaption
}
