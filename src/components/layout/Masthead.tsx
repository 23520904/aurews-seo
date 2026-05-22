import { MobileMenu } from "./MobileMenu";
import { auth } from "@/auth";
import Link from "next/link";
import { Search } from "lucide-react";

export const Masthead = async () => {
  const session = await auth();

  return (
    <header className="sticky-header" style={{ padding: 'var(--space-6) 0' }}>
      <div className="wired-wrapper">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <Link 
              href="/search" 
              className="wired-mono hide-mobile hover-link" 
              style={{ display: 'inline-flex', alignItems: 'center' }}
              aria-label="Search articles"
            >
              <Search size={22} strokeWidth={2.5} color="var(--black)" />
            </Link>
          </div>

          <Link href="/" aria-label="Aurews Home">
            <span className="wired-display" style={{ fontSize: '40px', color: 'var(--black)', fontWeight: 700, letterSpacing: '-0.02em' }}>AUREWS</span>
          </Link>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <MobileMenu session={session} />
          </div>
        </div>
      </div>
    </header>
  );
};
