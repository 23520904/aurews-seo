import { Ribbon } from "@/components/ui/Ribbon";

export default function AboutPage() {
  return (
    <div className="wired-wrapper" style={{ padding: '80px 0' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Ribbon>Information</Ribbon>
        <h1 className="wired-display" style={{ fontSize: '72px', margin: '24px 0 48px' }}>
          The Aurews Manifesto
        </h1>
        
        <div className="wired-body" style={{ fontSize: '21px', lineHeight: 1.6, color: 'var(--page-ink)' }}>
          <p style={{ marginBottom: '32px' }}>
            Aurews is a next-generation news architecture designed for the intelligent age. We believe that editorial excellence requires technical precision, and that the design of information is as important as the information itself.
          </p>
          
          <h2 className="wired-ui" style={{ fontSize: '28px', fontWeight: 700, margin: '64px 0 24px', borderBottom: '2px solid var(--wired-black)', paddingBottom: '12px' }}>
            Our Philosophy
          </h2>
          
          <p style={{ marginBottom: '24px' }}>
            Inspired by the brutalist aesthetics of early print journalism and the high-contrast digital interfaces of the modern web, Aurews is built to be fast, clear, and uncompromising.
          </p>
          
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '32px', marginTop: '48px' }}>
            <li style={{ borderLeft: '4px solid var(--wired-black)', paddingLeft: '24px' }}>
              <span className="wired-mono" style={{ fontSize: '13px', fontWeight: 700, display: 'block', marginBottom: '8px' }}>01. EDITORIAL INTEGRITY</span>
              <p style={{ fontSize: '16px' }}>Every story must earn its place. We value depth over volume, and insight over noise.</p>
            </li>
            <li style={{ borderLeft: '4px solid var(--wired-black)', paddingLeft: '24px' }}>
              <span className="wired-mono" style={{ fontSize: '13px', fontWeight: 700, display: 'block', marginBottom: '8px' }}>02. ARCHITECTURAL RIGOR</span>
              <p style={{ fontSize: '16px' }}>Our platform is built on strict standards. No rounded corners, no shadows, no distractions.</p>
            </li>
            <li style={{ borderLeft: '4px solid var(--wired-black)', paddingLeft: '24px' }}>
              <span className="wired-mono" style={{ fontSize: '13px', fontWeight: 700, display: 'block', marginBottom: '8px' }}>03. FUTURE-PROOFING</span>
              <p style={{ fontSize: '16px' }}>We are optimized for the agentic web, ensuring our content is accessible to both humans and machines.</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
