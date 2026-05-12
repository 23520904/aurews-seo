import { Ribbon } from "@/components/ui/Ribbon";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
async function SearchResults({ query }: { query: string }) {
  if (!query) return null;

  try {
    const results = await prisma.post.findMany({
      where: {
        status: 'PUBLISHED',
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { body: { contains: query, mode: 'insensitive' } }
        ]
      },
      include: { category: true },
      take: 20
    });

    return (
      <div style={{ marginTop: '48px' }}>
        <h2 className="wired-mono" style={{ fontSize: '14px', marginBottom: '32px' }}>
          RESULTS FOR: "{query.toUpperCase()}" — FOUND {results.length}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {results.map((post) => (
            <article key={post.id} style={{ borderBottom: '1px solid var(--hairline-tint)', paddingBottom: '32px' }}>
              <div className="wired-mono" style={{ fontSize: '11px', marginBottom: '8px' }}>
                {post.category.name.toUpperCase()} / {new Date(post.createdAt).toLocaleDateString()}
              </div>
              <Link href={`/article/${post.slug}`}>
                <h3 className="wired-display" style={{ fontSize: '32px', marginBottom: '12px' }}>
                  {post.title}
                </h3>
              </Link>
              <p className="wired-body" style={{ fontSize: '16px', color: 'var(--caption-gray)' }}>
                {post.excerpt || post.body.substring(0, 200) + "..."}
              </p>
            </article>
          ))}
          {results.length === 0 && (
            <p className="wired-body">No matching documents found in the current archive segment.</p>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Search failed:", error);
    return <p className="wired-body" style={{ color: 'red' }}>Archival retrieval failed. Please check connection.</p>;
  }
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const params = await searchParams;
  const query = params.q || "";

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
        <Suspense fallback={
          <div className="wired-mono" style={{ fontSize: '14px', textAlign: 'center', padding: '40px' }}>
            SCANNING ARCHIVE...
          </div>
        }>
          <SearchResults query={query} />
        </Suspense>
      )}
    </div>
  );
}
