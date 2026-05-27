import { BASE_URL, DEFAULT_IMAGE } from '@/lib/constants';

export interface ArticleJsonLdInput {
  title: string;
  slug: string;
  excerpt?: string | null;
  coverImage?: string | null;
  createdAt: string | Date;
  updatedAt?: string | Date;
  author?: { name: string | null } | null;
  category?: { name: string | null } | null;
}

export interface ArticleJsonLd {
  '@context': string;
  '@type': string;
  headline: string;
  description: string;
  image: string[];
  datePublished: string;
  dateModified: string;
  author: { '@type': string; name: string; url: string }[];
  publisher: {
    '@type': string;
    name: string;
    logo: { '@type': string; url: string };
  };
  mainEntityOfPage: string;
}

/**
 * Builds a NewsArticle JSON-LD schema object for SEO.
 * Pure function — can be unit tested without mocking.
 */
export function buildArticleJsonLd(post: ArticleJsonLdInput): ArticleJsonLd {
  const url = `${BASE_URL}/article/${post.slug}`;
  const createdAt =
    post.createdAt instanceof Date
      ? post.createdAt
      : new Date(post.createdAt);
  const updatedAt =
    post.updatedAt
      ? post.updatedAt instanceof Date
        ? post.updatedAt
        : new Date(post.updatedAt)
      : createdAt;

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    description: post.excerpt || post.title,
    image: [post.coverImage || DEFAULT_IMAGE],
    datePublished: createdAt.toISOString(),
    dateModified: updatedAt.toISOString(),
    author: [
      {
        '@type': 'Person',
        name: post.author?.name || 'Aurews',
        url: `${BASE_URL}/about`,
      },
    ],
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: 'Aurews',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: url,
  };
}
