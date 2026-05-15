export const runtime = "nodejs";

import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { Ribbon } from "@/components/ui/Ribbon";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { DEFAULT_IMAGE } from "@/lib/constants";
import TrackedArticleLink from "@/components/analytics/TrackedArticleLink";

export default async function Home() {
  const [heroPost, latestPosts, popularPosts] = await Promise.all([
    prisma.post.findFirst({
      where: { status: 'PUBLISHED' },
      orderBy: { createdAt: 'desc' },
      include: { category: true, author: true }
    }),
    prisma.post.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { createdAt: 'desc' },
      take: 8,
      skip: 1, // Skip hero
      include: { category: true }
    }),
    prisma.post.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { views: 'desc' },
      take: 5,
      include: { category: true }
    })
  ]);

  return (
    <div className="wired-wrapper" style={{ paddingBottom: 'var(--space-16)' }}>
      <OrganizationJsonLd />

      {/* HERO SECTION */}
      {heroPost && (
        <section style={{ margin: 'var(--space-12) 0', borderBottom: '2px solid var(--black)', paddingBottom: 'var(--space-12)' }}>
          <div className="responsive-grid hero-grid" style={{ gap: 'var(--space-12)', alignItems: 'center' }}>
            <div style={{ order: 2 }}>
              <TrackedArticleLink
                href={`/article/${heroPost.slug}`}
                title={heroPost.title}
                slug={heroPost.slug}
                category={heroPost.category.name}
                cardLocation="homepage_hero"
              >
                <div style={{ position: 'relative', aspectRatio: '16/9', border: '2px solid var(--black)', background: '#f0f0f0' }}>
                  <img
                    src={heroPost.coverImage || DEFAULT_IMAGE}
                    alt={heroPost.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    fetchPriority="high"
                  />
                </div>
              </TrackedArticleLink>
            </div>
            <div style={{ order: 1 }}>
              <Ribbon>Featured Story</Ribbon>
              <TrackedArticleLink
                href={`/article/${heroPost.slug}`}
                title={heroPost.title}
                slug={heroPost.slug}
                category={heroPost.category.name}
                cardLocation="homepage_hero"
              >
                <h2 className="wired-display" style={{ margin: 'var(--space-4) 0 var(--space-6)' }}>
                  {heroPost.title}
                </h2>
              </TrackedArticleLink>
              <p className="wired-body" style={{ color: 'var(--caption)', marginBottom: 'var(--space-6)', maxWidth: 'var(--max-w-prose)' }}>
                {heroPost.excerpt || heroPost.body.substring(0, 180) + "..."}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <span className="wired-mono" style={{ fontWeight: 700 }}>By {heroPost.author.name?.toUpperCase() || "Aurews"}</span>
                <span style={{ color: 'var(--hairline)' }}>|</span>
                <span className="wired-mono" style={{ color: 'var(--caption)' }}>{new Date(heroPost.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* MAIN CONTENT GRID */}
      <div className="feature-layout" style={{ marginTop: 'var(--space-12)' }}>
        {/* LATEST FEED */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-6)', borderBottom: '2px solid var(--black)', paddingBottom: 'var(--space-2)' }}>
            <h3 className="wired-mono" style={{ fontWeight: 700 }}>Latest Feed</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
            {latestPosts.map((post) => (
              <article key={post.id} style={{ display: 'grid', gridTemplateColumns: 'minmax(120px, 1fr) 2fr', gap: 'var(--space-6)', borderBottom: '1px solid var(--hairline)', paddingBottom: 'var(--space-8)' }}>
                <TrackedArticleLink
                  href={`/article/${post.slug}`}
                  title={post.title}
                  slug={post.slug}
                  category={post.category.name}
                  cardLocation="homepage_latest_feed"
                >
                  <div style={{ position: 'relative', aspectRatio: '4/3', background: '#f8f8f8', border: '1px solid var(--hairline)' }}>
                    <img
                      src={post.coverImage || DEFAULT_IMAGE}
                      alt={post.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </TrackedArticleLink>
                <div>
                  <span className="wired-mono" style={{ color: 'var(--blue)', fontWeight: 700 }}>{post.category.name.toUpperCase()}</span>
                  <TrackedArticleLink
                    href={`/article/${post.slug}`}
                    title={post.title}
                    slug={post.slug}
                    category={post.category.name}
                    cardLocation="homepage_latest_feed"
                  >
                    <h4 className="wired-display grid-headline" style={{ margin: 'var(--space-2) 0 var(--space-3)' }}>
                      {post.title}
                    </h4>
                  </TrackedArticleLink>
                  <p className="wired-body hide-mobile" style={{ color: 'var(--caption)' }}>
                    {post.excerpt || post.body.substring(0, 120) + "..."}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SIDEBAR: MOST POPULAR */}
        <aside style={{ marginTop: 'var(--space-12)' }}>
          <div style={{ background: 'var(--black)', color: 'white', padding: 'var(--space-2) var(--space-4)', marginBottom: 'var(--space-6)' }}>
            <h3 className="wired-mono" style={{ fontWeight: 700, margin: 0 }}>Most Popular</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {popularPosts.map((post, i) => (
              <div key={post.id} style={{ display: 'flex', gap: 'var(--space-4)', padding: 'var(--space-4) 0', borderBottom: '1px solid var(--hairline)' }}>
                <span className="wired-display" style={{ fontSize: '40px', color: '#888', fontWeight: 700, lineHeight: 1 }}>0{i + 1}</span>
                <TrackedArticleLink
                  href={`/article/${post.slug}`}
                  title={post.title}
                  slug={post.slug}
                  category={post.category.name}
                  cardLocation="homepage_sidebar_popular"
                  className="hover-link"
                >
                  <h4 className="wired-ui" style={{ lineHeight: 1.2 }}>
                    {post.title}
                  </h4>
                </TrackedArticleLink>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 1023px) {
          .feature-layout aside {
            margin-top: var(--space-16) !important;
          }
          .hero-grid > div {
            order: initial !important;
          }
        }
      `}} />
    </div>
  );
}
