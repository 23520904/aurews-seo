import { prisma } from "@/lib/prisma";
import { Ribbon } from "@/components/ui/Ribbon";
import Link from "next/link";
export const runtime = 'nodejs';
export default async function LatestPage() {
  const posts = await prisma.post.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { createdAt: 'desc' },
    include: { category: true, author: true },
    take: 20
  });

  return (
    <div className="wired-wrapper">

      <header style={{ marginBottom: '64px', borderBottom: '2px solid var(--wired-black)', paddingBottom: '32px' }}>
        <Ribbon>The Feed</Ribbon>
        <h1 className="wired-display" style={{ fontSize: '72px', margin: '24px 0' }}>Latest Stories</h1>
        <p className="wired-mono" style={{ fontSize: '12px', color: 'var(--caption-gray)' }}>
          REAL-TIME EDITORIAL UPDATES FROM THE AUREWS NETWORK
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '48px' }}>
        {posts.map((post) => (
          <article key={post.id} style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderBottom: '1px solid var(--hairline-tint)', paddingBottom: '32px' }}>
            <div className="wired-mono" style={{ fontSize: '11px', fontWeight: 700 }}>
              {post.category.name.toUpperCase()} / {new Date(post.createdAt).toLocaleDateString()}
            </div>
            {post.coverImage && (
              <div style={{ aspectRatio: '16/9', border: '1px solid var(--wired-black)', overflow: 'hidden' }}>
                <img
                  src={post.coverImage}
                  alt={post.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            )}
            <Link href={`/article/${post.slug}`}>
              <h2 className="wired-display" style={{ fontSize: '28px', lineHeight: 1.1, cursor: 'pointer' }}>
                {post.title}
              </h2>
            </Link>
            <p className="wired-body" style={{ fontSize: '15px', color: 'var(--page-ink)', flex: 1 }}>
              {post.excerpt || post.body.substring(0, 150) + "..."}
            </p>
            <div className="wired-mono" style={{ fontSize: '10px', color: 'var(--disabled-gray)' }}>
              BY {post.author.name?.toUpperCase() || "STAFF"}
            </div>
          </article>
        ))}

      </div>

      {posts.length === 0 && (
        <div style={{ padding: '100px 0', textAlign: 'center' }}>
          <p className="wired-body" style={{ fontSize: '24px', color: 'var(--disabled-gray)' }}>
            The archive is currently being updated. Check back shortly.
          </p>
        </div>
      )}
    </div>
  );
}
