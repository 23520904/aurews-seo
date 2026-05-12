import { Metadata } from "next";
import Link from "next/link";
import { Ribbon } from "@/components/ui/Ribbon";

interface PageProps {
  params: { slug: string };
}

import { NewsArticleJsonLd } from "@/components/seo/JsonLd";

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });

  if (!post) return { title: "Article Not Found" };

  const url = `https://aurews.id.vn/article/${slug}`;
  const description = post.excerpt || post.body.substring(0, 160);

  return {
    title: post.title,
    description: description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: description,
      url: url,
      type: 'article',
      publishedTime: post.createdAt.toISOString(),
      authors: [post.authorId],
      images: post.coverImage ? [post.coverImage] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: description,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}


export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
    include: { category: true, author: true }
  });

  if (!post) {
    notFound();
  }

  const readingTime = Math.ceil(post.body.split(/\s+/).length / 225); // ~225 words per min

  return (
    <main className="wired-wrapper" style={{ paddingBottom: '100px' }}>
      <NewsArticleJsonLd post={post} />

      <article style={{ maxWidth: '820px', margin: '0 auto' }}>
        <header style={{ marginBottom: '40px' }}>
          <Ribbon>{post.category.name}</Ribbon>
          <h1 className="wired-display" style={{ margin: '24px 0', fontSize: 'clamp(2.5rem, 7vw, 4.5rem)' }}>
            {post.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderTop: '2px solid var(--wired-black)', borderBottom: '1px solid var(--hairline-tint)', padding: '20px 0' }}>
            <div style={{ flex: 1 }}>
              <address className="wired-ui" style={{ fontWeight: 800, fontStyle: 'normal', fontSize: '13px' }}>
                BY {post.author.name?.toUpperCase() || "AUREWS EDITORIAL"}
              </address>
              <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                <time className="wired-mono" style={{ fontSize: '10px', color: 'var(--caption-gray)' }} dateTime={post.createdAt.toISOString()}>
                  {new Date(post.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                </time>
                <span style={{ color: 'var(--hairline-tint)' }}>·</span>
                <span className="wired-mono" style={{ fontSize: '10px', color: 'var(--caption-gray)' }}>{readingTime} MIN READ</span>
              </div>
            </div>
          </div>
        </header>

        {post.coverImage && (
          <figure style={{ margin: '0 0 48px', position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }} className="rule-thick">
            <img
              src={post.coverImage}
              alt={`Lead image for: ${post.title}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              loading="eager"
            />
          </figure>
        )}

        <div 
          className="wired-body" 
          style={{ 
            fontSize: 'clamp(1.1rem, 1.5vw, 1.25rem)', 
            lineHeight: 1.8, 
            color: 'var(--page-ink)', 
            whiteSpace: 'pre-wrap',
            maxWidth: '70ch',
            margin: '0 auto'
          }}
        >
          {post.body}
        </div>

        <footer style={{ marginTop: '80px', paddingTop: '40px' }} className="rule-thick">
          <div className="wired-mono" style={{ fontSize: '11px', color: 'var(--caption-gray)' }}>
            ARCHIVE ENTRY ID: {post.id.substring(0, 8).toUpperCase()} // STATUS: PUBLISHED
          </div>
        </footer>
      </article>
    </main>
  );
}


