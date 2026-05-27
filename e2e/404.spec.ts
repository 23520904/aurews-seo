import { test, expect } from '@playwright/test'

test('navigating to non-existent page returns 404 status and page content', async ({ page }) => {
  const res = await page.goto('/nonexistent-page-path-123')
  
  // Assert status code is 404
  expect(res!.status()).toBe(404)
  
  // Verify it displays standard Next.js 404 message or custom "not found" text
  const bodyText = await page.textContent('body')
  expect(bodyText).toMatch(/(not found|404)/i)
})
