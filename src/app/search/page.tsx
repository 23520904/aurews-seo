// Standard Node.js runtime (Cloudflare nodejs_compat)
export const dynamic = "force-dynamic";

import { Ribbon } from "@/components/ui/Ribbon";
import { getClientIp, rateLimit } from "@/lib/ratelimit";

import { prisma } from "@/lib/prisma";
import { Suspense } from "react";
import { PostCard } from "@/components/PostCard";
import { Pagination } from "@/components/ui/Pagination";
export const metadata = {
  title: "Search Archive",
  description: "Explore the Aurews repository with advanced search capabilities.",
  alternates: {
    canonical: "/search",
  },
};
const PAGE_SIZE = 15;

async function SearchResults({ query, page }: { query: string, page: number }) {
  if (!query) return null;

  const skip = (page - 1) * PAGE_SIZE;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let results: any[] = [];
  let total = 0;
  let fetchError = false;

  try {
    const [fetchedResults, fetchedTotal] = await Promise.all([
      prisma.post.findMany({
        where: {
          status: 'PUBLISHED',
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { excerpt: { contains: query, mode: 'insensitive' } },
            { body: { contains: query, mode: 'insensitive' } }
          ]
        },
        include: { category: true, author: true },
        orderBy: { createdAt: 'desc' },
        skip,
        take: PAGE_SIZE
      }),
      prisma.post.count({
        where: {
          status: 'PUBLISHED',
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { excerpt: { contains: query, mode: 'insensitive' } },
            { body: { contains: query, mode: 'insensitive' } }
          ]
        }
      })
    ]);
    results = fetchedResults;
    total = fetchedTotal;
  } catch (error) {
    console.error("Search failed:", error);
    fetchError = true;
  }

  if (fetchError) {
    return <p className="wired-body" style={{ color: 'red' }}>Archival retrieval failed. Please check connection.</p>;
  }

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div style={{ marginTop: '48px' }}>
      <h2 className="wired-mono" style={{ fontSize: '14px', marginBottom: '32px' }}>
        RESULTS FOR: &quot;{query.toUpperCase()}&quot; — FOUND {total} ENTRIES
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '48px' }}>
        {results.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {results.length === 0 && (
        <div style={{ padding: '64px 0', textAlign: 'center' }}>
          <p className="wired-body" style={{ fontSize: '20px' }}>No matching documents found in the current archive segment.</p>
        </div>
      )}

      <Pagination 
        currentPage={page} 
        totalPages={totalPages} 
        baseUrl={`/search?q=${encodeURIComponent(query)}`} 
      />
    </div>
  );
}

export default async function SearchPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ q?: string; page?: string }> 
}) {
  const ip = await getClientIp();
  const limitRes = await rateLimit(`search_page:${ip}`, 60, 60);
  if (!limitRes.success) {
    return (
      <div className="wired-wrapper" style={{ padding: '100px 0', textAlign: 'center' }}>
        <h1 className="wired-display" style={{ fontSize: '48px', color: 'red' }}>429 TOO MANY REQUESTS</h1>
        <p className="wired-body" style={{ fontSize: '20px', marginTop: '24px' }}>
          You have made too many search requests. Please wait a moment and try again.
        </p>
      </div>
    );
  }
  

  const params = await searchParams;
  const query = params.q || "";
  const page = Math.max(1, Number(params.page) || 1);

  return (
    <div className="wired-wrapper">
      <header style={{ marginBottom: '64px', borderBottom: '2px solid var(--wired-black)', paddingBottom: '32px' }}>
        <Ribbon>Search Archive</Ribbon>
        <form action="/search" style={{ marginTop: '32px', display: 'flex', gap: '16px' }}>
          <input
            name="q"
            defaultValue={query}
            placeholder="ENTER SEARCH QUERY..."
            style={{
              flex: 1,
              padding: '16px',
              border: '2px solid var(--wired-black)',
              fontSize: '24px',
              fontFamily: 'var(--font-display)',
              outline: 'none',
              background: 'transparent'
            }}
          />
          <button type="submit" className="wired-button inverted">SEARCH</button>
        </form>
      </header>

      {!query && (
        <div style={{ textAlign: 'center', padding: '64px 0' }}>
          <p className="wired-body" style={{ fontSize: '24px', color: 'var(--disabled-gray)' }}>
            Enter a query above to explore the Aurews archive.
          </p>
        </div>
      )}

      {query && (
        <Suspense key={`${query}-${page}`} fallback={
          <div className="wired-mono" style={{ fontSize: '14px', textAlign: 'center', padding: '100px' }}>
            SCANNING ARCHIVE...
          </div>
        }>
          <SearchResults query={query} page={page} />
        </Suspense>
      )}
    </div>
  );
}
