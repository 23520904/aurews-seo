import Link from "next/link";
import React from "react";

type Props = {
  currentPage:  number
  totalPages:   number
  baseUrl:      string          // e.g. "/search?q=bitcoin" or "/dashboard"
  pageParam?:   string          // default "page"
}

function buildPages(current: number, total: number): (number | '…')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const pages: (number | '…')[] = [1]

  if (current > 3) pages.push('…')

  const start = Math.max(2, current - 1)
  const end   = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) pages.push(i)

  if (current < total - 2) pages.push('…')
  if (total > 1) pages.push(total)
  return pages
}

export function Pagination({ currentPage, totalPages, baseUrl, pageParam = 'page' }: Props) {
  if (totalPages <= 1) return null;

  const getHref = (p: number) => {
    const connector = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${connector}${pageParam}=${p}`;
  }

  const pages = buildPages(currentPage, totalPages)

  return (
    <nav 
      aria-label="Pagination" 
      className="wired-pagination"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        marginTop: '64px',
        paddingTop: '32px',
        borderTop: '2px solid var(--wired-black)'
      }}
    >
      <Link
        href={getHref(currentPage - 1)}
        style={{ 
          padding: '8px 16px', 
          border: '2px solid var(--wired-black)',
          opacity: currentPage <= 1 ? 0.3 : 1,
          pointerEvents: currentPage <= 1 ? 'none' : 'auto',
          textDecoration: 'none',
          color: 'var(--wired-black)',
          fontWeight: 700
        }}
        className="wired-mono"
      >
        {"← PREV"}
      </Link>

      <div style={{ display: 'flex', gap: '4px' }}>
        {pages.map((p, i) =>
          p === '…'
            ? <span key={`dots-${i}`} className="wired-mono" style={{ padding: '8px', color: 'var(--disabled-gray)' }}>…</span>
            : <Link
                key={`page-${p}`}
                href={getHref(p as number)}
                style={{
                  padding: '8px 12px',
                  border: '2px solid var(--wired-black)',
                  backgroundColor: p === currentPage ? 'var(--wired-black)' : 'transparent',
                  color: p === currentPage ? 'var(--paper-white)' : 'var(--wired-black)',
                  textDecoration: 'none',
                  fontWeight: 700,
                  minWidth: '40px',
                  textAlign: 'center'
                }}
                className="wired-mono"
              >
                {p}
              </Link>
        )}
      </div>

      <Link
        href={getHref(currentPage + 1)}
        style={{ 
          padding: '8px 16px', 
          border: '2px solid var(--wired-black)',
          opacity: currentPage >= totalPages ? 0.3 : 1,
          pointerEvents: currentPage >= totalPages ? 'none' : 'auto',
          textDecoration: 'none',
          color: 'var(--wired-black)',
          fontWeight: 700
        }}
        className="wired-mono"
      >
        {"NEXT →"}
      </Link>
    </nav>
  )
}
