
import { BASE_URL, DEFAULT_IMAGE } from "@/lib/constants";

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

export const NewsArticleJsonLd = ({ post }: { post: { title: string, excerpt?: string | null, coverImage?: string | null, createdAt: string | Date, updatedAt: string | Date, author?: { name: string | null } | null, slug: string } }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": post.title,
    "description": post.excerpt || post.title,
    "image": [post.coverImage || DEFAULT_IMAGE],
    "datePublished": post.createdAt,
    "dateModified": post.updatedAt,
    "author": [{
      "@type": "Person",
      "name": post.author?.name || "Aurews",
      "url": `${BASE_URL}/about`
    }],
    "publisher": {
      "@type": "NewsMediaOrganization",
      "name": "Aurews",
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${BASE_URL}/article/${post.slug}`
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
