"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, User, LogOut, LayoutDashboard, Search } from "lucide-react";
import { logout } from "@/lib/actions/auth";

interface MobileMenuProps {
  session: any;
}

export function MobileMenu({ session }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <div className="universal-menu" style={{ position: 'relative' }}>
      <button 
        onClick={toggleMenu}
        style={{ 
          background: 'none', 
          border: 'none', 
          cursor: 'pointer', 
          padding: 'var(--space-2)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          minWidth: 'var(--touch-min)',
          minHeight: 'var(--touch-min)'
        }}
        aria-label="Toggle Menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={28} color="var(--black)" /> : <Menu size={28} color="var(--black)" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          onClick={toggleMenu}
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            background: 'rgba(0,0,0,0.4)', 
            zIndex: 998,
            backdropFilter: 'blur(4px)'
          }}
        />
      )}

      {/* Menu Side Drawer */}
      <div 
        style={{ 
          position: 'fixed', 
          top: 0, 
          right: isOpen ? 0 : '-100%', 
          width: '85%', 
          maxWidth: '400px', 
          height: '100dvh', 
          background: 'var(--paper)', 
          zIndex: 999, 
          transition: 'right 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: '-10px 0 50px rgba(0,0,0,0.1)',
          padding: 'var(--space-10) 0',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto'
        }}
      >
        <div style={{ padding: '0 var(--gutter)', marginBottom: 'var(--space-8)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '4px solid var(--black)', paddingBottom: 'var(--space-4)' }}>
            <h2 className="wired-display logo-text" style={{ margin: 0, letterSpacing: '-1px' }}>AUREWS</h2>
            <button onClick={toggleMenu} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 'var(--space-2)', minWidth: 'var(--touch-min)', minHeight: 'var(--touch-min)' }}>
              <X size={32} />
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-10)', padding: '0 var(--gutter)', flex: 1 }}>
          {/* User Status */}
          <div style={{ padding: 'var(--space-4)', border: '2px solid var(--black)', background: 'var(--code-bg)' }}>
            {session ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div className="wired-mono" style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--caption)' }}>
                  <User size={14} /> {session.user?.name?.toUpperCase()}
                </div>
                <Link href="/dashboard" onClick={toggleMenu} className="wired-ui hover-link" style={{ fontSize: '16px', display: 'flex', alignItems: 'center', gap: 'var(--space-2)', minHeight: 'var(--touch-min)' }}>
                  <LayoutDashboard size={18} /> CONTROL CENTER
                </Link>
                <form action={logout}>
                  <button type="submit" className="wired-ui" style={{ fontSize: '16px', display: 'flex', alignItems: 'center', gap: 'var(--space-2)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--red)', minHeight: 'var(--touch-min)', width: '100%' }}>
                    <LogOut size={18} /> LOGOUT
                  </button>
                </form>
              </div>
            ) : (
              <Link href="/auth/login" onClick={toggleMenu} className="wired-ui hover-link" style={{ fontSize: '16px', display: 'flex', alignItems: 'center', gap: 'var(--space-2)', minHeight: 'var(--touch-min)' }}>
                <User size={20} /> SYSTEM ACCESS
              </Link>
            )}
          </div>

          {/* Categories */}
          <nav>
            <div className="wired-mono" style={{ fontSize: '11px', fontWeight: 700, marginBottom: 'var(--space-4)', borderBottom: '1px solid var(--hairline)', paddingBottom: 'var(--space-2)', letterSpacing: '2px' }}>CHANNELS</div>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column' }}>
              {['Business', 'Tech & Innovation', 'A.I.', 'Money & Markets', 'Lifestyle', 'Politics'].map((cat) => (
                <li key={cat}>
                  <Link 
                    href={`/category/${cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} 
                    onClick={toggleMenu} 
                    className="wired-display grid-headline hover-link" 
                    style={{ textDecoration: 'none', color: 'var(--black)', display: 'flex', alignItems: 'center', minHeight: 'var(--touch-min)', padding: 'var(--space-2) 0' }}
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer Links */}
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', borderTop: '2px solid var(--black)', paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-10)' }}>
            <Link href="/search" onClick={toggleMenu} className="wired-ui hover-link" style={{ fontSize: '16px', display: 'flex', alignItems: 'center', gap: 'var(--space-2)', minHeight: 'var(--touch-min)' }}>
              <Search size={18} /> ARCHIVE SEARCH
            </Link>
            <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
              <Link href="/latest" onClick={toggleMenu} className="wired-mono hover-link" style={{ fontSize: '12px', minHeight: 'var(--touch-min)', display: 'flex', alignItems: 'center' }}>LATEST</Link>
              <Link href="/about" onClick={toggleMenu} className="wired-mono hover-link" style={{ fontSize: '12px', minHeight: 'var(--touch-min)', display: 'flex', alignItems: 'center' }}>ABOUT</Link>
              <Link href="/contact" onClick={toggleMenu} className="wired-mono hover-link" style={{ fontSize: '12px', minHeight: 'var(--touch-min)', display: 'flex', alignItems: 'center' }}>CONTACT</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


