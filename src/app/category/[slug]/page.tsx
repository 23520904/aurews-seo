import { Metadata } from "next";
import Link from "next/link";
import { Ribbon } from "@/components/ui/Ribbon";
import { prisma } from "@/lib/prisma";
import { PostCard } from "@/components/PostCard";
import { LoadMore } from "@/components/LoadMore";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Category: ${slug.charAt(0).toUpperCase() + slug.slice(1)}`,
    description: `Latest stories and analysis in ${slug}.`,
  };
}

const PAGE_SIZE = 12;

export default async function CategoryPage({
  params
}: PageProps) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      posts: {
        where: { status: 'PUBLISHED' },
        orderBy: { createdAt: 'desc' },
        include: { author: true, category: true },
        take: PAGE_SIZE + 1
      }
    }
  });

  if (!category) {
    return (
      <div className="wired-wrapper" style={{ padding: '100px 0', textAlign: 'center' }}>
        <h1 className="wired-display">Channel Not Found</h1>
        <Link href="/" className="wired-mono" style={{ textDecoration: 'underline' }}>Return to Home</Link>
      </div>
    );
  }

  const posts = (category as any).posts || [];
  const hasMore = posts.length > PAGE_SIZE;
  const items = hasMore ? posts.slice(0, PAGE_SIZE) : posts;
  const nextCursor = hasMore ? (items[items.length - 1] as any).id : null;

  return (
    <div className="wired-wrapper">
      <header style={{ marginBottom: '48px', borderBottom: '2px solid var(--wired-black)', paddingBottom: '24px' }}>
        <Ribbon>Channel</Ribbon>
        <h1 className="wired-display" style={{ fontSize: '72px', marginTop: '16px' }}>{category.name}</h1>
        <div className="wired-mono" style={{ fontSize: '11px', color: 'var(--caption-gray)', marginTop: '8px' }}>
          SEGMENT: {category.slug.toUpperCase()} // ARCHIVE_MODE
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '48px' }}>
        {items.map((post: any) => (
          <PostCard key={post.id} post={post} cardLocation="category_page_list" />
        ))}
      </div>

      <LoadMore
        initialCursor={nextCursor}
        endpoint={`/api/posts/latest?category=${slug}`}
        pageSize={8}
        cardLocation="category_page_load_more"
      />

      {items.length === 0 && (
        <div style={{ padding: '64px 0', textAlign: 'center' }}>
          <p className="wired-body" style={{ color: 'var(--disabled-gray)', fontSize: '20px' }}>No stories available in this channel yet.</p>
        </div>
      )}
    </div>
  );
}
