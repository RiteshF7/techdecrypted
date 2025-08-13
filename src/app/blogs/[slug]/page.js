import siteMetadata from "@/src/utils/siteMetaData";
import { createClient } from "@/src/utils/supabase/server";
import { supabasePublic } from "@/src/utils/supabase/public";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import MobileBlogPage from "./mobile-page";
import DesktopBlogPage from "./desktop-page";
import PropTypes from "prop-types";

export async function generateStaticParams() {
  const { data: blogs } = await supabasePublic.from("blogs").select("slug");
  return blogs?.map((blog) => ({ slug: blog.slug })) || [];
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const supabase = createClient();
  const { data: blog } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!blog) return {};

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
  const { slug } = params;
  const supabase = createClient();
  const { data: blog } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!blog) {
    notFound();
  }

  const headersList = headers();
  const userAgent = headersList.get("user-agent");
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(userAgent);

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
    headline: blog.title,
    description: blog.description,
    image: imageList,
    datePublished: new Date(blog.published_at).toISOString(),
    dateModified: new Date(blog.updated_at || blog.published_at).toISOString(),
    author: [
      {
        "@type": "Person",
        name: blog.author || siteMetadata.author,
        url: siteMetadata.twitter,
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
              {isMobile ? (
                <MobileBlogPage blog={blog} />
              ) : (
                <DesktopBlogPage blog={blog} />
              )}
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