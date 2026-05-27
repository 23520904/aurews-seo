import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Ribbon } from "@/components/ui/Ribbon";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
import Link from "next/link";
import { redirect } from "next/navigation";

const PAGE_SIZE = 25;

export default async function MyPostsPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ page?: string }> 
}) {
  const session = await auth();
  if (!session || !session.user?.id) redirect("/auth/login");

  const sParams = await searchParams;
  const page = Math.max(1, Number(sParams.page) || 1);
  const skip = (page - 1) * PAGE_SIZE;

  const [posts, total] = await Promise.all([
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

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="wired-wrapper">
      <header style={{ marginBottom: '48px', borderBottom: '4px solid var(--wired-black)', paddingBottom: '24px' }}>
        <Ribbon>Archive Management</Ribbon>
        <h1 className="wired-display" style={{ fontSize: '56px', marginTop: '12px' }}>My Stories</h1>
        <div className="wired-mono" style={{ fontSize: '12px', marginTop: '8px', color: 'var(--caption-gray)' }}>
          TOTAL_ENTRIES: {total} {'//'} PAGE_{page}_OF_{totalPages}
        </div>
      </header>

      <div style={{ border: '2px solid var(--wired-black)', marginBottom: '32px' }}>
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
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding: '80px', textAlign: 'center' }}>
            <p className="wired-mono" style={{ color: 'var(--caption-gray)', fontSize: '14px' }}>
              NO ENTRIES FOUND IN CURRENT SCOPE
            </p>
          </div>
        )}
      </div>

      <Pagination 
        currentPage={page} 
        totalPages={totalPages} 
        baseUrl="/dashboard/my-posts" 
      />
      
      <div style={{ marginTop: '48px', textAlign: 'center' }}>
        <Link href="/dashboard" className="wired-mono" style={{ fontSize: '12px', textDecoration: 'underline' }}>
          RETURN TO CONTROL CENTER
        </Link>
      </div>
    </div>
  );
}
