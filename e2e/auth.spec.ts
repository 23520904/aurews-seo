import { test, expect } from '@playwright/test'

test.describe('Authentication flows', () => {
  test('login page exists', async ({ page }) => {
    await page.goto('/auth/login')
    await expect(page.locator('input[type="email"]')).toBeVisible()
  })
})
