import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Ribbon } from "@/components/ui/Ribbon";
import { PostForm } from "./PostForm";

export default async function NewPostPage() {
  const session = await auth();
  if (!session) {
    redirect("/auth/login");
  }

  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div className="wired-wrapper">
      <header style={{ marginBottom: '48px', borderBottom: '4px solid var(--wired-black)', paddingBottom: '24px' }}>

        <Ribbon>Editorial Interface</Ribbon>
        <h1 className="wired-display" style={{ fontSize: '56px', marginTop: '12px', lineHeight: 1 }}>
          Create Entry
        </h1>
        <div className="wired-mono" style={{ fontSize: '12px', marginTop: '8px', color: 'var(--caption-gray)' }}>
          MODE: DIRECT_INJECTION // AUTH_ID: {session.user?.id}
        </div>
      </header>

      <div style={{ maxWidth: '1000px' }}>
        <PostForm categories={categories} />
      </div>
    </div>
  );
}

