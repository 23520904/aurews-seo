import { test, expect } from '@playwright/test'

test.describe('Dashboard Access Control — RBAC', () => {
  test('unauthenticated /dashboard redirects to /auth/login', async ({ page }) => {
    const res = await page.goto('/dashboard')
    // Should redirect to login — final URL should be /auth/login
    expect(page.url()).toContain('/auth/login')
    // Status of final page should be 200 (login page)
    expect(res!.status()).toBe(200)
  })

  test('unauthenticated /dashboard/my-posts redirects to login', async ({ page }) => {
    await page.goto('/dashboard/my-posts')
    expect(page.url()).toContain('/auth/login')
  })

  test('login page has email and password inputs', async ({ page }) => {
    await page.goto('/auth/login')
    await expect(page.locator('input[type="email"]')).toBeVisible()
    await expect(page.locator('input[type="password"]')).toBeVisible()
  })

  test('login page has submit button', async ({ page }) => {
    await page.goto('/auth/login')
    const submitBtn = page.locator('button[type="submit"]')
    await expect(submitBtn).toBeVisible()
  })
})
