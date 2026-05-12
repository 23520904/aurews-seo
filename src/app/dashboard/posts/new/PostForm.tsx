"use client";

import { createPost, updatePost } from "@/lib/actions/posts";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

import { ImageUpload } from "@/components/ui/ImageUpload";

export function PostForm({ categories, initialData }: { categories: any[], initialData?: any }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || "");
  const router = useRouter();

  async function handleSubmit(formData: FormData) {

    setLoading(true);
    setError(null);

    formData.append("coverImage", coverImage);

    let result;
    if (initialData?.id) {
      result = await updatePost(initialData.id, formData);
    } else {
      result = await createPost(formData);
    }

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  }


  return (
    <form action={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '48px', alignItems: 'start' }}>
      {/* Main Content Column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {error && (
          <div className="wired-mono" style={{ color: 'red', border: '1px solid red', padding: '12px', fontSize: '12px' }}>
            SYSTEM_ERROR: {error.toUpperCase()}
          </div>
        )}

        <div>
          <label className="wired-mono" style={{ fontSize: '11px', fontWeight: 700, display: 'block', marginBottom: '8px' }}>PRIMARY HEADLINE</label>
          <input
            name="title"
            required
            defaultValue={initialData?.title}
            placeholder="ENTER HEADLINE..."
            style={{ width: '100%', padding: '20px', border: '2px solid var(--wired-black)', fontSize: '32px', fontFamily: 'var(--font-display)', outline: 'none', background: 'transparent' }}
          />
        </div>

        <div>
          <label className="wired-mono" style={{ fontSize: '11px', fontWeight: 700, display: 'block', marginBottom: '8px' }}>EDITORIAL BODY (MARKDOWN)</label>
          <textarea
            name="body"
            required
            rows={20}
            defaultValue={initialData?.body}
            placeholder="BEGIN COMPOSITION..."
            style={{ width: '100%', padding: '20px', border: '2px solid var(--wired-black)', fontSize: '18px', fontFamily: 'var(--font-body)', lineHeight: 1.6, resize: 'vertical', outline: 'none', background: 'transparent' }}
          />
        </div>
      </div>

      {/* Sidebar Controls Column */}
      <aside style={{ display: 'flex', flexDirection: 'column', gap: '32px', position: 'sticky', top: '24px' }}>
        <div style={{ border: '2px solid var(--wired-black)', padding: '24px' }}>
          <h3 className="wired-mono" style={{ fontSize: '12px', fontWeight: 700, marginBottom: '20px', borderBottom: '1px solid var(--wired-black)', paddingBottom: '8px' }}>METADATA</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label className="wired-mono" style={{ fontSize: '10px', display: 'block', marginBottom: '8px' }}>COVER IMAGE</label>
              <ImageUpload onUpload={(url) => setCoverImage(url)} defaultValue={initialData?.coverImage} />
            </div>

            <div>
              <label className="wired-mono" style={{ fontSize: '10px', display: 'block', marginBottom: '4px' }}>CHANNEL</label>
              <select
                name="categoryId"
                required
                defaultValue={initialData?.categoryId}
                style={{ width: '100%', padding: '10px', border: '1px solid var(--wired-black)', fontFamily: 'var(--font-ui)', background: 'white' }}
              >
                <option value="">SELECT...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name.toUpperCase()}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="wired-mono" style={{ fontSize: '10px', display: 'block', marginBottom: '4px' }}>VISIBILITY</label>
              <select
                name="status"
                defaultValue={initialData?.status}
                style={{ width: '100%', padding: '10px', border: '1px solid var(--wired-black)', fontFamily: 'var(--font-ui)', background: 'white' }}
              >
                <option value="DRAFT">DRAFT</option>
                <option value="PUBLISHED">PUBLISHED</option>
              </select>
            </div>
          </div>
        </div>



        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Button type="submit" disabled={loading} style={{ width: '100%', padding: '16px' }}>
            {loading ? "COMMITTING..." : "COMMIT TO ARCHIVE"}
          </Button>
          <Button type="button" variant="inverted" onClick={() => router.back()} disabled={loading} style={{ width: '100%' }}>
            ABORT MISSION
          </Button>
        </div>
      </aside>
    </form>
  );
}

