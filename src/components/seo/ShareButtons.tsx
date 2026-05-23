"use client";

import React, { useState } from "react";

interface ShareButtonsProps {
  url: string;
  title: string;
}

// Modern crisp SVG icons
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.446L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.747 1.45 5.515 0 10.002-4.484 10.005-9.998.002-2.673-1.037-5.184-2.927-7.076C16.486 1.638 13.98 1.002 11.31 1.002 5.79 1.002 1.302 5.487 1.3 11.002c-.001 1.67.452 3.3 1.311 4.721L1.625 21.1l5.022-1.318-.003.003-.003-.003z" />
  </svg>
);

const LinkIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const MoreIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1.5" />
    <circle cx="19" cy="12" r="1.5" />
    <circle cx="5" cy="12" r="1.5" />
  </svg>
);

const getShareUrl = (url: string) => {
  if (url.includes("localhost") || url.includes("127.0.0.1")) {
    return url.replace(/https?:\/\/(localhost|127\.0\.0\.1):\d+/, "https://aurews.id.vn");
  }
  return url;
};

export const ShareButtons = ({ url, title }: ShareButtonsProps) => {
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

  const handleNativeShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Check out this article: ${title}`,
          url: shareUrl,
        });
      } catch (err) {
        console.log("Native share cancelled or failed", err);
      }
    } else {
      handleCopyLink();
    }
  };

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
        console.error("Copy failed", err);
      }
      document.body.removeChild(textarea);
    }
  };

  const supportsNativeShare = typeof navigator !== "undefined" && !!navigator.share;

  return (
    <aside className="share-floating" aria-label="Share article sticky">
      <a href={fbShareUrl} target="_blank" rel="noopener noreferrer" className="share-btn-round facebook" title="Share on Facebook">
        <FacebookIcon />
      </a>
      <a href={xShareUrl} target="_blank" rel="noopener noreferrer" className="share-btn-round x-platform" title="Share on X">
        <XIcon />
      </a>
      <a href={linkedinShareUrl} target="_blank" rel="noopener noreferrer" className="share-btn-round linkedin" title="Share on LinkedIn">
        <LinkedInIcon />
      </a>
      <a href={waShareUrl} target="_blank" rel="noopener noreferrer" className="share-btn-round whatsapp" title="Share on WhatsApp">
        <WhatsAppIcon />
      </a>
      {supportsNativeShare ? (
        <button onClick={handleNativeShare} className="share-btn-round native-share" title="Share to other apps">
          <MoreIcon />
        </button>
      ) : (
        <button onClick={handleCopyLink} className={`share-btn-round copy-link ${copied ? "success" : ""}`} title={copied ? "Copied!" : "Copy Link"}>
          {copied ? <CheckIcon /> : <LinkIcon />}
        </button>
      )}
    </aside>
  );
};

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

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Check out this article: ${title}`,
          url: shareUrl,
        });
      } catch (err) {
        console.log("Native share cancelled or failed", err);
      }
    } else {
      handleCopyLink();
    }
  };

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
        console.error("Copy failed", err);
      }
      document.body.removeChild(textarea);
    }
  };

  const supportsNativeShare = typeof navigator !== "undefined" && !!navigator.share;

  return (
    <div className="share-bottom-card">
      <div className="share-bottom-header">
        <p className="share-bottom-prompt">Share this story</p>
        <span className="share-bottom-divider-line"></span>
      </div>
      <div className="share-bottom-bubbles">
        <a href={fbShareUrl} target="_blank" rel="noopener noreferrer" className="share-bubble-item facebook" aria-label="Share on Facebook">
          <div className="share-bubble-icon"><FacebookIcon /></div>
          <span className="share-bubble-label">Facebook</span>
        </a>
        <a href={xShareUrl} target="_blank" rel="noopener noreferrer" className="share-bubble-item x-platform" aria-label="Share on X">
          <div className="share-bubble-icon"><XIcon /></div>
          <span className="share-bubble-label">X</span>
        </a>
        <a href={linkedinShareUrl} target="_blank" rel="noopener noreferrer" className="share-bubble-item linkedin" aria-label="Share on LinkedIn">
          <div className="share-bubble-icon"><LinkedInIcon /></div>
          <span className="share-bubble-label">LinkedIn</span>
        </a>
        <a href={waShareUrl} target="_blank" rel="noopener noreferrer" className="share-bubble-item whatsapp" aria-label="Share on WhatsApp">
          <div className="share-bubble-icon"><WhatsAppIcon /></div>
          <span className="share-bubble-label">WhatsApp</span>
        </a>
        
        {supportsNativeShare ? (
          <button onClick={handleNativeShare} className="share-bubble-item native-share" aria-label="More share options">
            <div className="share-bubble-icon"><MoreIcon /></div>
            <span className="share-bubble-label">More</span>
          </button>
        ) : (
          <button onClick={handleCopyLink} className={`share-bubble-item copy-link ${copied ? "success" : ""}`} aria-label="Copy Link">
            <div className="share-bubble-icon">{copied ? <CheckIcon /> : <LinkIcon />}</div>
            <span className="share-bubble-label">{copied ? "Copied!" : "Copy"}</span>
          </button>
        )}
      </div>
    </div>
  );
};
