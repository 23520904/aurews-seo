import { Ribbon } from "@/components/ui/Ribbon";
export const runtime = 'nodejs';
export const metadata = {
  title: "Privacy Policy",
  description: "How Aurews handles your data and protects your digital footprint.",
};

export default function PrivacyPage() {
  return (
    <div className="wired-wrapper">
      <header style={{ marginBottom: '64px', borderBottom: '2px solid var(--wired-black)', paddingBottom: '32px' }}>
        <Ribbon>Data Protocol</Ribbon>
        <h1 className="wired-display" style={{ fontSize: '72px', fontWeight: 700, marginTop: '24px', letterSpacing: '-3px' }}>
          PRIVACY POLICY
        </h1>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '80px' }}>
        <aside className="desktop-only">
          <div className="wired-mono" style={{ position: 'sticky', top: '40px', fontSize: '11px', lineHeight: '2' }}>
            <div style={{ marginBottom: '24px', borderLeft: '4px solid var(--wired-black)', paddingLeft: '16px' }}>
              01. DATA COLLECTION<br />
              02. USAGE PROTOCOLS<br />
              03. STORAGE ARCHITECTURE<br />
              04. USER RIGHTS
            </div>
            <div style={{ color: 'var(--caption-gray)' }}>
              LAST MODIFIED: MAY 2026<br />
              VERSION: 1.0.4-STABLE
            </div>
          </div>
        </aside>

        <section className="wired-body" style={{ fontSize: '18px', lineHeight: '1.8' }}>
          <p style={{ fontSize: '24px', fontWeight: 600, marginBottom: '40px', borderBottom: '1px solid var(--hairline-tint)', paddingBottom: '20px' }}>
            At Aurews, we treat user data as a structural asset that must be protected with the same rigor as our editorial integrity.
          </p>

          <h2 className="wired-display" style={{ fontSize: '32px', margin: '64px 0 24px' }}>01. DATA COLLECTION</h2>
          <p>
            We collect minimal telemetry required for archival delivery. This includes IP addresses for security auditing and browser signatures to optimize the architectural rendering of our platform. We do not engage in cross-site behavioral tracking.
          </p>

          <h2 className="wired-display" style={{ fontSize: '32px', margin: '64px 0 24px' }}>02. USAGE PROTOCOLS</h2>
          <p>
            Your information is used exclusively to facilitate the "Command Center" (Dashboard) experience and to personalize the archival feed. We do not sell data to third-party archival brokers.
          </p>

          <h2 className="wired-display" style={{ fontSize: '32px', margin: '64px 0 24px' }}>03. STORAGE ARCHITECTURE</h2>
          <p>
            Aurews utilizes Upstash Redis and Supabase PostgreSQL for encrypted state management. All transmission is secured via TLS 1.3. Sessions are managed via rotating stateless tokens to minimize long-term exposure.
          </p>

          <h2 className="wired-display" style={{ fontSize: '32px', margin: '64px 0 24px' }}>04. USER RIGHTS</h2>
          <p>
            In accordance with global data protection frameworks (GDPR/CCPA), users retain full sovereignty over their digital footprint. You may request a complete archival purge of your account via the Control Center.
          </p>

          <div style={{ marginTop: '80px', padding: '40px', border: '1px dashed var(--wired-black)', background: '#f9f9f9' }}>
            <p className="wired-mono" style={{ fontSize: '12px', margin: 0 }}>
              CONTACT THE ARCHIVAL AUDITOR: <br />
              <span style={{ fontWeight: 700 }}>PRIVACY@AUREWS.ID.VN</span>
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
