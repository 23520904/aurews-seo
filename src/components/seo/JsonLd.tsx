import React from "react";

export const OrganizationJsonLd = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    "name": "Aurews",
    "url": "https://aurews.id.vn",
    "logo": "https://aurews.id.vn/logo.png",
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
      "name": post.author?.name || "Aurews Editorial",
      "url": "https://aurews.id.vn/about"
    }]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
