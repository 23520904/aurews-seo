import { Ribbon } from "@/components/ui/Ribbon";

export const metadata = {
  title: "Terms of Service",
  description: "Operational framework and legal boundaries for the Aurews platform.",
};

export default function TermsPage() {
  return (
    <div className="wired-wrapper">
      <header style={{ marginBottom: '64px', borderBottom: '2px solid var(--wired-black)', paddingBottom: '32px' }}>
        <Ribbon>Legal Framework</Ribbon>
        <h1 className="wired-display" style={{ fontSize: '72px', fontWeight: 700, marginTop: '24px', letterSpacing: '-3px' }}>
          TERMS OF SERVICE
        </h1>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '80px' }}>
        <aside className="desktop-only">
          <div className="wired-mono" style={{ position: 'sticky', top: '40px', fontSize: '11px', lineHeight: '2' }}>
            <div style={{ marginBottom: '24px', borderLeft: '4px solid var(--wired-black)', paddingLeft: '16px' }}>
              01. LICENSE TO ACCESS<br />
              02. EDITORIAL INTEGRITY<br />
              03. SYSTEM FAIR USE<br />
              04. LIMITATION OF LIABILITY
            </div>
            <div style={{ color: 'var(--caption-gray)' }}>
              REVISION: MAY 2026<br />
              ID: TS-0092-ALPHA
            </div>
          </div>
        </aside>

        <section className="wired-body" style={{ fontSize: '18px', lineHeight: '1.8' }}>
          <p style={{ fontSize: '24px', fontWeight: 600, marginBottom: '40px', borderBottom: '1px solid var(--hairline-tint)', paddingBottom: '20px' }}>
            Access to the Aurews archival platform is subject to the following structural mandates and operational agreements.
          </p>

          <h2 className="wired-display" style={{ fontSize: '32px', margin: '64px 0 24px' }}>01. LICENSE TO ACCESS</h2>
          <p>
            Users are granted a limited, non-exclusive license to interact with the Aurews repository. Scraping, reverse-engineering the architectural CSS variables, or unauthorized archival injection is strictly prohibited.
          </p>

          <h2 className="wired-display" style={{ fontSize: '32px', margin: '64px 0 24px' }}>02. EDITORIAL INTEGRITY</h2>
          <p>
            All content served via the Aurews platform is protected by international copyright law. Commercial redistribution without explicit JSON-LD attribution or backlink verification is a breach of these terms.
          </p>

          <h2 className="wired-display" style={{ fontSize: '32px', margin: '64px 0 24px' }}>03. SYSTEM FAIR USE</h2>
          <p>
            Automated requests that exceed 60 requests per minute may trigger a permanent archival firewall. We utilize Upstash Redis for real-time rate limiting to ensure platform stability for all editorial staff.
          </p>

          <h2 className="wired-display" style={{ fontSize: '32px', margin: '64px 0 24px' }}>04. LIMITATION OF LIABILITY</h2>
          <p>
            Aurews is provided "as-is." We do not guarantee 100% archival uptime during system refactoring or database migrations. We are not liable for any intellectual damage resulting from the consumption of our "Brutalist" design patterns.
          </p>

          <div style={{ marginTop: '80px', padding: '40px', border: '2px solid var(--wired-black)', background: 'var(--wired-black)', color: 'white' }}>
            <p className="wired-mono" style={{ fontSize: '12px', margin: 0 }}>
              BY PROCEEDING TO THE DASHBOARD, YOU AGREE TO THESE ARCHITECTURAL MANDATES.
            </p>
          </div>
        </section>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @media (max-width: 900px) {
          .wired-wrapper > div { grid-template-columns: 1fr !important; }
        }
      `}} />
    </div>
  );
}
