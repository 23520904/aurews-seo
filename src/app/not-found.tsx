import Link from "next/link";
import { Search, Home as HomeIcon, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="wired-wrapper" style={{ 
      minHeight: '70vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center',
      textAlign: 'center',
      padding: 'var(--space-16) var(--gutter)'
    }}>
      <div style={{ marginBottom: 'var(--space-12)' }}>
        <span className="wired-mono" style={{ 
          fontSize: 'clamp(3rem, 10vw, 8rem)', 
          fontWeight: 700, 
          color: 'var(--hairline)',
          lineHeight: 1,
          display: 'block'
        }}>
          404
        </span>
        <h1 className="wired-display" style={{ 
          fontSize: 'clamp(1.5rem, 5vw, 3rem)', 
          marginTop: 'calc(-1 * var(--space-8))',
          position: 'relative',
          zIndex: 1
        }}>
          PAGE NOT FOUND
        </h1>
      </div>

      <p className="wired-body" style={{ 
        maxWidth: '500px', 
        fontSize: '18px', 
        color: 'var(--caption)', 
        marginBottom: 'var(--space-10)' 
      }}>
        The architecture of this URL seems to be broken or the information has been redacted. 
        Verify the address or return to our control center.
      </p>

      <div style={{ 
        display: 'flex', 
        gap: 'var(--space-4)', 
        flexWrap: 'wrap', 
        justifyContent: 'center' 
      }}>
        <Link href="/" className="wired-button inverted">
          <HomeIcon size={18} style={{ marginRight: '8px' }} />
          RETURN HOME
        </Link>
        <Link href="/search" className="wired-button">
          <Search size={18} style={{ marginRight: '8px' }} />
          SEARCH ARCHIVES
        </Link>
      </div>

      <div style={{ 
        marginTop: 'var(--space-16)', 
        paddingTop: 'var(--space-8)', 
        borderTop: '2px solid var(--black)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h3 className="wired-mono" style={{ fontSize: '12px', marginBottom: 'var(--space-4)' }}>SYSTEM SHORTCUTS</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <Link href="/latest" className="wired-ui hover-link" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            LATEST UPDATES <ArrowRight size={14} />
          </Link>
          <Link href="/category/tech-innovation" className="wired-ui hover-link" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            TECH & INNOVATION <ArrowRight size={14} />
          </Link>
          <Link href="/category/ai" className="wired-ui hover-link" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            A.I. CHANNELS <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
