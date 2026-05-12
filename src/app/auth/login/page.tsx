"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { login } from "@/lib/actions/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
export const runtime = 'nodejs';
export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', padding: '64px 0' }}>
      <div style={{ width: '100%', maxWidth: '400px', border: '2px solid var(--wired-black)', padding: '48px' }}>
        <h2 className="wired-display" style={{ fontSize: '32px', marginBottom: '8px' }}>Sign In</h2>
        <p className="wired-mono" style={{ fontSize: '11px', color: 'var(--caption-gray)', marginBottom: '32px' }}>AUREWS ACCESS CONTROL</p>

        <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {error && (
            <div className="wired-mono" style={{ color: 'red', fontSize: '12px', border: '1px solid red', padding: '8px' }}>
              ERROR: {error.toUpperCase()}
            </div>
          )}
          <div>
            <label className="wired-mono" style={{ fontSize: '12px', display: 'block', marginBottom: '8px' }}>Email Address</label>
            <input
              name="email"
              type="email"
              required
              style={{ width: '100%', padding: '12px', border: '2px solid var(--wired-black)', fontFamily: 'var(--font-ui)', outline: 'none' }}
            />
          </div>
          <div>
            <label className="wired-mono" style={{ fontSize: '12px', display: 'block', marginBottom: '8px' }}>Password</label>
            <input
              name="password"
              type="password"
              required
              style={{ width: '100%', padding: '12px', border: '2px solid var(--wired-black)', fontFamily: 'var(--font-ui)', outline: 'none' }}
            />
          </div>
          <Button type="submit" variant="inverted" disabled={loading} style={{ marginTop: '12px' }}>
            {loading ? "AUTHENTICATING..." : "Sign In"}
          </Button>
        </form>

        <div style={{ marginTop: '32px', textAlign: 'center', borderTop: '1px solid var(--hairline-tint)', paddingTop: '24px' }}>
          <p className="wired-body" style={{ fontSize: '14px' }}>
            New to Aurews? <Link href="/auth/register" className="hover-link" style={{ fontWeight: 700 }}>Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

