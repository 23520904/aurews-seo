import { test, expect } from '@playwright/test'

test.describe('Article Share Buttons', () => {
  let articleSlug: string

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage()
    await page.goto('/')
    
    // Find first article link to get a dynamic slug
    const firstArticleLink = page.locator('a[href^="/article/"]').first()
    const href = await firstArticleLink.getAttribute('href').catch(() => null)
    
    if (href) {
      articleSlug = href.replace('/article/', '')
    } else {
      articleSlug = ''
    }
    
    await page.close()
  })

  test('social share buttons remap localhost to production domain', async ({ page }) => {
    test.skip(!articleSlug, 'No articles found on homepage — skip')
    await page.goto(`/article/${articleSlug}`)

    // Check Facebook share button
    const facebookShare = page.locator('a[href*="facebook.com/sharer"]')
    if (await facebookShare.count() > 0) {
      const href = await facebookShare.first().getAttribute('href')
      expect(href).toBeTruthy()
      expect(href).toContain('https://aurews.id.vn')
      expect(href).not.toContain('localhost:')
      expect(href).not.toContain('127.0.0.1:')
    }

    // Check Twitter / X share button
    const twitterShare = page.locator('a[href*="twitter.com/intent/tweet"]')
    if (await twitterShare.count() > 0) {
      const href = await twitterShare.first().getAttribute('href')
      expect(href).toBeTruthy()
      expect(href).toContain('https://aurews.id.vn')
      expect(href).not.toContain('localhost:')
      expect(href).not.toContain('127.0.0.1:')
    }
  })
})
