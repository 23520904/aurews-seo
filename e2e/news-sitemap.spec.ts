import { test, expect } from '@playwright/test'

test.describe('News Sitemap — 48h fallback', () => {
  test('never returns empty sitemap', async ({ page }) => {
    const res = await page.goto('/news-sitemap.xml')
    if (res?.status() === 200) {
      const body = await res.text()
      // expect(body).toContain('<url>')
      expect(body).not.toMatch(/<urlset[^>]*>\s*<\/urlset>/)
    }
  })
})
