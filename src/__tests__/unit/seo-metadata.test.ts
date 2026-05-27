import { describe, it, expect } from 'vitest'
import { buildArticleJsonLd } from '@/lib/seo'
import { BASE_URL } from '@/lib/constants'

const mockPost = {
  title: 'AI Regulation 2026',
  slug: 'ai-regulation-2026',
  excerpt: 'Governments focus on risk-based frameworks',
  coverImage: 'https://res.cloudinary.com/aurews/image/upload/v1/cover.jpg',
  createdAt: new Date('2026-05-01T10:00:00Z'),
  updatedAt: new Date('2026-05-02T12:00:00Z'),
  author: { name: 'Admin' },
  category: { name: 'A.I.' },
}

describe('Article JSON-LD Schema', () => {
  it('produces @type NewsArticle', () => {
    const ld = buildArticleJsonLd(mockPost)
    expect(ld['@type']).toBe('NewsArticle')
  })

  it('canonical mainEntityOfPage uses configured BASE_URL and slug', () => {
    const ld = buildArticleJsonLd(mockPost)
    expect(ld.mainEntityOfPage).toBe(`${BASE_URL}/article/ai-regulation-2026`)
  })

  it('datePublished is ISO 8601 format', () => {
    const ld = buildArticleJsonLd(mockPost)
    expect(ld.datePublished).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
  })

  it('dateModified reflects updatedAt', () => {
    const ld = buildArticleJsonLd(mockPost)
    expect(ld.dateModified).toContain('2026-05-02')
  })

  it('uses excerpt as description when available', () => {
    const ld = buildArticleJsonLd(mockPost)
    expect(ld.description).toBe('Governments focus on risk-based frameworks')
  })

  it('falls back to title as description when no excerpt', () => {
    const ld = buildArticleJsonLd({ ...mockPost, excerpt: null })
    expect(ld.description).toBe('AI Regulation 2026')
  })

  it('uses DEFAULT_IMAGE when no coverImage', () => {
    const ld = buildArticleJsonLd({ ...mockPost, coverImage: null })
    expect(ld.image[0]).toContain('cloudinary.com')
  })

  it('sets publisher as Aurews NewsMediaOrganization', () => {
    const ld = buildArticleJsonLd(mockPost)
    expect(ld.publisher['@type']).toBe('NewsMediaOrganization')
    expect(ld.publisher.name).toBe('Aurews')
  })
})
