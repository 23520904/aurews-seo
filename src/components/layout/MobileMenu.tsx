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

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="universal-menu" style={{ position: 'relative' }}>
      <button
        onClick={toggleMenu}
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={28} color="var(--wired-black)" /> : <Menu size={28} color="var(--wired-black)" />}

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
            background: 'rgba(0,0,0,0.6)',
            zIndex: 998,
            backdropFilter: 'blur(8px)'
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
          background: 'var(--paper-white)',
          zIndex: 999,
          transition: 'right 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: '-10px 0 50px rgba(0,0,0,0.2)',
          padding: '40px 0',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        <div style={{ padding: '0 40px', marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '4px solid var(--wired-black)', paddingBottom: '20px' }}>
            <h2 className="wired-display" style={{ fontSize: '36px', margin: 0, letterSpacing: '-1px' }}>AUREWS</h2>
            <button onClick={toggleMenu} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>
              <X size={32} />
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', padding: '0 40px', flex: 1 }}>
          {/* User Status */}
          <div style={{ padding: '24px', border: '2px solid var(--wired-black)', background: '#f0f0f0' }}>
            {session ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="wired-mono" style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--caption-gray)' }}>
                  <User size={16} /> {session.user?.name?.toUpperCase()}
                </div>
                <Link href="/dashboard" onClick={toggleMenu} className="wired-ui hover-link" style={{ fontWeight: 800, fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <LayoutDashboard size={20} /> CONTROL CENTER
                </Link>
                <form action={logout}>
                  <button type="submit" className="wired-ui" style={{ fontWeight: 800, fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px', background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#ff0000' }}>
                    <LogOut size={20} /> LOGOUT
                  </button>
                </form>
              </div>
            ) : (
              <Link href="/auth/login" onClick={toggleMenu} className="wired-ui hover-link" style={{ fontWeight: 800, fontSize: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <User size={22} /> SYSTEM ACCESS
              </Link>
            )}
          </div>

          {/* Categories */}
          <nav>
            <div className="wired-mono" style={{ fontSize: '12px', fontWeight: 700, marginBottom: '24px', borderBottom: '1px solid var(--hairline-tint)', paddingBottom: '8px', letterSpacing: '2px' }}>CHANNELS</div>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {['Business', 'Tech & Innovation', 'A.I.', 'Money & Markets', 'Lifestyle', 'Politics'].map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/category/${cat.toLowerCase().replace(/\./g, '').replace(/ & /g, '-').replace(/ /g, '-')}`}
                    onClick={toggleMenu}
                    className="wired-display hover-link"
                    style={{ fontSize: '28px', fontWeight: 700, textDecoration: 'none', color: 'var(--wired-black)' }}
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer Links */}
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', borderTop: '2px solid var(--wired-black)', paddingTop: '32px', paddingBottom: '40px' }}>
            <Link href="/search" onClick={toggleMenu} className="wired-ui hover-link" style={{ fontWeight: 800, fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Search size={20} /> ARCHIVE SEARCH
            </Link>
            <div style={{ display: 'flex', gap: '24px' }}>
              <Link href="/latest" onClick={toggleMenu} className="wired-mono hover-link" style={{ fontSize: '13px', fontWeight: 700 }}>LATEST</Link>
              <Link href="/about" onClick={toggleMenu} className="wired-mono hover-link" style={{ fontSize: '13px', fontWeight: 700 }}>ABOUT</Link>
              <Link href="/contact" onClick={toggleMenu} className="wired-mono hover-link" style={{ fontSize: '13px', fontWeight: 700 }}>CONTACT</Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .universal-menu {
          display: block;
        }
        @media (max-width: 768px) {
          .desktop-only {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}


