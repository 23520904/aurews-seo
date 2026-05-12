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
      <div className="wired-wrapper" style={{ padding: '100px 0', textAlign: 'center' }}>
        <h1 className="wired-display">Category Not Found</h1>
        <Link href="/" className="wired-mono" style={{ textDecoration: 'underline' }}>Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="wired-wrapper">
      <header style={{ marginBottom: '48px', borderBottom: '2px solid var(--wired-black)', paddingBottom: '24px' }}>

        <Ribbon>Channel</Ribbon>
        <h1 className="wired-display" style={{ fontSize: '72px', marginTop: '16px' }}>{category.name}</h1>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '48px' }}>
        {category.posts.map((post) => (
          <article key={post.id} style={{ borderBottom: '1px solid var(--hairline-tint)', paddingBottom: '32px' }}>
            {post.coverImage && (
              <div style={{ aspectRatio: '16/9', border: '1px solid var(--wired-black)', overflow: 'hidden', marginBottom: '16px' }}>
                <img
                  src={post.coverImage}
                  alt={post.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            )}
            <Link href={`/article/${post.slug}`}>
              <h3 className="wired-display" style={{ fontSize: '28px', marginBottom: '12px' }}>
                {post.title}
              </h3>
            </Link>

            <p className="wired-body" style={{ fontSize: '15px', color: 'var(--caption-gray)', marginBottom: '16px' }}>
              {post.excerpt || post.body.substring(0, 150) + "..."}
            </p>
            <div className="wired-mono" style={{ fontSize: '11px', color: 'var(--caption-gray)' }}>
              {new Date(post.createdAt).toLocaleDateString()} / BY {post.author.name?.toUpperCase() || "STAFF"}
            </div>
          </article>
        ))}
      </div>

      {category.posts.length === 0 && (
        <div style={{ padding: '64px 0', textAlign: 'center' }}>
          <p className="wired-body" style={{ color: 'var(--disabled-gray)', fontSize: '20px' }}>No stories available in this channel yet.</p>
        </div>
      )}
    </div>
  );
}

