import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Ribbon } from "@/components/ui/Ribbon";
import { redirect } from "next/navigation";
import BulkImportForm from "@/components/dashboard/BulkImportForm";

export default async function BulkImportPage() {
  const session = await auth();

  if (!session || session.user?.role !== 'ADMIN') {
    redirect("/dashboard");
  }

  const categories = await prisma.category.findMany({
    select: { id: true, name: true, slug: true }
  });

  return (
    <div className="wired-wrapper">
      <header style={{ marginBottom: '48px', borderBottom: '4px solid var(--wired-black)', paddingBottom: '24px' }}>
        <Ribbon>Archival Operations</Ribbon>
        <h1 className="wired-display" style={{ fontSize: '56px', marginTop: '12px', lineHeight: 1 }}>
          Bulk Entry Protocol
        </h1>
        <div className="wired-mono" style={{ fontSize: '12px', marginTop: '8px', color: 'var(--caption-gray)' }}>
          MODE: MASS_IMPORT // PRIVILEGE: ADMIN
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '48px' }}>
        <main>
          <BulkImportForm />
        </main>

        <aside>
          <div style={{ border: '2px solid var(--wired-black)', padding: '24px' }}>
            <h2 className="wired-mono" style={{ fontSize: '14px', fontWeight: 700, marginBottom: '24px' }}>VALID_CATEGORIES</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {categories.map(cat => (
                <div key={cat.id} style={{ borderBottom: '1px solid var(--hairline-tint)', paddingBottom: '12px' }}>
                  <div className="wired-mono" style={{ fontSize: '10px', color: 'var(--caption-gray)' }}>ID: {cat.id}</div>
                  <div className="wired-ui" style={{ fontWeight: 700, fontSize: '14px' }}>{cat.name.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '32px', border: '2px solid var(--wired-black)', padding: '24px', background: '#f8f8f8' }}>
            <h2 className="wired-mono" style={{ fontSize: '14px', fontWeight: 700, marginBottom: '16px' }}>SCHEMA_TEMPLATE</h2>
            <pre style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', whiteSpace: 'pre-wrap', color: '#444' }}>
{`[
  {
    "title": "Post Title",
    "body": "Post content...",
    "categoryId": "cl...id",
    "status": "PUBLISHED",
    "coverImage": "https://images.unsplash.com/photo..."
  }
]`}
            </pre>
          </div>
        </aside>
      </div>
    </div>
  );
}
