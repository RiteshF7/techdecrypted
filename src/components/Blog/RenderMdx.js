"use client"
import React from 'react'
import MDXContent from './MdxContent'
import {
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
} from './MdxComponents'

// Legacy components for backward compatibility
const Alert = ({ children, className = "" }) => {
  return (
    <Callout type="info" className={className}>
      {children}
    </Callout>
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
  return (
    <Tag variant={variant === "default" ? "primary" : "default"}>
      {children}
    </Tag>
  );
};
Badge.displayName = 'Badge';

const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border-2 border-gray-400/30 rounded-xl p-6 ${className}`}>
      {children}
    </div>
  );
};
Card.displayName = 'Card';

const CardHeader = ({ children }) => {
  return (
    <div className="px-6 py-4 border-b border-gray-700">
      {children}
    </div>
  );
};
CardHeader.displayName = 'CardHeader';

const CardTitle = ({ children }) => {
  return (
    <h3 className="text-lg font-semibold text-white">
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
  // Modern components
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
  ImageWithCaption,
  
  // Legacy components for backward compatibility
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
    prose-headings:no-underline
    prose-headings:before:content-none
    prose-headings:after:content-none
    prose-h1:before:content-none
    prose-h1:after:content-none
    prose-h2:before:content-none
    prose-h2:after:content-none
    prose-h3:before:content-none
    prose-h3:after:content-none
    prose-h4:before:content-none
    prose-h4:after:content-none
    prose-h5:before:content-none
    prose-h5:after:content-none
    prose-h6:before:content-none
    prose-h6:after:content-none
    prose-a:no-underline
    prose-a:before:content-none
    prose-a:after:content-none
    
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
    sm:first-letter:text-5xl'
    style={{
      '--tw-prose-headings': 'none',
      '--tw-prose-links': 'none'
    }}> 
        <MDXContent code={blog.body} components={mdxComponents}/>
    </div>
  )
}

export default RenderMdx
