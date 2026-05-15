import Link from "next/link";

export const Footer = () => {
  return (
    <footer style={{ background: 'var(--ink)', color: 'var(--paper)', padding: 'var(--space-16) 0 var(--space-8)' }}>
      <div className="wired-wrapper">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: 'var(--space-12)', 
          marginBottom: 'var(--space-16)' 
        }}>
          <div>
            <h2 className="wired-display" style={{ fontSize: '24px', marginBottom: 'var(--space-6)' }}>AUREWS</h2>
            <p className="wired-body" style={{ fontSize: '14px', color: '#a3a3a3' }}>
              Next-generation news architecture inspired by editorial excellence and technical precision.
            </p>
          </div>
          <div>
            <h3 className="wired-mono" style={{ fontSize: '12px', marginBottom: 'var(--space-4)', color: '#a3a3a3' }}>Sections</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <li><Link href="/category/business" className="wired-ui hover-link" style={{ fontSize: '14px' }}>Business</Link></li>
              <li><Link href="/category/tech-innovation" className="wired-ui hover-link" style={{ fontSize: '14px' }}>Tech & Innovation</Link></li>
              <li><Link href="/category/ai" className="wired-ui hover-link" style={{ fontSize: '14px' }}>A.I.</Link></li>
              <li><Link href="/category/politics" className="wired-ui hover-link" style={{ fontSize: '14px' }}>Politics</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="wired-mono" style={{ fontSize: '12px', marginBottom: 'var(--space-4)', color: '#a3a3a3' }}>Connect</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <li><Link href="/about" className="wired-ui hover-link" style={{ fontSize: '14px' }}>About Us</Link></li>
              <li><Link href="/contact" className="wired-ui hover-link" style={{ fontSize: '14px' }}>Contact</Link></li>
              <li><Link href="/newsletter" className="wired-ui hover-link" style={{ fontSize: '14px' }}>Newsletter</Link></li>
            </ul>
          </div>
        </div>
        <div style={{ 
          borderTop: '1px solid #333', 
          paddingTop: 'var(--space-8)', 
          display: 'flex', 
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between', 
          alignItems: 'center',
          gap: 'var(--space-6)'
        }}>
          <span className="wired-mono" style={{ fontSize: '11px', color: '#a3a3a3' }}>© 2026 AUREWS. ALL RIGHTS RESERVED.</span>
          <nav style={{ display: 'flex', gap: 'var(--space-6)' }}>
            <Link href="/privacy" className="wired-mono hover-link" style={{ fontSize: '11px', color: '#a3a3a3' }}>Privacy Policy</Link>
            <Link href="/terms" className="wired-mono hover-link" style={{ fontSize: '11px', color: '#a3a3a3' }}>Terms of Service</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};
