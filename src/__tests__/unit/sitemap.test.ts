import { describe, it, expect } from 'vitest'
import { buildNewsSitemap } from '@/lib/sitemap-builder'

const mockRecentPost = {
  id: '1',
  slug: 'ai-news-today',
  title: 'AI News Today',
  createdAt: new Date(), // now = within 48h
}

const mockOldPost = {
  id: '2',
  slug: 'old-article',
  title: 'Old Article',
  createdAt: new Date(Date.now() - 72 * 3_600_000), // 72h ago
}

describe('News Sitemap Builder', () => {
  it('includes posts published within 48 hours', () => {
    const xml = buildNewsSitemap([mockRecentPost])
    expect(xml).toContain('ai-news-today')
    expect(xml).toContain('<news:news>')
    expect(xml).toContain('<news:name>Aurews</news:name>')
  })

  it('falls back to latest posts when no recent posts exist', () => {
    // recentPosts is empty → should use fallbackPosts
    const xml = buildNewsSitemap([], [mockOldPost])
    expect(xml).toContain('old-article')
    expect(xml).not.toMatch(/<urlset[^>]*>\s*<\/urlset>/) // not empty urlset
  })

  it('returns valid XML structure with required namespaces', () => {
    const xml = buildNewsSitemap([mockRecentPost])
    expect(xml).toContain('<?xml version="1.0"')
    expect(xml).toContain('xmlns:news=')
    expect(xml).toContain('</urlset>')
  })

  it('returns empty urlset when both lists are empty', () => {
    const xml = buildNewsSitemap([], [])
    expect(xml).toContain('<?xml version="1.0"')
    expect(xml).toContain('<urlset')
    // Should not have any <url> entries
    expect(xml).not.toContain('<url>')
  })

  it('escapes special characters in title', () => {
    const postWithSpecialChars = {
      slug: 'special-post',
      title: 'AI & ML <Technology> Revolution',
      createdAt: new Date(),
    }
    const xml = buildNewsSitemap([postWithSpecialChars])
    expect(xml).toContain('AI &amp; ML &lt;Technology&gt; Revolution')
    expect(xml).not.toContain('<Technology>')
  })

  it('uses production BASE_URL in loc elements', () => {
    const xml = buildNewsSitemap([mockRecentPost])
    expect(xml).toContain('/article/ai-news-today')
  })
})
