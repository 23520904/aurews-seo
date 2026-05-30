import { test, expect } from '@playwright/test'

function normalizeOrigin(input?: string | null) {
  const fallback = 'https://aurews.id.vn'

  if (!input || input.trim().length === 0) {
    return new URL(fallback).origin
  }

  const value = input.trim()
  const withProtocol =
    value.startsWith('http://') || value.startsWith('https://')
      ? value
      : `https://${value}`

  return new URL(withProtocol).origin
}

const EXPECTED_SHARE_ORIGIN = normalizeOrigin(
  process.env.EXPECTED_SHARE_BASE_URL ||
    process.env.PLAYWRIGHT_BASE_URL ||
    'https://aurews.id.vn'
)

test.describe('Article Share Buttons', () => {
  let articleSlug: string

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage()
    await page.goto('/')

    const firstArticleLink = page.locator('a[href^="/article/"]').first()
    const href = await firstArticleLink.getAttribute('href').catch(() => null)

    articleSlug = href ? href.replace('/article/', '') : ''

    await page.close()
  })

  test('social share buttons use the expected site origin', async ({ page }) => {
    test.skip(!articleSlug, 'No articles found on homepage — skip')

    await page.goto(`/article/${articleSlug}`)

    const facebookShare = page.locator('a[href*="facebook.com/sharer"]')
    if (await facebookShare.count() > 0) {
      const href = await facebookShare.first().getAttribute('href')
      if (!href) throw new Error('Facebook share href is missing')

      const shareUrl = new URL(href)
      const sharedArticleUrl = shareUrl.searchParams.get('u')
      if (!sharedArticleUrl) {
        throw new Error('Facebook shared article URL is missing')
      }

      const sharedArticle = new URL(sharedArticleUrl)

      expect(sharedArticle.origin).toBe(EXPECTED_SHARE_ORIGIN)
      expect(sharedArticle.pathname).toContain('/article/')
      expect(sharedArticle.href).not.toContain('localhost:')
      expect(sharedArticle.href).not.toContain('127.0.0.1:')
    }

    const twitterShare = page.locator('a[href*="twitter.com/intent/tweet"]')
    if (await twitterShare.count() > 0) {
      const href = await twitterShare.first().getAttribute('href')
      if (!href) throw new Error('Twitter share href is missing')

      const shareUrl = new URL(href)
      const sharedArticleUrl = shareUrl.searchParams.get('url')
      if (!sharedArticleUrl) {
        throw new Error('Twitter shared article URL is missing')
      }

      const sharedArticle = new URL(sharedArticleUrl)

      expect(sharedArticle.origin).toBe(EXPECTED_SHARE_ORIGIN)
      expect(sharedArticle.pathname).toContain('/article/')
      expect(sharedArticle.href).not.toContain('localhost:')
      expect(sharedArticle.href).not.toContain('127.0.0.1:')
    }
  })
})