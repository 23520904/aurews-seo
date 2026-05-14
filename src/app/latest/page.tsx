import { prisma } from "@/lib/prisma";
import { Ribbon } from "@/components/ui/Ribbon";
import { PostCard } from "@/components/PostCard";
import { LoadMore } from "@/components/LoadMore";

export const metadata = {
  title: "Latest Stories",
  description: "Fresh perspectives on tech, business, and innovation.",
};

const PAGE_SIZE = 20;

export default async function LatestPage() {
  // Server-side: fetch first page
  const posts = await prisma.post.findMany({
    where: { status: 'PUBLISHED' },
    take: PAGE_SIZE + 1,   // fetch +1 to detect hasMore
    orderBy: { createdAt: 'desc' },
    include: { author: true, category: true },
  });

  const hasMore = posts.length > PAGE_SIZE;
  const items = hasMore ? posts.slice(0, PAGE_SIZE) : posts;
  const nextCursor = hasMore ? items[items.length - 1].id : null;

  return (
    <div className="wired-wrapper">
      <header style={{ marginBottom: '48px', borderBottom: '2px solid var(--wired-black)', paddingBottom: '24px' }}>
        <Ribbon>Archive</Ribbon>
        <h1 className="wired-display" style={{ fontSize: '72px', marginTop: '16px' }}>Latest Stories</h1>
        <div className="wired-mono" style={{ fontSize: '11px', color: 'var(--caption-gray)', marginTop: '8px' }}>
          TEMPORAL_FEED // ALL_CHANNELS
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '48px' }}>
        {items.map((post) => (
          <PostCard key={post.id} post={post} cardLocation="latest_page_feed" />
        ))}
      </div>

      <LoadMore 
        initialCursor={nextCursor}
        endpoint="/api/posts/latest"
        pageSize={10}
        cardLocation="latest_page_load_more"
      />

      {items.length === 0 && (
        <div style={{ padding: '100px 0', textAlign: 'center' }}>
          <p className="wired-body" style={{ fontSize: '24px', color: 'var(--disabled-gray)' }}>
            The feed is currently empty. Check back shortly.
          </p>
        </div>
      )}
    </div>
  );
}
