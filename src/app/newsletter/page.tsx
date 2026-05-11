import { Button } from "@/components/ui/Button";
import { Ribbon } from "@/components/ui/Ribbon";

export default function NewsletterPage() {
  return (
    <div className="wired-wrapper" style={{ padding: '80px 0' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <Ribbon>The Briefing</Ribbon>
        <h1 className="wired-display" style={{ fontSize: '64px', margin: '24px 0' }}>Subscribe</h1>
        <p className="wired-body" style={{ fontSize: '20px', color: 'var(--caption-gray)', marginBottom: '48px' }}>
          Get the most important editorial insights and architectural analysis delivered directly to your inbox every Sunday.
        </p>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <input 
            type="email" 
            required 
            placeholder="EMAIL ADDRESS"
            style={{ width: '100%', padding: '16px', border: '2px solid var(--wired-black)', fontFamily: 'var(--font-ui)', fontSize: '18px', textAlign: 'center' }} 
          />
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
             <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
               <input type="checkbox" style={{ accentColor: 'var(--wired-black)' }} />
               <span className="wired-mono" style={{ fontSize: '11px' }}>WEEKLY BRIEFING</span>
             </label>
             <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
               <input type="checkbox" style={{ accentColor: 'var(--wired-black)' }} />
               <span className="wired-mono" style={{ fontSize: '11px' }}>BREAKING ALERTS</span>
             </label>
          </div>
          <Button type="submit" variant="inverted" style={{ padding: '16px 32px' }}>JOIN THE LIST</Button>
        </form>

        <p className="wired-mono" style={{ fontSize: '10px', color: 'var(--disabled-gray)', marginTop: '48px' }}>
          BY SUBSCRIBING, YOU AGREE TO OUR TERMS OF SERVICE AND PRIVACY POLICY. NO SPAM. JUST ARCHITECTURE.
        </p>
      </div>
    </div>
  );
}
