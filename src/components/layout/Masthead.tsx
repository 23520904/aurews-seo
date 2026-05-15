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
            <h1 className="wired-display logo-text" style={{ margin: 0, letterSpacing: '-2px' }}>AUREWS</h1>
          </Link>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <MobileMenu session={session} />
          </div>
        </div>
      </div>
    </header>
  );
};
