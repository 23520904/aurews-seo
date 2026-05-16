// Standard Node.js runtime (Cloudflare nodejs_compat)

import { Metadata } from "next";
import Image from "next/image";

import { Ribbon } from "@/components/ui/Ribbon";
import Link from "next/link";
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
   const relatedPosts = await prisma.post.findMany({
    where: {
      status: "PUBLISHED",
      categoryId: post.categoryId,
      id: {
        not: post.id,
      },
    },
    select: {
      slug: true,
      title: true,
      excerpt: true,
      coverImage: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 4,
  });
  return (
    <article className="wired-wrapper" style={{ paddingBottom: 'var(--space-16)' }}>
      <NewsArticleJsonLd post={post} />

      <div style={{ maxWidth: 'var(--max-w-prose)', margin: '0 auto' }}>
        <div style={{ marginTop: 'var(--space-12)' }}>
          <Link
  href={`/category/${post.category.slug}`}
  style={{ textDecoration: "none", color: "inherit" }}
>
  <Ribbon>{post.category.name}</Ribbon>
</Link>
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
          <Image
            src={post.coverImage || DEFAULT_IMAGE}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 800px"
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div className="wired-body" style={{ whiteSpace: 'pre-wrap', color: 'var(--ink)' }}>
          {post.body}
        </div>
                {relatedPosts.length > 0 && (
          <section
            aria-labelledby="related-articles-title"
            style={{
              marginTop: "var(--space-16)",
              paddingTop: "var(--space-8)",
              borderTop: "2px solid var(--black)",
            }}
          >
            <div style={{ marginBottom: "var(--space-6)" }}>
              <Ribbon>Internal Links</Ribbon>
              <h2
                id="related-articles-title"
                className="wired-display"
                style={{
                  fontSize: "36px",
                  marginTop: "var(--space-4)",
                  marginBottom: 0,
                }}
              >
                Related Articles
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "var(--space-6)",
              }}
            >
              {relatedPosts.map((relatedPost) => (
                <article
                  key={relatedPost.slug}
                  style={{
                    border: "1px solid var(--hairline)",
                    padding: "var(--space-4)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-3)",
                  }}
                >
                  <Link
                    href={`/article/${relatedPost.slug}`}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <h3
                      className="wired-display"
                      style={{
                        fontSize: "22px",
                        lineHeight: 1.25,
                        margin: 0,
                      }}
                    >
                      {relatedPost.title}
                    </h3>
                  </Link>

                  {relatedPost.excerpt && (
                    <p
                      className="wired-body"
                      style={{
                        margin: 0,
                        fontSize: "15px",
                        lineHeight: 1.6,
                        color: "var(--caption)",
                      }}
                    >
                      {relatedPost.excerpt}
                    </p>
                  )}

                  <Link
                    href={`/article/${relatedPost.slug}`}
                    className="wired-mono"
                    style={{
                      marginTop: "auto",
                      fontSize: "12px",
                      textDecoration: "underline",
                      color: "inherit",
                    }}
                  >
                    Read related story →
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
