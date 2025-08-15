import { format, parseISO } from "date-fns";
import RenderMdx from "@/src/components/Blog/RenderMdx";
import Tag from "@/src/components/Elements/Tag";
import { slug as slugify } from "github-slugger";
import siteMetadata from "@/src/utils/siteMetaData";
import Link from "next/link";
import PropTypes from "prop-types";
import ViewCounter from "@/src/components/Blog/ViewCounter";

// Icons for metadata
const CalendarIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
      <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
      <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
      <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );

  const ClockIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

export default function MobileBlogPage({ blog }) {
    let imageList = [siteMetadata.socialBanner];
    if (blog.image?.src) {
      imageList =
        typeof blog.image.src === "string"
          ? [siteMetadata.siteUrl + blog.image.src]
          : blog.image;
    }

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": blog.title,
      "description": blog.description,
      "image": imageList,
      "datePublished": new Date(blog.publishedAt).toISOString(),
      "dateModified": new Date(blog.updatedAt || blog.publishedAt).toISOString(),
      "author": [
        {
          "@type": "Person",
          "name": blog.author || siteMetadata.author,
          "url": siteMetadata.twitter,
        },
      ],
    };

  return (
      <>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <article className="px-4 sm:px-6 py-8">
        <div className="max-w-3xl mx-auto">
            {/* Title and Description */}
            <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {blog.title}
            </h1>
            {blog.description && (
                <p className="text-lg text-gray-600 dark:text-gray-400">
                {blog.description}
                </p>
            )}
            </div>

            {/* Metadata Section */}
            <div className="flex justify-center items-center gap-6 mb-8 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-indigo-500" />
                    <time>
                    {format(parseISO(blog.publishedAt), "LLLL d, yyyy")}
                    </time>
                </div>
                <div className="flex items-center gap-2">
                    <ClockIcon className="w-5 h-5 text-purple-500" />
                    <span>{blog.readingTime.text}</span>
                </div>
                <div className="flex items-center gap-2">
                    <ClockIcon className="w-5 h-5 text-green-500" />
                    <ViewCounter slug={blog.slug} />
                </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
            <RenderMdx blog={blog} />
            </div>

            {/* Tags Section */}
            {blog.tags && (
                <div className="mt-12">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
                    Related Topics
                </h4>
                <div className="flex flex-wrap justify-center gap-3">
                    {blog.tags.map((tag, index) => (
                    <Tag
                        key={index}
                        link={`/categories/${slugify(tag)}`}
                        name={tag}
                        className="px-4 py-2 text-base"
                    />
                    ))}
                </div>
                </div>
            )}
        </div>
        </article>
    </>
  );
}

MobileBlogPage.propTypes = {
    blog: PropTypes.object.isRequired,
};
