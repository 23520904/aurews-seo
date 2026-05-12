import { Metadata } from "next";
import Link from "next/link";
import { Ribbon } from "@/components/ui/Ribbon";

interface PageProps {
  params: { slug: string };
}

import { NewsArticleJsonLd } from "@/components/seo/JsonLd";

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { BASE_URL } from "@/lib/constants";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });

  if (!post) return { title: "Article Not Found" };

  const url = `${BASE_URL}/article/${slug}`;
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

  // Update views in background (simple)
  // await prisma.post.update({ where: { id: post.id }, data: { views: { increment: 1 } } });

  return (
    <article className="wired-wrapper">

      <NewsArticleJsonLd post={post} />

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Ribbon>{post.category.name}</Ribbon>
        <h1 className="wired-display" style={{ fontSize: '64px', margin: '24px 0' }}>
          {post.title}
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderTop: '1px solid var(--wired-black)', borderBottom: '1px solid var(--hairline-tint)', padding: '16px 0', marginBottom: '48px' }}>
          <div>
            <div className="wired-ui" style={{ fontWeight: 700, fontSize: '14px' }}>BY {post.author.name?.toUpperCase() || "AUREWS"}</div>
            <div className="wired-mono" style={{ fontSize: '11px', color: 'var(--caption-gray)' }}>
              {new Date(post.createdAt).toLocaleDateString()} · {Math.ceil(post.body.length / 1000)} MIN READ
            </div>
          </div>
        </div>

        {post.coverImage && (
          <div style={{ position: 'relative', aspectRatio: '16/9', marginBottom: '48px', border: '2px solid var(--wired-black)' }}>
            <img
              src={post.coverImage}
              alt={post.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}

        <div className="wired-body" style={{ fontSize: '18px', lineHeight: 1.7, color: 'var(--page-ink)', whiteSpace: 'pre-wrap' }}>
          {post.body}
        </div>
      </div>
    </article>
  );
}

