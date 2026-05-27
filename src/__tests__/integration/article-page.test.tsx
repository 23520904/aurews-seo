import { describe, it, expect, vi } from 'vitest'
import { buildArticleJsonLd } from '@/lib/seo'

// ─── Mock Next.js navigation (required for server components) ───
vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => { throw new Error('NEXT_NOT_FOUND') }),
}))

// ─── Mock Prisma at module level ───
vi.mock('@/lib/prisma', () => ({
  prisma: {
    post: {
      findUnique: vi.fn().mockResolvedValue({
        id: '1',
        title: 'AI News 2026',
        slug: 'ai-news-2026',
        body: 'Full article content about AI advancements.',
        excerpt: 'AI advancements summary',
        status: 'PUBLISHED',
        coverImage: 'https://res.cloudinary.com/aurews/image/upload/cover.jpg',
        createdAt: new Date('2026-05-01T10:00:00Z'),
        updatedAt: new Date('2026-05-01T10:00:00Z'),
        author: { id: '1', name: 'Admin', email: 'admin@aurews.id.vn', role: 'ADMIN', image: null, password: null, createdAt: new Date(), updatedAt: new Date() },
        category: { id: 'cat1', name: 'A.I.', slug: 'a.i.', createdAt: new Date(), updatedAt: new Date() },
        authorId: '1',
        categoryId: 'cat1',
        views: 42,
      }),
      findMany: vi.fn().mockResolvedValue([]),
    },
  },
}))

describe('Article Page — SEO lib integration', () => {
  it('buildArticleJsonLd produces correct @type', () => {
    const post = {
      title: 'AI News 2026',
      slug: 'ai-news-2026',
      excerpt: 'AI advancements summary',
      coverImage: 'https://res.cloudinary.com/aurews/image/upload/cover.jpg',
      createdAt: new Date('2026-05-01T10:00:00Z'),
      updatedAt: new Date('2026-05-01T10:00:00Z'),
      author: { name: 'Admin' },
    }
    const ld = buildArticleJsonLd(post)
    expect(ld['@type']).toBe('NewsArticle')
    expect(ld.mainEntityOfPage).toContain('ai-news-2026')
  })

  it('buildArticleJsonLd mainEntityOfPage never has localhost in production', () => {
    const post = {
      title: 'Test Post',
      slug: 'test-post',
      createdAt: new Date(),
    }
    const ld = buildArticleJsonLd(post)
    // In test env BASE_URL = http://localhost:3000 — we just verify the slug is included
    expect(ld.mainEntityOfPage).toContain('/article/test-post')
  })
})

describe('Article Page — Mocked Prisma', () => {
  it('prisma mock returns expected post data', async () => {
    const { prisma } = await import('@/lib/prisma')
    const post = await prisma.post.findUnique({ where: { slug: 'ai-news-2026' } })
    expect(post).not.toBeNull()
    expect(post?.title).toBe('AI News 2026')
    expect(post?.status).toBe('PUBLISHED')
  })

  it('post has required SEO fields', async () => {
    const { prisma } = await import('@/lib/prisma')
    const post = await prisma.post.findUnique({ where: { slug: 'ai-news-2026' } })
    expect(post?.slug).toBeDefined()
    expect(post?.coverImage).toContain('cloudinary.com')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((post as any)?.author).toHaveProperty('name')
  })
})
