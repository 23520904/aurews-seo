// Standard Node.js runtime (Cloudflare nodejs_compat)

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Ribbon } from "@/components/ui/Ribbon";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
import Link from "next/link";
import { redirect } from "next/navigation";

const PAGE_SIZE = 15;

export default async function DashboardPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ page?: string }> 
}) {
  const session = await auth();

  if (!session || !session.user?.id) {
    redirect("/auth/login");
  }

  const sParams = await searchParams;
  const page = Math.max(1, Number(sParams.page) || 1);
  const skip = (page - 1) * PAGE_SIZE;

  const [postCount, totalViews, posts, totalPosts] = await Promise.all([
    prisma.post.count({ where: { authorId: session.user.id, status: 'PUBLISHED' } }),
    prisma.post.aggregate({
      where: { authorId: session.user.id },
      _sum: { views: true }
    }),
    prisma.post.findMany({
      where: { authorId: session.user.id },
      orderBy: { createdAt: 'desc' },
      skip,
      take: PAGE_SIZE,
      include: { category: true }
    }),
    prisma.post.count({
      where: { authorId: session.user.id }
    })
  ]);

  const totalPages = Math.ceil(totalPosts / PAGE_SIZE);

  return (
    <div className="wired-wrapper">

      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', borderBottom: '4px solid var(--wired-black)', paddingBottom: '24px' }}>
        <div>
          <Ribbon>Management Console</Ribbon>
          <h1 className="wired-display" style={{ fontSize: '56px', marginTop: '12px', lineHeight: 1 }}>
            Control Center
          </h1>
          <div className="wired-mono" style={{ fontSize: '12px', marginTop: '8px', color: 'var(--caption-gray)' }}>
            OPERATOR: {session.user?.name?.toUpperCase()} {'//'} STATUS: ACTIVE
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          {session.user.role === 'ADMIN' && (
            <Link href="/dashboard/bulk">
              <Button style={{ padding: '12px 24px' }}>[!] BULK IMPORT</Button>
            </Link>
          )}
          <Link href="/dashboard/posts/new">
            <Button variant="inverted" style={{ padding: '12px 24px' }}>+ CREATE NEW ENTRY</Button>
          </Link>
        </div>
      </div>

      <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '48px' }}>
        {/* Sidebar Statistics */}
        <aside className="dashboard-sidebar">
          <h2 className="wired-mono" style={{ fontSize: '13px', fontWeight: 700, marginBottom: '32px', letterSpacing: '1px' }}>SYSTEM METRICS</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ padding: '24px', border: '2px solid var(--wired-black)' }}>
              <div className="wired-display" style={{ fontSize: '48px', fontWeight: 700, lineHeight: 1 }}>{postCount}</div>
              <div className="wired-mono" style={{ fontSize: '10px', marginTop: '8px', color: 'var(--caption-gray)' }}>PUBLISHED POSTS</div>
            </div>

            <div style={{ padding: '24px', border: '2px solid var(--wired-black)' }}>
              <div className="wired-display" style={{ fontSize: '48px', fontWeight: 700, lineHeight: 1 }}>{totalViews._sum.views || 0}</div>
              <div className="wired-mono" style={{ fontSize: '10px', marginTop: '8px', color: 'var(--caption-gray)' }}>AGGREGATED VIEWS</div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 className="wired-mono" style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '1px' }}>POST ARCHIVE {'//'} PAGE {page}</h2>
          </div>

          <div style={{ border: '2px solid var(--wired-black)' }}>
            {posts.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {posts.map((post, index) => (
                  <div
                    key={post.id}
                    style={{
                      padding: '24px',
                      borderBottom: index === posts.length - 1 ? 'none' : '1px solid var(--hairline-tint)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: index % 2 === 0 ? 'var(--paper-white)' : '#fafafa'
                    }}
                  >
                    <div>
                      <span className="wired-mono" style={{ fontSize: '10px', color: 'var(--caption-gray)', display: 'block', marginBottom: '4px' }}>
                        {(post as { category?: { name?: string } }).category?.name?.toUpperCase() || "UNCATEGORIZED"} {'//'} {new Date(post.createdAt).toLocaleDateString()} {'//'} {post.status}
                      </span>
                      <h3 className="wired-ui" style={{ fontWeight: 800, fontSize: '18px' }}>{post.title}</h3>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <Link href={`/article/${post.slug}`}>
                        <Button style={{ padding: '6px 16px', fontSize: '11px' }}>VIEW</Button>
                      </Link>
                      <Link href={`/dashboard/posts/${post.id}`}>
                        <Button variant="inverted" style={{ padding: '6px 16px', fontSize: '11px' }}>EDIT</Button>
                      </Link>
                      <form action={async () => {
                        "use server";
                        const { deletePost } = await import("@/lib/actions/posts");
                        await deletePost(post.id);
                      }}>
                        <button type="submit" className="wired-mono" style={{ fontSize: '10px', color: '#ff0000', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', padding: '0 8px' }}>
                          DELETE
                        </button>
                      </form>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: '80px', textAlign: 'center' }}>
                <p className="wired-body" style={{ color: 'var(--caption-gray)', fontSize: '18px' }}>
                  No entries found in the current archive.
                </p>
                <Link href="/dashboard/posts/new">
                  <Button style={{ marginTop: '24px' }}>INITIALIZE FIRST ENTRY</Button>
                </Link>
              </div>
            )}
          </div>

          <Pagination 
            currentPage={page} 
            totalPages={totalPages} 
            baseUrl="/dashboard" 
          />
        </main>
      </div>
    </div>
  );
}
