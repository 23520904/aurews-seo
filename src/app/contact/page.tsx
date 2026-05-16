import { Button } from "@/components/ui/Button";
import { Ribbon } from "@/components/ui/Ribbon";
import { CONTACT_EMAIL, FACEBOOK_PAGE } from "@/lib/constants";

export const metadata = {
  title: "Contact",
  description: "Get in touch with the Aurews team for inquiries, feedback, or media requests.",
  alternates: {
    canonical: "/contact",
  },
}

export default function ContactPage() {
  return (
    <div className="wired-wrapper" style={{ padding: '80px 0' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Ribbon>Connect</Ribbon>
        <h1 className="wired-display" style={{ fontSize: '48px', margin: '24px 0' }}>Get in Touch</h1>
        <p className="wired-body" style={{ fontSize: '18px', color: 'var(--caption-gray)', marginBottom: '48px' }}>
          Have a tip, a question, or a proposal? Use the form below or reach out directly to our editorial desk.
        </p>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <label className="wired-mono" style={{ fontSize: '12px', display: 'block', marginBottom: '8px' }}>Subject</label>
            <select style={{ width: '100%', padding: '12px', border: '2px solid var(--wired-black)', fontFamily: 'var(--font-ui)', appearance: 'none', background: 'white' }}>
              <option>Editorial Inquiry</option>
              <option>Technical Support</option>
              <option>Partnerships</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="wired-mono" style={{ fontSize: '12px', display: 'block', marginBottom: '8px' }}>Email Address</label>
            <input
              type="email"
              required
              style={{ width: '100%', padding: '12px', border: '2px solid var(--wired-black)', fontFamily: 'var(--font-ui)' }}
            />
          </div>
          <div>
            <label className="wired-mono" style={{ fontSize: '12px', display: 'block', marginBottom: '8px' }}>Message</label>
            <textarea
              rows={6}
              required
              style={{ width: '100%', padding: '12px', border: '2px solid var(--wired-black)', fontFamily: 'var(--font-body)', resize: 'none' }}
            />
          </div>
          <Button type="submit" variant="inverted">Send Message</Button>
        </form>

        <div style={{ marginTop: '80px', borderTop: '1px solid var(--hairline-tint)', paddingTop: '40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <div>
              <h3 className="wired-mono" style={{ fontSize: '13px', marginBottom: '8px' }}>EMAIL</h3>
              <a href={`mailto:${CONTACT_EMAIL}`} className="wired-ui hover-link" style={{ fontWeight: 700, fontSize: '14px', wordBreak: 'break-all' }}>
                {CONTACT_EMAIL}
              </a>
            </div>
            <div>
              <h3 className="wired-mono" style={{ fontSize: '13px', marginBottom: '8px' }}>FACEBOOK</h3>
              <a href={FACEBOOK_PAGE} target="_blank" rel="noopener noreferrer" className="wired-ui hover-link" style={{ fontWeight: 700, fontSize: '14px' }}>
                Aurews Official
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
