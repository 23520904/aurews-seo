// Standard Node.js runtime (Cloudflare nodejs_compat)

import { Metadata } from "next";


import { Ribbon } from "@/components/ui/Ribbon";

interface PageProps {
  params: { slug: string };
}

import { NewsArticleJsonLd } from "@/components/seo/JsonLd";

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { BASE_URL, DEFAULT_IMAGE } from "@/lib/constants";


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { author: true, category: true }
  });

  if (!post) return { title: "Article Not Found" };

  const url = `${BASE_URL}/article/${slug}`;
  const description = post.excerpt || post.body.substring(0, 160);
  const ogImage = post.coverImage || DEFAULT_IMAGE;

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
      modifiedTime: post.updatedAt.toISOString(),
      authors: [post.author.name || "Aurews"],
      section: post.category.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
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

  return (
    <article className="wired-wrapper" style={{ paddingBottom: 'var(--space-16)' }}>
      <NewsArticleJsonLd post={post} />

      <div style={{ maxWidth: 'var(--max-w-prose)', margin: '0 auto' }}>
        <div style={{ marginTop: 'var(--space-12)' }}>
          <Ribbon>{post.category.name}</Ribbon>
        </div>

        <h1 className="wired-display" style={{ margin: 'var(--space-6) 0' }}>
          {post.title}
        </h1>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-4)',
          borderTop: '2px solid var(--black)',
          borderBottom: '1px solid var(--hairline)',
          padding: 'var(--space-4) 0',
          marginBottom: 'var(--space-12)'
        }}>
          <div>
            <div className="wired-ui">BY {post.author.name?.toUpperCase() || "AUREWS"}</div>
            <div className="wired-mono" style={{ color: 'var(--caption)', marginTop: 'var(--space-1)' }}>
              {new Date(post.createdAt).toLocaleDateString()} · {Math.ceil(post.body.length / 1000)} MIN READ
            </div>
          </div>
        </div>

        <div style={{
          position: 'relative',
          aspectRatio: '16/9',
          marginBottom: 'var(--space-12)',
          border: '2px solid var(--black)',
          background: '#f8f8f8'
        }}>
          <img
            src={post.coverImage || DEFAULT_IMAGE}
            alt={post.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            fetchPriority="high"
          />
        </div>

        <div className="wired-body" style={{ whiteSpace: 'pre-wrap', color: 'var(--ink)' }}>
          {post.body}
        </div>
      </div>
    </article>
  );
}
