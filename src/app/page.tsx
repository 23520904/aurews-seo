import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Ribbon } from "@/components/ui/Ribbon";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";

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
    <main className="wired-wrapper" style={{ paddingBottom: '80px' }}>
      <OrganizationJsonLd />

      {/* HERO SECTION - FEATURED ARCHIVE ENTRY */}
      {heroPost && (
        <section aria-label="Featured Story" style={{ margin: 'clamp(32px, 5vw, 64px) 0', paddingBottom: 'clamp(32px, 5vw, 64px)' }} className="rule-thin">
          <div className="hero-grid">
            <article>
              <Ribbon>Featured Story</Ribbon>
              <Link href={`/article/${heroPost.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h2 className="wired-display" style={{ margin: '16px 0 24px' }}>
                  {heroPost.title}
                </h2>
              </Link>
              <p className="wired-body" style={{ color: 'var(--caption-gray)', marginBottom: '32px', maxWidth: '60ch' }}>
                {heroPost.excerpt || heroPost.body.substring(0, 180) + "..."}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span className="wired-mono" style={{ fontSize: '11px' }}>By {heroPost.author.name?.toUpperCase() || "Aurews"}</span>
                <span className="rule-thin" style={{ width: '20px', transform: 'rotate(90deg)' }}></span>
                <time className="wired-mono" style={{ fontSize: '11px', color: 'var(--caption-gray)' }} dateTime={heroPost.createdAt.toISOString()}>
                  {new Date(heroPost.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </time>
              </div>
            </article>

            {heroPost.coverImage && (
              <figure style={{ margin: 0, position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }} className="rule-thick">
                <img
                  src={heroPost.coverImage}
                  alt={`Cover for ${heroPost.title}`}
                  loading="eager"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </figure>
            )}
          </div>
        </section>
      )}

      {/* PRIMARY FEED ARCHITECTURE */}
      <div className="home-grid" style={{ marginTop: 'clamp(48px, 8vw, 80px)' }}>
        
        {/* LATEST ENTRIES FEED */}
        <section aria-label="Latest News Feed">
          <header style={{ marginBottom: '32px', paddingBottom: '8px' }} className="rule-thick">
            <h3 className="wired-mono" style={{ fontSize: '16px', margin: 0 }}>Latest Archive Entries</h3>
          </header>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
            {latestPosts.map((post) => (
              <article key={post.id} className="feed-item">
                <div className="feed-grid">
                  <figure style={{ margin: 0, position: 'relative', aspectRatio: '4/3', background: 'var(--paper-tint)' }} className="rule-thin">
                    {post.coverImage && (
                      <img
                        src={post.coverImage}
                        alt={`Thumbnail for ${post.title}`}
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    )}
                  </figure>
                  <div>
                    <span className="wired-mono" style={{ fontSize: '10px', color: 'var(--link-blue)' }}>{post.category.name.toUpperCase()}</span>
                    <Link href={`/article/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <h4 className="wired-display" style={{ fontSize: 'clamp(20px, 4vw, 32px)', margin: '12px 0' }}>
                        {post.title}
                      </h4>
                    </Link>
                    <p className="wired-body" style={{ fontSize: '0.95rem', color: 'var(--caption-gray)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {post.excerpt || post.body.substring(0, 140) + "..."}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SIDEBAR ARCHIVE: POPULARITY METRIC */}
        <aside aria-label="Most Popular Posts">
          <div style={{ background: 'var(--wired-black)', color: 'white', padding: '12px 20px', marginBottom: '32px' }}>
            <h3 className="wired-mono" style={{ fontSize: '13px', margin: 0 }}>Aggregated Popularity</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {popularPosts.map((post, i) => (
              <div key={post.id} style={{ display: 'flex', gap: '20px', padding: '20px 0' }} className="rule-thin">
                <span className="wired-display" style={{ fontSize: '48px', color: 'var(--hairline-tint)', lineHeight: 0.8 }}>{i + 1}</span>
                <Link href={`/article/${post.slug}`} className="hover-link" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h4 className="wired-ui" style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>
                    {post.title}
                  </h4>
                </Link>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .feed-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        @media (min-width: 640px) {
          .feed-grid {
            grid-template-columns: 240px 1fr;
          }
        }
      `}} />
    </main>
  );
}


