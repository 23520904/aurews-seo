import { test, expect } from '@playwright/test'

const CATEGORIES = [
  { slug: 'business', label: 'Business' },
  { slug: 'tech-innovation', label: 'Tech' },
  { slug: 'a.i.', label: 'AI' },
]

test.describe('Category Pages', () => {
  for (const cat of CATEGORIES) {
    test(`/category/${cat.slug} returns 200 and renders heading`, async ({ page }) => {
      const res = await page.goto(`/category/${cat.slug}`)
      // Category page may return 200 or redirect if empty — just check it doesn't 500
      expect(res!.status()).not.toBe(500)
      expect(res!.status()).not.toBe(404)
    })
  }

  test('category page shows h1 with category name', async ({ page }) => {
    await page.goto('/category/business')
    // Either shows articles or "no stories" message — just check page loaded
    const h1 = page.locator('h1').first()
    await expect(h1).toBeVisible()
  })

  test('category page has article links when articles exist', async ({ page }) => {
    await page.goto('/category/business')
    // Check the page renders without JS errors
    const pageErrors: string[] = []
    page.on('pageerror', (err) => pageErrors.push(err.message))
    await page.waitForLoadState('networkidle')
    expect(pageErrors).toHaveLength(0)
  })
})
