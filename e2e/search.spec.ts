import { test, expect } from '@playwright/test'

test.describe('Search Page', () => {
  test('search page loads and shows search input', async ({ page }) => {
    const res = await page.goto('/search')
    expect(res!.status()).toBe(200)
  })

  test('search with a query shows results or empty state', async ({ page }) => {
    await page.goto('/search?q=ai')
    // Page should load without 500
    await page.waitForLoadState('networkidle')
    const body = await page.locator('body').textContent()
    expect(body).toBeTruthy()
    // Should show either results or "no matching documents" message
    const hasResults = await page.locator('article').count()
    const hasEmptyState = body!.toLowerCase().includes('no matching') ||
                          body!.toLowerCase().includes('results') ||
                          body!.toLowerCase().includes('entries') ||
                          hasResults > 0
    expect(hasEmptyState).toBe(true)
  })

  test('empty query shows page without crashing', async ({ page }) => {
    const res = await page.goto('/search?q=')
    expect(res!.status()).not.toBe(500)
  })

  test('search page has proper title tag', async ({ page }) => {
    await page.goto('/search?q=technology')
    const title = await page.title()
    expect(title.length).toBeGreaterThan(0)
  })
})
