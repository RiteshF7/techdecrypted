import siteMetadata from "@/src/utils/siteMetaData";
import { blogs } from '@/.velite/generated';
import { notFound } from "next/navigation";
import { headers } from 'next/headers';
import MobileBlogPage from "./mobile-page";
import DesktopBlogPage from "./desktop-page";
import PropTypes from "prop-types";

export async function generateStaticParams() {
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = blogs.find((blog) => blog.slug === slug);
  if (!blog) {
    return {};
  }

  const publishedAt = new Date(blog.publishedAt).toISOString();
  const modifiedAt = new Date(blog.updatedAt || blog.publishedAt).toISOString();

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
  const blog = blogs.find((blog) => blog.slug === slug);

  if (!blog) {
    notFound();
  }

  const headersList = headers();
  const userAgent = headersList.get('user-agent');

  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(userAgent);

  if (isMobile) {
    return <MobileBlogPage blog={blog} />;
  }

  return <DesktopBlogPage blog={blog} />;
}

BlogPage.propTypes = {
    params: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }).isRequired,
  };