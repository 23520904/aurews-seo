"use client";

import React, { useState } from "react";

interface ShareButtonsProps {
  url: string;
  title: string;
}

// Crisp, pixel-perfect premium SVG Icons
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.446L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.747 1.45 5.515 0 10.002-4.484 10.005-9.998.002-2.673-1.037-5.184-2.927-7.076C16.486 1.638 13.98 1.002 11.31 1.002 5.79 1.002 1.302 5.487 1.3 11.002c-.001 1.67.452 3.3 1.311 4.721L1.625 21.1l5.022-1.318-.003.003-.003-.003z" />
  </svg>
);

const LinkIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const getShareUrl = (url: string) => {
  if (url.includes("localhost") || url.includes("127.0.0.1")) {
    return url.replace(/https?:\/\/(localhost|127\.0\.0\.1):\d+/, "https://www.aurews.id.vn");
  }
  return url;
};

export const ShareButtons = ({ url, title }: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false);

  // Encode values for query params
  const encodedTitle = encodeURIComponent(title);
  
  // Ensure that the share URL uses the production domain if running on localhost or development,
  // so that social debuggers and sharer dialogs don't crash.
  const shareUrl = getShareUrl(url);
  
  // Platform share URLs with UTM parameters
  const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    `${shareUrl}?utm_source=facebook&utm_medium=social&utm_campaign=share`
  )}`;
  
  const xShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    `${shareUrl}?utm_source=twitter&utm_medium=social&utm_campaign=share`
  )}&text=${encodedTitle}`;
  
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    `${shareUrl}?utm_source=linkedin&utm_medium=social&utm_campaign=share`
  )}`;
  
  const waShareUrl = `https://wa.me/?text=${encodeURIComponent(
    `${title} - ${shareUrl}?utm_source=whatsapp&utm_medium=social&utm_campaign=share`
  )}`;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.style.position = "fixed"; // Avoid scrolling to bottom
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Fallback copy failed", err);
      }
      document.body.removeChild(textarea);
    }
  };

  return (
    <>
      {/* 1. FLOATING SIDEBAR (Desktop only) */}
      <aside className="share-floating" aria-label="Share article sticky">
        <a href={fbShareUrl} target="_blank" rel="noopener noreferrer" className="share-btn-compact" title="Share on Facebook">
          <FacebookIcon />
        </a>
        <a href={xShareUrl} target="_blank" rel="noopener noreferrer" className="share-btn-compact" title="Share on X">
          <XIcon />
        </a>
        <a href={linkedinShareUrl} target="_blank" rel="noopener noreferrer" className="share-btn-compact" title="Share on LinkedIn">
          <LinkedInIcon />
        </a>
        <a href={waShareUrl} target="_blank" rel="noopener noreferrer" className="share-btn-compact" title="Share on WhatsApp">
          <WhatsAppIcon />
        </a>
        <button onClick={handleCopyLink} className="share-btn-compact" title={copied ? "Copied!" : "Copy Link"}>
          {copied ? <CheckIcon /> : <LinkIcon />}
        </button>
      </aside>

      {/* 2. INLINE SHARE BUTTONS (Below Title) */}
      <div className="article-share-inline" style={{ margin: "var(--space-4) 0 var(--space-6) 0" }}>
        <div style={{ marginBottom: "var(--space-3)" }}>
          <span className="wired-mono" style={{ fontWeight: 700 }}>Share This Article</span>
        </div>
        <div className="share-buttons-group">
          <a href={fbShareUrl} target="_blank" rel="noopener noreferrer" className="share-btn" aria-label="Share on Facebook">
            <FacebookIcon />
            <span style={{ marginLeft: "var(--space-2)" }}>Facebook</span>
          </a>
          <a href={xShareUrl} target="_blank" rel="noopener noreferrer" className="share-btn" aria-label="Share on X">
            <XIcon />
            <span style={{ marginLeft: "var(--space-2)" }}>X</span>
          </a>
          <a href={linkedinShareUrl} target="_blank" rel="noopener noreferrer" className="share-btn" aria-label="Share on LinkedIn">
            <LinkedInIcon />
            <span style={{ marginLeft: "var(--space-2)" }}>LinkedIn</span>
          </a>
          <a href={waShareUrl} target="_blank" rel="noopener noreferrer" className="share-btn" aria-label="Share on WhatsApp">
            <WhatsAppIcon />
            <span style={{ marginLeft: "var(--space-2)" }}>WhatsApp</span>
          </a>
          <button onClick={handleCopyLink} className="share-btn" aria-label="Copy article link">
            {copied ? <CheckIcon /> : <LinkIcon />}
            <span style={{ marginLeft: "var(--space-2)" }}>{copied ? "Copied!" : "Copy Link"}</span>
          </button>
        </div>
      </div>
    </>
  );
};

// 3. BOTTOM SHARE BUTTONS (End of Article)
export const ShareButtonsBottom = ({ url, title }: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false);
  const encodedTitle = encodeURIComponent(title);
  
  const shareUrl = getShareUrl(url);
  
  const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    `${shareUrl}?utm_source=facebook&utm_medium=social&utm_campaign=share`
  )}`;
  
  const xShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    `${shareUrl}?utm_source=twitter&utm_medium=social&utm_campaign=share`
  )}&text=${encodedTitle}`;
  
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    `${shareUrl}?utm_source=linkedin&utm_medium=social&utm_campaign=share`
  )}`;
  
  const waShareUrl = `https://wa.me/?text=${encodeURIComponent(
    `${title} - ${shareUrl}?utm_source=whatsapp&utm_medium=social&utm_campaign=share`
  )}`;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Fallback copy failed", err);
      }
      document.body.removeChild(textarea);
    }
  };

  return (
    <div className="article-share-bottom" style={{ marginTop: "var(--space-12)", marginBottom: "var(--space-8)" }}>
      <hr className="rule-black" style={{ marginBottom: "var(--space-6)" }} />
      <div style={{ marginBottom: "var(--space-4)" }}>
        <p className="wired-body" style={{ fontWeight: 700, fontStyle: "italic" }}>
          Found this helpful? Share with your network.
        </p>
      </div>
      <div className="share-buttons-group">
        <a href={fbShareUrl} target="_blank" rel="noopener noreferrer" className="share-btn" aria-label="Share on Facebook">
          <FacebookIcon />
          <span style={{ marginLeft: "var(--space-2)" }}>Share on Facebook</span>
        </a>
        <a href={xShareUrl} target="_blank" rel="noopener noreferrer" className="share-btn" aria-label="Share on X">
          <XIcon />
          <span style={{ marginLeft: "var(--space-2)" }}>Share on X</span>
        </a>
        <a href={linkedinShareUrl} target="_blank" rel="noopener noreferrer" className="share-btn" aria-label="Share on LinkedIn">
          <LinkedInIcon />
          <span style={{ marginLeft: "var(--space-2)" }}>Share on LinkedIn</span>
        </a>
        <a href={waShareUrl} target="_blank" rel="noopener noreferrer" className="share-btn" aria-label="Share on WhatsApp">
          <WhatsAppIcon />
          <span style={{ marginLeft: "var(--space-2)" }}>Share via WhatsApp</span>
        </a>
        <button onClick={handleCopyLink} className="share-btn" aria-label="Copy article link">
          {copied ? <CheckIcon /> : <LinkIcon />}
          <span style={{ marginLeft: "var(--space-2)" }}>{copied ? "Copied!" : "Copy Link"}</span>
        </button>
      </div>
    </div>
  );
};
