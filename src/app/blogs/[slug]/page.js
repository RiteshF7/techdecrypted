import siteMetadata from "@/src/utils/siteMetaData";
import { blogs } from '@/.velite/generated';
import { notFound } from "next/navigation";
import { headers } from 'next/headers';
import MobileBlogPage from "./mobile-page";
import DesktopBlogPage from "./desktop-page";
import PropTypes from "prop-types";
import ViewCounter from "@/src/components/Blog/ViewCounter";

export async function generateStaticParams() {
  const { data: blogs } = await supabase.from("blogs").select("slug");
  return blogs?.map((blog) => ({ slug: blog.slug })) || [];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data: blog } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!blog) {
    return {};
  }

  const publishedAt = new Date(blog.published_at).toISOString();
  const modifiedAt = new Date(blog.updated_at || blog.published_at).toISOString();

  let imageList = [siteMetadata.socialBanner];
  if (blog.image?.src) {
    imageList =
      typeof blog.image.src === "string"
        ? [siteMetadata.siteUrl + blog.image.src]
        : blog.image;
  }
  const ogImages = imageList.map((img) => ({
    url: img.includes("http") ? img : siteMetadata.siteUrl + img,
  }));

  const authors = blog.author ? [blog.author] : [siteMetadata.author];

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: siteMetadata.siteUrl + blog.url,
      siteName: siteMetadata.title,
      locale: "en_US",
      type: "article",
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      images: ogImages,
      authors,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: ogImages,
    },
  };
}

export default async function BlogPage({ params }) {
  const { slug } = await params;
  const { data: blog } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!blog) {
    notFound();
  }

  const headersList = headers();
  const userAgent = headersList.get('user-agent');
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
    "datePublished": new Date(blog.published_at).toISOString(),
    "dateModified": new Date(blog.updated_at || blog.published_at).toISOString(),
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

      <article className="min-h-screen">
        {/* Beautiful background with theme colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50/20 dark:from-slate-950 dark:via-black dark:to-purple-950/20"></div>

        {/* Subtle floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          {/* Main content layout */}
          <div className="w-full px-20 pt-5">
            <div className="flex max-w-full">

              {/* Left Sidebar - Table of Contents */}
              {/* <div className="hidden lg:block w-56 flex-shrink-0"> */}
                {/* <div className="sticky top-24 h-screen overflow-y-auto p-3">
                  <div className="bg-white/60 dark:bg-black/20 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 shadow-lg p-3">

                    <h3 className="font-semibold text-base text-gray-800 dark:text-gray-200 mb-3 pb-2 border-b border-gray-200/50 dark:border-gray-700/50">
                      Contents
                    </h3> */}
{/*
                    {blog.toc && blog.toc.length > 0 ? (
                      <nav className="max-h-[60vh] overflow-y-auto">
                        <ul className="space-y-1">
                          {blog.toc.map((item) => (
                            <TableOfContentsItem key={item.url} item={item} />
                          ))}
                        </ul>
                      </nav>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 text-xs">
                        No sections
                      </p>
                    )} */}

                    {/* Progress indicator */}
                    {/* <div className="mt-3 pt-2 border-t border-gray-200/50 dark:border-gray-700/50">
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></div>
                        <span>Reading</span>
                      </div>
                    </div>
                  </div> */}
                {/* </div>
              </div> */}


  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(userAgent);

  if (isMobile) {
    return <MobileBlogPage blog={blog} />;
  }

  return <DesktopBlogPage blog={blog} />;
              {/* Main Content Area - Optimized width */}
              <div className="flex-1 min-w-0 lg:ml-3">
                <div className="px-3 py-3">
                  <div className="bg-white/80 dark:bg-black/40 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl overflow-hidden">

                    {/* Integrated Blog Details Header */}
                    <div className="px-12 py-12 border-b border-gray-100/50 dark:border-gray-800/50 bg-gradient-to-r from-indigo-50/30 via-white/30 to-purple-50/30 dark:from-indigo-950/20 dark:via-black/20 dark:to-purple-950/20">

                      {/* Title and Description */}
                      <div className="mb-6">
                        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-3 leading-tight">
                          {blog.title}
                        </h1>
                        {blog.description && (
                          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                            {blog.description}
                          </p>
                        )}
                      </div>

                      {/* Metadata Section */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                        {/* Date and Reading Time */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-900/30">
                              <CalendarIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div>
                              <div className="text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wide">
                                Published
                              </div>
                              <time className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                                {format(parseISO(blog.published_at), "LLLL d, yyyy")}
                              </time>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/30">
                              <ClockIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                              <div className="text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wide">
                                Reading Time
                              </div>
                              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                                {readingTime(blog.body).text}
                              </span>
                            </div>
                          </div>
                          <ViewCounter slug={slug} />
                        </div>

                        {/* Category */}
                        <div className="flex items-center">
                          <Link
                            href={`/categories/${slugify(blog.tags[0])}`}
                            className="group inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 hover:from-pink-200 hover:to-rose-200 dark:hover:from-pink-900/50 dark:hover:to-rose-900/50 rounded-xl border border-pink-200/50 dark:border-pink-800/30 transition-all duration-300 hover:scale-105"
                          >
                            <div className="p-1 rounded-lg bg-pink-200 dark:bg-pink-800/50">
                              <TagIcon className="w-3 h-3 text-pink-600 dark:text-pink-400" />
                            </div>
                            <div>
                              <div className="text-xs font-medium text-pink-600/80 dark:text-pink-400/80 uppercase tracking-wide">
                                Category
                              </div>
                              <span className="text-sm font-semibold text-pink-700 dark:text-pink-300 capitalize">
                                {blog.tags[0]}
                              </span>
                            </div>
                          </Link>
                        </div>
                      </div>

                      {/* Bottom gradient line */}
                      <div className="mt-6 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"></div>
                    </div>

                    {/* Article Content */}
                    <div className="px-14 py-14">
                      <div className="prose prose-xl prose-gray dark:prose-invert max-w-none
                        prose-headings:text-gray-900 dark:prose-headings:text-gray-100
                        prose-headings:font-bold prose-headings:leading-tight
                        prose-h1:text-4xl prose-h1:mt-16 prose-h1:mb-8
                        prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                        prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-5
                        prose-h4:text-xl prose-h4:mt-8 prose-h4:mb-4
                        prose-p:text-gray-700 dark:prose-p:text-gray-300
                        prose-p:leading-relaxed prose-p:mb-8 prose-p:text-lg
                        prose-li:text-gray-700 dark:prose-li:text-gray-300
                        prose-li:leading-relaxed prose-li:text-lg prose-li:mb-2
                        prose-a:text-indigo-600 dark:prose-a:text-indigo-400
                        prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                        prose-strong:text-gray-900 dark:prose-strong:text-gray-100
                        prose-strong:font-semibold
                        prose-code:text-gray-800 dark:prose-code:text-gray-200
                        prose-code:bg-gray-100 dark:prose-code:bg-gray-800
                        prose-code:px-2 prose-code:py-1 prose-code:rounded
                        prose-code:text-base prose-code:font-normal
                        prose-pre:bg-gray-50 dark:prose-pre:bg-gray-900
                        prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700
                        prose-pre:rounded-xl prose-pre:p-6 prose-pre:my-8
                        prose-blockquote:border-l-4 prose-blockquote:border-indigo-500
                        prose-blockquote:bg-indigo-50/50 dark:prose-blockquote:bg-indigo-900/20
                        prose-blockquote:pl-8 prose-blockquote:py-6 prose-blockquote:rounded-r-xl
                        prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:my-8
                        prose-img:rounded-xl prose-img:border prose-img:border-gray-200 dark:prose-img:border-gray-700
                        prose-img:shadow-xl prose-img:my-12
                        prose-hr:border-gray-200 dark:prose-hr:border-gray-700
                        prose-hr:my-16
                        prose-table:text-base prose-table:my-8
                        prose-th:bg-gray-50 dark:prose-th:bg-gray-800
                        prose-th:font-semibold prose-th:text-gray-900 dark:prose-th:text-gray-100
                        prose-th:px-4 prose-th:py-3
                        prose-td:text-gray-700 dark:prose-td:text-gray-300
                        prose-td:px-4 prose-td:py-3
                        prose-ol:list-decimal prose-ul:list-disc
                        prose-ol:pl-0 prose-ul:pl-0 prose-ol:my-8 prose-ul:my-8
                        prose-li:pl-2
                      ">
                        <RenderMdx blog={blog} />
                      </div>
                    </div>

                    {/* Beautiful Footer */}
                    <div className="px-6 py-6 bg-gradient-to-r from-gray-50/50 via-white/50 to-indigo-50/50 dark:from-gray-950/30 dark:via-black/30 dark:to-purple-950/30 border-t border-gray-100/50 dark:border-gray-800/50">

                      {/* Completion Status */}
                      <div className="flex items-center justify-center mb-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full border border-green-200/50 dark:border-green-800/30">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium text-green-700 dark:text-green-300">Article completed • Thank you for reading!</span>
                        </div>
                      </div>

                      {/* Tags Section */}
                      <div className="text-center">
                        <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 uppercase tracking-wide">
                          Related Topics
                        </h4>
                        <div className="flex flex-wrap justify-center gap-2">
                          {blog.tags && blog.tags.map((tag, index) => (
                            <Tag
                              key={index}
                              link={`/categories/${slugify(tag)}`}
                              name={tag}
                              className="px-3 py-1 text-sm bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 rounded-full border border-indigo-200/50 dark:border-indigo-800/30 hover:scale-105 hover:shadow-lg transition-all duration-200 font-medium"
                            />
                          ))}
                        </div>
                      </div>

                      {/* Bottom decorative line */}
                      <div className="mt-6 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

BlogPage.propTypes = {
    params: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }).isRequired,
  };