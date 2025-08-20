"use client"
import React from 'react'
import MDXContent from './MdxContent'

// Custom components for MDX
const Alert = ({ children, className = "" }) => {
  return (
    <div className={`border border-blue-200 bg-blue-50 p-4 rounded-lg ${className}`}>
      {children}
    </div>
  );
};
Alert.displayName = 'Alert';

const AlertDescription = ({ children }) => {
  return (
    <div className="text-blue-800">
      {children}
    </div>
  );
};
AlertDescription.displayName = 'AlertDescription';

const Badge = ({ children, variant = "default" }) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    secondary: "bg-gray-200 text-gray-700"
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
};
Badge.displayName = 'Badge';

const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}>
      {children}
    </div>
  );
};
Card.displayName = 'Card';

const CardHeader = ({ children }) => {
  return (
    <div className="px-6 py-4 border-b border-gray-200">
      {children}
    </div>
  );
};
CardHeader.displayName = 'CardHeader';

const CardTitle = ({ children }) => {
  return (
    <h3 className="text-lg font-semibold text-gray-900">
      {children}
    </h3>
  );
};
CardTitle.displayName = 'CardTitle';

const CardContent = ({ children, className = "" }) => {
  return (
    <div className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  );
};
CardContent.displayName = 'CardContent';

const mdxComponents = {
  Alert,
  AlertDescription,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
}

const RenderMdx = ({blog}) => {
  return (
    <div className='col-span-12  lg:col-span-8 font-in prose sm:prose-base md:prose-lg max-w-max
    prose-blockquote:bg-accent/20 
    prose-blockquote:p-2
    prose-blockquote:px-6
    prose-blockquote:border-accent
    prose-blockquote:not-italic
    prose-blockquote:rounded-r-lg

    prose-figure:relative
    prose-figcaption:mt-1
    prose-figcaption:mb-2

    prose-li:marker:text-accent

    dark:prose-invert
    dark:prose-blockquote:border-accentDark
    dark:prose-blockquote:bg-accentDark/20
    dark:prose-li:marker:text-accentDark

    first-letter:text-3xl
    sm:first-letter:text-5xl'> 
        <MDXContent code={blog.body} components={mdxComponents}/>
    </div>
  )
}

export default RenderMdx
