import React from "react";
import { BASE_URL } from "@/lib/constants";

export const OrganizationJsonLd = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    "name": "Aurews",
    "url": BASE_URL,
    "logo": `${BASE_URL}/logo.png`,
    "sameAs": [
      "https://twitter.com/aurews_news",
      "https://github.com/aurews"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export const NewsArticleJsonLd = ({ post }: { post: any }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": post.title,
    "image": [post.coverImage],
    "datePublished": post.createdAt,
    "dateModified": post.updatedAt,
    "author": [{
      "@type": "Person",
      "name": post.author?.name || "Aurews",
      "url": `${BASE_URL}/about`
    }]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
