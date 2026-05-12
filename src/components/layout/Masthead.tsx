import { MobileMenu } from "./MobileMenu";
import { auth } from "@/auth";
import Link from "next/link";
import { Search } from "lucide-react";

export const Masthead = async () => {
  const session = await auth();

  return (
    <header style={{ borderBottom: '2px solid var(--wired-black)', padding: '24px 0' }}>
      <div className="wired-wrapper" style={{ position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <Link href="/search" className="wired-mono desktop-only hover-link" style={{ display: 'inline-flex', alignItems: 'center' }}>
              <Search size={22} strokeWidth={2.5} color="var(--wired-black)" />
            </Link>
          </div>

          <Link href="/">
            <h1 className="wired-display" style={{ fontSize: '48px', fontWeight: 700, margin: 0, letterSpacing: '-2px' }}>AUREWS</h1>
          </Link>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <MobileMenu session={session} />
          </div>
        </div>
        
        <style dangerouslySetInnerHTML={{ __html: `
          @media (max-width: 768px) {
            .desktop-only {
              display: none !important;
            }
          }
        `}} />

      </div>
    </header>
  );
};

