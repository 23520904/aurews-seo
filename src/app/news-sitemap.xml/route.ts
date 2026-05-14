import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { BASE_URL } from '@/lib/constants';

export const dynamic = 'force-dynamic';

export async function GET() {
  const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000); // 48 hours ago

  const articles = await prisma.post.findMany({
    where: {
      status: 'PUBLISHED',
      createdAt: { gte: cutoff },
    },
    select: {
      slug: true,
      title: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 1000,
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${articles
  .map(
    (a) => `  <url>
    <loc>${BASE_URL}/article/${a.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>Aurews</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${a.createdAt.toISOString()}</news:publication_date>
      <news:title>${a.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</news:title>
    </news:news>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  });
}
