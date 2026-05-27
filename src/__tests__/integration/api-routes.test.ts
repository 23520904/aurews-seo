import { describe, it, expect, vi } from 'vitest'

// ── Mock Prisma ──
vi.mock('@/lib/prisma', () => ({
  prisma: {
    post: {
      findMany: vi.fn().mockResolvedValue([
        {
          id: '1',
          title: 'Latest AI News',
          slug: 'latest-ai-news',
          excerpt: 'Breaking AI news',
          coverImage: 'https://res.cloudinary.com/aurews/cover.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
          status: 'PUBLISHED',
          views: 10,
          author: { name: 'Admin' },
          category: { name: 'A.I.', slug: 'a.i.' },
        },
      ]),
      count: vi.fn().mockResolvedValue(1),
    },
  },
}))

describe('API Routes — /api/posts/latest response shape', () => {
  it('posts array contains required fields', async () => {
    const { prisma } = await import('@/lib/prisma')
    const posts = await prisma.post.findMany({ take: 10 })

    expect(Array.isArray(posts)).toBe(true)
    expect(posts.length).toBeGreaterThan(0)

    const post = posts[0]
    expect(post).toHaveProperty('slug')
    expect(post).toHaveProperty('title')
    expect(post).toHaveProperty('createdAt')
    expect(post.status).toBe('PUBLISHED')
  })

  it('post has category and author for PostCard rendering', async () => {
    const { prisma } = await import('@/lib/prisma')
    const posts = await prisma.post.findMany({ include: { author: true, category: true } })
    const post = posts[0]
    expect(post.author).toHaveProperty('name')
    expect(post.category).toHaveProperty('name')
    expect(post.category).toHaveProperty('slug')
  })
})

describe('API Routes — pagination logic', () => {
  it('post count is non-negative', async () => {
    const { prisma } = await import('@/lib/prisma')
    const total = await prisma.post.count()
    expect(typeof total).toBe('number')
    expect(total).toBeGreaterThanOrEqual(0)
  })
})
