import { Metadata } from "next";
import Link from "next/link";
import { Ribbon } from "@/components/ui/Ribbon";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Category: ${slug.charAt(0).toUpperCase() + slug.slice(1)}`,
    description: `Latest stories and analysis in ${slug}.`,
  };
}

import { prisma } from "@/lib/prisma";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      posts: {
        where: { status: 'PUBLISHED' },
        orderBy: { createdAt: 'desc' },
        include: { author: true }
      }
    }
  });

  if (!category) {
    return (
      <main className="wired-wrapper" style={{ padding: '100px 0', textAlign: 'center' }}>
        <h1 className="wired-display" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>Channel Not Found</h1>
        <Link href="/" className="wired-mono hover-link" style={{ marginTop: '24px', display: 'inline-block', textDecoration: 'underline' }}>Return to Home Base</Link>
      </main>
    );
  }

  return (
    <main className="wired-wrapper" style={{ paddingBottom: '80px' }}>
      <header style={{ marginBottom: 'clamp(32px, 8vw, 64px)', paddingBottom: '24px' }} className="rule-thick">
        <Ribbon>Channel Index</Ribbon>
        <h1 className="wired-display" style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', marginTop: '16px', letterSpacing: '-0.04em' }}>
          {category.name}
        </h1>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(280px, 45%, 400px), 1fr))', gap: 'clamp(32px, 5vw, 64px)' }}>
        {category.posts.map((post) => (
          <article key={post.id} className="rule-thin" style={{ paddingBottom: '32px' }}>
            {post.coverImage && (
              <figure style={{ margin: '0 0 20px', aspectRatio: '16/9', overflow: 'hidden' }} className="rule-thick">
                <img 
                   src={post.coverImage} 
                   alt={`Cover for ${post.title}`}
                   style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                   loading="lazy"
                />
              </figure>
            )}
            <Link href={`/article/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <h3 className="wired-display" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', marginBottom: '12px' }}>
                {post.title}
              </h3>
            </Link>

            <p className="wired-body" style={{ fontSize: '0.95rem', color: 'var(--caption-gray)', marginBottom: '20px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {post.excerpt || post.body.substring(0, 150) + "..."}
            </p>
            <div className="wired-mono" style={{ fontSize: '10px', color: 'var(--caption-gray)', display: 'flex', gap: '12px', alignItems: 'center' }}>
              <time dateTime={post.createdAt.toISOString()}>{new Date(post.createdAt).toLocaleDateString()}</time>
              <span className="rule-thin" style={{ width: '10px', transform: 'rotate(90deg)' }}></span>
              <span>{post.author.name?.toUpperCase() || "STAFF"}</span>
            </div>
          </article>
        ))}
      </div>
      
      {category.posts.length === 0 && (
        <div style={{ padding: '80px 0', textAlign: 'center' }} className="rule-thin">
          <p className="wired-body" style={{ color: 'var(--disabled-gray)', fontSize: '1.25rem' }}>No active transmissions in this channel archive.</p>
        </div>
      )}
    </main>
  );
}


