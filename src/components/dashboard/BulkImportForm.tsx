"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { bulkCreatePosts } from "@/lib/actions/posts";
import { useRouter } from "next/navigation";

export default function BulkImportForm() {
  const [jsonInput, setJsonInput] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const router = useRouter();

  const handleImport = async () => {
    setIsPending(true);
    setMessage(null);

    try {
      const data = JSON.parse(jsonInput);
      const result = await bulkCreatePosts(data);

      if (result.error) {
        setMessage({ type: 'error', text: result.error });
      } else {
        setMessage({ type: 'success', text: `Archival sequence complete. ${result.count} entries initialized.` });
        setJsonInput("");
        router.refresh();
      }
    } catch {
      setMessage({ type: 'error', text: "Data validation failed: Invalid JSON format." });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <label className="wired-mono" style={{ fontSize: '13px', fontWeight: 700, display: 'block', marginBottom: '16px' }}>
          INPUT_RAW_JSON_DATA
        </label>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="Paste your JSON array here..."
          style={{
            width: '100%',
            height: '400px',
            padding: '24px',
            border: '2px solid var(--wired-black)',
            background: 'transparent',
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
            outline: 'none',
            resize: 'vertical'
          }}
          disabled={isPending}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <Button 
          onClick={handleImport} 
          disabled={isPending || !jsonInput.trim()}
          style={{ padding: '16px 40px', fontSize: '14px' }}
        >
          {isPending ? "INITIALIZING SEQUENCE..." : "[>] EXECUTE BULK IMPORT"}
        </Button>

        {message && (
          <div className="wired-mono" style={{ 
            fontSize: '12px', 
            fontWeight: 700, 
            color: message.type === 'success' ? '#1a7a34' : '#8b0000',
            padding: '8px 16px',
            border: `1px solid ${message.type === 'success' ? '#1a7a34' : '#8b0000'}`
          }}>
            {message.text.toUpperCase()}
          </div>
        )}
      </div>

      <div className="wired-body" style={{ fontSize: '14px', color: 'var(--caption-gray)', borderTop: '1px solid var(--hairline-tint)', paddingTop: '24px' }}>
        <p>[!] WARNING: This operation cannot be undone. Ensure all slugs are unique and category IDs exist in the system before execution.</p>
      </div>
    </div>
  );
}
