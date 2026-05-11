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
    <div className="wired-wrapper" style={{ paddingBottom: '64px' }}>
      <OrganizationJsonLd />
      
      {/* HERO SECTION */}
      {heroPost && (
        <section style={{ margin: '48px 0', borderBottom: '1px solid var(--wired-black)', paddingBottom: '48px' }}>
          <div className="hero-grid" style={{ display: 'grid', gap: '48px', alignItems: 'start' }}>
            <div>

              <Ribbon>Featured Story</Ribbon>
              <Link href={`/article/${heroPost.slug}`}>
                <h2 className="wired-display" style={{ fontSize: '64px', margin: '16px 0 24px' }}>
                  {heroPost.title}
                </h2>
              </Link>
              <p className="wired-body" style={{ fontSize: '19px', color: 'var(--caption-gray)', marginBottom: '24px' }}>
                {heroPost.excerpt || heroPost.body.substring(0, 180) + "..."}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className="wired-mono" style={{ fontSize: '12px', fontWeight: 700 }}>By {heroPost.author.name?.toUpperCase() || "Aurews Editorial"}</span>
                <span style={{ color: 'var(--hairline-tint)' }}>|</span>
                <span className="wired-mono" style={{ fontSize: '12px', color: 'var(--caption-gray)' }}>{new Date(heroPost.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            {heroPost.coverImage && (
              <div style={{ position: 'relative', aspectRatio: '16/9', border: '2px solid var(--wired-black)' }}>
                 <img 
                    src={heroPost.coverImage} 
                    alt={heroPost.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                 />
              </div>
            )}
          </div>
        </section>
      )}

      {/* MAIN CONTENT GRID */}
      <div className="home-grid" style={{ display: 'grid', gap: '64px', marginTop: '48px' }}>
        {/* LATEST FEED */}

        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px', borderBottom: '2px solid var(--wired-black)', paddingBottom: '8px' }}>
            <h3 className="wired-mono" style={{ fontSize: '18px', fontWeight: 700 }}>Latest Feed</h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {latestPosts.map((post) => (
              <article key={post.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '24px', borderBottom: '1px solid var(--hairline-tint)', paddingBottom: '32px' }}>
                <div style={{ position: 'relative', aspectRatio: '4/3', background: '#f8f8f8', border: '1px solid var(--hairline-tint)' }}>
                   {post.coverImage && (
                     <img 
                        src={post.coverImage} 
                        alt={post.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                     />
                   )}
                </div>
                <div>
                  <span className="wired-mono" style={{ fontSize: '11px', color: 'var(--link-blue)', fontWeight: 700 }}>{post.category.name.toUpperCase()}</span>
                  <Link href={`/article/${post.slug}`}>
                    <h4 className="wired-display" style={{ fontSize: '28px', margin: '8px 0 12px' }}>
                      {post.title}
                    </h4>
                  </Link>
                  <p className="wired-body" style={{ fontSize: '15px', color: 'var(--caption-gray)' }}>
                    {post.excerpt || post.body.substring(0, 120) + "..."}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SIDEBAR: MOST POPULAR */}
        <aside>
          <div style={{ background: 'var(--wired-black)', color: 'white', padding: '8px 16px', marginBottom: '24px' }}>
            <h3 className="wired-mono" style={{ fontSize: '14px', fontWeight: 700, margin: 0 }}>Most Popular</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {popularPosts.map((post, i) => (
              <div key={post.id} style={{ display: 'flex', gap: '16px', padding: '16px 0', borderBottom: '1px solid var(--hairline-tint)' }}>
                <span className="wired-display" style={{ fontSize: '40px', color: 'var(--hairline-tint)', fontWeight: 700, lineHeight: 1 }}>0{i + 1}</span>
                <Link href={`/article/${post.slug}`} className="hover-link">
                  <h4 className="wired-ui" style={{ fontSize: '16px', fontWeight: 700, lineHeight: 1.2 }}>
                    {post.title}
                  </h4>
                </Link>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

