import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";
import { PostForm } from "../../posts/new/PostForm";
import { Ribbon } from "@/components/ui/Ribbon";
export const runtime = 'nodejs';
export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) redirect("/auth/login");

  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) notFound();

  // Security: Check if user is the author
  if (post.authorId !== session.user?.id) {
    redirect("/dashboard");
  }

  const categories = await prisma.category.findMany();

  return (
    <div className="wired-wrapper">
      <header style={{ marginBottom: '48px', borderBottom: '4px solid var(--wired-black)', paddingBottom: '24px' }}>
        <Ribbon>Editorial Revision</Ribbon>
        <h1 className="wired-display" style={{ fontSize: '56px', marginTop: '12px', lineHeight: 1 }}>
          Edit Entry
        </h1>
        <p className="wired-mono" style={{ fontSize: '11px', color: 'var(--caption-gray)', marginTop: '8px' }}>
          ID: {post.id} // STATUS: {post.status}
        </p>
      </header>

      <PostForm categories={categories} initialData={post} />
    </div>
  );
}
