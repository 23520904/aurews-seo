import { MobileMenu } from "./MobileMenu";
import { auth } from "@/auth";
import Link from "next/link";
import { Search } from "lucide-react";

export const Masthead = async () => {
  const session = await auth();

  return (
    <header className="rule-thick" style={{ background: 'var(--paper-white)', position: 'sticky', top: 0, zIndex: 1000 }}>
      <div className="wired-wrapper">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 'clamp(70px, 10vw, 100px)' }}>
          {/* Desktop Search Trigger */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <Link href="/search" className="wired-mono hover-link" style={{ display: 'flex', alignItems: 'center' }} aria-label="Search Archive">
              <Search size={22} strokeWidth={2.5} color="var(--wired-black)" />
            </Link>
          </div>

          {/* Core Branding */}
          <Link href="/" style={{ textDecoration: 'none' }} aria-label="Aurews Home">
            <h1 className="wired-display" style={{ fontSize: 'clamp(28px, 6vw, 48px)', margin: 0, letterSpacing: '-0.05em' }}>
              AUREWS
            </h1>
          </Link>

          {/* Navigation Control */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <MobileMenu session={session} />
          </div>
        </div>
      </div>
    </header>
  );
};


