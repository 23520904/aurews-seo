import { BASE_URL } from '@/lib/constants';

export interface SitemapPost {
  slug: string;
  title: string;
  createdAt: Date | string;
}

/**
 * Builds a Google News sitemap XML string.
 *
 * Pure function — no DB access, easily unit testable.
 *
 * @param recentPosts - Posts published within the last 48 hours.
 * @param fallbackPosts - Used when recentPosts is empty (48h fallback).
 *                        Typically the 5 most recent published posts.
 * @returns XML string for the news sitemap.
 */
export function buildNewsSitemap(
  recentPosts: SitemapPost[],
  fallbackPosts: SitemapPost[] = []
): string {
  // The 48h fallback: if no recent posts, use fallback list
  const articles = recentPosts.length > 0 ? recentPosts : fallbackPosts;

  const urlEntries = articles
    .map((a) => {
      const createdAt =
        a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt);

      const safeTitle = a.title
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&apos;');

      return `  <url>
    <loc>${BASE_URL}/article/${a.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>Aurews</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${createdAt.toISOString()}</news:publication_date>
      <news:title>${safeTitle}</news:title>
    </news:news>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urlEntries}
</urlset>`;
}
