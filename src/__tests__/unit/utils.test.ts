import { describe, it, expect } from 'vitest'

// ── Slug generation helper (inline, mirrors the logic in posts.ts) ──
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replaceAll(' ', '-')
    .replace(/[^\w-]+/g, '')
}

// ── Excerpt truncation helper ──
function truncateExcerpt(body: string, maxLength = 160): string {
  if (body.length <= maxLength) return body
  return body.substring(0, maxLength).trimEnd() + '...'
}

// ── ISO date formatter for news sitemaps ──
function toNewsSitemapDate(date: Date): string {
  return date.toISOString()
}

describe('Utility Functions — Slug Generation', () => {
  it('converts spaces to hyphens', () => {
    expect(generateSlug('AI News Today')).toBe('ai-news-today')
  })

  it('lowercases the title', () => {
    expect(generateSlug('BREAKING NEWS')).toBe('breaking-news')
  })

  it('removes special characters', () => {
    expect(generateSlug('Tech & Innovation 2026!')).toBe('tech--innovation-2026')
  })

  it('handles multiple spaces', () => {
    expect(generateSlug('a  b')).toBe('a--b')
  })
})

describe('Utility Functions — Excerpt Truncation', () => {
  it('returns full text if under maxLength', () => {
    const short = 'Short excerpt'
    expect(truncateExcerpt(short)).toBe(short)
  })

  it('truncates at 160 chars and appends ellipsis', () => {
    const long = 'A'.repeat(200)
    const result = truncateExcerpt(long)
    expect(result.endsWith('...')).toBe(true)
    expect(result.length).toBeLessThanOrEqual(163) // 160 + '...'
  })

  it('respects custom maxLength', () => {
    const text = 'Hello World this is a test'
    expect(truncateExcerpt(text, 10)).toBe('Hello Worl...')
  })
})

describe('Utility Functions — Date Formatting', () => {
  it('returns ISO 8601 format with T separator', () => {
    const date = new Date('2026-05-01T10:00:00Z')
    expect(toNewsSitemapDate(date)).toMatch(/^\d{4}-\d{2}-\d{2}T/)
  })

  it('includes time component', () => {
    const date = new Date('2026-05-01T10:00:00Z')
    const formatted = toNewsSitemapDate(date)
    expect(formatted).toContain('10:00:00')
  })
})
