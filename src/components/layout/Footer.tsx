import Link from "next/link";

export const Footer = () => {
  return (
    <footer style={{ background: 'var(--wired-black)', color: 'var(--paper-white)', padding: 'clamp(40px, 8vw, 80px) 0 40px' }}>
      <div className="wired-wrapper">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '48px', marginBottom: '64px' }}>
          <div>
            <h2 className="wired-display" style={{ fontSize: '28px', marginBottom: '24px', letterSpacing: '-1px' }}>AUREWS</h2>
            <p className="wired-body" style={{ fontSize: '14px', color: 'var(--disabled-gray)', maxWidth: '30ch' }}>
              Next-generation news architecture inspired by editorial excellence and technical precision.
            </p>
          </div>
          <nav aria-label="Footer Sections">
            <h3 className="wired-mono" style={{ fontSize: '13px', marginBottom: '24px', color: 'var(--disabled-gray)' }}>Channels</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><Link href="/category/business" className="wired-ui hover-link">Business</Link></li>
              <li><Link href="/category/tech-innovation" className="wired-ui hover-link">Tech & Innovation</Link></li>
              <li><Link href="/category/ai" className="wired-ui hover-link">A.I. Research</Link></li>
              <li><Link href="/category/politics" className="wired-ui hover-link">Global Politics</Link></li>
            </ul>
          </nav>
          <nav aria-label="Corporate Links">
            <h3 className="wired-mono" style={{ fontSize: '13px', marginBottom: '24px', color: 'var(--disabled-gray)' }}>Connect</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><Link href="/about" className="wired-ui hover-link">About Architecture</Link></li>
              <li><Link href="/contact" className="wired-ui hover-link">Terminal Contact</Link></li>
              <li><Link href="/newsletter" className="wired-ui hover-link">Dispatch Newsletter</Link></li>
            </ul>
          </nav>
        </div>

        <div style={{ borderTop: '1px solid #222', paddingTop: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', gap: '24px' }} className="footer-bottom">

          <span className="wired-mono" style={{ fontSize: '10px', color: 'var(--disabled-gray)' }}>
            © {new Date().getFullYear()} AUREWS. ALL SYSTEMS NOMINAL.
          </span>
          <nav style={{ display: 'flex', gap: '32px' }} aria-label="Legal">
            <Link href="/privacy" className="wired-mono hover-link" style={{ fontSize: '10px', color: 'var(--disabled-gray)' }}>Privacy</Link>
            <Link href="/terms" className="wired-mono hover-link" style={{ fontSize: '10px', color: 'var(--disabled-gray)' }}>Terms</Link>
          </nav>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (min-width: 768px) {
          .footer-bottom {
            flex-direction: row !important;
          }
        }
      `}} />
    </footer>
  );
};

