import Link from "next/link";

export const Footer = () => {
  return (
    <footer style={{ background: 'var(--page-ink)', color: 'var(--paper-white)', padding: '64px 0 32px' }}>
      <div className="wired-wrapper">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px', marginBottom: '64px' }}>
          <div>
            <h2 className="wired-display" style={{ fontSize: '24px', marginBottom: '24px' }}>AUREWS</h2>
            <p className="wired-body" style={{ fontSize: '14px', color: 'var(--caption-gray)' }}>
              Next-generation news architecture inspired by editorial excellence and technical precision.
            </p>
          </div>
          <div>
            <h3 className="wired-mono" style={{ fontSize: '13px', marginBottom: '16px' }}>Sections</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><Link href="/category/business" className="wired-ui" style={{ fontSize: '14px' }}>Business</Link></li>
              <li><Link href="/category/tech-innovation" className="wired-ui" style={{ fontSize: '14px' }}>Tech & Innovation</Link></li>
              <li><Link href="/category/ai" className="wired-ui" style={{ fontSize: '14px' }}>A.I.</Link></li>
              <li><Link href="/category/politics" className="wired-ui" style={{ fontSize: '14px' }}>Politics</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="wired-mono" style={{ fontSize: '13px', marginBottom: '16px' }}>Connect</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><Link href="/about" className="wired-ui" style={{ fontSize: '14px' }}>About Us</Link></li>
              <li><Link href="/contact" className="wired-ui" style={{ fontSize: '14px' }}>Contact</Link></li>
              <li><Link href="/newsletter" className="wired-ui" style={{ fontSize: '14px' }}>Newsletter</Link></li>
            </ul>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #333', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="wired-mono" style={{ fontSize: '11px', color: 'var(--caption-gray)' }}>© 2026 AUREWS. ALL RIGHTS RESERVED.</span>
          <nav style={{ display: 'flex', gap: '24px' }}>
            <Link href="/privacy" className="wired-mono" style={{ fontSize: '11px', color: 'var(--caption-gray)' }}>Privacy Policy</Link>
            <Link href="/terms" className="wired-mono" style={{ fontSize: '11px', color: 'var(--caption-gray)' }}>Terms of Service</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};
