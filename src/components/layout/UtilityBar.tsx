import Link from "next/link";
import { auth } from "@/auth";
import { logout } from "@/lib/actions/auth";

export const UtilityBar = async () => {
  const session = await auth();

  return (
    <div className="wired-black-bg desktop-only" style={{ background: 'var(--wired-black)', color: 'var(--paper-white)', padding: '8px 0' }}>
      <div className="wired-wrapper" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="wired-mono" style={{ fontSize: '11px' }}>AUREWS EDITORIAL</span>

        <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link href="/latest" className="wired-mono" style={{ fontSize: '11px', color: 'inherit' }}>Latest</Link>
          <Link href="/about" className="wired-mono" style={{ fontSize: '11px', color: 'inherit' }}>About</Link>
          <Link href="/contact" className="wired-mono" style={{ fontSize: '11px', color: 'inherit' }}>Contact</Link>
          
          <div style={{ width: '1px', height: '12px', background: '#333' }}></div>
          
          {session ? (
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <Link href="/dashboard" className="wired-mono" style={{ fontSize: '11px', color: 'inherit', fontWeight: 700 }}>DASHBOARD</Link>
              <form action={logout}>
                <button type="submit" className="wired-mono" style={{ fontSize: '11px', color: 'inherit', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>LOGOUT</button>
              </form>
            </div>
          ) : (
            <Link href="/auth/login" className="wired-mono" style={{ fontSize: '11px', color: 'inherit', fontWeight: 700 }}>LOGIN</Link>
          )}
        </nav>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .desktop-only {
            display: none !important;
          }
        }
      `}} />
    </div>
  );

};

