import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '70vh', padding: '0 24px' }}>
      <span className="wired-mono" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--disabled-gray)', marginBottom: '16px' }}>
        ERROR 404: ARCHITECTURE NOT FOUND
      </span>
      <h1 className="wired-display" style={{ fontSize: '120px', margin: 0, lineHeight: 1 }}>
        LOST
      </h1>
      <div style={{ maxWidth: '400px', textAlign: 'center', marginTop: '24px' }}>
        <p className="wired-body" style={{ fontSize: '18px', marginBottom: '32px' }}>
          The document you are looking for has been moved, archived, or deleted from our central repository.
        </p>
        <Link href="/">
          <Button variant="inverted">Return to Command Center</Button>
        </Link>
      </div>
      <div style={{ marginTop: '64px', borderTop: '1px solid var(--hairline-tint)', width: '100%', maxWidth: '600px', paddingTop: '24px', display: 'flex', justifyContent: 'center', gap: '32px' }}>
        <Link href="/category/tech-innovation" className="wired-mono hover-link" style={{ fontSize: '11px' }}>Tech & Innovation</Link>
        <Link href="/category/ai" className="wired-mono hover-link" style={{ fontSize: '11px' }}>Artificial Intelligence</Link>
        <Link href="/category/business" className="wired-mono hover-link" style={{ fontSize: '11px' }}>Business</Link>
      </div>
    </div>
  );
}
