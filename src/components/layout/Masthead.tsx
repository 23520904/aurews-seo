import Link from "next/link";

export const Masthead = () => {
  return (
    <header style={{ borderBottom: '2px solid var(--wired-black)', padding: '24px 0' }}>
      <div className="wired-wrapper">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <Link href="/">
            <h1 className="wired-display" style={{ fontSize: '48px', fontWeight: 700, margin: 0 }}>AUREWS</h1>
          </Link>
        </div>
        <nav style={{ borderTop: '1px solid var(--hairline-tint)', paddingTop: '12px' }}>
          <ul style={{ display: 'flex', justifyContent: 'center', gap: '32px', listStyle: 'none' }}>
            <li><Link href="/category/business" className="wired-ui hover-link" style={{ fontWeight: 600 }}>Business</Link></li>
            <li><Link href="/category/tech-innovation" className="wired-ui hover-link" style={{ fontWeight: 600 }}>Tech & Innovation</Link></li>
            <li><Link href="/category/ai" className="wired-ui hover-link" style={{ fontWeight: 600 }}>A.I.</Link></li>
            <li><Link href="/category/money-markets" className="wired-ui hover-link" style={{ fontWeight: 600 }}>Money & Markets</Link></li>
            <li><Link href="/category/lifestyle" className="wired-ui hover-link" style={{ fontWeight: 600 }}>Lifestyle</Link></li>
            <li><Link href="/category/politics" className="wired-ui hover-link" style={{ fontWeight: 600 }}>Politics</Link></li>
            <li style={{ marginLeft: '16px', paddingLeft: '16px', borderLeft: '1px solid var(--hairline-tint)' }}>
              <Link href="/search" className="wired-ui hover-link" style={{ fontWeight: 700 }}>SEARCH</Link>
            </li>
          </ul>

        </nav>
      </div>
    </header>
  );
};
